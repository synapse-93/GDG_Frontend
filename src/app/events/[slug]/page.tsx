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
} from "lucide-react";
import { EventAgenda } from "@/components/events/EventAgenda";
import { EventPoster } from "@/components/events/EventPoster";
import { EventUtilities } from "@/components/events/EventUtilities";
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
    <div className="bg-canvas pb-20">
      <section className="border-b border-hairline bg-canvas py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-32 rounded bg-surface-muted" />
          <div className="mt-6 h-56 w-full rounded-3xl bg-surface-muted" />
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

  const otherUpcoming = getUpcomingEvents().filter(
    (item) => item.slug !== event.slug
  );
  const nextSuggested =
    otherUpcoming[0] ?? events.find((item) => item.slug !== event.slug);

  return (
    <div className="bg-canvas pb-20">
      {/* Full-Bleed Campus Poster Masthead */}
      <section className="border-b border-hairline bg-canvas pt-6 pb-10 sm:pt-8 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="-ml-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-2 py-2.5 font-mono text-xs font-semibold text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Events</span>
          </Link>

          {/* Expressive Generative SVG Poster Banner */}
          <div className="mt-3 overflow-hidden rounded-3xl">
            <EventPoster event={event} size="hero" />
          </div>

          <div className="mt-7 max-w-4xl space-y-3">
            <h1 className="display-expressive text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {event.title}
            </h1>
            <p className="max-w-[54ch] text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              {event.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Main Reading Column + Sticky Action Rail */}
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Calm Reading Column (8 cols) */}
          <div className="space-y-12 lg:col-span-8">
            {/* Overview */}
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

            {/* Outcomes */}
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

            {/* Interactive Expandable Agenda */}
            <section
              aria-labelledby="agenda-heading"
              className="border-t border-hairline pt-10"
            >
              <EventAgenda agenda={event.agenda} dotClass={trackStyles.dot} />
            </section>

            {/* Prerequisites */}
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

            {/* Bottom Onward Navigation */}
            <nav
              aria-label="Continue exploring sessions"
              className="flex flex-col gap-3 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link
                href="/events"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-hairline bg-canvas px-5 py-2.5 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>All Campus Events</span>
              </Link>

              {nextSuggested && (
                <Link
                  href={`/events/${nextSuggested.slug}`}
                  className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-hairline bg-canvas px-5 py-2.5 font-mono text-xs font-semibold text-ink transition-colors hover:bg-surface-muted hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
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

          {/* Sticky Utility Rail (top on mobile) */}
          <aside
            aria-label="Session logistics and calendar export"
            className="order-first lg:order-none lg:sticky lg:top-24 lg:col-span-4"
          >
            <div className="rounded-3xl border border-hairline bg-surface p-6">
              <h2 className="text-base font-extrabold text-ink">
                Session Logistics
              </h2>

              <dl className="mt-4 divide-y divide-hairline border-y border-hairline text-sm sm:mt-5">
                <div className="flex items-start gap-3 py-2.5 sm:py-3.5">
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

                <div className="flex items-start gap-3 py-2.5 sm:py-3.5">
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

                <div className="flex items-start gap-3 py-2.5 sm:py-3.5">
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

                <div className="flex items-start gap-3 py-2.5 sm:py-3.5">
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

                <div className="flex items-start gap-3 py-2.5 sm:py-3.5">
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

              {/* Primary CTA + .ics Invite + Copy Link Utilities */}
              <div className="mt-6">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#1A73E8] px-5 py-3 text-sm font-bold text-white transition-spring hover:-translate-y-0.5 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
                >
                  <span>
                    {isUpcoming ? "Register Now" : "View Recap & Slides"}
                  </span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>

                <EventUtilities event={event} />

                <p className="mt-4 text-center text-balance font-mono text-xs leading-relaxed text-ink-muted">
                  {isUpcoming
                    ? "Free & open to all RVCE branches · Opens GDG chapter page in a new tab."
                    : "Opens GDG chapter archive in a new tab."}
                </p>
              </div>
            </div>
          </aside>
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
