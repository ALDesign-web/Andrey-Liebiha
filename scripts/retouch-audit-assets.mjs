import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Step 1A: Expedition Mahjong screens
 */
async function retouchMahjongScreens() {
  const slide05 = path.join(ROOT, "public/projects/mahjong/slide_05.jpg");
  const slide08 = path.join(ROOT, "public/projects/mahjong/slide_08.jpg");
  const out02 = path.join(ROOT, "public/projects/mahjong/screens/02_streak_protection.webp");
  const out03 = path.join(ROOT, "public/projects/mahjong/screens/03_defeat_recovery.webp");
  const out04 = path.join(ROOT, "public/projects/mahjong/screens/04_material_store.webp");
  const out10 = path.join(ROOT, "public/projects/mahjong/screens/10_calendar_challenges.webp");

  // 1. Re-crop 02_streak_protection.webp cleanly centered & fix "No  more moves!" double space
  const base02 = await sharp(slide05)
    .extract({ left: 1506, top: 562, width: 444, height: 987 })
    .resize(840, 1867)
    .toBuffer();

  // Seamless gradient parchment cover matching the exact vertical tone (no tile seams)
  const seamlessParchmentCover = await sharp(base02)
    .extract({ left: 148, top: 938, width: 24, height: 60 })
    .blur(5)
    .resize(114, 60, { fit: "fill" })
    .toBuffer();

  // Keep the exact original raster glyphs for "No" and nudge 12px right to close double space
  const noPatch = await sharp(base02)
    .extract({ left: 192, top: 938, width: 92, height: 60 })
    .toBuffer();

  await sharp(base02)
    .composite([
      { input: seamlessParchmentCover, left: 188, top: 938 },
      { input: noPatch, left: 204, top: 938 },
    ])
    .webp({ quality: 92 })
    .toFile(out02);

  // 2. Re-crop 03_defeat_recovery.webp cleanly centered
  await sharp(slide05)
    .extract({ left: 2608, top: 562, width: 444, height: 987 })
    .resize(840, 1867)
    .webp({ quality: 92 })
    .toFile(out03);

  // 3. Re-crop 10_calendar_challenges.webp cleanly centered
  await sharp(slide08)
    .extract({ left: 412, top: 562, width: 444, height: 987 })
    .resize(840, 1867)
    .webp({ quality: 92 })
    .toFile(out10);

  // 4. Fix mirrored HUD text ("Очки 1640" backwards) in 04_material_store.webp
  const buf04 = fs.readFileSync(out04);
  const badgeSvg = Buffer.from(`
    <svg width="256" height="56" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="248" height="38" rx="19" fill="#e1e6ee" fill-opacity="0.94" stroke="#9aa8bd" stroke-width="1.5"/>
      <text x="128" y="32" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="1.2" fill="#1e293b">PORCELAIN · SET 05/08</text>
    </svg>
  `);
  await sharp(buf04)
    .composite([{ input: badgeSvg, left: 244, top: 968 }])
    .webp({ quality: 92 })
    .toFile(out04);

  console.log("Retouched Mahjong screens (02, 03, 04, 10).");
}

/**
 * Step 1B: Bookify screenshots
 */
