"use client";

import type { PointerEvent } from "react";
import * as m from "motion/react-m";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

export type DomainKey = "linux" | "cloud" | "ai" | "web" | "android" | "devfest";

export type DomainArtworkSize = "sm" | "md" | "lg" | "hero";
export type DomainArtworkTone = "auto" | "on-dark" | "on-yellow";

interface DomainArtworkProps {
  domain: DomainKey;
  size?: DomainArtworkSize;
  tone?: DomainArtworkTone;
  interactive?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<DomainArtworkSize, string> = {
  sm: "h-12 w-12",
  md: "h-20 w-20",
  lg: "h-28 w-28 sm:h-32 sm:w-32",
  hero: "h-36 w-36 sm:h-44 sm:w-44",
};

interface ArtPalette {
  ink: string;
  paper: string;
  blue: string;
  blueDeep: string;
  blueSoft: string;
  red: string;
  redDeep: string;
  redSoft: string;
  yellow: string;
  yellowDeep: string;
  green: string;
  greenDeep: string;
  greenSoft: string;
}

const PALETTE: ArtPalette = {
  ink: "#111827",
  paper: "#FAF9F6",
  blue: "#4285F4",
  blueDeep: "#1765CC",
  blueSoft: "#A8C7FA",
  red: "#EA4335",
  redDeep: "#C5221F",
  redSoft: "#FAD2CF",
  yellow: "#FBBC04",
  yellowDeep: "#E3A000",
  green: "#34A853",
  greenDeep: "#137333",
  greenSoft: "#A8DAB5",
};

interface PhysicsProps {
  shiftX: MotionValue<number>;
  shiftY: MotionValue<number>;
  counterX: MotionValue<number>;
  needleRotate: MotionValue<number>;
  burstRotate: MotionValue<number>;
}

function LinuxArtwork({
  p,
  tone,
  physics,
}: {
  p: ArtPalette;
  tone: DomainArtworkTone;
  physics: PhysicsProps;
}) {
  const frameBg = tone === "on-dark" ? "#0B0F17" : p.ink;
  const shellStroke = tone === "on-dark" ? p.redSoft : p.paper;

  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="domain-artwork-svg h-full w-full"
    >
      <rect
        x="10"
        y="16"
        width="120"
        height="108"
        rx="32"
        fill={frameBg}
        stroke={shellStroke}
        strokeOpacity="0.22"
        strokeWidth="3"
      />

      {/* Pointer-reactive Container Stack Motif */}
      <m.g
        className="domain-artwork-float"
        style={{ x: physics.shiftX, y: physics.shiftY }}
      >
        <rect
          x="74"
          y="30"
          width="44"
          height="24"
          rx="10"
          fill={p.redDeep}
          stroke={p.paper}
          strokeWidth="2.5"
        />
        <text
          x="96"
          y="47"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="13"
          fontWeight="800"
        >
          $_
        </text>

        <rect x="74" y="61" width="44" height="20" rx="9" fill={p.blue} />
        <circle cx="85" cy="71" r="3" fill={p.paper} />
        <rect x="93" y="69" width="18" height="4" rx="2" fill={p.paper} />

        <rect x="74" y="88" width="44" height="20" rx="9" fill={p.green} />
        <circle cx="85" cy="98" r="3" fill={p.paper} />
        <rect x="93" y="96" width="18" height="4" rx="2" fill={p.paper} />
      </m.g>

      {/* Stylized Geometric Penguin Silhouette */}
      <m.g style={{ x: physics.counterX }}>
        <path
          d="M22 108V62C22 42.118 35.431 28 52 28C68.569 28 76 42.118 76 62V108H22Z"
          fill="#1C2330"
          stroke={p.paper}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M32 108V73C32 61.954 40.954 53 52 53C63.046 53 68 61.954 68 73V108H32Z"
          fill={p.paper}
        />
        <circle cx="43" cy="45" r="4" fill={p.paper} />
        <circle cx="57" cy="45" r="4" fill={p.paper} />
        <circle cx="44" cy="45" r="1.8" fill={p.ink} />
        <circle cx="58" cy="45" r="1.8" fill={p.ink} />
        <path
          d="M42 52H59L50.5 61L42 52Z"
          fill={p.yellow}
          stroke={p.ink}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect
          x="26"
          y="102"
          width="20"
          height="10"
          rx="5"
          fill={p.yellow}
          stroke={p.ink}
          strokeWidth="2"
        />
        <rect
          x="52"
          y="102"
          width="20"
          height="10"
          rx="5"
          fill={p.yellow}
          stroke={p.ink}
          strokeWidth="2"
        />
      </m.g>
    </svg>
  );
}

