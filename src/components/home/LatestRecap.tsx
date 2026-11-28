import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { GridCrosshairs } from "@/components/ui/GridCrosshairs";
import { KineticText } from "@/components/ui/KineticText";
import { ScrollStage } from "@/components/ui/ScrollStage";
import { getPastEvents, type EventTrack } from "@/data/events";
import { siteConfig } from "@/data/site";
import { getTrackStyles } from "@/lib/accents";

const TRACK_SQUARE: Record<EventTrack, string> = {
  Web: "bg-[#4285F4]",
  "AI / ML": "bg-[#34A853]",
  Cloud: "bg-[#EA4335]",
  Android: "bg-[#FBBC04]",
};

export function LatestRecap() {
  const { latestRecap } = siteConfig;
  const pastEvents = getPastEvents().filter((ev) => Boolean(ev.recapImage));
  const flagshipRecap = pastEvents[0];
  const trackStyles = flagshipRecap ? getTrackStyles(flagshipRecap.track) : null;

  return (
    <section
      aria-labelledby="latest-recap-heading"
      className="relative border-b border-hairline bg-surface-muted/45 py-10 sm:py-16 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center lg:py-14"
    >
      <ScrollStage className="w-full">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: Editorial Recap Summary + 3 Concrete Takeaways (5 cols) */}
            <div className="lg:col-span-5">
              <p className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-[1.5px] bg-[#EA4335]"
                />
                <span>Latest Recap</span>
              </p>

              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-muted">
                <span
                  className={`inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold ${
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
                className="mt-4 text-3xl font-extrabold tracking-[-0.032em] text-ink text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.06]"
              >
                <KineticText text={latestRecap.title} />
              </h2>

              <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
                {latestRecap.summary}
              </p>

              {/* 3 Concrete Session Takeaways */}
              <ul className="mt-6 space-y-3 border-t border-hairline pt-5">
                {latestRecap.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-gdg-green"
                      aria-hidden="true"
                    />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {latestRecap.resources.map((resource) => {
                  const isInternal = resource.href.startsWith("/");
                  if (isInternal) {
                    return (
                      <Link
                        key={resource.href}
                        href={resource.href}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#1A73E8] px-5 py-2.5 text-sm font-bold text-white transition-spring hover:-translate-y-0.5 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8] sm:w-auto"
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
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-hairline bg-surface px-5 py-2.5 text-sm font-bold text-ink transition-spring hover:-translate-y-0.5 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:w-auto"
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

            {/* Right: Past Session Photography Grid linking directly to /events/[slug] (7 cols) */}
            <div className="space-y-3.5 lg:col-span-7">
              <div className="flex items-center justify-between gap-2 font-mono text-xs text-ink-muted">
                <span>Recent campus recaps</span>
                <Link
                  href="/events?status=past"
                  className="font-semibold text-gdg-blue-ink transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                >
                  All past sessions &rarr;
                </Link>
              </div>

              <div className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0">
                {pastEvents.map((ev, idx) => {
                  const isFeatured = idx === 0;
                  const photo = ev.recapImage!;
                  return (
                    <Link
                      key={ev.slug}
                      href={`/events/${ev.slug}`}
                      className={`gdg-card-bevel group flex w-[82vw] max-w-[310px] shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-hairline bg-surface text-left transition-colors hover:border-ink/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:w-auto sm:max-w-none ${
                        isFeatured ? "sm:col-span-2" : ""
                      }`}
                    >
                      <div
                        className={`relative w-full overflow-hidden bg-surface-muted ${
                          isFeatured
                            ? "aspect-[16/9] sm:h-[246px] sm:aspect-auto"
                            : "aspect-[16/10] sm:h-[180px] sm:aspect-auto"
                        }`}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes={
                            isFeatured
                              ? "(max-width: 640px) 82vw, (max-width: 1024px) 92vw, 56vw"
                              : "(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 28vw"
                          }
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                        />
                        <span className="pointer-events-none absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-black/55 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-white backdrop-blur-[2px]">
                          <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 rounded-[1.5px] ${TRACK_SQUARE[ev.track]}`}
                          />
                          <span>{ev.track}</span>
                          <span aria-hidden="true" className="opacity-65">
                            &middot;
                          </span>
                          <span className="tabular-nums">{ev.dateDisplay}</span>
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col justify-between gap-1 px-4 py-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
                            {ev.title}
                          </h3>
                          <ArrowRight
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gdg-blue-ink"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="flex items-center justify-between gap-2 font-mono text-[11px] text-ink-muted">
                          <span className="truncate">{ev.venue}</span>
                          <span className="shrink-0 text-[10px]">
                            {photo.credit}
                          </span>
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </ScrollStage>
      <GridCrosshairs />
    </section>
  );
}
