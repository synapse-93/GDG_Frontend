"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { RotateCcw, SearchX } from "lucide-react";
import { MemberSheet } from "@/components/team/MemberSheet";
import { TeamCard } from "@/components/team/TeamCard";
import { TeamFilters, type VerticalFilter } from "@/components/team/TeamFilters";
import { KineticText } from "@/components/ui/KineticText";
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

  const showTwoTierSplit =
    selectedVertical === "All" && normalizedQuery.length === 0;

  return (
    <div className="space-y-10">
      <TeamFilters
        selectedVertical={selectedVertical}
        searchQuery={searchQuery}
        totalCount={members.length}
        filteredCount={filteredMembers.length}
        onSelectVertical={handleSelectVertical}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
      />

      <LayoutGroup id="team-directory">
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
          <div className="space-y-14">
            {/* Tier 1: Chapter Leadership — 2 Horizontal Feature Cards */}
            <section aria-labelledby="leadership-heading" className="space-y-5">
              <div className="flex items-baseline justify-between gap-2">
                <h2
                  id="leadership-heading"
                  className="text-2xl font-extrabold tracking-tight text-ink"
                >
                  <KineticText
                    text="Chapter Leadership & Operations"
                    mode="mount"
                  />
                </h2>
                <span className="font-mono text-xs text-ink-muted">
                  {`${coreLeads.length} organizers`}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {coreLeads.map((member) => (
                    <TeamCard
                      key={member.slug}
                      member={member}
                      variant="leadership"
                      onSelect={handleOpenMember}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </section>

            {/* Tier 2: Technical Vertical Leads — 4-Column Responsive Grid */}
            <section aria-labelledby="verticals-heading" className="space-y-5">
              <div className="flex items-baseline justify-between gap-2">
                <h2
                  id="verticals-heading"
                  className="text-2xl font-extrabold tracking-tight text-ink"
                >
                  <KineticText text="Technical Vertical Leads & Maintainers" />
                </h2>
                <span className="font-mono text-xs text-ink-muted">
                  {`${verticalLeads.length} leads`}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {verticalLeads.map((member) => (
                    <TeamCard
                      key={member.slug}
                      member={member}
                      variant="vertical"
                      onSelect={handleOpenMember}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member) => (
                <TeamCard
                  key={member.slug}
                  member={member}
                  variant="leadership"
                  onSelect={handleOpenMember}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </LayoutGroup>

      {/* Responsive Gesture-Driven Member Profile Sheet */}
      <MemberSheet member={activeMember} onClose={handleCloseSheet} />
    </div>
  );
}
