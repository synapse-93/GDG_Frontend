---
name: GDG on Campus RVCE — Swiss Editorial Grid × Material 3 Expressive
description: Swiss Editorial Grid × Material 3 Expressive campus community hub on warm studio paper and deep carbon-slate, pairing Plus Jakarta Sans scale, 1px architectural hairlines, saturated Google color-blocked posters, original SVG domain artwork, and async LazyMotion spring physics.
colors:
  almanac-paper: "#FAF9F6"
  almanac-surface: "#FFFFFF"
  almanac-wash: "#F2EFE9"
  almanac-hairline: "#E5E2DC"
  ink-primary: "#111827"
  ink-secondary: "#4B5563"
  carbon-paper: "#0C0F14"
  carbon-surface: "#141922"
  carbon-band: "#161D2B"
  carbon-wash: "#1C2330"
  carbon-hairline: "#252D3D"
  carbon-ink: "#F8FAFC"
  carbon-ink-muted: "#94A3B8"
  gdg-blue: "#4285F4"
  gdg-blue-ink: "#1765CC"
  gdg-blue-deep: "#0F4C9E"
  gdg-blue-soft: "#A8C7FA"
  gdg-blue-cta: "#1A73E8"
  gdg-blue-cta-hover: "#1557B0"
  gdg-blue-dark: "#669DF6"
  gdg-red: "#EA4335"
  gdg-red-poster: "#C5221F"
  gdg-red-deep: "#961816"
  gdg-red-soft: "#FAD2CF"
  gdg-red-dark: "#F28B82"
  gdg-yellow: "#FBBC04"
  gdg-yellow-deep: "#E3A000"
  gdg-yellow-dark: "#FDD663"
  gdg-green: "#34A853"
  gdg-green-poster: "#137333"
  gdg-green-deep: "#0D5225"
  gdg-green-soft: "#A8DAB5"
  gdg-green-dark: "#81C995"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0em"
rounded:
  none: "0px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  poster: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  band-y: "64px"
components:
  button-primary:
    backgroundColor: "{colors.gdg-blue-cta}"
    textColor: "{colors.almanac-surface}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.gdg-blue-cta-hover}"
    textColor: "{colors.almanac-surface}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "{colors.almanac-surface}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  command-trigger:
    backgroundColor: "{colors.almanac-surface}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  list-row:
    backgroundColor: "{colors.almanac-paper}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.none}"
    padding: "20px 0px"
  filter-pill-active:
    backgroundColor: "{colors.ink-primary}"
    textColor: "{colors.almanac-paper}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  filter-pill-idle:
    backgroundColor: "{colors.almanac-paper}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  badge-yellow:
    backgroundColor: "{colors.gdg-yellow}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  profile-drawer:
    backgroundColor: "{colors.almanac-surface}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.none}"
    padding: "32px"
---

# Design System: GDG on Campus RVCE — Swiss Editorial Grid × Material 3 Expressive

## Overview

**Creative North Star: "Swiss Editorial Grid × Material 3 Expressive"**

The **GDG on Campus RV College of Engineering** web interface fuses disciplined Swiss editorial grids (warm archival paper `#FAF9F6` in Light mode, carbon-slate `#0C0F14` in Dark mode, `1px` architectural hairlines, oversized `Plus Jakarta Sans` scale) with tactile **Material 3 Expressive** silhouettes—arches, four-leaf clovers, stadium pills, and scalloped starbursts—plus original inline SVG domain artwork (`DomainArtwork.tsx`) and physics-driven `motion/react` interactions.

Every control serves authentic student developer utility: a keyboard-first `⌘K` fuzzy command palette, circular View Transition theme switching, spring-animated navigation indicators, a Poster Grid / List View events explorer, client-side `.ics` calendar export, expandable session agendas, and M3 shape-framed team portraits with slide-over member profiles.

**Explicit Anti-References (Permanent System Refusals):**
- **Zero Fake UI:** Never include fabricated Lighthouse scores, fake `curl` responses, simulated status consoles, or corporate jargon (`"Compact Ledger"`, `"Builder Dossier"`).
- No uppercase monospace eyebrow kickers or section index numbers (`01 //`, `02 //`, `03 //`) above headings.
- No colored top-stripe borders (`border-t-2` / `h-1` accent stripes) on cards and no nested bordered cards inside cards.
- No heavy WebGL/3D/Lottie libraries (`three`, `@react-three/fiber`, `spline`, `lottie-web`).

