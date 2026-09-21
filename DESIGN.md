# Design System Specification: Andrii Liebiha Platform

A rigorous, tokenized design system anchor built for modern dark-mode interfaces, high visual tension, and tactile sensory feedback. Adheres strictly to the 4-phase Impeccable Design methodology.

---

## 1. Semantic Palette & Color Tokens

All colors are systematically defined via CSS variables and Tailwind utility mapping.

| Token | CSS Variable / Value | Role & Usage | Contrast Ratio (WCAG) |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--background: #18181b` | Industrial deep carbon base for the entire viewport canvas. | Baseline (Dark) |
| **Surface Base (Graphite)**| `--surface: #242424` / `#1f2024` | Industrial matte graphite container for cards, modules, and sections. | Surface Layer 1 |
| **Surface Raised / Hover** | `--surface-hover: #292a30` | Elevated hover state for interactive surfaces and dropdowns. | Surface Layer 2 |
| **Technical Steel (Hairline)**| `--steel: #adb3b7` | Brushed aluminum / steel accent and technical wireframe lines. | Technical Steel |
| **Border Hairline** | `--border: rgba(173, 179, 183, 0.18)` | Subtle titanium hairline boundary for cards, dividers, and navbars. | 1.8:1 (Hairline) |
| **Border Active** | `--border-active: rgba(255, 114, 53, 0.45)` | Focus and active states on interactive controls (Safety Vermilion). | High Tension |
| **Text Primary (Bone Chalk)**| `--foreground: #f2f5f1` | Warm industrial off-white body, titles, and critical UI numbers. | **16.5:1 (AAA)** |
| **Text Secondary (Steel)** | `text-steel / #adb3b7` | Subheaders, descriptions, metadata tags, and technical captions. | **7.8:1 (AA+)** |
| **Text Muted / Mono** | `rgba(173, 179, 183, 0.60)` | Footnotes, helper text, inactive navigation links, timestamps. | **4.8:1 (AA)** |
| **Primary Accent (Safety Vermilion)**| `--creatio-orange: #ff7235` | Brass Hands signature safety vermilion for CTA buttons and active indicators. | High Energy |
| **Secondary Accent (Warm Tungsten)**| `--creatio-amber: #ffa043` | Warm tungsten highlights, secondary glows, and metrics. | Warm Dynamic |
| **Precision Accent (Electric Cyan)**| `--electric-cyan: #06b6d4` | 3D / Spatial tech tags, data visualization, secondary gradients. | Technical Precision |
| **Intelligence Accent (Indigo)** | `--neon-indigo: #6366f1` | AI / SaaS features, system orchestration badges. | Cognitive Depth |
| **Success / Lift (Emerald)** | `#10b981` | Conversion rate lifts (+141%), positive delta metrics, active pulse. | **5.4:1 (AA)** |
| **Brand Accent (Royal Blue)** | `#3b82f6` | Bookify e-commerce branding references and link highlights. | Editorial Brand |

---

## 2. Typography System & OpenType Tuning

The typographic scale uses fluid clamping for seamless transitions from mobile viewports to 4K displays.

- **Display / Primary Sans**:
  - `var(--font-sans)`: `Geist Sans`, `Inter`, `Plus Jakarta Sans`, `system-ui`, `sans-serif`.
  - **OpenType Engine Settings**:
    ```css
    font-feature-settings: "cv02", "cv03", "cv04", "cv11", "ss01";
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ```
  - **Hero Title**: `clamp(2.5rem, 6vw, 5.5rem)`, weight `800` (Extrabold), tracking `-0.035em`, line-height `0.95–1.02`.
  - **Section Headings (H2)**: `clamp(2rem, 3.5vw, 3.75rem)`, weight `700–900`, tracking `-0.025em`, line-height `1.10`.
  - **Card Titles (H3)**: `1.25rem` – `1.5rem`, weight `600–800`, tracking `-0.015em`, line-height `1.25`.
  - **Body Prose (`.measure-prose`)**: `0.9375rem` – `1.0625rem` (`15px`–`17px`), line-height `1.6`, measure strictly constrained to `60–68ch`.
- **Data & Monospace (`.tabular-nums`)**:
  - `var(--font-mono)`: `Geist Mono`, `JetBrains Mono`, `monospace`.
  - Used for: Timestamps, metrics, project numbers (`01`, `02`), tag pills, code snippets, and UI coordinates.
  - Tracking: `+0.02em`, `font-variant-numeric: tabular-nums`.

---

## 3. Elevation, Atmosphere & Glassmorphism

A layered depth model creating a studio-grade tactile environment:

### Glassmorphism Primitives
- **`.glass-panel`**:
  - Background: `rgba(31, 32, 36, 0.75)` / `rgba(36, 36, 36, 0.70)`
  - Backdrop Blur: `blur(16px)` (`-webkit-backdrop-filter: blur(16px)`)
  - Border: `1px solid rgba(173, 179, 183, 0.18)`
  - Facet Sheen: `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(173, 179, 183, 0.15)`
