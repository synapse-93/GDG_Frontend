# AGENTS.md — Execution Rules & Guardrails

## 1. Scope & Routes
- Chapter: **GDG on Campus RV College of Engineering** (short: **GDG on Campus RVCE**).
- Pages to build:
  1. `/` — Home (community intro, CTAs, live next-event countdown, featured/upcoming events, latest recap, community links)
  2. `/events` — Events directory (search, track filter, upcoming/past filter, event cards)
  3. `/events/[slug]` — Dedicated Event Detail page (static generated via `generateStaticParams`)
  4. `/team` — Team directory (vertical filter tabs, member cards with role, short bio, social links)
- Forbidden routes: Do NOT create About, Resources, FAQ, Join, Contact, or `/api/*` routes.

## 2. Non-Negotiable Ground Rules (Challenge Disqualification Risks)
NEVER include any of the following in code, mock data, or UI:
- Analytics scripts, tracking pixels, or telemetry.
- RSVP counters, interest counters, "X attending" badges, or attendee lists.
- Comment sections, reactions, or live chat widgets.
- Real student names, real RVCE emails, real phone numbers, or third-party company logos.
- Heavy 3D/animation libraries (`three`, `@react-three/fiber`, `spline`, `lottie-web`, `framer-motion`).

## 3. Stack & Tailwind CSS v4 Rules
- Framework: Next.js (App Router, TypeScript strict mode, `src/` directory).
- Styling: Tailwind CSS v4 (`@import "tailwindcss";` in `src/app/globals.css`).
- CRITICAL DARK MODE RULE: Tailwind v4 defaults to `prefers-color-scheme`. `src/app/globals.css` MUST declare `@custom-variant dark (&:where(.dark, .dark *));` and map `:root` / `.dark` CSS variables inside `@theme inline` so `next-themes` (`attribute="class"`) toggles all surfaces dynamically.
- Icons: `lucide-react` only (credited in footer and `README.md`).
- Fonts: `Plus Jakarta Sans` and `JetBrains Mono` via `next/font/google`.

## 4. GPU-Composited 3D Motion Rules
- Build all 3D geometric accents using pure CSS 3D (`transform-style: preserve-3d`, `perspective`, `rotateX/Y/Z`, `translateZ`) and inline SVGs.
- Animate ONLY `transform` and `opacity`. Never animate layout or paint properties (`width`, `height`, `top`, `left`, `box-shadow`, `blur`).
- Wrap all continuous keyframes with `@media (prefers-reduced-motion: reduce)` to disable motion cleanly.

## 5. GDG Brand & Accessibility Compliance
- Four Google colors: Blue (`#4285F4`), Red (`#EA4335`), Yellow (`#FBBC04`), Green (`#34A853`).
- Contrast rule: NEVER place white text on Google Yellow (`#FBBC04` / `#FDD663`). Always use dark ink (`#111827`) on yellow badges/surfaces.
- Logo: Render `<GdgLogo />` placeholder with generous clear space (`p-2`). Never stretch, distort, or recolor the official logo when swapped in.
- Disclaimer: Footer must state that this website is an independent student community chapter and is not an official Google product.
- Focus rings: Every interactive control must include `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]`.
- Hydration safety: Guard client-dependent UI (`ThemeToggle`, live `CountdownTimer`) with a `mounted` state check so SSR produces zero hydration warnings.

## 6. Build Verification Gate
Before completing any phase:
1. Run `npm run build` and confirm exit code 0 with zero TypeScript or ESLint errors.
2. Verify zero horizontal overflow at `375px` (mobile), `768px` (tablet), and `1440px` (desktop).
3. Verify WCAG AA text contrast across both Light and Dark themes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