## Colors

### Primary & Semantic Google Palette
- **GDG Signal Blue** (`--gdg-blue` / `#4285F4` Light, `#669DF6` Dark): Brand bracket geometry, focus outlines (`2px` `#4285F4`), and Web accents.
- **Blueprint Blue Ink** (`--gdg-blue-ink` / `#1765CC` Light, `#669DF6` Dark): Dedicated WCAG AA small-text blue and Web poster fill.
- **Action Cobalt** (`#1A73E8` Light hover `#1557B0`; `#669DF6` Dark with `#0C0F14` ink): Filled primary CTAs.
- **GDG Lab Green** (`--gdg-green` `#34A853`, Poster `#137333`, Dark `#81C995`): Applied AI / ML track coding and upcoming indicators.
- **GDG Workshop Red** (`--gdg-red` `#EA4335`, Poster `#C5221F`, Dark `#F28B82`): Cloud & Infrastructure track coding and campus venue pins.
- **GDG Studio Yellow** (`--gdg-yellow` `#FBBC04`, Dark `#FDD663`): Android & Design track coding and theme sun icon.

### Named Rules
- **The Dark-Ink-On-Yellow Rule.** Never place white text on Google Yellow (`#FBBC04` / `#FDD663`). Always pair yellow surfaces with `#111827` dark ink (`>= 10.3:1`).
- **The Split-Blue Contrast Rule.** Reserve pure `#4285F4` for marks, borders, and focus rings; use `--gdg-blue-ink` (`#1765CC` Light / `#669DF6` Dark) for small interactive blue copy.
- **The Zero Fake UI Rule.** Use `JetBrains Mono` strictly for authentic dates, times (`tabular-nums`), keyboard shortcuts, venues, and real setup prerequisites—never fabricated benchmarks or fake terminal outputs.

## Motion Engine

- **Async `LazyMotion` Architecture:** `MotionProvider.tsx` wraps the app shell in `<LazyMotion features={() => import("@/lib/motion-features").then((res) => res.default)} strict>` (`domMax`) and `<MotionConfig reducedMotion="user">`. All animated components import `* as m from "motion/react-m"`.
- **Precision Chrome Motion:** Spring `layoutId="nav-indicator"` active route pill/bar in `Navbar.tsx`, circular `document.startViewTransition()` clip-path reveal on `ThemeToggle.tsx`, and a 2px four-color CSS Scroll-Driven progress hairline (`@supports (animation-timeline: view())`).
- **GPU-Only & Reduced-Motion Safe:** Animate strictly `transform`, `opacity`, and view-transition `clip-path`. Fall back instantaneously when `prefers-reduced-motion: reduce` is enabled.

## Do's and Don'ts

### Do:
- **Do** use `motion/react-m` (`* as m`) inside `<LazyMotion strict>` and wrap the shell in `<MotionConfig reducedMotion="user">`.
- **Do** pair Google Yellow (`#FBBC04` / `#FDD663`) strictly with `#111827` dark ink and use `--gdg-blue-ink` for small blue interactive text.
- **Do** guard client-dependent UI (`ThemeToggle`, `CountdownTimer`, keyboard hints) via `useSyncExternalStore` for zero hydration warnings.
- **Do** preserve `p-2` clear space around `<GdgLogo />`, open-source font/icon credits, and the independent student chapter footer disclaimer.

### Don't:
- **Don't** include fake Lighthouse scores, fake `curl` logs, or corporate jargon (`"Compact Ledger"`, `"Builder Dossier"`).
- **Don't** import `framer-motion` directly without `<LazyMotion strict>` + `motion/react-m`, or import WebGL/Lottie libraries (`three`, `@react-three/fiber`, `spline`, `lottie-web`).
- **Don't** place white text on Google Yellow (`#FBBC04` / `#FDD663`) anywhere.
- **Don't** add analytics, RSVP/interest counters, attendee lists, comments, live chat, real student PII, third-party company logos, or forbidden routes (`/about`, `/resources`, `/faq`, `/join`, `/contact`, `/api/*`).
