# ARCHITECTURE.md — Design Tokens, File Map & Contracts

## 1. Aesthetic System: Swiss Editorial Grid × Material 3 Expressive
- Warm unbleached studio paper in Light mode (`#FAF9F6`) paired with deep carbon-slate in Dark mode (`#0C0F14`).
- `1px` architectural hairlines (`--hairline`), oversized `Plus Jakarta Sans` editorial headlines, functional `JetBrains Mono` (`tabular-nums`), and saturated Material 3 Expressive silhouettes + original inline SVG domain artwork (`DomainArtwork.tsx`).
- **Zero Fake UI:** No hardcoded Lighthouse scores, fake `curl` outputs, or corporate jargon (`"Compact Ledger"`, `"Builder Dossier"`).
- **Motion Engine:** Standardized on `motion/react` with async `<LazyMotion features={() => import("@/lib/motion-features").then((res) => res.default)} strict>` (`domMax`), `<MotionConfig reducedMotion="user">`, and `motion/react-m` (`* as m`), paired with native View Transitions API circular theme reveal and CSS Scroll-Driven progress/parallax.

## 2. Color & Theme Tokens (`src/app/globals.css`)

| Semantic Token | Light Value | Dark Value | Tailwind Utility (`@theme inline`) | Role |
| :--- | :--- | :--- | :--- | :--- |
| `--canvas` | `#FAF9F6` | `#0C0F14` | `bg-canvas` | Primary page background |
| `--surface` | `#FFFFFF` | `#141922` | `bg-surface` | Elevated cards, drawers & panels |
| `--surface-muted` | `#F2EFE9` | `#1C2330` | `bg-surface-muted` | Filter pills, hover washes |
| `--hairline` | `#E5E2DC` | `#252D3D` | `border-hairline` | `1px` structural rules |
| `--ink` | `#111827` | `#F8FAFC` | `text-ink` | Primary headings & body copy |
| `--ink-muted` | `#4B5563` | `#94A3B8` | `text-ink-muted` | Metadata, bios, subtitles |
| `--gdg-blue` | `#4285F4` | `#669DF6` | `bg-gdg-blue` / `text-gdg-blue` | Brand mark, focus rings, Web accent |
| `--gdg-blue-ink` | `#1765CC` | `#669DF6` | `text-gdg-blue-ink` | WCAG AA small blue interactive text |
| `--gdg-red` | `#EA4335` | `#F28B82` | `bg-gdg-red` / `text-gdg-red` | Cloud track, venue markers |
| `--gdg-yellow` | `#FBBC04` | `#FDD663` | `bg-gdg-yellow` / `text-gdg-yellow` | Android & Design (`#111827` dark ink only) |
| `--gdg-green` | `#34A853` | `#81C995` | `bg-gdg-green` / `text-gdg-green` | AI / ML track, upcoming indicators |

## 3. Repository Structure

