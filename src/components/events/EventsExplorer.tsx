"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  LayoutGrid,
  List,
  MapPin,
  RotateCcw,
  Search,
  SearchX,
  X,
} from "lucide-react";
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
type ViewMode = "ledger" | "grid";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

function parseStatusParam(value: string | null): StatusFilter {
  if (value === "upcoming" || value === "past") {
    return value;
  }
  return "all";
}

function parseTrackParam(value: string | null): TrackFilter {
  if (value && (EVENT_TRACKS as readonly string[]).includes(value)) {
    return value as EventTrack;
  }
  return "All";
}

function parseViewParam(value: string | null): ViewMode {
  if (value === "ledger" || value === "grid") {
    return value;
  }
  return "grid";
}

function matchesEventSearch(event: EventItem, normalized: string): boolean {
  if (!normalized) return true;
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
}

export function EventsExplorer({ events }: EventsExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get("q") ?? "";
  const statusFilter = parseStatusParam(searchParams.get("status"));
  const trackFilter = parseTrackParam(searchParams.get("track"));
  const viewMode = parseViewParam(searchParams.get("view"));

  const [queryOverride, setQueryOverride] = useState<{
    base: string;
    value: string;
  } | null>(null);
  const query =
    queryOverride && queryOverride.base === urlQuery
      ? queryOverride.value
      : urlQuery;

  const syncUrl = useCallback(
    (
      nextQuery: string,
      nextStatus: StatusFilter,
      nextTrack: TrackFilter,
      nextView: ViewMode
    ) => {
      const params = new URLSearchParams();
      const trimmed = nextQuery.trim();
      if (trimmed) params.set("q", trimmed);
      if (nextStatus !== "all") params.set("status", nextStatus);
      if (nextTrack !== "All") params.set("track", nextTrack);
      if (nextView !== "grid") params.set("view", nextView);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const updateQuery = (next: string) => {
    setQueryOverride({ base: urlQuery, value: next });
    syncUrl(next, statusFilter, trackFilter, viewMode);
  };

  const updateStatus = (next: StatusFilter) => {
    syncUrl(query, next, trackFilter, viewMode);
  };

  const updateTrack = (next: TrackFilter) => {
    syncUrl(query, statusFilter, next, viewMode);
  };

  const updateView = (next: ViewMode) => {
    syncUrl(query, statusFilter, trackFilter, next);
  };

  const normalizedQuery = query.trim().toLowerCase();

  const filteredEvents = events
    .filter((event) => {
      if (statusFilter !== "all" && event.status !== statusFilter) {
        return false;
      }
      if (trackFilter !== "All" && event.track !== trackFilter) {
        return false;
      }
      return matchesEventSearch(event, normalizedQuery);
    })
    .sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === "upcoming" ? -1 : 1;
      }
      const timeA = new Date(a.dateISO).getTime();
      const timeB = new Date(b.dateISO).getTime();
      return a.status === "upcoming" ? timeA - timeB : timeB - timeA;
    });

  const alternateStatusCount =
    filteredEvents.length > 0 || statusFilter === "all"
      ? 0
      : events.filter((event) => {
          if (trackFilter !== "All" && event.track !== trackFilter) return false;
          return matchesEventSearch(event, normalizedQuery);
        }).length;

  const hasActiveFilters =
    query.trim().length > 0 || statusFilter !== "all" || trackFilter !== "All";

  const handleReset = () => {
    setQueryOverride(null);
    syncUrl("", "all", "All", viewMode);
  };

  const emptyHeadline = (() => {
    const parts: string[] = [];
    if (statusFilter !== "all") parts.push(statusFilter);
    if (trackFilter !== "All") parts.push(trackFilter);
    if (parts.length > 0) {
      return `No ${parts.join(" ")} sessions found`;
    }
    return "No matching sessions found";
  })();

  return (
    <div className="space-y-8">
      {/* Unboxed Hairline-Separated Operational Toolbar */}
      <div className="space-y-4 border-b border-hairline pb-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
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
              onChange={(e) => updateQuery(e.target.value)}
              placeholder="Search title, topic, venue, or speaker..."
              className="w-full rounded-lg border border-hairline bg-surface py-2.5 pr-12 pl-10 text-sm text-ink placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => updateQuery("")}
                aria-label="Clear search query"
                className="absolute top-1/2 right-1 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Segmented Status Toggle */}
            <div
              role="group"
              aria-label="Filter sessions by schedule status"
              className="inline-flex flex-1 rounded-lg border border-hairline bg-surface p-1 sm:flex-initial"
            >
              {STATUS_OPTIONS.map((option) => {
                const active = statusFilter === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => updateStatus(option.value)}
                    className={`flex-1 rounded-md px-3.5 py-2 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:flex-initial ${
                      active
                        ? "bg-ink text-canvas"
                        : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {/* Poster Grid / Compact Ledger View Switcher */}
            <div
              role="group"
              aria-label="Choose events display layout"
              className="inline-flex rounded-lg border border-hairline bg-surface p-1"
            >
              <button
                type="button"
                aria-pressed={viewMode === "grid"}
                onClick={() => updateView("grid")}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                  viewMode === "grid"
                    ? "bg-ink text-canvas"
                    : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Posters</span>
              </button>
              <button
                type="button"
                aria-pressed={viewMode === "ledger"}
                onClick={() => updateView("ledger")}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                  viewMode === "ledger"
                    ? "bg-ink text-canvas"
                    : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                }`}
              >
                <List className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Ledger</span>
              </button>
            </div>
          </div>
        </div>

        {/* Track Filter Pills + Results Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div
            role="group"
            aria-label="Filter sessions by technical track"
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              aria-pressed={trackFilter === "All"}
              onClick={() => updateTrack("All")}
              className={`inline-flex min-h-[38px] items-center rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
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
                  onClick={() => updateTrack(track)}
                  className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                    active
                      ? styles.badge
                      : "border-hairline bg-canvas text-ink-muted hover:bg-surface-muted hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${
                      active && track === "Android"
                        ? "bg-[#111827] dark:bg-[#FDD663]"
                        : styles.dot
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
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <p aria-live="polite" className="font-mono text-xs text-ink-muted">
            Showing{" "}
            <span className="font-semibold text-ink">
              {filteredEvents.length}
            </span>{" "}
            of {events.length} sessions
          </p>
        </div>
      </div>

      {/* Results: Compact Ledger OR Visual Grid OR Diagnostic Empty State */}
      {filteredEvents.length > 0 ? (
        viewMode === "ledger" ? (
          <div>
            {/* Desktop Timetable Column Labels */}
            <div className="hidden grid-cols-12 gap-4 border-b border-hairline pb-2.5 font-mono text-xs font-semibold text-ink-muted md:grid md:px-3">
              <span className="col-span-3">Date &amp; Time</span>
              <span className="col-span-2">Track</span>
              <span className="col-span-4">Session</span>
              <span className="col-span-3 text-right">Venue &amp; Mode</span>
            </div>

            <ul className="divide-y divide-hairline border-b border-hairline">
              {filteredEvents.map((event) => {
                const styles = getTrackStyles(event.track);
                const isUpcoming = event.status === "upcoming";
                return (
                  <li key={event.slug} className="gdg-reveal">
                    <Link
                      href={`/events/${event.slug}`}
                      className="group grid grid-cols-1 gap-3 py-5 transition-colors hover:bg-surface-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] md:grid-cols-12 md:items-center md:gap-4 md:px-3"
                    >
                      {/* Date & Time */}
                      <div className="font-mono text-xs md:col-span-3">
                        <p className="font-semibold tabular-nums text-ink">
                          {event.dateDisplay}
                        </p>
                        <p className="mt-0.5 tabular-nums text-ink-muted">
                          {event.timeDisplay}
                        </p>
                      </div>

                      {/* Track & Status */}
                      <div className="flex flex-wrap items-center gap-2 md:col-span-2">
                        <span
                          className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-semibold ${styles.badge}`}
                        >
                          {event.track}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 font-mono text-xs ${
                            isUpcoming
                              ? "font-semibold text-[#166534] dark:text-[#A8DAB5]"
                              : "text-ink-muted"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 rounded-full ${
                              isUpcoming ? "bg-gdg-green" : "bg-ink-muted"
                            }`}
                          />
                          {isUpcoming ? "Upcoming" : "Past"}
                        </span>
                      </div>

                      {/* Session Title & Tagline */}
                      <div className="min-w-0 md:col-span-4">
                        <p className="text-base font-bold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
                          {event.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
                          {event.tagline}
                        </p>
                      </div>

                      {/* Venue, Mode & Directional Cue (2-line stack prevents clipping) */}
                      <div className="flex items-center justify-between gap-3 font-mono text-xs text-ink-muted md:col-span-3 md:justify-end">
                        <div className="min-w-0 md:text-right">
                          <p className="inline-flex max-w-full items-center gap-1.5 font-medium text-ink">
                            <MapPin
                              className="h-3.5 w-3.5 shrink-0 text-gdg-red"
                              aria-hidden="true"
                            />
                            <span className="truncate">{event.venue}</span>
                          </p>
                          <p className="mt-0.5 text-ink-muted">{event.mode}</p>
                        </div>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gdg-blue-ink"
                          aria-hidden="true"
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center border-y border-dashed border-hairline py-16 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-muted">
            <SearchX className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold tracking-tight text-ink">
            {emptyHeadline}
          </h2>
          <p className="mt-1.5 max-w-md text-sm text-ink-muted">
            {alternateStatusCount > 0
              ? `${alternateStatusCount} matching ${
                  alternateStatusCount === 1 ? "session exists" : "sessions exist"
                } under another schedule window.`
              : "Try clearing your search term or switching back to all tracks and schedule dates."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {alternateStatusCount > 0 && (
              <button
                type="button"
                onClick={() => updateStatus("all")}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#1A73E8] px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-150 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
              >
                <span>Show all dates</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              className={`inline-flex min-h-[42px] items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-transform duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                alternateStatusCount > 0
                  ? "border border-hairline bg-canvas text-ink hover:bg-surface-muted"
                  : "bg-[#1A73E8] text-white hover:bg-[#1557B0] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
              }`}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Reset filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
