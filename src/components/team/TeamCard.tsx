"use client";

import { useState, type KeyboardEvent, type MouseEvent } from "react";
import * as m from "motion/react-m";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Globe,
  MessageCircle,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { BuilderPortrait } from "@/components/team/BuilderPortrait";
import type { TeamMember } from "@/data/team";
import { ACCENT_STYLES, type AccentColor } from "@/lib/accents";

interface TeamCardProps {
  member: TeamMember;
  variant: "leadership" | "vertical";
  mode: "hanging" | "carousel";
  restTilt?: number;
  onSelect: (member: TeamMember) => void;
}

const ACCENT_TOP_BAR: Record<AccentColor, string> = {
  blue: "bg-[#4285F4] dark:bg-[#669DF6]",
  green: "bg-[#34A853] dark:bg-[#81C995]",
  red: "bg-[#EA4335] dark:bg-[#F28B82]",
  yellow: "bg-[#FBBC04] dark:bg-[#FDD663]",
};

const ACCENT_HEADER_TINT: Record<AccentColor, string> = {
  blue: "from-[#4285F4]/18 via-[#4285F4]/6 to-transparent dark:from-[#669DF6]/22 dark:via-[#669DF6]/8 dark:to-transparent",
  green:
    "from-[#34A853]/18 via-[#34A853]/6 to-transparent dark:from-[#81C995]/22 dark:via-[#81C995]/8 dark:to-transparent",
  red: "from-[#EA4335]/18 via-[#EA4335]/6 to-transparent dark:from-[#F28B82]/22 dark:via-[#F28B82]/8 dark:to-transparent",
  yellow:
    "from-[#FBBC04]/24 via-[#FBBC04]/8 to-transparent dark:from-[#FDD663]/20 dark:via-[#FDD663]/8 dark:to-transparent",
};

const ACCENT_BACK_SURFACE: Record<AccentColor, string> = {
  blue: "from-[#4285F4]/10 via-surface to-surface dark:from-[#669DF6]/14 dark:via-surface dark:to-surface",
  green:
    "from-[#34A853]/10 via-surface to-surface dark:from-[#81C995]/14 dark:via-surface dark:to-surface",
  red: "from-[#EA4335]/10 via-surface to-surface dark:from-[#F28B82]/14 dark:via-surface dark:to-surface",
  yellow:
    "from-[#FBBC04]/14 via-surface to-surface dark:from-[#FDD663]/14 dark:via-surface dark:to-surface",
};

const ACCENT_BORDER_HOVER: Record<AccentColor, string> = {
  blue: "hover:border-[#4285F4]/60 dark:hover:border-[#669DF6]/55",
  green: "hover:border-[#34A853]/60 dark:hover:border-[#81C995]/55",
  red: "hover:border-[#EA4335]/60 dark:hover:border-[#F28B82]/55",
  yellow: "hover:border-[#D99B00]/70 dark:hover:border-[#FDD663]/60",
};

const ACCENT_CLIP_PIN: Record<AccentColor, string> = {
  blue: "bg-[#4285F4] dark:bg-[#669DF6]",
  green: "bg-[#34A853] dark:bg-[#81C995]",
  red: "bg-[#EA4335] dark:bg-[#F28B82]",
  yellow: "bg-[#FBBC04] dark:bg-[#FDD663]",
};

