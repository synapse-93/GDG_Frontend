import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EventCard } from "@/components/events/EventCard";
import { getUpcomingEvents } from "@/data/events";

export function FeaturedEvents() {
  const upcomingEvents = getUpcomingEvents().slice(0, 3);

  return (
    <section
      aria-labelledby="featured-events-heading"
      className="border-b border-hairline bg-surface/50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
              {"03 // UPCOMING SESSIONS"}
            </p>
            <h2
              id="featured-events-heading"
              className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
            >
              On the campus build calendar
            </h2>
          </div>

          <Link
            href="/events"
            className="group inline-flex items-center gap-1.5 self-start rounded-lg border border-hairline bg-surface px-4 py-2 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:self-auto"
          >
            <span>View all events</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
