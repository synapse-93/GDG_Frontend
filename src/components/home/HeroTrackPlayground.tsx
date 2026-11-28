"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import {
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type PanInfo,
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pointerY, setPointerY] = useState<number | null>(null);
  const [railMetrics, setRailMetrics] = useState<{
    height: number;
    centers: number[];
  }>({ height: 180, centers: [22, 66, 110, 154] });
  const prefersReducedMotion = useReducedMotion();

  const railContainerRef = useRef<HTMLDivElement>(null);
  const trackItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const measureRail = useCallback(() => {
    const container = railContainerRef.current;
    if (!container) return;
    const height = container.offsetHeight;
    if (height <= 0) return;
    const centers = siteConfig.pillars.map((_, idx) => {
      const el = trackItemRefs.current[idx];
      if (!el) return (idx + 0.5) * (height / siteConfig.pillars.length);
      return el.offsetTop + el.offsetHeight / 2;
    });
    setRailMetrics({ height, centers });
  }, []);

  useEffect(() => {
    const container = railContainerRef.current;
    if (!container) return;
    const raf = requestAnimationFrame(measureRail);
    const ro = new ResizeObserver(measureRail);
    ro.observe(container);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [measureRail]);

  const findNearestIndex = (y: number, centers: number[]) => {
    let bestIdx = 0;
    let bestDist = Infinity;
    centers.forEach((cy, idx) => {
      const d = Math.abs(cy - y);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = idx;
      }
    });
    return bestIdx;
  };

  const handleRailPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const container = railContainerRef.current;
    if (!container || railMetrics.centers.length === 0) return;
    const rect = container.getBoundingClientRect();
    const rawY = event.clientY - rect.top;
    const minY = railMetrics.centers[0] ?? 18;
    const maxY =
      railMetrics.centers[railMetrics.centers.length - 1] ??
      railMetrics.height - 18;
    const clampedY = Math.min(Math.max(rawY, minY), maxY);
    setPointerY(clampedY);
    setHoveredIndex(findNearestIndex(clampedY, railMetrics.centers));
  };

  const handleRailPointerLeave = () => {
    setPointerY(null);
    setHoveredIndex(null);
  };

  const handleRailClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // If user clicked directly on the SVG rail or gap (outside a tab button), select the nearest track
    if ((event.target as HTMLElement).closest("button")) return;
    const container = railContainerRef.current;
    if (!container || railMetrics.centers.length === 0) return;
    const rect = container.getBoundingClientRect();
    const y = event.clientY - rect.top;
    setActiveIndex(findNearestIndex(y, railMetrics.centers));
  };

  // Subtle ±5deg 3D tilt driven by pointer position over the active desktop deck
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 260, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 260, damping: 24 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(nx * 10);
    rawRotateX.set(-ny * 10);
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

  const total = siteConfig.pillars.length;

  const handleMobileSwipeEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent<Element>,
    info: PanInfo
  ) => {
    if (info.offset.x < -45 || info.velocity.x < -350) {
      setActiveIndex((prev) => (prev + 1) % total);
    } else if (info.offset.x > 45 || info.velocity.x > 350) {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }
  };

  const visualIndex = hoveredIndex ?? activeIndex;
  const visualTheme = DECK_THEMES[visualIndex];
  const activePillar = siteConfig.pillars[activeIndex];
  const activeTheme = DECK_THEMES[activeIndex];
  const activeDomain = TRACK_TO_DOMAIN[activePillar.trackFilter];
  const activeMatchingEvent =
    events.find(
      (ev) => ev.track === activePillar.trackFilter && ev.status === "upcoming"
    ) ?? events.find((ev) => ev.track === activePillar.trackFilter);

  return (
    <>
      {/* MOBILE (< lg): Compact Horizontal Scrollable Pill Bar + Full-Width Swipeable Track Card */}
      <div className="space-y-4 lg:hidden">
        <div
          role="tablist"
          aria-label="Chapter tracks"
          className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
        >
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
                className={`inline-flex min-h-[38px] shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                  isActive
                    ? "border-ink bg-ink text-canvas"
                    : "border-hairline bg-surface text-ink-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${theme.dot}`}
                />
                <span>{pillar.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={activePillar.trackFilter}
            drag={prefersReducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleMobileSwipeEnd}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -18 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className={`flex min-h-[296px] w-full flex-col justify-between overflow-hidden rounded-[26px] border border-white/15 p-5 shadow-[0_14px_34px_rgba(12,15,20,0.14)] ${activeTheme.bg} ${activeTheme.ink}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-bold ${activeTheme.pill}`}
                >
                  {activePillar.shortLabel}
                </span>
                <p
                  className={`flex items-center gap-1.5 font-mono text-xs font-medium ${activeTheme.subInk}`}
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{activePillar.campusLab}</span>
                </p>
              </div>

              <DomainArtwork
                domain={activeDomain}
                size="md"
                tone={activeTheme.artTone}
                interactive
                className="h-16 w-16 shrink-0"
              />
            </div>

            <div className="my-4 space-y-2">
              <h2 className="text-2xl font-extrabold tracking-tight leading-tight">
                {activePillar.title}
              </h2>
              <p
                className={`text-sm leading-relaxed text-pretty ${activeTheme.subInk}`}
              >
                {activePillar.engineeringFocus}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activePillar.stackTags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${activeTheme.chip}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-current/15 pt-3.5">
              {activeMatchingEvent ? (
                <Link
                  href={`/events/${activeMatchingEvent.slug}`}
                  className={`inline-flex max-w-[64%] items-center gap-1.5 truncate font-mono text-xs font-semibold underline decoration-current/40 underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${activeTheme.ink}`}
                >
                  <Calendar
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{activeMatchingEvent.title}</span>
                </Link>
              ) : (
                <span />
              )}

              <Link
                href={`/events?track=${encodeURIComponent(
                  activePillar.trackFilter
                )}`}
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3.5 py-1.5 font-mono text-xs font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${activeTheme.cta}`}
              >
                <span>Sessions</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </m.div>
        </AnimatePresence>
      </div>

      {/* DESKTOP (lg: and up): Pixel-Measured Fluid BendingIndicator + Fanned 3D Card Deck */}
      <div className="hidden w-full items-center gap-5 lg:flex">
        <div
          ref={railContainerRef}
          role="tablist"
          aria-label="Chapter tracks"
          onPointerMove={handleRailPointerMove}
          onPointerLeave={handleRailPointerLeave}
          onClick={handleRailClick}
          className="relative flex shrink-0 cursor-pointer flex-col justify-between gap-2 pl-7"
        >
          <BendingIndicator
            height={railMetrics.height}
            targetY={
              pointerY ??
              railMetrics.centers[activeIndex] ??
              railMetrics.height / 2
            }
            accentColor={visualTheme.hex}
            halfSpan={24}
          />

          {siteConfig.pillars.map((pillar, idx) => {
            const isActive = idx === activeIndex;
            const isHovered = idx === hoveredIndex;
            const theme = DECK_THEMES[idx];
            return (
              <button
                key={pillar.trackFilter}
                ref={(el) => {
                  trackItemRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onFocus={() => setHoveredIndex(idx)}
                onBlur={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`inline-flex min-h-[36px] items-center gap-2.5 rounded-lg px-2 py-1.5 text-left font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                  isActive || isHovered
                    ? "font-bold text-ink"
                    : "font-medium text-ink-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full transition-transform ${
                    theme.dot
                  } ${isActive || isHovered ? "scale-125" : "opacity-55"}`}
                />
                <span>{pillar.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{ perspective: 950 }}
          className="relative mx-auto h-[348px] w-full max-w-[420px]"
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

            const fanX =
              offset === 0 ? 0 : offset === 1 ? 16 : offset === 2 ? 30 : -14;
            const fanY =
              offset === 0 ? 0 : offset === 1 ? 10 : offset === 2 ? 20 : 12;
            const fanRotate =
              offset === 0 ? 0 : offset === 1 ? 3.5 : offset === 2 ? 7 : -3.5;
            const fanScale =
              offset === 0 ? 1 : offset === 1 ? 0.95 : offset === 2 ? 0.9 : 0.94;
            const zIndex =
              offset === 0 ? 30 : offset === 1 ? 20 : offset === 3 ? 15 : 10;

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
                className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/15 p-6 shadow-[0_18px_42px_rgba(12,15,20,0.16)] ${
                  theme.bg
                } ${theme.ink} ${!isFront ? "cursor-pointer" : ""}`}
              >
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
                      <MapPin
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate">{pillar.campusLab}</span>
                    </p>
                  </div>

                  <DomainArtwork
                    domain={domain}
                    size="md"
                    tone={theme.artTone}
                    interactive={isFront}
                    className="h-[74px] w-[74px] shrink-0"
                  />
                </div>

                <div className="space-y-2">
                  <h2 className="text-[1.65rem] font-extrabold tracking-tight leading-tight">
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

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-current/15 pt-3.5">
                  {matchingEvent ? (
                    <Link
                      href={`/events/${matchingEvent.slug}`}
                      tabIndex={isFront ? 0 : -1}
                      className={`inline-flex max-w-[62%] items-center gap-1.5 truncate font-mono text-xs font-semibold underline decoration-current/40 underline-offset-2 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${theme.ink}`}
                    >
                      <Calendar
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate">{matchingEvent.title}</span>
                    </Link>
                  ) : (
                    <span />
                  )}

                  <Link
                    href={`/events?track=${encodeURIComponent(
                      pillar.trackFilter
                    )}`}
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
    </>
  );
}