function CloudArtwork({
  p,
  tone,
  physics,
}: {
  p: ArtPalette;
  tone: DomainArtworkTone;
  physics: PhysicsProps;
}) {
  const cloudFill = tone === "on-dark" ? p.redSoft : p.paper;
  const strokeCol = tone === "on-dark" ? "#FFFFFF" : p.ink;

  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="domain-artwork-svg h-full w-full"
    >
      <path
        d="M70 72V90M70 84H34V96M70 84H106V96"
        stroke={strokeCol}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <m.g style={{ x: physics.counterX }}>
        <rect
          x="18"
          y="96"
          width="32"
          height="26"
          rx="10"
          fill={p.blue}
          stroke={strokeCol}
          strokeWidth="3"
        />
        <circle cx="28" cy="109" r="3" fill={p.paper} />
        <rect x="35" y="107" width="9" height="4" rx="2" fill={p.paper} />

        <rect
          x="54"
          y="96"
          width="32"
          height="26"
          rx="10"
          fill={p.yellow}
          stroke={strokeCol}
          strokeWidth="3"
        />
        <circle cx="64" cy="109" r="3" fill={p.ink} />
        <rect x="71" y="107" width="9" height="4" rx="2" fill={p.ink} />

        <rect
          x="90"
          y="96"
          width="32"
          height="26"
          rx="10"
          fill={p.green}
          stroke={strokeCol}
          strokeWidth="3"
        />
        <circle cx="100" cy="109" r="3" fill={p.paper} />
        <rect x="107" y="107" width="9" height="4" rx="2" fill={p.paper} />
      </m.g>

      <m.g
        className="domain-artwork-float"
        style={{ x: physics.shiftX, y: physics.shiftY }}
      >
        <path
          d="M36 74H104C116.15 74 126 64.15 126 52C126 40.916 117.804 31.749 107.136 30.224C102.509 19.498 91.842 12 79.4 12C64.864 12 52.683 22.256 49.766 35.91C47.345 34.696 44.614 34 41.714 34C31.931 34 24 41.931 24 51.714C24 64.022 24.487 74 36 74Z"
          fill={cloudFill}
          stroke={strokeCol}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <rect x="46" y="46" width="48" height="14" rx="7" fill={p.red} />
        <circle cx="56" cy="53" r="3.5" fill={p.paper} />
        <circle cx="70" cy="53" r="3.5" fill={p.yellow} />
        <circle cx="84" cy="53" r="3.5" fill={p.greenSoft} />
      </m.g>
    </svg>
  );
}

function AiArtwork({
  p,
  tone,
  physics,
}: {
  p: ArtPalette;
  tone: DomainArtworkTone;
  physics: PhysicsProps;
}) {
  const strokeCol = tone === "on-dark" ? "#FFFFFF" : p.ink;
  const sparkFill = tone === "on-dark" ? p.greenSoft : p.yellow;

  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="domain-artwork-svg h-full w-full"
    >
      <path
        d="M54 58C38 58 34 72 34 90M86 58C102 58 106 72 106 90M70 86V98"
        stroke={strokeCol}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <m.g style={{ x: physics.counterX }}>
        <rect
          x="14"
          y="92"
          width="36"
          height="30"
          rx="12"
          fill={p.blueDeep}
          stroke={strokeCol}
          strokeWidth="3"
        />
        <text
          x="32"
          y="112"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="13"
          fontWeight="800"
        >
          {"{ }"}
        </text>

        <rect
          x="53"
          y="96"
          width="34"
          height="28"
          rx="14"
          fill={p.greenDeep}
          stroke={strokeCol}
          strokeWidth="3"
        />
        <path
          d="M63 110L68 115L78 105"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="90"
          y="92"
          width="36"
          height="30"
          rx="12"
          fill={p.redDeep}
          stroke={strokeCol}
          strokeWidth="3"
        />
        <text
          x="108"
          y="112"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="13"
          fontWeight="800"
        >
          fx
        </text>
      </m.g>

      <m.g
        className="domain-artwork-float"
        style={{
          x: physics.shiftX,
          y: physics.shiftY,
          rotate: physics.burstRotate,
          transformOrigin: "70px 50px",
        }}
      >
        <path
          d="M70 12C74.5 37 83 45.5 108 50C83 54.5 74.5 63 70 88C65.5 63 57 54.5 32 50C57 45.5 65.5 37 70 12Z"
          fill={sparkFill}
          stroke={strokeCol}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <circle cx="70" cy="50" r="9" fill={p.ink} />
        <circle
          cx="108"
          cy="24"
          r="6"
          fill={p.blueSoft}
          stroke={strokeCol}
          strokeWidth="2.5"
        />
        <circle
          cx="32"
          cy="26"
          r="5"
          fill={p.greenSoft}
          stroke={strokeCol}
          strokeWidth="2.5"
        />
      </m.g>
    </svg>
  );
}

