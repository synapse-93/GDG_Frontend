"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import * as m from "motion/react-m";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Calendar,
  Compass,
  Moon,
  Search,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";
import { EVENT_TRACKS, events } from "@/data/events";
import { teamMembers } from "@/data/team";

export const COMMAND_PALETTE_EVENT = "gdg-open-command-palette";

function subscribeToRootThemeClass(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getClientIsDark(): boolean {
  return document.documentElement.classList.contains("dark");
}

function getServerIsDark(): boolean {
  return false;
}

interface CommandItem {
  id: string;
  group: "Pages" | "Tracks" | "Events" | "Team Members" | "Theme";
  title: string;
  subtitle: string;
  keywords: string;
  dotColor?: string;
  href?: string;
  toggleTheme?: boolean;
}

const TRACK_DOT: Record<string, string> = {
  Web: "bg-[#4285F4] dark:bg-[#669DF6]",
  "AI / ML": "bg-[#34A853] dark:bg-[#81C995]",
  Cloud: "bg-[#EA4335] dark:bg-[#F28B82]",
  Android: "bg-[#FBBC04] dark:bg-[#FDD663]",
};

/**
 * Lightweight fuzzy scorer returning > 0 for matches (higher = better) or -1 for no match.
 * Rewards exact prefix, contiguous substring, word-boundary hits, and ordered subsequences.
 */
function fuzzyScore(haystack: string, rawQuery: string): number {
  const text = haystack.toLowerCase();
  const query = rawQuery.trim().toLowerCase();
  if (!query) return 1;

  const directIndex = text.indexOf(query);
  if (directIndex !== -1) {
    const boundaryBonus =
      directIndex === 0 || /[\s/·-]/.test(text[directIndex - 1] ?? "")
        ? 40
        : 0;
    return 120 + boundaryBonus - Math.min(directIndex, 60);
  }

  let score = 0;
  let qIdx = 0;
  let consecutive = 0;

  for (let i = 0; i < text.length && qIdx < query.length; i++) {
    if (text[i] === query[qIdx]) {
      consecutive += 1;
      const isBoundary = i === 0 || /[\s/·-]/.test(text[i - 1] ?? "");
      score += 10 + consecutive * 6 + (isBoundary ? 14 : 0);
      qIdx += 1;
    } else {
      consecutive = 0;
    }
  }

  return qIdx === query.length ? score : -1;
}

function scoreCommandItem(item: CommandItem, query: string): number {
  const titleScore = fuzzyScore(item.title, query);
  const subtitleScore = fuzzyScore(item.subtitle, query);
  const keywordScore = fuzzyScore(item.keywords, query);
  const groupScore = fuzzyScore(item.group, query);

  const best = Math.max(
    titleScore > 0 ? titleScore * 1.5 : -1,
    subtitleScore > 0 ? subtitleScore * 1.1 : -1,
    keywordScore,
    groupScore
  );

  return best;
}

export function CommandPalette() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  const isDark = useSyncExternalStore(
    subscribeToRootThemeClass,
    getClientIsDark,
    getServerIsDark
  );

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) {
          closePalette();
        } else {
          openPalette();
        }
      }
    };

    const handleCustomOpen = () => {
      openPalette();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(COMMAND_PALETTE_EVENT, handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(COMMAND_PALETTE_EVENT, handleCustomOpen);
    };
  }, [open, openPalette, closePalette]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      requestAnimationFrame(() => {
        previousFocusRef.current?.focus();
      });
    }
  }, [open]);

  const allItems = useMemo<CommandItem[]>(() => {
    const pages: CommandItem[] = [
      {
        id: "page-home",
        group: "Pages",
        title: "Home",
        subtitle: "GDG on Campus RVCE overview & interactive tracks",
        keywords: "home start landing overview rvce gdg",
        dotColor: "bg-[#4285F4] dark:bg-[#669DF6]",
        href: "/",
      },
      {
        id: "page-events",
        group: "Pages",
        title: "Events Directory",
        subtitle: "Browse workshops, study jams & Poster Grid or List View",
        keywords: "events workshops calendar schedule posters list",
        dotColor: "bg-[#34A853] dark:bg-[#81C995]",
        href: "/events",
      },
      {
        id: "page-team",
        group: "Pages",
        title: "Team Directory",
        subtitle: "Meet RVCE chapter organizers & view member profiles",
        keywords: "team organizers leads members profiles directory",
        dotColor: "bg-[#EA4335] dark:bg-[#F28B82]",
        href: "/team",
      },
    ];

    const tracks: CommandItem[] = EVENT_TRACKS.map((track) => ({
      id: `track-${track}`,
      group: "Tracks",
      title: `Track: ${track}`,
      subtitle: `Filter /events by ${track} sessions`,
      keywords: `track filter ${track.toLowerCase()}`,
      dotColor: TRACK_DOT[track],
      href: `/events?track=${encodeURIComponent(track)}`,
    }));

    const sessionItems: CommandItem[] = events.map((ev) => ({
      id: `event-${ev.slug}`,
      group: "Events",
      title: ev.title,
      subtitle: `${ev.dateDisplay} · ${ev.venue} · ${ev.track}`,
      keywords:
        `${ev.title} ${ev.track} ${ev.venue} ${ev.status} ${ev.tagline} ${ev.slug.replace(/-/g, " ")}`.toLowerCase(),
      dotColor: TRACK_DOT[ev.track],
      href: `/events/${ev.slug}`,
    }));

    const memberItems: CommandItem[] = teamMembers.map((member) => ({
      id: `team-${member.id}`,
      group: "Team Members",
      title: member.name,
      subtitle: `${member.role} · ${member.vertical}`,
      keywords:
        `${member.name} ${member.role} ${member.vertical} ${member.techStack.join(" ")}`.toLowerCase(),
      dotColor:
        member.accentColor === "blue"
          ? "bg-[#4285F4] dark:bg-[#669DF6]"
          : member.accentColor === "green"
            ? "bg-[#34A853] dark:bg-[#81C995]"
            : member.accentColor === "red"
              ? "bg-[#EA4335] dark:bg-[#F28B82]"
              : "bg-[#FBBC04] dark:bg-[#FDD663]",
      href: `/team?member=${encodeURIComponent(member.slug)}`,
    }));

    const themeItems: CommandItem[] = [
      {
        id: "theme-toggle",
        group: "Theme",
        title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
        subtitle: "Toggle Light / Dark appearance immediately",
        keywords: "theme dark light mode appearance toggle sun moon",
        toggleTheme: true,
      },
    ];

    return [...pages, ...tracks, ...sessionItems, ...memberItems, ...themeItems];
  }, [isDark]);

  const filteredItems = useMemo(() => {
    const q = query.trim();
    if (!q) {
      return allItems;
    }

    return allItems
      .map((item) => ({ item, score: scoreCommandItem(item, q) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);
  }, [allItems, query]);

  const clampedIndex =
    filteredItems.length === 0
      ? 0
      : Math.min(activeIndex, filteredItems.length - 1);

  const groupedItems = useMemo(() => {
    const groups: { group: CommandItem["group"]; items: CommandItem[] }[] = [];
    for (const item of filteredItems) {
      let existing = groups.find((g) => g.group === item.group);
      if (!existing) {
        existing = { group: item.group, items: [] };
        groups.push(existing);
      }
      existing.items.push(item);
    }
    return groups;
  }, [filteredItems]);

  const runCommand = (item: CommandItem | undefined) => {
    if (!item) return;
    if (item.toggleTheme) {
      setTheme(isDark ? "light" : "dark");
      closePalette();
      return;
    }
    if (item.href) {
      closePalette();
      router.push(item.href);
    }
  };

  const activeOptionId = filteredItems[clampedIndex]
    ? `cmd-option-${filteredItems[clampedIndex].id}`
    : undefined;

  useEffect(() => {
    if (!open || !activeOptionId || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(
      `#${CSS.escape(activeOptionId)}`
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [open, activeOptionId]);

  const handleDialogKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }

    if (event.key === "Tab") {
      const container = dialogRef.current;
      if (!container) return;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;

      const currentIdx = focusable.indexOf(
        document.activeElement as HTMLElement
      );
      event.preventDefault();
      if (event.shiftKey) {
        const prevIdx =
          currentIdx <= 0 ? focusable.length - 1 : currentIdx - 1;
        focusable[prevIdx]?.focus();
      } else {
        const nextIdx =
          currentIdx === -1 || currentIdx >= focusable.length - 1
            ? 0
            : currentIdx + 1;
        focusable[nextIdx]?.focus();
      }
      return;
    }

    if (filteredItems.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
      );
    } else if (event.key === "Enter") {
      if (document.activeElement === closeButtonRef.current) return;
      event.preventDefault();
      runCommand(filteredItems[clampedIndex]);
    }
  };

  if (!open) return null;

  const flatIndexMap = new Map<string, number>();
  filteredItems.forEach((item, idx) => flatIndexMap.set(item.id, idx));

  const renderGroupIcon = (group: CommandItem["group"]) => {
    switch (group) {
      case "Pages":
        return <Compass className="h-3.5 w-3.5" aria-hidden="true" />;
      case "Tracks":
        return <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />;
      case "Events":
        return <Calendar className="h-3.5 w-3.5" aria-hidden="true" />;
      case "Team Members":
        return <Users className="h-3.5 w-3.5" aria-hidden="true" />;
      case "Theme":
        return isDark ? (
          <Sun className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Moon className="h-3.5 w-3.5" aria-hidden="true" />
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#111827]/40 px-4 pt-16 backdrop-blur-[2px] dark:bg-black/65 sm:pt-24"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePalette();
        }
      }}
    >
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Quick command navigation"
        onKeyDown={handleDialogKeyDown}
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 460, damping: 34 }}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-hairline bg-surface shadow-[0_24px_64px_rgba(12,15,20,0.24)]"
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
          <Search
            className="h-4 w-4 shrink-0 text-ink-muted"
            aria-hidden="true"
          />
          <label htmlFor="gdg-command-input" className="sr-only">
            Search events, tracks, team members, or switch theme
          </label>
          <input
            ref={inputRef}
            id="gdg-command-input"
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="gdg-command-listbox"
            aria-activedescendant={activeOptionId}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search events, team members, tracks, or switch theme..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closePalette}
            aria-label="Close command palette"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Command List */}
        <div
          ref={listRef}
          id="gdg-command-listbox"
          role="listbox"
          aria-label="Available commands"
          className="max-h-[min(60vh,420px)] overflow-y-auto py-2"
        >
          {groupedItems.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-sm font-semibold text-ink">
                No matching results
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                Try searching for &ldquo;Linux&rdquo;, &ldquo;AI&rdquo;,
                &ldquo;Team&rdquo;, or &ldquo;Dark&rdquo;.
              </p>
            </div>
          ) : (
            groupedItems.map(({ group, items }) => (
              <div key={group} className="mb-2 last:mb-0">
                <div className="flex items-center gap-2 px-4 py-1.5 font-mono text-xs font-semibold text-ink-muted">
                  {renderGroupIcon(group)}
                  <span>{group}</span>
                </div>
                <div className="px-2">
                  {items.map((item) => {
                    const flatIdx = flatIndexMap.get(item.id) ?? 0;
                    const isActive = flatIdx === clampedIndex;
                    return (
                      <button
                        key={item.id}
                        id={`cmd-option-${item.id}`}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        tabIndex={-1}
                        onMouseEnter={() => setActiveIndex(flatIdx)}
                        onClick={() => runCommand(item)}
                        className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${isActive
                            ? "bg-surface-muted text-ink"
                            : "text-ink-muted hover:bg-surface-muted/70 hover:text-ink"
                          }`}
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          {item.dotColor ? (
                            <span
                              aria-hidden="true"
                              className={`h-2 w-2 shrink-0 rounded-full ${item.dotColor}`}
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="h-2 w-2 shrink-0 rounded-full bg-hairline"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-ink">
                              {item.title}
                            </p>
                            <p className="truncate font-mono text-xs text-ink-muted">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <ArrowRight
                          className={`h-3.5 w-3.5 shrink-0 transition-transform ${isActive
                              ? "translate-x-0.5 text-gdg-blue-ink"
                              : "text-ink-muted/60"
                            }`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Keyboard Hints Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline bg-canvas px-4 py-2.5 font-mono text-xs text-ink-muted">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>
          <span>GDG on Campus RVCE</span>
        </div>
      </m.div>
    </div>
  );
}
