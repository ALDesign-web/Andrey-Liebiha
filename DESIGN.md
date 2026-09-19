# Design System Specification: Andrii Liebiha Platform

A rigorous, tokenized design system anchor built for modern dark-mode interfaces, high visual tension, and tactile sensory feedback. Adheres strictly to the 4-phase Impeccable Design methodology.

---

## 1. Semantic Palette & Color Tokens

All colors are systematically defined via CSS variables and Tailwind utility mapping.

| Token | CSS Variable / Value | Role & Usage | Contrast Ratio (WCAG) |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--background: #08080b` | Deep Obsidian base for the entire viewport canvas. | Baseline (Dark) |
| **Surface Base** | `--surface: #0f1015` | Default container background for cards, modules, and sections. | Surface Layer 1 |
| **Surface Raised / Hover** | `--surface-hover: #161720` | Elevated hover state for interactive surfaces and dropdowns. | Surface Layer 2 |
| **Border Subtle** | `--border: rgba(255, 255, 255, 0.08)` | Default hairline boundary for cards, dividers, and navbars. | 1.3:1 (Hairline) |
| **Border Active** | `--border-active: rgba(249, 115, 22, 0.4)` | Focus and active states on interactive controls. | High Tension |
| **Text Primary** | `--foreground: #f4f4f6` | High-contrast body, titles, and critical UI numbers. | **17.8:1 (AAA)** |
| **Text Secondary** | `text-zinc-300 / rgba(244, 244, 246, 0.75)` | Subheaders, descriptions, metadata tags, and captions. | **8.2:1 (AA+)** |
| **Text Muted / Mono** | `text-zinc-400 / rgba(244, 244, 246, 0.50)` | Footnotes, helper text, inactive navigation links, timestamps. | **4.9:1 (AA)** |
| **Primary Accent (Creatio Orange)** | `--creatio-orange: #f97316` | Key CTA buttons, active state indicators, high-priority badges. | High Energy |
| **Secondary Accent (Amber)** | `--creatio-amber: #fbbf24` | Metric highlights, warm secondary glows, ratings. | Warm Dynamic |
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
  - Background: `rgba(15, 16, 21, 0.70)`
  - Backdrop Blur: `blur(16px)` (`-webkit-backdrop-filter: blur(16px)`)
  - Border: `1px solid rgba(255, 255, 255, 0.08)`
  - Facet Sheen: `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)`
- **`.glass-pill`**:
  - Background: `rgba(255, 255, 255, 0.04)`
  - Backdrop Blur: `blur(12px)`
  - Border: `1px solid rgba(255, 255, 255, 0.10)`
  - Inset Sheen: `box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08)`
- **`.glass-panel-hover`**:
  - Timing: `transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`
  - Hover: translateY(-4px), border color `rgba(249, 115, 22, 0.35)`, outer glow `0 0 30px rgba(249, 115, 22, 0.10)`.

### Atmosphere & Ambient Lighting
- **`.bg-tech-grid`**: 48px × 48px dual-axis grid lines in `rgba(255, 255, 255, 0.02)`.
- **`.bg-tech-dots`**: 24px × 24px radial dot matrix in `rgba(255, 255, 255, 0.08)`.
- **Ambient Radial Glows**:
  - Orange Glow: `radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)`
  - Cyan Glow: `radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)`
  - Indigo Glow: `radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)`

---

## 4. Component Rules & Canonical Patterns

### A. Focus & Keyboard Accessibility Standard
All interactive elements support studio-grade, accessible `:focus-visible` states:
```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #08080b, 0 0 0 4px rgba(249, 115, 22, 0.6);
}
```

### B. Touch Target Law (>= 44x44px)
All mobile interactive targets (hamburger menu, slide arrows, scroll-to-top, email copy) must have at least `44px × 44px` touch bounding boxes (`w-11 h-11`).

### C. Buttons
1. **Primary Action**:
   - Solid / Gradient Creatio Orange (`from-orange-500 to-amber-500`) with text black/white.
   - Glow on hover: `box-shadow: 0 0 20px rgba(249, 115, 22, 0.40)`.
   - Scale feedback on tap: `active:scale-[0.98]`.
2. **Secondary / Glass Action**:
   - Uses `.glass-pill` or `.glass-panel` background with subtle border.
   - Hover: Border switches to `rgba(255, 255, 255, 0.25)` or `rgba(249, 115, 22, 0.35)`.
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
