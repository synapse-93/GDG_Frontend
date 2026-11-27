import { siteConfig } from "@/data/site";

interface GdgLogoProps {
  /** Compact mode shortens the campus subtitle on all viewports. */
  compact?: boolean;
  /** Responsive mode shows short "RVCE" under 640px and full chapter subtitle at sm+. */
  responsive?: boolean;
  className?: string;
}

/**
 * Official-spec GDG on Campus lockup placeholder.
 * Maintains generous clear space (p-2) and an unstretched 4-color < > bracket
 * mark so the official GDG SVG asset can drop in without altering layout metrics.
 */
export function GdgLogo({
  compact = false,
  responsive = false,
  className = "",
}: GdgLogoProps) {
  const fullSubtitle = siteConfig.chapterName.replace("GDG on Campus ", "");

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2.5 p-2 select-none sm:gap-3 ${className}`.trim()}
    >
      {/* Drop-in slot for official GDG on Campus bracket SVG mark */}
      <svg
        width="38"
        height="21"
        viewBox="0 0 40 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-[20px] w-[36px] shrink-0 sm:h-[22px] sm:w-[40px]"
      >
        {/* Left bracket (<): Red top bar + Blue bottom bar */}
        <path
          d="M14.5 3.5L5.5 11"
          stroke="#EA4335"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <path
          d="M5.5 11L14.5 18.5"
          stroke="#4285F4"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        {/* Right bracket (>): Green top bar + Yellow bottom bar */}
        <path
          d="M25.5 3.5L34.5 11"
          stroke="#34A853"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <path
          d="M34.5 11L25.5 18.5"
          stroke="#FBBC04"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
      </svg>

      <span className="flex min-w-0 flex-col leading-none">
        <span className="whitespace-nowrap text-sm font-bold tracking-tight text-ink sm:text-base">
          GDG on Campus
        </span>
        <span className="mt-1 whitespace-nowrap font-mono text-xs font-medium tracking-wide text-ink-muted">
          {compact ? (
            "RVCE"
          ) : responsive ? (
            <>
              <span className="sm:hidden">RVCE</span>
              <span className="hidden sm:inline">{fullSubtitle}</span>
            </>
          ) : (
            fullSubtitle
          )}
        </span>
      </span>
    </span>
  );
}
