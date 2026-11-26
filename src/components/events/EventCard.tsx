import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { GeometricScene3D } from "@/components/brand/GeometricScene3D";
import type { EventItem } from "@/data/events";
import { getTrackAccent, getTrackStyles } from "@/lib/accents";

interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const accentColor = getTrackAccent(event.track);
  const trackStyles = getTrackStyles(event.track);
  const isUpcoming = event.status === "upcoming";

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition-transform duration-200 hover:-translate-y-0.5 ${trackStyles.borderHover}`}
    >
      {/* Blueprint geometric visual stage */}
      <div className="relative flex h-36 items-center justify-between overflow-hidden border-b border-hairline bg-blueprint-grid px-5">
        <div className="z-10 flex flex-col items-start gap-2">
          <span
            className={`inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${trackStyles.badge}`}
          >
            {event.track}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
              isUpcoming
                ? "border-[#34A853]/40 bg-surface text-[#166534] dark:border-[#81C995]/40 dark:text-[#A8DAB5]"
                : "border-hairline bg-surface text-ink-muted"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                isUpcoming ? "bg-gdg-green" : "bg-ink-muted"
              }`}
            />
            {isUpcoming ? "Upcoming" : "Past"}
          </span>
        </div>

        <div className="pointer-events-none flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden">
          <GeometricScene3D
            variant={event.geometryVariant}
            accentColor={accentColor}
            size="md"
          />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight text-ink">
          <Link
            href={`/events/${event.slug}`}
            className="rounded transition-colors hover:text-gdg-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            {event.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {event.tagline}
        </p>

        {/* Logistics metadata */}
        <dl className="mt-4 space-y-1.5 border-t border-hairline pt-4 font-mono text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Date</dt>
            <Calendar
              className="h-3.5 w-3.5 shrink-0 text-gdg-blue"
              aria-hidden="true"
            />
            <dd>{event.dateDisplay}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Time</dt>
            <Clock
              className="h-3.5 w-3.5 shrink-0 text-gdg-green"
              aria-hidden="true"
            />
            <dd>{event.timeDisplay}</dd>
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

        {/* Footer link */}
        <div className="mt-5 pt-1">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1.5 rounded font-mono text-xs font-semibold text-ink transition-colors group-hover:text-gdg-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            <span>{isUpcoming ? "View session details" : "Read recap & agenda"}</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