function WebArtwork({
  p,
  tone,
  physics,
}: {
  p: ArtPalette;
  tone: DomainArtworkTone;
  physics: PhysicsProps;
}) {
  const strokeCol = tone === "on-dark" ? "#FFFFFF" : p.ink;
  const cardFill = tone === "on-dark" ? "#1C2330" : p.paper;

  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="domain-artwork-svg h-full w-full"
    >
      <rect
        x="14"
        y="24"
        width="112"
        height="88"
        rx="20"
        fill={cardFill}
        stroke={strokeCol}
        strokeWidth="3.5"
      />
      <path d="M14 48H126" stroke={strokeCol} strokeWidth="3" />
      <circle cx="30" cy="36" r="4" fill={p.red} />
      <circle cx="43" cy="36" r="4" fill={p.yellow} />
      <circle cx="56" cy="36" r="4" fill={p.green} />
      <rect x="68" y="32" width="44" height="8" rx="4" fill={p.blueSoft} />

      <path
        d="M28 96C36 66 56 58 72 64C88 70 100 58 112 58"
        stroke={p.blue}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        cx="28"
        cy="96"
        r="5"
        fill={p.blue}
        stroke={strokeCol}
        strokeWidth="2"
      />
      <circle
        cx="112"
        cy="58"
        r="5"
        fill={p.green}
        stroke={strokeCol}
        strokeWidth="2"
      />

      {/* Pointer-reactive Performance Gauge Badge */}
      <m.g
        className="domain-artwork-float"
        style={{ x: physics.shiftX, y: physics.shiftY }}
      >
        <rect
          x="52"
          y="72"
          width="66"
          height="50"
          rx="18"
          fill={p.yellow}
          stroke={strokeCol}
          strokeWidth="3"
        />
        <path
          d="M66 105C66 94.507 74.507 86 85 86C95.493 86 104 94.507 104 105"
          stroke={p.ink}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M66 105C66 94.507 74.507 86 85 86C91 86 96.3 88.8 99.8 93.2"
          stroke={p.greenDeep}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <m.path
          d="M85 105L97 92"
          stroke={p.ink}
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{
            rotate: physics.needleRotate,
            transformOrigin: "85px 105px",
          }}
        />
        <circle cx="85" cy="105" r="4" fill={p.ink} />
      </m.g>
    </svg>
  );
}

function AndroidArtwork({
  p,
  tone,
  physics,
}: {
  p: ArtPalette;
  tone: DomainArtworkTone;
  physics: PhysicsProps;
}) {
  const strokeCol =
    tone === "on-yellow" ? p.ink : tone === "on-dark" ? "#FFFFFF" : p.ink;

  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="domain-artwork-svg h-full w-full"
    >
      <m.g style={{ x: physics.counterX }}>
        <rect
          x="20"
          y="22"
          width="68"
          height="100"
          rx="18"
          fill={p.blue}
          stroke={strokeCol}
          strokeWidth="3.5"
        />
        <rect x="32" y="36" width="44" height="16" rx="8" fill={p.blueSoft} />
        <rect x="32" y="60" width="20" height="20" rx="6" fill={p.paper} />
      </m.g>

      <m.g
        className="domain-artwork-float"
        style={{ x: physics.shiftX, y: physics.shiftY }}
      >
        <rect
          x="52"
          y="16"
          width="68"
          height="108"
          rx="20"
          fill={p.paper}
          stroke={strokeCol}
          strokeWidth="3.5"
        />
        <rect x="64" y="28" width="44" height="24" rx="10" fill={p.green} />
        <circle cx="75" cy="40" r="4.5" fill={p.paper} />
        <rect x="84" y="38" width="16" height="4" rx="2" fill={p.paper} />

        <rect x="64" y="60" width="44" height="22" rx="11" fill={p.ink} />
        <circle cx="97" cy="71" r="7" fill={p.yellow} />

        <rect x="64" y="90" width="20" height="22" rx="7" fill={p.red} />
        <rect x="88" y="90" width="20" height="22" rx="7" fill={p.blue} />
      </m.g>
    </svg>
  );
}

