# ARCHITECTURE.md — Design Tokens, File Map & Contracts

## 1. Aesthetic System: Developer Studio & Blueprint
- Warm unbleached studio paper in Light mode (`#FAF9F6`) paired with deep carbon-slate in Dark mode (`#0C0F14`).
- Subtle architectural dot/line grid background utility (`.bg-blueprint-grid`) at low opacity.
- Monospace blueprint index tags (`01 //`, `02 //`, `03 //`) paired with crisp `Plus Jakarta Sans` editorial headlines.

## 2. Color & Theme Tokens (`src/app/globals.css`)

| Semantic Token | Light Value | Dark Value | Tailwind Utility (`@theme inline`) | Role |
| :--- | :--- | :--- | :--- | :--- |
| `--canvas` | `#FAF9F6` | `#0C0F14` | `bg-canvas` | Primary page background |
| `--surface` | `#FFFFFF` | `#141922` | `bg-surface` | Elevated cards & panels |
| `--surface-muted` | `#F2EFE9` | `#1C2330` | `bg-surface-muted` | Filter pills, code tags, placeholders |
| `--hairline` | `#E5E2DC` | `#252D3D` | `border-hairline` | 1 px structural borders |
| `--ink` | `#111827` | `#F8FAFC` | `text-ink` | Primary headings & body copy |
| `--ink-muted` | `#4B5563` | `#94A3B8` | `text-ink-muted` | Metadata, bios, subtitles |
| `--gdg-blue` | `#4285F4` | `#669DF6` | `bg-gdg-blue` / `text-gdg-blue` | Primary CTAs, Web track |
| `--gdg-red` | `#EA4335` | `#F28B82` | `bg-gdg-red` / `text-gdg-red` | Workshops, Live accent |
| `--gdg-yellow` | `#FBBC04` | `#FDD663` | `bg-gdg-yellow` / `text-gdg-yellow` | Hackathons, Design track (`#111827` text only) |
| `--gdg-green` | `#34A853` | `#81C995` | `bg-gdg-green` / `text-gdg-green` | AI/ML & Android track, status dots |

## 3. Repository Structure

```text
gdg-rvce-interface/
├── AGENTS.md
├── ARCHITECTURE.md
├── CONTEXT.md
├── DESIGN_NOTE.md                  # 1-page max design rationale (Phase 4)
├── README.md                       # Project docs, screenshots, setup, live URL (Phase 4)
└── src/
    ├── app/
    │   ├── globals.css             # Tailwind v4 tokens, dark variant, blueprint grid, 3D keyframes
    │   ├── layout.tsx              # Server Component: fonts, ThemeProvider, SkipLink, Navbar, Footer
    │   ├── page.tsx                # HOME page
    │   ├── events/
    │   │   ├── page.tsx            # EVENTS directory (search + track & status filters)
    │   │   └── [slug]/
    │   │       └── page.tsx        # EVENT DETAIL dedicated page (generateStaticParams)
    │   └── team/
    │       └── page.tsx            # TEAM directory (vertical filters + member cards)
    ├── components/
    │   ├── brand/
    │   │   ├── GdgLogo.tsx         # Official-spec placeholder (< > brackets + chapter wordmark)
    │   │   └── GeometricScene3D.tsx# Pure CSS 3D rotating cube/rings/polyhedra (60fps, zero WebGL)
    │   ├── layout/
    │   │   ├── ThemeProvider.tsx   # 'use client' wrapper for next-themes
    │   │   ├── ThemeToggle.tsx     # Hydrated Light/Dark button
    │   │   ├── Navbar.tsx          # Sticky 64px header, active link state, mobile menu drawer
    │   │   └── Footer.tsx          # 4-color Google hairline, nav links, credits, non-Google disclaimer
    │   ├── home/
    │   │   ├── HeroSection.tsx     # Editorial hero + 3D centerpiece + live Next-Event Countdown
    │   │   ├── PillarsGrid.tsx     # 4 color-coded community focus tiles
    │   │   ├── FeaturedEvents.tsx  # 3 featured/upcoming event cards linking to /events/[slug]
    │   │   ├── LatestRecap.tsx     # Editorial highlight of latest past event (no attendee counts)
    │   │   └── CommunityLinks.tsx  # Discord, GitHub, LinkedIn, Instagram, YouTube strip
    │   ├── events/
    │   │   ├── EventsExplorer.tsx  # Client search input + track pills + Upcoming/Past segmented toggle
    │   │   └── EventCard.tsx       # Track-accented card linking to /events/[slug]
    │   └── team/
    │       ├── TeamDirectory.tsx   # Client vertical filter bar + responsive member grid
    │       └── MemberCard.tsx      # Tactile card with CSS 3D avatar (or optional local image), bio & links
    └── data/
        ├── site.ts                 # Official chapter name, nav items, community links, recap data
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
}

export interface EventItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  track: EventTrack;
  status: EventStatus;
  dateISO: string;         // Upcoming: Dec 2026 – Feb 2027; Past: Aug – Oct 2026
  dateDisplay: string;     // e.g., "12 Dec 2026"
  timeDisplay: string;     // e.g., "10:00 AM – 01:30 PM IST"
  mode: 'In-Person' | 'Online' | 'Hybrid';
  venue: string;           // e.g., "IEM Auditorium, RVCE" or "Google Meet"
  registrationUrl: string;
  prerequisites: string[];
  outcomes: string[];
  agenda: AgendaItem[];
  geometryVariant: 'cube' | 'rings' | 'diamond' | 'hex';
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
  avatarShape: 'cube' | 'rings' | 'diamond' | 'hex';
  imagePath?: string;      // Optional local asset under /public/images/team/
  links: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}
```