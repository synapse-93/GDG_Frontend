"use client";

import { useRef, type ReactNode } from "react";
import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";

interface ScrollStageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scroll-linked viewport stage applying natural GPU-composited entrance/exit
 * motion across the viewport while keeping the middle 56% reading zone at
 * crisp 1.0 opacity. Completely static under prefers-reduced-motion: reduce.
 */
export function ScrollStage({ children, className = "" }: ScrollStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.15, 1, 1, 0.2]
  );
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [28, 0, 0, -20]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.97, 1, 1, 0.985]
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      <m.div
        style={{ opacity, y, scale }}
        className="will-change-transform"
      >
        {children}
      </m.div>
    </div>
  );
}
