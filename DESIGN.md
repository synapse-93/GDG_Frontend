---
name: GDG on Campus RVCE — Kinetic Campus Almanac
description: Unboxed editorial campus almanac on warm archival paper and deep carbon-slate, structured by dramatic Plus Jakarta Sans scale, 1px full-bleed hairlines, Google four-color wayfinding, pure CSS 3D kinetic stages, and developer-grade utilities.
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
    lineHeight: 1.12
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
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  band-y: "80px"
components:
  button-primary:
    backgroundColor: "{colors.gdg-blue-cta}"
    textColor: "{colors.almanac-surface}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.gdg-blue-cta-hover}"
    textColor: "{colors.almanac-surface}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-outline:
    backgroundColor: "{colors.almanac-paper}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  command-trigger:
    backgroundColor: "{colors.almanac-wash}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  ledger-row:
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
    rounded: "{rounded.sm}"
    padding: "2px 10px"
  dossier-drawer:
    backgroundColor: "{colors.almanac-surface}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.none}"
    padding: "32px"
---

# Design System: GDG on Campus RVCE — Kinetic Campus Almanac

## Overview

**Creative North Star: "Kinetic Campus Almanac"**

The **GDG on Campus RV College of Engineering** web interface is designed like an open-spine, interactive engineering almanac rather than a boxed SaaS template. Full-bleed studio paper in Light mode (`#FAF9F6`) and deep carbon-slate in Dark mode (`#0C0F14`) stay open and breathable, partitioned by crisp `1px` full-width architectural hairlines (`--hairline`), asymmetric two-column splits, and dramatic `Plus Jakarta Sans` typographic hierarchy—never repetitive grids of rounded cards.

Every interaction earns its existence through genuine developer utility: a global `⌘K` command palette for instant cross-route navigation, an interactive Google-track architecture and pure CSS 3D geometry playground on `/`, a Grid-versus-Compact-Ledger view switcher on `/events`, client-side `.ics` calendar export and expandable speaker syllabi on `/events/[slug]`, and expressive custom SVG builder portraits with a slide-over Builder Dossier on `/team`.

**Explicit Anti-References (Permanent System Refusals):**
- No stacked uniform cards of icon + heading + paragraph (no boxed 4-pillar grids, no 10 identical boxed member cards, no 5 identical boxed social cards).
- No uppercase monospace eyebrow labels or section numbers (`01 //`, `02 //`, `03 //`) above headings. Headings carry their own scale and authority.
- No colored top-stripe borders (`border-t-2` / `h-1` accent stripes) on containers and no nested cards inside cards.

**Key Characteristics:**
- Unboxed editorial spreads separated by full-width `1px` `--hairline` rules across `#FAF9F6` (Light) and `#0C0F14` (Dark) toggled via Tailwind CSS v4 `@custom-variant dark`.
- Dramatic `Plus Jakarta Sans` display scale paired with strictly functional `JetBrains Mono` for code/architecture snippets, `tabular-nums` schedules and countdowns, keyboard shortcuts (`⌘K`), and technical prerequisites.
- Disciplined Google four-color wayfinding (Blue for Web & primary action, Green for AI/ML & Live status, Red for Cloud & campus venues, Yellow with `#111827` dark ink for Android/Design).
- Pure CSS 3D geometry (`perspective`, `transform-style: preserve-3d`) and hand-authored SVG developer portraits animating strictly GPU-composited `transform` and `opacity` with full `prefers-reduced-motion: reduce` halts.

## Colors

Open neutral almanac grounds give Google's four brand colors unmistakable semantic clarity across Light and Dark themes without background clutter or rainbow gradients.

