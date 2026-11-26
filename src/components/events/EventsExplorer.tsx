"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search, SearchX, X } from "lucide-react";
import { EventCard } from "@/components/events/EventCard";
import {
  EVENT_TRACKS,
  type EventItem,
  type EventStatus,
  type EventTrack,
} from "@/data/events";
import { getTrackStyles } from "@/lib/accents";

interface EventsExplorerProps {
  events: EventItem[];
}

type StatusFilter = "all" | EventStatus;
type TrackFilter = "All" | EventTrack;

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

export function EventsExplorer({ events }: EventsExplorerProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [trackFilter, setTrackFilter] = useState<TrackFilter>("All");

  const filteredEvents = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return events
      .filter((event) => {
        if (statusFilter !== "all" && event.status !== statusFilter) {
          return false;
        }
        if (trackFilter !== "All" && event.track !== trackFilter) {
          return false;
        }
        if (!normalized) {
          return true;
        }
        const searchableText = [
          event.title,
          event.tagline,
          event.description,
          event.venue,
          event.track,
          ...event.agenda.map((item) => item.speaker),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalized);
      })
      .sort((a, b) => {
        if (a.status !== b.status) {
          return a.status === "upcoming" ? -1 : 1;
        }
        const timeA = new Date(a.dateISO).getTime();
        const timeB = new Date(b.dateISO).getTime();
        return a.status === "upcoming" ? timeA - timeB : timeB - timeA;
      });
  }, [events, query, statusFilter, trackFilter]);

  const hasActiveFilters =
    query.trim().length > 0 || statusFilter !== "all" || trackFilter !== "All";

  const handleReset = () => {
    setQuery("");
    setStatusFilter("all");
    setTrackFilter("All");
  };

  return (
    <div className="space-y-8">
      {/* Filter & Search Toolbar */}
      <div className="rounded-2xl border border-hairline bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 lg:max-w-md">
            <label htmlFor="events-search-input" className="sr-only">
              Search events by title, topic, or speaker
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden="true"
            />
            <input
              id="events-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, topic, or speaker..."
              className="w-full rounded-xl border border-hairline bg-canvas py-2.5 pr-9 pl-10 text-sm text-ink placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search query"
                className="absolute top-1/2 right-2.5 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Segmented Status Toggle */}
          <div
            role="group"
            aria-label="Filter sessions by schedule status"
            className="inline-flex w-full rounded-xl border border-hairline bg-canvas p-1 sm:w-auto"
          >
            {STATUS_OPTIONS.map((option) => {
              const active = statusFilter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setStatusFilter(option.value)}
                  className={`flex-1 rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:flex-initial ${
                    active
                      ? "bg-surface text-ink ring-1 ring-hairline"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Track Filter Pills */}
        <div
          role="group"
          aria-label="Filter sessions by technical track"
          className="mt-4 flex flex-wrap items-center gap-2 border-t border-hairline pt-4"
        >
          <span className="mr-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
            Track:
          </span>

          <button
            type="button"
            aria-pressed={trackFilter === "All"}
            onClick={() => setTrackFilter("All")}
            className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
              trackFilter === "All"
                ? "border-ink bg-ink text-canvas"
                : "border-hairline bg-canvas text-ink-muted hover:bg-surface-muted hover:text-ink"
            }`}
          >
            All Tracks
          </button>

          {EVENT_TRACKS.map((track) => {
            const active = trackFilter === track;
            const styles = getTrackStyles(track);
            return (
              <button
                key={track}
                type="button"
                aria-pressed={active}
                onClick={() => setTrackFilter(track)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                  active
                    ? styles.badge
                    : "border-hairline bg-canvas text-ink-muted hover:bg-surface-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    active && track === "Android" ? "bg-[#111827]" : styles.dot
                  }`}
                />
                <span>{track}</span>
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results meta line */}
      <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
        <p aria-live="polite">
          Showing <span className="font-semibold text-ink">{filteredEvents.length}</span>{" "}
          of {events.length} sessions
        </p>
      </div>

      {/* Results Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-hairline bg-surface px-6 py-16 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-hairline bg-canvas text-ink-muted">
            <SearchX className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold tracking-tight text-ink">
            No matching sessions found
          </h2>
          <p className="mt-1.5 max-w-md text-sm text-ink-muted">
            Try clearing your search term or switching back to all tracks and
            schedule dates.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1A73E8] px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-150 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Reset filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
