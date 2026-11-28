"use client";

import { useState } from "react";
import * as m from "motion/react-m";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BuilderPortrait } from "@/components/team/BuilderPortrait";
import type { TeamMember } from "@/data/team";
import { ACCENT_STYLES, type AccentColor } from "@/lib/accents";

interface TeamCardProps {
  member: TeamMember;
  variant: "leadership" | "vertical";
  onSelect: (member: TeamMember) => void;
}

const ACCENT_TOP_BAR: Record<AccentColor, string> = {
  blue: "bg-[#4285F4] dark:bg-[#669DF6]",
  green: "bg-[#34A853] dark:bg-[#81C995]",
  red: "bg-[#EA4335] dark:bg-[#F28B82]",
  yellow: "bg-[#FBBC04] dark:bg-[#FDD663]",
};

const ACCENT_HOVER_RING: Record<AccentColor, string> = {
  blue: "hover:border-[#4285F4]/65 hover:shadow-[0_12px_30px_rgba(66,133,244,0.12)] dark:hover:border-[#669DF6]/60",
  green:
    "hover:border-[#34A853]/65 hover:shadow-[0_12px_30px_rgba(52,168,83,0.12)] dark:hover:border-[#81C995]/60",
  red: "hover:border-[#EA4335]/65 hover:shadow-[0_12px_30px_rgba(234,67,53,0.12)] dark:hover:border-[#F28B82]/60",
  yellow:
    "hover:border-[#D99B00]/75 hover:shadow-[0_12px_30px_rgba(251,188,4,0.16)] dark:hover:border-[#FDD663]/65",
};

