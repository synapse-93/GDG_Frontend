import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
  MapPin,
  Monitor,
  Terminal,
} from "lucide-react";
import { GeometricScene3D } from "@/components/brand/GeometricScene3D";
import { events, getEventBySlug } from "@/data/events";
import { getTrackAccent, getTrackStyles } from "@/lib/accents";

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

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const accentColor = getTrackAccent(event.track);
  const trackStyles = getTrackStyles(event.track);
  const isUpcoming = event.status === "upcoming";

  return (
    <div className="bg-canvas pb-20">
      {/* Top Blueprint Banner */}
      <section className="border-b border-hairline bg-blueprint-grid py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 rounded-lg font-mono text-xs font-semibold text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Events</span>
          </Link>

          <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold ${trackStyles.badge}`}
                >
                  {event.track}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${
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
                  {isUpcoming ? "Upcoming Session" : "Past Session"}
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                {event.tagline}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="pointer-events-none flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-hairline bg-surface/90 p-4 backdrop-blur-sm sm:h-52">
                <GeometricScene3D
                  variant={event.geometryVariant}
                  accentColor={accentColor}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sticky Logistics Sidebar */}
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Primary Column */}
          <div className="space-y-10 lg:col-span-8">
            {/* Overview */}
            <section aria-labelledby="overview-heading">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {"01 // OVERVIEW"}
              </p>
              <h2
                id="overview-heading"
                className="mt-1.5 text-xl font-bold tracking-tight text-ink sm:text-2xl"
              >
                About this session
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                {event.description}
              </p>
            </section>

            {/* Outcomes */}
            <section
              aria-labelledby="outcomes-heading"
              className="rounded-2xl border border-hairline bg-surface p-6"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {"02 // OUTCOMES"}
              </p>
              <h2
                id="outcomes-heading"
                className="mt-1.5 text-xl font-bold tracking-tight text-ink"
              >
                What you will build &amp; learn
              </h2>
              <ul className="mt-4 space-y-3">
                {event.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-gdg-green"
                      aria-hidden="true"
                    />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Structured Agenda Timeline */}
            <section aria-labelledby="agenda-heading">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {"03 // AGENDA"}
              </p>
              <h2
                id="agenda-heading"
                className="mt-1.5 text-xl font-bold tracking-tight text-ink sm:text-2xl"
              >
                Session schedule
              </h2>

              <ol className="mt-5 space-y-3">
                {event.agenda.map((slot, idx) => (
                  <li
                    key={`${slot.time}-${slot.title}`}
                    className="flex flex-col gap-2 rounded-2xl border border-hairline bg-surface p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                  >
                    <div className="flex items-center gap-2.5 sm:w-32 sm:shrink-0">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full ${trackStyles.dot}`}
                      />
                      <span className="font-mono text-xs font-semibold text-ink">
                        {slot.time}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-ink sm:text-base">
                        {slot.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-ink-muted">
                        Speaker: {slot.speaker}
                      </p>
                    </div>
                    <span className="hidden font-mono text-[11px] text-ink-muted sm:inline">
                      {`0${idx + 1}`}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Prerequisites */}
            <section
              aria-labelledby="prerequisites-heading"
              className="rounded-2xl border border-hairline bg-surface p-6"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {"04 // PREREQUISITES"}
              </p>
              <h2
                id="prerequisites-heading"
                className="mt-1.5 text-xl font-bold tracking-tight text-ink"
              >
                Before you arrive
              </h2>
              <ul className="mt-4 space-y-2.5">
                {event.prerequisites.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                  >
                    <Terminal
                      className="mt-0.5 h-4 w-4 shrink-0 text-gdg-blue"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky Sidebar Card */}
          <aside
            aria-label="Session logistics"
            className="lg:sticky lg:top-24 lg:col-span-4"
          >
            <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
              <div aria-hidden="true" className={`h-1 w-full ${trackStyles.bar}`} />

              <div className="p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Session Logistics
                </p>

                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar
                      className="mt-0.5 h-4 w-4 shrink-0 text-gdg-blue"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                        Date
                      </dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {event.dateDisplay}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock
                      className="mt-0.5 h-4 w-4 shrink-0 text-gdg-green"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                        Time
                      </dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {event.timeDisplay}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-gdg-red"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                        Venue / Online Details
                      </dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {event.venue}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Monitor
                      className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                        Mode
                      </dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {event.mode}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Layers
                      className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                        Track
                      </dt>
                      <dd className="mt-1">
                        <span
                          className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold ${trackStyles.badge}`}
                        >
                          {event.track}
                        </span>
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-6 border-t border-hairline pt-6">
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A73E8] px-4 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
                  >
                    <span>
                      {isUpcoming ? "Register Now" : "View Recap & Slides"}
                    </span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <p className="mt-3 text-center font-mono text-[11px] text-ink-muted">
                    Opens official GDG chapter page in a new tab.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
