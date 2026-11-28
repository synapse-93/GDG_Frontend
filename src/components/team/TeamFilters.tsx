"use client";

import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { RotateCcw, Search, X } from "lucide-react";
import { TEAM_VERTICALS, type TeamVertical } from "@/data/team";
import { ACCENT_STYLES, type AccentColor } from "@/lib/accents";

export type VerticalFilter = "All" | TeamVertical;

const VERTICAL_ACCENT: Record<TeamVertical, AccentColor> = {
  "Lead & Core": "blue",
  "Dev Vertical": "blue",
  "AI / ML": "green",
  Cloud: "red",
  Design: "yellow",
};

interface TeamFiltersProps {
  selectedVertical: VerticalFilter;
  searchQuery: string;
  totalCount: number;
  filteredCount: number;
  onSelectVertical: (vertical: VerticalFilter) => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
}

export function TeamFilters({
  selectedVertical,
  searchQuery,
  totalCount,
  filteredCount,
  onSelectVertical,
  onSearchChange,
  onReset,
}: TeamFiltersProps) {
  const [hoveredVertical, setHoveredVertical] = useState<VerticalFilter | null>(
    null
  );
  const filterOptions: VerticalFilter[] = ["All", ...TEAM_VERTICALS];
  const hasFilters = selectedVertical !== "All" || searchQuery.trim().length > 0;

  return (
    <div className="space-y-3 border-b border-hairline pb-4 sm:space-y-4 sm:pb-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input with smooth focus-ring expansion & spring clear button */}
        <div className="group relative flex-1 rounded-xl border border-hairline bg-surface transition-[border-color,box-shadow] duration-200 focus-within:border-gdg-blue/70 focus-within:ring-2 focus-within:ring-[#4285F4]/20 lg:max-w-sm">
          <label htmlFor="team-search-input" className="sr-only">
            Search team members by name, role, stack, or topic
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-muted transition-colors group-focus-within:text-gdg-blue-ink"
            aria-hidden="true"
          />
          <input
            id="team-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search name, role, stack, or topic..."
            className="w-full rounded-xl bg-transparent py-2 pr-11 pl-10 text-sm text-ink placeholder:text-ink-muted focus:outline-none sm:py-2.5"
          />
          <AnimatePresence initial={false}>
            {searchQuery.length > 0 && (
              <m.button
                key="team-clear-search"
                type="button"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 480, damping: 28 }}
                onClick={() => onSearchChange("")}
                aria-label="Clear team search"
                className="absolute top-1/2 right-1 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </m.button>
            )}
          </AnimatePresence>
        </div>

        <p
          aria-live="polite"
          className="hidden shrink-0 font-mono text-xs text-ink-muted sm:block"
        >
          Showing{" "}
          <span className="font-semibold text-ink tabular-nums">
            {filteredCount}
          </span>{" "}
          of {totalCount} members
        </p>
      </div>

      {/* Single-line horizontal scroll strip on mobile; wrapped pills on sm+ */}
      <LayoutGroup id="team-filters">
        <div
          role="group"
          aria-label="Filter team members by vertical"
          onMouseLeave={() => setHoveredVertical(null)}
          className="flex items-center gap-2 overflow-x-auto pb-1 whitespace-nowrap no-scrollbar sm:flex-wrap sm:overflow-visible sm:pb-0"
        >
          {filterOptions.map((vertical) => {
            const active = selectedVertical === vertical;
            const hovered = hoveredVertical === vertical && !active;
            const dotClass =
              vertical === "All"
                ? null
                : ACCENT_STYLES[VERTICAL_ACCENT[vertical]].dot;

            return (
              <button
                key={vertical}
                type="button"
                aria-pressed={active}
                onMouseEnter={() => setHoveredVertical(vertical)}
                onFocus={() => setHoveredVertical(vertical)}
                onBlur={() => setHoveredVertical(null)}
                onClick={() => onSelectVertical(vertical)}
                className={`relative inline-flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:min-h-[40px] sm:px-4 sm:py-1.5 ${
                  active
                    ? "border-transparent text-canvas"
                    : "border-hairline bg-surface text-ink-muted hover:text-ink"
                }`}
              >
                {hovered && (
                  <m.span
                    layoutId="team-filter-hover"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="pointer-events-none absolute inset-0 rounded-full bg-surface-muted/90"
                  />
                )}
                {active && (
                  <m.span
                    layoutId="team-filter-pill"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="pointer-events-none absolute inset-0 rounded-full bg-ink"
                  />
                )}
                {dotClass && (
                  <span
                    aria-hidden="true"
                    className={`relative z-10 h-2 w-2 rounded-full ${dotClass}`}
                  />
                )}
                <span className="relative z-10">{vertical}</span>
              </button>
            );
          })}

          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </LayoutGroup>
    </div>
  );
}
