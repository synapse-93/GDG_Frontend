"use client";

import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { CalendarPlus, Check, Link2 } from "lucide-react";
import type { EventItem } from "@/data/events";

interface EventUtilitiesProps {
  event: EventItem;
}

function toIcsUtcTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function buildIcsContent(event: EventItem): string {
  const dtStamp = toIcsUtcTimestamp(new Date().toISOString());
  const dtStart = toIcsUtcTimestamp(event.dateISO);
  const dtEnd = toIcsUtcTimestamp(event.endISO);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GDG on Campus RVCE//Events Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.slug}@gdg-on-campus-rvce.demo`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(`${event.title} — GDG on Campus RVCE`)}`,
    `LOCATION:${escapeIcsText(`${event.venue} (${event.mode})`)}`,
    `DESCRIPTION:${escapeIcsText(
      `${event.tagline}\n\n${event.description}\n\nTrack: ${event.track}\nTime: ${event.timeDisplay}`
    )}`,
    `URL:${event.registrationUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

export function EventUtilities({ event }: EventUtilitiesProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownloadIcs = () => {
    const ics = buildIcsContent(event);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${event.slug}.ics`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 2600);
  };

  const handleCopyLink = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="mt-4 space-y-2.5">
      <button
        type="button"
        onClick={handleDownloadIcs}
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-hairline bg-canvas px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {downloaded ? (
            <m.span
              key="ics-done"
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: "spring", stiffness: 460, damping: 26 }}
              className="inline-flex items-center gap-2"
            >
              <Check
                className="h-4 w-4 text-gdg-green"
                aria-hidden="true"
              />
              <span>Saved {event.slug}.ics</span>
            </m.span>
          ) : (
            <m.span
              key="ics-idle"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="inline-flex items-center gap-2"
            >
              <CalendarPlus
                className="h-4 w-4 text-gdg-blue"
                aria-hidden="true"
              />
              <span>Download .ics Calendar</span>
            </m.span>
          )}
        </AnimatePresence>
      </button>

      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-full border border-hairline bg-transparent px-4 py-2 font-mono text-xs font-semibold text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <m.span
              key="copy-done"
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: "spring", stiffness: 460, damping: 26 }}
              className="inline-flex items-center gap-2 text-ink"
            >
              <Check className="h-3.5 w-3.5 text-gdg-green" aria-hidden="true" />
              <span>Copied session link</span>
            </m.span>
          ) : (
            <m.span
              key="copy-idle"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="inline-flex items-center gap-2"
            >
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copy Session Link</span>
            </m.span>
          )}
        </AnimatePresence>
      </button>

      <span className="sr-only" aria-live="polite">
        {downloaded
          ? `Downloaded calendar invite for ${event.title}`
          : copied
          ? "Session link copied to clipboard"
          : ""}
      </span>
    </div>
  );
}
