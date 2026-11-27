"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Terminal } from "lucide-react";
import { DomainArtwork, type DomainKey } from "@/components/brand/DomainArtwork";
import { siteConfig, type CommunityPillar } from "@/data/site";

const TRACK_TO_DOMAIN: Record<CommunityPillar["trackFilter"], DomainKey> = {
  Web: "web",
  "AI / ML": "ai",
  Cloud: "cloud",
  Android: "android",
};

const SHAPE_THEMES = [
  {
    // Web — Blue M3 Arch
    bg: "bg-[#1765CC] text-white",
    subInk: "text-[#DCEAFF]",
    shapeClass: "rounded-t-[56px] rounded-b-2xl",
    tiltHover: "hover:-rotate-1",
    ring: "ring-2 ring-offset-2 ring-offset-canvas ring-[#1765CC] dark:ring-[#669DF6]",
    badge: "bg-white text-[#111827]",
    artTone: "auto" as const,
  },
  {
    // AI / ML — Green M3 Clover
    bg: "bg-[#137333] text-white",
    subInk: "text-[#DCF5E3]",
    shapeClass: "rounded-[38px]",
    tiltHover: "hover:rotate-1",
    ring: "ring-2 ring-offset-2 ring-offset-canvas ring-[#137333] dark:ring-[#81C995]",
    badge: "bg-white text-[#111827]",
    artTone: "auto" as const,
  },
  {
    // Cloud — Red M3 Stadium Pill
    bg: "bg-[#C5221F] text-white",
    subInk: "text-[#FDE5E3]",
    shapeClass: "rounded-[48px]",
    tiltHover: "hover:rotate-1",
    ring: "ring-2 ring-offset-2 ring-offset-canvas ring-[#C5221F] dark:ring-[#F28B82]",
    badge: "bg-white text-[#111827]",
    artTone: "auto" as const,
  },
  {
    // Android — Yellow M3 Starburst (STRICT #111827 dark ink)
    bg: "bg-[#FBBC04] text-[#111827]",
    subInk: "text-[#1F2937]",
    shapeClass: "rounded-[24px]",
    tiltHover: "hover:-rotate-1",
    ring: "ring-2 ring-offset-2 ring-offset-canvas ring-[#111827] dark:ring-[#FDD663]",
    badge: "bg-[#111827] text-[#FAF9F6]",
    artTone: "on-yellow" as const,
  },
] as const;

function ExpressiveMotif({ index }: { index: number }) {
  if (index === 0) {
    // M3 Arch background cutout
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 opacity-25"
      >
        <path
          d="M16 120V58C16 33.7 35.7 14 60 14C84.3 14 104 33.7 104 58V120H16Z"
          fill="#A8C7FA"
        />
        <rect x="40" y="44" width="40" height="76" rx="20" fill="#0F4C9E" />
      </svg>
    );
  }
  if (index === 1) {
    // M3 Four-Leaf Clover background cutout
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 opacity-25"
      >
        <circle cx="42" cy="42" r="28" fill="#A8DAB5" />
        <circle cx="78" cy="42" r="28" fill="#A8DAB5" />
        <circle cx="42" cy="78" r="28" fill="#A8DAB5" />
        <circle cx="78" cy="78" r="28" fill="#A8DAB5" />
        <circle cx="60" cy="60" r="16" fill="#0D5225" />
      </svg>
    );
  }
  if (index === 2) {
    // M3 Stadium Pill background cutout
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-4 -bottom-3 h-28 w-28 opacity-25"
      >
        <rect x="10" y="22" width="104" height="40" rx="20" fill="#FAD2CF" />
        <rect x="28" y="68" width="88" height="36" rx="18" fill="#961816" />
      </svg>
    );
  }
  // M3 Scalloped Starburst (Dark ink accent on Yellow)
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className="pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 opacity-15"
    >
      <rect x="24" y="24" width="72" height="72" rx="20" fill="#111827" />
      <rect
        x="24"
        y="24"
        width="72"
        height="72"
        rx="20"
        transform="rotate(30 60 60)"
        fill="#111827"
      />
      <rect
        x="24"
        y="24"
        width="72"
        height="72"
        rx="20"
        transform="rotate(60 60 60)"
        fill="#111827"
      />
    </svg>
  );
}

export function HeroTrackPlayground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePillar = siteConfig.pillars[activeIndex];
  const activeDomain = TRACK_TO_DOMAIN[activePillar.trackFilter];

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    const count = siteConfig.pillars.length;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((idx + 1) % count);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((idx - 1 + count) % count);
    }
  };

  return (
    <div className="space-y-4">
      {/* Asymmetric 2x2 Color-Blocked Material 3 Expressive Shape Playground */}
      <div
        role="tablist"
        aria-label="Interactive Google track selector"
        className="grid grid-cols-2 gap-3.5 sm:gap-4"
      >
        {siteConfig.pillars.map((pillar, idx) => {
          const isActive = idx === activeIndex;
          const theme = SHAPE_THEMES[idx];
          const domain = TRACK_TO_DOMAIN[pillar.trackFilter];

          return (
            <button
              key={pillar.trackFilter}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              onKeyDown={(event) => handleKeyDown(event, idx)}
              className={`group relative flex min-h-[154px] flex-col justify-between overflow-hidden p-4 text-left transition-spring hover:-translate-y-1.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:min-h-[168px] sm:p-5 ${theme.bg} ${theme.shapeClass} ${theme.tiltHover} ${
                isActive ? `${theme.ring} scale-[1.01]` : "opacity-92 hover:opacity-100"
              }`}
            >
              <ExpressiveMotif index={idx} />

              <div className="relative z-10 flex items-start justify-between gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${theme.badge}`}
                >
                  {pillar.shortLabel}
                </span>

                <DomainArtwork
                  domain={domain}
                  size="sm"
                  tone={theme.artTone}
                  className="h-12 w-12 sm:h-14 sm:w-14"
                />
              </div>

              <div className="relative z-10 mt-3">
                <p className="text-base font-extrabold tracking-tight leading-tight sm:text-lg">
                  {pillar.title}
                </p>
                <p
                  className={`mt-1 line-clamp-1 font-mono text-xs font-medium ${theme.subInk}`}
                >
                  {isActive ? "Active · " : ""}
                  {pillar.stackTags.slice(0, 2).join(" · ")}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Track Terminal & RVCE Campus Build Preview */}
      <div
        role="tabpanel"
        aria-label={`${activePillar.title} preview`}
        className="overflow-hidden rounded-2xl border border-hairline bg-[#111827] text-[#F8FAFC] dark:bg-[#141922]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/12 px-4 py-2.5 font-mono text-xs text-[#CBD5E1]">
          <span className="inline-flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-[#669DF6]" aria-hidden="true" />
            <span className="font-semibold text-white">
              {activePillar.title}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-[#F28B82]" aria-hidden="true" />
            <span>{activePillar.campusLab}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="hidden shrink-0 sm:block">
            <DomainArtwork domain={activeDomain} size="sm" tone="on-dark" />
          </div>
          <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-xs leading-relaxed text-[#E2E8F0]">
            <code>{activePillar.cliSnippet.split("\n").slice(0, 2).join("\n")}</code>
          </pre>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/12 bg-white/[0.03] px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {activePillar.stackTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-xs text-[#E2E8F0]"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/events?track=${encodeURIComponent(activePillar.trackFilter)}`}
            className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-xs font-semibold text-[#8AB4F8] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            <span>{`${activePillar.shortLabel} sessions`}</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
