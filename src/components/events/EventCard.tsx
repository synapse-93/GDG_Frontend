import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { EventPoster } from "@/components/events/EventPoster";
import type { EventItem } from "@/data/events";
import { getTrackStyles } from "@/lib/accents";

interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const trackStyles = getTrackStyles(event.track);
  const isUpcoming = event.status === "upcoming";

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface transition-spring hover:-translate-y-1.5 ${trackStyles.borderHover}`}
    >
      {/* Generative Color-Blocked Campus Event Poster */}
      <EventPoster event={event} size="card" />

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-extrabold tracking-tight text-ink">
          <Link
            href={`/events/${event.slug}`}
            className="rounded transition-colors group-hover:text-gdg-blue-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            {event.title}
          </Link>
        </h3>

        <p className="mt-2.5 mb-5 line-clamp-3 text-sm leading-relaxed text-ink-muted text-pretty">
          {event.tagline}
        </p>

        {/* Logistics Metadata */}
        <dl className="mt-auto space-y-1.5 border-t border-hairline pt-4 font-mono text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Time</dt>
            <Clock
              className="h-3.5 w-3.5 shrink-0 text-gdg-green"
              aria-hidden="true"
            />
            <dd className="tabular-nums">{event.timeDisplay}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Venue and mode</dt>
            <MapPin
              className="h-3.5 w-3.5 shrink-0 text-gdg-red"
              aria-hidden="true"
            />
            <dd className="truncate">
              {event.venue} &middot; {event.mode}
            </dd>
          </div>
        </dl>

        {/* Footer Cue (single tab stop lives on stretched title link above) */}
        <div className="mt-5 pt-1">
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink transition-colors group-hover:text-gdg-blue-ink"
          >
            <span>
              {isUpcoming ? "View session details" : "Read recap & agenda"}
            </span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
