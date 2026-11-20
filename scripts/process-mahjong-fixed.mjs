import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "screens fixed");
const MOCKUPS_OUT = path.join(ROOT, "public/projects/mahjong/mockups");
const SCREENS_OUT = path.join(ROOT, "public/projects/mahjong/screens");
const DECK_FIXED_DIR = "/Users/design/HQplug/landing portfolio/mahjong screens/fixed";

fs.mkdirSync(MOCKUPS_OUT, { recursive: true });
fs.mkdirSync(SCREENS_OUT, { recursive: true });
fs.mkdirSync(DECK_FIXED_DIR, { recursive: true });

const MOCKUPS = [
  { src: "HOME8mock.png", out: "01_home_hub_mock.webp" },
  { src: "GAMEmock.png", out: "02_gameplay_board_mock.webp" },
  { src: "WONmock.png", out: "03_victory_mock.webp" },
  { src: "BONUSMock.png", out: "04_bonus_reward_mock.webp" },
  { src: "NO ADSmock.png", out: "05_no_ads_mock.webp" },
  { src: "SUBSCRIPTIONmock.png", out: "06_subscription_mock.webp" },
  { src: "SETTINGSmock.png", out: "07_settings_mock.webp" },
  { src: "RATE USmock.png", out: "08_rate_us_mock.webp" },
];

const FLAT_SCREENS = [
  { src: "HOME8.png", out: "01_home_hub.webp", extract: { left: 12, top: 0, width: 1555, height: 3383 } },
  { src: "GAME.png", out: "02_gameplay_board.webp", extract: { left: 0, top: 0, width: 1556, height: 3384 } },
  { src: "WON.png", out: "03_victory_celebration.webp", extract: { left: 0, top: 0, width: 1558, height: 3384 } },
  { src: "STUCK POP-UP.png", out: "04_stuck_recovery.webp", extract: { left: 0, top: 0, width: 1556, height: 3384 }, fixStuckSpace: true },
  { src: "BONUS REWARD AFTER AD.png", out: "05_bonus_reward.webp", extract: { left: 0, top: 0, width: 1558, height: 3384 } },
  { src: "NO ADS.png", out: "06_no_ads_offer.webp", extract: { left: 0, top: 0, width: 1556, height: 3384 } },
  { src: "SUBSCRIPTION.png", out: "07_vip_subscription.webp", extract: { left: 16, top: 0, width: 1556, height: 3384 } },
  { src: "SETTINGS.png", out: "08_audio_haptic_settings.webp", extract: { left: 16, top: 0, width: 1556, height: 3384 } },
  { src: "RATE US.png", out: "09_rate_us_funnel.webp", extract: { left: 0, top: 0, width: 1556, height: 3384 } },
];

async function processMockups() {
  for (const item of MOCKUPS) {
    const srcPath = path.join(SRC_DIR, item.src);
    const outPath = path.join(MOCKUPS_OUT, item.out);
    const deckPath = path.join(DECK_FIXED_DIR, item.out);

    const uprightOut = item.out.replace("_mock.webp", "_upright.webp");
    const uprightPath = path.join(MOCKUPS_OUT, uprightOut);

    const outBuf = await sharp(srcPath)
      .trim({ threshold: 2 })
      .resize({ height: 1800, withoutEnlargement: true })
      .webp({ quality: 92, alphaQuality: 95 })
      .toBuffer();

    fs.writeFileSync(outPath, outBuf);
    fs.writeFileSync(uprightPath, outBuf);
    fs.writeFileSync(deckPath, outBuf);
    const meta = await sharp(outBuf).metadata();
    console.log(`Mockup ${item.out} (+ ${uprightOut}): ${meta.width}x${meta.height}`);
  }

  // Keep legacy mockup paths updated as well
  fs.copyFileSync(path.join(MOCKUPS_OUT, "03_victory_mock.webp"), path.join(MOCKUPS_OUT, "slide05_victory_34.webp"));
  fs.copyFileSync(path.join(MOCKUPS_OUT, "06_subscription_mock.webp"), path.join(MOCKUPS_OUT, "slide06_paywall_34.webp"));
  fs.copyFileSync(path.join(MOCKUPS_OUT, "07_settings_mock.webp"), path.join(MOCKUPS_OUT, "slide07_settings_34.webp"));
}

async function processFlatScreens() {
  for (const item of FLAT_SCREENS) {
    const srcPath = path.join(SRC_DIR, item.src);
    const outPath = path.join(SCREENS_OUT, item.out);
    const deckPath = path.join(DECK_FIXED_DIR, item.out);

    let baseBuf = await sharp(srcPath)
      .extract(item.extract)
      .resize(900, 1956, { fit: "fill" })
      .removeAlpha()
      .toBuffer();

    if (item.fixStuckSpace) {
      const seamlessCover = await sharp(baseBuf)
        .extract({ left: 145, top: 1044, width: 24, height: 64 })
        .blur(5)
        .resize(118, 64, { fit: "fill" })
        .toBuffer();

      const noPatch = await sharp(baseBuf)
        .extract({ left: 194, top: 1044, width: 92, height: 64 })
        .toBuffer();

      baseBuf = await sharp(baseBuf)
        .composite([
          { input: seamlessCover, left: 188, top: 1044 },
          { input: noPatch, left: 209, top: 1044 },
        ])
        .toBuffer();
    }

    const outBuf = await sharp(baseBuf).webp({ quality: 92 }).toBuffer();
    fs.writeFileSync(outPath, outBuf);
    fs.writeFileSync(deckPath, outBuf);
    console.log(`Screen ${item.out}: 900x1956`);
  }

  // Keep legacy screen paths updated to clean new renders
  fs.copyFileSync(path.join(SCREENS_OUT, "03_victory_celebration.webp"), path.join(SCREENS_OUT, "01_victory_celebration.webp"));
  fs.copyFileSync(path.join(SCREENS_OUT, "04_stuck_recovery.webp"), path.join(SCREENS_OUT, "02_streak_protection.webp"));
  fs.copyFileSync(path.join(SCREENS_OUT, "06_no_ads_offer.webp"), path.join(SCREENS_OUT, "04_material_store.webp"));
  fs.copyFileSync(path.join(SCREENS_OUT, "07_vip_subscription.webp"), path.join(SCREENS_OUT, "05_vip_paywall.webp"));
  fs.copyFileSync(path.join(SCREENS_OUT, "05_bonus_reward.webp"), path.join(SCREENS_OUT, "06_rewarded_boosters.webp"));
  fs.copyFileSync(path.join(SCREENS_OUT, "08_audio_haptic_settings.webp"), path.join(SCREENS_OUT, "09_audio_haptic_settings.webp"));
  fs.copyFileSync(path.join(SCREENS_OUT, "09_rate_us_funnel.webp"), path.join(SCREENS_OUT, "12_organic_rating_funnel.webp"));
}

async function main() {
  await processMockups();
  await processFlatScreens();
  console.log("All 17 Mahjong assets processed cleanly.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
