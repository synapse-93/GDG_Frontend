"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { ChevronDown, Terminal, User } from "lucide-react";
import { BendingIndicator } from "@/components/ui/BendingIndicator";
import type { AgendaItem } from "@/data/events";

interface EventAgendaProps {
  agenda: AgendaItem[];
  dotClass: string;
}

function renderFormattedTip(tip: string) {
  const parts = tip.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={i}
          className="rounded bg-surface-muted px-1.5 py-0.5 font-semibold text-ink"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function EventAgenda({ agenda, dotClass }: EventAgendaProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [pointerY, setPointerY] = useState<number | null>(null);
  const [railMetrics, setRailMetrics] = useState<{
    height: number;
    centers: number[];
  }>({
    height: Math.max(180, agenda.length * 64),
    centers: agenda.map((_, idx) => idx * 64 + 32),
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const headerButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const measureRail = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const height = container.offsetHeight;
    if (height <= 0) return;

    const centers = agenda.map((_, idx) => {
      const btn = headerButtonRefs.current[idx];
      if (!btn) return (idx + 0.5) * (height / Math.max(1, agenda.length));
      const rect = btn.getBoundingClientRect();
      return rect.top - containerRect.top + rect.height / 2;
    });
    setRailMetrics({ height, centers });
  }, [agenda]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let rafId = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measureRail);
    };
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(measureRail);
    });
    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(container);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [measureRail, openIndices]);

  const allExpanded = openIndices.length === agenda.length;

  const toggleIndex = (idx: number) => {
    setActiveIndex(idx);
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(agenda.map((_, idx) => idx));
    }
  };

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

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || railMetrics.centers.length === 0) return;
    const rect = container.getBoundingClientRect();
    const rawY = event.clientY - rect.top;
    const minY = railMetrics.centers[0] ?? 24;
    const maxY =
      railMetrics.centers[railMetrics.centers.length - 1] ??
      railMetrics.height - 24;
    setPointerY(Math.min(Math.max(rawY, minY), maxY));
  };

  const handlePointerLeave = () => {
    setPointerY(null);
  };

  const handleRailClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button, a")) return;
    const container = containerRef.current;
    if (!container || railMetrics.centers.length === 0) return;
    const rect = container.getBoundingClientRect();
    const y = event.clientY - rect.top;
    toggleIndex(findNearestIndex(y, railMetrics.centers));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="agenda-heading"
          className="text-2xl font-bold tracking-tight text-ink"
        >
          Session schedule
        </h2>

        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex min-h-[36px] items-center rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold text-gdg-blue-ink transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
        >
          {allExpanded ? "Collapse all notes" : "Expand all notes"}
        </button>
      </div>

      {/* Agenda Timeline with Pixel-Measured Fluid Hover-Tracking BendingIndicator */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleRailClick}
        className="relative mt-5 border-y border-hairline sm:pl-7"
      >
        <div className="hidden sm:block">
          <BendingIndicator
            height={railMetrics.height}
            targetY={
              pointerY ??
              railMetrics.centers[activeIndex] ??
              railMetrics.height / 2
            }
            halfSpan={28}
          />
        </div>

        <ol className="min-w-0 divide-y divide-hairline">
          {agenda.map((slot, idx) => {
            const isOpen = openIndices.includes(idx);
            const panelId = `agenda-panel-${idx}`;

            return (
              <li key={`${slot.time}-${slot.title}`}>
                <button
                  ref={(el) => {
                    headerButtonRefs.current[idx] = el;
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onFocus={() => setActiveIndex(idx)}
                  onClick={() => toggleIndex(idx)}
                  className="group flex w-full flex-col gap-2 py-4 text-left transition-colors hover:bg-surface-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:flex-row sm:items-center sm:gap-5 sm:px-2"
                >
                  <div className="flex items-center gap-2.5 sm:w-28 sm:shrink-0">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${dotClass}`}
                    />
                    <span className="font-mono text-xs font-semibold tabular-nums text-ink">
                      {slot.time}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
                      {slot.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-ink-muted">
                      {slot.speaker}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 self-start font-mono text-xs text-ink-muted sm:self-center">
                    <span>{isOpen ? "Hide notes" : "Notes"}</span>
                    <m.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      className="inline-flex"
                    >
                      <ChevronDown
                        className={`h-4 w-4 ${isOpen ? "text-gdg-blue-ink" : ""}`}
                        aria-hidden="true"
                      />
                    </m.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      key={panelId}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="space-y-3 pb-5 pl-4 sm:pl-[140px] sm:pr-4"
                    >
                      <p className="max-w-[60ch] text-sm leading-relaxed text-ink-muted text-pretty">
                        {slot.notes}
                      </p>

                      <div className="flex items-start gap-2.5 rounded-xl border border-hairline bg-surface px-3.5 py-2.5 font-mono text-xs leading-relaxed text-ink-muted">
                        <Terminal
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gdg-blue"
                          aria-hidden="true"
                        />
                        <span className="break-words">
                          {renderFormattedTip(slot.setupTip)}
                        </span>
                      </div>

                      <div>
                        <Link
                          href={`/team?member=${encodeURIComponent(
                            slot.memberSlug
                          )}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3 py-1 font-mono text-xs font-semibold text-gdg-blue-ink transition-colors hover:border-gdg-blue/50 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                        >
                          <User className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>View {slot.speaker}&apos;s profile &rarr;</span>
                        </Link>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
