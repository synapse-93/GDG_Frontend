"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import { AnimatePresence, type PanInfo } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Code2,
  Compass,
  Globe,
  MessageCircle,
  X,
} from "lucide-react";
import { BuilderPortrait } from "@/components/team/BuilderPortrait";
import { getEventsBySpeaker } from "@/data/events";
import type { TeamMember } from "@/data/team";
import { ACCENT_STYLES, type AccentColor } from "@/lib/accents";

interface MemberSheetProps {
  member: TeamMember | null;
  onClose: () => void;
}

const FOCUS_CALLOUT: Record<AccentColor, string> = {
  blue: "border-[#4285F4]/30 bg-[#4285F4]/10 text-ink dark:border-[#669DF6]/35 dark:bg-[#669DF6]/12",
  green:
    "border-[#34A853]/30 bg-[#34A853]/10 text-ink dark:border-[#81C995]/35 dark:bg-[#81C995]/12",
  red: "border-[#EA4335]/30 bg-[#EA4335]/10 text-ink dark:border-[#F28B82]/35 dark:bg-[#F28B82]/12",
  yellow:
    "border-[#D99B00]/45 bg-[#FBBC04]/22 text-[#111827] dark:border-[#FDD663]/40 dark:bg-[#FDD663]/14 dark:text-ink",
};

function subscribeToMobileMedia(onStoreChange: () => void) {
  const mql = window.matchMedia("(max-width: 767px)");
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getClientIsMobile(): boolean {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getServerIsMobile(): boolean {
  return false;
}

export function MemberSheet({ member, onClose }: MemberSheetProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  const isMobile = useSyncExternalStore(
    subscribeToMobileMedia,
    getClientIsMobile,
    getServerIsMobile
  );

  // Accessible Escape close, body scroll lock, and focus management
  useEffect(() => {
    if (member) {
      if (!wasOpenRef.current) {
        previousFocusRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
      }
      wasOpenRef.current = true;

      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      requestAnimationFrame(() => {
        previousFocusRef.current?.focus();
      });
    }
  }, [member, onClose]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 110 || info.velocity.y > 500) {
      onClose();
    }
  };

  const sessionsLed = member ? getEventsBySpeaker(member.name) : [];

  return (
    <AnimatePresence>
      {member && (
        <m.div
          key="member-sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-end bg-[#111827]/50 backdrop-blur-[2px] dark:bg-black/65 md:items-stretch"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <m.div
            key={`member-sheet-panel-${isMobile ? "mobile" : "desktop"}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-profile-title"
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: "100%" } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            drag={isMobile ? "y" : false}
            dragConstraints={isMobile ? { top: 0 } : undefined}
            dragElastic={isMobile ? { top: 0.05, bottom: 0.4 } : undefined}
            onDragEnd={isMobile ? handleDragEnd : undefined}
            className="flex max-h-[88svh] w-full flex-col overflow-hidden rounded-t-2xl border-t border-hairline bg-surface shadow-[0_16px_44px_rgba(12,15,20,0.22)] md:h-full md:max-h-none md:max-w-lg md:rounded-none md:border-t-0 md:border-l"
          >
            {/* Mobile Drag Handle */}
            <div
              aria-hidden="true"
              className="flex shrink-0 justify-center pt-3 pb-1 md:hidden"
            >
              <span className="h-1.5 w-12 rounded-full bg-hairline" />
            </div>

            {/* Sticky Sheet Header */}
            <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-hairline bg-surface/95 px-6 py-3.5 backdrop-blur-md">
              <span className="font-mono text-xs font-semibold text-ink-muted">
                Member Profile &middot; GDG on Campus RVCE
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close member profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Profile Body */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-7">
              {/* Credential Tile + Identity Header */}
              <div className="flex items-start gap-4 sm:gap-5">
                <BuilderPortrait
                  name={member.name}
                  accentColor={member.accentColor}
                  motif={member.portraitMotif}
                  imagePath={member.imagePath}
                  size="sheet"
                />
                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-semibold ${
                      ACCENT_STYLES[member.accentColor].badge
                    }`}
                  >
                    {member.vertical}
                  </span>
                  <h2
                    id="member-profile-title"
                    className="mt-2 text-2xl font-extrabold tracking-tight text-ink"
                  >
                    {member.name}
                  </h2>
                  <p className="mt-0.5 font-mono text-xs text-ink-muted">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-ink-muted text-pretty">
                {member.bio}
              </p>

              {/* Tinted Accent Callout: RVCE Campus Focus */}
              <div
                className={`rounded-xl border p-4 ${FOCUS_CALLOUT[member.accentColor]}`}
              >
                <p className="inline-flex items-center gap-1.5 font-mono text-xs font-bold">
                  <Compass className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Campus Focus</span>
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-pretty">
                  {member.campusFocus}
                </p>
              </div>

              {/* Ask Me About + Tech Stack */}
              <div className="space-y-4 border-t border-hairline pt-5">
                <div>
                  <p className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink">
                    <MessageCircle
                      className="h-3.5 w-3.5 text-gdg-blue"
                      aria-hidden="true"
                    />
                    <span>Ask me about</span>
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <span className="rounded-md border border-gdg-blue/35 bg-gdg-blue/10 px-2.5 py-1 font-mono text-xs font-semibold text-gdg-blue-ink">
                      {member.askMeAbout}
                    </span>
                    {member.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-hairline bg-canvas px-2.5 py-1 font-mono text-xs font-semibold text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sessions Led -> Direct links to /events/[slug] */}
              {sessionsLed.length > 0 && (
                <div className="border-t border-hairline pt-5">
                  <p className="font-mono text-xs font-semibold text-ink">
                    Sessions &amp; Workshops Led
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {sessionsLed.map((ev) => (
                      <Link
                        key={ev.slug}
                        href={`/events/${ev.slug}`}
                        onClick={onClose}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-hairline bg-canvas px-4 py-3 transition-colors hover:border-gdg-blue/50 hover:bg-surface-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                      >
                        <div className="min-w-0">
                          <p className="inline-flex max-w-full items-center gap-2 text-sm font-bold text-ink group-hover:text-gdg-blue-ink">
                            <Calendar
                              className="h-4 w-4 shrink-0 text-gdg-blue"
                              aria-hidden="true"
                            />
                            <span className="truncate">{ev.title}</span>
                          </p>
                          <p className="mt-0.5 pl-6 font-mono text-xs text-ink-muted tabular-nums">
                            {ev.dateDisplay} &middot; {ev.track}
                          </p>
                        </div>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gdg-blue-ink"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* External Profile Links */}
              <div className="flex flex-wrap items-center gap-2.5 border-t border-hairline pt-5 pb-2">
                {member.links.github && (
                  <a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on GitHub`}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-hairline bg-canvas px-3.5 py-2 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <Code2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>GitHub</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-ink-muted"
                      aria-hidden="true"
                    />
                  </a>
                )}
                {member.links.linkedin && (
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-hairline bg-canvas px-3.5 py-2 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <Briefcase
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>LinkedIn</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-ink-muted"
                      aria-hidden="true"
                    />
                  </a>
                )}
                {member.links.website && (
                  <a
                    href={member.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s website`}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-hairline bg-canvas px-3.5 py-2 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Website</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-ink-muted"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