async function retouchBookifyScreens() {
  const dir = path.join(ROOT, "public/projects/bookify");

  const makeUrlBarSvg = (urlText) =>
    Buffer.from(`
      <svg width="560" height="54" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="560" height="54" rx="8" fill="#13161b"/>
        <text x="16" y="32" font-family="Menlo, Monaco, Consolas, monospace" font-size="14" fill="#9ca3af">${escapeXml(urlText)}</text>
      </svg>
    `);

  // 1. crop_catalog_browser.webp: Rebuild cleanly from untouched PNG, fix "Ed. Paul Dunkan" -> "Ed. Paul Duncan" + update URL bar
  {
    const srcPng = path.join(dir, "crop_catalog_browser.png");
    const outWebp = path.join(dir, "crop_catalog_browser.webp");
    const baseBuf = await sharp(srcPng).resize(1600, 1341).toBuffer();
    const fixAuthorSvg = Buffer.from(`
      <svg width="215" height="34" xmlns="http://www.w3.org/2000/svg">
        <rect width="215" height="34" fill="#ffffff"/>
        <text x="2" y="25" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="22" fill="#787878">Ed. Paul Duncan</text>
      </svg>
    `);
    await sharp(baseBuf)
      .composite([
        { input: fixAuthorSvg, left: 348, top: 186 },
        { input: makeUrlBarSvg("bookify.com.ua/catalog/art-collections"), left: 102, top: 5 },
      ])
      .webp({ quality: 92 })
      .toFile(outWebp);
  }

  // 2. crop_product_detail.webp, crop_checkout.webp, crop_reviews.webp:
  // Rebuild cleanly from untouched PNGs, fix "copyand" -> "copy and" + update URL bar
  const fixDescSvg = Buffer.from(`
    <svg width="695" height="96" xmlns="http://www.w3.org/2000/svg">
      <rect width="695" height="96" fill="#ffffff"/>
      <text x="2" y="18" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="14.2" fill="#52525b">Superlatives flounder in the face of Joan Blaeu's Atlas Maior, one of the most extravagant feats in the</text>
      <text x="2" y="38" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="14.2" fill="#52525b">history of mapmaking. This stunning edition is based on the Austrian National Library's complete colored</text>
      <text x="2" y="58" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="14.2" fill="#52525b">and gold-heightened copy and reprints its 594 maps covering all then-known continents to the highest</text>
      <text x="2" y="78" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="14.2" fill="#52525b">reproduction standard, rendering full justice to this luxurious Baroque wonder.</text>
    </svg>
  `);

  for (const baseName of ["crop_product_detail", "crop_checkout", "crop_reviews"]) {
    const srcPng = path.join(dir, `${baseName}.png`);
    const outWebp = path.join(dir, `${baseName}.webp`);
    const baseBuf = await sharp(srcPng).resize(1600, 1341).toBuffer();
    await sharp(baseBuf)
      .composite([
        { input: fixDescSvg, left: 822, top: 340 },
        { input: makeUrlBarSvg("bookify.com.ua/books/classics/joan-blaeu-atlas-maior"), left: 102, top: 5 },
      ])
      .webp({ quality: 92 })
      .toFile(outWebp);
  }

  console.log("Retouched Bookify screens (catalog, pdp, checkout, reviews).");
}

/**
 * Step 1C: Scrub & Rework Third Project (Luro -> Kinetix AI Studio)
 */
