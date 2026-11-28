"use client";

import { useId, useState, type PointerEvent } from "react";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import type { PortraitMask, PortraitMotif } from "@/data/team";
import type { AccentColor } from "@/lib/accents";

interface BuilderPortraitProps {
  name: string;
  accentColor: AccentColor;
  mask: PortraitMask;
  motif: PortraitMotif;
  isCoreLead?: boolean;
  imagePath?: string;
  size?: "card" | "sheet";
}

const MASCOT_PALETTE: Record<
  AccentColor,
  {
    top: string;
    bottom: string;
    rim: string;
    eye: string;
    cheek: string;
  }
> = {
  blue: {
    top: "#4285F4",
    bottom: "#1765CC",
    rim: "#A8C7FA",
    eye: "#FFFFFF",
    cheek: "#A8C7FA",
  },
  green: {
    top: "#34A853",
    bottom: "#137333",
    rim: "#A8DAB5",
    eye: "#FFFFFF",
    cheek: "#A8DAB5",
  },
  red: {
    top: "#EA4335",
    bottom: "#C5221F",
    rim: "#FAD2CF",
    eye: "#FFFFFF",
    cheek: "#FAD2CF",
  },
  yellow: {
    // Strictly #111827 dark ink eyes on Google Yellow for crisp contrast
    top: "#FDD663",
    bottom: "#F9AB00",
    rim: "#FEF7E0",
    eye: "#111827",
    cheek: "#E3A000",
  },
};

/** Subtle eye offset personality per member motif so every mascot feels distinct */
const EYE_PERSONALITY: Record<
  PortraitMotif,
  { dx: number; dy: number; tilt: number; eyeHeight: number }
> = {
  orbit: { dx: -5, dy: -2, tilt: 4, eyeHeight: 16 },
  grid: { dx: 4, dy: -3, tilt: -3, eyeHeight: 15 },
  prism: { dx: 0, dy: -1, tilt: 0, eyeHeight: 16 },
  stack: { dx: 5, dy: 1, tilt: -5, eyeHeight: 14 },
  nodes: { dx: -4, dy: 2, tilt: 5, eyeHeight: 15 },
  wave: { dx: 3, dy: -2, tilt: -2, eyeHeight: 17 },
  terminal: { dx: -6, dy: 0, tilt: 3, eyeHeight: 15 },
  mesh: { dx: 2, dy: 2, tilt: -4, eyeHeight: 14 },
  compass: { dx: -3, dy: -2, tilt: 4, eyeHeight: 16 },
  kinetic: { dx: 4, dy: 0, tilt: -3, eyeHeight: 15 },
};

function MascotBody({
  mask,
  gradId,
  rimColor,
}: {
  mask: PortraitMask;
  gradId: string;
  rimColor: string;
}) {
  if (mask === "hexagon") {
    return (
      <path
        d="M34 14H86C91.5 14 96.5 17 99.2 21.8L113.5 47.2C116.2 52 116.2 58 113.5 62.8L99.2 88.2C96.5 93 91.5 96 86 96H34C28.5 96 23.5 93 20.8 88.2L6.5 62.8C3.8 58 3.8 52 6.5 47.2L20.8 21.8C23.5 17 28.5 14 34 14Z"
        transform="translate(0 5)"
        fill={`url(#${gradId})`}
        stroke={rimColor}
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />
    );
  }
  if (mask === "arch") {
    return (
      <path
        d="M14 98V56C14 30.6 34.6 10 60 10C85.4 10 106 30.6 106 56V98C106 104.6 100.6 110 94 110H26C19.4 110 14 104.6 14 98Z"
        fill={`url(#${gradId})`}
        stroke={rimColor}
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />
    );
  }
  if (mask === "clover") {
    return (
      <path
        d="M60 14C43 8 21 17 17 34C12 50 19 56 19 60C19 64 12 70 17 86C21 103 43 112 60 106C77 112 99 103 103 86C108 70 101 64 101 60C101 56 108 50 103 34C99 17 77 8 60 14Z"
        fill={`url(#${gradId})`}
        stroke={rimColor}
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />
    );
  }
  if (mask === "scallop") {
    return (
      <path
        d="M60 8C67 8 71 15 77 17C83 19 91 16 96 21C101 26 98 34 100 40C102 46 110 50 110 57C110 64 103 68 101 74C99 80 102 88 97 93C92 98 84 95 78 97C72 99 68 107 60 107C52 107 48 99 42 97C36 95 28 98 23 93C18 88 21 80 19 74C17 68 10 64 10 57C10 50 18 46 20 40C22 34 19 26 24 21C29 16 37 19 43 17C49 15 53 8 60 8Z"
        fill={`url(#${gradId})`}
        stroke={rimColor}
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />
    );
  }
  if (mask === "circle") {
    return (
      <circle
        cx="60"
        cy="60"
        r="50"
        fill={`url(#${gradId})`}
        stroke={rimColor}
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />
    );
  }
  // Squircle
  return (
    <rect
      x="12"
      y="12"
      width="96"
      height="96"
      rx="32"
      fill={`url(#${gradId})`}
      stroke={rimColor}
      strokeOpacity="0.35"
      strokeWidth="2.5"
    />
  );
}

