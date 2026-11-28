"use client";

import * as m from "motion/react-m";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BuilderPortrait } from "@/components/team/BuilderPortrait";
import type { TeamMember } from "@/data/team";
import { ACCENT_STYLES } from "@/lib/accents";

interface TeamCardProps {
  member: TeamMember;
  variant: "leadership" | "vertical";
  onSelect: (member: TeamMember) => void;
}

export function TeamCard({ member, variant, onSelect }: TeamCardProps) {
  const accent = ACCENT_STYLES[member.accentColor];
  const isCoreLead = member.vertical === "Lead & Core";

  if (variant === "leadership") {
    return (
      <m.button
        layout
        type="button"
        onClick={() => onSelect(member)}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={`group flex flex-col gap-5 rounded-3xl border border-hairline bg-surface p-6 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:flex-row sm:items-start sm:p-7 ${accent.borderHover}`}
      >
        <BuilderPortrait
          name={member.name}
          accentColor={member.accentColor}
          mask={member.portraitMask}
          motif={member.portraitMotif}
          isCoreLead={isCoreLead}
          imagePath={member.imagePath}
          size="card"
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold ${accent.badge}`}
            >
              {member.vertical}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-gdg-blue-ink">
              <span>Member Profile</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>

          <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink transition-colors group-hover:text-gdg-blue-ink">
            {member.name}
          </h3>
          <p className="mt-0.5 font-mono text-xs text-ink-muted">
            {member.role}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted text-pretty">
            {member.bio}
          </p>

          {/* Subtle "Ask me about..." campus personality pill */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
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
          </div>
        </div>
      </m.button>
    );
  }

  return (
    <m.button
      layout
      type="button"
      onClick={() => onSelect(member)}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`group flex flex-col rounded-3xl border border-hairline bg-surface p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${accent.borderHover}`}
    >
      <div className="flex items-start justify-between gap-3">
        <BuilderPortrait
          name={member.name}
          accentColor={member.accentColor}
          mask={member.portraitMask}
          motif={member.portraitMotif}
          isCoreLead={isCoreLead}
          imagePath={member.imagePath}
          size="card"
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
      <p className="mt-0.5 font-mono text-xs text-ink-muted">{member.role}</p>
      <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted text-pretty">
        {member.bio}
      </p>

      {/* Subtle "Ask me about..." campus personality pill */}
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
        <span>View Profile</span>
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </m.button>
  );
}
