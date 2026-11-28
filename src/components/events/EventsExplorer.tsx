"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as m from "motion/react-m";
import { AnimatePresence, LayoutGroup } from "motion/react";
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
import { ScrollStage } from "@/components/ui/ScrollStage";
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
type ViewMode = "posters" | "schedule";

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
  if (value === "schedule" || value === "ledger") {
    return "schedule";
  }
  return "posters";
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
  const searchInputRef = useRef<HTMLInputElement>(null);

  const urlQuery = searchParams.get("q") ?? "";
  const statusFilter = parseStatusParam(searchParams.get("status"));
  const trackFilter = parseTrackParam(searchParams.get("track"));
  const viewMode = parseViewParam(searchParams.get("view"));

  const [queryOverride, setQueryOverride] = useState<{
    base: string;
    value: string;
  } | null>(null);
  const [hoveredTrack, setHoveredTrack] = useState<TrackFilter | null>(null);
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
      if (nextView !== "posters") params.set("view", nextView);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const updateQuery = useCallback(
    (next: string) => {
      setQueryOverride({ base: urlQuery, value: next });
      syncUrl(next, statusFilter, trackFilter, viewMode);
    },
    [urlQuery, statusFilter, trackFilter, viewMode, syncUrl]
  );

  const updateStatus = useCallback(
    (next: StatusFilter) => {
      syncUrl(query, next, trackFilter, viewMode);
    },
    [query, trackFilter, viewMode, syncUrl]
  );

  const updateTrack = useCallback(
    (next: TrackFilter) => {
      syncUrl(query, statusFilter, next, viewMode);
    },
    [query, statusFilter, viewMode, syncUrl]
  );

  const updateView = useCallback(
    (next: ViewMode) => {
      syncUrl(query, statusFilter, trackFilter, next);
    },
    [query, statusFilter, trackFilter, syncUrl]
  );

  // Keyboard shortcuts: / (search), Esc (clear/blur), G (Posters), L (Schedule), 1-4 (tracks), 0 (All)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;

      const target = event.target as HTMLElement | null;
      const isEditing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;

      if (event.key === "Escape") {
        if (document.activeElement === searchInputRef.current) {
          event.preventDefault();
          if (query.length > 0) {
            updateQuery("");
          } else {
            searchInputRef.current?.blur();
          }
        } else if (!isEditing && query.length > 0) {
          event.preventDefault();
          updateQuery("");
        }
        return;
      }

      if (isEditing) return;

      if (event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      } else if (event.key === "g" || event.key === "G") {
        event.preventDefault();
        updateView("posters");
      } else if (event.key === "l" || event.key === "L") {
        event.preventDefault();
        updateView("schedule");
      } else if (event.key === "0") {
        event.preventDefault();
        updateTrack("All");
      } else if (event.key >= "1" && event.key <= "4") {
        const idx = Number(event.key) - 1;
        const chosen = EVENT_TRACKS[idx];
        if (chosen) {
          event.preventDefault();
          updateTrack(trackFilter === chosen ? "All" : chosen);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [query, trackFilter, updateQuery, updateTrack, updateView]);

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
    <div className="space-y-5 sm:space-y-7">
      {/* Compact 2-Row Mobile Utility Bar / Full Desktop Toolbar */}
      <div className="space-y-3 border-b border-hairline pb-4 sm:space-y-4 sm:pb-5">
        {/* Row 1: Search Input + Compact Posters/Schedule Toggle on same line on mobile */}
        <div className="flex items-center gap-2 lg:justify-between lg:gap-3">
          <div className="group relative min-w-0 flex-1 rounded-lg border border-hairline bg-surface transition-[border-color,box-shadow] duration-200 focus-within:border-gdg-blue/70 focus-within:ring-2 focus-within:ring-[#4285F4]/20 lg:max-w-md">
            <label htmlFor="events-search-input" className="sr-only">
              Search events by title, topic, or speaker
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted transition-colors group-focus-within:text-gdg-blue-ink sm:left-3.5"
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              id="events-search-input"
              type="search"
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              placeholder="Search sessions..."
              className="w-full rounded-lg bg-transparent py-2 pr-10 pl-9 text-sm text-ink placeholder:text-ink-muted focus:outline-none sm:py-2.5 sm:pr-12 sm:pl-10"
            />
            <AnimatePresence mode="wait" initial={false}>
              {query.length > 0 ? (
                <m.button
                  key="events-clear-search"
                  type="button"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ type: "spring", stiffness: 480, damping: 28 }}
                  onClick={() => updateQuery("")}
                  aria-label="Clear search query"
                  className="absolute top-1/2 right-1 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </m.button>
              ) : (
                <m.kbd
                  key="events-slash-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.14 }}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded border border-hairline bg-canvas px-1.5 py-0.5 font-mono text-xs text-ink-muted lg:inline-flex"
                >
                  /
                </m.kbd>
              )}
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {/* Desktop Segmented Status Toggle (mobile status chips sit in Row 2 horizontal strip) */}
            <div
              role="group"
              aria-label="Filter sessions by schedule status"
              className="hidden rounded-lg border border-hairline bg-surface p-1 md:inline-flex"
            >
              {STATUS_OPTIONS.map((option) => {
                const active = statusFilter === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => updateStatus(option.value)}
                    className={`rounded-md px-3.5 py-2 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
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

            {/* Posters / Schedule View Switcher (compact icons on < sm, labeled on sm+) */}
            <div
              role="group"
              aria-label="Choose events display layout"
              className="inline-flex rounded-lg border border-hairline bg-surface p-1"
            >
              <button
                type="button"
                aria-pressed={viewMode === "posters"}
                aria-label="Posters grid view"
                onClick={() => updateView("posters")}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:px-3 sm:py-2 ${
                  viewMode === "posters"
                    ? "bg-ink text-canvas"
                    : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                }`}
              >
                <LayoutGrid className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Posters</span>
                <kbd
                  aria-hidden="true"
                  className={`ml-0.5 hidden rounded border px-1 py-0 text-[11px] lg:inline ${
                    viewMode === "posters"
                      ? "border-canvas/30 text-canvas/80"
                      : "border-hairline text-ink-muted"
                  }`}
                >
                  G
                </kbd>
              </button>
              <button
                type="button"
                aria-pressed={viewMode === "schedule"}
                aria-label="Schedule list view"
                onClick={() => updateView("schedule")}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:px-3 sm:py-2 ${
                  viewMode === "schedule"
                    ? "bg-ink text-canvas"
                    : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                }`}
              >
                <List className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Schedule</span>
                <kbd
                  aria-hidden="true"
                  className={`ml-0.5 hidden rounded border px-1 py-0 text-[11px] lg:inline ${
                    viewMode === "schedule"
                      ? "border-canvas/30 text-canvas/80"
                      : "border-hairline text-ink-muted"
                  }`}
                >
                  L
                </kbd>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Single-line horizontally scrollable chip strip on mobile; wrapped filter bar on desktop */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
          <LayoutGroup id="events-track-filters">
            <div
              role="group"
              aria-label="Filter sessions by status and technical track"
              onMouseLeave={() => setHoveredTrack(null)}
              className="flex items-center gap-2 overflow-x-auto pb-1 whitespace-nowrap no-scrollbar md:flex-wrap md:overflow-visible md:pb-0"
            >
              {/* Mobile-only Status Chips inline in Row 2 */}
              <div className="flex shrink-0 items-center gap-1.5 md:hidden">
                {STATUS_OPTIONS.map((option) => {
                  const active = statusFilter === option.value;
                  return (
                    <button
                      key={`mob-status-${option.value}`}
                      type="button"
                      aria-pressed={active}
                      onClick={() => updateStatus(option.value)}
                      className={`inline-flex min-h-[34px] shrink-0 items-center rounded-lg border px-3 py-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                        active
                          ? "border-ink bg-ink text-canvas"
                          : "border-hairline bg-surface text-ink-muted"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
                <span
                  aria-hidden="true"
                  className="mx-0.5 h-4 w-px shrink-0 bg-hairline"
                />
              </div>

              <button
                type="button"
                aria-pressed={trackFilter === "All"}
                onMouseEnter={() => setHoveredTrack("All")}
                onFocus={() => setHoveredTrack("All")}
                onBlur={() => setHoveredTrack(null)}
                onClick={() => updateTrack("All")}
                className={`relative inline-flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:min-h-[36px] sm:px-3.5 sm:py-1.5 ${
                  trackFilter === "All"
                    ? "border-ink bg-ink text-canvas"
                    : "border-hairline bg-canvas text-ink-muted hover:text-ink"
                }`}
              >
                {hoveredTrack === "All" && trackFilter !== "All" && (
                  <m.span
                    layoutId="events-track-hover"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="pointer-events-none absolute inset-0 rounded-lg bg-surface-muted/90"
                  />
                )}
                <span className="relative z-10">All Tracks</span>
                <kbd
                  aria-hidden="true"
                  className="relative z-10 hidden font-mono text-[11px] opacity-70 lg:inline"
                >
                  0
                </kbd>
              </button>

              {EVENT_TRACKS.map((track, idx) => {
                const active = trackFilter === track;
                const hovered = hoveredTrack === track && !active;
                const styles = getTrackStyles(track);
                return (
                  <button
                    key={track}
                    type="button"
                    aria-pressed={active}
                    onMouseEnter={() => setHoveredTrack(track)}
                    onFocus={() => setHoveredTrack(track)}
                    onBlur={() => setHoveredTrack(null)}
                    onClick={() => updateTrack(track)}
                    className={`relative inline-flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:min-h-[36px] sm:px-3.5 sm:py-1.5 ${
                      active
                        ? styles.badge
                        : "border-hairline bg-canvas text-ink-muted hover:text-ink"
                    }`}
                  >
                    {hovered && (
                      <m.span
                        layoutId="events-track-hover"
                        aria-hidden="true"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="pointer-events-none absolute inset-0 rounded-lg bg-surface-muted/90"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={`relative z-10 h-1.5 w-1.5 rounded-full ${
                        active && track === "Android"
                          ? "bg-[#111827] dark:bg-[#FDD663]"
                          : styles.dot
                      }`}
                    />
                    <span className="relative z-10">{track}</span>
                    <kbd
                      aria-hidden="true"
                      className="relative z-10 hidden font-mono text-[11px] opacity-65 lg:inline"
                    >
                      {idx + 1}
                    </kbd>
                  </button>
                );
              })}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:min-h-[38px] sm:px-3 sm:py-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </LayoutGroup>

          <p
            aria-live="polite"
            className="hidden font-mono text-xs text-ink-muted sm:block"
          >
            Showing{" "}
            <span className="font-semibold text-ink tabular-nums">
              {filteredEvents.length}
            </span>{" "}
            of {events.length} sessions
          </p>
        </div>
      </div>

      {/* Results: Shared-Element FLIP Posters Grid <-> Schedule List inside ScrollStage */}
      <ScrollStage>
        <LayoutGroup id="events-explorer">
        {filteredEvents.length > 0 ? (
          viewMode === "schedule" ? (
            <div>
              {/* Desktop Schedule Column Labels */}
              <div className="hidden grid-cols-12 gap-4 border-b border-hairline pb-2.5 font-mono text-xs font-semibold text-ink-muted md:grid md:px-3">
                <span className="col-span-3">Date &amp; Time</span>
                <span className="col-span-2">Track</span>
                <span className="col-span-4">Session</span>
                <span className="col-span-3 text-right">Venue &amp; Mode</span>
              </div>

              <ul className="divide-y divide-hairline border-b border-hairline">
                <AnimatePresence mode="popLayout">
                  {filteredEvents.map((event) => {
                    const styles = getTrackStyles(event.track);
                    const isUpcoming = event.status === "upcoming";
                    return (
                      <m.li
                        key={event.slug}
                        layout
                        layoutId={`event-card-${event.slug}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 360,
                          damping: 32,
                        }}
                      >
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
                            <m.span
                              layout="position"
                              layoutId={`event-badge-${event.slug}`}
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 32,
                              }}
                              className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-semibold ${styles.badge}`}
                            >
                              {event.track}
                            </m.span>
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
                            <m.p
                              layout="position"
                              layoutId={`event-title-${event.slug}`}
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 34,
                              }}
                              className="text-base font-bold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink"
                            >
                              {event.title}
                            </m.p>
                            <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
                              {event.tagline}
                            </p>
                          </div>

                          {/* Venue, Mode & Directional Cue */}
                          <div className="flex items-center justify-between gap-3 font-mono text-xs text-ink-muted md:col-span-3 md:justify-end">
                            <div className="min-w-0 md:text-right">
                              <p className="inline-flex max-w-full items-center gap-1.5 font-medium text-ink">
                                <MapPin
                                  className="h-3.5 w-3.5 shrink-0 text-gdg-red"
                                  aria-hidden="true"
                                />
                                <span className="truncate">{event.venue}</span>
                              </p>
                              <p className="mt-0.5 text-ink-muted">
                                {event.mode}
                              </p>
                            </div>
                            <ArrowRight
                              className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gdg-blue-ink"
                              aria-hidden="true"
                            />
                          </div>
                        </Link>
                      </m.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </AnimatePresence>
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
                    alternateStatusCount === 1
                      ? "session exists"
                      : "sessions exist"
                  } under another schedule window.`
                : "Try clearing your search term or switching back to all tracks and schedule dates."}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {alternateStatusCount > 0 && (
                <button
                  type="button"
                  onClick={() => updateStatus("all")}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#1A73E8] px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-150 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
                >
                  <span>Show all dates</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleReset}
                className={`inline-flex min-h-[42px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-transform duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
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
      </LayoutGroup>
      </ScrollStage>
    </div>
  );
}
