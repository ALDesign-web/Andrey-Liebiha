export interface HotspotPin {
  id: string;
  code: string;
  label: string;
  summary: string;
  detail: string;
  metric: string;
  xPercent: number;
  yPercent: number;
}

export interface GameplayBeat {
  id: "board" | "victory";
  step: string;
  eyebrow: string;
  title: string;
  body: string;
  highlight: string;
}

export interface PbrMaterialSpec {
  id: string;
  name: string;
  finish: string;
  roughness: string;
  shaderNote: string;
  acousticFeel: string;
  accentHex: string;
  tileSrc: string;
  tileAlt: string;
  sound: "jade" | "ivory" | "stone";
}

export interface MonetizationMode {
  id: "no-ads" | "vip" | "boosters";
  tabLabel: string;
  badge: string;
  title: string;
  priceTag: string;
  screenSrc: string;
  screenAlt: string;
  rationale: string;
  bullets: string[];
  complianceNote: string;
}

export const HERO_TRIPTYCH = [
  {
    id: "home",
    label: "Home Hub",
    src: "/projects/mahjong/mockups/01_home_hub_upright.webp",
    alt: "Expedition Mahjong 3D perspective iPhone showing carved title, ivory Play CTA and 4-icon bottom navigation dock",
  },
  {
    id: "gameplay",
    label: "3D Board",
    src: "/projects/mahjong/mockups/02_gameplay_board_front.webp",
    alt: "Expedition Mahjong front-facing iPhone displaying active stacked bone tiles and timber utility dock",
  },
  {
    id: "victory",
    label: "Victory",
    src: "/projects/mahjong/mockups/03_victory_upright.webp",
    alt: "Expedition Mahjong 3D perspective iPhone showing bonsai pavilion victory screen and jade Play button",
  },
];

export const HOME_HOTSPOTS: HotspotPin[] = [
  {
    id: "brand-sculpture",
    code: "01",
    label: "Physical Material Identity",
    summary: "Leather & carved ivory wordmark anchored above safe-area insets.",
    detail:
      "Replaced flat vector game banners with stitched leather and beveled bone typography so the first frame communicates tactile realism before the player taps anything.",
    metric: "Safe-area calibrated",
    xPercent: 50,
    yPercent: 25,
  },
  {
    id: "macro-tiles",
    code: "02",
    label: "Macro 3D Tile Showcase",
    summary: "Dual hero tiles preview subsurface bevels & hand-engraved glyphs.",
    detail:
      "Anchor and nautical red character tiles act as silent onboarding—signaling crisp tap boundaries and high-contrast glyph legibility at phone reading distance.",
    metric: "Contrast ratio > 11:1",
    xPercent: 50,
    yPercent: 44,
  },
  {
    id: "primary-play",
    code: "03",
    label: "Thumb-Center Primary Play",
    summary: "Oversized ceramic Play pill placed in the natural one-hand arc.",
    detail:
      "A single generous beveled CTA starts or resumes the next of 200 levels with zero secondary modal popups blocking first-session momentum.",
    metric: "1-tap < 0.8s launch",
    xPercent: 50,
    yPercent: 67,
  },
  {
    id: "thumb-dock",
    code: "04",
    label: "4-Slot Ceramic Dock",
    summary: "Equal-size square tokens for Daily, Map, Store, and Settings.",
    detail:
      "Anchored along the lower 15% bottom safe zone so players reach every secondary hub with one thumb shift without blocking the central expedition chart.",
    metric: "56px+ hit geometry",
    xPercent: 72,
    yPercent: 88,
  },
];