export function TeamCard({ member, variant, onSelect }: TeamCardProps) {
  const [cardHovered, setCardHovered] = useState(false);
  const accent = ACCENT_STYLES[member.accentColor];
  const isCoreLead = member.vertical === "Lead & Core";

  return (
    <>
      {/* MOBILE (< md): Distinct Leadership Spotlight vs. Compact Color-Coded Vertical Card */}
      {variant === "leadership" ? (
        <m.button
          layout
          type="button"
          onClick={() => onSelect(member)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br from-[#4285F4]/10 via-surface to-surface p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:from-[#669DF6]/16 dark:via-surface dark:to-surface md:hidden ${ACCENT_HOVER_RING[member.accentColor]}`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] ${ACCENT_TOP_BAR[member.accentColor]}`}
          />

          <BuilderPortrait
            name={member.name}
            accentColor={member.accentColor}
            mask={member.portraitMask}
            motif={member.portraitMotif}
            isCoreLead={isCoreLead}
            imagePath={member.imagePath}
            size="spotlight"
          />

          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center rounded-full border border-hairline bg-canvas/90 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-ink">
              {member.role}
            </span>
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <h3 className="truncate text-lg font-extrabold tracking-tight text-ink group-hover:text-gdg-blue-ink">
                {member.name}
              </h3>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-gdg-blue-ink transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
            <p className="mt-1 inline-flex max-w-full items-center gap-1 font-mono text-[11px] text-ink-muted">
              <MessageCircle
                className="h-3 w-3 shrink-0 text-gdg-blue"
                aria-hidden="true"
              />
              <span className="truncate">{member.askMeAbout}</span>
            </p>
          </div>
        </m.button>
      ) : (
        <m.button
          layout
          type="button"
          onClick={() => onSelect(member)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className={`group relative flex w-full items-center gap-3.5 overflow-hidden rounded-2xl border border-hairline bg-surface p-3.5 pt-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] md:hidden ${ACCENT_HOVER_RING[member.accentColor]}`}
        >
          {/* Clean color-coded top accent hairline */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] ${ACCENT_TOP_BAR[member.accentColor]}`}
          />

          <BuilderPortrait
            name={member.name}
            accentColor={member.accentColor}
            mask={member.portraitMask}
            motif={member.portraitMotif}
            isCoreLead={isCoreLead}
            imagePath={member.imagePath}
            size="compact"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-base font-extrabold tracking-tight text-ink group-hover:text-gdg-blue-ink">
                {member.name}
              </h3>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-gdg-blue-ink"
                aria-hidden="true"
              />
            </div>
            <p className="truncate font-mono text-xs text-ink-muted">
              {member.role}
            </p>
            <p className="mt-1 inline-flex max-w-full items-center gap-1 font-mono text-[11px] text-ink">
              <MessageCircle
                className="h-3 w-3 shrink-0 text-gdg-blue"
                aria-hidden="true"
              />
              <span className="truncate">{member.askMeAbout}</span>
            </p>
          </div>
        </m.button>
      )}

      {/* DESKTOP & TABLET (md: and up) */}
      {variant === "leadership" ? (
        <m.button
          layout
          type="button"
          onClick={() => onSelect(member)}
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
          onFocus={() => setCardHovered(true)}
          onBlur={() => setCardHovered(false)}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={`group relative hidden gap-5 overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br from-[#4285F4]/8 via-surface to-surface p-6 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:from-[#669DF6]/14 dark:via-surface dark:to-surface md:flex md:items-start lg:p-7 ${ACCENT_HOVER_RING[member.accentColor]}`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] opacity-80 transition-opacity group-hover:opacity-100 ${ACCENT_TOP_BAR[member.accentColor]}`}
          />

          <BuilderPortrait
            name={member.name}
            accentColor={member.accentColor}
            mask={member.portraitMask}
            motif={member.portraitMotif}
            isCoreLead={isCoreLead}
            imagePath={member.imagePath}
            size="card"
            hovered={cardHovered}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${accent.badge}`}
              >
                {member.vertical}
              </span>
              <span className="inline-flex items-center rounded-full border border-hairline bg-canvas/90 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-ink">
                {member.role}
              </span>
            </div>

            <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
              {member.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted text-pretty">
              {member.bio}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-hairline/80 pt-3.5">
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-hairline bg-canvas px-3 py-1 font-mono text-xs text-ink">
                <MessageCircle
                  className="h-3.5 w-3.5 shrink-0 text-gdg-blue"
                  aria-hidden="true"
                />
                <span className="truncate">
                  <span className="text-ink-muted">Ask me about:</span>{" "}
                  {member.askMeAbout}
                </span>
              </span>

              <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs font-semibold text-gdg-blue-ink">
                <span>Open Profile</span>
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </m.button>
      ) : (
        <m.button
          layout
          type="button"
          onClick={() => onSelect(member)}
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
          onFocus={() => setCardHovered(true)}
          onBlur={() => setCardHovered(false)}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={`group relative hidden flex-col overflow-hidden rounded-3xl border border-hairline bg-surface p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] md:flex ${ACCENT_HOVER_RING[member.accentColor]}`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] opacity-65 transition-opacity group-hover:opacity-100 ${ACCENT_TOP_BAR[member.accentColor]}`}
          />

          <div className="flex items-start justify-between gap-3">
            <BuilderPortrait
              name={member.name}
              accentColor={member.accentColor}
              mask={member.portraitMask}
              motif={member.portraitMotif}
              isCoreLead={isCoreLead}
              imagePath={member.imagePath}
              size="card"
              hovered={cardHovered}
            />
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${accent.badge}`}
            >
              {member.vertical}
            </span>
          </div>

          <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
            {member.name}
          </h3>
          <p className="mt-0.5 font-mono text-xs text-ink-muted">
            {member.role}
          </p>
          <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted text-pretty">
            {member.bio}
          </p>

          <div className="mt-4">
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-hairline bg-canvas px-2.5 py-1 font-mono text-xs text-ink">
              <MessageCircle
                className="h-3 w-3 shrink-0 text-gdg-blue"
                aria-hidden="true"
              />
              <span className="truncate">{member.askMeAbout}</span>
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3.5 font-mono text-xs font-semibold text-ink transition-colors group-hover:text-gdg-blue-ink">
            <span>Open Profile</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </m.button>
      )}
    </>
  );
}