async function retouchKinetixScreens() {
  const luroDir = path.join(ROOT, "public/projects/luro");
  const kinetixDir = path.join(ROOT, "public/projects/kinetix");
  fs.mkdirSync(kinetixDir, { recursive: true });

  // 1. crop_analytics.webp (1600x1160)
  {
    const src = path.join(luroDir, "crop_analytics.webp");
    const buf = fs.readFileSync(src);

    const titleBarSvg = Buffer.from(`
      <svg width="1600" height="58" xmlns="http://www.w3.org/2000/svg">
        <rect width="1600" height="58" fill="#0c0d10"/>
        <line x1="0" y1="57" x2="1600" y2="57" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
        <circle cx="32" cy="29" r="6.5" fill="#ff5f57"/>
        <circle cx="54" cy="29" r="6.5" fill="#febc2e"/>
        <circle cx="76" cy="29" r="6.5" fill="#28c840"/>
        <rect x="520" y="12" width="560" height="34" rx="8" fill="#15171e" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
        <text x="800" y="34" text-anchor="middle" font-family="Menlo, Monaco, Consolas, monospace" font-size="13.5" fill="#9ca3af">app.kinetix.studio/workspace/telemetry</text>
      </svg>
    `);

    const logoSvg = Buffer.from(`
      <svg width="240" height="70" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="70" fill="#09090b"/>
        <defs>
          <linearGradient id="kxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff7235"/>
            <stop offset="100%" stop-color="#ffa043"/>
          </linearGradient>
        </defs>
        <rect x="16" y="17" width="36" height="36" rx="9" fill="#14161c" stroke="url(#kxGrad)" stroke-width="1.5"/>
        <polygon points="34,23 45,35 34,47 23,35" fill="url(#kxGrad)"/>
        <polygon points="34,29 39,35 34,41 29,35" fill="#09090b"/>
        <text x="64" y="42" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#ffffff" letter-spacing="-0.4">Kinetix</text>
        <rect x="144" y="25" width="54" height="20" rx="4" fill="#ff7235" fill-opacity="0.14" stroke="#ff7235" stroke-opacity="0.4" stroke-width="1"/>
        <text x="171" y="39" text-anchor="middle" font-family="Menlo, Monaco, Consolas, monospace" font-size="9.5" font-weight="700" fill="#ffa043" letter-spacing="0.8">STUDIO</text>
      </svg>
    `);

    const kpis = [
      { title: "Cross-Channel Reach", val: "3.18M", delta: "+24.6% vs 30d", color: "#34d399" },
      { title: "Retention Velocity", val: "6.8%", delta: "+1.9% vs 30d", color: "#34d399" },
      { title: "Active Pipelines", val: "18", delta: "4 automated", color: "#ffa043" },
      { title: "Published Reels & Shorts", val: "1,240", delta: "+64 this week", color: "#34d399" },
    ];
    const cardW = 294;
    const gap = 20;
    const kpiCards = kpis
      .map((k, idx) => {
        const x = idx * (cardW + gap);
        return `
          <rect x="${x}" y="0" width="${cardW}" height="126" rx="10" fill="#0c0d12" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
          <text x="${x + 20}" y="30" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="13.5" font-weight="500" fill="#d4d4d8">${escapeXml(k.title)}</text>
          <text x="${x + 20}" y="78" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30" font-weight="700" fill="#ffffff">${escapeXml(k.val)}</text>
          <text x="${x + 20}" y="106" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="12.5" font-weight="500" fill="${k.color}">${escapeXml(k.delta)}</text>
        `;
      })
      .join("");

    const kpiRowSvg = Buffer.from(`
      <svg width="1236" height="132" xmlns="http://www.w3.org/2000/svg">
        <rect width="1236" height="132" fill="#09090b"/>
        ${kpiCards}
      </svg>
    `);

    const channels = [
      { name: "Instagram Reels", sub: "9:16 vertical cadence · Hook v3", metric: "+24.8% CTR", accent: "#ff7235" },
      { name: "TikTok Spark Ads", sub: "Sound-synced cutdowns · 18s", metric: "+18.2% ROAS", accent: "#ffa043" },
      { name: "YouTube Shorts", sub: "Loop-end retention framing", metric: "+14.6% Watch", accent: "#34d399" },
      { name: "Threads Pulse", sub: "Adaptive carousels · Auto-tag", metric: "+9.4% Share", accent: "#38bdf8" },
      { name: "LinkedIn Carousel", sub: "Editorial B2B teardown cards", metric: "+7.1% Save", accent: "#a78bfa" },
      { name: "App Store Clips", sub: "Interactive tactile preview", metric: "+5.3% Install", accent: "#34d399" },
    ];
    const channelRows = channels
      .map((c, idx) => {
        const y = 104 + idx * 80;
        return `
          <line x1="24" y1="${y - 14}" x2="378" y2="${y - 14}" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>
          <circle cx="32" cy="${y + 12}" r="5" fill="${c.accent}"/>
          <text x="50" y="${y + 11}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="14.5" font-weight="600" fill="#ffffff">${escapeXml(c.name)}</text>
          <text x="50" y="${y + 32}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="12" fill="#71717a">${escapeXml(c.sub)}</text>
          <text x="374" y="${y + 18}" text-anchor="end" font-family="Menlo, Monaco, Consolas, monospace" font-size="13" font-weight="700" fill="${c.accent}">${escapeXml(c.metric)}</text>
        `;
      })
      .join("");

    const gapClearSvg = Buffer.from(`
      <svg width="1250" height="58" xmlns="http://www.w3.org/2000/svg">
        <rect width="1250" height="58" fill="#09090b"/>
      </svg>
    `);

    const rightGapClearSvg = Buffer.from(`
      <svg width="416" height="608" xmlns="http://www.w3.org/2000/svg">
        <rect width="416" height="608" fill="#09090b"/>
      </svg>
    `);

    const channelCardSvg = Buffer.from(`
      <svg width="402" height="540" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="402" height="540" rx="12" fill="#09090b" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
        <text x="24" y="40" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="21" font-weight="700" fill="#ffffff">Channel Attribution</text>
        <text x="24" y="64" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="13" fill="#a1a1aa">Top converting formats across 30-day cohort</text>
        ${channelRows}
      </svg>
    `);

    const outBuf = await sharp(buf)
      .composite([
        { input: titleBarSvg, left: 0, top: 0 },
        { input: logoSvg, left: 12, top: 205 },
        { input: rightGapClearSvg, left: 1168, top: 404 },
        { input: gapClearSvg, left: 330, top: 425 },
        { input: kpiRowSvg, left: 336, top: 300 },
        { input: channelCardSvg, left: 1172, top: 480 },
      ])
      .webp({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(path.join(kinetixDir, "crop_analytics.webp"), outBuf);
    fs.writeFileSync(path.join(luroDir, "crop_analytics.webp"), outBuf);
  }

  // 2. crop_bento.webp (1600x952)
  {
    const src = path.join(luroDir, "crop_bento.webp");
    const buf = fs.readFileSync(src);

    const headerSvg = Buffer.from(`
      <svg width="1600" height="140" xmlns="http://www.w3.org/2000/svg">
        <rect width="1600" height="140" fill="#090a0d"/>
        <rect x="615" y="18" width="370" height="26" rx="13" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>
        <text x="800" y="35" text-anchor="middle" font-family="Menlo, Monaco, Consolas, monospace" font-size="11" font-weight="700" letter-spacing="1.4" fill="#ffa043">KINETIX DESIGN SYSTEM · BENTO TOKENS</text>
        <text x="800" y="88" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="27" font-weight="600" fill="#f4f4f5">Modular dark-surface primitives engineered for creator telemetry</text>
      </svg>
    `);

    const centerBentoSvg = Buffer.from(`
      <svg width="500" height="228" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="228" rx="14" fill="#0e1017" stroke="#ffffff" stroke-opacity="0.09" stroke-width="1"/>
        <text x="26" y="42" font-family="Menlo, Monaco, Consolas, monospace" font-size="12" fill="#52525b">surface.elevated: #0e1017  |  accent.signal: #ff7235</text>
        <text x="26" y="70" font-family="Menlo, Monaco, Consolas, monospace" font-size="12" fill="#3f3f46">cohort.retention.velocity -&gt; adaptive tone calibration</text>
        <text x="26" y="198" font-family="Menlo, Monaco, Consolas, monospace" font-size="12" fill="#3f3f46">contrast.wcag: AAA 14.2:1  |  radius.lock: 14px</text>
        <defs>
          <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3b267a"/>
            <stop offset="100%" stop-color="#5b34b3"/>
          </linearGradient>
        </defs>
        <rect x="115" y="86" width="270" height="58" rx="14" fill="url(#btnGrad)" stroke="#a78bfa" stroke-opacity="0.45" stroke-width="1.5"/>
        <text x="250" y="121" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="18" font-weight="600" fill="#ffffff">✦ Optimize Hook &amp; Tone</text>
      </svg>
    `);

    const rightTopSvg = Buffer.from(`
      <svg width="560" height="148" xmlns="http://www.w3.org/2000/svg">
        <rect width="560" height="148" fill="#0d0e14"/>
        <text x="6" y="34" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="28" font-weight="600" fill="#f4f4f5">Cohort Retention Signals</text>
        <text x="6" y="74" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19" fill="#a1a1aa">Track drop-off frames, completion loops, and</text>
        <text x="6" y="104" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19" fill="#a1a1aa">surface highest-leverage creative variants.</text>
      </svg>
    `);

    const rightBottomSvg = Buffer.from(`
      <svg width="460" height="165" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="165" fill="#0d0e14"/>
        <text x="6" y="42" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="28" font-weight="600" fill="#f4f4f5">Automated Pipeline Sync</text>
        <text x="6" y="84" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19" fill="#a1a1aa">Connect production APIs and publishing</text>
        <text x="6" y="114" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19" fill="#a1a1aa">queues into one unified command surface.</text>
      </svg>
    `);

    const outBuf = await sharp(buf)
      .composite([
        { input: headerSvg, left: 0, top: 0 },
        { input: centerBentoSvg, left: 550, top: 655 },
        { input: rightTopSvg, left: 992, top: 492 },
        { input: rightBottomSvg, left: 1092, top: 705 },
      ])
      .webp({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(path.join(kinetixDir, "crop_bento.webp"), outBuf);
    fs.writeFileSync(path.join(luroDir, "crop_bento.webp"), outBuf);
  }

  // 3. crop_node_flow.webp (1600x907)
  {
    const src = path.join(luroDir, "crop_node_flow.webp");
    const buf = fs.readFileSync(src);

    const headerSvg = Buffer.from(`
      <svg width="1600" height="115" xmlns="http://www.w3.org/2000/svg">
        <rect width="1600" height="115" fill="#090a0d"/>
        <text x="800" y="46" text-anchor="middle" font-family="Menlo, Monaco, Consolas, monospace" font-size="13" font-weight="700" letter-spacing="2" fill="#ffa043">MULTI-CHANNEL ROUTING · AUTOMATED NODE GRAPH</text>
        <text x="800" y="84" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="23" font-weight="500" fill="#e4e4e7">Event-driven asset pipelines connecting briefs, formats, and analytics endpoints</text>
      </svg>
    `);

    const centerNodeSvg = Buffer.from(`
      <svg width="130" height="130" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="122" height="122" rx="28" fill="#18122b" stroke="#8b5cf6" stroke-width="2.5"/>
        <rect x="18" y="18" width="94" height="94" rx="20" fill="#7c3aed"/>
        <polygon points="65,33 93,65 65,97 37,65" fill="#ffffff"/>
        <polygon points="65,49 78,65 65,81 52,65" fill="#7c3aed"/>
      </svg>
    `);

    const outBuf = await sharp(buf)
      .composite([
        { input: headerSvg, left: 0, top: 0 },
        { input: centerNodeSvg, left: 734, top: 424 },
      ])
      .webp({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(path.join(kinetixDir, "crop_node_flow.webp"), outBuf);
    fs.writeFileSync(path.join(luroDir, "crop_node_flow.webp"), outBuf);
  }

  // 4. crop_ai_studio.webp (1600x595)
  {
    const src = path.join(luroDir, "crop_ai_studio.webp");
    const buf = fs.readFileSync(src);

    const leftTextSvg = Buffer.from(`
      <svg width="420" height="148" xmlns="http://www.w3.org/2000/svg">
        <rect width="420" height="148" fill="#101118"/>
        <text x="16" y="38" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="#ffffff">Visual Asset Synthesis</text>
        <text x="16" y="76" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="18.5" fill="#a1a1aa">Generate vertical story frames and</text>
        <text x="16" y="104" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="18.5" fill="#a1a1aa">adaptive backdrops with locked</text>
        <text x="16" y="132" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="18.5" fill="#a1a1aa">AA/AAA surface contrast.</text>
      </svg>
    `);

    const rightTextSvg = Buffer.from(`
      <svg width="1045" height="148" xmlns="http://www.w3.org/2000/svg">
        <rect width="1045" height="148" fill="#101118"/>
        <text x="20" y="38" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="25" font-weight="600" fill="#ffffff">Semantic Tag &amp; Topic Clustering</text>
        <text x="20" y="78" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19.5" fill="#a1a1aa">Context-aware audience affinity scoring and reach-weighted topic</text>
        <text x="20" y="108" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19.5" fill="#a1a1aa">recommendations calibrated for high-retention mobile feeds.</text>
      </svg>
    `);

    const outBuf = await sharp(buf)
      .composite([
        { input: leftTextSvg, left: 42, top: 395 },
        { input: rightTextSvg, left: 502, top: 395 },
      ])
      .webp({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(path.join(kinetixDir, "crop_ai_studio.webp"), outBuf);
    fs.writeFileSync(path.join(luroDir, "crop_ai_studio.webp"), outBuf);
  }

  console.log("Retouched & rebranded Kinetix AI screens.");
}

async function main() {
  await retouchMahjongScreens();
  await retouchBookifyScreens();
  await retouchKinetixScreens();
  console.log("All image retouching complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
