"use client";

import { useEffect, useId } from "react";
import * as m from "motion/react-m";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

interface BendingIndicatorProps {
  /** Zero-based index of the currently active item */
  activeIndex: number;
  /** Optional zero-based index of the currently hovered item; springs back to activeIndex when null */
  hoveredIndex?: number | null;
  /** Total number of items along the vertical rail */
  itemCount: number;
  /** Accent stroke color blooming along the curved crest (defaults to Google Blue) */
  accentColor?: string;
  className?: string;
}

const VIEW_HEIGHT = 200;
const BASE_X = 4;
const BEND_X = 14.5;

function buildContinuousWavePath(centerY: number, halfSpan: number): string {
  const topY = Math.max(4, centerY - halfSpan);
  const bottomY = Math.min(VIEW_HEIGHT - 4, centerY + halfSpan);
  const segTop = centerY - topY;
  const segBot = bottomY - centerY;
  const cTop = segTop * 0.55;
  const cBot = segBot * 0.55;

  // Single continuous organic cubic-Bezier curve with smooth vertical tangents
  // at topY, centerY, and bottomY (zero kinks or disconnected overlays).
  return [
    `M ${BASE_X} 2`,
    `L ${BASE_X} ${topY.toFixed(2)}`,
    `C ${BASE_X} ${(topY + cTop).toFixed(2)} ${BEND_X} ${(centerY - cTop).toFixed(2)} ${BEND_X} ${centerY.toFixed(2)}`,
    `C ${BEND_X} ${(centerY + cBot).toFixed(2)} ${BASE_X} ${(bottomY - cBot).toFixed(2)} ${BASE_X} ${bottomY.toFixed(2)}`,
    `L ${BASE_X} ${VIEW_HEIGHT - 2}`,
  ].join(" ");
}

/**
 * Single fluid continuous cubic-Bezier SVG rail whose wave center glides at 60fps
 * via useMotionValue + useSpring + useTransform (zero React re-renders per frame)
 * with a synced vertical linearGradient blooming the active Google accent color
 * along the crest.
 */
export function BendingIndicator({
  activeIndex,
  hoveredIndex = null,
  itemCount,
  accentColor = "#4285F4",
  className = "",
}: BendingIndicatorProps) {
  const reactId = useId();
  const prefersReducedMotion = useReducedMotion();
  const gradId = `gdg-bend-grad-${reactId.replace(/:/g, "")}`;

  const safeCount = Math.max(1, itemCount);
  const targetIndex = hoveredIndex ?? activeIndex;
  const clampedIdx = Math.min(Math.max(0, targetIndex), safeCount - 1);

  const step = VIEW_HEIGHT / safeCount;
  const halfSpan = Math.min(step * 0.56, 30);
  const targetY = clampedIdx * step + step / 2;

  const rawY = useMotionValue(targetY);
  const springY = useSpring(rawY, {
    stiffness: 320,
    damping: 28,
    mass: 0.6,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      rawY.jump(targetY);
      springY.jump(targetY);
    } else {
      rawY.set(targetY);
    }
  }, [targetY, prefersReducedMotion, rawY, springY]);

  const wavePath = useTransform(springY, (y) =>
    buildContinuousWavePath(y, halfSpan)
  );
  const gradY1 = useTransform(springY, (y) => y - halfSpan * 1.15);
  const gradY2 = useTransform(springY, (y) => y + halfSpan * 1.15);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 18 ${VIEW_HEIGHT}`}
      preserveAspectRatio="none"
      className={`pointer-events-none h-full w-[18px] shrink-0 overflow-visible ${className}`.trim()}
    >
      <defs>
        <m.linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          x2="0"
          y1={gradY1}
          y2={gradY2}
        >
          <stop offset="0%" stopColor="var(--hairline)" />
          <stop offset="22%" stopColor={accentColor} stopOpacity="0.85" />
          <stop offset="50%" stopColor={accentColor} stopOpacity="1" />
          <stop offset="78%" stopColor={accentColor} stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--hairline)" />
        </m.linearGradient>
      </defs>

      <m.path
        d={wavePath}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
