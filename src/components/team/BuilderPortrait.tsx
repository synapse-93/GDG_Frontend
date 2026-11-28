"use client";

import { useId } from "react";
import type { PortraitMask, PortraitMotif } from "@/data/team";
import type { AccentColor } from "@/lib/accents";

interface BuilderPortraitProps {
  name: string;
  accentColor: AccentColor;
  mask: PortraitMask;
  motif: PortraitMotif;
  isCoreLead?: boolean;
  imagePath?: string;
  size?: "card" | "sheet";
}

const PALETTE: Record<
  AccentColor,
  {
    bg: string;
    bgShade: string;
    highlight: string;
    shirt: string;
    shirtTrim: string;
    skin: string;
    hair: string;
  }
> = {
  blue: {
    bg: "#1765CC",
    bgShade: "#0F4C9E",
    highlight: "#A8C7FA",
    shirt: "#0F4C9E",
    shirtTrim: "#A8C7FA",
    skin: "#F4C9A8",
    hair: "#111827",
  },
  green: {
    bg: "#137333",
    bgShade: "#0D5225",
    highlight: "#A8DAB5",
    shirt: "#0D5225",
    shirtTrim: "#A8DAB5",
    skin: "#E8B794",
    hair: "#111827",
  },
  red: {
    bg: "#C5221F",
    bgShade: "#961816",
    highlight: "#FAD2CF",
    shirt: "#111827",
    shirtTrim: "#FAD2CF",
    skin: "#F1C39E",
    hair: "#1C2330",
  },
  yellow: {
    bg: "#FBBC04",
    bgShade: "#E3A000",
    highlight: "#FEF7E0",
    shirt: "#111827",
    shirtTrim: "#FDD663",
    skin: "#E5B28C",
    hair: "#111827",
  },
};

interface PersonaVariant {
  hairStyle: "parted" | "bun" | "curly" | "bob" | "spiky";
  glasses?: "round" | "rect";
  headphones?: boolean;
  collar: "hoodie" | "crew" | "jacket";
  skinTone: string;
}

const MOTIF_PERSONAS: Record<PortraitMotif, PersonaVariant> = {
  orbit: {
    hairStyle: "parted",
    glasses: "rect",
    collar: "jacket",
    skinTone: "#E6B48F",
  },
  grid: {
    hairStyle: "bun",
    glasses: "round",
    collar: "crew",
    skinTone: "#D9A077",
  },
  prism: {
    hairStyle: "bob",
    collar: "hoodie",
    skinTone: "#F0C3A0",
  },
  stack: {
    hairStyle: "spiky",
    headphones: true,
    collar: "hoodie",
    skinTone: "#DEAA82",
  },
  nodes: {
    hairStyle: "curly",
    glasses: "round",
    collar: "jacket",
    skinTone: "#D59C74",
  },
  wave: {
    hairStyle: "parted",
    headphones: true,
    collar: "crew",
    skinTone: "#EBBCA0",
  },
  terminal: {
    hairStyle: "spiky",
    glasses: "rect",
    collar: "hoodie",
    skinTone: "#D9A17B",
  },
  mesh: {
    hairStyle: "bun",
    collar: "jacket",
    skinTone: "#EEBF9B",
  },
  compass: {
    hairStyle: "bob",
    glasses: "round",
    collar: "crew",
    skinTone: "#E3B08C",
  },
  kinetic: {
    hairStyle: "curly",
    headphones: true,
    collar: "hoodie",
    skinTone: "#D39971",
  },
};

