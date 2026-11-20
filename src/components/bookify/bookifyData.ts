export interface BookifyMetric {
  value: string;
  label: string;
  delta: string;
  highlight?: boolean;
}

export interface FunnelStep {
  label: string;
  detail: string;
  durationSec: number;
  frictionNote: string;
}

export interface FunnelProfile {
  id: "legacy" | "bookify";
  label: string;
  totalDuration: string;
  stepCount: string;
  cvr: string;
  abandonment: string;
  summary: string;
  steps: FunnelStep[];
}

export interface PdpTabScreen {
  id: "details" | "reviews" | "checkout";
  label: string;
  src: string;
  alt: string;
  metric: string;
  headline: string;
  description: string;
  highlightPoints: string[];
}

export interface ArchivalHotspot {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  note: string;
}

export interface CollectorSpecRow {
  label: string;
  value: string;
}

export interface LocaleProfile {
  id: "ua" | "global";
  tabLabel: string;
  title: string;
  currencyRange: string;
  fulfillment: string;
  summary: string;
  featuredEditions: { title: string; price: string; meta: string }[];
}

export interface BookifyGalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  category: string;
  caption: string;
}

export const BOOKIFY_HERO_METRICS: BookifyMetric[] = [
  {
    value: "5.8%",
    label: "Checkout Conversion Rate",
    delta: "+141.6% lift over 2.4% baseline",
    highlight: true,
  },
  {
    value: "45s",
    label: "Median Purchase Time",
    delta: "-58.3% faster than 108s legacy funnel",
  },
  {
    value: "₴1,595",
    label: "Average Order Value",
    delta: "+28.5% via editorial cross-sells",
  },
];

export const FUNNEL_PROFILES: Record<"legacy" | "bookify", FunnelProfile> = {
  legacy: {
    id: "legacy",
    label: "Legacy Flow: 108s",
    totalDuration: "108s",
    stepCount: "6 separate page reloads",
    cvr: "2.4% CVR",
    abandonment: "68% checkout drop-off",
    summary:
      "The original Knyharnia Nebo storefront forced art buyers out of context into a multi-page cart and mandatory registration wall.",
    steps: [
      {
        label: "Catalog Grid",
        detail: "Dense book list without editorial scoring",
        durationSec: 18,
        frictionNote: "High bounce rate",
      },
      {
        label: "Separate Cart Page",
        detail: "Full-page redirect loses product specs",
        durationSec: 16,
        frictionNote: "Context broken",
      },
      {
        label: "Account Registration Wall",
        detail: "Forced password creation before shipping",
        durationSec: 28,
        frictionNote: "Peak 41% exit point",
      },
      {
        label: "Multi-Field Address Form",
        detail: "9 mandatory billing and street inputs",
        durationSec: 22,
        frictionNote: "Mobile input fatigue",
      },
      {
        label: "External Payment Redirect",
        detail: "Slow third-party gateway reload",
        durationSec: 15,
        frictionNote: "Trust drop",
      },
      {
        label: "Confirmation Screen",
        detail: "Delayed receipt page after redirect",
        durationSec: 9,
        frictionNote: "2.4% final conversion",
      },
    ],
  },
  bookify: {
    id: "bookify",
    label: "Bookify Express: 45s",
    totalDuration: "45s",
    stepCount: "Zero page redirects",
    cvr: "5.8% CVR",
    abandonment: "+141.6% conversion lift",
    summary:
      "The redesigned Bookify flow keeps buyers inside the product page, switching directly into a 3-field inline Purchase Now state.",
    steps: [
      {
        label: "Curated Discovery & Product Page",
        detail: "High-res spread preview, specs, and pricing stay anchored",
        durationSec: 22,
        frictionNote: "Zero context switching",
      },
      {
        label: "Inline Purchase Now Tab",
        detail: "Single tab switch reveals Full Name, Email, Phone, and Buy Now",
        durationSec: 17,
        frictionNote: "No mandatory signup",
      },
      {
        label: "Instant Express Confirmation",
        detail: "In-page order confirmation while keeping cross-sells visible",
        durationSec: 6,
        frictionNote: "5.8% verified conversion",
      },
    ],
  },
};

export const PDP_TABS: PdpTabScreen[] = [
  {
    id: "details",
    label: "Product Details",
    src: "/projects/bookify/crop_product_detail.webp",
    alt: "Bookify product detail view showing Joan Blaeu Atlas Maior Of 1665 with double-spread photography, editorial copy, and physical specifications",
    metric: "+31.2% add-to-cart intent",
    headline: "Physical certainty for $260 collector editions",
    description:
      "Replacing generic blurbs with exact physical measurements, author history, and archival print photography eliminated hesitation on rare hardcover editions.",
    highlightPoints: [
      "Side-by-side double spread and binding thumbnails",
      "Upfront hardcover dimensions, weight, and ISBN tokens",
      "Calm white museum canvas contrasting dark typographic hierarchy",
    ],
  },
  {
    id: "reviews",
    label: "Rating & Reviews",
    src: "/projects/bookify/crop_reviews.webp",
    alt: "Bookify product page switched to Rating and Reviews tab with verified collector badges and star breakdowns",
    metric: "+26.8% buyer trust lift",
    headline: "Verified collector proof inside the same viewport",
    description:
      "Instead of pushing shoppers into a separate modal or scrolling past long descriptions, peer reviews live in an immediate horizontal tab.",
    highlightPoints: [
      "Verified collector green checkmark badges on every review",
      "One-tap Latest sort and Write a Review trigger",
      "Preserves sticky pricing and Add to Cart header above",
    ],
  },
  {
    id: "checkout",
    label: "Purchase Now",
    src: "/projects/bookify/crop_checkout.webp",
    alt: "Bookify zero-redirect inline express checkout tab displaying Full Name, Email, Telephone Number inputs and Buy Now button",
    metric: "45s express completion",
    headline: "Full checkout collapsed into three inline fields",
    description:
      "Clicking Purchase Now expands an immediate inline order strip: Full Name, Email, Telephone Number, and a high-contrast Buy Now action.",
    highlightPoints: [
      "Zero multi-page cart redirection or forced account creation",
      "Directly paired with You May Also Like art book cross-sells",
      "Cut purchase completion time from 108s down to 45s",
    ],
  },
];

