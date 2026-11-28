"use client";

import * as m from "motion/react-m";
import { AnimatePresence, useReducedMotion } from "motion/react";

interface PixelBurstProps {
  /** Increment this counter to fire a 12-pixel Google-colored burst */
  triggerKey: number;
}

const PARTICLES = [
  { x: -38, y: -26, color: "#4285F4", size: 5, delay: 0 },
  { x: -20, y: -38, color: "#EA4335", size: 4, delay: 0.02 },
  { x: 0, y: -42, color: "#FBBC04", size: 5, delay: 0.01 },
  { x: 22, y: -36, color: "#34A853", size: 4, delay: 0.03 },
  { x: 40, y: -22, color: "#4285F4", size: 5, delay: 0.01 },
  { x: 44, y: 2, color: "#EA4335", size: 4, delay: 0.02 },
  { x: 36, y: 24, color: "#FBBC04", size: 5, delay: 0 },
  { x: 16, y: 34, color: "#34A853", size: 4, delay: 0.03 },
  { x: -12, y: 36, color: "#4285F4", size: 4, delay: 0.02 },
  { x: -34, y: 26, color: "#EA4335", size: 5, delay: 0.01 },
  { x: -44, y: 4, color: "#FBBC04", size: 4, delay: 0.02 },
  { x: -28, y: -12, color: "#34A853", size: 4, delay: 0.03 },
] as const;

export function PixelBurst({ triggerKey }: PixelBurstProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || triggerKey === 0) {
    return null;
  }

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
    >
      <AnimatePresence>
        <m.span
          key={triggerKey}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative block h-0 w-0"
        >
          {PARTICLES.map((p, idx) => (
            <m.span
              key={idx}
              initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                scale: [0.6, 1.15, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 0.56,
                delay: p.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
              className="absolute top-0 left-0 block rounded-[1px]"
            />
          ))}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
