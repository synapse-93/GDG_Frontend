import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { EventPoster } from "@/components/events/EventPoster";
import { getUpcomingEvents, type EventTrack } from "@/data/events";
import { getTrackStyles } from "@/lib/accents";

const DATE_CHIP: Record<EventTrack, string> = {
  Web: "bg-[#1765CC] text-white",
  "AI / ML": "bg-[#137333] text-white",
  Cloud: "bg-[#C5221F] text-white",
  Android: "bg-[#FBBC04] text-[#111827]",
};

export function FeaturedEvents() {
  const upcomingEvents = getUpcomingEvents();
  const [flagship, ...remaining] = upcomingEvents;

  if (!flagship) return null;

  return (
    <section
      aria-labelledby="featured-events-heading"
      className="border-b border-hairline bg-canvas py-16 sm:py-24"
    >
      <div className="gdg-reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="featured-events-heading"
              className="text-3xl font-extrabold tracking-[-0.03em] text-ink text-balance sm:text-5xl"
            >
              On the campus build calendar
            </h2>
            <p className="mt-2 max-w-[52ch] text-base text-ink-muted text-pretty">
              Upcoming in-person clinics and hybrid engineering workshops across
              RVCE seminar halls.
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex min-h-[42px] shrink-0 items-center gap-1.5 self-start whitespace-nowrap font-mono text-xs font-semibold text-gdg-blue-ink transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:self-auto"
          >
            <span>Open full calendar</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Asymmetric 7/5 Split: Generative Poster Flagship Spotlight + Schedule Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Flagship Upcoming Session with Generative SVG Poster (7 cols) */}
          <article className="group relative flex flex-col justify-between border-b border-hairline py-8 lg:col-span-7 lg:border-r lg:border-b-0 lg:pr-10">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl transition-spring group-hover:-translate-y-1">
                <EventPoster event={flagship} size="hero" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  <Link
                    href={`/events/${flagship.slug}`}
                    className="rounded transition-colors group-hover:text-gdg-blue-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    {flagship.title}
                  </Link>
                </h3>

                <p className="mt-2.5 max-w-[54ch] text-base leading-relaxed text-ink-muted text-pretty">
                  {flagship.tagline}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-hairline pt-5 sm:flex-row sm:items-center sm:justify-between">
              <dl className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-ink-muted">
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Time</dt>
                  <Clock
                    className="h-3.5 w-3.5 text-gdg-green"
                    aria-hidden="true"
                  />
                  <dd className="tabular-nums">{flagship.timeDisplay}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Venue</dt>
                  <MapPin
                    className="h-3.5 w-3.5 text-gdg-red"
                    aria-hidden="true"
                  />
                  <dd>
                    {flagship.venue} &middot; {flagship.mode}
                  </dd>
                </div>
              </dl>

              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-xs font-semibold text-ink transition-colors group-hover:text-gdg-blue-ink"
              >
                <span>Session details &amp; .ics</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </article>

          {/* Expressive Hairline Schedule Ledger (5 cols) */}
          <div className="flex flex-col justify-between py-8 lg:col-span-5 lg:pl-10">
            <div>
              <h3 className="font-mono text-xs font-semibold text-ink-muted">
                Also upcoming this cycle
              </h3>

              <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                {remaining.map((event) => {
                  const styles = getTrackStyles(event.track);
                  const [day, mon] = event.dateDisplay.split(/\s+/);
                  return (
                    <li key={event.slug}>
                      <Link
                        href={`/events/${event.slug}`}
                        className="group flex items-start gap-4 py-5 transition-snappy hover:bg-surface-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:px-2"
                      >
                        {/* Bold Color-Blocked M3 Date Chip */}
                        <div
                          className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl font-mono transition-spring group-hover:-rotate-3 ${DATE_CHIP[event.track]}`}
                        >
                          <span className="text-lg font-extrabold leading-none tabular-nums">
                            {day}
                          </span>
                          <span className="mt-0.5 text-xs font-bold uppercase">
                            {mon}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span
                              aria-hidden="true"
                              className={`h-2 w-2 rounded-full ${styles.dot}`}
                            />
                            <span className="font-semibold text-ink">
                              {event.track}
                            </span>
                            <span className="text-ink-muted">&middot;</span>
                            <span className="text-ink-muted">{event.mode}</span>
                          </div>

                          <p className="mt-1 text-base font-bold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
                            {event.title}
                          </p>
                          <p className="mt-1 font-mono text-xs text-ink-muted">
                            {event.venue}
                          </p>
                        </div>

                        <ArrowRight
                          className="mt-1 h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gdg-blue-ink"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 pt-2 font-mono text-xs text-ink-muted">
              <span className="text-pretty">
                Includes past session archives &amp; starter repos
              </span>
              <Link
                href="/events?status=past"
                className="shrink-0 whitespace-nowrap font-semibold text-gdg-blue-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                Past recaps &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
