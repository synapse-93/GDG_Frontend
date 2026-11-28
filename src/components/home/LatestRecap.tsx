"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import { AnimatePresence, LayoutGroup } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  FileCode2,
  MapPin,
  Maximize2,
  X,
} from "lucide-react";
import { GridCrosshairs } from "@/components/ui/GridCrosshairs";
import { KineticText } from "@/components/ui/KineticText";
import { ScrollStage } from "@/components/ui/ScrollStage";
import { getEventBySlug } from "@/data/events";
import { siteConfig, type RecapHighlightTile } from "@/data/site";
import { getTrackStyles } from "@/lib/accents";

const TILE_THEME: Record<
  RecapHighlightTile["accentColor"],
  { bg: string; ink: string; mutedInk: string; pill: string; border: string }
> = {
  blue: {
    bg: "bg-[#1765CC]",
    ink: "text-white",
    mutedInk: "text-[#DCEAFF]",
    pill: "bg-white text-[#111827]",
    border: "border-[#1765CC]/30",
  },
  green: {
    bg: "bg-[#137333]",
    ink: "text-white",
    mutedInk: "text-[#DCF5E3]",
    pill: "bg-white text-[#111827]",
    border: "border-[#137333]/30",
  },
  red: {
    bg: "bg-[#C5221F]",
    ink: "text-white",
    mutedInk: "text-[#FDE5E3]",
    pill: "bg-white text-[#111827]",
    border: "border-[#C5221F]/30",
  },
  yellow: {
    // Strictly dark #111827 ink on Google Yellow
    bg: "bg-[#FBBC04]",
    ink: "text-[#111827]",
    mutedInk: "text-[#111827]",
    pill: "bg-[#111827] text-[#FAF9F6]",
    border: "border-[#D99B00]/50",
  },
};

/**
 * Original editorial inline SVG scenes for the DevFest Campus Warmup contact sheet.
 * Zero external image hotlinks; flat Google M3 geometry with crisp contrast.
 */