export const GAMEPLAY_BEATS: GameplayBeat[] = [
  {
    id: "board",
    step: "01",
    eyebrow: "Active Play & Thumb Ergonomics",
    title: "Zero HUD clutter. Every utility inside the lower thumb arc.",
    body: "Upper screen real estate carries strictly passive telemetry (Score, Level, Remaining Pairs) tucked safely beside the Dynamic Island. Below the board, a weathered timber dock pins five large ceramic triggers (Back, Hint, Shuffle, Undo, Settings) right under the user's thumb.",
    highlight: "Rotate the 3D device with your cursor or inspect the Flat UI Spec.",
  },
  {
    id: "victory",
    step: "02",
    eyebrow: "Rewarding Resolution Hierarchy",
    title: "Clear visual weight between primary progression and optional reward.",
    body: "Victory celebration pairs a tranquil 3D bonsai shrine with strict 3-tier action weight: translucent sculpted emerald jade for next-stage Play, warm ivory for optional Bonus reward, and a quiet understated text trigger for Restart.",
    highlight: "Emerald jade primary CTA holds 3x visual mass over secondary actions.",
  },
];

export const PBR_MATERIALS: PbrMaterialSpec[] = [
  {
    id: "imperial-jade",
    name: "Imperial Jade",
    finish: "Clouded Emerald SSS",
    roughness: "0.08",
    shaderNote: "Translucent mineral jade body with smoky white quartz clouds and deeply recessed concentric ivory circles.",
    acousticFeel: "Dense resonant stone click",
    accentHex: "#10b981",
    tileSrc: "/projects/mahjong/tiles/tile_01_imperial_jade.webp",
    tileAlt: "Expedition Mahjong Imperial Jade 8-Circle 3D PBR tile render",
    sound: "jade",
  },
  {
    id: "royal-velvet",
    name: "Royal Velvet",
    finish: "Crimson Plush & Gold Foil",
    roughness: "0.92",
    shaderNote: "Groomed deep burgundy fur shader contrasting tactile pile fibers against satin gold-gradient engraved characters.",
    acousticFeel: "Soft plush damped thud",
    accentHex: "#be123c",
    tileSrc: "/projects/mahjong/tiles/tile_02_royal_velvet.webp",
    tileAlt: "Expedition Mahjong Royal Velvet plush burgundy 3-Wan 3D tile render",
    sound: "ivory",
  },
  {
    id: "onyx-marble",
    name: "Onyx Marble",
    finish: "Milky Stone & Amber Seam",
    roughness: "0.10",
    shaderNote: "Translucent white alabaster stone divided by a mineral amber fissure with dual-tone charcoal and gilt engraving.",
    acousticFeel: "Cool heavy stone clack",
    accentHex: "#d97706",
    tileSrc: "/projects/mahjong/tiles/tile_03_onyx_marble.webp",
    tileAlt: "Expedition Mahjong Onyx Marble amber-veined 5-Wan 3D tile render",
    sound: "stone",
  },
  {
    id: "porcelain",
    name: "Porcelain",
    finish: "Fine Craquelure Glaze",
    roughness: "0.05",
    shaderNote: "High-gloss ceramic clearcoat over subtle hairline kiln cracks framing a sharply inset crimson Red Dragon glyph.",
    acousticFeel: "Bright glassy porcelain ring",
    accentHex: "#dc2626",
    tileSrc: "/projects/mahjong/tiles/tile_04_porcelain.webp",
    tileAlt: "Expedition Mahjong Porcelain craquelure Red Dragon 3D tile render",
    sound: "jade",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    finish: "Fractured Volcanic Glass",
    roughness: "0.04",
    shaderNote: "Knapped conchoidal black glass perimeter catching razor specular rim highlights around a warm ivory-rimmed East glyph.",
    acousticFeel: "Crisp volcanic glass tap",
    accentHex: "#f59e0b",
    tileSrc: "/projects/mahjong/tiles/tile_05_obsidian.webp",
    tileAlt: "Expedition Mahjong Chipped Black Obsidian East Wind 3D tile render",
    sound: "stone",
  },
  {
    id: "terracotta-clay",
    name: "Raw Clay",
    finish: "Hand-Sculpted Matte Earth",
    roughness: "0.88",
    shaderNote: "Artisan unglazed clay surface retaining authentic fingerprint ridges and organic bevel wear with charcoal West carving.",
    acousticFeel: "Earthy dry ceramic clink",
    accentHex: "#d6a57c",
    tileSrc: "/projects/mahjong/tiles/tile_06_terracotta_clay.webp",
    tileAlt: "Expedition Mahjong hand-sculpted Raw Clay West Wind 3D tile render",
    sound: "stone",
  },
  {
    id: "antique-ivory",
    name: "Antique Ivory",
    finish: "Aged Veined Patina",
    roughness: "0.22",
    shaderNote: "Heirloom mineral patina with warm hairline veins and a multi-depth green and crimson carved floral 1-Dot emblem.",
    acousticFeel: "Warm aged bone snap",
    accentHex: "#16a34a",
    tileSrc: "/projects/mahjong/tiles/tile_07_antique_ivory.webp",
    tileAlt: "Expedition Mahjong Antique Ivory Lotus 1-Circle 3D tile render",
    sound: "ivory",
  },
  {
    id: "classic-bone",
    name: "Classic Bone",
    finish: "Polished Expedition Ivory",
    roughness: "0.14",
    shaderNote: "Signature high-contrast smooth ivory tile with subtle grain and deep cobalt blue engraving used on the core game board.",
    acousticFeel: "Clean classic mahjong clack",
    accentHex: "#2563eb",
    tileSrc: "/projects/mahjong/tiles/tile_08_classic_bone.webp",
    tileAlt: "Expedition Mahjong Classic Bone cobalt East Wind 3D tile render",
    sound: "ivory",
  },
];

