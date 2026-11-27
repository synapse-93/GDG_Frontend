import { DomainArtwork, type DomainKey } from "@/components/brand/DomainArtwork";
import type { EventItem, EventTrack } from "@/data/events";

interface EventPosterProps {
  event: EventItem;
  size?: "card" | "hero" | "recap";
  className?: string;
}

interface PosterTheme {
  bg: string;
  shapePrimary: string;
  shapeSecondary: string;
  shapeAccent: string;
  ink: string;
  mutedInk: string;
  pillBg: string;
  pillInk: string;
  dateWatermark: string;
}

/**
 * Saturated Google Brand Color-Blocked Poster Themes.
 * Every foreground/background pair meets WCAG AA+ (Yellow strictly uses #111827 dark ink).
 */
const POSTER_THEMES: Record<EventTrack, PosterTheme> = {
  Web: {
    bg: "#1765CC",
    shapePrimary: "#4285F4",
    shapeSecondary: "#0F4C9E",
    shapeAccent: "#A8C7FA",
    ink: "#FFFFFF",
    mutedInk: "#DCEAFF",
    pillBg: "#FFFFFF",
    pillInk: "#111827",
    dateWatermark: "rgba(255, 255, 255, 0.16)",
  },
  "AI / ML": {
    bg: "#137333",
    shapePrimary: "#34A853",
    shapeSecondary: "#0D5225",
    shapeAccent: "#A8DAB5",
    ink: "#FFFFFF",
    mutedInk: "#DCF5E3",
    pillBg: "#FFFFFF",
    pillInk: "#111827",
    dateWatermark: "rgba(255, 255, 255, 0.16)",
  },
  Cloud: {
    bg: "#C5221F",
    shapePrimary: "#EA4335",
    shapeSecondary: "#961816",
    shapeAccent: "#FAD2CF",
    ink: "#FFFFFF",
    mutedInk: "#FDE5E3",
    pillBg: "#FFFFFF",
    pillInk: "#111827",
    dateWatermark: "rgba(255, 255, 255, 0.16)",
  },
  Android: {
    bg: "#FBBC04",
    shapePrimary: "#FDD663",
    shapeSecondary: "#E3A000",
    shapeAccent: "#111827",
    ink: "#111827",
    mutedInk: "#1F2937",
    pillBg: "#111827",
    pillInk: "#FAF9F6",
    dateWatermark: "rgba(17, 24, 39, 0.11)",
  },
};

function resolveEventDomain(event: EventItem): DomainKey {
  switch (event.slug) {
    case "linux-and-systems-night":
      return "linux";
    case "cloud-study-jam-kubernetes-on-gcp":
      return "cloud";
    case "autonomous-ai-agents-workshop":
      return "ai";
    case "web-performance-and-edge-architecture":
      return "web";
    case "flutter-and-compose-ui-lab":
      return "android";
    case "devfest-campus-warmup":
      return "devfest";
    default:
      switch (event.track) {
        case "Cloud":
          return "cloud";
        case "AI / ML":
          return "ai";
        case "Android":
          return "android";
        default:
          return "web";
      }
  }
}

function parseDateTokens(dateDisplay: string): {
  day: string;
  month: string;
  year: string;
} {
  const parts = dateDisplay.trim().split(/\s+/);
  return {
    day: parts[0] ?? "01",
    month: (parts[1] ?? "DEC").toUpperCase(),
    year: parts[2] ?? "2026",
  };
}

