"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";

interface KineticTextProps {
  text: string;
  className?: string;
  /**
   * "inView" triggers once scrolled into view (use for below-the-fold section headings).
   * "mount" animates immediately on mount (use for above-the-fold Hero H1 so LCP stays instant).
   */
  mode?: "inView" | "mount";
  /** Optional word to highlight with an accent class (matched case-insensitively without punctuation). */
  highlightWord?: string;
  highlightClassName?: string;
  staggerSeconds?: number;
}

export function KineticText({
  text,
  className = "",
  mode = "inView",
  highlightWord,
  highlightClassName = "text-gdg-blue-ink",
  staggerSeconds = 0.03,
}: KineticTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);
  const normalizedHighlight = highlightWord?.toLowerCase();

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {words.map((word, idx) => {
          const clean = word.replace(/[^a-z0-9]/gi, "").toLowerCase();
          const isHighlighted =
            normalizedHighlight && clean === normalizedHighlight;
          return (
            <span
              key={`${word}-${idx}`}
              className={isHighlighted ? highlightClassName : undefined}
            >
              {word}
              {idx < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <span className={className}>
      {words.map((word, idx) => {
        const clean = word.replace(/[^a-z0-9]/gi, "").toLowerCase();
        const isHighlighted =
          normalizedHighlight && clean === normalizedHighlight;

        return (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden pb-1.5 -mb-1.5 align-bottom"
          >
            <m.span
              initial={{ y: "110%", opacity: 0 }}
              {...(mode === "mount"
                ? { animate: { y: "0%", opacity: 1 } }
                : {
                    whileInView: { y: "0%", opacity: 1 },
                    viewport: { once: true, amount: 0.25 },
                  })}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 30,
                delay: idx * staggerSeconds,
              }}
              className={`inline-block will-change-transform ${
                isHighlighted ? highlightClassName : ""
              }`}
            >
              {word}
            </m.span>
            {idx < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </span>
  );
}
