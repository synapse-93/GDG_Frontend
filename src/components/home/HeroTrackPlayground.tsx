"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as m from "motion/react-m";
import { LayoutGroup } from "motion/react";
import { useTheme } from "next-themes";
import { ArrowRight, MapPin, Terminal } from "lucide-react";
import { DomainArtwork, type DomainKey } from "@/components/brand/DomainArtwork";
import { events, getUpcomingEvents } from "@/data/events";
import { siteConfig, type CommunityPillar } from "@/data/site";
import { TEAM_VERTICALS, teamMembers } from "@/data/team";

const TRACK_TO_DOMAIN: Record<CommunityPillar["trackFilter"], DomainKey> = {
  Web: "web",
  "AI / ML": "ai",
  Cloud: "cloud",
  Android: "android",
};

const QUICK_COMMANDS = [
  "next",
  "events",
  "tracks",
  "team",
  "theme",
  "help",
  "clear",
] as const;

interface TerminalEntry {
  id: string;
  command: string;
  lines: { text: string; href?: string; linkLabel?: string }[];
}

const SHAPE_THEMES = [
  {
    bg: "bg-[#1765CC] text-white",
    subInk: "text-white",
    shapeClass: "rounded-t-[52px] rounded-b-2xl",
    ringClass: "border-white/95 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.45)]",
    badge: "bg-white text-[#111827]",
    activePill: "bg-[#0F4C9E] text-white",
    artTone: "auto" as const,
  },
  {
    bg: "bg-[#137333] text-white",
    subInk: "text-white",
    shapeClass: "rounded-[36px]",
    ringClass: "border-white/95 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.45)]",
    badge: "bg-white text-[#111827]",
    activePill: "bg-[#0D5225] text-white",
    artTone: "auto" as const,
  },
  {
    bg: "bg-[#C5221F] text-white",
    subInk: "text-white",
    shapeClass: "rounded-[44px]",
    ringClass: "border-white/95 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.45)]",
    badge: "bg-white text-[#111827]",
    activePill: "bg-[#961816] text-white",
    artTone: "auto" as const,
  },
  {
    // Android — Yellow M3 Starburst (STRICT #111827 dark ink)
    bg: "bg-[#FBBC04] text-[#111827]",
    subInk: "text-[#111827]",
    shapeClass: "rounded-[24px]",
    ringClass: "border-[#111827] shadow-[inset_0_0_0_2px_rgba(17,24,39,0.28)]",
    badge: "bg-[#111827] text-[#FAF9F6]",
    activePill: "bg-[#111827] text-[#FAF9F6]",
    artTone: "on-yellow" as const,
  },
] as const;

function ExpressiveMotif({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-4 -bottom-4 h-24 w-24 opacity-25"
      >
        <path
          d="M16 120V58C16 33.7 35.7 14 60 14C84.3 14 104 33.7 104 58V120H16Z"
          fill="#A8C7FA"
        />
        <rect x="40" y="44" width="40" height="76" rx="20" fill="#0F4C9E" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-4 -bottom-4 h-24 w-24 opacity-25"
      >
        <circle cx="42" cy="42" r="28" fill="#A8DAB5" />
        <circle cx="78" cy="42" r="28" fill="#A8DAB5" />
        <circle cx="42" cy="78" r="28" fill="#A8DAB5" />
        <circle cx="78" cy="78" r="28" fill="#A8DAB5" />
        <circle cx="60" cy="60" r="16" fill="#0D5225" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-4 -bottom-3 h-24 w-24 opacity-25"
      >
        <rect x="10" y="22" width="104" height="40" rx="20" fill="#FAD2CF" />
        <rect x="28" y="68" width="88" height="36" rx="18" fill="#961816" />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className="pointer-events-none absolute -right-4 -bottom-4 h-24 w-24 opacity-15"
    >
      <rect x="24" y="24" width="72" height="72" rx="20" fill="#111827" />
      <rect
        x="24"
        y="24"
        width="72"
        height="72"
        rx="20"
        transform="rotate(30 60 60)"
        fill="#111827"
      />
      <rect
        x="24"
        y="24"
        width="72"
        height="72"
        rx="20"
        transform="rotate(60 60 60)"
        fill="#111827"
      />
    </svg>
  );
}