function DevFestArtwork({
  p,
  tone,
  physics,
}: {
  p: ArtPalette;
  tone: DomainArtworkTone;
  physics: PhysicsProps;
}) {
  const strokeCol = tone === "on-dark" ? "#FFFFFF" : p.ink;
  const stageBg = tone === "on-dark" ? "#1C2330" : p.paper;

  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="domain-artwork-svg h-full w-full"
    >
      <m.g
        className="domain-artwork-float"
        style={{
          x: physics.shiftX,
          y: physics.shiftY,
          rotate: physics.burstRotate,
          transformOrigin: "70px 70px",
        }}
      >
        <rect
          x="16"
          y="22"
          width="24"
          height="24"
          rx="8"
          transform="rotate(20 28 34)"
          fill={p.red}
          stroke={strokeCol}
          strokeWidth="2.5"
        />
        <circle
          cx="114"
          cy="30"
          r="12"
          fill={p.yellow}
          stroke={strokeCol}
          strokeWidth="2.5"
        />
        <rect
          x="104"
          y="88"
          width="22"
          height="22"
          rx="11"
          fill={p.green}
          stroke={strokeCol}
          strokeWidth="2.5"
        />
        <rect
          x="14"
          y="88"
          width="26"
          height="14"
          rx="7"
          fill={p.blueSoft}
          stroke={strokeCol}
          strokeWidth="2.5"
        />
      </m.g>

      <path
        d="M32 120V66C32 45.013 49.013 28 70 28C90.987 28 108 45.013 108 66V120H32Z"
        fill={stageBg}
        stroke={strokeCol}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <rect x="24" y="114" width="92" height="12" rx="6" fill={p.ink} />

      <path
        d="M61 62L46 75"
        stroke={p.red}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M46 75L61 88"
        stroke={p.blue}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M79 62L94 75"
        stroke={p.green}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M94 75L79 88"
        stroke={p.yellow}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Original Material 3 Expressive SVG Illustration Library for GDG on Campus RVCE.
 * Pure inline vector geometry with Google 4-color blocking and pointer-reactive spring micro-physics.
 */
export function DomainArtwork({
  domain,
  size = "md",
  tone = "auto",
  interactive = false,
  className = "",
}: DomainArtworkProps) {
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 260, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 260, damping: 22 });

  const shiftX = useTransform(springX, [-1, 1], [-4, 4]);
  const shiftY = useTransform(springY, [-1, 1], [-3.5, 3.5]);
  const counterX = useTransform(springX, [-1, 1], [2.5, -2.5]);
  const needleRotate = useTransform(springX, [-1, 1], [-16, 18]);
  const burstRotate = useTransform(springX, [-1, 1], [-5, 5]);

  const physics: PhysicsProps = {
    shiftX,
    shiftY,
    counterX,
    needleRotate,
    burstRotate,
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive || prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.set(Math.max(-1, Math.min(1, nx)));
    rawY.set(Math.max(-1, Math.min(1, ny)));
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-flex shrink-0 items-center justify-center select-none ${
        SIZE_CLASSES[size]
      } ${interactive ? "domain-artwork-interactive" : ""} ${className}`.trim()}
    >
      {domain === "linux" && (
        <LinuxArtwork p={PALETTE} tone={tone} physics={physics} />
      )}
      {domain === "cloud" && (
        <CloudArtwork p={PALETTE} tone={tone} physics={physics} />
      )}
      {domain === "ai" && (
        <AiArtwork p={PALETTE} tone={tone} physics={physics} />
      )}
      {domain === "web" && (
        <WebArtwork p={PALETTE} tone={tone} physics={physics} />
      )}
      {domain === "android" && (
        <AndroidArtwork p={PALETTE} tone={tone} physics={physics} />
      )}
      {domain === "devfest" && (
        <DevFestArtwork p={PALETTE} tone={tone} physics={physics} />
      )}
    </div>
  );
}
