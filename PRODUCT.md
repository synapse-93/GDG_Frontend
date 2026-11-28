# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary — RVCE student builders & prospective participants:** Engineering undergraduates across all branches at RV College of Engineering visiting on mobile (`375px`), tablet (`768px`), or desktop (`1440px`) to explore campus technical tracks, discover upcoming workshops and past recaps, export session schedules to their calendar, inspect prerequisites and agendas, and get to know the student core team.
- **Secondary — GDG on Campus RVCE Core Team & Interface Unlocked reviewers:** Student organizers judging the *Interface Unlocked* UI Design Challenge submission on concept originality, GDG brand fit, usability, visual craft, accessibility, and architectural feasibility to extend into future chapter routes (*About*, *Resources*, *FAQ*, *Join*).

## Product Purpose

Deliver a high-craft **Swiss Editorial Grid × Material 3 Expressive** web interface for **GDG on Campus RV College of Engineering (GDG on Campus RVCE)**—pairing disciplined editorial hierarchy with expressive Google color-blocked geometry, tactile spring motion, and authentic student developer utilities.

Success means:
- Visitors immediately feel an unmistakable RVCE campus developer-community identity on `/`, interact with the four Google technical tracks, see the live next-event countdown, browse upcoming sessions and the latest recap, and navigate effortlessly to `/events` or `/team`.
- Students on `/events` filter sessions rapidly by keyword, schedule status (`All`, `Upcoming`, `Past`), or track (`Web`, `AI / ML`, `Cloud`, `Android`), and switch between **Poster Grid** and **List View** for fast scanning.
- Readers on `/events/[slug]` get a full-bleed campus event poster, distraction-free session overview, expandable agenda timeline, complete logistics and prerequisites, copy-link confirmation, and one-click `.ics` calendar export.
- Visitors on `/team` explore a full-width portrait wall separating Chapter Leadership from Technical Vertical Leads, with expressive M3 shape-masked SVG portraits and an accessible **Member Profile** slide-over drawer showing bio, focus, stack, sessions led, and social links.
- The Core Team can later extend the codebase into *About*, *Resources*, *FAQ*, and *Join* routes and swap in the official GDG SVG mark or real portraits (`imagePath`) without refactoring the shell or token architecture.

## Positioning

A **Swiss Editorial Grid × Material 3 Expressive** campus community hub crafted specifically for engineering students—combining bold poster artwork, disciplined hairline structure, physics-driven `motion/react` interactions, and genuine developer utilities (global `⌘K` fuzzy navigation, `.ics` export, circular View Transition theme reveal). Strictly governed by the **Zero Fake UI** rule: no hardcoded Lighthouse scores, no fake `curl` outputs, no corporate jargon (`"Compact Ledger"`, `"Builder Dossier"`), zero tracking, and zero social clutter.

## Operating Context

- **Challenge context:** Built for the *GDG on Campus RVCE — Interface Unlocked* UI Design Challenge (21 Nov – 28 Nov 2026) and deployed as a Next.js App Router frontend on Vercel.
- **Permitted routes & confirmed surface modes (strictly enforced):**
  1. **`/` (Home) — Persuade + Experience:** Oversized editorial hero, community intro, primary CTAs, live next-event countdown, interactive M3 track playground, featured upcoming events, latest past-event recap, and community channels.
  2. **`/events` (Events Directory) — Operate:** Fast multi-field search and track/status filtering, **Poster Grid vs. List View** toggle, URL-synced filters, and clear empty-state recovery.
  3. **`/events/[slug]` (Dedicated Event Detail) — Read + Operate:** Statically generated via `generateStaticParams`, full-bleed `<EventPoster />` banner, clean reading column (overview, learning outcomes, prerequisites), **interactive expandable agenda**, sticky logistics rail, copy-link action, and **one-click `.ics` calendar export**.
  4. **`/team` (Team Directory) — Persuade + Read:** Vertical filter tabs, **expressive M3 shape-masked SVG portraits** (with optional drop-in `imagePath` support), clear hierarchy distinguishing **Chapter Leadership (`Lead & Core`) vs. Technical Vertical Leads**, and an accessible **Member Profile** slide-over drawer.
- **Forbidden routes:** Must NOT create `/about`, `/resources`, `/faq`, `/join`, `/contact`, or `/api/*` routes.

## Capabilities and Constraints

- **Technical stack (established in codebase):** Next.js 16 (App Router, TypeScript strict mode, `src/` directory), Tailwind CSS v4 (`@import "tailwindcss";` with class-based `@custom-variant dark (&:where(.dark, .dark *));` and `@theme inline` variable mapping), `next-themes` (`attribute="class"`), `motion/react` (`<LazyMotion>` async `domMax` + `motion/react-m` `* as m` + `<MotionConfig reducedMotion="user">`), `lucide-react` icons only, and `Plus Jakarta Sans` + `JetBrains Mono` via `next/font/google`.
- **Hard challenge bans (disqualification guardrails — NEVER include in code, mock data, or UI):**
  - Zero analytics scripts, tracking pixels, or telemetry.
  - Zero RSVP counters, interest counters, "X attending" badges, or attendee lists.
  - Zero comment sections, reactions, or live chat widgets.
  - Zero real student names, real RVCE emails, real phone numbers, or third-party company logos.
  - Zero heavy WebGL/3D or Lottie libraries (`three`, `@react-three/fiber`, `spline`, `lottie-web`).
  - **Zero Fake UI:** Never fabricate Lighthouse scores, fake `curl` outputs, or bloated corporate labels (`"Compact Ledger"`, `"Builder Dossier"`).
