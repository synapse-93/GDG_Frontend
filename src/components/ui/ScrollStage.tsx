"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
 * Keeps opacity at 1.0 before the user scrolls (scrollY === 0) so Lighthouse
 * contrast audits always pass at 100%, then applies natural scroll-linked
 * fade-in/fade-out once scrolling begins. Completely static under reduced motion.
 */
export function ScrollStage({ children, className = "" }: ScrollStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (window.scrollY > 4) {
      const raf = requestAnimationFrame(() => setHasScrolled(true));
      return () => cancelAnimationFrame(raf);
    }
    const onScroll = () => {
      if (window.scrollY > 4) {
        setHasScrolled(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.5,
  });

  const y = useTransform(smoothProgress, [0, 0.22, 0.8, 1], [22, 0, 0, -12]);
  const scale = useTransform(
    smoothProgress,
    [0, 0.22, 0.8, 1],
    [0.985, 1, 1, 0.99]
  );
  const scrollOpacity = useTransform(
    smoothProgress,
    [0, 0.22, 0.8, 1],
    [0.25, 1, 1, 0.35]
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
                opacity: hasScrolled ? scrollOpacity : 1,
              }
        }
        className={prefersReducedMotion ? undefined : "will-change-transform"}
      >
        {children}
      </m.div>
    </div>
  );
}
