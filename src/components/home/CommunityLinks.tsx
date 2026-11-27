import {
  ArrowUpRight,
  Briefcase,
  Camera,
  Code2,
  MessageSquare,
  PlayCircle,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig, type CommunityLinkItem } from "@/data/site";

function ChannelIcon({ id }: { id: CommunityLinkItem["id"] }) {
  const iconClass = "h-4 w-4 shrink-0";
  switch (id) {
    case "github":
      return <Code2 className={iconClass} aria-hidden="true" />;
    case "discord":
      return <MessageSquare className={iconClass} aria-hidden="true" />;
    case "linkedin":
      return <Briefcase className={iconClass} aria-hidden="true" />;
    case "instagram":
      return <Camera className={iconClass} aria-hidden="true" />;
    case "youtube":
      return <PlayCircle className={iconClass} aria-hidden="true" />;
  }
}

const CHANNEL_BADGE: Record<CommunityLinkItem["accentColor"], string> = {
  blue: "bg-[#1765CC] text-white rounded-xl",
  green: "bg-[#137333] text-white rounded-full",
  red: "bg-[#C5221F] text-white rounded-2xl",
  yellow: "bg-[#FBBC04] text-[#111827] rounded-xl", // Strict #111827 dark ink on yellow
};

export function CommunityLinks() {
  return (
    <section
      aria-labelledby="community-links-heading"
      className="bg-canvas py-16 sm:py-24"
    >
      <ScrollReveal className="w-full">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Column (4 cols) */}
          <div className="lg:col-span-4">
            <h2
              id="community-links-heading"
              className="text-3xl font-extrabold tracking-[-0.03em] text-ink text-balance sm:text-4xl"
            >
              Stay connected between campus sessions
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
              Follow starter repositories, recorded architecture teardowns, and
              study-jam threads across our open chapter channels.
            </p>
          </div>

          {/* Right Expressive Hairline-Divided Channel Directory (8 cols) */}
          <div className="lg:col-span-8">
            <ul className="divide-y divide-hairline border-y border-hairline">
              {siteConfig.communityLinks.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-1 gap-2 py-4 transition-snappy hover:bg-surface-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:grid-cols-12 sm:items-center sm:gap-4 sm:px-3"
                  >
                    <div className="flex items-center gap-3 sm:col-span-3">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center transition-spring group-hover:-rotate-6 ${CHANNEL_BADGE[channel.accentColor]}`}
                      >
                        <ChannelIcon id={channel.id} />
                      </span>
                      <span className="text-sm font-bold text-ink transition-colors group-hover:text-gdg-blue-ink">
                        {channel.label}
                      </span>
                    </div>

                    <p className="text-sm text-ink-muted text-pretty sm:col-span-5">
                      {channel.description}
                    </p>

                    <div className="flex items-center justify-between gap-2 font-mono text-xs text-ink-muted sm:col-span-4 sm:justify-end">
                      <span className="truncate group-hover:text-ink">
                        {channel.handle}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gdg-blue-ink"
                        aria-hidden="true"
                      />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