- **Motion & performance constraint:** Load `domMax` asynchronously via `<LazyMotion strict>` and use `motion/react-m` (`* as m`) for spring transitions (`layoutId` indicators, tactile hover/tap). Use CSS View Transitions API for circular theme reveal and CSS Scroll-Driven animations (`@supports (animation-timeline: view())`) for lightweight progress/parallax. Animate strictly `transform`, `opacity`, and view-transition `clip-path`, respecting `prefers-reduced-motion: reduce`.
- **Hydration & build verification gate:** Guard client-dependent UI (`ThemeToggle`, live `CountdownTimer`, keyboard hints) via `useSyncExternalStore` so SSR produces zero hydration warnings. `npx tsc --noEmit`, `npm run lint`, and `npm run build` must exit `0` with zero errors, and all permitted routes must have zero horizontal overflow at `375px`, `768px`, and `1440px`.

## Brand Commitments

- **Official chapter naming:** Always use **GDG on Campus RV College of Engineering** (short form: **GDG on Campus RVCE**).
- **Four Google brand colors:** Blue (`#4285F4`), Red (`#EA4335`), Yellow (`#FBBC04`), and Green (`#34A853`) used purposefully as track signatures, M3 color-blocked posters, and geometric accents.
- **Logo integrity & clear space:** Render `<GdgLogo />` unstretched with generous `p-2` clear space and an authentic 4-color `< >` bracket lockup so the official GDG SVG mark drops in cleanly without distortion or recoloring.
- **Independent chapter disclaimer:** Footer must explicitly state that GDG on Campus RV College of Engineering is an independent student developer community chapter and is not an official Google product.
- **Open-source credits:** Credit `Plus Jakarta Sans` & `JetBrains Mono` (Google Fonts) and `lucide-react` (ISC License) in both the footer and `README.md`.
- **Existing documentation guardrail:** Do NOT delete or overwrite `DESIGN_NOTE.md` until explicitly requested during final documentation updates.

## Evidence on Hand

- **Synthetic demo datasets (100% fictional — no real personal data):**
  - `src/data/site.ts` — Official chapter naming, navigation items, 4 technical verticals (`Web & Edge Systems`, `Applied AI & Agents`, `Cloud & Infrastructure`, `Android & Design Craft`), chapter social links, and the *DevFest Campus Warmup* recap.
  - `src/data/events.ts` — 6 fictional RVCE sessions (3 upcoming Dec 2026 – Feb 2027, 3 past Aug – Oct 2026) across `Web`, `AI / ML`, `Cloud`, and `Android` with agendas, prerequisites, outcomes, and campus venues (`IEM Auditorium`, `CS Seminar Hall`, `EC Seminar Hall`, `Google Meet`).
  - `src/data/team.ts` — 10 fictional core team builders across `Lead & Core`, `Dev Vertical`, `AI / ML`, `Cloud`, and `Design`, with role, bio, demo links, and optional `imagePath` portrait slots.
- **Project references:** `AGENTS.md`, `ARCHITECTURE.md`, `DESIGN.md`, `DESIGN_NOTE.md`, and `README.md`.
- **Absences not to fabricate:** No real student photographs, no real registration or attendance counts, no real RVCE emails or phone numbers, no third-party sponsor/company logos, no analytics scripts, and no fabricated telemetry/CLI outputs.

## Product Principles

1. **Swiss Editorial Grid × Material 3 Expressive:** Pair crisp hairline structure and dramatic typography with saturated Google color-blocked geometry and custom inline SVG domain artwork.
2. **Zero Fake UI:** Every visible metric, label, and interaction must be authentic student utility—never decorative fake terminal logs, fabricated Lighthouse scores, or corporate jargon.
3. **Physics-driven, lightweight motion:** Standardize on async `<LazyMotion>` (`domMax`) + `motion/react-m`, native View Transitions, and compositor-only animations with full reduced-motion fallbacks.
4. **Strict brand & challenge discipline:** Enforce GDG's four colors, logo clear space, independent chapter disclaimer, permitted-route boundaries, and every disqualification ban as hard invariants.
5. **Accessible & extensible by construction:** Maintain WCAG AA contrast across Light and Dark themes, crisp mobile ergonomics at `375px` and `768px`, keyboard/focus rigor, and modular TypeScript contracts ready for future chapter routes.

## Accessibility & Inclusion

- **WCAG AA contrast across Light & Dark themes:**
  - Dedicated `--gdg-blue-ink` token (`#1765CC` in Light mode, `#669DF6` in Dark mode) for WCAG AA small blue text, while preserving `#4285F4` for brand marks, borders, and focus rings.
  - Yellow surfaces (`#FBBC04` / `#FDD663`) NEVER carry white text; they always pair with `#111827` dark ink.
- **Keyboard, focus & assistive semantics:** Skip-to-main-content link, semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`), `aria-current="page"`, `aria-pressed` toggles, `aria-expanded` expandable agenda & drawer triggers, `aria-live="polite"` result announcements, focus-trapped `⌘K` command palette, Escape-to-close drawers with focus restoration, and consistent `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]` focus rings on every interactive control.
- **Reduced motion & decorative isolation:** All spring motion and view transitions degrade gracefully under `<MotionConfig reducedMotion="user">` and `@media (prefers-reduced-motion: reduce)`, and decorative SVG artwork is marked `aria-hidden="true"`.
