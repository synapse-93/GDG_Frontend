"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { DomainArtwork, type DomainKey } from "@/components/brand/DomainArtwork";
import { siteConfig, type CommunityPillar } from "@/data/site";

const TRACK_TO_DOMAIN: Record<CommunityPillar["trackFilter"], DomainKey> = {
  Web: "web",
  "AI / ML": "ai",
  Cloud: "cloud",
  Android: "android",
};

const INVERTED_ACCENT = {
  blue: {
    pill: "bg-[#669DF6] text-[#0C0F14]",
    dot: "bg-[#669DF6]",
    cta: "bg-[#669DF6] text-[#0C0F14] hover:bg-[#8AB4F8]",
    border: "border-[#669DF6]/45",
  },
  green: {
    pill: "bg-[#81C995] text-[#0C0F14]",
    dot: "bg-[#81C995]",
    cta: "bg-[#81C995] text-[#0C0F14] hover:bg-[#A8DAB5]",
    border: "border-[#81C995]/45",
  },
  red: {
    pill: "bg-[#F28B82] text-[#0C0F14]",
    dot: "bg-[#F28B82]",
    cta: "bg-[#F28B82] text-[#0C0F14] hover:bg-[#F6AEA9]",
    border: "border-[#F28B82]/45",
  },
  yellow: {
    // Strictly dark #111827 ink on Google Yellow
    pill: "bg-[#FBBC04] text-[#111827]",
    dot: "bg-[#FBBC04]",
    cta: "bg-[#FBBC04] text-[#111827] hover:bg-[#FDD663]",
    border: "border-[#FBBC04]/50",
  },
} as const;

export function PillarsGrid() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const active = siteConfig.pillars[selectedIndex];
  const activeStyles = INVERTED_ACCENT[active.accentColor];

  return (
    <section
      aria-labelledby="disciplines-heading"
      className="border-b border-hairline bg-[#111827] py-16 text-[#F8FAFC] dark:bg-[#161D2B] sm:py-24"
    >
      <div className="gdg-reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="disciplines-heading"
              className="text-3xl font-extrabold tracking-[-0.03em] text-white text-balance sm:text-5xl"
            >
              Four disciplines. One open engineering studio.
            </h2>
            <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-[#CBD5E1] text-pretty">
              Inspect our RVCE lab focus, core tooling, and live CLI
              workflows—switch disciplines to explore what ships each semester.
            </p>
          </div>

          {/* 4-Color Google Shape Accent Pill Strip */}
          <div aria-hidden="true" className="flex items-center gap-2">
            <span className="h-3.5 w-8 rounded-full bg-[#4285F4]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#34A853]" />
            <span className="h-3.5 w-3.5 rounded-sm bg-[#EA4335]" />
            <span className="h-3.5 w-6 rounded-full bg-[#FBBC04]" />
          </div>
        </div>

        {/* High-Contrast Inverted Split Workbench */}
        <div className="mt-10 grid grid-cols-1 border-t border-white/15 lg:grid-cols-12">
          {/* Left: 4 Ruled Discipline Selector Rows */}
          <div
            role="tablist"
            aria-label="RVCE engineering disciplines"
            className="divide-y divide-white/15 border-b border-white/15 lg:col-span-5 lg:border-r lg:border-b-0"
          >
            {siteConfig.pillars.map((pillar, idx) => {
              const isSelected = idx === selectedIndex;
              const styles = INVERTED_ACCENT[pillar.accentColor];
              return (
                <button
                  key={pillar.trackFilter}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedIndex(idx)}
                  onKeyDown={(event) => {
                    const count = siteConfig.pillars.length;
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setSelectedIndex((idx + 1) % count);
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setSelectedIndex((idx - 1 + count) % count);
                    }
                  }}
                  className={`group flex w-full items-start justify-between gap-4 px-4 py-5 text-left transition-snappy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                    isSelected
                      ? "bg-white/10 text-white"
                      : "bg-transparent text-[#CBD5E1] hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${styles.dot}`}
                      />
                      <span className="text-base font-bold tracking-tight text-white">
                        {pillar.title}
                      </span>
                    </div>
                    <p className="pl-5 text-sm leading-relaxed text-[#CBD5E1] text-pretty">
                      {pillar.description}
                    </p>
                  </div>
                  <ArrowRight
                    className={`mt-1 h-4 w-4 shrink-0 transition-transform ${
                      isSelected
                        ? "translate-x-0.5 text-white"
                        : "text-white/40 group-hover:translate-x-0.5 group-hover:text-white"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Engineering Focus & CLI Workflow Inspector */}
          <div
            role="tabpanel"
            aria-label={`${active.title} details`}
            className="flex flex-col justify-between pt-8 lg:col-span-7 lg:pt-7 lg:pl-10"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-bold ${activeStyles.pill}`}
                    >
                      {active.trackFilter}
                    </span>
                    <span className="font-mono text-xs text-[#CBD5E1]">
                      {active.campusLab}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                      {active.title}
                    </h3>
                    <p className="mt-2.5 max-w-[54ch] text-base leading-relaxed text-[#CBD5E1] text-pretty">
                      {active.engineeringFocus}
                    </p>
                  </div>
                </div>

                <DomainArtwork
                  domain={TRACK_TO_DOMAIN[active.trackFilter]}
                  size="md"
                  tone="on-dark"
                  interactive
                  className="hidden sm:inline-flex"
                />
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {active.stackTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/18 bg-white/[0.06] px-3 py-1 font-mono text-xs font-semibold text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Real Developer CLI / Architecture Preview */}
              <div
                className={`overflow-hidden rounded-2xl border bg-[#0B0F17] ${activeStyles.border}`}
              >
                <div className="flex items-center justify-between border-b border-white/12 px-4 py-2.5 font-mono text-xs text-[#94A3B8]">
                  <span className="inline-flex items-center gap-2">
                    <Terminal
                      className="h-3.5 w-3.5 text-[#669DF6]"
                      aria-hidden="true"
                    />
                    <span>rvce-studio-lab.sh</span>
                  </span>
                  <span>{active.shortLabel}</span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-[#F8FAFC]">
                  <code>{active.cliSnippet}</code>
                </pre>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
              <p className="text-sm text-[#CBD5E1] text-pretty">
                Open to students across all RVCE engineering branches.
              </p>
              <Link
                href={`/events?track=${encodeURIComponent(active.trackFilter)}`}
                className={`group inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-spring hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${activeStyles.cta}`}
              >
                <span>{`Browse ${active.trackFilter} Events`}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
