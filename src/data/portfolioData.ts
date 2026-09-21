import { ProjectItem, ExperienceItem, SkillCategory, CVMetadata } from "@/types/portfolio";

export const PORTFOLIO_HERO = {
  availability: "Available for Senior / Lead Product Design & Mobile Roles",
  name: "ANDRII LIEBIHA",
  role: "Senior Product Designer & Mobile Systems Architect",
  tagline: "Designing High-Impact Mobile Apps, Tactile 3D Experiences & Scalable Systems.",
  bio: "Senior / Lead Product Designer & Systems Architect with formal academic qualification (Higher Degree in Product Design) and 7+ years of commercial craft. Leading 0-to-1 mobile applications (iOS & Android), spatial 3D experiences, and web platforms at Vortex Lab, with past contracts at Aircall (AI Call Center SaaS), Fintech, and E-Commerce. Active Creative Developer engineering personal Fintech software with Python and React to quantitatively validate product hypotheses with data.",
  stats: [
    { value: "+141%", label: "Max Funnel CVR Uplift", sub: "Bookify Rebranding (ex-Небо)" },
    { value: "$1.42M+", label: "ARR Run-Rate Generated", sub: "Expedition Mahjong Economy" },
    { value: "73.4%", label: "30-Day Cohort Retention", sub: "Luro AI Social Operations" },
    { value: "7+ Yrs", label: "Product & Systems Craft", sub: "Global High-Growth Tech" }
  ]
};

