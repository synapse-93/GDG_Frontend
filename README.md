# GDG on Campus RV College of Engineering — Interface Unlocked

A responsive, accessible community web interface for **GDG on Campus RV College of Engineering (GDG on Campus RVCE)** designed around a **Developer Studio & Blueprint** visual language. Built with Next.js App Router, TypeScript, Tailwind CSS v4, and GPU-composited pure CSS 3D geometry.

> **Live Demo:** [https://gdgfrontend-jet.vercel.app](https://gdgfrontend-jet.vercel.app)

---

## Feature Overview

- **Home (`/`)**
  - Editorial blueprint hero (`01 // COMMUNITY · RV COLLEGE OF ENGINEERING`) with a pure CSS 3D wireframe cube & orbital ring centerpiece.
  - Hydration-safe live `DD : HH : MM : SS` countdown timer (`useSyncExternalStore`) targeting the nearest upcoming campus session.
  - Four Google-color-accented technical vertical tiles (`Web & Edge Systems`, `Applied AI & Agents`, `Cloud & Infrastructure`, `Android & Design Craft`).
  - Featured upcoming events strip, latest past-event editorial recap (`DevFest Campus Warmup`), and open community channels strip.
- **Events Directory (`/events`) & Dedicated Event Detail (`/events/[slug]`)**
  - Real-time client search across event titles, taglines, descriptions, venues, and speakers.
  - Segmented schedule filter (`All`, `Upcoming`, `Past`) and WCAG AA color-coded track pills (`Web`, `AI / ML`, `Cloud`, `Android`), with empty-state filter reset.
  - Statically generated detail pages (`generateStaticParams`) for all 6 events with overview, learning outcomes, structured agenda timeline, prerequisites, and a sticky logistics sidebar.
- **Team Directory (`/team`)**
  - Filterable core team showcase across `Lead & Core`, `Dev Vertical`, `AI / ML`, `Cloud`, and `Design`.
  - Tactile builder cards featuring CSS 3D geometric emblems (with drop-in local `imagePath` support), role badges, short bios, and accessible social links.
- **Light & Dark Theme System**
  - Warm studio paper (`#FAF9F6`) in Light mode and deep carbon-slate (`#0C0F14`) in Dark mode with WCAG AA contrast across all text, badges, and interactive states.

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Static Generation, TypeScript strict mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@theme inline` + class-based `@custom-variant dark`)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via `next/font/google`
- **3D Accents:** Pure CSS 3D (`perspective`, `transform-style: preserve-3d`) + inline SVGs (zero WebGL or heavy animation libraries)

---

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Run typecheck, lint, and production build
npx tsc --noEmit
npm run lint
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser after running `npm run dev`.

---

## Screenshots

Place captured Light/Dark desktop (`1440px`) and mobile (`375px`) screenshots in `public/screenshots/`:

| View | Desktop (`1440px`) | Mobile (`375px`) |
| :--- | :--- | :--- |
| **Home** | `public/screenshots/home-desktop.png` | `public/screenshots/home-mobile.png` |
| **Events & Detail** | `public/screenshots/events-desktop.png` | `public/screenshots/events-mobile.png` |
| **Team** | `public/screenshots/team-desktop.png` | — |

```markdown
![Home Desktop](public/screenshots/home-desktop.png)
![Home Mobile](public/screenshots/home-mobile.png)
![Events Desktop](public/screenshots/events-desktop.png)
![Events Mobile](public/screenshots/events-mobile.png)
![Team Desktop](public/screenshots/team-desktop.png)
```

---

## Architecture & Documentation

- [DESIGN_NOTE.md](./DESIGN_NOTE.md) — 1-page design rationale covering visual direction, color/typography tokens, and GDG brand compliance.
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Semantic design tokens, repository map, and TypeScript data contracts.

---

## Credits & Disclaimer

- **Fonts:** Plus Jakarta Sans & JetBrains Mono served via Google Fonts (`next/font/google`).
- **Icons:** Lucide Icons (`lucide-react`, ISC License).
- **Disclaimer:** *GDG on Campus RV College of Engineering is an independent student developer community chapter. This website is not an official Google product, and all team/speaker profiles and event schedules are synthetic demo data.*
