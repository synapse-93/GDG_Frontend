import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { DomainArtwork } from "@/components/brand/DomainArtwork";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center bg-canvas py-20">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <div className="mx-auto flex items-center justify-center">
          <DomainArtwork domain="devfest" size="lg" interactive />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink text-balance sm:text-4xl">
          That almanac page does not exist.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
          The session or route you requested could not be located. Return to
          the studio home or browse the full campus events calendar.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/events"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#1A73E8] px-5 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8] sm:w-auto"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>Browse Events</span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-hairline bg-canvas px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
