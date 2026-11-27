# Design Note — GDG on Campus RV College of Engineering

## 1. Visual Direction: Material 3 Expressive × Campus Event Poster
To avoid sterile documentation templates and generic 3D wireframes, **GDG on Campus RVCE** pairs **Google Material 3 Expressive** geometry with bold **Campus Event Poster** energy. Oversized `Plus Jakarta Sans` display typography (`text-5xl sm:text-6xl lg:text-7xl leading-[0.98]`), saturated Google color blocking, and tactile M3 silhouettes—arches, four-leaf clovers, stadium pills, and scalloped starbursts—bring campus spirit without clutter or dead whitespace.

Visual pacing alternates warm archival paper (`#FAF9F6`) with an inverted dark studio band (`#111827` in Light mode, `#161D2B` in Dark mode) and tactile CSS `linear()` spring hover reactions. Every hover tilt and float animates strictly GPU-composited `transform` and `opacity` (zero WebGL, `three`, or `framer-motion`) and halts under `prefers-reduced-motion: reduce`.

## 2. Original Domain Artwork & Developer Utilities
A custom inline SVG illustration library ([`DomainArtwork.tsx`](file:///src/components/brand/DomainArtwork.tsx)) anchors all four routes (`/`, `/events`, `/events/[slug]`, `/team`) with six chunky Google-color artworks (`linux`, `cloud`, `ai`, `web`, `android`, `devfest`) and zero third-party company logos:
- **Interactive M3 Track Playground & Studio Band (`/`):** Four color-blocked shape tiles—Web Blue arch, AI/ML Green clover, Cloud Red pill, and Android Yellow starburst (`#111827` dark ink)—switch the live RVCE track and terminal snippet, paired below with an inverted dark studio band.
- **Poster-First Events & Detail Banners (`/events`, `/events/[slug]`):** [`EventPoster.tsx`](file:///src/components/events/EventPoster.tsx) blends saturated color blocking, oversized date numerals, M3 cutouts, and matching `<DomainArtwork />` (`linux`, `cloud`, `ai`, `web`, `android`, `devfest`). `/events` defaults to Poster Grid (with a toggle to Compact Ledger), while `/events/[slug]` pairs a full-bleed poster hero with sticky logistics, `.ics` export, copy-link feedback, and expandable agendas.
- **Builder Portrait Wall & Slide-Over Dossier (`/team`):** Full-width roster placing 2 Chapter Leadership feature cards above a 4-column Technical Vertical Leads grid. Each member wears an `80px`–`96px` M3 shape-masked portrait with vertical domain glyphs and initials; clicking any builder opens an accessible slide-over dossier drawer (Escape + backdrop dismiss) with bio, RVCE build focus, stack, sessions led, and social links.
- **Global `⌘K` Command Palette:** Instant keyboard jump across routes, tracks, sessions, dossiers, and themes.

## 3. Color, Accessibility & Brand Compliance
Light (`#FAF9F6`) and Dark (`#0C0F14`) themes toggle via `next-themes` and Tailwind v4 `@custom-variant dark`. Yellow surfaces strictly pair with `#111827` dark ink, controls include `#4285F4` focus outlines, hydration-safe state guards prevent SSR warnings, and the footer preserves the independent chapter disclaimer and open-source font/icon credits with zero analytics, RSVP counters, attendee lists, or real student PII.
