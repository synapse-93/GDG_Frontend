import type { Metadata } from "next";
import { TeamDirectory } from "@/components/team/TeamDirectory";
import { siteConfig } from "@/data/site";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description: `Meet the student organizers, track leads, and designers powering ${siteConfig.chapterName}.`,
};

export default function TeamPage() {
  return (
    <div className="bg-canvas">
      {/* Blueprint Page Header */}
      <section className="border-b border-hairline bg-blueprint-grid py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
            {"03 // BUILDERS"}
          </p>
          <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            The Core Team behind the studio
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Student engineers, researchers, and designers across RVCE
            coordinating open technical workshops, study jams, and shared
            campus tooling.
          </p>
        </div>
      </section>

      {/* Filterable Team Directory */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TeamDirectory members={teamMembers} />
        </div>
      </section>
    </div>
  );
}
