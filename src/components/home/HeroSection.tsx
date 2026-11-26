import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { GeometricScene3D } from "@/components/brand/GeometricScene3D";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { getUpcomingEvents } from "@/data/events";
import { siteConfig } from "@/data/site";

export function HeroSection() {
  const nextEvent = getUpcomingEvents()[0];

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-blueprint-grid">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Column */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-hairline bg-surface px-3.5 py-1.5">
              <span
                aria-hidden="true"
                className="inline-flex items-center gap-1"
              >
                <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
                <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
                <span className="h-2 w-2 rounded-full bg-[#FBBC04]" />
                <span className="h-2 w-2 rounded-full bg-[#34A853]" />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                {"01 // COMMUNITY · RV COLLEGE OF ENGINEERING"}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Where RVCE builders turn{" "}
              <span className="text-[#1A73E8] dark:text-gdg-blue">
                curiosity
              </span>{" "}
              into shipped systems.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {siteConfig.tagline} Hands-on labs, architecture teardowns, and
              peer study jams built by students, for students.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1A73E8] px-5 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
              >
                <span>Explore Events</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/team"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-hairline bg-surface px-5 py-3 text-sm font-semibold text-ink transition-transform duration-150 hover:bg-surface-muted active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <Users className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                <span>Meet the Team</span>
              </Link>
            </div>

            {/* Live Next-Event Countdown */}
            {nextEvent && (
              <div className="pt-2">
                <CountdownTimer event={nextEvent} />
              </div>
            )}
          </div>

          {/* Architectural 3D Blueprint Centerpiece */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface/90 p-6 backdrop-blur-sm sm:p-8">
              {/* Top blueprint metadata strip */}
              <div className="flex items-center justify-between border-b border-hairline pb-3 font-mono text-[11px] text-ink-muted">
                <span>{"STUDIO // 3D.WIREFRAME"}</span>
                <span>{siteConfig.academicCycle}</span>
              </div>

              {/* Overflow-guarded 3D stage */}
              <div className="pointer-events-none relative flex min-h-[260px] items-center justify-center overflow-hidden py-4 sm:min-h-[300px]">
                <GeometricScene3D variant="hero" />
              </div>

              {/* Bottom track coordinate strip */}
              <div className="grid grid-cols-4 gap-2 border-t border-hairline pt-3 font-mono text-[10px] text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4]" />
                  WEB
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
                  AI/ML
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EA4335]" />
                  CLOUD
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC04]" />
                  MOBILE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
