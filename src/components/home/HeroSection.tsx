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
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Oversized Editorial Poster Column */}
          <div className="min-w-0 space-y-6 lg:col-span-6 lg:space-y-5">
            <h1 className="display-expressive text-5xl font-extrabold tracking-tight leading-[0.98] text-ink sm:text-6xl lg:text-[4.25rem]">
              <KineticText
                text="Build open systems at RVCE."
                highlightWord="open"
                highlightClassName="text-gdg-blue-ink"
                mode="mount"
                staggerSeconds={0.035}
              />
            </h1>

            <p className="max-w-[50ch] text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              {siteConfig.tagline} Hands-on labs, architecture teardowns, and
              peer study jams built by students, for students on Mysuru Road.
            </p>

            {/* Primary & Companion Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/events"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#1A73E8] px-6 py-3 text-sm font-bold text-white transition-spring hover:-translate-y-0.5 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
              >
                <span>Explore Events</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/team"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-hairline bg-surface px-6 py-3 text-sm font-bold text-ink transition-spring hover:-translate-y-0.5 hover:bg-surface-muted active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <Users className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                <span>Meet the Team</span>
              </Link>
            </div>

            {/* Inline Live Next Session Ticker */}
            {nextEvent && (
              <div className="pt-2">
                <CountdownTimer event={nextEvent} />
              </div>
            )}
          </div>

          {/* Interactive Fanned Hero Track Deck + Bending Indicator + Floating Pill Dock */}
          <div className="min-w-0 lg:col-span-6">
            <HeroTrackPlayground />
          </div>
        </div>
      </div>
    </section>
  );
}
