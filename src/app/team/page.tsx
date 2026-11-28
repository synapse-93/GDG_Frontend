import { Suspense } from "react";
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
      {/* Bold Material 3 Expressive Team Masthead */}
      <section className="border-b border-hairline bg-canvas py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="display-expressive text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                The builders behind the studio
              </h1>
              <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-ink-muted text-pretty">
                Student engineers, researchers, and designers across RVCE
                coordinating open technical workshops, study jams, and shared
                campus tooling. Select any portrait to open their Member
                Profile.
              </p>
            </div>

            {/* Expressive 4-Color Google Shape Accent Strip */}
            <div aria-hidden="true" className="flex items-center gap-2">
              <span className="h-4 w-9 rounded-full bg-[#4285F4]" />
              <span className="h-4 w-4 rounded-full bg-[#34A853]" />
              <span className="h-4 w-4 rounded-md bg-[#EA4335]" />
              <span className="h-4 w-7 rounded-full bg-[#FBBC04]" />
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Builder Portrait Wall & Slide-Over Dossiers */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="border-y border-hairline py-8 font-mono text-xs text-ink-muted">
                Loading chapter builders...
              </div>
            }
          >
            <TeamDirectory members={teamMembers} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
