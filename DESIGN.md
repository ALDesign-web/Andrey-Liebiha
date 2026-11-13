# DESIGN.md - Design System & Visual Lock Specification

## Brand & Atmosphere
- **Direction**: High-craft tactile obsidian studio aesthetic tailored for a Mobile UX/UI & Motion portfolio. Crisp surfaces, restrained depth, and real mobile screens as the primary focal element.
- **Theme Lock**: Monolithic Dark Slate (`#08090a` primary canvas alternating cleanly with `#0d0f12` secondary bands).
- **Color Lock**:
  - Primary Canvas: `#08090a` (Pitch Basalt)
  - Elevated Surface: `#121316` (Graphite Plate) / `#16181d` (Card Hover)
  - Subtle Borders: `rgba(255, 255, 255, 0.08)` default, `rgba(255, 255, 255, 0.16)` hover
  - Primary Ink: `#f2f5f1` (Bone Chalk)
  - Secondary Ink: `#adb3b7` (Steel) — maintain WCAG AA contrast >= 4.5:1 on readable copy (`>= #adb3b7` or `#8d949b` on `#08090a`)
  - Single Accent: `#ff7235` (Safety Vermilion) — used consistently for primary CTAs, active tabs, and focus rings; semantic green reserved strictly for the live availability indicator dot.
- **Shape Lock**: Architectural rounded-rect geometry (`rounded-2xl` / `rounded-3xl` containers, `rounded-xl` buttons/inputs, `rounded-full` pill nav/status chips).

## Typography & Layout Rhythm
- **Font Pairing**: `Geist Sans` (Display / UI / Body) + `Geist Mono` (Labels, timings, metrics, platform specs).
- **Hero Scale**: `clamp(2.5rem, 5.4vw, 4.5rem)` (`40px` to `72px`), tight display tracking (`-0.03em`), max 2 lines on desktop, primary CTA + interactive mobile visuals visible above the fold.
- **Alternating Pacing**: Avoid repetitive multi-column icon grids; pair asymmetric feature showcases with crisp case study layouts and interactive mobile viewport frames.

## Motion Choreography & Accessibility
- **Performance Rule**: Animate GPU-composited properties only (`transform`, `opacity`). Zero layout-thrashing animations.
- **Reduced Motion**: Every CSS animation (`src/app/globals.css`) and Framer Motion sequence (`useReducedMotion`) degrades cleanly to instant static presentation when `prefers-reduced-motion: reduce` is active.
- **Touch Targets & Focus**: Minimum `44x44px` hit areas on interactive controls and clear `:focus-visible` vermilion outlines.

## Strict Anti-Slop Checklist
- Zero em-dashes (`—`) in UI copy.
- Zero numbered eyebrows (`01 · Section`).
- Zero fake version badges or mastery percentages (`Mastery 100%`).
- Zero fabricated product telemetry or misleading AI/algorithmic labels.
