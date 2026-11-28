# Design Note — GDG on Campus RV College of Engineering

## 1. Visual Direction: Swiss Editorial Grid × Material 3 Expressive
**GDG on Campus RVCE** pairs a disciplined **Swiss Editorial Grid** (warm studio paper `#FAF9F6`, deep carbon-slate `#0C0F14`, `1px` architectural hairlines, and oversized `Plus Jakarta Sans` typography) with vibrant **Material 3 Expressive** color blocking. Saturated Google silhouettes—arches, four-leaf clovers, stadium pills, and scalloped badges—anchor an unmistakable campus engineering identity without card bloat or sterile template patterns.

Every label and interaction obeys the **Zero Fake UI** rule: no hardcoded Lighthouse scores, no fake `curl` responses, and no corporate jargon. All `JetBrains Mono` typography (`tabular-nums`) is reserved for authentic campus schedules, countdowns, keyboard shortcuts, and real lab prerequisites.

## 2. Async Motion Engine & Tactile Chrome
Motion is standardized on `motion/react` wrapped in `<LazyMotion features={() => import("@/lib/motion-features").then((res) => res.default)} strict>` (`domMax`) and `<MotionConfig reducedMotion="user">`, importing `* as m from "motion/react-m"` to keep the initial client bundle lean:
- **Circular View-Transition Theme Reveal:** Clicking `ThemeToggle` triggers `document.startViewTransition()` with a `450ms` circular `clip-path` expansion centered on the button, paired with `useSyncExternalStore` + `MutationObserver` icon sync so Sun/Moon states never lag or mismatch during SSR hydration.
- **Spring Chrome & Scroll Progress:** `Navbar` features a spring `<m.span layoutId="nav-indicator" />`, hydration-safe `⌘K` / `Ctrl K` fuzzy command navigation, and a compositor-only 2px four-color CSS Scroll-Driven progress hairline (`@supports (animation-timeline: view())`).

## 3. Route Craft & Zero-Backend Student Utilities
- **Home (`/`):** Combines an oversized editorial hero, a mechanical split-flap `CountdownTimer` (`<AnimatePresence mode="popLayout">`, `CLS = 0`), a 4-color M3 Track Stage featuring pointer-reactive inline SVG `DomainArtwork` illustrations (`linux`, `cloud`, `ai`, `web`, `android`, `devfest`), a working interactive chapter mini-terminal (`next`, `events`, `tracks`, `team`, `theme`, `help`), an asymmetric upcoming showcase, and an interactive *DevFest Campus Warmup* Contact Sheet with `layoutId`-morphed lightbox previews.
- **Events (`/events`, `/events/[slug]`):** Shared-element FLIP morphing (`<LayoutGroup>` + `layout="position"`) rearranges **Posters ↔ Schedule** live alongside URL-synced filters and keyboard shortcuts (`/`, `G`, `L`, `0`–`4`). Detail pages pair full-bleed posters, prominent desktop and mobile-sticky Register CTAs, client-side RFC 5545 `.ics` calendar export, spring-animated expandable agendas, and speaker deep links to `/team?member=<slug>`.
- **Team (`/team`):** Modularized into `TeamFilters` (`layoutId` pills), `TeamCard`, `BuilderPortrait` (10 original self-contained SVG developer personas inside `72px` morphing M3 masks), and a responsive `MemberSheet`—a right-hand desktop drawer and draggable swipe-to-dismiss mobile bottom sheet.

## 4. Accessibility & Brand Compliance
Dual Light/Dark themes meet WCAG AA contrast via `--gdg-blue-ink` (`#1765CC` Light / `#669DF6` Dark), scrim-backed poster badges, and strict `#111827` dark ink on Google Yellow. Unstretched `<GdgLogo />` clear space, `#4285F4` focus rings, reduced-motion fallbacks, open-source credits, the independent chapter footer disclaimer, and zero analytics, RSVP counts, or real student PII remain enforced across all four permitted routes.