export const ARCHIVAL_HOTSPOTS: ArchivalHotspot[] = [
  {
    id: "compass",
    label: "Compass Rose Engraving",
    xPercent: 59,
    yPercent: 52,
    note: "Inspecting razor-sharp rhumb lines and copperplate hand-coloring proves print mastery prior to purchase.",
  },
  {
    id: "typography",
    label: "Title Plate Serif",
    xPercent: 60,
    yPercent: 20,
    note: "Museum reproduction detail lets collectors read Latin and Baroque subtitle hairlines at native resolution.",
  },
  {
    id: "spread",
    label: "Open Folio Binding",
    xPercent: 14,
    yPercent: 66,
    note: "Multi-spread thumbnail photography communicates 512-page spine depth and paper weight.",
  },
];

export const COLLECTOR_SPECS: CollectorSpecRow[] = [
  { label: "Edition Title", value: "Joan Blaeu. Atlas Maior of 1665" },
  { label: "Format & Binding", value: "Hardcover Folio, Archival Cloth" },
  { label: "Physical Dimensions", value: "24.7 x 37.5 cm" },
  { label: "Edition Weight", value: "4.27 kg (512 pages)" },
  { label: "Catalog Reference", value: "ISBN 978-3-8365-3803-9" },
  { label: "Multilingual Text", value: "English, French, German" },
];

export const LOCALE_PROFILES: Record<"ua" | "global", LocaleProfile> = {
  ua: {
    id: "ua",
    tabLabel: "Ukraine Storefront (UAH)",
    title: "Evolution of Knyharnia Nebo",
    currencyRange: "₴400 to ₴600 editions",
    fulfillment: "Nova Poshta nationwide dispatch",
    summary:
      "Preserved Kyiv gift-buying accessibility with fast UAH price scanning, clean paperback/gift filtering, and localized checkout speed.",
    featuredEditions: [
      { title: "Helmut Newton. Berlin, Berlin", price: "₴ 470", meta: "Monochrome Photography" },
      { title: "David Bailey. Eighties", price: "₴ 400", meta: "Editorial Portrait Archive" },
      { title: "British Isles 1900. Colour", price: "₴ 600", meta: "Historical Color Plate" },
      { title: "Steve Schapiro. Andy Warhol", price: "₴ 600", meta: "Pop Art Photojournalism" },
    ],
  },
  global: {
    id: "global",
    tabLabel: "Global Collector (USD)",
    title: "Curated Taschen Collector Flagship",
    currencyRange: "$260 collector folios",
    fulfillment: "Insured archival packaging",
    summary:
      "Switching the header selector to English | US transforms the catalog for international collectors seeking 95/100 curated art folios.",
    featuredEditions: [
      { title: "Alfred Hitchcock. Complete Films", price: "95/100", meta: "Hero Editorial Preorder" },
      { title: "Joan Blaeu. Atlas Maior Of 1665", price: "$260", meta: "594 Baroque Maps Reprint" },
      { title: "The New York Times. Cultured Traveler", price: "95/100", meta: "Clothbound Essay Series" },
    ],
  },
};

export const BOOKIFY_GALLERY_SCREENS: BookifyGalleryItem[] = [
  {
    id: "gallery-pdp",
    src: "/projects/bookify/crop_product_detail.webp",
    width: 1600,
    height: 1341,
    title: "Collector Product Detail Architecture",
    category: "Product Immersion",
    caption: "Gallery layout pairing archival spread photography with crisp physical specifications.",
  },
  {
    id: "gallery-checkout",
    src: "/projects/bookify/crop_checkout.webp",
    width: 1600,
    height: 1341,
    title: "Inline Zero-Redirect Purchase Tab",
    category: "Express Checkout",
    caption: "Three-field inline form eliminating cart page detours and mandatory registration.",
  },
  {
    id: "gallery-catalog",
    src: "/projects/bookify/crop_catalog_browser.webp",
    width: 1600,
    height: 1341,
    title: "Curated Discovery & Score Badges",
    category: "Brand Rebrand",
    caption: "Editorial 95/100 curator highlights combined with clean UAH arrival pricing.",
  },
  {
    id: "gallery-reviews",
    src: "/projects/bookify/crop_reviews.webp",
    width: 1600,
    height: 1341,
    title: "In-Context Verified Collector Reviews",
    category: "Social Proof",
    caption: "Verified buyer sentiment accessible in one tab without losing pricing context.",
  },
  {
    id: "gallery-spread",
    src: "/projects/bookify/crop_atlas_spread.webp",
    width: 1600,
    height: 1177,
    title: "Macro Interior Spread Inspection",
    category: "Tactile Detail",
    caption: "High-definition plate reproduction replicating the confidence of flipping a physical book.",
  },
  {
    id: "gallery-action",
    src: "/projects/bookify/crop_checkout_modal_action.webp",
    width: 1600,
    height: 412,
    title: "Inline Action & Cross-Sell Bridge",
    category: "AOV Optimization",
    caption: "Anchoring the Buy Now trigger directly above curated suggestions lifted AOV by +28.5%.",
  },
];