export function TeamCard({
  member,
  variant,
  mode,
  restTilt = 0,
  onSelect,
}: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT_STYLES[member.accentColor];
  const isCoreLead = member.vertical === "Lead & Core";

  const handleToggleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggleFlip();
    }
  };

  const handleOpenProfile = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onSelect(member);
  };

  const handleSocialClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  const cardSizeClass =
    mode === "carousel"
      ? "h-[364px] w-[78vw] max-w-[295px] shrink-0 snap-center"
      : variant === "leadership"
      ? "mx-auto h-[364px] w-full max-w-[330px]"
      : "h-[364px] w-full";

  const hangingRotate = flipped
    ? 0
    : hovered
    ? restTilt === 0
      ? 1.5
      : restTilt * -0.9
    : restTilt;

  const badgeInner = (
    <div className="gdg-card-perspective h-full w-full">
      <m.div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `${member.name}, ${member.role}. Back of badge showing bio and links. Activate to flip back.`
            : `${member.name}, ${member.role}. Activate to flip badge for bio, focus, and links.`
        }
        onClick={handleToggleFlip}
        onKeyDown={handleKeyDown}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
          mass: 0.85,
        }}
        className="gdg-card-3d relative h-full w-full cursor-pointer select-none rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4285F4]"
      >
        {/* FRONT OF LANYARD BADGE */}
        <div
          aria-hidden={flipped}
          className={`gdg-card-face absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface shadow-[0_14px_34px_rgba(12,15,20,0.08)] transition-colors dark:shadow-[0_16px_38px_rgba(0,0,0,0.34)] ${
            ACCENT_BORDER_HOVER[member.accentColor]
          } ${flipped ? "pointer-events-none" : "pointer-events-auto"}`}
        >
          {/* Top Google Color Edge */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-[4px] ${ACCENT_TOP_BAR[member.accentColor]}`}
          />

          {/* Track-Tinted Header with Physical Lanyard Cutout Slot */}
          <div
            className={`relative flex flex-col items-center bg-gradient-to-b px-5 pt-4 pb-3 ${ACCENT_HEADER_TINT[member.accentColor]}`}
          >
            {/* Lanyard slot cutout */}
            <div
              aria-hidden="true"
              className="mb-3 h-2.5 w-12 rounded-full border border-hairline bg-canvas shadow-inner"
            />

            <div className="flex w-full items-center justify-between gap-2">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${accent.badge}`}
              >
                {member.vertical}
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                RVCE &apos;26
              </span>
            </div>
          </div>

          {/* Center Expressive Mascot & Identity */}
          <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
            <BuilderPortrait
              name={member.name}
              accentColor={member.accentColor}
              mask={member.portraitMask}
              motif={member.portraitMotif}
              isCoreLead={isCoreLead}
              imagePath={member.imagePath}
              size="lanyard"
              hovered={hovered && !flipped}
            />

            <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">
              {member.name}
            </h3>
            <p className="mt-1 font-mono text-xs font-medium text-ink-muted">
              {member.role}
            </p>

            <span className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-full border border-hairline bg-canvas px-3 py-1 font-mono text-[11px] text-ink">
              <MessageCircle
                className="h-3 w-3 shrink-0 text-gdg-blue"
                aria-hidden="true"
              />
              <span className="truncate">{member.askMeAbout}</span>
            </span>
          </div>

          {/* Front Footer Micro-Cue */}
          <div className="flex items-center justify-between border-t border-hairline/80 bg-canvas/55 px-5 py-2.5 font-mono text-[11px] font-semibold text-ink-muted">
            <span className="truncate">GDG on Campus</span>
            <span className="inline-flex shrink-0 items-center gap-1 text-gdg-blue-ink">
              <span>{mode === "carousel" ? "Tap to flip" : "Flip"}</span>
              <RotateCw className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* BACK OF LANYARD BADGE (rotated 180deg) */}
        <div
          aria-hidden={!flipped}
          className={`gdg-card-face gdg-card-back absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br p-5 shadow-[0_14px_34px_rgba(12,15,20,0.1)] dark:shadow-[0_16px_38px_rgba(0,0,0,0.4)] ${
            ACCENT_BACK_SURFACE[member.accentColor]
          } ${flipped ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-[4px] ${ACCENT_TOP_BAR[member.accentColor]}`}
          />

          {/* Back Header */}
          <div className="flex items-start justify-between gap-2 pt-0.5">
            <div className="min-w-0">
              <h3 className="truncate text-base font-extrabold tracking-tight text-ink">
                {member.name}
              </h3>
              <p className="truncate font-mono text-[11px] text-ink-muted">
                {member.role}
              </p>
            </div>
            <button
              type="button"
              tabIndex={flipped ? 0 : -1}
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(false);
              }}
              aria-label={`Flip ${member.name}'s badge back to front`}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-canvas text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Bio & Campus Focus */}
          <div className="mt-2.5 flex-1 space-y-2 overflow-hidden">
            <p className="line-clamp-2 text-xs leading-relaxed text-ink-muted text-pretty">
              {member.bio}
            </p>

            <div className="rounded-xl border border-hairline/80 bg-canvas/75 px-3 py-1.5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Campus Focus
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-ink">
                {member.campusFocus}
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Ask me about
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {member.techStack.slice(0, 3).map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-hairline bg-canvas px-2 py-0.5 font-mono text-[10.5px] font-medium text-ink"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links & Full-Width Profile Drawer Trigger */}
          <div className="mt-2.5 space-y-2 border-t border-hairline/80 pt-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {member.links.github && (
                  <a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={flipped ? 0 : -1}
                    onClick={handleSocialClick}
                    aria-label={`${member.name} on GitHub`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-hairline bg-canvas text-ink-muted transition-colors hover:border-gdg-blue/60 hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
                {member.links.linkedin && (
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={flipped ? 0 : -1}
                    onClick={handleSocialClick}
                    aria-label={`${member.name} on LinkedIn`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-hairline bg-canvas text-ink-muted transition-colors hover:border-gdg-blue/60 hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
                {member.links.website && (
                  <a
                    href={member.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={flipped ? 0 : -1}
                    onClick={handleSocialClick}
                    aria-label={`${member.name}'s website`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-hairline bg-canvas text-ink-muted transition-colors hover:border-gdg-blue/60 hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                {member.vertical}
              </span>
            </div>

            <button
              type="button"
              tabIndex={flipped ? 0 : -1}
              onClick={handleOpenProfile}
              className="inline-flex min-h-[34px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#1A73E8] px-3.5 py-1.5 font-mono text-[11px] font-bold text-white transition-colors hover:bg-[#1557B0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
            >
              <span>Sessions &amp; Full Profile</span>
              <ArrowRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </m.div>
    </div>
  );

  if (mode === "carousel") {
    return (
      <m.div
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={cardSizeClass}
      >
        {badgeInner}
      </m.div>
    );
  }

  return (
    <m.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        rotate: hangingRotate,
        y: hovered && !flipped ? -3 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 15,
        mass: 0.9,
      }}
      style={{ transformOrigin: "top center" }}
      className={`relative ${cardSizeClass}`}
    >
      {/* Lanyard Clip Pin & Short Connector Tab */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
      >
        <span
          className={`h-2.5 w-2.5 rounded-full border-2 border-canvas shadow-sm ${ACCENT_CLIP_PIN[member.accentColor]}`}
        />
        <span className="h-3 w-[3px] rounded-b-full bg-hairline dark:bg-ink-muted/60" />
      </div>

      {badgeInner}
    </m.div>
  );
}