function RecapSceneArtwork({ scene }: { scene: RecapHighlightTile["scene"] }) {
  if (scene === "teardown") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 280 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <rect x="18" y="22" width="110" height="86" rx="18" fill="#0F4C9E" />
        <path
          d="M60 52L44 65L60 78M86 52L102 65L86 78"
          stroke="#A8C7FA"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M138 65H172"
          stroke="#FAF9F6"
          strokeWidth="4"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
        <rect x="176" y="18" width="86" height="38" rx="14" fill="#FAF9F6" />
        <circle cx="196" cy="37" r="7" fill="#34A853" />
        <rect x="210" y="33" width="38" height="8" rx="4" fill="#1765CC" />
        <rect x="176" y="72" width="86" height="38" rx="14" fill="#4285F4" />
        <circle cx="196" cy="91" r="7" fill="#FBBC04" />
        <rect x="210" y="87" width="38" height="8" rx="4" fill="#FAF9F6" />
      </svg>
    );
  }

  if (scene === "flamegraph") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 280 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <rect x="18" y="18" width="244" height="22" rx="11" fill="#0D5225" />
        <rect x="18" y="48" width="146" height="22" rx="11" fill="#FAF9F6" />
        <rect x="172" y="48" width="90" height="22" rx="11" fill="#A8DAB5" />
        <rect x="18" y="78" width="84" height="22" rx="11" fill="#FBBC04" />
        <rect x="110" y="78" width="96" height="22" rx="11" fill="#34A853" />
        <rect x="214" y="78" width="48" height="22" rx="11" fill="#FAF9F6" />
        <circle cx="242" cy="29" r="5" fill="#81C995" />
        <circle cx="224" cy="29" r="5" fill="#FBBC04" />
      </svg>
    );
  }

  if (scene === "postmortem") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 280 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <rect x="20" y="18" width="240" height="94" rx="22" fill="#961816" />
        <rect x="36" y="34" width="112" height="26" rx="13" fill="#FAF9F6" />
        <circle cx="52" cy="47" r="6" fill="#EA4335" />
        <rect x="66" y="43" width="66" height="8" rx="4" fill="#111827" />
        <rect x="36" y="70" width="154" height="26" rx="13" fill="#FAD2CF" />
        <path
          d="M50 83L55 88L65 78"
          stroke="#137333"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="76" y="79" width="96" height="8" rx="4" fill="#961816" />
        <circle cx="224" cy="65" r="22" fill="#FBBC04" />
        <path
          d="M224 55V67M224 74V75"
          stroke="#111827"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // starterkit (Yellow surface -> high-contrast #111827 ink geometry)
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <rect x="22" y="20" width="108" height="90" rx="20" fill="#111827" />
      <rect x="36" y="36" width="80" height="14" rx="7" fill="#FBBC04" />
      <rect x="36" y="58" width="54" height="10" rx="5" fill="#FAF9F6" />
      <rect x="36" y="76" width="66" height="10" rx="5" fill="#A8C7FA" />
      <rect x="148" y="20" width="110" height="40" rx="16" fill="#FAF9F6" stroke="#111827" strokeWidth="3" />
      <circle cx="170" cy="40" r="8" fill="#1765CC" />
      <circle cx="194" cy="40" r="8" fill="#137333" />
      <circle cx="218" cy="40" r="8" fill="#C5221F" />
      <rect x="148" y="70" width="110" height="40" rx="16" fill="#111827" />
      <path
        d="M180 90L192 98L214 82"
        stroke="#81C995"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LatestRecap() {
  const { latestRecap } = siteConfig;
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  const linkedEvent = getEventBySlug(latestRecap.eventSlug);
  const trackStyles = linkedEvent ? getTrackStyles(linkedEvent.track) : null;
  const activeTile =
    latestRecap.takeawayTabs.find((tile) => tile.id === selectedTileId) ?? null;

  const handleClose = useCallback(() => {
    setSelectedTileId(null);
  }, []);

  useEffect(() => {
    if (activeTile) {
      if (!wasOpenRef.current) {
        previousFocusRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
      }
      wasOpenRef.current = true;
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          handleClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      requestAnimationFrame(() => {
        previousFocusRef.current?.focus();
      });
    }
  }, [activeTile, handleClose]);

  return (
    <section
      aria-labelledby="latest-recap-heading"
      className="relative border-b border-hairline bg-surface-muted/45 py-10 sm:py-16 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center lg:py-14"
    >
      <ScrollStage className="w-full">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <LayoutGroup id="recap-contact-sheet">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left: Editorial Recap Summary + 3 Concrete Takeaways (5 cols) */}
              <div className="lg:col-span-5">
                <p className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-[1.5px] bg-[#EA4335]"
                  />
                  <span>Latest Recap</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-muted">
                  <span
                    className={`inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold ${
                      trackStyles
                        ? trackStyles.badge
                        : "border-hairline bg-surface text-ink"
                    }`}
                  >
                    {latestRecap.track}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar
                      className="h-3.5 w-3.5 text-gdg-blue"
                      aria-hidden="true"
                    />
                    {latestRecap.dateDisplay}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin
                      className="h-3.5 w-3.5 text-gdg-red"
                      aria-hidden="true"
                    />
                    {latestRecap.venue}
                  </span>
                </div>

                <h2
                  id="latest-recap-heading"
                  className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.08]"
                >
                  <KineticText text={latestRecap.title} />
                </h2>

                <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
                  {latestRecap.summary}
                </p>

                {/* 3 Concrete Session Takeaways */}
                <ul className="mt-6 space-y-3 border-t border-hairline pt-5">
                  {latestRecap.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-gdg-green"
                        aria-hidden="true"
                      />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  {latestRecap.resources.map((resource) => {
                    const isInternal = resource.href.startsWith("/");
                    if (isInternal) {
                      return (
                        <Link
                          key={resource.href}
                          href={resource.href}
                          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#1A73E8] px-5 py-2.5 text-sm font-bold text-white transition-spring hover:-translate-y-0.5 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8] sm:w-auto"
                        >
                          <span>{resource.label}</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      );
                    }

                    return (
                      <a
                        key={resource.href}
                        href={resource.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-hairline bg-surface px-5 py-2.5 text-sm font-bold text-ink transition-spring hover:-translate-y-0.5 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:w-auto"
                      >
                        <span>{resource.label}</span>
                        <ArrowUpRight
                          className="h-4 w-4 text-ink-muted"
                          aria-hidden="true"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Right: Interactive Campus Contact Sheet Bento (7 cols) */}
              <div className="space-y-4 lg:col-span-7">
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-ink-muted">
                  <span>Session highlights</span>
                  <span>
                    {linkedEvent
                      ? `${linkedEvent.agenda.length} blocks archived`
                      : "4 blocks archived"}
                  </span>
                </div>

                <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0">
                  {latestRecap.takeawayTabs.map((tile) => {
                    const theme = TILE_THEME[tile.accentColor];
                    return (
                      <m.button
                        key={tile.id}
                        type="button"
                        layoutId={`recap-tile-${tile.id}`}
                        onClick={() => setSelectedTileId(tile.id)}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        className={`gdg-card-bevel group flex w-[78vw] max-w-[300px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-xl border text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:w-auto sm:max-w-none ${theme.bg} ${theme.border}`}
                      >
                        {/* Original Editorial Scene Illustration */}
                        <div className="flex items-center justify-between gap-2 px-4 pt-4">
                          <span
                            className={`inline-flex items-center rounded-md px-2.5 py-0.5 font-mono text-xs font-bold ${theme.pill}`}
                          >
                            {tile.label}
                          </span>
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${
                              tile.accentColor === "yellow"
                                ? "bg-[#111827]/12 text-[#111827]"
                                : "bg-white/15 text-white"
                            }`}
                          >
                            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                        </div>

                        <div className="h-28 w-full px-2 pt-2">
                          <RecapSceneArtwork scene={tile.scene} />
                        </div>

                        <div className="space-y-1.5 px-4 pb-4 pt-2">
                          <h3
                            className={`text-base font-extrabold tracking-tight leading-snug ${theme.ink}`}
                          >
                            {tile.headline}
                          </h3>
                          <p
                            className={`inline-flex items-center gap-1.5 font-mono text-xs font-medium ${theme.mutedInk}`}
                          >
                            <FileCode2
                              className="h-3.5 w-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="truncate">{tile.artifact}</span>
                          </p>
                        </div>
                      </m.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Accessible layoutId-Morphed Lightbox Modal */}
            <AnimatePresence>
              {activeTile && (
                <m.div
                  key="recap-lightbox-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onMouseDown={(event) => {
                    if (event.target === event.currentTarget) {
                      handleClose();
                    }
                  }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/55 p-4 backdrop-blur-[2px] dark:bg-black/70"
                >
                  <m.div
                    layoutId={`recap-tile-${activeTile.id}`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="recap-lightbox-title"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                    className="gdg-card-bevel w-full max-w-xl overflow-hidden rounded-xl border border-hairline bg-surface"
                  >
                    {/* Enlarged Editorial Scene Header */}
                    <div
                      className={`relative p-5 sm:p-6 ${TILE_THEME[activeTile.accentColor].bg}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs font-bold ${TILE_THEME[activeTile.accentColor].pill}`}
                        >
                          {activeTile.label}
                        </span>
                        <button
                          ref={closeButtonRef}
                          type="button"
                          onClick={handleClose}
                          aria-label="Close highlight preview"
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                            activeTile.accentColor === "yellow"
                              ? "bg-[#111827] text-[#FAF9F6] hover:bg-[#1F2937]"
                              : "bg-white/20 text-white hover:bg-white/30"
                          }`}
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-4 h-40 w-full sm:h-44">
                        <RecapSceneArtwork scene={activeTile.scene} />
                      </div>
                    </div>

                    {/* Expanded Highlight Note & Starter-Kit Link */}
                    <div className="space-y-4 p-6">
                      <h3
                        id="recap-lightbox-title"
                        className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl"
                      >
                        {activeTile.headline}
                      </h3>
                      <p className="text-sm leading-relaxed text-ink-muted text-pretty sm:text-base">
                        {activeTile.detail}
                      </p>

                      <div className="flex items-center gap-2 rounded-xl border border-hairline bg-canvas px-3.5 py-2.5 font-mono text-xs text-gdg-blue-ink">
                        <FileCode2
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="break-all">{activeTile.artifact}</span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4">
                        <Link
                          href={`/events/${latestRecap.eventSlug}`}
                          onClick={handleClose}
                          className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#1A73E8] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1557B0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
                        >
                          <span>Read Full Event Recap</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="inline-flex min-h-[42px] items-center rounded-lg border border-hairline bg-canvas px-4 py-2 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </m.div>
                </m.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </ScrollStage>
      <GridCrosshairs />
    </section>
  );
}
