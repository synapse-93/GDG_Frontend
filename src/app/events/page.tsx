import type { Metadata } from "next";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { events } from "@/data/events";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Events",
  description: `Explore upcoming workshops, study jams, and past session recaps hosted by ${siteConfig.chapterName}.`,
};

export default function EventsPage() {
  return (
    <div className="bg-canvas">
      {/* Blueprint Page Header */}
      <section className="border-b border-hairline bg-blueprint-grid py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
            {"02 // EVENTS"}
          </p>
          <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Workshops, Labs &amp; Study Jams
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Filter upcoming RVCE campus sessions and past technical teardowns
            by track, schedule status, or speaker. Open to builders from all
            disciplines.
          </p>
        </div>
      </section>

      {/* Interactive Directory */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <EventsExplorer events={events} />
        </div>
      </section>
    </div>
  );
}
