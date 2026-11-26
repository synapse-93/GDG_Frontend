export type GeometryVariant = "hero" | "cube" | "rings" | "diamond" | "hex";
export type AccentColor = "blue" | "red" | "yellow" | "green";
export type GeometrySize = "sm" | "md" | "lg" | "hero";

interface GeometricScene3DProps {
  variant?: GeometryVariant;
  accentColor?: AccentColor;
  size?: GeometrySize;
  className?: string;
}

const ACCENT_MAP: Record<
  AccentColor,
  { stroke: string; surface: string; dot: string }
> = {
  blue: {
    stroke: "var(--gdg-blue)",
    surface: "color-mix(in srgb, var(--gdg-blue) 14%, transparent)",
    dot: "var(--gdg-blue)",
  },
  red: {
    stroke: "var(--gdg-red)",
    surface: "color-mix(in srgb, var(--gdg-red) 14%, transparent)",
    dot: "var(--gdg-red)",
  },
  yellow: {
    stroke: "var(--gdg-yellow)",
    surface: "color-mix(in srgb, var(--gdg-yellow) 16%, transparent)",
    dot: "var(--gdg-yellow)",
  },
  green: {
    stroke: "var(--gdg-green)",
    surface: "color-mix(in srgb, var(--gdg-green) 14%, transparent)",
    dot: "var(--gdg-green)",
  },
};

const SIZE_PX: Record<GeometrySize, number> = {
  sm: 56,
  md: 96,
  lg: 152,
  hero: 260,
};

