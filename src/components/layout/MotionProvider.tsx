"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadMotionFeatures = () =>
  import("@/lib/motion-features").then((res) => res.default);

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Loads motion's domMax feature bundle asynchronously in strict mode so only
 * lightweight `motion/react-m` components ship in the initial client payload.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
