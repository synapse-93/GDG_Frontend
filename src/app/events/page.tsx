import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { events, getUpcomingEvents } from "@/data/events";
import { siteConfig } from "@/data/site";
import { getTrackStyles } from "@/lib/accents";

export const metadata: Metadata = {
  title: "Events",
  description: `Explore upcoming workshops, study jams, and past session recaps hosted by ${siteConfig.chapterName}.`,
};

export default function EventsPage() {
  const flagship = getUpcomingEvents()[0];
  const flagshipStyles = flagship ? getTrackStyles(flagship.track) : null;

  return (
    <div className="bg-canvas">
      {/* Open Editorial Masthead + Next Flagship Session Callout */}
      <section className="border-b border-hairline bg-canvas py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-ink text-balance sm:text-5xl">
                Workshops, Labs &amp; Study Jams
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty">
                Filter upcoming RVCE campus sessions and past technical
                teardowns by track, schedule status, or speaker—switching
                between Posters and a high-scanability Schedule view.
              </p>
            </div>

            {/* Next Flagship Session Editorial Callout (unboxed hairline split) */}
            {flagship && flagshipStyles && (
              <div className="border-t border-hairline pt-5 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#166534] dark:text-[#A8DAB5]">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-gdg-green"
                    />
                    Next Flagship Session
                  </span>
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 font-semibold ${flagshipStyles.badge}`}
                  >
                    {flagship.track}
                  </span>
                </div>

                <Link
                  href={`/events/${flagship.slug}`}
                  className="group mt-2.5 block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
                      {flagship.title}
                    </h2>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gdg-blue-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar
                        className="h-3.5 w-3.5 text-gdg-blue"
                        aria-hidden="true"
                      />
                      {flagship.dateDisplay}
                    </span>
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Clock
                        className="h-3.5 w-3.5 text-gdg-green"
                        aria-hidden="true"
                      />
                      {flagship.timeDisplay}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin
                        className="h-3.5 w-3.5 text-gdg-red"
                        aria-hidden="true"
                      />
                      {flagship.venue}
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Operational Directory */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="border-y border-hairline py-8 font-mono text-xs text-ink-muted">
                Loading campus events directory...
              </div>
            }
          >
            <EventsExplorer events={events} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