### Primary
- **GDG Signal Blue** (`--gdg-blue` / `#4285F4` Light, `#669DF6` Dark): Brand bracket geometry, active navigation underline, Web track signal, keyboard focus rings (`2px` `#4285F4`), and interactive code/3D axis highlights.
- **Blueprint Blue Ink** (`--gdg-blue-ink` / `#1765CC` Light, `#669DF6` Dark): Dedicated WCAG AA small-text blue (`>= 5.14:1` on `#FAF9F6`/`#FFFFFF`; `>= 6.48:1` on `#0C0F14`/`#141922`) for inline editorial emphasis, active links, and interactive text controls.
- **Action Cobalt** (`#1A73E8` Light hover `#1557B0`; `#669DF6` Dark with `#0C0F14` ink): Filled primary buttons (`Explore Events`, `Register Now`, `Reset filters`) guaranteeing strong contrast in both themes.

### Secondary
- **GDG Lab Green** (`--gdg-green` / `#34A853` Light, `#81C995` Dark): Applied AI / ML track coding, live upcoming session indicators, outcome checkmarks, and `.ics` export confirmation states.
- **GDG Workshop Red** (`--gdg-red` / `#EA4335` Light, `#F28B82` Dark): Cloud & Infrastructure track coding, campus venue markers, and architectural accent dots.

### Tertiary
- **GDG Studio Yellow** (`--gdg-yellow` / `#FBBC04` Light, `#FDD663` Dark): Android & Design track coding, Dark-mode toggle sun icon, and portrait accent geometry.

### Neutral
- **Almanac Paper / Carbon Ground** (`--canvas`): Full-bleed primary page ground (`#FAF9F6` Light, `#0C0F14` Dark).
- **Elevated Sheet / Drawer Ground** (`--surface`): Command palette, Builder Dossier slide-over drawer, sticky logistics sheet, and Grid-mode event tiles (`#FFFFFF` Light, `#141922` Dark).
- **Tonal Row Wash** (`--surface-muted`): Hover wash for full-width ledger rows, track workbench items, inactive control hover, and `⌘K` keycaps (`#F2EFE9` Light, `#1C2330` Dark).
- **Structural Hairline** (`--hairline`): Full-width `1px` section rules, ledger row separators, and column dividers (`#E5E2DC` Light, `#252D3D` Dark).
- **Primary Ink** (`--ink`): Editorial display headlines, body text, ledger titles, and active filter fills (`#111827` Light, `#F8FAFC` Dark).
- **Secondary Ink** (`--ink-muted`): Supporting copy, bios, metadata values, and inactive controls (`#4B5563` Light, `#94A3B8` Dark).

### Named Rules
- **The Dark-Ink-On-Yellow Rule.** Never place white text on Google Yellow (`#FBBC04` or `#FDD663`). Every yellow badge or highlight surface pairs strictly with `#111827` dark ink in Light mode (`>= 10.3:1`) and translucent `#FDD663/18` with `#FDD663` ink on dark carbon in Dark mode.
- **The Split-Blue Contrast Rule.** Reserve pure `#4285F4` for brand marks, focus outlines, borders, and 3D wireframes; always use `--gdg-blue-ink` (`#1765CC` Light / `#669DF6` Dark) for small interactive blue copy and `#1A73E8` for white-text primary buttons.
- **The Unboxed Field Rule.** Use color as leading dots, crisp taxonomy badges, interactive state indicators, and wireframe/portrait geometry—never colored top-stripe bars or decorative background gradients.

## Typography