export const CV_METADATA: CVMetadata = {
  availability: "Available for Senior / Lead Product Design & Mobile Roles",
  location: "Remote / Hybrid (Worldwide)",
  education: {
    degree: "Higher Degree in Product Design",
    field: "Product & Industrial Design",
    type: "Formal Academic Qualification",
    details: "Foundational academic training in ergonomics, physical & digital product design, spatial balance, and user perception."
  },
  languages: [
    {
      language: "English",
      level: "Full Professional Proficiency",
      details: "C1 / C2 • Advanced Working & Executive Communication"
    },
    {
      language: "Ukrainian",
      level: "Native",
      details: "Native / Bilingual Proficiency"
    }
  ]
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "bookify-art-ecommerce",
    number: "01",
    title: "Bookify Platform",
    subtitle: "Rebranding & Digital Evolution of «Книгарня Небо»",
    client: "Книгарня Небо (Nebo Books) ➔ Bookify",
    year: "2026",
    category: "ecommerce-cro",
    categoryLabel: "Rebranding & E-Commerce CRO",
    imageSrc: "/projects/bookify/slide_01.webp",
    slides: [
      "/projects/bookify/slide_01.webp",
      "/projects/bookify/slide_02.webp",
      "/projects/bookify/slide_03.webp",
      "/projects/bookify/slide_04.webp",
      "/projects/bookify/slide_05.webp",
      "/projects/bookify/slide_06.webp",
      "/projects/bookify/slide_07.webp"
    ],
    summary: "Strategic rebranding and end-to-end digital transformation of the traditional bookstore 'Книгарня Небо' into the modern Bookify online platform. Transitioned a legacy brick-and-mortar retail bookshop into a high-conversion digital ecosystem for curated art, design, and collector books with a 4-stage sales funnel.",
    challenge: "The traditional bookstore 'Книгарня Небо' operated primarily as a physical retail space with an outdated web presence. The core challenge was translating tactile in-store book curation into a digital experience, overcoming customer hesitation on premium art editions (₴400–₴600), eliminating 68% cart abandonment, and rebranding into 'Bookify' without losing loyal readers.",
    solution: "Executed a comprehensive brand transformation from 'Книгарня Небо' to Bookify. Architected a digital-first editorial design system, high-resolution double-spread interior previews to replicate physical browsing, verified collector trust badges, and an in-context express checkout modal that achieved a +141% conversion rate lift.",
    role: "Lead / Senior Product Designer & Brand Strategist (Brand Identity, E-Commerce UX/UI, Funnel CRO Architecture)",
    metrics: [
      { label: "Overall Funnel CVR", value: "5.8%", change: "+141.6% Relative Lift" },
      { label: "Checkout Velocity", value: "45s", change: "-58.3% Time-to-Buy" },
      { label: "Average Order Value", value: "₴1,595", change: "+28.5% AOV Lift" }
    ],
    tools: ["Brand Identity & Systems", "Figma (Variables & AutoLayout)", "Next.js / Tailwind CSS", "Apple / Google Pay Primitives", "CRO Analytics"],
    deliverables: [
      "Brand Identity Evolution ('Книгарня Небо' ➔ Bookify)",
      "4-Stage Conversion Funnel UX Architecture",
      "Editorial Art Book Catalog & Double-Spread Previews",
      "Zero-Redirect Express Modal Checkout System",
      "Verified Collector Social Proof & Q&A Framework",
      "Design Token Pipeline (Obsidian #07080C, Royal Blue #3B82F6)"
    ],
    featured: true,
    behanceUrl: "https://www.behance.net/ALMotion3D",
    liveUrl: "https://bookify.store",
    figmaUrl: "#"
  },
  {
    id: "expedition-mahjong-3d",
    number: "02",
    title: "Expedition Mahjong",
    subtitle: "3D Spatial Mobile Experience & Tactile PBR Game System",
    client: "Expedition Gaming / Global Studios",
    year: "2026",
    category: "3d-mobile",
    categoryLabel: "3D Spatial Mobile & Web",
    imageSrc: "/projects/mahjong/slide_01.jpg",
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
    summary: "Complete 0-to-1 design and spatial UX architecture transforming casual 2D mahjong into an Apple-grade tactile sensory journey with 350+ sculpted 3D assets, physical PBR shaders, and thumb-zone ergonomics.",
    challenge: "Generic 2D casual clones suffered from severe 46.2% rage-quit drop-offs, intrusive ad fatigue, lack of tactile feedback, and high churn rates.",
    solution: "Designed 43 Retina screens, 8 authentic physical materials (Jade, Ivory, Obsidian, Wood), real-time elevation lighting, acoustic haptics, ethical hybrid VIP monetization, and a 4K companion web platform.",
    role: "Lead / Senior Product Designer (0-to-1 Wireframes, UX Architecture, 3D Art Pipeline, Companion Web Platform)",
    metrics: [
      { label: "Day-1 Retention (D1)", value: "64.8%", change: "+131.4% Lift (vs 28%)" },
      { label: "Avg Daily Session", value: "18.4m", change: "3.1x Casual Benchmark" },
      { label: "VIP Paywall CVR", value: "6.8%", change: "+223.8% Conversion Lift" }
    ],
    tools: ["Figma", "Blender / Cinema 4D (PBR Shaders)", "Metal / WebGL 60fps", "Plus Jakarta Sans & JetBrains Mono", "iOS 18+ HIG & Material 3"],
    deliverables: [
      "43 Production Screens (iOS, iPadOS & Android)",
      "350+ Handcrafted 3D Tile Assets & 8 PBR Shaders",
      "Thumb-Zone Ergonomics & Elevation Lighting Matrix",
      "Ethical Hybrid VIP Monetization & Rewarded Boosters",
      "4K Responsive Retina Companion Web Platform & Compliance"
    ],
    featured: true,
    behanceUrl: "https://www.behance.net/ALMotion3D",
    liveUrl: "https://expedition-mahjong.com",
    figmaUrl: "#"
  },
  {
    id: "luro-social-intelligence",
    number: "03",
    title: "Luro Social Intelligence",
    subtitle: "AI Social Operations & Multi-Channel Dispatch Platform",
    client: "Luro Technologies Inc.",
    year: "2026",
    category: "ai-saas",
    categoryLabel: "AI SaaS & Workbench Architecture",
    imageSrc: "/projects/luro/slide_01.jpg",
    slides: [
      "/projects/luro/slide_01.jpg",
      "/projects/luro/slide_02.jpg",
      "/projects/luro/slide_03.jpg",
      "/projects/luro/slide_04.jpg",
      "/projects/luro/slide_05.jpg",
      "/projects/luro/slide_06.jpg",
      "/projects/luro/slide_07.jpg",
      "/projects/luro/slide_08.jpg",
      "/projects/luro/slide_09.jpg",
      "/projects/luro/slide_10.jpg"
    ],
    summary: "High-density AI productivity platform that unifies copywriting, multi-format media generation, analytics, and dispatch across 6 major networks into a cohesive, keyboard-first 3-pane workbench.",
    challenge: "Creators and growth agencies were juggling 7+ fragmented tools (Notion, Buffer, Canva, ChatGPT, Analytics), suffering from context fragmentation, high tool sprawl costs, and repetitive manual formatting.",
    solution: "Constructed an integrated 3-pane workstation featuring dynamic token streaming, real-time engagement radars, multi-account governance, and an ethical token-based self-serve pricing engine.",
    role: "Lead / Senior Product Designer (Information Architecture, Design Tokens, AI Interaction Paradigms & Workbench UX)",
    metrics: [
      { label: "Drafting Speed Velocity", value: "+284%", change: "42 min → 11.2 min" },
      { label: "Trial Conversion (CVR)", value: "19.8%", change: "+140% vs Benchmark" },
      { label: "30-Day Cohort Retention", value: "73.4%", change: "45,000+ SMM Users" }
    ],
    tools: ["Figma (Variables & AutoLayout)", "Next.js 14 / Radix UI", "Tailwind CSS (Obsidian Tokens)", "Framer Motion", "LLM Streaming Tokens"],
    deliverables: [
      "Integrated 3-Pane Social Operations Workbench",
      "Obsidian Glass 2.0 Design System & Tokens (WCAG AAA)",
      "Predictive Engagement Radar & Virality Propensity Scoring",
      "Self-Serve Pricing Engine with Interactive ROI Visualizer",
      "Multi-Account Governance & 1-Click Calendar Auto-Fill"
    ],
    featured: true,
    behanceUrl: "https://www.behance.net/ALMotion3D",
    liveUrl: "https://luro.heyshreyas.com",
    figmaUrl: "#"
  }
];

