"use client";

import { useRef, type ReactNode } from "react";
import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";

interface ScrollStageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scroll-linked viewport stage applying a subtle, GPU-composited scale + opacity
 * arc across the viewport. Completely static under prefers-reduced-motion: reduce.
 */
export function ScrollStage({ children, className = "" }: ScrollStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.96, 1, 1, 0.98]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.82, 1],
    [0.35, 1, 1, 0.85]
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      <m.div
        style={{ scale, opacity }}
        className="will-change-transform"
      >
        {children}
      </m.div>
    </div>
  );
}
