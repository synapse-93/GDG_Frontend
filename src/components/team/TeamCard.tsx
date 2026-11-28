"use client";

import { useState, type KeyboardEvent, type MouseEvent } from "react";
import * as m from "motion/react-m";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Globe,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import {
  getInitials,
  getMemberCredential,
  TrackGlyph,
} from "@/components/team/BuilderPortrait";
import type { TeamMember } from "@/data/team";
import { type AccentColor } from "@/lib/accents";

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

const ACCENT_INK: Record<AccentColor, string> = {
  blue: "text-[#1765CC] dark:text-[#669DF6]",
  green: "text-[#137333] dark:text-[#81C995]",
  red: "text-[#C5221F] dark:text-[#F28B82]",
  yellow: "text-[#9A6700] dark:text-[#FDD663]",
};

const ACCENT_BORDER_HOVER: Record<AccentColor, string> = {
  blue: "hover:border-[#4285F4]/70 dark:hover:border-[#669DF6]/65",
  green: "hover:border-[#34A853]/70 dark:hover:border-[#81C995]/65",
  red: "hover:border-[#EA4335]/70 dark:hover:border-[#F28B82]/65",
  yellow: "hover:border-[#D99B00]/80 dark:hover:border-[#FDD663]/70",
};

const ACCENT_CLIP_PIN: Record<AccentColor, string> = {
  blue: "bg-[#4285F4] dark:bg-[#669DF6]",
  green: "bg-[#34A853] dark:bg-[#81C995]",
  red: "bg-[#EA4335] dark:bg-[#F28B82]",
  yellow: "bg-[#FBBC04] dark:bg-[#FDD663]",
};

/** Crisp deterministic pass barcode strip for the bottom edge of each RVCE credential badge */
function PassBarcode({ seed }: { seed: number }) {
  const widths = [1.5, 3, 1, 2, 1, 3.5, 1.5, 1, 2.5, 1.5, 3, 1, 2, 1.5];
  let x = 0;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 12"
      className="h-3 w-16 text-ink/35"
      fill="currentColor"
    >
      {widths.map((w, idx) => {
        const barW = widths[(idx + seed) % widths.length];
        const rectX = x;
        x += barW + 1.8;
        return <rect key={idx} x={rectX} y={0} width={barW} height={12} rx={0.4} />;
      })}
    </svg>
  );
}

