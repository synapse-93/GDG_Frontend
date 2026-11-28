"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";

interface BendingIndicatorProps {
  /** Zero-based index of the active item */
  activeIndex: number;
  /** Total number of items along the vertical rail */
  itemCount: number;
  /** Accent stroke color (defaults to Google Blue) */
  accentColor?: string;
  className?: string;
}

/**
 * Vertical SVG hairline that smoothly bends outward into a curved Q-bezier
 * bracket next to the active item.
 */
export function BendingIndicator({
  activeIndex,
  itemCount,
  accentColor = "#4285F4",
  className = "",
}: BendingIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();
  const safeCount = Math.max(1, itemCount);
  const clampedIdx = Math.min(Math.max(0, activeIndex), safeCount - 1);

  const viewHeight = 200;
  const step = viewHeight / safeCount;
  const centerY = clampedIdx * step + step / 2;
  const halfArc = Math.min(step * 0.42, 24);
  const topY = Math.max(4, centerY - halfArc);
  const bottomY = Math.min(viewHeight - 4, centerY + halfArc);
  const baseX = 4;
  const bendX = 14;

  // Continuous background rail that smoothly bows outward at the active segment
  const railPath = `M ${baseX} 2 L ${baseX} ${topY} Q ${bendX} ${centerY} ${baseX} ${bottomY} L ${baseX} ${
    viewHeight - 2
  }`;

  // Highlighted curved bracket sitting cleanly over the active bend
  const activeBracketPath = `M ${baseX} ${topY} Q ${bendX} ${centerY} ${baseX} ${bottomY}`;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 18 ${viewHeight}`}
      preserveAspectRatio="none"
      className={`pointer-events-none h-full w-[18px] shrink-0 overflow-visible ${className}`.trim()}
    >
      <m.path
        d={railPath}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-hairline"
        animate={{ d: railPath }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { type: "spring", stiffness: 360, damping: 28 }
        }
      />
      <m.path
        d={activeBracketPath}
        fill="none"
        stroke={accentColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        animate={{ d: activeBracketPath }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { type: "spring", stiffness: 360, damping: 28 }
        }
      />
    </svg>
  );
}