function MaskShape({ mask }: { mask: PortraitMask }) {
  if (mask === "circle") {
    return <circle cx="60" cy="60" r="54" />;
  }
  if (mask === "arch") {
    return (
      <path d="M10 104V56C10 28.386 32.386 6 60 6C87.614 6 110 28.386 110 56V104C110 109.523 105.523 114 100 114H20C14.477 114 10 109.523 10 104Z" />
    );
  }
  if (mask === "clover") {
    return (
      <path d="M60 12C43 6 20 15 16 33C11 49 18 56 18 60C18 64 11 71 16 87C20 105 43 114 60 108C77 114 100 105 104 87C109 71 102 64 102 60C102 56 109 49 104 33C100 15 77 6 60 12Z" />
    );
  }
  // Scalloped 12-lobe expressive badge
  return (
    <path d="M60 6C67 6 71 13 77 15C83 17 91 14 96 19C101 24 98 32 100 38C102 44 110 48 110 55C110 62 103 66 101 72C99 78 102 86 97 91C92 96 84 93 78 95C72 97 68 105 60 105C52 105 48 97 42 95C36 93 28 96 23 91C18 86 21 78 19 72C17 66 10 62 10 55C10 48 18 44 20 38C22 32 19 24 24 19C29 14 37 17 43 15C49 13 53 6 60 6Z" />
  );
}

/**
 * Uniform 72px × 72px (card) / 80px × 80px (sheet) Material 3 Expressive SVG Developer Persona Portrait.
 * Replaces flat monogram circles with distinct stylized SVG character illustrations clipped inside
 * morphing M3 geometric masks (circle, arch, 4-leaf clover, scallop). Zero external image hotlinks.
 */
