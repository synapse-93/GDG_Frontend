"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  FileCode2,
  MapPin,
} from "lucide-react";
import { EventPoster } from "@/components/events/EventPoster";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getEventBySlug } from "@/data/events";
import { siteConfig } from "@/data/site";
import { getTrackStyles } from "@/lib/accents";

export function LatestRecap() {
  const { latestRecap } = siteConfig;
  const [activeTabId, setActiveTabId] = useState(
    latestRecap.takeawayTabs[0].id
  );

  const linkedEvent = getEventBySlug(latestRecap.eventSlug);
  const trackStyles = linkedEvent ? getTrackStyles(linkedEvent.track) : null;
  const activeTab =
    latestRecap.takeawayTabs.find((t) => t.id === activeTabId) ??
    latestRecap.takeawayTabs[0];

  return (
    <section
      aria-labelledby="latest-recap-heading"
      className="border-b border-hairline bg-surface-muted/45 py-14 scroll-mt-16 lg:flex lg:min-h-[calc(100svh-4rem)] lg:snap-start lg:flex-col lg:justify-center lg:py-8"
    >
      <ScrollReveal className="w-full">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Left: Magazine Editorial Field Note (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-muted">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-0.5 font-semibold ${
                    trackStyles
                      ? trackStyles.badge
                      : "border-hairline bg-surface text-ink"
                  }`}
                >
                  {latestRecap.track}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar
                    className="h-3.5 w-3.5 text-gdg-blue"
                    aria-hidden="true"
                  />
                  {latestRecap.dateDisplay}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin
                    className="h-3.5 w-3.5 text-gdg-red"
                    aria-hidden="true"
                  />
                  {latestRecap.venue}
                </span>
              </div>

              <h2
                id="latest-recap-heading"
                className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.08]"
              >
                {latestRecap.title}
              </h2>

              <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-ink-muted text-pretty lg:text-[15px] lg:leading-snug">
                {latestRecap.summary}
              </p>

              {/* Interactive Takeaway Tabs */}
              <div className="mt-6 border-t border-hairline pt-5 lg:mt-5 lg:pt-4">
                <div
                  role="tablist"
                  aria-label="Session recap takeaways"
                  className="flex flex-wrap gap-2"
                >
                  {latestRecap.takeawayTabs.map((tab) => {
                    const selected = tab.id === activeTab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`inline-flex min-h-[38px] items-center rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold transition-snappy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                          selected
                            ? "border-ink bg-ink text-canvas"
                            : "border-hairline bg-surface text-ink-muted hover:bg-canvas hover:text-ink"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  role="tabpanel"
                  aria-label={activeTab.label}
                  className="mt-4 border-l-2 border-gdg-blue pl-4 sm:pl-5 lg:mt-3.5"
                >
                  <h3 className="text-base font-bold text-ink">
                    {activeTab.headline}
                  </h3>
                  <p className="mt-1.5 max-w-[50ch] text-sm leading-relaxed text-ink-muted text-pretty">
                    {activeTab.detail}
                  </p>
                  <p className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-xs text-gdg-blue-ink">
                    <FileCode2
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="break-all">{activeTab.artifact}</span>
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-5">
                {latestRecap.resources.map((resource) => {
                  const isInternal = resource.href.startsWith("/");
                  if (isInternal) {
                    return (
                      <Link
                        key={resource.href}
                        href={resource.href}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#1A73E8] px-6 py-2.5 text-sm font-bold text-white transition-spring hover:-translate-y-0.5 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8] sm:w-auto"
                      >
                        <span>{resource.label}</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={resource.href}
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-hairline bg-surface px-6 py-2.5 text-sm font-bold text-ink transition-spring hover:-translate-y-0.5 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:w-auto"
                    >
                      <span>{resource.label}</span>
                      <ArrowUpRight
                        className="h-4 w-4 text-ink-muted"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right: Generative Color-Blocked Poster + Archive Metadata (5 cols) */}
            <div className="space-y-4 lg:col-span-5">
              {linkedEvent && (
                <div className="overflow-hidden rounded-3xl">
                  <EventPoster
                    event={linkedEvent}
                    size="recap"
                    className="lg:min-h-0 lg:h-[215px]"
                  />
                </div>
              )}

              <dl className="divide-y divide-hairline border-y border-hairline font-mono text-xs">
                <div className="flex items-center justify-between py-3 lg:py-2.5">
                  <dt className="text-ink-muted">Agenda Blocks</dt>
                  <dd className="font-semibold text-ink">
                    {linkedEvent
                      ? `${linkedEvent.agenda.length} sessions logged`
                      : "4 sessions logged"}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3 lg:py-2.5">
                  <dt className="text-ink-muted">Format</dt>
                  <dd className="font-semibold text-ink">
                    {linkedEvent ? linkedEvent.mode : "In-Person"}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3 lg:py-2.5">
                  <dt className="text-ink-muted">Archive Status</dt>
                  <dd className="font-semibold text-ink">
                    Notes &amp; repo published
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
