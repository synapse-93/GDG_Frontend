const MARQUEE_ITEMS = [
  { label: "WEB & EDGE", dot: "bg-[#4285F4] dark:bg-[#669DF6]" },
  { label: "APPLIED AI", dot: "bg-[#34A853] dark:bg-[#81C995]" },
  { label: "CLOUD & INFRA", dot: "bg-[#EA4335] dark:bg-[#F28B82]" },
  { label: "ANDROID & COMPOSE", dot: "bg-[#FBBC04] dark:bg-[#FDD663]" },
  { label: "RVCE BENGALURU", dot: "bg-[#4285F4] dark:bg-[#669DF6]" },
] as const;

function MarqueeTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-6 pr-6"
    >
      {MARQUEE_ITEMS.map((item) => (
        <span
          key={item.label}
          className="inline-flex shrink-0 items-center gap-6 whitespace-nowrap font-mono text-xs font-semibold tracking-[0.14em] text-ink-muted"
        >
          <span className="text-ink/85">{item.label}</span>
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${item.dot}`}
          />
        </span>
      ))}
    </div>
  );
}

interface CampusMarqueeProps {
  className?: string;
}

/**
 * Thin, GPU-composited infinite horizontal marquee strip.
 * Pauses on hover and stays static under prefers-reduced-motion: reduce.
 */
export function CampusMarquee({ className = "" }: CampusMarqueeProps) {
  return (
    <div
      aria-label="GDG on Campus RVCE technical tracks"
      className={`gdg-marquee relative overflow-hidden border-y border-hairline bg-surface/80 py-2.5 select-none sm:py-3 ${className}`.trim()}
    >
      <div className="gdg-marquee-track flex w-max items-center">
        <MarqueeTrack />
        <MarqueeTrack hidden />
        <MarqueeTrack hidden />
        <MarqueeTrack hidden />
      </div>
    </div>
  );
}