export function BuilderPortrait({
  name,
  accentColor,
  mask,
  motif,
  isCoreLead = false,
  imagePath,
  size = "card",
}: BuilderPortraitProps) {
  const reactId = useId();
  const clipId = `gdg-portrait-clip-${reactId.replace(/:/g, "")}`;
  const colors = PALETTE[accentColor];
  const persona = MOTIF_PERSONAS[motif];

  const boxSize = size === "sheet" ? "h-20 w-20" : "h-[72px] w-[72px]";
  const morphClasses =
    mask === "circle"
      ? "rounded-full group-hover:rounded-[20px]"
      : mask === "arch"
      ? "rounded-t-[36px] rounded-b-xl group-hover:rounded-[22px]"
      : mask === "clover"
      ? "rounded-[24px] group-hover:rounded-full"
      : "rounded-[22px] group-hover:rounded-t-[36px] group-hover:rounded-b-xl";

  if (imagePath) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imagePath}
        alt={name}
        className={`${boxSize} shrink-0 border border-hairline object-cover transition-spring group-hover:rotate-3 ${morphClasses}`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${boxSize} relative shrink-0 overflow-hidden select-none transition-spring group-hover:scale-[1.04] group-hover:-rotate-3 ${morphClasses}`}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          <clipPath id={clipId}>
            <MaskShape mask={mask} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          {/* Saturated Google Studio Backdrop */}
          <rect width="120" height="120" fill={colors.bg} />

          {/* Expressive Background Geometric Halo */}
          <circle
            cx="94"
            cy="26"
            r="34"
            fill={colors.bgShade}
            fillOpacity="0.45"
          />
          <circle
            cx="24"
            cy="96"
            r="26"
            fill={colors.highlight}
            fillOpacity="0.22"
          />

          {/* Shoulders & Developer Apparel */}
          <path
            d="M18 122C20 96 36 84 60 84C84 84 100 96 102 122H18Z"
            fill={colors.shirt}
          />
          {persona.collar === "hoodie" && (
            <>
              <path
                d="M44 86L60 98L76 86"
                stroke={colors.shirtTrim}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M54 96V112M66 96V112"
                stroke={colors.shirtTrim}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </>
          )}
          {persona.collar === "jacket" && (
            <path
              d="M52 84L60 116L68 84"
              fill={colors.shirtTrim}
              fillOpacity="0.9"
            />
          )}
          {persona.collar === "crew" && (
            <path
              d="M46 86C50 92 70 92 74 86"
              stroke={colors.shirtTrim}
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}

          {/* Neck */}
          <rect
            x="52"
            y="72"
            width="16"
            height="18"
            rx="7"
            fill={persona.skinTone}
          />

          {/* Back Hair Volume for Bun / Bob / Curly */}
          {persona.hairStyle === "bun" && (
            <circle cx="60" cy="24" r="14" fill={colors.hair} />
          )}
          {persona.hairStyle === "bob" && (
            <path
              d="M32 54C32 34 44 24 60 24C76 24 88 34 88 54V76C88 80 83 82 78 80H42C37 82 32 80 32 76V54Z"
              fill={colors.hair}
            />
          )}
          {persona.hairStyle === "curly" && (
            <g fill={colors.hair}>
              <circle cx="38" cy="40" r="13" />
              <circle cx="82" cy="40" r="13" />
              <circle cx="48" cy="28" r="13" />
              <circle cx="72" cy="28" r="13" />
              <circle cx="60" cy="25" r="13" />
            </g>
          )}

          {/* Headphones Band */}
          {persona.headphones && (
            <path
              d="M32 56C32 36 44 26 60 26C76 26 88 36 88 56"
              stroke={colors.highlight}
              strokeWidth="5"
              strokeLinecap="round"
            />
          )}

          {/* Ears */}
          <circle cx="37" cy="56" r="5" fill={persona.skinTone} />
          <circle cx="83" cy="56" r="5" fill={persona.skinTone} />

          {/* Headpost Silhouette */}
          <rect
            x="38"
            y="32"
            width="44"
            height="48"
            rx="21"
            fill={persona.skinTone}
          />

          {/* Front Hair Silhouettes */}
          {persona.hairStyle === "parted" && (
            <path
              d="M37 48C37 33 48 26 62 26C75 26 83 34 83 47C76 41 66 40 56 42C47 44 42 47 37 48Z"
              fill={colors.hair}
            />
          )}
          {persona.hairStyle === "spiky" && (
            <path
              d="M37 47C37 33 46 25 60 24L67 30L75 26C81 31 84 39 83 47C76 40 68 38 60 39C51 39 43 42 37 47Z"
              fill={colors.hair}
            />
          )}
          {(persona.hairStyle === "bun" ||
            persona.hairStyle === "bob" ||
            persona.hairStyle === "curly") && (
            <path
              d="M38 48C38 35 48 28 60 28C72 28 82 35 82 48C74 42 66 40 60 40C54 40 46 42 38 48Z"
              fill={colors.hair}
            />
          )}

          {/* Expressive Eyes & Warm Smile */}
          <circle cx="51" cy="55" r="2.7" fill="#111827" />
          <circle cx="69" cy="55" r="2.7" fill="#111827" />
          <path
            d="M54 66C57 69.5 63 69.5 66 66"
            stroke="#111827"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Optional Glasses */}
          {persona.glasses === "round" && (
            <g stroke="#111827" strokeWidth="2.4">
              <circle cx="51" cy="55" r="6.5" fill="#FFFFFF" fillOpacity="0.18" />
              <circle cx="69" cy="55" r="6.5" fill="#FFFFFF" fillOpacity="0.18" />
              <path d="M57.5 55H62.5" />
            </g>
          )}
          {persona.glasses === "rect" && (
            <g stroke="#111827" strokeWidth="2.4">
              <rect
                x="44"
                y="49.5"
                width="13.5"
                height="10.5"
                rx="3"
                fill="#FFFFFF"
                fillOpacity="0.18"
              />
              <rect
                x="62.5"
                y="49.5"
                width="13.5"
                height="10.5"
                rx="3"
                fill="#FFFFFF"
                fillOpacity="0.18"
              />
              <path d="M57.5 54.5H62.5" />
            </g>
          )}

          {/* Optional Headphone Earcups */}
          {persona.headphones && (
            <g>
              <rect x="29" y="49" width="7" height="15" rx="3.5" fill="#111827" />
              <rect x="84" y="49" width="7" height="15" rx="3.5" fill="#111827" />
            </g>
          )}

          {/* Core-Lead 4-Color Google Signature Dots */}
          {isCoreLead && (
            <g>
              <circle cx="45" cy="107" r="3" fill="#A8C7FA" />
              <circle cx="55" cy="107" r="3" fill="#F28B82" />
              <circle cx="65" cy="107" r="3" fill="#FBBC04" />
              <circle cx="75" cy="107" r="3" fill="#81C995" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