/**
 * Expressive Material 3 Geometric Mascot Portrait.
 * Bold Google-colored hexagon, arch, clover, scalloped circle, and squircle shapes
 * with minimal expressive pill eyes that subtly track pointer tilt and blink playfully on hover.
 */
export function BuilderPortrait({
  name,
  accentColor,
  mask,
  motif,
  isCoreLead = false,
  imagePath,
  size = "card",
}: BuilderPortraitProps) {
  const reactId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  const gradId = `gdg-mascot-grad-${reactId.replace(/:/g, "")}`;
  const colors = MASCOT_PALETTE[accentColor];
  const personality = EYE_PERSONALITY[motif];
  const boxSize = size === "sheet" ? "h-20 w-20" : "h-[72px] w-[72px]";

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setGaze({ x: nx * 5, y: ny * 4 });
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setGaze({ x: 0, y: 0 });
  };

  if (imagePath) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imagePath}
        alt={name}
        className={`${boxSize} shrink-0 rounded-2xl border border-hairline object-cover`}
      />
    );
  }

  return (
    <m.div
      aria-hidden="true"
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={
        prefersReducedMotion ? undefined : { scale: 1.07, rotate: -4 }
      }
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className={`${boxSize} relative shrink-0 select-none`}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-[0_6px_14px_rgba(12,15,20,0.14)]"
      >
        <defs>
          <linearGradient id={gradId} x1="16" y1="10" x2="104" y2="112" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={colors.top} />
            <stop offset="100%" stopColor={colors.bottom} />
          </linearGradient>
        </defs>

        <MascotBody mask={mask} gradId={gradId} rimColor={colors.rim} />

        {/* Subtle glossy upper highlight arc */}
        <ellipse
          cx="48"
          cy="30"
          rx="20"
          ry="7"
          fill="#FFFFFF"
          fillOpacity="0.18"
        />

        {/* Expressive Minimal Pill Eyes (subtle gaze tracking + playful hover blink) */}
        <m.g
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: personality.dx + gaze.x,
                  y: personality.dy + gaze.y,
                  rotate: hovered ? personality.tilt : 0,
                }
          }
          transition={{ type: "spring", stiffness: 360, damping: 24 }}
          style={{ transformOrigin: "60px 58px" }}
        >
          <m.rect
            x="43"
            y={58 - personality.eyeHeight / 2}
            width="8.5"
            height={personality.eyeHeight}
            rx="4.25"
            fill={colors.eye}
            animate={
              hovered && !prefersReducedMotion
                ? { scaleY: [1, 0.14, 1] }
                : { scaleY: 1 }
            }
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ transformOrigin: "47.25px 58px" }}
          />
          <m.rect
            x="64.5"
            y={58 - personality.eyeHeight / 2}
            width="8.5"
            height={personality.eyeHeight}
            rx="4.25"
            fill={colors.eye}
            animate={
              hovered && !prefersReducedMotion
                ? { scaleY: [1, 0.14, 1] }
                : { scaleY: 1 }
            }
            transition={{ duration: 0.28, delay: 0.04, ease: "easeInOut" }}
            style={{ transformOrigin: "68.75px 58px" }}
          />
        </m.g>

        {/* Core-Lead 4-Color Google Signature Dots */}
        {isCoreLead && (
          <g>
            <circle cx="45" cy="90" r="3" fill="#A8C7FA" />
            <circle cx="55" cy="90" r="3" fill="#F28B82" />
            <circle cx="65" cy="90" r="3" fill="#FBBC04" />
            <circle cx="75" cy="90" r="3" fill="#81C995" />
          </g>
        )}
      </svg>
    </m.div>
  );
}
