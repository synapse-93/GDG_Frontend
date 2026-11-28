import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
  MapPin,
  Monitor,
  Terminal,
  User,
} from "lucide-react";
import { EventAgenda } from "@/components/events/EventAgenda";
import { EventPoster } from "@/components/events/EventPoster";
import {
  EventUtilities,
  MobileEventActionButtons,
} from "@/components/events/EventUtilities";
import { GridCrosshairs } from "@/components/ui/GridCrosshairs";
import { ScrollStage } from "@/components/ui/ScrollStage";
import { events, getEventBySlug, getUpcomingEvents } from "@/data/events";
import { getTrackStyles } from "@/lib/accents";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event.title,
    description: event.tagline,
  };
}

function EventDetailFallback() {
  return (
    <div className="bg-canvas pb-24 lg:pb-20">
      <section className="border-b border-hairline bg-canvas py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-32 rounded bg-surface-muted" />
          <div className="mt-6 h-56 w-full rounded-2xl bg-surface-muted" />
        </div>
      </section>
    </div>
  );
}

async function EventDetailContent({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const trackStyles = getTrackStyles(event.track);
  const isUpcoming = event.status === "upcoming";

  const uniqueSpeakers = Array.from(
    new Map(
      event.agenda.map((slot) => [
        slot.memberSlug,
        { name: slot.speaker, memberSlug: slot.memberSlug },
      ])
    ).values()
  );

  const otherUpcoming = getUpcomingEvents().filter(
    (item) => item.slug !== event.slug
  );
  const nextSuggested =
    otherUpcoming[0] ?? events.find((item) => item.slug !== event.slug);

  return (
    <div className="bg-canvas pb-28 lg:pb-20">
      {/* Full-Bleed Campus Poster Masthead */}
      <section className="relative border-b border-hairline bg-canvas pt-3 pb-6 sm:pt-8 sm:pb-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="-ml-2 inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-2 py-2 font-mono text-xs font-semibold text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:min-h-[44px]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Events</span>
          </Link>

          {/* Expressive Generative SVG Poster Banner — capped to 175px on mobile */}
          <div className="gdg-card-bevel mt-2 overflow-hidden rounded-xl border border-hairline sm:mt-3">
            <EventPoster
              event={event}
              size="hero"
              className="h-[175px] min-h-0 sm:h-auto sm:min-h-[256px]"
            />
          </div>

          <div className="mt-4 max-w-4xl space-y-3 sm:mt-7 sm:space-y-4">
            <h1 className="display-expressive text-3xl font-extrabold tracking-[-0.038em] leading-[1.04] text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]">
              {event.title}
            </h1>
            <p className="max-w-[54ch] text-sm leading-relaxed text-ink-muted text-pretty sm:text-lg">
              {event.tagline}
            </p>

            {/* Clickable Speaker Chips -> /team?member=<memberSlug> */}
            {uniqueSpeakers.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="font-mono text-xs font-semibold text-ink-muted">
                  Speakers:
                </span>
                {uniqueSpeakers.map((speaker) => (
                  <Link
                    key={speaker.memberSlug}
                    href={`/team?member=${encodeURIComponent(
                      speaker.memberSlug
                    )}`}
                    className="group inline-flex min-h-[32px] items-center gap-1.5 rounded-lg border border-hairline bg-surface px-2.5 py-1 font-mono text-xs font-semibold text-ink transition-colors hover:border-gdg-blue/60 hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:min-h-[34px] sm:px-3"
                  >
                    <User
                      className="h-3.5 w-3.5 text-gdg-blue"
                      aria-hidden="true"
                    />
                    <span>{speaker.name}</span>
                    <ArrowRight
                      className="h-3 w-3 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gdg-blue-ink"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            )}

            {/* Compact 2-Column Mobile Quick-Facts Strip (visible in first screen on < lg) */}
            <dl className="grid grid-cols-2 gap-2.5 rounded-2xl border border-hairline bg-surface p-3.5 font-mono text-xs lg:hidden">
              <div className="flex items-start gap-2">
                <Calendar
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gdg-blue"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <dt className="text-[11px] text-ink-muted">Date</dt>
                  <dd className="truncate font-semibold tabular-nums text-ink">
                    {event.dateDisplay}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gdg-green"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <dt className="text-[11px] text-ink-muted">Time</dt>
                  <dd className="truncate font-semibold tabular-nums text-ink">
                    {event.timeDisplay}
                  </dd>
                </div>
              </div>
              <div className="col-span-2 flex items-start gap-2 border-t border-hairline pt-2.5">
                <MapPin
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gdg-red"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <dt className="text-[11px] text-ink-muted">Venue</dt>
                  <dd className="truncate font-semibold text-ink">
                    {event.venue} &middot; {event.mode}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
        <GridCrosshairs />
      </section>

      {/* Main Reading Column + Sticky Action Rail */}
      <div className="mx-auto mt-8 max-w-[1200px] px-4 sm:px-6 lg:mt-12 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Calm Reading Column (8 cols) */}
          <div className="space-y-12 lg:col-span-8">
            {/* Overview */}
            <ScrollStage>
              <section aria-labelledby="overview-heading">
                <h2
                  id="overview-heading"
                  className="text-2xl font-extrabold tracking-tight text-ink"
                >
                  About this session
                </h2>
                <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-ink-muted text-pretty">
                  {event.description}
                </p>
              </section>
            </ScrollStage>

            {/* Outcomes */}
            <ScrollStage>
              <section
                aria-labelledby="outcomes-heading"
                className="border-t border-hairline pt-10"
              >
                <h2
                  id="outcomes-heading"
                  className="text-2xl font-extrabold tracking-tight text-ink"
                >
                  What you will build &amp; learn
                </h2>
                <ul className="mt-5 divide-y divide-hairline border-y border-hairline">
                  {event.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-3 py-4 text-sm leading-relaxed text-ink sm:text-base"
                    >
                      <CheckCircle2
                        className="mt-1 h-4 w-4 shrink-0 text-gdg-green"
                        aria-hidden="true"
                      />
                      <span className="max-w-[54ch]">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollStage>

            {/* Interactive Expandable Agenda */}
            <ScrollStage>
              <section
                aria-labelledby="agenda-heading"
                className="border-t border-hairline pt-10"
              >
                <EventAgenda agenda={event.agenda} dotClass={trackStyles.dot} />
              </section>
            </ScrollStage>

            {/* Prerequisites */}
            <ScrollStage>
              <section
                aria-labelledby="prerequisites-heading"
                className="border-t border-hairline pt-10"
              >
                <h2
                  id="prerequisites-heading"
                  className="text-2xl font-extrabold tracking-tight text-ink"
                >
                  Before you arrive
                </h2>
                <ul className="mt-5 space-y-3">
                  {event.prerequisites.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted sm:text-base"
                    >
                      <Terminal
                        className="mt-1 h-4 w-4 shrink-0 text-gdg-blue"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollStage>

            {/* Bottom Onward Navigation */}
            <nav
              aria-label="Continue exploring sessions"
              className="flex flex-col gap-3 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link
                href="/events"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-hairline bg-canvas px-5 py-2.5 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>All Campus Events</span>
              </Link>

              {nextSuggested && (
                <Link
                  href={`/events/${nextSuggested.slug}`}
                  className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-hairline bg-canvas px-5 py-2.5 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                >
                  <span className="truncate">{`Next: ${nextSuggested.title}`}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </nav>
          </div>

          {/* Sticky Utility Rail (Desktop lg: only; mobile uses Quick-Facts Strip + Sticky Bottom Bar) */}
          <aside
            aria-label="Session logistics and calendar export"
            className="hidden lg:sticky lg:top-24 lg:col-span-4 lg:block"
          >
            <div className="gdg-card-bevel rounded-xl border border-hairline bg-surface p-6">
              {/* Primary Register CTA at Top */}
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[#1A73E8] px-5 py-2.5 text-sm font-bold text-white transition-spring hover:-translate-y-0.5 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
              >
                <span>
                  {isUpcoming ? "Register for Session" : "View Recap & Slides"}
                </span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>

              <h2 className="mt-5 text-base font-extrabold text-ink">
                Session Logistics
              </h2>

              <dl className="mt-3 divide-y divide-hairline border-y border-hairline text-sm">
                <div className="flex items-start gap-3 py-2.5 sm:py-3">
                  <Calendar
                    className="mt-0.5 h-4 w-4 shrink-0 text-gdg-blue"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-mono text-xs text-ink-muted">Date</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums text-ink">
                      {event.dateDisplay}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2.5 sm:py-3">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-gdg-green"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-mono text-xs text-ink-muted">Time</dt>
                    <dd className="mt-0.5 font-semibold tabular-nums tracking-normal text-ink">
                      {event.timeDisplay}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2.5 sm:py-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-gdg-red"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-mono text-xs text-ink-muted">
                      Venue / Online Details
                    </dt>
                    <dd className="mt-0.5 font-semibold text-ink">
                      {event.venue}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2.5 sm:py-3">
                  <Monitor
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-mono text-xs text-ink-muted">Mode</dt>
                    <dd className="mt-0.5 font-semibold text-ink">
                      {event.mode}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2.5 sm:py-3">
                  <Layers
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-mono text-xs text-ink-muted">Track</dt>
                    <dd className="mt-1">
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-semibold ${trackStyles.badge}`}
                      >
                        {event.track}
                      </span>
                    </dd>
                  </div>
                </div>
              </dl>

              {/* Zero-Backend Calendar & Copy Link Utilities */}
              <EventUtilities event={event} />

              <p className="mt-4 text-center text-balance font-mono text-xs leading-relaxed text-ink-muted">
                {isUpcoming
                  ? "Free & open to all RVCE branches · Opens GDG chapter page in a new tab."
                  : "Opens GDG chapter archive in a new tab."}
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky Bottom Action Bar on Mobile: Register + .ics + Copy Link */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-surface/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-2.5">
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#1A73E8] px-5 py-2.5 text-sm font-bold text-white transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14]"
          >
            <span>
              {isUpcoming ? "Register for Session" : "View Recap"}
            </span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <MobileEventActionButtons event={event} />
        </div>
      </div>
    </div>
  );
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  return (
    <Suspense fallback={<EventDetailFallback />}>
      <EventDetailContent params={params} />
    </Suspense>
  );
}