function HeroScene({ boxSize }: { boxSize: number }) {
  const cubeSize = Math.round(boxSize * 0.42);
  const half = cubeSize / 2;
  const outerRing = Math.round(boxSize * 0.88);
  const innerRing = Math.round(boxSize * 0.68);

  const faces: { transform: string; color: string }[] = [
    { transform: `translateZ(${half}px)`, color: "var(--gdg-blue)" },
    {
      transform: `rotateY(180deg) translateZ(${half}px)`,
      color: "var(--gdg-green)",
    },
    {
      transform: `rotateY(90deg) translateZ(${half}px)`,
      color: "var(--gdg-red)",
    },
    {
      transform: `rotateY(-90deg) translateZ(${half}px)`,
      color: "var(--gdg-yellow)",
    },
    {
      transform: `rotateX(90deg) translateZ(${half}px)`,
      color: "var(--gdg-blue)",
    },
    {
      transform: `rotateX(-90deg) translateZ(${half}px)`,
      color: "var(--gdg-green)",
    },
  ];

  return (
    <div
      className="relative flex items-center justify-center perspective-studio"
      style={{ width: boxSize, height: boxSize }}
    >
      {/* Outer counter-rotating orbital ring */}
      <div
        className="pointer-events-none absolute rounded-full border border-dashed animate-gdg-spin-reverse-3d preserve-3d"
        style={{
          width: outerRing,
          height: outerRing,
          borderColor: "color-mix(in srgb, var(--gdg-blue) 55%, var(--hairline))",
        }}
      >
        <span
          className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: "var(--gdg-blue)" }}
        />
        <span
          className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: "var(--gdg-yellow)" }}
        />
      </div>

      {/* Secondary tilted orbital ring */}
      <div
        className="pointer-events-none absolute rounded-full border animate-gdg-spin-3d preserve-3d"
        style={{
          width: innerRing,
          height: innerRing,
          borderColor: "color-mix(in srgb, var(--gdg-green) 55%, var(--hairline))",
        }}
      >
        <span
          className="absolute top-1/2 -left-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: "var(--gdg-red)" }}
        />
        <span
          className="absolute top-1/2 -right-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: "var(--gdg-green)" }}
        />
      </div>

      {/* Floating 4-color wireframe cube */}
      <div className="animate-gdg-float-3d preserve-3d">
        <div
          className="relative animate-gdg-spin-3d preserve-3d"
          style={{ width: cubeSize, height: cubeSize }}
        >
          {faces.map((face, idx) => (
            <div
              key={idx}
              className="absolute inset-0 flex items-center justify-center border"
              style={{
                transform: face.transform,
                borderColor: face.color,
                backgroundColor: `color-mix(in srgb, ${face.color} 11%, transparent)`,
              }}
            >
              <span
                className="h-3 w-3 border"
                style={{
                  borderColor: `color-mix(in srgb, ${face.color} 65%, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CubeScene({
  boxSize,
  accent,
}: {
  boxSize: number;
  accent: { stroke: string; surface: string; dot: string };
}) {
  const cubeSize = Math.round(boxSize * 0.56);
  const half = cubeSize / 2;

  const faceTransforms = [
    `translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <div
      className="relative flex items-center justify-center perspective-studio"
      style={{ width: boxSize, height: boxSize }}
    >
      <div className="animate-gdg-float-3d preserve-3d">
        <div
          className="relative animate-gdg-spin-3d preserve-3d"
          style={{ width: cubeSize, height: cubeSize }}
        >
          {faceTransforms.map((transform, idx) => (
            <div
              key={idx}
              className="absolute inset-0 border"
              style={{
                transform,
                borderColor: accent.stroke,
                backgroundColor: accent.surface,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RingsScene({
  boxSize,
  accent,
}: {
  boxSize: number;
  accent: { stroke: string; surface: string; dot: string };
}) {
  const outer = Math.round(boxSize * 0.8);
  const middle = Math.round(boxSize * 0.58);
  const core = Math.max(8, Math.round(boxSize * 0.16));

  return (
    <div
      className="relative flex items-center justify-center perspective-studio"
      style={{ width: boxSize, height: boxSize }}
    >
      <div
        className="absolute rounded-full border-[1.5px] animate-gdg-spin-3d preserve-3d"
        style={{
          width: outer,
          height: outer,
          borderColor: accent.stroke,
        }}
      >
        <span
          className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: accent.dot }}
        />
      </div>
      <div
        className="absolute rounded-full border border-dashed animate-gdg-spin-reverse-3d preserve-3d"
        style={{
          width: middle,
          height: middle,
          borderColor: accent.stroke,
        }}
      />
      <div
        className="rounded-full animate-gdg-float-3d"
        style={{
          width: core,
          height: core,
          backgroundColor: accent.dot,
        }}
      />
    </div>
  );
}

function DiamondScene({
  boxSize,
  accent,
}: {
  boxSize: number;
  accent: { stroke: string; surface: string; dot: string };
}) {
  const plane = Math.round(boxSize * 0.54);
  const planes = [
    "rotateY(0deg) rotateZ(45deg)",
    "rotateY(60deg) rotateZ(45deg)",
    "rotateY(120deg) rotateZ(45deg)",
  ];

  return (
    <div
      className="relative flex items-center justify-center perspective-studio"
      style={{ width: boxSize, height: boxSize }}
    >
      <div className="animate-gdg-float-3d preserve-3d">
        <div
          className="relative animate-gdg-spin-3d preserve-3d"
          style={{ width: plane, height: plane }}
        >
          {planes.map((transform, idx) => (
            <div
              key={idx}
              className="absolute inset-0 border"
              style={{
                transform,
                borderColor: accent.stroke,
                backgroundColor: accent.surface,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function HexScene({
  boxSize,
  accent,
}: {
  boxSize: number;
  accent: { stroke: string; surface: string; dot: string };
}) {
  const hexSize = Math.round(boxSize * 0.68);
  const depth = Math.max(8, Math.round(boxSize * 0.14));
  const layers = [-depth, 0, depth];

  return (
    <div
      className="relative flex items-center justify-center perspective-studio"
      style={{ width: boxSize, height: boxSize }}
    >
      <div className="animate-gdg-float-3d preserve-3d">
        <div
          className="relative animate-gdg-spin-3d preserve-3d"
          style={{ width: hexSize, height: hexSize }}
        >
          {layers.map((z, idx) => (
            <svg
              key={idx}
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              style={{ transform: `translateZ(${z}px)` }}
            >
              <polygon
                points="50,6 90,28 90,72 50,94 10,72 10,28"
                fill={idx === 1 ? accent.surface : "none"}
                stroke={accent.stroke}
                strokeWidth="2.5"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GeometricScene3D({
  variant = "cube",
  accentColor = "blue",
  size,
  className = "",
}: GeometricScene3DProps) {
  const resolvedSize: GeometrySize =
    size ?? (variant === "hero" ? "hero" : "md");
  const boxSize = SIZE_PX[resolvedSize];
  const accent = ACCENT_MAP[accentColor];

  return (
    <div
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center select-none ${className}`.trim()}
    >
      {variant === "hero" && <HeroScene boxSize={boxSize} />}
      {variant === "cube" && <CubeScene boxSize={boxSize} accent={accent} />}
      {variant === "rings" && <RingsScene boxSize={boxSize} accent={accent} />}
      {variant === "diamond" && (
        <DiamondScene boxSize={boxSize} accent={accent} />
      )}
      {variant === "hex" && <HexScene boxSize={boxSize} accent={accent} />}
    </div>
  );
}
