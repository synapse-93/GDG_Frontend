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
      <section className="border-b border-hairline bg-canvas py-5 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="display-expressive text-3xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Meet the RVCE chapter team
              </h1>
              <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-ink-muted text-pretty sm:mt-3 sm:text-base">
                Students across RVCE organizing workshops, study jams, and
                open-source campus projects.
              </p>
            </div>

            {/* Expressive 4-Color Google Shape Accent Strip */}
            <div aria-hidden="true" className="hidden items-center gap-2 sm:flex">
              <span className="h-4 w-9 rounded-full bg-[#4285F4]" />
              <span className="h-4 w-4 rounded-full bg-[#34A853]" />
              <span className="h-4 w-4 rounded-md bg-[#EA4335]" />
              <span className="h-4 w-7 rounded-full bg-[#FBBC04]" />
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Builder Portrait Wall & Slide-Over Dossiers */}
      <section className="py-5 sm:py-10 lg:py-14">
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