- **`.glass-pill`**:
  - Background: `rgba(255, 255, 255, 0.04)`
  - Backdrop Blur: `blur(12px)`
  - Border: `1px solid rgba(173, 179, 183, 0.20)`
  - Inset Sheen: `box-shadow: inset 0 1px 0 rgba(173, 179, 183, 0.12)`
- **`.glass-panel-hover`**:
  - Timing: `transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`
  - Hover: translateY(-4px), border color `rgba(255, 114, 53, 0.45)`, outer glow `0 0 30px rgba(255, 114, 53, 0.14)`.

### Atmosphere & Ambient Lighting
- **`.bg-tech-grid`**: 48px × 48px dual-axis grid lines in `rgba(173, 179, 183, 0.04)`.
- **`.bg-tech-dots`**: 24px × 24px radial dot matrix in `rgba(173, 179, 183, 0.10)`.
- **Ambient Radial Glows**:
  - Safety Vermilion Glow: `radial-gradient(circle, rgba(255, 114, 53, 0.18) 0%, transparent 70%)`
  - Warm Tungsten Glow: `radial-gradient(circle, rgba(255, 160, 67, 0.12) 0%, transparent 70%)`
  - Steel Cyan Luminescence: `radial-gradient(circle, rgba(6, 182, 212, 0.10) 0%, transparent 70%)`

---

## 4. Component Rules & Canonical Patterns

### A. Focus & Keyboard Accessibility Standard
All interactive elements support studio-grade, accessible `:focus-visible` states:
```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #18181b, 0 0 0 4px rgba(255, 114, 53, 0.6);
}
```

### B. Touch Target Law (>= 44x44px)
All mobile interactive targets (hamburger menu, slide arrows, scroll-to-top, email copy) must have at least `44px × 44px` touch bounding boxes (`w-11 h-11`).

### C. Buttons
1. **Primary Action**:
   - Solid / Gradient Safety Vermilion (`from-[#ff7235] to-[#ffa043]`) with high-contrast black or white text.
   - Glow on hover: `box-shadow: 0 0 24px rgba(255, 114, 53, 0.40)`.
   - Scale feedback on tap: `active:scale-[0.98]`.
2. **Secondary / Glass Action**:
   - Uses `.glass-pill` or `.glass-panel` background with steel hairline border.
   - Hover: Border switches to `rgba(173, 179, 183, 0.35)` or `rgba(255, 114, 53, 0.45)`.
   - Scale feedback on tap: `active:scale-[0.98]`.
3. **Ghost / Text**:
   - Monospace uppercase label with animated arrow or icon indicator.

### D. Tactile Sliders (`.custom-range-slider`)
- Track: 8px pill, border `1px solid rgba(255, 255, 255, 0.08)`, subtle inner shadow.
- Thumb: 22px circle, white core, 3.5px solid Orange/Emerald border, `0 0 16px` glow.
- Hover/Active: Spring scale to `1.2x` – `1.3x` with expanded glow radius.

### E. 4K Edge-to-Edge Presentation Viewer
- Scrim: `rgba(0, 0, 0, 0.95)` with deep backdrop blur.
- Canvas: Edge-to-edge 4K slide presentation with floating HUD.
- Navigation: `ArrowLeft`, `ArrowRight`, `Escape` keyboard listeners with `data-lenis-prevent="true"`.

---

## 5. Motion Principles & Choreography

- **Spring Dynamics**: Primary easing is `cubic-bezier(0.16, 1, 0.3, 1)`.
- **60fps Law**: All continuous or scroll-driven animations must only animate `transform` and `opacity`. Never animate `height`, `width`, `top`, or `margin`.
- **Dual-Engine Scroll Sync**:
  - **Chromium Desktop**: Lenis smooth-scroll with buttery-smooth wheel stepping.
  - **Safari & Touch Devices**: Automatic bypass to native 120Hz hardware-accelerated Cocoa inertial momentum.
- **Reduced Motion**: Mandatory `@media (prefers-reduced-motion: reduce)` override disabling non-essential loops and instant transitions for text gradients.

---

## 6. Anti-Slop Protocol (Hard Constraints)

❌ **NEVER DO:**
1. **No Generic "AI Purple" Fog**: Do not place arbitrary glowing indigo/purple blobs without functional justification.
2. **No Equal-Width 3-Column Cliché**: Avoid boring 3-box feature lists with generic circular icons and lorem ipsum.
3. **No Unbacked Claims**: Every metric must cite real project baselines (e.g. `+141.6% CVR (Bookify ex-Небо)`).
4. **No Low-Contrast Grey Text**: All body copy must satisfy WCAG AA (minimum 4.5:1 against dark backgrounds).
5. **No `outline: none` without Replacement**: Interactive elements must always provide clean, visible `:focus-visible` rings.
6. **No Fixed Container Heights with Dynamic Text**: Prevent any text clipping on mobile or scaled font settings.