export function EventPoster({
  event,
  size = "card",
  className = "",
}: EventPosterProps) {
  const theme = POSTER_THEMES[event.track];
  const domain = resolveEventDomain(event);
  const { day, month, year } = parseDateTokens(event.dateDisplay);
  const isUpcoming = event.status === "upcoming";

  const heightClass =
    size === "hero"
      ? "min-h-[230px] sm:min-h-[268px]"
      : size === "recap"
      ? "min-h-[240px] sm:min-h-[280px]"
      : "min-h-[200px]";

  const artworkSize = size === "hero" ? "lg" : size === "recap" ? "lg" : "md";

  return (
    <div
      className={`domain-artwork-interactive relative flex w-full flex-col justify-between overflow-hidden select-none ${heightClass} ${className}`.trim()}
      style={{ backgroundColor: theme.bg, color: theme.ink }}
    >
      {/* Expressive Material 3 Geometric Cutout Layer */}
      <svg
        aria-hidden="true"
        viewBox="0 0 480 260"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {event.track === "Web" && (
          <>
            {/* Oversized M3 Arch */}
            <path
              d="M270 260V125C270 67.01 317.01 20 375 20C432.99 20 480 67.01 480 125V260H270Z"
              fill={theme.shapePrimary}
            />
            <rect
              x="318"
              y="76"
              width="114"
              height="184"
              rx="57"
              fill={theme.shapeSecondary}
            />
            <rect
              x="212"
              y="186"
              width="120"
              height="44"
              rx="22"
              fill={theme.shapeAccent}
              fillOpacity="0.32"
            />
          </>
        )}

        {event.track === "AI / ML" && (
          <>
            {/* M3 Four-Leaf Clover */}
            <g transform="translate(362 132)">
              <circle cx="-46" cy="-42" r="56" fill={theme.shapePrimary} />
              <circle cx="46" cy="-42" r="56" fill={theme.shapePrimary} />
              <circle cx="-46" cy="42" r="56" fill={theme.shapePrimary} />
              <circle cx="46" cy="42" r="56" fill={theme.shapePrimary} />
              <circle cx="0" cy="0" r="34" fill={theme.shapeSecondary} />
              <circle
                cx="0"
                cy="0"
                r="14"
                fill={theme.shapeAccent}
                fillOpacity="0.65"
              />
            </g>
            <rect
              x="220"
              y="168"
              width="66"
              height="66"
              rx="18"
              transform="rotate(45 253 201)"
              fill={theme.shapeSecondary}
              fillOpacity="0.65"
            />
          </>
        )}

        {event.track === "Cloud" && (
          <>
            {/* Stacked M3 Stadium Pills */}
            <rect
              x="246"
              y="-18"
              width="250"
              height="108"
              rx="54"
              fill={theme.shapePrimary}
            />
            <rect
              x="294"
              y="108"
              width="210"
              height="96"
              rx="48"
              fill={theme.shapeSecondary}
            />
            <circle
              cx="260"
              cy="196"
              r="42"
              fill={theme.shapeAccent}
              fillOpacity="0.28"
            />
            <circle cx="420" cy="44" r="18" fill={theme.shapeSecondary} />
          </>
        )}

        {event.track === "Android" && (
          <>
            {/* M3 Scalloped Starburst */}
            <g transform="translate(368 134)">
              <rect
                x="-82"
                y="-82"
                width="164"
                height="164"
                rx="46"
                fill={theme.shapePrimary}
              />
              <rect
                x="-82"
                y="-82"
                width="164"
                height="164"
                rx="46"
                transform="rotate(30)"
                fill={theme.shapePrimary}
              />
              <rect
                x="-82"
                y="-82"
                width="164"
                height="164"
                rx="46"
                transform="rotate(60)"
                fill={theme.shapeSecondary}
                fillOpacity="0.45"
              />
              <circle
                cx="0"
                cy="0"
                r="38"
                fill={theme.shapeAccent}
                fillOpacity="0.14"
              />
            </g>
            <rect
              x="212"
              y="188"
              width="98"
              height="36"
              rx="18"
              fill={theme.shapeSecondary}
              fillOpacity="0.45"
            />
          </>
        )}

        {/* Oversized Expressive Poster Date Numeral Watermark */}
        <text
          x="456"
          y="236"
          textAnchor="end"
          fill={theme.dateWatermark}
          fontFamily="var(--font-plus-jakarta-sans), sans-serif"
          fontSize="148"
          fontWeight="800"
          letterSpacing="-0.05em"
        >
          {day}
        </text>
      </svg>

      {/* Top Row: Track Badge + Status Pill + Mode */}
      <div className="relative z-10 flex items-center justify-between gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-bold tracking-tight"
            style={{ backgroundColor: theme.pillBg, color: theme.pillInk }}
          >
            {event.track}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs font-semibold"
            style={{
              borderColor:
                event.track === "Android"
                  ? "rgba(17, 24, 39, 0.35)"
                  : "rgba(255, 255, 255, 0.4)",
              color: theme.ink,
            }}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: theme.ink }}
            />
            {isUpcoming ? "Upcoming" : "Archive"}
          </span>
        </div>

        <span
          className="font-mono text-xs font-semibold"
          style={{ color: theme.mutedInk }}
        >
          {event.mode}
        </span>
      </div>

      {/* Bottom Row: Oversized Poster Date Lockup + Original DomainArtwork Illustration */}
      <div className="relative z-10 flex items-end justify-between gap-4 px-5 pb-5 pt-2">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-4xl font-extrabold tracking-[-0.04em] leading-none sm:text-5xl">
              {day}
            </span>
            <span className="font-mono text-lg font-bold tracking-tight sm:text-xl">
              {month}
            </span>
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: theme.mutedInk }}
            >
              {year}
            </span>
          </div>
          {size !== "card" && (
            <p
              className="mt-2 max-w-[34ch] text-sm font-semibold leading-snug"
              style={{ color: theme.mutedInk }}
            >
              {event.venue} &middot; {event.timeDisplay}
            </p>
          )}
          {size === "hero" && (
            <span
              className="mt-3 hidden rounded-full px-3 py-1 font-mono text-xs font-bold sm:inline-flex"
              style={{ backgroundColor: theme.pillBg, color: theme.pillInk }}
            >
              GDG on Campus RVCE
            </span>
          )}
        </div>

        {/* Custom Inline SVG Domain Artwork */}
        <div className="shrink-0">
          <DomainArtwork
            domain={domain}
            size={artworkSize}
            tone={event.track === "Android" ? "on-yellow" : "auto"}
          />
        </div>
      </div>
    </div>
  );
}
