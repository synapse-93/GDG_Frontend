"use client";

import { useRef, type ReactNode } from "react";
import * as m from "motion/react-m";
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

interface ScrollStageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Smooth spring-damped scroll uplift stage for below-the-fold sections.
 * Keeps full opacity (1.0) at all scroll positions so peeking sections never
 * dim or trigger WCAG contrast warnings, while delivering subtle GPU-composited
 * vertical and scale uplift. Completely static under reduced motion.
 */
export function ScrollStage({ children, className = "" }: ScrollStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.5,
  });

  const y = useTransform(smoothProgress, [0, 0.22, 0.8, 1], [18, 0, 0, -8]);
  const scale = useTransform(
    smoothProgress,
    [0, 0.22, 0.8, 1],
    [0.99, 1, 1, 0.995]
  );

  return (
    <div ref={containerRef} className={className}>
      <m.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                y,
                scale,
              }
        }
        className={prefersReducedMotion ? undefined : "will-change-transform"}
      >
        {children}
      </m.div>
    </div>
  );
}