export const SKILL_PILLARS: SkillCategory[] = [
  {
    title: "Conversion-Led CRO & Funnels",
    description: "Multi-stage persuasion architectures, frictionless 1-tap purchasing, in-context checkout modals, and statistically significant conversion lifts.",
    iconName: "TrendingUp",
    skills: ["4-Stage Persuasion Blueprints", "1-Tap Express Modal Checkout", "Multivariate A/B Testing", "Friction & Abandonment Elimination"]
  },
  {
    title: "3D Spatial UI & Tactile Craft",
    description: "Physical PBR shader systems, elevation shadow projections, thumb-zone ergonomics, and Apple-grade 60fps kinetic visual interactions.",
    iconName: "Sparkles",
    skills: ["3D PBR Material Pipelines", "Dynamic Elevation Shadows", "Thumb-Zone Mobile Ergonomics", "Sensory Audio-Haptic Feedback"]
  },
  {
    title: "AI Workspaces & Progressive UX",
    description: "Sub-100ms streaming token interfaces, multi-pane workbenches, predictive virality scoring, and non-deterministic UX governance.",
    iconName: "Layers",
    skills: ["3-Tier Progressive Disclosure", "LLM Streaming Token UX", "Predictive Virality Radars", "Multi-Network Auto-Dispatch"]
  },
  {
    title: "Scalable Design Systems & Tokens",
    description: "Production-ready Figma token architectures, dark-mode obsidian ergonomics, WCAG AAA accessibility, and zero-drift developer handoff.",
    iconName: "Component",
    skills: ["Obsidian Glass Token Kits", "Figma Variables & Modes", "WCAG AAA Color Systems", "Tailwind & Radix UI Primitives"]
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    period: "2023 - Present",
    role: "Senior / Lead Product Designer & Mobile Systems Architect",
    company: "Vortex Lab (Mobile Apps, Spatial 3D & Web)",
    location: "Studio & Venture Lab",
    description: "Leading 0-to-1 mobile application architecture (iOS & Android), spatial 3D systems, and cross-platform web platforms. Active Creative Developer building personal Fintech software with Python and React.",
    executiveSummary: "Leading 0-to-1 mobile application architecture (iOS & Android) and design systems. Delivered 43+ production mobile screens and 350+ tactile assets with thumb-zone ergonomics, sustaining $1.42M+ ARR run-rate and 64.8% D1 retention.",
    highlights: [
      "Architecting 0-to-1 mobile applications (iOS & Android), spatial 3D interfaces, and thumb-zone ergonomic systems compliant with iOS 18+ HIG and Material 3.",
      "Engineered tactile mobile gaming & utility interfaces featuring physical PBR shaders, dynamic elevation lighting, and sensory audio-haptic feedback.",
      "Built unified Figma token pipelines syncing mobile squads (SwiftUI & Jetpack Compose design tokens) and web squads with 100% token consistency.",
      "Developing personal Fintech software with Python and React, writing automated data-validation tests to backtest and quantitatively validate UX/UI product hypotheses."
    ],
    mobileHighlights: [
      "43+ production Retina screens designed with strict thumb-zone ergonomics",
      "Native iOS 18+ HIG & Material 3 architecture with sensory haptic feedback",
      "Unified mobile token pipeline bridging Figma Variables directly to native code"
    ],
    tools: ["iOS HIG & Material 3", "Mobile Apps UX/UI", "Figma (Variables & Tokens)", "Python (Data & Testing)", "React / Next.js", "3D Spatial UI"]
  },
  {
    period: "2021 - 2023",
    role: "Senior Product & UX/UI Designer",
    company: "Aircall (AI Call Center SaaS) • Fintech & Mobile E-Commerce",
    location: "Global Contracts",
    description: "Designed customer communication workflows, mobile-responsive interaction tooling, and B2B SaaS dashboards for Aircall, alongside high-impact contracts in Fintech and E-Commerce.",
    executiveSummary: "Designed high-velocity B2B communication tooling, mobile companion experiences, and frictionless checkout funnels yielding +141.6% conversion uplift and 45s checkout velocity.",
    highlights: [
      "Designed call-handling workflows, AI voice transcription dashboards, and companion mobile interaction patterns for enterprise teams.",
      "Engineered high-converting mobile-first purchase funnels for e-commerce brands, cutting checkout velocity to 45s (-58.3% time-to-buy) and lifting CVR by +141.6%.",
      "Architected data-dense dashboards for fintech platforms with keyboard-first navigation and dark-mode ergonomics.",
      "Partnered directly with mobile and frontend engineering squads to maintain 100% fidelity between design tokens and production code."
    ],
    mobileHighlights: [
      "Mobile-first responsive checkout with native Apple Pay and Google Pay integration",
      "High-density mobile SaaS workflows for field agents and on-the-go communications"
    ],
    tools: ["Mobile E-Commerce CRO", "Figma", "B2B SaaS Architecture", "AI Voice UX", "Apple / Google Pay UX", "Design Systems"]
  },
  {
    period: "2018 - 2021",
    role: "Product & Digital Designer",
    company: "Commercial Products & Venture Studios",
    location: "Remote",
    description: "Delivered mobile application concepts, brand identity systems, and conversion-focused web layouts for international commercial clients.",
    executiveSummary: "Delivered foundational mobile prototypes, design systems, and digital brand identities for global commercial clients, grounded in formal academic design education.",
    highlights: [
      "Crafted comprehensive brand packages, vector asset systems, and responsive digital interfaces for international commercial clients.",
      "Engineered early interactive mobile app prototypes and design guidelines for consumer products.",
      "Applied formal academic training (Higher Degree in Product Design) to establish spatial balance, ergonomic grids, and typography hierarchy."
    ],
    mobileHighlights: [
      "Interactive mobile prototyping and user journey mapping",
      "Ergonomic grid system construction for cross-device responsive viewports"
    ],
    tools: ["Adobe CC Suite", "Mobile Prototyping", "Brand Systems", "Typography & Grid", "Visual Hierarchy"]
  }
];

export const TOOLS_MATRIX = {
  design: [
    { name: "Mobile App UX (iOS HIG & Material 3)", level: "Mastery (100%)" },
    { name: "Figma (Variables, Tokens, AutoLayout)", level: "Mastery (100%)" },
    { name: "Design System Token Pipelines", level: "Expert (100%)" },
    { name: "Thumb-Zone Ergonomics & WCAG AAA", level: "Advanced (98%)" }
  ],
  motionAndMedia: [
    { name: "3D PBR Materials & Spatial UI", level: "Advanced (92%)" },
    { name: "Mobile Haptics & Micro-Interactions", level: "Mastery (95%)" },
    { name: "Adobe After Effects (Kinetic Motion)", level: "Advanced (90%)" },
    { name: "Adobe CC (Photoshop & Illustrator)", level: "Proficient (94%)" }
  ],
  engineeringAndAI: [
    { name: "Python (Data Analysis & UX Testing)", level: "Production Fluent (92%)" },
    { name: "React / Next.js / TypeScript", level: "Production Fluent (90%)" },
    { name: "AI Generative & Streaming UX (LLMs)", level: "Production Fluent (95%)" },
    { name: "Tailwind CSS & Radix UI Primitives", level: "Mastery (95%)" }
  ]
};

