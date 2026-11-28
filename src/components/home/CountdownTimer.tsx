"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { EventItem } from "@/data/events";

interface CountdownTimerProps {
  event: EventItem;
}

let cachedNowSec: number | null = null;
let intervalId: number | null = null;
const listeners = new Set<() => void>();

function emitCurrentSecond() {
  const nextSec = Math.floor(Date.now() / 1000);
  if (nextSec !== cachedNowSec) {
    cachedNowSec = nextSec;
    listeners.forEach((listener) => listener());
  }
}

function subscribeToSeconds(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  if (intervalId === null) {
    intervalId = window.setInterval(emitCurrentSecond, 1000);
    window.setTimeout(emitCurrentSecond, 0);
  }

  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0 && intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };
}

function getClientSecondSnapshot(): number | null {
  return cachedNowSec;
}

function getServerSecondSnapshot(): number | null {
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
  const hasStarted = diffSec === 0;

  const days = diffSec === null ? "--" : padTwo(Math.floor(diffSec / 86400));
  const hours =
    diffSec === null ? "--" : padTwo(Math.floor((diffSec % 86400) / 3600));
  const minutes =
    diffSec === null ? "--" : padTwo(Math.floor((diffSec % 3600) / 60));
  const seconds = diffSec === null ? "--" : padTwo(diffSec % 60);

  const segments = [
    { label: "d", value: days },
    { label: "h", value: hours },
    { label: "m", value: minutes },
    { label: "s", value: seconds },
  ];

  return (
    <div className="group relative border-y border-hairline py-4 transition-colors hover:bg-surface-muted/50">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-muted">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-gdg-green"
            />
            <span className="font-semibold text-ink">
              {hasStarted ? "Session underway" : "Next campus session"}
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>{event.dateDisplay}</span>
          </div>

          <Link
            href={`/events/${event.slug}`}
            className="inline-flex max-w-full items-center gap-1.5 rounded text-base font-bold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            <span className="truncate">{event.title}</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gdg-blue-ink"
              aria-hidden="true"
            />
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gdg-blue" aria-hidden="true" />
              <span className="tabular-nums">{event.timeDisplay}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gdg-red" aria-hidden="true" />
              <span>{event.venue}</span>
            </span>
          </div>
        </div>

        {/* Mechanical Split-Flap Countdown Cells (Zero-CLS fixed tabular-nums width) */}
        <div
          role="timer"
          aria-label={`Countdown to ${event.title}`}
          className="flex shrink-0 items-center gap-1.5 border-t border-hairline pt-3 font-mono tabular-nums sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4"
        >
          {segments.map((seg) => (
            <div
              key={seg.label}
              className="inline-flex items-baseline gap-0.5 rounded-lg border border-hairline bg-surface px-1.5 py-1"
            >
              <span className="relative inline-flex h-6 w-[2.15ch] items-center justify-center overflow-hidden sm:h-7">
                <AnimatePresence initial={false} mode="popLayout">
                  <m.span
                    key={seg.value}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 28,
                      mass: 0.6,
                    }}
                    className="inline-block text-lg font-bold leading-none tabular-nums text-ink sm:text-xl"
                  >
                    {seg.value}
                  </m.span>
                </AnimatePresence>
              </span>
              <span className="text-xs font-semibold text-ink-muted">
                {seg.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
