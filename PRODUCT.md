# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary — RVCE student builders & prospective participants:** Engineering undergraduates across all branches at RV College of Engineering visiting on mobile (`375px`), tablet (`768px`), or desktop (`1440px`) to explore campus technical tracks, discover upcoming workshops and past recaps, export session schedules to their calendar, inspect prerequisites and agendas, and get to know the student core team.
- **Secondary — GDG on Campus RVCE Core Team & Interface Unlocked reviewers:** Student organizers judging the *Interface Unlocked* UI Design Challenge submission on concept originality, GDG brand fit, usability, visual craft, accessibility, and architectural feasibility to extend into future chapter routes (*About*, *Resources*, *FAQ*, *Join*).

## Product Purpose

Redesign and ship an interactive **"Kinetic Campus Almanac"** web interface for **GDG on Campus RV College of Engineering (GDG on Campus RVCE)**—replacing a generic stacked-card layout with an authored, tactile, student-engineered chapter hub that balances bold editorial expression with fast, scannable campus utility.

Success means:
- Visitors immediately feel an unmistakable RVCE engineering-studio identity on `/`, can interact directly with technical tracks and pure CSS 3D geometry, see the live next-event countdown, and navigate effortlessly to `/events` or `/team`.
- Students on `/events` can filter sessions rapidly by keyword, schedule status (`All`, `Upcoming`, `Past`), or track (`Web`, `AI / ML`, `Cloud`, `Android`), and switch between **Grid** and **Compact Ledger** views for high-speed scanning.
- Readers on `/events/[slug]` get a clean editorial reading experience, an interactive expandable agenda timeline, complete logistics and prerequisites, and one-click `.ics` calendar export.
- Visitors on `/team` experience expressive custom SVG developer portraits, clear hierarchy separating chapter leadership from vertical leads, and an interactive **Builder Dossier** drawer/panel with each builder's bio, focus, and links.
- The Core Team can later extend the codebase into *About*, *Resources*, *FAQ*, and *Join* routes and swap in the official GDG SVG mark or real portraits (`imagePath`) without refactoring the shell or token architecture.

## Positioning

An interactive **Kinetic Campus Almanac** crafted specifically for an active engineering college developer community—combining editorial publication scale, tactile kinetic instrumentation, and ledger-grade utility rather than a generic SaaS landing page or repetitive stacked-card club template. Built with zero tracking, zero social clutter, and zero heavy WebGL/animation runtimes, proving engineering craft through pure CSS 3D geometry, strict WCAG AA contrast across Light and Dark themes, and clean TypeScript data contracts.

## Operating Context

- **Challenge context:** Built for the *GDG on Campus RVCE — Interface Unlocked* UI Design Challenge (21 Nov – 28 Nov 2026) and deployed as a Next.js App Router frontend on Vercel.
- **Permitted routes & confirmed surface modes (strictly enforced):**
  1. **`/` (Home) — Persuade + Experience:** Bold editorial scale, community intro, primary CTAs, live next-event countdown, interactive track & pure CSS 3D playground, featured upcoming events, latest past-event recap, community links, and unboxed asymmetric layout.
  2. **`/events` (Events Directory) — Operate:** Fast multi-field search and track/status filtering, **Grid vs. Compact Ledger** view toggle, high scanability, URL-synced filters, and clear empty-state recovery.
  3. **`/events/[slug]` (Dedicated Event Detail) — Read + Operate:** Statically generated via `generateStaticParams`, clean editorial reading column (overview, learning outcomes, prerequisites), **interactive expandable agenda**, sticky/above-the-fold session logistics, and **one-click `.ics` calendar export**.
  4. **`/team` (Team Roster) — Persuade + Read:** Vertical filter tabs, **expressive custom SVG developer portraits** (with optional drop-in `imagePath` support), clear hierarchy distinguishing **Leadership (`Lead & Core`) vs. Vertical Leads**, and an **interactive Builder Dossier drawer/panel**.
- **Forbidden routes:** Must NOT create `/about`, `/resources`, `/faq`, `/join`, `/contact`, or `/api/*` routes.

## Capabilities and Constraints

- **Technical stack (established in codebase):** Next.js 16 (App Router, TypeScript strict mode, `src/` directory), Tailwind CSS v4 (`@import "tailwindcss";` with class-based `@custom-variant dark (&:where(.dark, .dark *));` and `@theme inline` variable mapping), `next-themes` (`attribute="class"`), `lucide-react` icons only, and `Plus Jakarta Sans` + `JetBrains Mono` via `next/font/google`.
- **Hard challenge bans (disqualification guardrails — NEVER include in code, mock data, or UI):**
  - Zero analytics scripts, tracking pixels, or telemetry.
  - Zero RSVP counters, interest counters, "X attending" badges, or attendee lists.
  - Zero comment sections, reactions, or live chat widgets.
  - Zero real student names, real RVCE emails, real phone numbers, or third-party company logos.
  - Zero heavy 3D or animation libraries (`three`, `@react-three/fiber`, `spline`, `lottie-web`, `framer-motion`).
