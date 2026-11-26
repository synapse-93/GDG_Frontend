"use client";

import { useMemo, useState } from "react";
import { MemberCard } from "@/components/team/MemberCard";
import {
  TEAM_VERTICALS,
  type TeamMember,
  type TeamVertical,
} from "@/data/team";

interface TeamDirectoryProps {
  members: TeamMember[];
}

type VerticalFilter = "All" | TeamVertical;

export function TeamDirectory({ members }: TeamDirectoryProps) {
  const [selectedVertical, setSelectedVertical] =
    useState<VerticalFilter>("All");

  const filteredMembers = useMemo(() => {
    if (selectedVertical === "All") {
      return members;
    }
    return members.filter((member) => member.vertical === selectedVertical);
  }, [members, selectedVertical]);

  const filterOptions: VerticalFilter[] = ["All", ...TEAM_VERTICALS];

  return (
    <div className="space-y-8">
      {/* Vertical Filter Tabs */}
      <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div
          role="group"
          aria-label="Filter team members by vertical"
          className="flex flex-wrap items-center gap-2"
        >
          {filterOptions.map((vertical) => {
            const active = selectedVertical === vertical;
            return (
              <button
                key={vertical}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedVertical(vertical)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                  active
                    ? "border-ink bg-ink text-canvas"
                    : "border-hairline bg-canvas text-ink-muted hover:bg-surface-muted hover:text-ink"
                }`}
              >
                {vertical}
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
          {filteredMembers.length === 1 ? "builder" : "builders"}
        </p>
      </div>

      {/* Responsive Builder Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
