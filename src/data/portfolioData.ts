import { ProjectItem, ExperienceItem, SkillCategory, CVMetadata } from "@/types/portfolio";

export const PORTFOLIO_HERO = {
  availability: "Open to Senior Mobile UX/UI & Product Design Roles",
  name: "ANDRII LIEBIHA",
  role: "Senior Mobile UX/UI Designer",
  headlineTop: "Mobile UX/UI",
  headlineBottom: "built to feel tactile.",
  tagline: "Designing iOS and Android apps, fluid micro-interactions, and high-converting digital products.",
  bio: "Senior Mobile UX/UI Designer with 7+ years of commercial experience and a Higher Degree in Product Design. Focused on native-feeling mobile experiences (iOS HIG & Material 3), interactive motion systems, and practical code prototypes built in React and Rive."
};

export const CV_METADATA: CVMetadata = {
  availability: "Open to Senior Mobile UX/UI & Product Design Roles",
  location: "Remote / Hybrid (Worldwide)",
  email: "liebihadesign@gmail.com",
  telegram: "https://t.me/ALMotion3D",
  behance: "https://www.behance.net/ALMotion3D",
  education: {
    degree: "Higher Degree in Product Design",
    field: "Product & Industrial Design",
    type: "Formal Academic Qualification",
    details: "Foundational academic training in human ergonomics, spatial balance, tactile materials, and visual hierarchy."
  },
  languages: [
    {
      language: "English",
      level: "Full Professional Proficiency",
      details: "C1 / C2 · Product Critique, Documentation & Stakeholder Lead"
    },
    {
      language: "Ukrainian",
      level: "Native",
      details: "Native Proficiency"
    }
  ]
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "expedition-mahjong-3d",
    slug: "expedition-mahjong",
    number: "01",
    title: "Expedition Mahjong",
    subtitle: "3D Spatial Mobile UI, PBR Material System & Interactive Polish",
    client: "Vortex Lab s.r.o. (Live on App Store)",
    year: "2025 – 2026",
    platform: "iOS & Android",
    stage: "commercial",
    stageLabel: "Live Mobile Product",
    category: "3d-mobile",
    categoryLabel: "Mobile Game UX/UI & 3D Craft",
    imageSrc: "/projects/mahjong/mockups/02_gameplay_board_upright.webp",
    heroMobileImage: "/projects/mahjong/screens/01_home_hub.webp",
    mockups: [
      {
        src: "/projects/mahjong/mockups/01_home_hub_upright.webp",
        title: "Home Hub & World Map Entry",
        caption: "Sculpted leather & ivory title over an explorer chart with a central tactile Play CTA and bottom 4-icon navigation dock.",
        orientation: "portrait",
        tag: "3D Mockup · Entry Flow"
      },
      {
        src: "/projects/mahjong/mockups/02_gameplay_board_upright.webp",
        title: "Core 3D Gameplay & Timber Dock",
        caption: "Layered 3D bone tiles with ambient drop-shadows paired with a 5-slot thumb-zone timber dock (Back, Hint, Shuffle, Undo, Settings).",
        orientation: "portrait",
        tag: "3D Mockup · Core Loop"
      },
      {
        src: "/projects/mahjong/mockups/03_victory_upright.webp",
        title: "Victory & Reward Hierarchy",
        caption: "Bonsai pavilion celebration overlay balanced inside portrait viewport with carved jade primary CTA and bonus reward option.",
        orientation: "portrait",
        tag: "3D Mockup · Win Loop"
      },
      {
        src: "/projects/mahjong/mockups/04_bonus_reward_upright.webp",
        title: "Rewarded Booster Chest",
        caption: "Voluntary ad reward screen presenting 3 circular ceramic utility tokens (Hint, Shuffle, Undo) alongside a clear Double reward CTA.",
        orientation: "portrait",
        tag: "3D Mockup · Rewarded UX"
      },
      {
        src: "/projects/mahjong/mockups/05_no_ads_upright.webp",
        title: "Permanent No-Ads Offer ($4.99)",
        caption: "Transparent single-purchase paywall removing interstitial ads forever while keeping optional rewarded videos accessible.",
        orientation: "portrait",
        tag: "3D Mockup · One-Time Pass"
      },
      {
        src: "/projects/mahjong/mockups/06_subscription_upright.webp",
        title: "VIP Subscription Paywall ($1.99/mo)",
        caption: "Single-screen subscription sheet pairing benefit scannability, compliant renewal terms, and an amethyst stone Purchase CTA.",
        orientation: "portrait",
        tag: "3D Mockup · Monetization"
      },
      {
        src: "/projects/mahjong/mockups/07_settings_upright.webp",
        title: "Audio, Haptics & Cloud Sync",
        caption: "Physical 3D toggle switches separate SFX, haptic vibration, and music alongside Apple Sign-In and Google Play cloud backup.",
        orientation: "portrait",
        tag: "3D Mockup · Preferences"
      },
      {
        src: "/projects/mahjong/mockups/08_rate_us_upright.webp",
        title: "Two-Step Sentiment Sheet",
        caption: "Half-height bottom sheet keeps active tiles visible above while routing happy players to store ratings or constructive feedback.",
        orientation: "portrait",
        tag: "3D Mockup · Rating Flow"
      }
    ],
    screens: [
      {
        src: "/projects/mahjong/screens/01_home_hub.webp",
        title: "Home Screen & Thumb Dock",
        caption: "Clean portrait entry uniting embossed branding, giant ivory Play button, and calendar, map, store, and settings icons.",
        orientation: "portrait",
        tag: "Entry UI"
      },
      {
        src: "/projects/mahjong/screens/02_gameplay_board.webp",
        title: "3D Tile Board & Booster Bar",
        caption: "Passive top HUD (Score, Level, Pairs) keeps full focus on stacked 3D tiles while primary gameplay utilities anchor to the bottom arc.",
        orientation: "portrait",
        tag: "Gameplay HUD"
      },
      {
        src: "/projects/mahjong/screens/03_victory_celebration.webp",
        title: "Victory Screen Hierarchy",
        caption: "Balanced hierarchy placing carved jade Play CTA first, voluntary Bonus reward second, and a calm Restart link at safe-area bottom.",
        orientation: "portrait",
        tag: "Victory"
      },
      {
        src: "/projects/mahjong/screens/04_stuck_recovery.webp",
        title: "Low-Friction Recovery Sheet",
        caption: "Board-visible parchment recovery drawer offers an instant wheel shuffle on deadlock so players never lose match context.",
        orientation: "portrait",
        tag: "Bottom Sheet"
      },
      {
        src: "/projects/mahjong/screens/05_bonus_reward.webp",
        title: "Post-Ad Booster Selection",
        caption: "Three equidistant ceramic tokens allow players to claim their preferred gameplay helper in a single thumb tap.",
        orientation: "portrait",
        tag: "Micro-UI"
      },
      {
        src: "/projects/mahjong/screens/06_no_ads_offer.webp",
        title: "Permanent No-Ads Paywall",
        caption: "Plain-language single-purchase card clearly distinguishes interstitial removal from voluntary rewarded videos.",
        orientation: "portrait",
        tag: "Monetization"
      },
      {
        src: "/projects/mahjong/screens/07_vip_subscription.webp",
        title: "VIP Monthly Paywall ($1.99/mo)",
        caption: "App Store guideline compliant renewal notice paired with amethyst CTA unlocking all 8 PBR tile suites and double rewards.",
        orientation: "portrait",
        tag: "Subscription"
      },
      {
        src: "/projects/mahjong/screens/08_audio_haptic_settings.webp",
        title: "Sensory Toggles & Cloud Sync",
        caption: "Independent toggles for SFX, Taptic feedback, and music with scannable preference rows and Google Play / Apple account sync.",
        orientation: "portrait",
        tag: "Settings"
      },
      {
        src: "/projects/mahjong/screens/09_rate_us_funnel.webp",
        title: "Contextual Rating Bottom Sheet",
        caption: "Thumb-zone sentiment modal pairing emerald Good CTA and warm parchment feedback action right below the live board.",
        orientation: "portrait",
        tag: "Feedback Flow"
      }
    ],
    slides: [
      "/projects/mahjong/slide_01.jpg",
      "/projects/mahjong/slide_02.jpg",
      "/projects/mahjong/slide_03.jpg",
      "/projects/mahjong/slide_04.jpg",
      "/projects/mahjong/slide_05.jpg",
      "/projects/mahjong/slide_06.jpg",
      "/projects/mahjong/slide_07.jpg",
      "/projects/mahjong/slide_08.jpg",
      "/projects/mahjong/slide_09.jpg",
      "/projects/mahjong/slide_10.jpg"
    ],
    summary: "End-to-end visual direction, spatial UI architecture, and 43+ portrait mobile screens across 200 hand-crafted levels for a shipped iOS & Android mahjong title.",
    challenge: "Classic mobile tile games frequently suffer from noisy HUDs, flat buttons with weak feedback, and jarring popup interruptions that pull players out of flow. We needed multi-layer 3D boards across 200 hand-crafted levels to stay readable on compact smartphone screens while giving every tap physical weight.",
    solution: "Designed a cohesive material and layout system spanning 43+ screens and 200 hand-crafted levels: one-handed thumb-zone action placement, 8 physical PBR board suites (Imperial Jade, Obsidian, Carrara Marble, Royal Velvet, Porcelain, Antique Ivory, Teak Wood & Terracotta), ethical monetization flows ($4.99 permanent No-Ads pass, $1.99/mo Amethyst VIP paywall, 3-choice Rewarded Booster modal), board-visible recovery sheets, and haptic-paired preference controls.",
    mobileAndMotionNotes: "Every primary action sits within the lower portrait thumb arc with minimum 48px touch geometry. Elevation shadows, rim highlights, and short spring curves distinguish pressable stone controls from informational parchment surfaces without heavy shader overhead.",
    role: "Lead Mobile UX/UI Designer (UI Architecture, 3D Material System, Screen Flows & Motion Direction)",
    metrics: [
      { label: "Level Architecture", value: "200 Levels", change: "Live App Store Release" },
      { label: "Designed Scope", value: "43+ Screens", change: "End-to-End Mobile System" },
      { label: "Material Library", value: "8 PBR Themes", change: "Jade, Marble, Porcelain & More" }
    ],
    processSteps: [
      {
        phase: "Portrait Ergonomics",
        title: "Thumb-Zone Action Mapping",
        detail: "Moved primary Play, Claim, Restart, and recovery triggers into the bottom third of portrait viewports while reserving upper screen real estate for score, close triggers, and uninterrupted tile boards."
      },
      {
        phase: "Physical Material Tokens",
        title: "Carved Stone & Ceramic UI Kit",
        detail: "Crafted 8 distinct tile and tabletop suites (Imperial Jade, Obsidian, Carrara Marble, Royal Velvet, Porcelain, Antique Ivory, Teak Wood, Terracotta) alongside an amethyst VIP subscription shader and ceramic booster tokens."
      },
      {
        phase: "Non-Destructive Interruptions",
        title: "Board-Visible Recovery Sheets",
        detail: "Structured stuck-board and rating prompts as contextual bottom sheets so players never lose spatial awareness of remaining tile matches."
      }
    ],
    tools: ["Figma", "3D PBR Materials", "iOS HIG & Material 3", "Audio-Haptic Choreography", "Unity UI Handoff"],
    deliverables: [
      "43+ Portrait Mobile Screens (iOS & Android)",
      "8 Custom Material & Tile Theme Suites",
      "Thumb-Zone Recovery Bottom Sheets & Rating Funnel",
      "$4.99 No-Ads Pass, $1.99/mo VIP Paywall & 3-Choice Booster UI",
      "Tactile Audio-Haptic Control & Cloud Save System"
    ],
    featured: true,
    behanceUrl: "https://www.behance.net/ALMotion3D"
  },
  {
    id: "bookify-art-ecommerce",
    slug: "bookify",
    number: "02",
    title: "Bookify Platform",
    subtitle: "Rebranding «Книгарня Небо» & Express Checkout CRO System",
    client: "Bookify («Книгарня Небо» · bookify.com.ua)",
    year: "2023 – 2024",
    platform: "Responsive Web & Mobile Checkout",
    stage: "commercial",
    stageLabel: "Commercial Product",
    category: "ecommerce-cro",
    categoryLabel: "Brand Evolution & E-Commerce CRO",
    imageSrc: "/projects/bookify/crop_product_detail.webp",
    screens: [
      {
        src: "/projects/bookify/crop_catalog_browser.webp",
        title: "Editorial Collector Catalog",
        caption: "High-clarity cover grid with curatorial edition ratings and concise metadata for rapid art-book discovery.",
        orientation: "landscape",
        tag: "Catalog UX"
      },
      {
        src: "/projects/bookify/crop_product_detail.webp",
        title: "Product Detail & Gallery",
        caption: "Dual-locale storefront supports regional UA editions (₴400–₴600, ₴1,595 store AOV) and international collector folios ($260 Atlas Maior) with interior spread previews.",
        orientation: "landscape",
        tag: "PDP Layout"
      },
      {
        src: "/projects/bookify/crop_checkout.webp",
        title: "Zero-Redirect Inline Express Checkout",
        caption: "Purchase Now tab condenses checkout into 3 essential inputs (Name, Email, Phone) directly inside the product page.",
        orientation: "landscape",
        tag: "Checkout CRO"
      },
      {
        src: "/projects/bookify/crop_reviews.webp",
        title: "Verified Reader Reviews",
        caption: "Embedded review cards address print quality and paper weight expectations before cart entry.",
        orientation: "landscape",
        tag: "Trust UI"
      },
      {
        src: "/projects/bookify/crop_atlas_spread.webp",
        title: "Macro Interior Spread Preview",
        caption: "Detail photography communicates binding scale and archival print quality for collector editions.",
        orientation: "landscape",
        tag: "Visual Craft"
      }
    ],
    slides: [
      "/projects/bookify/crop_product_detail.webp",
      "/projects/bookify/crop_catalog_browser.webp",
      "/projects/bookify/crop_checkout.webp",
      "/projects/bookify/crop_reviews.webp",
      "/projects/bookify/crop_atlas_spread.webp"
    ],
    summary: "Digital transformation and rebranding of Kyiv art bookstore «Книгарня Небо» into Bookify (bookify.com.ua), rebuilding discovery, interior print inspection, and checkout speed into a measurable conversion engine.",
    challenge: "Buyers hesitated to purchase curated art books (₴400 to ₴600+ everyday editions, up to $260 archival folios) online when they could not inspect paper texture or interior spreads, while a sluggish 108-second multi-page checkout caused severe drop-off.",
    solution: "Unified brand identity across UA & international locales (supporting Nova Poshta branch delivery and multi-currency collector folios) and redesigned the commerce flow around three interventions: gallery-grade double-spread photography on PDPs, contextual collector reviews inside the evaluation tab bar, and a progressive inline Purchase Now checkout requiring only 3 essential fields.",
    mobileAndMotionNotes: "Structured progressive tab transitions (Product Details -> Rating & Reviews -> Purchase Now) so shoppers complete an express order without losing context, forming the blueprint for a compact mobile bottom-sheet checkout flow.",
    role: "Lead Product Designer (Rebranding, E-Commerce IA, PDP & Checkout CRO)",
    metrics: [
      { label: "Checkout CVR", value: "5.8%", change: "+141.6% vs 2.4% baseline" },
      { label: "Checkout Time", value: "45s", change: "-58.3% down from 108s" },
      { label: "Average Order Value", value: "₴1,595", change: "+28.5% Order Lift" }
    ],
    processSteps: [
      {
        phase: "Funnel Bottleneck Audit",
        title: "Eliminating Redirect Abandonment",
        detail: "Mapped drop-offs between Add-to-Cart and final order submission and removed redundant account registration prompts before purchase."
      },
      {
        phase: "Collector Confidence",
        title: "In-Context Print Inspection",
        detail: "Added macro interior spread thumbnails and curated edition specs right above the fold to replicate physical bookstore browsing."
      },
      {
        phase: "3-Field Express Tab",
        title: "45-Second Completion Flow",
        detail: "Embedded Name, Email, Phone, and immediate Buy Now execution inside an inline PDP tab so decisive buyers never leave the page."
      }
    ],
    tools: ["Figma (AutoLayout & Variables)", "Funnel CRO & Analytics", "Editorial Typography", "Express Payment UX", "Responsive Grid System"],
    deliverables: [
      "Rebranding («Книгарня Небо» -> Bookify)",
      "Editorial Art-Book Catalog & Curation Score UI",
      "Macro Spread Inspection Gallery on PDP",
      "45s Inline 3-Field Express Checkout Architecture",
      "Responsive Design Token & Component Specification"
    ],
    featured: true,
    behanceUrl: "https://www.behance.net/ALMotion3D"
  },
  {
    id: "kinetix-creator-studio",
    slug: "kinetix-ai",
    number: "03",
    title: "Kinetix AI Studio",
    subtitle: "Conceptual Exploration of Dark-Mode Creator Telemetry & Bento UI",
    client: "Conceptual Study & Design Token Exploration",
    year: "2024",
    platform: "Web & Mobile Companion Study",
    stage: "concept",
    stageLabel: "Concept & UI Study",
    category: "ai-saas",
    categoryLabel: "Conceptual SaaS & Design Tokens",
    imageSrc: "/projects/kinetix/crop_analytics.webp",
    heroVideo: {
      src: "/projects/kinetix/kinetix-showcase.mp4",
      poster: "/projects/kinetix/kinetix-showcase-poster.png",
      title: "Kinetix AI Studio · Interactive Product Reel",
      caption:
        "1080p 60fps decomposed UI reel built in Remotion: telemetry workbench, live SVG curves, multi-channel routing graph, and modular bento micro-interactions.",
    },
    screens: [
      {
        src: "/projects/kinetix/crop_analytics.webp",
        title: "Creator Telemetry Workbench",
        caption: "Concept exploration balancing cross-channel reach KPIs, area trend curves, and channel attribution cards on low-glare surfaces.",
        orientation: "landscape",
        tag: "Workspace UI"
      },
      {
        src: "/projects/kinetix/crop_node_flow.webp",
        title: "Multi-Channel Routing Graph",
        caption: "Diagram study visualizing how automated publishing pipelines connect content briefs, asset synthesis, and analytics endpoints.",
        orientation: "landscape",
        tag: "IA Study"
      },
      {
        src: "/projects/kinetix/crop_bento.webp",
        title: "Modular Feature Bento Tokens",
        caption: "Component spacing and asymmetric dark-surface bento framing practice built on an 8pt baseline grid.",
        orientation: "landscape",
        tag: "Component Study"
      },
      {
        src: "/projects/kinetix/crop_ai_studio.webp",
        title: "Visual Synthesis & Topic Clustering",
        caption: "UI exploration of compact story-frame generators and reach-weighted topic recommendations inside feature cards.",
        orientation: "landscape",
        tag: "UI Micro-Pattern"
      }
    ],
    slides: [
      "/projects/kinetix/crop_analytics.webp",
      "/projects/kinetix/crop_node_flow.webp",
      "/projects/kinetix/crop_bento.webp",
      "/projects/kinetix/crop_ai_studio.webp"
    ],
    summary: "Self-directed conceptual UI study exploring information density, dark-mode surface hierarchy, and modular bento component tokens for an AI creator telemetry workspace.",
    challenge: "High-density productivity concepts often overwhelm screens with saturated gradients and competing panels. This exercise focused on keeping multi-pane navigation, charts, and workflow cards calm and structured.",
    solution: "Built a disciplined dark surface token study using subtle borders, disciplined violet state highlights, an 8pt spacing system, and clear separation between primary navigation, analytics charts, and contextual action modules.",
    mobileAndMotionNotes: "Focused on strict typographic hierarchy, card restraint, and predictable panel density rather than decorative chrome.",
    role: "Product Design Practice (UI Exploration, Token Structure & Bento Hierarchy)",
    metrics: [
      { label: "Project Classification", value: "Study Project", change: "Non-Production Concept" },
      { label: "System Structure", value: "8pt Grid", change: "Obsidian Token Exercise" },
      { label: "UI Exploration", value: "3-Pane + Bento", change: "IA & Visual Hierarchy" }
    ],
    processSteps: [
      {
        phase: "Surface Restraint",
        title: "Dark-Mode Token Contrast",
        detail: "Defined neutral elevated containers with hairline borders so charts and inline controls stand out without neon glare."
      },
      {
        phase: "Information Grouping",
        title: "KPIs, Trends & Action Cards",
        detail: "Tested how summary tiles, time-series area charts, and modular feature previews balance on a single viewport."
      }
    ],
    tools: ["Figma (Variables & Styles)", "Dark-Mode Hierarchy", "Bento Component Layout", "Design Token Practice"],
    deliverables: [
      "Conceptual Analytics Workbench UI",
      "Dark-Mode Token & Border Contrast Exploration",
      "Integration Node Diagram & Bento Grid Studies"
    ],
    featured: false,
    behanceUrl: "https://www.behance.net/ALMotion3D"
  }
];

