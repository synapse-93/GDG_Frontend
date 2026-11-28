import {
  ArrowUpRight,
  Briefcase,
  Camera,
  Code2,
  MessageSquare,
  PlayCircle,
} from "lucide-react";
import { KineticText } from "@/components/ui/KineticText";
import { ScrollStage } from "@/components/ui/ScrollStage";
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

const CHANNEL_BADGE: Record<CommunityLinkItem["id"], string> = {
  github:
    "bg-[#181717] text-white dark:bg-[#F0F6FC] dark:text-[#181717] rounded-lg",
  discord: "bg-[#5865F2] text-white rounded-lg",
  linkedin: "bg-[#0A66C2] text-white rounded-lg",
  instagram:
    "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white rounded-lg",
  youtube: "bg-[#FF0000] text-white rounded-lg",
};

export function CommunityLinks() {
  return (
    <section
      aria-labelledby="community-links-heading"
      className="bg-canvas py-10 sm:py-16 lg:py-24"
    >
      <ScrollStage className="w-full">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Editorial Column (4 cols) */}
            <div className="lg:col-span-4">
              <p className="mb-2.5 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-[1.5px] bg-[#FBBC04]"
                />
                <span>Community Channels</span>
              </p>
              <h2
                id="community-links-heading"
                className="text-2xl font-extrabold tracking-[-0.032em] text-ink text-balance sm:text-4xl"
              >
                <KineticText text="Stay connected between campus sessions" />
              </h2>
              <p className="mt-2 hidden text-base leading-relaxed text-ink-muted text-pretty md:mt-3 md:block">
                Grab starter repos, watch recorded talks, and join study-jam
                threads across our campus channels.
              </p>
            </div>

            {/* Mobile (< md): Compact 2-Column Grid (5th item spans 2 cols) */}
            <div className="md:hidden">
              <ul className="grid grid-cols-2 gap-2.5">
                {siteConfig.communityLinks.map((channel, idx) => {
                  const isLastOdd =
                    idx === siteConfig.communityLinks.length - 1 &&
                    siteConfig.communityLinks.length % 2 === 1;
                  return (
                    <li
                      key={channel.id}
                      className={isLastOdd ? "col-span-2" : undefined}
                    >
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gdg-card-bevel group flex items-center gap-2.5 rounded-xl border border-hairline bg-surface p-2.5 transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                      >
                        <span
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center ${CHANNEL_BADGE[channel.id]}`}
                        >
                          <ChannelIcon id={channel.id} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-bold text-ink group-hover:text-gdg-blue-ink">
                            {channel.label}
                          </p>
                          <p className="truncate font-mono text-[11px] text-ink-muted">
                            {channel.handle}
                          </p>
                        </div>
                        {isLastOdd ? (
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-ink-muted"
                            aria-hidden="true"
                          />
                        ) : null}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Desktop & Tablet (md: and up): Expressive Hairline-Divided Channel Directory */}
            <div className="hidden md:block lg:col-span-8">
              <ul className="divide-y divide-hairline border-y border-hairline">
                {siteConfig.communityLinks.map((channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-12 items-center gap-4 px-3 py-4 transition-snappy hover:bg-surface-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                    >
                      <div className="col-span-3 flex items-center gap-3">
                        <span
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center transition-spring group-hover:-rotate-6 ${CHANNEL_BADGE[channel.id]}`}
                        >
                          <ChannelIcon id={channel.id} />
                        </span>
                        <span className="text-sm font-bold text-ink transition-colors group-hover:text-gdg-blue-ink">
                          {channel.label}
                        </span>
                      </div>

                      <p className="col-span-5 text-sm text-ink-muted text-pretty">
                        {channel.description}
                      </p>

                      <div className="col-span-4 flex items-center justify-end gap-2 font-mono text-xs text-ink-muted">
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
      </ScrollStage>
    </section>
  );
}
