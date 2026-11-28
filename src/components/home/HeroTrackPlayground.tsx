"use client";

import { useState, type PointerEvent } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import {
  LayoutGroup,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { DomainArtwork, type DomainKey } from "@/components/brand/DomainArtwork";
import { BendingIndicator } from "@/components/ui/BendingIndicator";
import { events } from "@/data/events";
import { siteConfig, type CommunityPillar } from "@/data/site";

const TRACK_TO_DOMAIN: Record<CommunityPillar["trackFilter"], DomainKey> = {
  Web: "web",
  "AI / ML": "ai",
  Cloud: "cloud",
  Android: "android",
};

interface DeckCardTheme {
  bg: string;
  ink: string;
  subInk: string;
  pill: string;
  chip: string;
  cta: string;
  dot: string;
  hex: string;
  artTone: "auto" | "on-yellow";
}

const DECK_THEMES: DeckCardTheme[] = [
  {
    bg: "bg-[#1765CC]",
    ink: "text-white",
    subInk: "text-[#DCEAFF]",
    pill: "bg-white text-[#111827]",
    chip: "bg-white/15 text-white border-white/25",
    cta: "bg-white text-[#111827] hover:bg-[#F1F5F9]",
    dot: "bg-[#4285F4]",
    hex: "#4285F4",
    artTone: "auto",
  },
  {
    bg: "bg-[#137333]",
    ink: "text-white",
    subInk: "text-[#DCF5E3]",
    pill: "bg-white text-[#111827]",
    chip: "bg-white/15 text-white border-white/25",
    cta: "bg-white text-[#111827] hover:bg-[#F1F5F9]",
    dot: "bg-[#34A853]",
    hex: "#34A853",
    artTone: "auto",
  },
  {
    bg: "bg-[#C5221F]",
    ink: "text-white",
    subInk: "text-[#FDE5E3]",
    pill: "bg-white text-[#111827]",
    chip: "bg-white/15 text-white border-white/25",
    cta: "bg-white text-[#111827] hover:bg-[#F1F5F9]",
    dot: "bg-[#EA4335]",
    hex: "#EA4335",
    artTone: "auto",
  },
  {
    // Strictly dark #111827 ink on Google Yellow
    bg: "bg-[#FBBC04]",
    ink: "text-[#111827]",
    subInk: "text-[#1F2937]",
    pill: "bg-[#111827] text-[#FAF9F6]",
    chip: "bg-[#111827]/12 text-[#111827] border-[#111827]/25",
    cta: "bg-[#111827] text-[#FAF9F6] hover:bg-[#1F2937]",
    dot: "bg-[#FBBC04]",
    hex: "#D99B00",
    artTone: "on-yellow",
  },
];

export function HeroTrackPlayground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Subtle ±5deg 3D tilt driven by pointer position over the active deck
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 260, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 260, damping: 24 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(nx * 10); // ±5deg
    rawRotateX.set(-ny * 10); // ±5deg
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    const count = siteConfig.pillars.length;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((idx + 1) % count);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((idx - 1 + count) % count);
    }
  };

  const activeTheme = DECK_THEMES[activeIndex];
  const total = siteConfig.pillars.length;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Main Interactive Area: Vertical Bending Track Rail + Fanned 3D Card Deck */}
      <div className="flex w-full items-center gap-4 sm:gap-5">
        {/* Vertical Track List with Bending SVG Indicator */}
        <div
          role="tablist"
          aria-label="Chapter tracks"
          className="hidden shrink-0 items-stretch gap-2.5 sm:flex"
        >
          <BendingIndicator
            activeIndex={activeIndex}
            itemCount={total}
            accentColor={activeTheme.hex}
            className="py-1"
          />

          <div className="flex flex-col justify-between gap-1.5 py-1">
            {siteConfig.pillars.map((pillar, idx) => {
              const isActive = idx === activeIndex;
              const theme = DECK_THEMES[idx];
              return (
                <button
                  key={pillar.trackFilter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-left font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                    isActive
                      ? "font-bold text-ink"
                      : "font-medium text-ink-muted hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full transition-transform ${
                      theme.dot
                    } ${isActive ? "scale-125" : "opacity-55"}`}
                  />
                  <span>{pillar.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sleek Fanned Card Deck with ±5deg Cursor 3D Tilt */}
        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{ perspective: 950 }}
          className="relative mx-auto h-[328px] w-full max-w-[420px] sm:h-[344px]"
        >
          {siteConfig.pillars.map((pillar, idx) => {
            const offset = (idx - activeIndex + total) % total;
            const isFront = offset === 0;
            const theme = DECK_THEMES[idx];
            const domain = TRACK_TO_DOMAIN[pillar.trackFilter];
            const matchingEvent =
              events.find(
                (ev) => ev.track === pillar.trackFilter && ev.status === "upcoming"
              ) ?? events.find((ev) => ev.track === pillar.trackFilter);

            // Smooth fanned geometry: front card centered, peeking cards fanned behind
            const fanX =
              offset === 0 ? 0 : offset === 1 ? 16 : offset === 2 ? 30 : -14;
            const fanY =
              offset === 0 ? 0 : offset === 1 ? 10 : offset === 2 ? 20 : 12;
            const fanRotate =
              offset === 0 ? 0 : offset === 1 ? 3.5 : offset === 2 ? 7 : -3.5;
            const fanScale =
              offset === 0 ? 1 : offset === 1 ? 0.95 : offset === 2 ? 0.9 : 0.94;
            const zIndex = offset === 0 ? 30 : offset === 1 ? 20 : offset === 3 ? 15 : 10;

            return (
              <m.div
                key={pillar.trackFilter}
                onClick={!isFront ? () => setActiveIndex(idx) : undefined}
                animate={{
                  x: prefersReducedMotion ? 0 : fanX,
                  y: prefersReducedMotion ? 0 : fanY,
                  rotate: prefersReducedMotion ? 0 : fanRotate,
                  scale: prefersReducedMotion ? (isFront ? 1 : 0.96) : fanScale,
                  opacity: isFront ? 1 : offset === 2 ? 0.72 : 0.88,
                }}
                style={{
                  zIndex,
                  rotateX: isFront && !prefersReducedMotion ? rotateX : 0,
                  rotateY: isFront && !prefersReducedMotion ? rotateY : 0,
                  transformStyle: "preserve-3d",
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 26,
                }}
                className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/15 p-5 shadow-[0_18px_42px_rgba(12,15,20,0.16)] sm:p-6 ${
                  theme.bg
                } ${theme.ink} ${!isFront ? "cursor-pointer" : ""}`}
              >
                {/* Top Row: Track Badge + Pointer-Reactive DomainArtwork */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-bold ${theme.pill}`}
                    >
                      {pillar.shortLabel}
                    </span>
                    <p
                      className={`flex items-center gap-1.5 font-mono text-xs font-medium ${theme.subInk}`}
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{pillar.campusLab}</span>
                    </p>
                  </div>

                  <DomainArtwork
                    domain={domain}
                    size="md"
                    tone={theme.artTone}
                    interactive={isFront}
                    className="h-16 w-16 shrink-0 sm:h-[74px] sm:w-[74px]"
                  />
                </div>

                {/* Middle: Title + Engineering Focus */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold tracking-tight leading-tight sm:text-[1.65rem]">
                    {pillar.title}
                  </h2>
                  <p
                    className={`line-clamp-2 text-sm leading-relaxed text-pretty ${theme.subInk}`}
                  >
                    {pillar.engineeringFocus}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pillar.stackTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${theme.chip}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Next Related Session + Filter CTA */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-current/15 pt-3.5">
                  {matchingEvent ? (
                    <Link
                      href={`/events/${matchingEvent.slug}`}
                      tabIndex={isFront ? 0 : -1}
                      className={`inline-flex max-w-[62%] items-center gap-1.5 truncate font-mono text-xs font-semibold underline decoration-current/40 underline-offset-2 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${theme.ink}`}
                    >
                      <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{matchingEvent.title}</span>
                    </Link>
                  ) : (
                    <span />
                  )}

                  <Link
                    href={`/events?track=${encodeURIComponent(pillar.trackFilter)}`}
                    tabIndex={isFront ? 0 : -1}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-mono text-xs font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${theme.cta}`}
                  >
                    <span>Sessions</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>

      {/* Floating Pill Dock Underneath */}
      <LayoutGroup id="hero-deck-dock">
        <div
          role="group"
          aria-label="Select track card"
          className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-hairline bg-surface/95 p-1.5 shadow-[0_8px_24px_rgba(12,15,20,0.08)] backdrop-blur-md"
        >
          {siteConfig.pillars.map((pillar, idx) => {
            const isActive = idx === activeIndex;
            const theme = DECK_THEMES[idx];
            return (
              <button
                key={pillar.trackFilter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`relative inline-flex min-h-[34px] items-center gap-1.5 rounded-full px-3.5 py-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                  isActive
                    ? "text-canvas"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {isActive && (
                  <m.span
                    layoutId="deck-dock-pill"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 440, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={`relative z-10 h-2 w-2 rounded-full ${theme.dot}`}
                />
                <span className="relative z-10">{pillar.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}
