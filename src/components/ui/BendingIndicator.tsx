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
  /** Exact measured pixel height of the list wrapper */
  height: number;
  /** Exact target pixel Y coordinate for the wave crest */
  targetY: number;
  /** Accent stroke color blooming along the curved crest (defaults to Google Blue) */
  accentColor?: string;
  /** Wave half-span in pixels (default 26) */
  halfSpan?: number;
  className?: string;
}

const BASE_X = 4;
const BEND_X = 14.5;

function buildContinuousWavePath(
  centerY: number,
  height: number,
  halfSpan: number
): string {
  const clampedY = Math.min(Math.max(4, centerY), Math.max(4, height - 4));
  const topY = Math.max(2, clampedY - halfSpan);
  const bottomY = Math.min(height - 2, clampedY + halfSpan);
  const segTop = clampedY - topY;
  const segBot = bottomY - clampedY;
  const cTop = segTop * 0.55;
  const cBot = segBot * 0.55;

  return [
    `M ${BASE_X} 2`,
    `L ${BASE_X} ${topY.toFixed(2)}`,
    `C ${BASE_X} ${(topY + cTop).toFixed(2)} ${BEND_X} ${(clampedY - cTop).toFixed(2)} ${BEND_X} ${clampedY.toFixed(2)}`,
    `C ${BEND_X} ${(clampedY + cBot).toFixed(2)} ${BASE_X} ${(bottomY - cBot).toFixed(2)} ${BASE_X} ${bottomY.toFixed(2)}`,
    `L ${BASE_X} ${(height - 2).toFixed(2)}`,
  ].join(" ");
}

/**
 * Single fluid continuous cubic-Bezier SVG rail sized 1:1 in CSS pixels to its
 * list wrapper. Drives the wave crest at 60fps via useMotionValue + useSpring +
 * useTransform with a synced vertical accent gradient.
 */
export function BendingIndicator({
  height,
  targetY,
  accentColor = "#4285F4",
  halfSpan = 26,
  className = "",
}: BendingIndicatorProps) {
  const reactId = useId();
  const prefersReducedMotion = useReducedMotion();
  const gradId = `gdg-bend-grad-${reactId.replace(/:/g, "")}`;

  const safeHeight = Math.max(40, Math.round(height));
  const effectiveHalfSpan = Math.min(halfSpan, safeHeight * 0.4);
  const clampedTarget = Math.min(
    Math.max(4, targetY),
    Math.max(4, safeHeight - 4)
  );

  const rawY = useMotionValue(clampedTarget);
  const springY = useSpring(rawY, {
    stiffness: 320,
    damping: 28,
    mass: 0.6,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      rawY.jump(clampedTarget);
      springY.jump(clampedTarget);
    } else {
      rawY.set(clampedTarget);
    }
  }, [clampedTarget, prefersReducedMotion, rawY, springY]);

  const wavePath = useTransform(springY, (y) =>
    buildContinuousWavePath(y, safeHeight, effectiveHalfSpan)
  );
  const gradY1 = useTransform(springY, (y) => y - effectiveHalfSpan * 1.15);
  const gradY2 = useTransform(springY, (y) => y + effectiveHalfSpan * 1.15);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 18 ${safeHeight}`}
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-y-0 left-0 h-full w-[18px] overflow-visible ${className}`.trim()}
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