export const MONETIZATION_MODES: MonetizationMode[] = [
  {
    id: "no-ads",
    tabLabel: "No-Ads Forever · $4.99",
    badge: "One-Time Purchase",
    title: "Explicit lifetime clarity with zero dark patterns.",
    priceTag: "$4.99 once",
    screenSrc: "/projects/mahjong/mockups/05_no_ads_upright.webp",
    screenAlt: "Expedition Mahjong permanent No Ads $4.99 one-time purchase 3D mockup",
    rationale:
      "Plain-language microcopy states upfront what the single payment removes (interstitial ads forever) while leaving optional rewarded videos untouched.",
    bullets: [
      "Replaces pushy countdown timers with a calm stone-framed offer card",
      "Carved teal-slate Purchase CTA clearly anchors at bottom thumb reach",
      "Terms & Privacy links sit subtly outside active button collision zones",
    ],
    complianceNote: "Zero misleading copy · Transparent lifetime unlock",
  },
  {
    id: "vip",
    tabLabel: "VIP Pass · $1.99/mo",
    badge: "Fair-Play Subscription",
    title: "Amethyst material signature exclusively signals VIP status.",
    priceTag: "$1.99 / month",
    screenSrc: "/projects/mahjong/mockups/06_subscription_upright.webp",
    screenAlt: "Expedition Mahjong VIP monthly $1.99 subscription 3D mockup with amethyst Purchase button",
    rationale:
      "Reserved the purple amethyst crystalline shader strictly for subscription touchpoints so players build an instant visual mental model across the app.",
    bullets: [
      "All 200 levels remain completable free without buying VIP",
      "Concise 4-bullet value stack: zero banners, 2x rewards, all 8 themes unlocked",
      "Renewal and cancellation disclosures placed inline above the fold per Apple HIG 3.1.2",
    ],
    complianceNote: "Apple HIG 3.1.2 compliant disclosure block",
  },
  {
    id: "boosters",
    tabLabel: "Rewarded Chest",
    badge: "100% Opt-In Boosters",
    title: "Player choice transforms ad tolerance into agency.",
    priceTag: "Voluntary Opt-In",
    screenSrc: "/projects/mahjong/mockups/04_bonus_reward_upright.webp",
    screenAlt: "Expedition Mahjong rewarded booster selection 3D mockup showing chest and 3 ceramic tokens",
    rationale:
      "Rather than forcing random drops, the post-reward sheet hands players three circular ceramic utility tokens (Hint, Shuffle, Undo) and an optional Double reward path.",
    bullets: [
      "Immediate tactile choice across 3 distinct high-contrast helper icons",
      "Emerald jade Play continues momentum without watching extra ads",
      "Secondary clapperboard icon makes optional ad triggers unmistakable",
    ],
    complianceNote: "Zero forced interstitials · Full player agency",
  },
];
