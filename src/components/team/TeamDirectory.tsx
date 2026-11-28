"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, RotateCcw, SearchX } from "lucide-react";
import { MemberSheet } from "@/components/team/MemberSheet";
import { TeamCard } from "@/components/team/TeamCard";
import {
  TeamFilters,
  type VerticalFilter,
} from "@/components/team/TeamFilters";
import { KineticText } from "@/components/ui/KineticText";
import { ScrollStage } from "@/components/ui/ScrollStage";
import {
  TEAM_VERTICALS,
  type TeamMember,
  type TeamVertical,
} from "@/data/team";

interface TeamDirectoryProps {
  members: TeamMember[];
}

function parseVerticalParam(value: string | null): VerticalFilter {
  if (value && (TEAM_VERTICALS as readonly string[]).includes(value)) {
    return value as TeamVertical;
  }
  return "All";
}

function matchesTeamSearch(member: TeamMember, normalized: string): boolean {
  if (!normalized) return true;
  const searchable = [
    member.name,
    member.role,
    member.vertical,
    member.askMeAbout,
    member.bio,
    ...member.techStack,
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(normalized);
}

function chunkIntoRows<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

const FOUR_COL_TILTS = [-2, 1.5, -1.5, 2] as const;
const TWO_COL_TILTS = [-1.8, 1.8] as const;

/** Computes vertical sag (px) along the quadratic Bézier wire M 0 8 Q 500 38 1000 8 */
function getWireDropPx(colIdx: number, colCount: number): number {
  const t = (colIdx + 0.5) / colCount;
  const y = (1 - t) * (1 - t) * 8 + 2 * (1 - t) * t * 38 + t * t * 8;
  return Math.round(y);
}

interface HangingLanyardRowProps {
  members: TeamMember[];
  variant: "leadership" | "vertical";
  columns: 1 | 2 | 3 | 4;
  onSelect: (member: TeamMember) => void;
}

function HangingLanyardRow({
  members,
  variant,
  columns,
  onSelect,
}: HangingLanyardRowProps) {
  const gridColsClass =
    columns === 1
      ? "grid-cols-1 max-w-[330px] mx-auto"
      : columns === 2
      ? "grid-cols-2 max-w-3xl mx-auto gap-10"
      : columns === 3
      ? "grid-cols-3 gap-7"
      : "grid-cols-4 gap-6";

  return (
    <div className="relative pt-2">
      {/* Delicate curved SVG wire spanning the width of the row */}
      <svg
        viewBox="0 0 1000 44"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-11 w-full text-ink-muted/35 dark:text-ink-muted/45"
      >
        <path
          d="M 0 8 Q 500 38 1000 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>

      <div className={`grid items-start ${gridColsClass}`}>
        {members.map((member, idx) => {
          const restTilt =
            columns === 1
              ? 0
              : columns === 2
              ? TWO_COL_TILTS[idx % TWO_COL_TILTS.length]
              : FOUR_COL_TILTS[idx % FOUR_COL_TILTS.length];
          const wireDrop = getWireDropPx(idx, columns);

          return (
            <div
              key={member.slug}
              style={{ paddingTop: `${wireDrop + 12}px` }}
            >
              <TeamCard
                member={member}
                variant={variant}
                mode="hanging"
                restTilt={restTilt}
                onSelect={onSelect}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface MobileSwipeCarouselProps {
  members: TeamMember[];
  variant: "leadership" | "vertical";
  onSelect: (member: TeamMember) => void;
}

function MobileSwipeCarousel({
  members,
  variant,
  onSelect,
}: MobileSwipeCarouselProps) {
  return (
    <div className="-mx-4 px-4 lg:hidden">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pt-1 pb-3 no-scrollbar">
        {members.map((member) => (
          <TeamCard
            key={member.slug}
            member={member}
            variant={variant}
            mode="carousel"
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export function TeamDirectory({ members }: TeamDirectoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedVertical = parseVerticalParam(
    searchParams.get("track") ?? searchParams.get("vertical")
  );
  const urlMemberSlug =
    searchParams.get("member") ?? searchParams.get("builder");

  const [searchQuery, setSearchQuery] = useState("");

  const activeMember = useMemo(() => {
    if (!urlMemberSlug) return null;
    return (
      members.find(
        (m) => m.slug === urlMemberSlug || m.id === urlMemberSlug
      ) ?? null
    );
  }, [members, urlMemberSlug]);

  const syncUrl = useCallback(
    (nextVertical: VerticalFilter, nextMemberSlug: string | null) => {
      const params = new URLSearchParams();
      if (nextVertical !== "All") params.set("track", nextVertical);
      if (nextMemberSlug) params.set("member", nextMemberSlug);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const handleCloseSheet = useCallback(() => {
    syncUrl(selectedVertical, null);
  }, [selectedVertical, syncUrl]);

  const handleSelectVertical = useCallback(
    (next: VerticalFilter) => {
      syncUrl(next, null);
    },
    [syncUrl]
  );

  const handleOpenMember = useCallback(
    (member: TeamMember) => {
      syncUrl(selectedVertical, member.slug);
    },
    [selectedVertical, syncUrl]
  );

  const handleReset = useCallback(() => {
    setSearchQuery("");
    syncUrl("All", null);
  }, [syncUrl]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      if (selectedVertical !== "All" && member.vertical !== selectedVertical) {
        return false;
      }
      return matchesTeamSearch(member, normalizedQuery);
    });
  }, [members, selectedVertical, normalizedQuery]);

  const coreLeads = useMemo(
    () =>
      filteredMembers.filter((member) => member.vertical === "Lead & Core"),
    [filteredMembers]
  );

  const verticalLeads = useMemo(
    () =>
      filteredMembers.filter((member) => member.vertical !== "Lead & Core"),
    [filteredMembers]
  );

  const verticalRows = useMemo(
    () => chunkIntoRows(verticalLeads, 4),
    [verticalLeads]
  );

  const filteredRows = useMemo(
    () => chunkIntoRows(filteredMembers, 4),
    [filteredMembers]
  );

  const showTwoTierSplit =
    selectedVertical === "All" && normalizedQuery.length === 0;

  return (
    <div className="space-y-6 sm:space-y-10">
      <TeamFilters
        selectedVertical={selectedVertical}
        searchQuery={searchQuery}
        totalCount={members.length}
        filteredCount={filteredMembers.length}
        onSelectVertical={handleSelectVertical}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
      />

      {filteredMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-y border-dashed border-hairline py-16 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-muted">
            <SearchX className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold tracking-tight text-ink">
            No matching team members
          </h2>
          <p className="mt-1.5 max-w-md text-sm text-ink-muted">
            Try clearing your search query or switching back to all chapter
            verticals.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-6 inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#1A73E8] px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-150 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Reset filters</span>
          </button>
        </div>
      ) : showTwoTierSplit ? (
        <div className="space-y-10 sm:space-y-16">
          {/* Tier 1: Chapter Leadership & Operations */}
          <ScrollStage>
            <section
              aria-labelledby="leadership-heading"
              className="space-y-3 sm:space-y-6"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2
                  id="leadership-heading"
                  className="text-lg font-extrabold tracking-tight text-ink sm:text-2xl"
                >
                  <KineticText
                    text="Chapter Leadership & Operations"
                    mode="mount"
                  />
                </h2>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="hidden whitespace-nowrap font-mono text-xs text-ink-muted lg:inline">
                    {`${coreLeads.length} organizers · Click any badge to flip`}
                  </span>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap font-mono text-[11px] font-medium text-ink-muted lg:hidden">
                    <span>Swipe</span>
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Mobile Swipeable 3D-Flip Carousel */}
              <MobileSwipeCarousel
                members={coreLeads}
                variant="leadership"
                onSelect={handleOpenMember}
              />

              {/* Desktop Hanging Lanyard Row */}
              <div className="hidden lg:block">
                <HangingLanyardRow
                  members={coreLeads}
                  variant="leadership"
                  columns={2}
                  onSelect={handleOpenMember}
                />
              </div>
            </section>
          </ScrollStage>

          {/* Tier 2: Technical Vertical Leads & Maintainers */}
          <ScrollStage>
            <section
              aria-labelledby="verticals-heading"
              className="space-y-3 sm:space-y-6"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2
                  id="verticals-heading"
                  className="text-lg font-extrabold tracking-tight text-ink sm:text-2xl"
                >
                  <KineticText text="Technical Vertical Leads & Maintainers" />
                </h2>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="hidden whitespace-nowrap font-mono text-xs text-ink-muted lg:inline">
                    {`${verticalLeads.length} leads`}
                  </span>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap font-mono text-[11px] font-medium text-ink-muted lg:hidden">
                    <span>Swipe</span>
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Mobile Swipeable 3D-Flip Carousel */}
              <MobileSwipeCarousel
                members={verticalLeads}
                variant="vertical"
                onSelect={handleOpenMember}
              />

              {/* Desktop Hanging Lanyard 4-Column Rows */}
              <div className="hidden space-y-12 lg:block">
                {verticalRows.map((row, rowIdx) => (
                  <HangingLanyardRow
                    key={`vertical-row-${rowIdx}`}
                    members={row}
                    variant="vertical"
                    columns={Math.min(row.length, 4) as 1 | 2 | 3 | 4}
                    onSelect={handleOpenMember}
                  />
                ))}
              </div>
            </section>
          </ScrollStage>
        </div>
      ) : (
        <section className="space-y-3 sm:space-y-6">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-mono text-xs text-ink-muted">
              {`${filteredMembers.length} ${
                filteredMembers.length === 1 ? "member" : "members"
              }`}
            </p>
            {filteredMembers.length > 1 && (
              <span className="inline-flex items-center gap-1 whitespace-nowrap font-mono text-[11px] font-medium text-ink-muted lg:hidden">
                <span>Swipe</span>
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            )}
          </div>

          <MobileSwipeCarousel
            members={filteredMembers}
            variant="vertical"
            onSelect={handleOpenMember}
          />

          <div className="hidden space-y-12 lg:block">
            {filteredRows.map((row, rowIdx) => (
              <HangingLanyardRow
                key={`filtered-row-${rowIdx}`}
                members={row}
                variant={row.length <= 2 ? "leadership" : "vertical"}
                columns={Math.min(row.length, 4) as 1 | 2 | 3 | 4}
                onSelect={handleOpenMember}
              />
            ))}
          </div>
        </section>
      )}

      {/* Responsive Gesture-Driven Member Profile Sheet */}
      <MemberSheet member={activeMember} onClose={handleCloseSheet} />
    </div>
  );
}
