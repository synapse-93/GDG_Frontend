import {
  Cloud,
  Code2,
  Compass,
  Cpu,
  GitBranch,
  Layers,
  Server,
  Sliders,
  Smartphone,
  Terminal,
} from "lucide-react";
import type { PortraitMotif } from "@/data/team";
import type { AccentColor } from "@/lib/accents";

export interface CredentialMeta {
  passNumber: string;
  roleCode: string;
  passLabel: string;
  trackShort: string;
}

const MOTIF_CREDENTIAL: Record<PortraitMotif, CredentialMeta> = {
  orbit: {
    passNumber: "01",
    roleCode: "ORG",
    passLabel: "01 // ORG",
    trackShort: "LEAD",
  },
  grid: {
    passNumber: "02",
    roleCode: "OPS",
    passLabel: "02 // OPS",
    trackShort: "OPS",
  },
  prism: {
    passNumber: "03",
    roleCode: "WEB",
    passLabel: "03 // WEB",
    trackShort: "WEB",
  },
  stack: {
    passNumber: "04",
    roleCode: "MOB",
    passLabel: "04 // MOB",
    trackShort: "AND",
  },
  nodes: {
    passNumber: "05",
    roleCode: "AI",
    passLabel: "05 // AI",
    trackShort: "AI",
  },
  wave: {
    passNumber: "06",
    roleCode: "ML",
    passLabel: "06 // ML",
    trackShort: "ML",
  },
  terminal: {
    passNumber: "07",
    roleCode: "CLD",
    passLabel: "07 // CLD",
    trackShort: "CLD",
  },
  mesh: {
    passNumber: "08",
    roleCode: "SRE",
    passLabel: "08 // SRE",
    trackShort: "INF",
  },
  compass: {
    passNumber: "09",
    roleCode: "UX",
    passLabel: "09 // UX",
    trackShort: "DES",
  },
  kinetic: {
    passNumber: "10",
    roleCode: "IXD",
    passLabel: "10 // IXD",
    trackShort: "MOT",
  },
};

export function getMemberCredential(motif: PortraitMotif): CredentialMeta {
  return MOTIF_CREDENTIAL[motif];
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export function TrackGlyph({
  motif,
  className = "h-4 w-4",
}: {
  motif: PortraitMotif;
  className?: string;
}) {
  switch (motif) {
    case "orbit":
      return <Terminal className={className} aria-hidden="true" />;
    case "grid":
      return <Layers className={className} aria-hidden="true" />;
    case "prism":
      return <Code2 className={className} aria-hidden="true" />;
    case "stack":
      return <Smartphone className={className} aria-hidden="true" />;
    case "nodes":
      return <Cpu className={className} aria-hidden="true" />;
    case "wave":
      return <GitBranch className={className} aria-hidden="true" />;
    case "terminal":
      return <Cloud className={className} aria-hidden="true" />;
    case "mesh":
      return <Server className={className} aria-hidden="true" />;
    case "compass":
      return <Compass className={className} aria-hidden="true" />;
    case "kinetic":
      return <Sliders className={className} aria-hidden="true" />;
  }
}

const ACCENT_STRIPE: Record<AccentColor, string> = {
  blue: "bg-[#4285F4] dark:bg-[#669DF6]",
  green: "bg-[#34A853] dark:bg-[#81C995]",
  red: "bg-[#EA4335] dark:bg-[#F28B82]",
  yellow: "bg-[#FBBC04] dark:bg-[#FDD663]",
};

const ACCENT_ICON_INK: Record<AccentColor, string> = {
  blue: "text-[#1765CC] dark:text-[#669DF6]",
  green: "text-[#137333] dark:text-[#81C995]",
  red: "text-[#C5221F] dark:text-[#F28B82]",
  yellow: "text-[#9A6700] dark:text-[#FDD663]",
};

interface BuilderPortraitProps {
  name: string;
  accentColor: AccentColor;
  motif: PortraitMotif;
  imagePath?: string;
  size?: "compact" | "card" | "sheet";
}

/**
 * Editorial RVCE Event-Pass Monogram & Credential Tile.
 * Replaces cartoon mascots with crisp typographic pass codes, geometric track
 * glyphs, and high-contrast 1px borders.
 */
export function BuilderPortrait({
  name,
  accentColor,
  motif,
  imagePath,
  size = "sheet",
}: BuilderPortraitProps) {
  const credential = getMemberCredential(motif);
  const initials = getInitials(name);

  const boxSize =
    size === "compact"
      ? "h-12 w-12"
      : size === "card"
      ? "h-16 w-16"
      : "h-[74px] w-[74px]";

  if (imagePath) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imagePath}
        alt={name}
        className={`${boxSize} shrink-0 rounded-xl border border-hairline object-cover`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${boxSize} relative flex shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-hairline bg-canvas p-2 select-none`}
    >
      <span
        className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] ${ACCENT_STRIPE[accentColor]}`}
      />
      <div className="flex items-center justify-between pt-0.5">
        <span className="font-mono text-[10px] font-bold tracking-tight text-ink-muted tabular-nums">
          {credential.passNumber}
        </span>
        <TrackGlyph
          motif={motif}
          className={`h-3.5 w-3.5 ${ACCENT_ICON_INK[accentColor]}`}
        />
      </div>
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-lg font-extrabold tracking-tight leading-none text-ink">
          {initials}
        </span>
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink-muted">
          {credential.roleCode}
        </span>
      </div>
    </div>
  );
}
