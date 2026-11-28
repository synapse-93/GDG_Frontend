import { Suspense } from "react";
import type { Metadata } from "next";
import { TeamDirectory } from "@/components/team/TeamDirectory";
import { GridCrosshairs } from "@/components/ui/GridCrosshairs";
import { siteConfig } from "@/data/site";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description: `Meet the student organizers, track leads, and designers powering ${siteConfig.chapterName}.`,
};

export default function TeamPage() {
  return (
    <div className="bg-canvas">
      {/* Compact Editorial Team Masthead — tuned so Leadership lanyard cards sit above the fold on desktop */}
      <section className="relative border-b border-hairline bg-canvas py-5 sm:py-6 lg:py-5">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="mb-1.5 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-[1.5px] bg-[#34A853]"
                />
                <span>Chapter Directory</span>
              </p>
              <h1 className="display-expressive text-3xl font-extrabold tracking-[-0.038em] leading-[1.04] text-ink sm:text-4xl lg:text-[2.45rem] lg:leading-[1.02]">
                Meet the RVCE chapter team
              </h1>
              <p className="mt-1.5 max-w-[54ch] text-sm leading-relaxed text-ink-muted text-pretty sm:text-[15px]">
                Students across RVCE organizing workshops, study jams, and
                open-source campus projects.
              </p>
            </div>

            {/* Crisp 4-Color Google Geometric Accent Strip */}
            <div aria-hidden="true" className="hidden items-center gap-1.5 sm:flex">
              <span className="h-3.5 w-8 rounded-sm bg-[#4285F4]" />
              <span className="h-3.5 w-3.5 rounded-sm bg-[#34A853]" />
              <span className="h-3.5 w-3.5 rounded-sm bg-[#EA4335]" />
              <span className="h-3.5 w-6 rounded-sm bg-[#FBBC04]" />
            </div>
          </div>
        </div>
        <GridCrosshairs />
      </section>

      {/* Hanging Lanyard Badges (Desktop) & Swipeable 3D-Flip Carousels (Mobile) */}
      <section className="py-5 sm:py-6 lg:pt-5 lg:pb-14">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10 xl:px-12">
          <Suspense
            fallback={
              <div className="border-y border-hairline py-8 font-mono text-xs text-ink-muted">
                Loading chapter team...
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
