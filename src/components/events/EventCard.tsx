"use client";

import Link from "next/link";
import * as m from "motion/react-m";
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
    <m.article
      layout
      layoutId={`event-card-${event.slug}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 360, damping: 32 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface transition-colors ${trackStyles.borderHover}`}
    >
      {/* Generative Color-Blocked Campus Event Poster */}
      <EventPoster
        event={event}
        size="card"
        badgeLayoutId={`event-badge-${event.slug}`}
      />

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        <m.h3
          layout="position"
          layoutId={`event-title-${event.slug}`}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="text-lg font-extrabold tracking-tight text-ink sm:text-xl"
        >
          <Link
            href={`/events/${event.slug}`}
            className="rounded transition-colors group-hover:text-gdg-blue-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            {event.title}
          </Link>
        </m.h3>

        <p className="mt-2 mb-4 line-clamp-2 text-sm leading-relaxed text-ink-muted text-pretty">
          {event.tagline}
        </p>

        {/* Logistics Metadata */}
        <dl className="mt-auto space-y-1.5 border-t border-hairline pt-3.5 font-mono text-xs text-ink-muted">
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
        <div className="mt-4 pt-0.5">
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
    </m.article>
  );
}