export function TeamCard({
  member,
  variant,
  mode,
  restTilt = 0,
  onSelect,
}: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const credential = getMemberCredential(member.portraitMotif);
  const initials = getInitials(member.name);
  const barcodeSeed = Number(credential.passNumber) || 1;

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
      ? "h-[336px] w-[78vw] max-w-[295px] shrink-0 snap-center"
      : variant === "leadership"
      ? "mx-auto h-[312px] w-full max-w-[336px]"
      : "h-[312px] w-full";

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
            : `${member.name}, ${member.role}. Pass ${credential.passLabel}. Activate to flip badge for bio, focus, and links.`
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
        className="gdg-card-3d relative h-full w-full cursor-pointer select-none rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4285F4]"
      >
        {/* FRONT OF RVCE EVENT-PASS / CREDENTIAL BADGE */}
        <div
          aria-hidden={flipped}
          className={`gdg-card-face gdg-card-bevel absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface transition-colors ${
            ACCENT_BORDER_HOVER[member.accentColor]
          } ${flipped ? "pointer-events-none" : "pointer-events-auto"}`}
        >
          {/* Laminated Diagonal Specular Sheen Sweep on Hover/Tilt */}
          <span
            aria-hidden="true"
            data-active={hovered && !flipped ? "true" : "false"}
            className="gdg-lanyard-sheen pointer-events-none absolute inset-0 z-10"
          />

          {/* Crisp 3px solid track color top stripe (zero glow bleed) */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] ${ACCENT_TOP_BAR[member.accentColor]}`}
          />

          {/* Top Lanyard Slot & Header Metadata */}
          <div className="flex flex-col items-center px-4 pt-3.5 pb-2.5">
            <div
              aria-hidden="true"
              className="mb-2.5 h-2 w-11 rounded-md border border-hairline bg-canvas"
            />
            <div className="flex w-full items-center justify-between gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em]">
              <span className={ACCENT_INK[member.accentColor]}>
                {member.vertical}
              </span>
              <span className="text-ink-muted">RVCE &apos;26</span>
            </div>
          </div>

          {/* Center Editorial Typographic Credential Block */}
          <div className="border-y border-hairline bg-canvas/70 px-4 py-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  Chapter Pass
                </p>
                <p className="mt-0.5 font-mono text-2xl font-extrabold tracking-[-0.04em] leading-none text-ink tabular-nums">
                  <span>{credential.passNumber}</span>
                  <span
                    className={`mx-1.5 font-bold ${ACCENT_INK[member.accentColor]}`}
                  >
                    {"//"}
                  </span>
                  <span>{credential.roleCode}</span>
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-hairline bg-surface">
                <TrackGlyph
                  motif={member.portraitMotif}
                  className={`h-4 w-4 ${ACCENT_INK[member.accentColor]}`}
                />
                <span className="mt-0.5 font-mono text-[9px] font-bold tracking-wider text-ink-muted">
                  {initials}
                </span>
              </div>
            </div>
          </div>

          {/* Identity & Plain-Text Ask Me About */}
          <div className="flex flex-1 flex-col justify-between px-4 py-3">
            <div>
              <h3 className="truncate text-lg font-extrabold tracking-tight text-ink">
                {member.name}
              </h3>
              <p className="mt-0.5 truncate font-mono text-xs text-ink-muted">
                {member.role}
              </p>
            </div>

            <p className="mt-2 line-clamp-2 text-xs leading-snug text-ink-muted">
              <span className="font-mono text-[11px] font-semibold text-ink">
                Ask me about:
              </span>{" "}
              {member.askMeAbout}
            </p>
          </div>

          {/* Minimalist Pass Barcode & Flip Cue */}
          <div className="flex items-center justify-between border-t border-hairline bg-canvas/55 px-4 py-2 font-mono text-[11px] font-semibold text-ink-muted">
            <PassBarcode seed={barcodeSeed} />
            <span className="inline-flex shrink-0 items-center gap-1 text-gdg-blue-ink">
              <span>{mode === "carousel" ? "Tap to flip" : "Flip"}</span>
              <RotateCw className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* BACK OF LANYARD BADGE (rotated 180deg) */}
        <div
          aria-hidden={!flipped}
          className={`gdg-card-face gdg-card-back gdg-card-bevel absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface p-4 ${
            flipped ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] ${ACCENT_TOP_BAR[member.accentColor]}`}
          />

          {/* Back Header */}
          <div className="flex items-start justify-between gap-2 pt-0.5">
            <div className="min-w-0">
              <h3 className="truncate text-base font-extrabold tracking-tight text-ink">
                {member.name}
              </h3>
              <p className="truncate font-mono text-[11px] text-ink-muted">
                {credential.passLabel} &middot; {member.role}
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
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Bio & Campus Focus */}
          <div className="mt-2 flex-1 space-y-2 overflow-hidden">
            <p className="line-clamp-2 text-xs leading-relaxed text-ink-muted text-pretty">
              {member.bio}
            </p>

            <div className="rounded-lg border border-hairline bg-canvas/75 px-2.5 py-1.5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Campus Focus
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-ink">
                {member.campusFocus}
              </p>
            </div>

            <div className="flex flex-wrap gap-1">
              {member.techStack.slice(0, 3).map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-hairline bg-canvas px-1.5 py-0.5 font-mono text-[10px] font-medium text-ink"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links & Full-Width Profile Drawer Trigger */}
          <div className="mt-2 space-y-2 border-t border-hairline pt-2">
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
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink-muted transition-colors hover:border-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
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
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink-muted transition-colors hover:border-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
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
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink-muted transition-colors hover:border-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                {member.vertical}
              </span>
            </div>

            <button
              type="button"
              tabIndex={flipped ? 0 : -1}
              onClick={handleOpenProfile}
              className="inline-flex min-h-[34px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#1A73E8] px-3 py-1.5 font-mono text-[11px] font-bold text-white transition-colors hover:bg-[#1557B0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] dark:bg-[#669DF6] dark:text-[#0C0F14] dark:hover:bg-[#8AB4F8]"
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
        className="pointer-events-none absolute -top-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
      >
        <span
          className={`h-2.5 w-2.5 rounded-full border-2 border-canvas ${ACCENT_CLIP_PIN[member.accentColor]}`}
        />
        <span className="h-2.5 w-[2.5px] rounded-b-sm bg-hairline dark:bg-ink-muted/60" />
      </div>

      {badgeInner}
    </m.div>
  );
}
