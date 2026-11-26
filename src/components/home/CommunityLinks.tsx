import {
  ArrowUpRight,
  Briefcase,
  Camera,
  Code2,
  MessageSquare,
  PlayCircle,
} from "lucide-react";
import { siteConfig, type CommunityLinkItem } from "@/data/site";
import { ACCENT_STYLES } from "@/lib/accents";

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

export function CommunityLinks() {
  return (
    <section
      aria-labelledby="community-links-heading"
      className="bg-surface/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
            {"05 // OPEN CHANNELS"}
          </p>
          <h2
            id="community-links-heading"
            className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            Stay connected between campus sessions
          </h2>
          <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
            Follow starter repositories, recorded walkthroughs, and build
            threads across our chapter channels.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.communityLinks.map((channel) => {
            const accent = ACCENT_STYLES[channel.accentColor];
            return (
              <a
                key={channel.id}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col justify-between rounded-2xl border border-hairline bg-surface p-4 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${accent.borderHover}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink">
                      <ChannelIcon id={channel.id} />
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${accent.dot}`}
                    />
                    <h3 className="text-sm font-bold text-ink">
                      {channel.label}
                    </h3>
                  </div>

                  <p className="mt-1 truncate font-mono text-[11px] text-ink-muted">
                    {channel.handle}
                  </p>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                  {channel.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
