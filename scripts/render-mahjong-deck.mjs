import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DECK_HTML = "/Users/design/HQplug/landing portfolio/mahjong_case_study_deck.html";
const OUT_SLIDES_DIR = path.join(ROOT, "public/projects/mahjong");
const OUT_PDF = "/Users/design/HQplug/landing portfolio/Expedition_Mahjong_Product_Design_Case_Study_Awards_Edition.pdf";

function createCdpClient(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let nextId = 1;
    const pending = new Map();
    const listeners = new Map();

    ws.addEventListener("open", () => {
      resolve({
        send(method, params = {}) {
          const id = nextId++;
          return new Promise((res, rej) => {
            pending.set(id, { res, rej, method });
            ws.send(JSON.stringify({ id, method, params }));
          });
        },
        once(event) {
          return new Promise((res) => {
            const arr = listeners.get(event) || [];
            arr.push(res);
            listeners.set(event, arr);
          });
        },
        close() {
          ws.close();
        },
      });
    });

    ws.addEventListener("message", (evt) => {
      const msg = JSON.parse(String(evt.data));
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) rej(new Error(`${msg.error.message} (${msg.error.code})`));
        else res(msg.result);
      } else if (msg.method && listeners.has(msg.method)) {
        const arr = listeners.get(msg.method);
        listeners.delete(msg.method);
        arr.forEach((fn) => fn(msg.params));
      }
    });

    ws.addEventListener("error", reject);
  });
}

async function launchChrome(userDataDir) {
  const proc = spawn(
    CHROME_BIN,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${userDataDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--allow-file-access-from-files",
      "about:blank",
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  const wsUrl = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timed out waiting for Chrome DevTools")), 15000);
    let stderrBuf = "";
    proc.stderr.on("data", (chunk) => {
      stderrBuf += chunk.toString();
      const match = stderrBuf.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });
    proc.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Chrome exited prematurely with code ${code}: ${stderrBuf}`));
    });
  });

  const portMatch = wsUrl.match(/:(\d+)\//);
  const port = Number(portMatch[1]);
  const targetsRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const targets = await targetsRes.json();
  const pageTarget = targets.find((t) => t.type === "page") || targets[0];
  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error("Could not find page WebSocket debugger URL");
  }

  return { proc, pageWsUrl: pageTarget.webSocketDebuggerUrl };
}

async function main() {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "chrome-mahjong-deck-"));
  const { proc, pageWsUrl } = await launchChrome(userDataDir);
  const cdp = await createCdpClient(pageWsUrl);

  try {
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1536,
      height: 864,
      deviceScaleFactor: 2.25,
      mobile: false,
    });

    const loadDone = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url: pathToFileURL(DECK_HTML).href });
    await loadDone;

    // Wait for fonts & all <img> elements inside deck
    const imgStatus = await cdp.send("Runtime.evaluate", {
      awaitPromise: true,
      returnByValue: true,
      expression: `(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        const imgs = Array.from(document.querySelectorAll('img'));
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => {
          img.addEventListener('load', r, { once: true });
          img.addEventListener('error', r, { once: true });
        })));
        await new Promise(r => setTimeout(r, 400));
        const broken = imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.getAttribute('src'));
        const rects = Array.from(document.querySelectorAll('.slide')).map(el => {
          const r = el.getBoundingClientRect();
          return { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height };
        });
        return { broken, count: rects.length, rects };
      })()`,
    });

    const { broken, count, rects } = imgStatus.result.value;
    if (broken.length > 0) {
      throw new Error(`Broken images in presentation deck: ${broken.join(", ")}`);
    }
    if (count !== 10) {
      throw new Error(`Expected 10 slides, found ${count}`);
    }

    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      const shot = await cdp.send("Page.captureScreenshot", {
        format: "jpeg",
        quality: 92,
        captureBeyondViewport: true,
        clip: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          scale: 1,
        },
      });
      const slideName = `slide_${String(i + 1).padStart(2, "0")}.jpg`;
      const outPath = path.join(OUT_SLIDES_DIR, slideName);
      fs.writeFileSync(outPath, Buffer.from(shot.data, "base64"));
      console.log(`Rendered ${slideName} (${Math.round(rect.width * 2.25)}x${Math.round(rect.height * 2.25)})`);
    }

    // Export updated Awards Edition PDF
    const pdfRes = await cdp.send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    });
    fs.writeFileSync(OUT_PDF, Buffer.from(pdfRes.data, "base64"));
    console.log("Exported updated PDF:", OUT_PDF);
  } finally {
    cdp.close();
    proc.kill("SIGKILL");
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true, maxRetries: 6, retryDelay: 150 });
    } catch {
      // Ignore temporary Chrome profile lock files on fast exit
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
