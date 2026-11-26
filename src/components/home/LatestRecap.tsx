import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { GeometricScene3D } from "@/components/brand/GeometricScene3D";
import { getEventBySlug } from "@/data/events";
import { siteConfig } from "@/data/site";
import { getTrackAccent, getTrackStyles } from "@/lib/accents";

export function LatestRecap() {
  const { latestRecap } = siteConfig;
  const linkedEvent = getEventBySlug(latestRecap.eventSlug);
  const accentColor = linkedEvent ? getTrackAccent(linkedEvent.track) : "blue";
  const trackStyles = linkedEvent ? getTrackStyles(linkedEvent.track) : null;

  return (
    <section
      aria-labelledby="latest-recap-heading"
      className="border-b border-hairline bg-canvas py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
            {"04 // SESSION RECAP"}
          </p>
          <h2
            id="latest-recap-heading"
            className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            From the last campus build gathering
          </h2>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-hairline bg-surface">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Editorial notes */}
            <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${
                    trackStyles
                      ? trackStyles.badge
                      : "border-hairline bg-surface-muted text-ink"
                  }`}
                >
                  {latestRecap.track}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted">
                  <Calendar className="h-3.5 w-3.5 text-gdg-blue" aria-hidden="true" />
                  {latestRecap.dateDisplay}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted">
                  <MapPin className="h-3.5 w-3.5 text-gdg-red" aria-hidden="true" />
                  {latestRecap.venue}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {latestRecap.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                {latestRecap.summary}
              </p>

              <ul className="mt-6 space-y-3">
                {latestRecap.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-gdg-green"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {latestRecap.resources.map((resource) => {
                  const isInternal = resource.href.startsWith("/");
                  if (isInternal) {
                    return (
                      <Link
                        key={resource.href}
                        href={resource.href}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#1A73E8] px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-150 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
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
                      className="inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-canvas px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                    >
                      <span>{resource.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Architectural geometric frame */}
            <div className="flex flex-col justify-between border-t border-hairline bg-blueprint-grid p-6 sm:p-8 lg:col-span-5 lg:border-t-0 lg:border-l">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted">
                <span>{"ARCHIVE // LOG"}</span>
                <span>{linkedEvent ? linkedEvent.mode.toUpperCase() : "IN-PERSON"}</span>
              </div>

              <div className="pointer-events-none flex min-h-[210px] items-center justify-center overflow-hidden py-6">
                <GeometricScene3D
                  variant={linkedEvent?.geometryVariant ?? "rings"}
                  accentColor={accentColor}
                  size="lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-hairline pt-4 font-mono text-xs">
                <div className="rounded-xl border border-hairline bg-surface/90 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                    Sessions Logged
                  </p>
                  <p className="mt-1 font-bold text-ink">
                    {linkedEvent ? `${linkedEvent.agenda.length} Agenda Blocks` : "4 Agenda Blocks"}
                  </p>
                </div>
                <div className="rounded-xl border border-hairline bg-surface/90 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                    Format
                  </p>
                  <p className="mt-1 font-bold text-ink">
                    {linkedEvent ? linkedEvent.mode : "In-Person"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
