"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { ArrowRight, Users } from "lucide-react";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { HeroTrackPlayground } from "@/components/home/HeroTrackPlayground";
import { GridCrosshairs } from "@/components/ui/GridCrosshairs";
import { KineticText } from "@/components/ui/KineticText";
import { getUpcomingEvents } from "@/data/events";

export function HeroSection() {
  const nextEvent = getUpcomingEvents()[0];

  return (
    <section className="relative border-b border-hairline bg-canvas lg:flex lg:min-h-[min(820px,calc(100svh-4rem))] lg:items-center lg:py-16 xl:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 items-center lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Hero Copy, CTAs & Next Session Ticker */}
          <div className="flex min-w-0 flex-col gap-3.5 pt-4 pb-4 sm:gap-5 sm:py-8 lg:col-span-6 lg:block lg:space-y-6 lg:py-0">
            <div className="space-y-2.5 sm:space-y-4">
              <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-[1.5px] bg-[#4285F4]"
                />
                <span>GDG on Campus &middot; RVCE Bengaluru</span>
              </p>

              <h1 className="display-expressive text-[2.25rem] font-extrabold tracking-[-0.038em] leading-[1.04] text-ink sm:text-5xl lg:text-[clamp(2.75rem,5vw,4.75rem)] lg:leading-[1.02]">
                <KineticText
                  text="Build open systems at RVCE."
                  mode="mount"
                  staggerSeconds={0.04}
                />
              </h1>

              <m.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                  delay: 0.12,
                }}
                className="space-y-3 sm:space-y-5"
              >
                <p className="max-w-[52ch] text-[14px] leading-relaxed text-ink-muted text-pretty sm:text-base lg:text-lg xl:text-[1.15rem]">
                  A student-run developer community at RV College of Engineering
                  building across Web, AI/ML, Cloud, and Android&mdash;through
                  hands-on workshops, code labs, and weekend study jams.
                </p>

                {/* Primary & Companion Actions — side-by-side 2-col grid on mobile */}
                <div className="grid grid-cols-2 gap-2.5 pt-0.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                  <Link
                    href="/events"
                    className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg bg-[#1A73E8] px-4 py-2 text-sm font-bold text-white transition-spring hover:-translate-y-0.5 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8] sm:min-h-[46px] sm:gap-2 sm:px-5 sm:py-2.5"
                  >
                    <span>Explore Events</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  </Link>

                  <Link
                    href="/team"
                    className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-hairline bg-surface px-4 py-2 text-sm font-bold text-ink transition-spring hover:-translate-y-0.5 hover:bg-surface-muted active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:min-h-[46px] sm:gap-2 sm:px-5 sm:py-2.5"
                  >
                    <Users
                      className="h-4 w-4 shrink-0 text-ink-muted"
                      aria-hidden="true"
                    />
                    <span>Meet the Team</span>
                  </Link>
                </div>
              </m.div>
            </div>

            {/* Inline Live Next Session Ticker */}
            {nextEvent && (
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                  delay: 0.16,
                }}
                className="lg:pt-2"
              >
                <CountdownTimer event={nextEvent} />
              </m.div>
            )}
          </div>

          {/* Interactive Auto-Cycling & Swipeable Track Deck */}
          <m.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 26,
              delay: 0.2,
            }}
            className="min-w-0 pt-1 pb-6 sm:py-8 lg:col-span-6 lg:py-0"
          >
            <HeroTrackPlayground />
          </m.div>
        </div>
      </div>
      <GridCrosshairs />
    </section>
  );
}
