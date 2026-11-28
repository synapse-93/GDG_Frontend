"use client";

import type { MouseEvent } from "react";
import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

type ResolvedMode = "light" | "dark" | null;

function subscribeToRootThemeClass(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getClientThemeSnapshot(): ResolvedMode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerThemeSnapshot(): ResolvedMode {
  return null;
}

/** Crisp 11×11 dot-matrix pixel sun icon */
const SUN_PIXELS: [number, number][] = [
  [5, 0],
  [1, 1],
  [9, 1],
  [4, 3],
  [5, 3],
  [6, 3],
  [3, 4],
  [4, 4],
  [5, 4],
  [6, 4],
  [7, 4],
  [0, 5],
  [3, 5],
  [4, 5],
  [5, 5],
  [6, 5],
  [7, 5],
  [10, 5],
  [3, 6],
  [4, 6],
  [5, 6],
  [6, 6],
  [7, 6],
  [4, 7],
  [5, 7],
  [6, 7],
  [1, 9],
  [9, 9],
  [5, 10],
];

/** Crisp 11×11 dot-matrix pixel crescent moon icon */
const MOON_PIXELS: [number, number][] = [
  [4, 1],
  [5, 1],
  [6, 1],
  [3, 2],
  [4, 2],
  [2, 3],
  [3, 3],
  [8, 3],
  [2, 4],
  [3, 4],
  [2, 5],
  [3, 5],
  [9, 5],
  [2, 6],
  [3, 6],
  [2, 7],
  [3, 7],
  [8, 7],
  [3, 8],
  [4, 8],
  [7, 8],
  [8, 8],
  [4, 9],
  [5, 9],
  [6, 9],
  [7, 9],
];

function PixelGlyph({ mode }: { mode: "sun" | "moon" }) {
  const pixels = mode === "sun" ? SUN_PIXELS : MOON_PIXELS;
  const fill = mode === "sun" ? "#D97706" : "#FDD663";

  return (
    <m.svg
      key={mode}
      aria-hidden="true"
      viewBox="0 0 11 11"
      initial={{ opacity: 0, scale: 0.65, rotate: mode === "sun" ? -35 : 35 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.65, rotate: mode === "sun" ? 35 : -35 }}
      transition={{ type: "spring", stiffness: 460, damping: 28 }}
      className="h-3.5 w-3.5"
    >
      {pixels.map(([x, y], idx) => (
        <rect
          key={idx}
          x={x}
          y={y}
          width="0.95"
          height="0.95"
          rx="0.2"
          fill={fill}
        />
      ))}
    </m.svg>
  );
}

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const activeTheme = useSyncExternalStore(
    subscribeToRootThemeClass,
    getClientThemeSnapshot,
    getServerThemeSnapshot
  );

  const mounted = activeTheme !== null;
  const isDark = activeTheme === "dark";

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";
    const doc = document as DocumentWithViewTransition;
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof doc.startViewTransition !== "function") {
      setTheme(nextTheme);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(nextTheme);
      root.style.colorScheme = nextTheme;
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 450,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        // Gracefully ignore interrupted or aborted transitions.
      });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? isDark : undefined}
      onClick={handleToggle}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle color theme"
      }
      title={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle color theme"
      }
      className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-hairline p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
        mounted && isDark
          ? "justify-end bg-[#141922] shadow-[inset_0_2px_5px_rgba(0,0,0,0.65),0_1px_0_rgba(255,255,255,0.06)]"
          : "justify-start bg-[#EAECEF] shadow-[inset_0_2px_4px_rgba(17,24,39,0.14),0_1px_0_rgba(255,255,255,0.85)]"
      }`}
    >
      {/* Subtle track accent dots */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 h-1 w-1 rounded-full bg-[#F59E0B]/55"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 h-1 w-1 rounded-full bg-[#669DF6]/55"
      />

      {/* Recessed 3D Spring-Sliding Thumb */}
      <m.span
        layout
        transition={{ type: "spring", stiffness: 520, damping: 32 }}
        className={`relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border ${
          mounted && isDark
            ? "border-[#334155] bg-[#1F2937] shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.14)]"
            : "border-white bg-white shadow-[0_2px_6px_rgba(17,24,39,0.18),0_0_10px_rgba(251,188,4,0.28)]"
        }`}
      >
        {mounted ? (
          <AnimatePresence mode="wait" initial={false}>
            <PixelGlyph mode={isDark ? "moon" : "sun"} />
          </AnimatePresence>
        ) : (
          <span className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </m.span>
    </button>
  );
}