```text
gdg-rvce-interface/
├── AGENTS.md                       # Execution rules, motion standards & challenge guardrails
├── ARCHITECTURE.md                 # Semantic design tokens, repository map & TypeScript contracts
├── DESIGN.md                       # Swiss Editorial Grid × Material 3 Expressive design system
├── PRODUCT.md                      # Product vision, surface modes & accessibility invariants
├── DESIGN_NOTE.md                  # 1-page max design rationale
├── README.md                       # Project docs, screenshots, setup & live Vercel URL
└── src/
    ├── app/
    │   ├── globals.css             # Tailwind v4 tokens, @custom-variant dark, view transitions & scroll progress
    │   ├── layout.tsx              # Server Component: fonts, ThemeProvider, MotionProvider, SkipLink, Navbar, Footer
    │   ├── not-found.tsx           # Custom 404 with DomainArtwork
    │   ├── page.tsx                # HOME page
    │   ├── events/
    │   │   ├── page.tsx            # EVENTS directory (search + track & status filters)
    │   │   └── [slug]/
    │   │       └── page.tsx        # EVENT DETAIL dedicated page (generateStaticParams)
    │   └── team/
    │       └── page.tsx            # TEAM directory (vertical filters + portrait wall + profile drawer)
    ├── lib/
    │   ├── accents.ts              # WCAG AA Google 4-color accent tokens & track helpers
    │   └── motion-features.ts      # Async default export of domMax from motion/react
    ├── components/
    │   ├── brand/
    │   │   ├── GdgLogo.tsx         # Official-spec placeholder (< > brackets + chapter wordmark, p-2 clear space)
    │   │   └── DomainArtwork.tsx   # Original inline SVG illustration library (linux, cloud, ai, web, android, devfest)
    │   ├── layout/
    │   │   ├── ThemeProvider.tsx   # 'use client' wrapper for next-themes
    │   │   ├── MotionProvider.tsx  # 'use client' LazyMotion (async domMax, strict) + MotionConfig reducedMotion="user"
    │   │   ├── ThemeToggle.tsx     # Hydrated Light/Dark toggle with circular View Transition reveal
    │   │   ├── RouteScrollReset.tsx# Instant top-of-page scroll reset on client route changes
    │   │   ├── CommandPalette.tsx  # Global ⌘K / Ctrl+K fuzzy search, theme toggle & focus-trapped navigation
    │   │   ├── Navbar.tsx          # Sticky 64px header, spring layoutId nav indicator & 4-color scroll progress bar
    │   │   └── Footer.tsx          # 4-color Google hairline, nav links, credits & independent chapter disclaimer
    │   ├── ui/
    │   │   └── ScrollReveal.tsx    # One-shot IntersectionObserver fade-in wrapper
    │   ├── home/
    │   │   ├── HeroSection.tsx     # Editorial hero + HeroTrackPlayground + live Next-Event Countdown
    │   │   ├── HeroTrackPlayground.tsx # Interactive 4-track M3 shape tiles with DomainArtwork
    │   │   ├── CountdownTimer.tsx  # Hydration-safe tabular-nums countdown (useSyncExternalStore)
    │   │   ├── FeaturedEvents.tsx  # Flagship EventPoster spotlight + upcoming session list
    │   │   ├── LatestRecap.tsx     # Editorial highlight of latest past event (DevFest Campus Warmup)
    │   │   └── CommunityLinks.tsx  # Brand-colored GitHub, Discord, LinkedIn, Instagram, YouTube links
    │   ├── events/
    │   │   ├── EventPoster.tsx     # Saturated color-blocked Campus Event Poster with DomainArtwork & date parallax
    │   │   ├── EventsExplorer.tsx  # Client search + track pills + status segmented toggle + Poster Grid / List View
    │   │   ├── EventCard.tsx       # Poster-first card linking to /events/[slug]
    │   │   ├── EventAgenda.tsx     # Interactive expandable agenda with speaker profile cross-links
    │   │   └── EventUtilities.tsx  # Client-side RFC 5545 .ics export & copy-link confirmation
    │   └── team/
    │       ├── TeamDirectory.tsx   # Vertical filter bar, leadership + vertical portrait wall & profile slide-over drawer
    │       └── BuilderPortrait.tsx # 80px–96px M3 shape-masked SVG portrait (with drop-in imagePath support)
    └── data/
        ├── site.ts                 # Official chapter name, nav items, community links & recap data
        ├── events.ts               # 6 fictional RVCE events (3 upcoming, 3 past)
        └── team.ts                 # 10 fictional team members across verticals
```

## 4. Data Contracts

### `src/data/events.ts`
```ts
export type EventTrack = 'Web' | 'AI / ML' | 'Cloud' | 'Android';
export type EventStatus = 'upcoming' | 'past';

export interface AgendaItem {
  time: string;
  title: string;
  speaker: string;
  notes: string;
  setupTip: string;
}

export interface EventItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  track: EventTrack;
  status: EventStatus;
  dateISO: string;         // Upcoming: Dec 2026 – Feb 2027; Past: Aug – Oct 2026
  endISO: string;
  dateDisplay: string;     // e.g., "12 Dec 2026"
  timeDisplay: string;     // e.g., "05:30 PM – 08:30 PM IST"
  mode: 'In-Person' | 'Online' | 'Hybrid';
  venue: string;           // e.g., "IEM Auditorium, RVCE" or "Google Meet"
  registrationUrl: string;
  prerequisites: string[];
  outcomes: string[];
  agenda: AgendaItem[];
  imagePath?: string;      // Optional local asset under /public/images/events/
}
```

### `src/data/team.ts`
```ts
export type TeamVertical = 'Lead & Core' | 'Dev Vertical' | 'AI / ML' | 'Cloud' | 'Design';

export interface TeamMember {
  id: string;
  name: string;            // 100% fictional
  role: string;
  vertical: TeamVertical;
  accentColor: 'blue' | 'red' | 'yellow' | 'green';
  bio: string;
  techStack: string[];
  campusFocus: string;
  portraitMotif: PortraitMotif;
  imagePath?: string;      // Optional local asset under /public/images/team/
  links: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}
```
