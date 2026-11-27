"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Code2,
  Compass,
  Globe,
  X,
} from "lucide-react";
import { ACCENT_STYLES, type AccentColor } from "@/lib/accents";
import { BuilderPortrait } from "@/components/team/BuilderPortrait";
import { getEventsBySpeaker } from "@/data/events";
import {
  TEAM_VERTICALS,
  type TeamMember,
  type TeamVertical,
} from "@/data/team";

interface TeamDirectoryProps {
  members: TeamMember[];
}

type VerticalFilter = "All" | TeamVertical;

const VERTICAL_ACCENT: Record<TeamVertical, AccentColor> = {
  "Lead & Core": "blue",
  "Dev Vertical": "blue",
  "AI / ML": "green",
  Cloud: "red",
  Design: "yellow",
};

function parseVerticalParam(value: string | null): VerticalFilter {
  if (value && (TEAM_VERTICALS as readonly string[]).includes(value)) {
    return value as TeamVertical;
  }
  return "All";
}

export function TeamDirectory({ members }: TeamDirectoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedVertical = parseVerticalParam(searchParams.get("vertical"));
  const urlBuilderId = searchParams.get("builder");

  const activeMember = useMemo(() => {
    if (!urlBuilderId) return null;
    return members.find((m) => m.id === urlBuilderId) ?? null;
  }, [members, urlBuilderId]);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  const syncUrl = useCallback(
    (nextVertical: VerticalFilter, nextBuilderId: string | null) => {
      const params = new URLSearchParams();
      if (nextVertical !== "All") params.set("vertical", nextVertical);
      if (nextBuilderId) params.set("builder", nextBuilderId);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const handleCloseDrawer = useCallback(() => {
    syncUrl(selectedVertical, null);
  }, [selectedVertical, syncUrl]);

  const handleSelectVertical = (next: VerticalFilter) => {
    syncUrl(next, null);
  };

  const handleOpenBuilder = (member: TeamMember) => {
    syncUrl(selectedVertical, member.id);
  };

  // Accessible Escape-to-close and focus management for slide-over drawer
  useEffect(() => {
    if (activeMember) {
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
          handleCloseDrawer();
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
  }, [activeMember, handleCloseDrawer]);

  const filteredMembers = useMemo(() => {
    if (selectedVertical === "All") {
      return members;
    }
    return members.filter((member) => member.vertical === selectedVertical);
  }, [members, selectedVertical]);

  const coreLeads = useMemo(
    () => members.filter((member) => member.vertical === "Lead & Core"),
    [members]
  );

  const verticalBuilders = useMemo(
    () => members.filter((member) => member.vertical !== "Lead & Core"),
    [members]
  );

  const filterOptions: VerticalFilter[] = ["All", ...TEAM_VERTICALS];
  const drawerSessions = activeMember
    ? getEventsBySpeaker(activeMember.name)
    : [];

  return (
    <div className="space-y-10">
      {/* Full-Width Vertical Filter Bar */}
      <div className="flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter team members by vertical"
          className="flex flex-wrap items-center gap-2"
        >
          {filterOptions.map((vertical) => {
            const active = selectedVertical === vertical;
            const dotClass =
              vertical === "All"
                ? null
                : ACCENT_STYLES[VERTICAL_ACCENT[vertical]].dot;
            const styles =
              vertical === "All"
                ? null
                : ACCENT_STYLES[VERTICAL_ACCENT[vertical]];

            return (
              <button
                key={vertical}
                type="button"
                aria-pressed={active}
                onClick={() => handleSelectVertical(vertical)}
                className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono text-xs font-semibold transition-snappy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                  active
                    ? vertical === "All"
                      ? "border-ink bg-ink text-canvas"
                      : styles?.badge ?? "border-ink bg-ink text-canvas"
                    : "border-hairline bg-surface text-ink-muted hover:bg-surface-muted hover:text-ink"
                }`}
              >
                {dotClass && (
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${
                      active && vertical === "Design"
                        ? "bg-[#111827] dark:bg-[#FDD663]"
                        : dotClass
                    }`}
                  />
                )}
                <span>{vertical}</span>
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="shrink-0 font-mono text-xs text-ink-muted"
        >
          <span className="font-semibold text-ink">
            {filteredMembers.length}
          </span>{" "}
          {filteredMembers.length === 1 ? "builder" : "builders"} &middot; Click
          any portrait for dossier
        </p>
      </div>

      {/* Full-Width Builder Portrait Wall (ZERO dead right-side void) */}
      {selectedVertical === "All" ? (
        <div className="space-y-14">
          {/* Tier 1: Chapter Leadership — 2 Large Horizontal Feature Cards */}
          <section aria-labelledby="leadership-heading" className="space-y-5">
            <div className="flex items-baseline justify-between gap-2">
              <h2
                id="leadership-heading"
                className="text-2xl font-extrabold tracking-tight text-ink"
              >
                Chapter Leadership &amp; Operations
              </h2>
              <span className="font-mono text-xs text-ink-muted">
                {`${coreLeads.length} organizers`}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {coreLeads.map((member) => {
                const accent = ACCENT_STYLES[member.accentColor];
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => handleOpenBuilder(member)}
                    className={`gdg-reveal group flex flex-col gap-5 rounded-3xl border border-hairline bg-surface p-6 text-left transition-spring hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:flex-row sm:items-start sm:p-7 ${accent.borderHover}`}
                  >
                    <div className="transition-spring group-hover:-rotate-3">
                      <BuilderPortrait
                        name={member.name}
                        accentColor={member.accentColor}
                        motif={member.portraitMotif}
                        isCoreLead
                        imagePath={member.imagePath}
                        size="lg"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${accent.badge}`}
                        >
                          {member.vertical}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-gdg-blue-ink">
                          <span>Dossier</span>
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
                        {member.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-ink-muted">
                        {member.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted text-pretty">
                        {member.bio}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                        {member.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-hairline bg-canvas px-2.5 py-0.5 font-mono text-xs text-ink-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tier 2: Technical Vertical Leads — Full 4-Column Responsive Grid */}
          <section aria-labelledby="verticals-heading" className="space-y-5">
            <div className="flex items-baseline justify-between gap-2">
              <h2
                id="verticals-heading"
                className="text-2xl font-extrabold tracking-tight text-ink"
              >
                Technical Vertical Leads &amp; Maintainers
              </h2>
              <span className="font-mono text-xs text-ink-muted">
                {`${verticalBuilders.length} builders`}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {verticalBuilders.map((member) => {
                const accent = ACCENT_STYLES[member.accentColor];
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => handleOpenBuilder(member)}
                    className={`gdg-reveal group flex flex-col rounded-3xl border border-hairline bg-surface p-5 text-left transition-spring hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${accent.borderHover}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="transition-spring group-hover:-rotate-3">
                        <BuilderPortrait
                          name={member.name}
                          accentColor={member.accentColor}
                          motif={member.portraitMotif}
                          imagePath={member.imagePath}
                          size="md"
                        />
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${accent.badge}`}
                      >
                        {member.vertical}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-ink-muted">
                      {member.role}
                    </p>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted text-pretty">
                      {member.bio}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {member.techStack.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-hairline bg-canvas px-2.5 py-0.5 font-mono text-xs text-ink-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3.5 font-mono text-xs font-semibold text-ink transition-colors group-hover:text-gdg-blue-ink">
                      <span>Open Dossier</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredMembers.map((member) => {
            const accent = ACCENT_STYLES[member.accentColor];
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => handleOpenBuilder(member)}
                className={`group flex flex-col gap-5 rounded-3xl border border-hairline bg-surface p-6 text-left transition-spring hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:flex-row sm:items-start sm:p-7 ${accent.borderHover}`}
              >
                <div className="transition-spring group-hover:-rotate-3">
                  <BuilderPortrait
                    name={member.name}
                    accentColor={member.accentColor}
                    motif={member.portraitMotif}
                    isCoreLead={member.vertical === "Lead & Core"}
                    imagePath={member.imagePath}
                    size="lg"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${accent.badge}`}
                    >
                      {member.vertical}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-gdg-blue-ink">
                      <span>Open Dossier</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-ink-muted">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted text-pretty">
                    {member.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                    {member.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-hairline bg-canvas px-2.5 py-0.5 font-mono text-xs text-ink-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Accessible Slide-Over Builder Dossier Drawer */}
      {activeMember && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#111827]/45 backdrop-blur-[2px] dark:bg-black/65"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseDrawer();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="builder-dossier-title"
            className="animate-gdg-drawer-in flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-hairline bg-surface shadow-[0_24px_64px_rgba(12,15,20,0.28)]"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-hairline bg-surface/95 px-6 py-4 backdrop-blur-md">
              <span className="font-mono text-xs font-semibold text-ink-muted">
                Builder Dossier &middot; GDG on Campus RVCE
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleCloseDrawer}
                aria-label="Close builder dossier"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-canvas text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 space-y-6 p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <BuilderPortrait
                  name={activeMember.name}
                  accentColor={activeMember.accentColor}
                  motif={activeMember.portraitMotif}
                  isCoreLead={activeMember.vertical === "Lead & Core"}
                  imagePath={activeMember.imagePath}
                  size="lg"
                />
                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${
                      ACCENT_STYLES[activeMember.accentColor].badge
                    }`}
                  >
                    {activeMember.vertical}
                  </span>
                  <h2
                    id="builder-dossier-title"
                    className="mt-2.5 text-2xl font-extrabold tracking-tight text-ink"
                  >
                    {activeMember.name}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-ink-muted">
                    {activeMember.role}
                  </p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-ink-muted text-pretty">
                {activeMember.bio}
              </p>

              {/* Current RVCE Campus Build Focus */}
              <div className="border-t border-hairline pt-5">
                <p className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink">
                  <Compass
                    className="h-4 w-4 text-gdg-blue"
                    aria-hidden="true"
                  />
                  <span>RVCE Campus Build Focus</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted text-pretty">
                  {activeMember.campusFocus}
                </p>
              </div>

              {/* Primary Tech Stack */}
              <div className="border-t border-hairline pt-5">
                <p className="font-mono text-xs font-semibold text-ink">
                  Primary Tech Stack
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeMember.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-hairline bg-canvas px-3 py-1 font-mono text-xs font-semibold text-ink"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sessions Led */}
              {drawerSessions.length > 0 && (
                <div className="border-t border-hairline pt-5">
                  <p className="font-mono text-xs font-semibold text-ink">
                    Sessions &amp; Clinics Led
                  </p>
                  <ul className="mt-3 divide-y divide-hairline border-y border-hairline">
                    {drawerSessions.map((ev) => (
                      <li key={ev.slug}>
                        <Link
                          href={`/events/${ev.slug}`}
                          className="group flex items-center justify-between gap-2 py-3 text-sm transition-colors hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                        >
                          <span className="inline-flex min-w-0 items-center gap-2 font-semibold text-ink group-hover:text-gdg-blue-ink">
                            <Calendar
                              className="h-4 w-4 shrink-0 text-gdg-blue"
                              aria-hidden="true"
                            />
                            <span className="truncate">{ev.title}</span>
                          </span>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gdg-blue-ink"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* External Profile Links */}
              <div className="flex flex-wrap items-center gap-2.5 border-t border-hairline pt-5">
                {activeMember.links.github && (
                  <a
                    href={activeMember.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${activeMember.name} on GitHub`}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-hairline bg-canvas px-4 py-2 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <Code2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>GitHub</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-ink-muted"
                      aria-hidden="true"
                    />
                  </a>
                )}
                {activeMember.links.linkedin && (
                  <a
                    href={activeMember.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${activeMember.name} on LinkedIn`}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-hairline bg-canvas px-4 py-2 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
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
                {activeMember.links.website && (
                  <a
                    href={activeMember.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${activeMember.name}'s website`}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-hairline bg-canvas px-4 py-2 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
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
          </div>
        </div>
      )}
    </div>
  );
}
