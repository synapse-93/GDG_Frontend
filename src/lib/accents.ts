import type { AccentColor } from "@/components/brand/GeometricScene3D";
import type { EventTrack } from "@/data/events";

export interface AccentStyleSet {
  badge: string;
  bar: string;
  dot: string;
  borderHover: string;
}

/**
 * WCAG AA compliant Google 4-color accent mappings for Light & Dark themes.
 * Yellow surfaces ALWAYS use dark ink (#111827) to prevent low-contrast white-on-yellow text.
 */
export const ACCENT_STYLES: Record<AccentColor, AccentStyleSet> = {
  blue: {
    badge:
      "border-[#4285F4]/35 bg-[#4285F4]/12 text-[#1A56DB] dark:border-[#669DF6]/40 dark:bg-[#669DF6]/15 dark:text-[#8AB4F8]",
    bar: "bg-[#4285F4] dark:bg-[#669DF6]",
    dot: "bg-[#4285F4] dark:bg-[#669DF6]",
    borderHover: "hover:border-[#4285F4]/60 dark:hover:border-[#669DF6]/60",
  },
  red: {
    badge:
      "border-[#EA4335]/35 bg-[#EA4335]/12 text-[#B91C1C] dark:border-[#F28B82]/40 dark:bg-[#F28B82]/15 dark:text-[#F6AEA9]",
    bar: "bg-[#EA4335] dark:bg-[#F28B82]",
    dot: "bg-[#EA4335] dark:bg-[#F28B82]",
    borderHover: "hover:border-[#EA4335]/60 dark:hover:border-[#F28B82]/60",
  },
  yellow: {
    badge:
      "border-[#D99B00]/50 bg-[#FBBC04] text-[#111827] dark:border-[#FDD663]/60 dark:bg-[#FDD663] dark:text-[#111827]",
    bar: "bg-[#FBBC04] dark:bg-[#FDD663]",
    dot: "bg-[#FBBC04] dark:bg-[#FDD663]",
    borderHover: "hover:border-[#E0A800] dark:hover:border-[#FDD663]/70",
  },
  green: {
    badge:
      "border-[#34A853]/35 bg-[#34A853]/12 text-[#166534] dark:border-[#81C995]/40 dark:bg-[#81C995]/15 dark:text-[#A8DAB5]",
    bar: "bg-[#34A853] dark:bg-[#81C995]",
    dot: "bg-[#34A853] dark:bg-[#81C995]",
    borderHover: "hover:border-[#34A853]/60 dark:hover:border-[#81C995]/60",
  },
};

export function getTrackAccent(track: EventTrack): AccentColor {
  switch (track) {
    case "Web":
      return "blue";
    case "Cloud":
      return "red";
    case "AI / ML":
      return "green";
    case "Android":
      return "yellow";
  }
}

export function getTrackStyles(track: EventTrack): AccentStyleSet {
  return ACCENT_STYLES[getTrackAccent(track)];
}