**Display & Headline Font:** Plus Jakarta Sans (fallback: `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Plus Jakarta Sans (fallback: `ui-sans-serif, system-ui, sans-serif`)
**Functional Data / Code Font:** JetBrains Mono (fallback: `ui-monospace, SFMono-Regular, monospace`)

**Character:** Bold, contemporary geometric editorial headlines paired with calm high-contrast reading copy, anchored by monospace strictly where engineers expect monospace—code/architecture previews, tabular schedules, keyboard shortcuts, and countdown clocks.

### Hierarchy
- **Display** (`Plus Jakarta Sans`, `800`, `clamp(2.75rem, 5.5vw, 4.5rem)`, `1.03` line-height, `-0.03em` tracking): Home hero thesis statement only.
- **Headline** (`Plus Jakarta Sans`, `800`, `2rem` to `2.75rem`, `1.12` line-height, `-0.025em` tracking): Route titles (`/events`, `/events/[slug]`, `/team`) and major Home spread titles.
- **Section Heading** (`Plus Jakarta Sans`, `700`, `1.5rem` to `2rem`, `1.2` line-height, `-0.02em` tracking): Primary section openings across all routes (never preceded by an uppercase mono eyebrow or `01 //` number).
- **Title** (`Plus Jakarta Sans`, `700`, `1.0625rem` to `1.25rem`, `1.3` line-height, `-0.015em` tracking): Event titles in Ledger/Grid, expandable agenda rows, and team builder names.
- **Body** (`Plus Jakarta Sans`, `400`, `0.9375rem` to `1.0625rem`, `1.65` line-height, `60ch`–`72ch` measure on reading columns): Descriptions, recaps, learning outcomes, and builder bios.
- **Functional Data / Code** (`JetBrains Mono`, `500`–`600`, `0.75rem`–`0.8125rem`, `tabular-nums`): Live countdown digits, schedule dates/times, Ledger logistics columns, architecture preview snippets, `⌘K` keycaps, and prerequisite commands.

### Named Rules
- **The Zero-Eyebrow Rule.** Never place uppercase monospace kickers or `01 //`, `02 //`, `03 //` index numbers above headings. Let generous whitespace (`>= 48px` above a heading vs. `12px`–`16px` below) and clear typographic scale establish hierarchy on their own.
- **The Earned-Monospace Rule.** Restrict `JetBrains Mono` to genuine data, dates, code snippets, handles, shortcuts, and tabular counters—never as decorative styling for headings or editorial paragraphs.

## Layout

All four permitted routes share a centered editorial grid (`max-w-6xl` / `1152px`, horizontal gutter `16px` mobile, `24px` tablet, `32px` desktop) framed by a sticky `64px` (`h-16`) masthead and full-width `1px` `--hairline` section dividers.

- **Unboxed Full-Bleed Spreads (`/`):** Content flows directly on `--canvas` separated by full-width horizontal and vertical `1px` hairlines (`divide-y divide-hairline`, `lg:divide-x`) rather than wrapping sections in rounded boxes. Generous band spacing (`py-14 sm:py-20 lg:py-24`) paces dense interactive workbenches against quiet editorial moments.
- **Mode-Specific Topologies:**
  - `/` (**Persuade + Experience**): Asymmetric 7/5 hero split with interactive 3D bay; 5/7 Track & Architecture Workbench split; asymmetric lead session + ruled upcoming schedule rows; open 7/5 Recap field note; 4/8 Open Channels ruled directory.
  - `/events` (**Operate**): Compact header + unified hairline toolbar (`Search`, `Status`, `Track`, `Ledger | Grid` toggle) over full-width ruled Ledger timetable rows or a flat 3-column Grid.
  - `/events/[slug]` (**Read + Operate**): Calm 8-column reading column (`max-w-[68ch]` prose, ruled outcomes, expandable interactive agenda) paired with a 4-column sticky action rail (`order-first lg:order-none lg:sticky lg:top-24`) containing logistics, `Register Now`, and one-click `.ics` export.
  - `/team` (**Persuade + Read**): Open filter strip over a two-tier hierarchy—2-column Leadership & Operations spread above an 8-builder 2-column ruled Vertical Roster—with a slide-over **Builder Dossier** drawer (`max-w-lg`) opening from the right on desktop and full-width sheet on mobile.
- **Zero-Overflow Guarantee:** `body` applies `overflow-x: clip`, every 3D bay wraps `GeometricScene3D` in `overflow-hidden`, and every responsive table/ledger row collapses gracefully without horizontal scrollbars at `375px`, `768px`, and `1440px`.

## Elevation & Depth

This system is **structurally flat**—no ambient drop shadows on page content, no ghost cards, and no nested cards inside cards.

Depth is reserved for exactly three functional layers:
1. **Hairline & Tonal Ground Separation:** Full-width `1px` `--hairline` borders and `--canvas` / `--surface-muted` hover washes separate regions cleanly on the page plane.
2. **Overlay Elevation (`CommandPalette`, `BuilderDossier`):** True transient overlays use `position: fixed`, a dim backdrop (`bg-ink/35 dark:bg-black/60 backdrop-blur-[2px]`), crisp `1px` `--hairline` framing, and a single soft structural shadow (`0 24px 64px rgba(12, 15, 20, 0.24)`) to lift clearly above the almanac.
3. **Pure CSS 3D Spatial Depth (`GeometricScene3D`):** Interactive and ambient 3D polyhedra inside `.perspective-studio` (`perspective: 900px`, `transform-style: preserve-3d`) animate strictly GPU-composited `transform` and `opacity` properties at 60fps and pause cleanly under `@media (prefers-reduced-motion: reduce)`.

### Named Rules
- **The Zero-Nesting Rule.** Never place a bordered rounded card inside another bordered rounded card. Use hairline dividers (`border-t border-hairline`) or direct open placement on `--canvas`.
- **The GPU-Only Motion Rule.** Every continuous animation and interactive transition animates only `transform`, `opacity`, or instant color/border shifts—never `width`, `height`, `top`, `left`, `box-shadow`, or `blur`.

## Shapes

Sharp editorial discipline—restraint in corner radius keeps the almanac feeling crisp and architectural rather than bubbly:
- **Page sections, ledger rows & drawers:** Sharp architectural edges (`0px` / flush full-width hairlines; drawer panel flush to viewport edge).
- **Buttons, search inputs, segmented toggles, code blocks & `⌘K` palette:** Crisp `8px` (`rounded-lg`) or `12px` (`rounded-xl`) corners.
- **Taxonomy badges (`Web`, `AI / ML`, `Cloud`, `Android`, Verticals):** Compact `6px` (`rounded-md`) tags.
- **Interactive filter pills & status dots:** Capsule (`9999px` / `rounded-full`).
- **Custom SVG Developer Portraits:** Clean square architectural frames (`8px`–`12px` radius) with subtle hairline framing—never generic circular clip masks around flat clip-art.
- **Banned shape pattern:** No `h-1` / `border-t-2` colored accent stripes across top edges of boxes, and no one-sided vertical colored bars down rounded boxes.

## Components

Every interactive control carries `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]` and meets ergonomic touch targets (`>= 40px`–`44px` on mobile).

### Buttons & Action Controls
- **Primary:** `#1A73E8` (Light, hover `#1557B0`, white ink) / `#669DF6` (Dark, hover `#8AB4F8`, `#0C0F14` ink), `8px`–`12px` radius, `12px 22px` padding, `active:scale-[0.98]`.
- **Secondary / Outline:** Transparent or `--surface` fill, `1px` `--hairline` border, `--ink` text, shifting to `--surface-muted` on hover.
- **Calendar Utility (`.ics` Export):** Secondary outline control paired with `CalendarPlus` / `Check` icons and instant `"Saved .ics"` confirmation state.

### Command Palette (`⌘K`)
- **Trigger:** Subtle `--surface-muted` button in Navbar (`Search or jump…` + `⌘K` keycap on `sm+`, search icon on mobile).
- **Dialog:** Fixed centered overlay (`max-w-xl`), live filter input across Routes, Tracks, Events, Team Builders (opens Dossier directly), and Theme toggle; full Up/Down arrow + Enter + Escape keyboard navigation.

### Interactive Track & 3D Workbench (`/`)
- **Track Index:** 4 hairline-separated interactive rows with leading Google color indicator and concise descriptor; selecting a row updates the right-hand Architecture Preview and switches the pure CSS 3D wireframe geometry (`hex`, `diamond`, `cube`, `rings`).
- **3D Playground Controls:** Compact inline segmented selector allowing visitors to switch 3D polyhedron form or pause/inspect rotation directly on the open blueprint bay.

### Events Ledger & Grid Switcher (`/events`)
- **Toolbar:** Unboxed hairline-separated bar combining search input (custom clear button only), high-contrast `All | Upcoming | Past` toggle (`bg-ink text-canvas` active), track filter pills, and `Ledger | Grid` view toggle.
- **Compact Ledger Rows:** Full-width `1px`-ruled schedule rows with tabular date/time column, track + status badges, title + tagline, venue/mode, and directional arrow—full row clickable as one tab stop.

### Expandable Session Agenda (`/events/[slug]`)
- **Rows:** Clean hairline-separated agenda timeline where each row is a `<button aria-expanded>` revealing detailed lab focus notes, key takeaways, and a direct link to the speaker's Builder Dossier (`/team?builder=<id>`). Includes an `"Expand all"` / `"Collapse all"` control.

### Custom SVG Portraits & Builder Dossier (`/team`)
- **BuilderPortrait (`src/components/team/BuilderPortrait.tsx`):** Deterministic, expressive multi-layered vector developer portrait authored per builder (with drop-in `imagePath` support), using vertical-matched Google tokens and crisp geometric linework.
- **BuilderDossier:** Slide-over right drawer (`role="dialog"`, `aria-modal="true"`) showing full portrait, role, vertical badge, bio, cross-referenced RVCE sessions spoken at (linked to `/events/[slug]`), and labeled external links (`GitHub`, `LinkedIn`, `Site`).

### Navigation & Footer
- **Navbar:** Sticky `64px` translucent header (`bg-canvas/90 backdrop-blur-md border-b border-hairline`), unstretched `<GdgLogo responsive />` with `p-2` clear space, clean unnumbered links (`Home`, `Events`, `Team`) with `2px` `--gdg-blue` active underline, `⌘K` trigger, hydration-safe `ThemeToggle`, and Escape/backdrop-dismissible mobile drawer.
- **Footer:** Full-width `3px` 4-color Google hairline rule, open 3-column colophon (Chapter identity + campus address; unnumbered route links; compact single-column external channel list), open-source font/icon credits, and explicit independent student chapter disclaimer.

## Do's and Don'ts

### Do:
- **Do** structure sections with open `--canvas`, generous whitespace, asymmetric two-column splits, and full-width `1px` `--hairline` dividers.
- **Do** pair Google Yellow (`#FBBC04` / `#FDD663`) light-mode surfaces strictly with `#111827` dark ink and use `--gdg-blue-ink` (`#1765CC` Light / `#669DF6` Dark) for small blue interactive text.
- **Do** keep `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]` on every interactive control and guard client-dependent UI (`ThemeToggle`, `CountdownTimer`) with `useSyncExternalStore` for zero hydration warnings.
- **Do** preserve `p-2` clear space and exact aspect ratio around `<GdgLogo />`, open-source credits, and the non-Google-product footer disclaimer.
- **Do** keep every 3D animation strictly GPU-composited (`transform`, `opacity`) and cleanly disabled under `@media (prefers-reduced-motion: reduce)`.

### Don't:
- **Don't** build stacked uniform grids of icon + heading + paragraph cards (`PillarsGrid` boxes, 10 identical `MemberCard` boxes, or 5 identical social cards).
- **Don't** place uppercase monospace eyebrow labels or section numbers (`01 //`, `02 //`, `03 //`) above headings.
- **Don't** add colored top-stripe borders (`border-t-2` / `h-1` color bars) on cards or nest cards inside cards.
- **Don't** place white text on Google Yellow (`#FBBC04` / `#FDD663`) anywhere.
- **Don't** import heavy 3D/animation libraries (`three`, `@react-three/fiber`, `spline`, `lottie-web`, `framer-motion`), or add analytics, RSVP/interest counters, attendee lists, comments, live chat, real student PII, or forbidden routes (`/about`, `/resources`, `/faq`, `/join`, `/contact`, `/api/*`).
