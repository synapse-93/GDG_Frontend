import type { PortraitMotif } from "@/data/team";
import type { AccentColor } from "@/lib/accents";

interface BuilderPortraitProps {
  name: string;
  accentColor: AccentColor;
  motif: PortraitMotif;
  isCoreLead?: boolean;
  imagePath?: string;
  size?: "md" | "lg";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const PALETTE: Record<
  AccentColor,
  { fill: string; shade: string; highlight: string; ink: string }
> = {
  blue: {
    fill: "#1765CC",
    shade: "#0F4C9E",
    highlight: "#A8C7FA",
    ink: "#FFFFFF",
  },
  green: {
    fill: "#137333",
    shade: "#0D5225",
    highlight: "#A8DAB5",
    ink: "#FFFFFF",
  },
  red: {
    fill: "#C5221F",
    shade: "#961816",
    highlight: "#FAD2CF",
    ink: "#FFFFFF",
  },
  yellow: {
    // Strictly dark #111827 ink on Google Yellow
    fill: "#FBBC04",
    shade: "#E3A000",
    highlight: "#FEF7E0",
    ink: "#111827",
  },
};

type ExpressiveFrame = "scallop" | "clover" | "diamond" | "arch";

const MOTIF_TO_FRAME: Record<PortraitMotif, ExpressiveFrame> = {
  orbit: "scallop",
  grid: "arch",
  prism: "diamond",
  stack: "arch",
  nodes: "clover",
  wave: "scallop",
  terminal: "arch",
  mesh: "clover",
  compass: "scallop",
  kinetic: "diamond",
};

const SIZE_CLASSES = {
  md: "h-20 w-20", // 80px
  lg: "h-24 w-24", // 96px
};

/**
 * Large (80px–96px) Material 3 Expressive SVG Shape-Framed Developer Portrait.
 * Alternates scalloped circles, four-leaf clovers, rounded diamonds, and arches
 * in saturated Google palettes with geometric developer motifs and bold initials.
 */
export function BuilderPortrait({
  name,
  accentColor,
  motif,
  isCoreLead = false,
  imagePath,
  size = "md",
}: BuilderPortraitProps) {
  const initials = getInitials(name);
  const colors = PALETTE[accentColor];
  const frame = MOTIF_TO_FRAME[motif];

  if (imagePath) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imagePath}
        alt={name}
        className={`${SIZE_CLASSES[size]} shrink-0 rounded-3xl border border-hairline object-cover`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${SIZE_CLASSES[size]} relative shrink-0 select-none`}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Expressive M3 Outer Silhouette */}
        {frame === "scallop" && (
          <g>
            <rect
              x="16"
              y="16"
              width="88"
              height="88"
              rx="28"
              fill={colors.fill}
            />
            <rect
              x="16"
              y="16"
              width="88"
              height="88"
              rx="28"
              transform="rotate(30 60 60)"
              fill={colors.fill}
            />
            <rect
              x="16"
              y="16"
              width="88"
              height="88"
              rx="28"
              transform="rotate(60 60 60)"
              fill={colors.fill}
            />
            <circle
              cx="60"
              cy="60"
              r="40"
              stroke={colors.highlight}
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </g>
        )}

        {frame === "clover" && (
          <g>
            <circle cx="42" cy="42" r="30" fill={colors.fill} />
            <circle cx="78" cy="42" r="30" fill={colors.fill} />
            <circle cx="42" cy="78" r="30" fill={colors.fill} />
            <circle cx="78" cy="78" r="30" fill={colors.fill} />
            <circle cx="60" cy="60" r="32" fill={colors.shade} fillOpacity="0.55" />
            <circle cx="38" cy="38" r="4" fill={colors.highlight} />
            <circle cx="82" cy="82" r="4" fill={colors.highlight} />
          </g>
        )}

        {frame === "diamond" && (
          <g>
            <rect
              x="22"
              y="22"
              width="76"
              height="76"
              rx="22"
              transform="rotate(45 60 60)"
              fill={colors.fill}
            />
            <rect
              x="32"
              y="32"
              width="56"
              height="56"
              rx="14"
              transform="rotate(45 60 60)"
              stroke={colors.highlight}
              strokeOpacity="0.5"
              strokeWidth="1.75"
            />
          </g>
        )}

        {frame === "arch" && (
          <g>
            <path
              d="M14 106V54C14 28.595 34.595 8 60 8C85.405 8 106 28.595 106 54V106C106 109.314 103.314 112 100 112H20C16.686 112 14 109.314 14 106Z"
              fill={colors.fill}
            />
            <path
              d="M26 102V56C26 37.222 41.222 22 60 22C78.778 22 94 37.222 94 56V102"
              stroke={colors.highlight}
              strokeOpacity="0.45"
              strokeWidth="1.75"
            />
          </g>
        )}

        {/* Subtle Vertical Domain Glyph */}
        {(motif === "terminal" || motif === "grid") && (
          <g opacity="0.45">
            <path
              d="M46 27L52 31L46 35"
              stroke={colors.highlight}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M56 35H66"
              stroke={colors.highlight}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        )}

        {(motif === "orbit" || motif === "wave") && (
          <ellipse
            cx="60"
            cy="60"
            rx="46"
            ry="18"
            transform="rotate(-24 60 60)"
            stroke={colors.highlight}
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
        )}

        {(motif === "prism" || motif === "stack") && (
          <g opacity="0.45">
            <path
              d="M49 27L42 32L49 37M71 27L78 32L71 37"
              stroke={colors.highlight}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {(motif === "nodes" || motif === "mesh") && (
          <g opacity="0.5">
            <path
              d="M60 22L62.5 28.5L69 31L62.5 33.5L60 40L57.5 33.5L51 31L57.5 28.5L60 22Z"
              fill={colors.highlight}
            />
          </g>
        )}

        {(motif === "compass" || motif === "kinetic") && (
          <g opacity="0.45">
            <rect
              x="44"
              y="26"
              width="32"
              height="10"
              rx="5"
              stroke={colors.ink}
              strokeWidth="2"
            />
            <circle cx="67" cy="31" r="2.8" fill={colors.ink} />
          </g>
        )}

        {/* Bold High-Contrast Editorial Monogram */}
        <text
          x="60"
          y="69"
          textAnchor="middle"
          fill={colors.ink}
          fontFamily="var(--font-plus-jakarta-sans), sans-serif"
          fontSize="30"
          fontWeight="800"
          letterSpacing="-0.03em"
        >
          {initials}
        </text>

        {/* Core-Lead 4-Color Google Signature Dots */}
        {isCoreLead && (
          <g>
            <circle cx="45" cy="92" r="3.5" fill="#A8C7FA" />
            <circle cx="55" cy="92" r="3.5" fill="#F28B82" />
            <circle cx="65" cy="92" r="3.5" fill="#FBBC04" />
            <circle cx="75" cy="92" r="3.5" fill="#81C995" />
          </g>
        )}
      </svg>
    </div>
  );
}
