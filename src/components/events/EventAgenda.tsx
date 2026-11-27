"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Terminal, User } from "lucide-react";
import type { AgendaItem } from "@/data/events";
import { getMemberByName } from "@/data/team";

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

  const allExpanded = openIndices.length === agenda.length;

  const toggleIndex = (idx: number) => {
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

      <ol className="mt-5 divide-y divide-hairline border-y border-hairline">
        {agenda.map((slot, idx) => {
          const isOpen = openIndices.includes(idx);
          const matchedMember = getMemberByName(slot.speaker);
          const panelId = `agenda-panel-${idx}`;

          return (
            <li key={`${slot.time}-${slot.title}`} className="gdg-reveal">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
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
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-gdg-blue-ink" : ""
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  className="space-y-3 pb-5 pl-4 sm:pl-[140px] sm:pr-4"
                >
                  <p className="max-w-[60ch] text-sm leading-relaxed text-ink-muted text-pretty">
                    {slot.notes}
                  </p>

                  <div className="flex items-start gap-2.5 rounded-lg border border-hairline bg-surface px-3.5 py-2.5 font-mono text-xs leading-relaxed text-ink-muted">
                    <Terminal
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-gdg-blue"
                      aria-hidden="true"
                    />
                    <span className="break-words">
                      {renderFormattedTip(slot.setupTip)}
                    </span>
                  </div>

                  {matchedMember && (
                    <div>
                      <Link
                        href={`/team?builder=${encodeURIComponent(
                          matchedMember.id
                        )}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-gdg-blue-ink transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                      >
                        <User className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>
                          Inspect {matchedMember.name}&apos;s Builder Dossier
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