- **GPU-composited motion constraint:** All 3D geometric accents and kinetic interactions must use pure CSS 3D (`perspective`, `transform-style: preserve-3d`, `rotateX/Y/Z`, `translateZ`) and inline SVGs animating strictly `transform` and `opacity` (never layout or paint properties like `width`, `height`, `top`, `left`, `box-shadow`, or `blur`), cleanly disabled under `@media (prefers-reduced-motion: reduce)`.
- **Hydration & build verification gate:** Guard client-dependent UI (`ThemeToggle`, live `CountdownTimer`, browser-generated `.ics` downloads, interactive drawers) cleanly so SSR produces zero hydration warnings. `npx tsc --noEmit`, `npm run lint`, and `npm run build` must exit `0` with zero errors, and all permitted routes must have zero horizontal overflow at `375px`, `768px`, and `1440px`.

## Brand Commitments

- **Official chapter naming:** Always use **GDG on Campus RV College of Engineering** (short form: **GDG on Campus RVCE**).
- **Four Google brand colors:** Blue (`#4285F4`), Red (`#EA4335`), Yellow (`#FBBC04`), and Green (`#34A853`) used purposefully as track signatures, structural rules, and geometric accents.
- **Logo integrity & clear space:** Render `<GdgLogo />` unstretched with generous `p-2` clear space and an authentic 4-color `< >` bracket lockup so the official GDG SVG mark drops in cleanly without distortion or recoloring.
- **Independent chapter disclaimer:** Footer must explicitly state that GDG on Campus RV College of Engineering is an independent student developer community chapter and is not an official Google product.
- **Open-source credits:** Credit `Plus Jakarta Sans` & `JetBrains Mono` (Google Fonts) and `lucide-react` (ISC License) in both the footer and `README.md`.
- **Existing documentation guardrail:** Do NOT delete or overwrite `DESIGN_NOTE.md` until explicitly requested during final documentation updates.

## Evidence on Hand

- **Synthetic demo datasets (100% fictional — no real personal data):**
  - `src/data/site.ts` — Official chapter naming, navigation items, 4 technical verticals (`Web & Edge Systems`, `Applied AI & Agents`, `Cloud & Infrastructure`, `Android & Design Craft`), 5 demo community links, and the *DevFest Campus Warmup* recap.
  - `src/data/events.ts` — 6 fictional RVCE sessions (3 upcoming Dec 2026 – Feb 2027, 3 past Aug – Oct 2026) across `Web`, `AI / ML`, `Cloud`, and `Android` with agendas, prerequisites, outcomes, and campus venues (`IEM Auditorium`, `CS Seminar Hall`, `EC Seminar Hall`, `Google Meet`).
  - `src/data/team.ts` — 10 fictional core team builders across `Lead & Core`, `Dev Vertical`, `AI / ML`, `Cloud`, and `Design`, with role, bio, demo links, and optional `imagePath` portrait slots.
- **Project references:** `AGENTS.md`, `ARCHITECTURE.md`, `CONTEXT.md`, `DESIGN_NOTE.md` (preserve untouched), and `README.md`.
- **Absences not to fabricate:** No real student photographs, no real registration or attendance counts, no real RVCE emails or phone numbers, no third-party sponsor/company logos, and no analytics scripts.

## Product Principles

1. **Almanac craft over generic card stacks:** Let typography, asymmetric editorial structure, purposeful whitespace, and interactive kinetic instruments carry each route instead of wrapping every section in repetitive boxed cards.
2. **Mode-matched utility per surface:** Commit to bold experience on `/`, fast ledger-grade operation on `/events`, distraction-free reading + calendar action on `/events/[slug]`, and expressive human storytelling on `/team`.
3. **Strict brand & challenge discipline:** Enforce GDG's four colors, logo clear space, independent chapter disclaimer, permitted-route boundaries, and every disqualification ban as hard invariants.
4. **Accessible & responsive by construction:** Maintain WCAG AA contrast across Light and Dark themes, crisp mobile ergonomics at `375px` and `768px`, keyboard/focus rigor, and reduced-motion safety.
5. **Core-team extensibility:** Keep semantic CSS tokens, typed datasets, and modular components clean so future RVCE organizers can add *About*, *Resources*, *FAQ*, and *Join* pages seamlessly.

## Accessibility & Inclusion

- **WCAG AA contrast across Light & Dark themes:**
  - Dedicated `--gdg-blue-ink` token (`#1765CC` in Light mode, `#669DF6` in Dark mode) for WCAG AA small blue text, while preserving `#4285F4` for brand marks, borders, focus rings, and 3D geometry.
  - Yellow surfaces (`#FBBC04` / `#FDD663`) NEVER carry white text; they always pair with `#111827` dark ink.
- **Keyboard, focus & assistive semantics:** Skip-to-main-content link, semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`), `aria-current="page"`, `aria-pressed` toggles, `aria-expanded` expandable agenda & drawer triggers, `aria-live="polite"` result announcements, Escape-to-close drawers/panels with focus restoration, and consistent `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]` focus rings on every interactive control.
- **Reduced motion & decorative isolation:** All continuous CSS 3D and kinetic animations disable cleanly via `@media (prefers-reduced-motion: reduce)`, and decorative 3D/SVG geometry is marked `aria-hidden="true"`.
