import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const ROOT_DIR = process.cwd();
const RIVE_PROJECTS_DIR = path.join(ROOT_DIR, "src", "rive-projects");
const PUBLIC_RIVE_DIR = path.join(ROOT_DIR, "public", "rive");

// Ensure public/rive directory exists
if (!fs.existsSync(PUBLIC_RIVE_DIR)) {
  fs.mkdirSync(PUBLIC_RIVE_DIR, { recursive: true });
}

// Find Rive CLI binary
function findRiveBin() {
  try {
    const which = execSync("which rive", { encoding: "utf8" }).trim();
    if (which) return which;
  } catch {
    // Check default ~/.rive/bin/rive path
    const fallbackPath = path.join(os.homedir(), ".rive", "bin", "rive");
    if (fs.existsSync(fallbackPath)) {
      return fallbackPath;
    }
  }
  return null;
}

const riveBin = findRiveBin();

if (!riveBin) {
  console.warn(
    "[rive-build] Warning: Rive CLI ('rive') was not found in PATH or ~/.rive/bin/rive.\n" +
    "To install Rive CLI on macOS/Linux:\n" +
    "  curl -fsSL https://releases.rive.app/cli/install.sh | sh\n" +
    "  export PATH=\"$HOME/.rive/bin:$PATH\"\n"
  );
  process.exit(0);
}

if (!fs.existsSync(RIVE_PROJECTS_DIR)) {
  console.log("[rive-build] No src/rive-projects directory found. Skipping.");
  process.exit(0);
}

const entries = fs.readdirSync(RIVE_PROJECTS_DIR, { withFileTypes: true });
const projects = entries.filter(
  (entry) =>
    entry.isDirectory() &&
    (fs.existsSync(path.join(RIVE_PROJECTS_DIR, entry.name, "scene.rml")) ||
      fs.existsSync(path.join(RIVE_PROJECTS_DIR, entry.name, "rive.yaml")))
);

if (projects.length === 0) {
  console.log("[rive-build] No Rive projects found in src/rive-projects.");
  process.exit(0);
}

console.log(`[rive-build] Compiling ${projects.length} Rive project(s)...`);

for (const project of projects) {
  const projectPath = path.join(RIVE_PROJECTS_DIR, project.name);
  console.log(`[rive-build] Building '${project.name}'...`);

  try {
    execSync(`"${riveBin}" "${projectPath}" --once`, {
      stdio: "inherit",
      env: {
        ...process.env,
        PATH: `${path.join(os.homedir(), ".rive", "bin")}:${process.env.PATH || ""}`,
      },
    });

    const buildDir = path.join(projectPath, "build");
    if (fs.existsSync(buildDir)) {
      const files = fs.readdirSync(buildDir);
      const rivFile = files.find((f) => f.endsWith(".riv"));
      if (rivFile) {
        const srcPath = path.join(buildDir, rivFile);
        const destPath = path.join(PUBLIC_RIVE_DIR, `${project.name}.riv`);
        fs.copyFileSync(srcPath, destPath);
        const stats = fs.statSync(destPath);
        console.log(`[rive-build] -> Copied to public/rive/${project.name}.riv (${stats.size} bytes)`);
      }
    }
  } catch (err) {
    console.error(`[rive-build] Failed to build ${project.name}:`, err.message);
    process.exit(1);
  }
}

console.log("[rive-build] All Rive projects compiled successfully.");
