"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import type { EventItem } from "@/data/events";

interface CountdownTimerProps {
  event: EventItem;
}

function subscribeToSeconds(onStoreChange: () => void) {
  const intervalId = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(intervalId);
}

function getClientSecondSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerSecondSnapshot() {
  return null;
}

function padTwo(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

export function CountdownTimer({ event }: CountdownTimerProps) {
  const nowSec = useSyncExternalStore(
    subscribeToSeconds,
    getClientSecondSnapshot,
    getServerSecondSnapshot
  );

  const targetSec = Math.floor(new Date(event.dateISO).getTime() / 1000);
  const diffSec = nowSec === null ? null : Math.max(0, targetSec - nowSec);

  const days = diffSec === null ? "--" : padTwo(Math.floor(diffSec / 86400));
  const hours =
    diffSec === null ? "--" : padTwo(Math.floor((diffSec % 86400) / 3600));
  const minutes =
    diffSec === null ? "--" : padTwo(Math.floor((diffSec % 3600) / 60));
  const seconds = diffSec === null ? "--" : padTwo(diffSec % 60);

  const segments = [
    { label: "DAYS", value: days },
    { label: "HRS", value: hours },
    { label: "MIN", value: minutes },
    { label: "SEC", value: seconds },
  ];

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-gdg-green"
          />
          Next Up on Campus
        </span>
        <span className="font-mono text-[11px] text-ink-muted">
          {event.dateDisplay}
        </span>
      </div>

      <div className="mt-3.5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <Link
            href={`/events/${event.slug}`}
            className="group inline-flex items-center gap-1.5 rounded text-base font-bold tracking-tight text-ink transition-colors hover:text-gdg-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            <span className="truncate">{event.title}</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gdg-blue"
              aria-hidden="true"
            />
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-gdg-blue" aria-hidden="true" />
              {event.timeDisplay}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gdg-red" aria-hidden="true" />
              {event.venue}
            </span>
          </div>
        </div>

        <div
          role="timer"
          aria-label={`Countdown to ${event.title}`}
          className="grid shrink-0 grid-cols-4 gap-1.5 sm:gap-2"
        >
          {segments.map((seg) => (
            <div
              key={seg.label}
              className="flex min-w-[54px] flex-col items-center rounded-xl border border-hairline bg-canvas px-2 py-2"
            >
              <span className="font-mono text-base font-bold tabular-nums text-ink sm:text-lg">
                {seg.value}
              </span>
              <span className="mt-0.5 font-mono text-[9px] font-medium tracking-wider text-ink-muted">
                {seg.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
