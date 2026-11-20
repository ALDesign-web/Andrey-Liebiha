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
  id: "board" | "stuck" | "victory";
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
  surfaceGradient: string;
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
    src: "/projects/mahjong/mockups/02_gameplay_board_upright.webp",
    alt: "Expedition Mahjong 3D perspective iPhone displaying active stacked bone tiles and timber utility dock",
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
    xPercent: 48,
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
    xPercent: 71,
    yPercent: 85,
  },
];

export const GAMEPLAY_BEATS: GameplayBeat[] = [
  {
    id: "board",
    step: "01",
    eyebrow: "Active Play & Thumb Ergonomics",
    title: "Zero HUD clutter. Every utility inside the lower thumb arc.",
    body: "Upper screen real estate carries strictly passive telemetry (Score, Level, Remaining Pairs) tucked safely beside the Dynamic Island. Below the board, a weathered timber dock pins five large ceramic triggers (Back, Hint, Shuffle, Undo, Settings) right under the user's thumb.",
    highlight: "Inspect live Thumb-Zone & Safe-Area overlays on the device.",
  },
  {
    id: "stuck",
    step: "02",
    eyebrow: "Non-Destructive Deadlock Recovery",
    title: "Keeping the board visible inside a draggable bottom sheet.",
    body: "When no valid pairs remain, full-screen dark modals cause disorientation and rage-quits. Instead, a half-height parchment drawer slides up smoothly while keeping the upper tile stack clear. Drag the sheet down or spin the shuffle helm directly on the phone to test the transition.",
    highlight: "Drag the parchment sheet downward or click the helm on the device.",
  },
  {
    id: "victory",
    step: "03",
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
    finish: "Translucent Emerald SSS",
    roughness: "0.08",
    shaderNote: "Subsurface scattering + internal mineral inclusions give primary Play CTAs unmistakable physical depth.",
    acousticFeel: "Dense resonant stone click",
    accentHex: "#10b981",
    surfaceGradient: "linear-gradient(135deg, #0b4f3a 0%, #177b59 48%, #073426 100%)",
    sound: "jade",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    finish: "Kintsugi Gold Vein Glass",
    roughness: "0.04",
    shaderNote: "Specially tuned specular rim with warm metallic veins for high-contrast night play without neon glare.",
    acousticFeel: "Crisp volcanic glass tap",
    accentHex: "#f59e0b",
    surfaceGradient: "linear-gradient(135deg, #121318 0%, #262933 50%, #090a0d 100%)",
    sound: "stone",
  },
  {
    id: "carrara-marble",
    name: "Carrara Marble",
    finish: "Honed Italian Stone",
    roughness: "0.12",
    shaderNote: "Soft grey calcite veining maintains crisp character contrast for dark engraved mahjong suits.",
    acousticFeel: "Cool heavy marble clack",
    accentHex: "#e2e8f0",
    surfaceGradient: "linear-gradient(135deg, #cfd6df 0%, #eef2f6 52%, #b2bcc8 100%)",
    sound: "stone",
  },
  {
    id: "royal-velvet",
    name: "Royal Velvet",
    finish: "Gold Inlay Weave",
    roughness: "0.85",
    shaderNote: "Anisotropic sheen absorbs harsh highlights along the table surface so foreground bone tiles pop effortlessly.",
    acousticFeel: "Muffled felt-cushioned thud",
    accentHex: "#f43f5e",
    surfaceGradient: "linear-gradient(135deg, #591124 0%, #8e1d38 50%, #3b0a16 100%)",
    sound: "ivory",
  },
  {
    id: "porcelain",
    name: "Porcelain",
    finish: "Cobalt Ming Glaze",
    roughness: "0.05",
    shaderNote: "High-gloss ceramic clearcoat over subtle dragon blue filigree framing classic tile symbols.",
    acousticFeel: "Bright glassy porcelain ring",
    accentHex: "#38bdf8",
    surfaceGradient: "linear-gradient(135deg, #dce8f5 0%, #f5f9ff 52%, #bfd4ec 100%)",
    sound: "jade",
  },
  {
    id: "antique-ivory",
    name: "Antique Ivory",
    finish: "Warm Craquelure Patina",
    roughness: "0.22",
    shaderNote: "Default signature suite balancing warm cream midtones with deep emerald and crimson carved inks.",
    acousticFeel: "Warm classic bone snap",
    accentHex: "#facc15",
    surfaceGradient: "linear-gradient(135deg, #d8c39b 0%, #f1e3c4 52%, #b99f72 100%)",
    sound: "ivory",
  },
  {
    id: "teak-wood",
    name: "Teak Wood",
    finish: "Oiled Timber Grain",
    roughness: "0.35",
    shaderNote: "Warm longitudinal grain anchoring the in-game bottom utility bar with organic furniture warmth.",
    acousticFeel: "Dry hollow hardwood knock",
    accentHex: "#d97706",
    surfaceGradient: "linear-gradient(135deg, #5a3821 0%, #865635 50%, #3d2413 100%)",
    sound: "ivory",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    finish: "Matte Kiln Clay",
    roughness: "0.90",
    shaderNote: "Earthy unglazed clay finish offering high micro-contrast and warm Mediterranean palette variety.",
    acousticFeel: "Earthy dry ceramic clink",
    accentHex: "#fb923c",
    surfaceGradient: "linear-gradient(135deg, #8a4124 0%, #b85b35 50%, #5c2814 100%)",
    sound: "stone",
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
