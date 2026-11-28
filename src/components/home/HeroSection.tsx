import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { HeroTrackPlayground } from "@/components/home/HeroTrackPlayground";
import { KineticText } from "@/components/ui/KineticText";
import { getUpcomingEvents } from "@/data/events";
import { siteConfig } from "@/data/site";

export function HeroSection() {
  const nextEvent = getUpcomingEvents()[0];

  return (
    <section className="relative border-b border-hairline bg-canvas">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-center lg:grid-cols-12 lg:gap-10">
          {/* Screen 1 on Mobile (< lg): Clean full-screen hero with countdown pinned at bottom */}
          <div className="flex min-h-[calc(100svh-4rem)] min-w-0 flex-col justify-between gap-6 py-6 lg:col-span-6 lg:block lg:min-h-0 lg:space-y-5 lg:py-0">
            <div className="space-y-4 sm:space-y-5">
              <h1 className="display-expressive text-[2.6rem] font-extrabold tracking-tight leading-[0.98] text-ink sm:text-6xl lg:text-[4.25rem]">
                <KineticText
                  text="Build open systems at RVCE."
                  highlightWord="open"
                  highlightClassName="text-gdg-blue-ink"
                  mode="mount"
                  staggerSeconds={0.035}
                />
              </h1>

              <p className="max-w-[50ch] text-[15px] leading-relaxed text-ink-muted text-pretty sm:text-lg">
                {siteConfig.tagline} Hands-on workshops, code labs, and weekend
                study jams on Mysuru Road.
              </p>

              {/* Primary & Companion Actions — side-by-side 2-col grid on mobile */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <Link
                  href="/events"
                  className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-full bg-[#1A73E8] px-4 py-2.5 text-sm font-bold text-white transition-spring hover:-translate-y-0.5 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8] sm:min-h-[48px] sm:gap-2 sm:px-6 sm:py-3"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>

                <Link
                  href="/team"
                  className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-full border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink transition-spring hover:-translate-y-0.5 hover:bg-surface-muted active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:min-h-[48px] sm:gap-2 sm:px-6 sm:py-3"
                >
                  <Users
                    className="h-4 w-4 shrink-0 text-ink-muted"
                    aria-hidden="true"
                  />
                  <span>Meet the Team</span>
                </Link>
              </div>
            </div>

            {/* Inline Live Next Session Ticker — pinned cleanly at bottom of Screen 1 on mobile */}
            {nextEvent && (
              <div className="pt-1 lg:pt-2">
                <CountdownTimer event={nextEvent} />
              </div>
            )}
          </div>

          {/* Screen 2 on Mobile (< lg): Dedicated Mobile Track Deck; Desktop: Fanned 3D Deck */}
          <div className="min-w-0 border-t border-hairline py-8 lg:col-span-6 lg:border-t-0 lg:py-0">
            <HeroTrackPlayground />
          </div>
        </div>
      </div>
    </section>
  );
}