export function HeroTrackPlayground() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [commandInput, setCommandInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([]);

  const activePillar = siteConfig.pillars[activeIndex];
  const activeDomain = TRACK_TO_DOMAIN[activePillar.trackFilter];
  const matchingEvents = events.filter(
    (ev) => ev.track === activePillar.trackFilter
  );

  const runCommand = (raw: string) => {
    const cleaned = raw.trim();
    const parts = cleaned.toLowerCase().split(/\s+/);
    const cmd = parts[0] ?? "";
    const arg = parts.slice(1).join(" ");

    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setCommandInput("");
      return;
    }

    let lines: TerminalEntry["lines"] = [];

    if (cmd === "next") {
      const upcoming = getUpcomingEvents()[0];
      if (upcoming) {
        lines = [
          {
            text: `${upcoming.title} (${upcoming.track})`,
            href: `/events/${upcoming.slug}`,
            linkLabel: "Open event",
          },
          {
            text: `${upcoming.dateDisplay} · ${upcoming.timeDisplay} · ${upcoming.venue}`,
          },
        ];
      } else {
        lines = [{ text: "No upcoming sessions scheduled yet." }];
      }
    } else if (cmd === "events") {
      const upcomingCount = events.filter((e) => e.status === "upcoming").length;
      const pastCount = events.filter((e) => e.status === "past").length;
      if (arg === "open") {
        router.push("/events");
        lines = [{ text: "Opening /events directory..." }];
      } else {
        lines = [
          {
            text: `${events.length} chapter sessions (${upcomingCount} upcoming, ${pastCount} past)`,
            href: "/events",
            linkLabel: "Browse /events",
          },
          ...getUpcomingEvents()
            .slice(0, 2)
            .map((ev) => ({
              text: `${ev.dateDisplay} — ${ev.title}`,
              href: `/events/${ev.slug}`,
              linkLabel: "Details",
            })),
        ];
      }
    } else if (cmd === "tracks") {
      if (arg) {
        const matchIdx = siteConfig.pillars.findIndex(
          (p) =>
            p.trackFilter.toLowerCase().includes(arg) ||
            p.shortLabel.toLowerCase().includes(arg) ||
            p.title.toLowerCase().includes(arg)
        );
        if (matchIdx !== -1) {
          setActiveIndex(matchIdx);
          const matched = siteConfig.pillars[matchIdx];
          lines = [
            {
              text: `Switched active track to ${matched.title} (${matched.campusLab})`,
              href: `/events?track=${encodeURIComponent(matched.trackFilter)}`,
              linkLabel: "Filter events",
            },
          ];
        } else {
          lines = [
            { text: `Unknown track "${arg}". Try: web, ai, cloud, or android.` },
          ];
        }
      } else {
        lines = siteConfig.pillars.map((p) => {
          const count = events.filter((e) => e.track === p.trackFilter).length;
          return {
            text: `${p.shortLabel} — ${p.title} (${count} ${count === 1 ? "session" : "sessions"})`,
            href: `/events?track=${encodeURIComponent(p.trackFilter)}`,
            linkLabel: "View",
          };
        });
      }
    } else if (cmd === "team") {
      if (arg === "open") {
        router.push("/team");
        lines = [{ text: "Opening /team directory..." }];
      } else {
        lines = [
          {
            text: `${teamMembers.length} chapter organizers across ${TEAM_VERTICALS.length} verticals`,
            href: "/team",
            linkLabel: "Open /team",
          },
          {
            text: `Verticals: ${TEAM_VERTICALS.join(" · ")}`,
          },
        ];
      }
    } else if (cmd === "theme") {
      const currentlyDark = document.documentElement.classList.contains("dark");
      const nextTheme = currentlyDark ? "light" : "dark";
      setTheme(nextTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(nextTheme);
      document.documentElement.style.colorScheme = nextTheme;
      lines = [
        {
          text: `Theme switched to ${nextTheme === "dark" ? "Dark" : "Light"} mode.`,
        },
      ];
    } else if (cmd === "help") {
      lines = [
        { text: "next · Show next upcoming RVCE session" },
        { text: "events [open] · List sessions or jump to /events" },
        { text: "tracks [web|ai|cloud|android] · Inspect or switch track" },
        { text: "team [open] · View organizers or jump to /team" },
        { text: "theme · Toggle Light/Dark mode · clear · Reset output" },
      ];
    } else {
      lines = [
        {
          text: `Command "${cleaned}" not found. Try: next, events, tracks, team, theme, help, clear.`,
        },
      ];
    }

    setHistory((prev) => [
      ...prev.slice(-3),
      { id: `${Date.now()}-${prev.length}`, command: cleaned, lines },
    ]);
    setCommandInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(commandInput);
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

  return (
    <div className="space-y-4 lg:space-y-3.5">
      {/* 4-Color Material 3 Expressive Bento Track Switcher */}
      <LayoutGroup id="hero-track-stage">
        <div
          role="tablist"
          aria-label="Interactive Google track selector"
          className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:gap-3"
        >
          {siteConfig.pillars.map((pillar, idx) => {
            const isActive = idx === activeIndex;
            const theme = SHAPE_THEMES[idx];
            const domain = TRACK_TO_DOMAIN[pillar.trackFilter];

            return (
              <m.button
                key={pillar.trackFilter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(event) => handleKeyDown(event, idx)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className={`group relative flex min-h-[150px] flex-col justify-between overflow-hidden p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:min-h-[156px] sm:p-5 lg:min-h-[144px] lg:p-4 ${theme.bg} ${theme.shapeClass}`}
              >
                {isActive && (
                  <m.span
                    layoutId="active-track-ring"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className={`pointer-events-none absolute inset-0 border-2 ${theme.ringClass} ${theme.shapeClass}`}
                  />
                )}

                <ExpressiveMotif index={idx} />

                <div className="relative z-10 flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${theme.badge}`}
                    >
                      {pillar.shortLabel}
                    </span>
                    {isActive && (
                      <m.span
                        layoutId="active-track-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-xs font-bold ${theme.activePill}`}
                      >
                        Active
                      </m.span>
                    )}
                  </div>

                  <DomainArtwork
                    domain={domain}
                    size="sm"
                    tone={theme.artTone}
                    interactive
                    className="h-12 w-12 sm:h-14 sm:w-14"
                  />
                </div>

                <div className="relative z-10 mt-3">
                  <p className="text-base font-extrabold tracking-tight leading-tight sm:text-lg">
                    {pillar.title}
                  </p>
                  <p
                    className={`mt-1 line-clamp-1 font-mono text-xs font-medium ${theme.subInk}`}
                  >
                    {pillar.stackTags.slice(0, 2).join(" · ")}
                  </p>
                </div>
              </m.button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Real Interactive Chapter Mini-Terminal (Zero Fake Output) */}
      <div
        role="tabpanel"
        aria-label={`${activePillar.title} interactive terminal`}
        className="overflow-hidden rounded-2xl border border-hairline bg-[#111827] text-[#F8FAFC] dark:bg-[#141922]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/12 px-4 py-2.5 font-mono text-xs text-[#CBD5E1]">
          <span className="inline-flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-[#669DF6]" aria-hidden="true" />
            <span className="font-semibold text-white">
              {activePillar.title}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-[#F28B82]" aria-hidden="true" />
            <span>{activePillar.campusLab}</span>
          </span>
        </div>

        {/* Live Output / Active Track Details */}
        <div className="max-h-[164px] space-y-2.5 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed">
          {history.length === 0 ? (
            <div className="flex items-start gap-3">
              <div className="hidden shrink-0 sm:block">
                <DomainArtwork
                  domain={activeDomain}
                  size="sm"
                  tone="on-dark"
                  interactive
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                <p className="text-[#E2E8F0] text-pretty">
                  {activePillar.engineeringFocus}
                </p>
                {matchingEvents[0] && (
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#CBD5E1]">
                    <span className="text-[#81C995]">featured:</span>
                    <Link
                      href={`/events/${matchingEvents[0].slug}`}
                      className="font-semibold text-[#8AB4F8] underline decoration-[#8AB4F8]/45 underline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                    >
                      {matchingEvents[0].title}
                    </Link>
                    <span>({matchingEvents[0].dateDisplay})</span>
                  </p>
                )}
              </div>
            </div>
          ) : (
            history.map((entry) => (
              <div key={entry.id} className="space-y-1">
                <p className="text-[#94A3B8]">
                  <span className="text-[#81C995]">$</span> {entry.command}
                </p>
                {entry.lines.map((line, i) => (
                  <p
                    key={i}
                    className="flex flex-wrap items-center justify-between gap-2 pl-3 text-[#E2E8F0]"
                  >
                    <span>{line.text}</span>
                    {line.href && (
                      <Link
                        href={line.href}
                        className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#8AB4F8] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                      >
                        <span>{line.linkLabel ?? "Open"}</span>
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    )}
                  </p>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Interactive Prompt Input + Quick Command Chips */}
        <div className="space-y-2 border-t border-white/12 bg-white/[0.03] px-4 py-2.5">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <label htmlFor="hero-terminal-input" className="sr-only">
              Type a chapter terminal command such as next, events, tracks, team, theme, or help
            </label>
            <span className="font-mono text-xs font-bold text-[#81C995]">$</span>
            <input
              id="hero-terminal-input"
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Try: next, events, tracks, team, theme, help..."
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent font-mono text-xs text-white placeholder:text-[#94A3B8] focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md border border-white/15 bg-white/10 px-2 py-1 font-mono text-xs font-semibold text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            >
              Run
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => runCommand(cmd)}
                  className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-xs text-[#E2E8F0] transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <Link
              href={`/events?track=${encodeURIComponent(activePillar.trackFilter)}`}
              className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-xs font-semibold text-[#8AB4F8] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            >
              <span>{`${activePillar.shortLabel} sessions`}</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