export const SKILL_PILLARS: SkillCategory[] = [
  {
    title: "Mobile UX/UI & Ergonomics",
    tag: "Core Discipline",
    focusArea: "iOS HIG & Material 3",
    description: "Structuring portrait flows, navigation sheets, paywalls, and multi-state controls around real thumb geometry and effortless scanability.",
    iconName: "Smartphone",
    skills: ["Thumb-Zone Action Mapping", "Bottom-Sheet & Modal Flows", "Safe-Area & Dynamic Type", "Native Platform Conventions"]
  },
  {
    title: "Motion Choreography & Rive",
    tag: "Interactive Craft",
    focusArea: "60fps State Machines",
    description: "Using purposeful spring physics, tactile state feedback, and interactive Rive scenes to clarify system state rather than decorate screens.",
    iconName: "Sparkles",
    skills: ["Rive State Machines", "Spring & Gesture Transitions", "Audio-Haptic Pairing", "Reduced-Motion Fallbacks"]
  },
  {
    title: "Conversion-Led Product Flows",
    tag: "Business Impact",
    focusArea: "CRO & Funnel Architecture",
    description: "Finding where users hesitate, trimming unnecessary steps, and building transparent checkout and onboarding journeys that convert.",
    iconName: "TrendingUp",
    skills: ["Inline Express Checkout", "Paywall & Tier Framing", "Trust & Social Proof Placement", "Hypotheses Tested in Code"]
  },
  {
    title: "Design Systems & Code Handoff",
    tag: "Engineering Fluency",
    focusArea: "Figma -> React & Native",
    description: "Bridging tokenized Figma libraries directly to SwiftUI, Compose, and React/Tailwind builds with working prototypes engineers can inspect.",
    iconName: "Component",
    skills: ["Figma Variables & Modes", "Tactile & PBR Material Specs", "React / Motion Prototypes", "WCAG AA Contrast Discipline"]
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    period: "2025 - Present",
    role: "Senior Mobile UX/UI Designer",
    company: "Vortex Lab s.r.o. (Prague, CZ · Mobile Games & Apps)",
    location: "Remote / Prague",
    description: "Leading mobile product design, 3D visual craft, and cross-platform UI systems for Expedition Mahjong (200 hand-crafted levels, 43+ portrait screens) alongside interactive code prototypes in React and Rive.",
    executiveSummary: "Owned end-to-end mobile UX/UI for shipped iOS & Android title Expedition Mahjong (200 levels, 43+ screens, 8 PBR tile suites), plus interactive React/Rive prototyping.",
    highlights: [
      "Designed 43+ shipped mobile screens and 8 bespoke PBR tabletop/tile suites (Imperial Jade, Obsidian, Carrara Marble, Royal Velvet, Porcelain, Antique Ivory, Teak Wood & Terracotta) for Expedition Mahjong across 200 levels.",
      "Built portrait thumb-zone navigation, non-intrusive bottom-sheet recovery flows, and tactile audio-haptic preference systems synced with Apple & Google Play.",
      "Crafted fair-play monetization flows featuring the $1.99/mo Amethyst VIP subscription paywall, voluntary rewarded boosters, and daily login retention modals.",
      "Prototyped interactive mobile gestures, bottom sheets, and Rive state machines directly in React/TypeScript for realistic engineering handoff."
    ],
    mobileHighlights: [
      "43+ shipped iOS & Android screens across 200 levels built around thumb-zone reachability",
      "Custom 8 PBR material themes, bottom-sheet recovery & $1.99/mo VIP paywall"
    ],
    tools: ["iOS & Android UI", "3D PBR Materials", "Figma Variables", "Rive & Motion", "React Prototyping"]
  },
  {
    period: "2023 - 2025",
    role: "Lead Product & Mobile UX/UI Designer",
    company: "Bookify («Книгарня Небо») & Independent Product Studio",
    location: "Kyiv / Remote",
    description: "Led the digital rebrand of Kyiv art bookstore «Книгарня Небо» into Bookify (bookify.com.ua) and independent mobile R&D (early prototyping leading into Vortex Lab s.r.o. incorporation + Kinetix AI dark-surface system studies).",
    executiveSummary: "Executed Bookify («Книгарня Небо») digital rebrand and inline 3-field checkout, lifting CVR from 2.4% to 5.8% (+141.6%) and AOV to ₴1,595 (+28.5%).",
    highlights: [
      "Executed Bookify (bookify.com.ua / nebobookshop.com.ua) digital rebrand and inline Purchase Now checkout, lifting CVR to 5.8% (+141.6%), cutting checkout time to 45s (-58.3%), and growing store AOV to ₴1,595 (+28.5%).",
      "Designed dual-locale editorial storefront flows supporting both regional Ukrainian art books (₴400–₴600, Nova Poshta branch shipping) and collector editions ($260 Atlas Maior).",
      "Led early mobile R&D, shader prototyping, and dark-mode UI system studies (Kinetix AI Studio) on an 8pt tokenized component architecture."
    ],
    mobileHighlights: [
      "Express 3-field checkout architecture built for rapid single-screen conversion",
      "Dual-locale e-commerce PDP inspection & modular design token studies"
    ],
    tools: ["E-Commerce CRO", "Mobile-First Checkout", "Design Tokens", "Figma", "Editorial UX"]
  },
  {
    period: "2021 - 2023",
    role: "Product UI/UX Designer",
    company: "Aircall · Fintech & SaaS Product Contracts",
    location: "Remote Contracts",
    description: "Delivered communication workflows, mobile companion tools, and dense operational SaaS interfaces with a focus on keyboard speed, scannability, and reduced task friction.",
    executiveSummary: "Designed communication workflows, AI call-summary tooling, mobile companion views, and operational fintech dashboards with verified WCAG AA contrast.",
    highlights: [
      "Designed call-handling interfaces, AI call-summary workflows, and mobile companion views for enterprise communication teams.",
      "Created dense fintech operational screens with clear keyboard navigation, scannable tables, and verified contrast ratios.",
      "Standardized shared Figma variable libraries and component states across web and mobile surfaces."
    ],
    mobileHighlights: [
      "Mobile companion workflows for on-the-go voice & client operations",
      "High-contrast operational views & tokenized Figma component kits"
    ],
    tools: ["B2B SaaS UX", "Mobile Companion UI", "Design Systems", "Figma", "WCAG Accessibility"]
  },
  {
    period: "2019 - 2021",
    role: "UI/UX & 3D Motion Designer",
    company: "Digital Agencies & Production Studios",
    location: "Remote",
    description: "Built clickable mobile application prototypes, brand identity systems, and 3D motion assets grounded in formal industrial and product design education.",
    executiveSummary: "Delivered foundational mobile UI prototypes, 3D product motion assets, and structured responsive grids for international clients.",
    highlights: [
      "Created clickable mobile app prototypes, component libraries, and user journey specs for consumer products.",
      "Delivered complete brand systems, custom iconography, 3D visual motion assets, and responsive storefronts.",
      "Applied academic training (Higher Degree in Product Design) to physical-to-digital hierarchy, ergonomics, and typography."
    ],
    mobileHighlights: [
      "Interactive clickable prototypes and onboarding flows",
      "3D visual craft, tactile motion & layout grid fundamentals"
    ],
    tools: ["Mobile Prototyping", "Brand Systems", "After Effects & 3D", "Typography & Grids"]
  }
];

export const TOOLS_MATRIX = {
  design: [
    { name: "Mobile App UX (iOS HIG & Material 3)", level: "Core Focus" },
    { name: "Figma (Variables, Tokens & AutoLayout)", level: "Daily Stack" },
    { name: "Interactive Bottom Sheets & Micro-Flows", level: "Shipped Apps" },
    { name: "Typography, Grid & WCAG AA Contrast", level: "Foundation" }
  ],
  motionAndMedia: [
    { name: "Rive (Interactive State Machines)", level: "Live Runtime" },
    { name: "Framer Motion & Spring Choreography", level: "Prototyping" },
    { name: "3D PBR Materials & Tactile Shaders", level: "Shipped Game" },
    { name: "Adobe After Effects & CC Suite", level: "Motion & Assets" }
  ],
  engineeringAndAI: [
    { name: "React / Next.js / TypeScript", level: "Code Prototypes" },
    { name: "Tailwind CSS & Accessible Primitives", level: "UI Implementation" },
    { name: "Python (Data Scripts & Validation)", level: "Analysis" },
    { name: "AI-Assisted Prototyping & Design Ops", level: "Workflow" }
  ]
};
