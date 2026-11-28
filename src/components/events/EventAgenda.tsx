"use client";

import { useState } from "react";
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      {/* Agenda Timeline with Hover-Tracking Bending SVG Active Bracket */}
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative mt-5 flex items-stretch gap-3 border-y border-hairline"
      >
        <div className="hidden py-3 sm:flex">
          <BendingIndicator
            activeIndex={activeIndex}
            hoveredIndex={hoveredIndex}
            itemCount={agenda.length}
          />
        </div>

        <ol className="min-w-0 flex-1 divide-y divide-hairline">
          {agenda.map((slot, idx) => {
            const isOpen = openIndices.includes(idx);
            const panelId = `agenda-panel-${idx}`;

            return (
              <li key={`${slot.time}-${slot.title}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onFocus={() => setHoveredIndex(idx)}
                  onBlur={() => setHoveredIndex(null)}
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
                          className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1 font-mono text-xs font-semibold text-gdg-blue-ink transition-colors hover:border-gdg-blue/50 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
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
