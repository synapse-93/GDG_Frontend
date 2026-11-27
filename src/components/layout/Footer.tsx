import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Camera,
  Code2,
  MapPin,
  MessageSquare,
  PlayCircle,
} from "lucide-react";
import { GdgLogo } from "@/components/brand/GdgLogo";
import { siteConfig, type CommunityLinkItem } from "@/data/site";

function CommunityIcon({ id }: { id: CommunityLinkItem["id"] }) {
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

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      {/* 4-color Google hairline top rule */}
      <div aria-hidden="true" className="grid h-[3px] w-full grid-cols-4">
        <div className="bg-[#4285F4]" />
        <div className="bg-[#EA4335]" />
        <div className="bg-[#FBBC04]" />
        <div className="bg-[#34A853]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Chapter Identity */}
          <div className="space-y-4 md:col-span-5">
            <div className="-ml-2">
              <GdgLogo />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              {siteConfig.tagline}
            </p>
            <p className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted">
              <MapPin
                className="h-3.5 w-3.5 shrink-0 text-gdg-red"
                aria-hidden="true"
              />
              <span>{siteConfig.location}</span>
            </p>
          </div>

          {/* Site Navigation — clean unnumbered list */}
          <div className="md:col-span-3">
            <h2 className="text-sm font-bold text-ink">Directory</h2>
            <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
              {siteConfig.navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-[42px] items-center gap-2.5 py-2 text-sm font-medium text-ink transition-colors hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${item.accentDot}`}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Channels */}
          <div className="md:col-span-4">
            <h2 className="text-sm font-bold text-ink">Community Channels</h2>
            <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
              {siteConfig.communityLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[42px] items-center justify-between gap-3 py-2 text-sm font-medium text-ink transition-colors hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <CommunityIcon id={link.id} />
                      <span>{link.label}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted group-hover:text-gdg-blue-ink">
                      <span className="hidden sm:inline">{link.handle}</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Credits & Explicit Independent Chapter Disclaimer */}
        <div className="mt-12 space-y-4 border-t border-hairline pt-6">
          <div className="flex flex-col gap-2 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono">
              {siteConfig.shortName} &middot; {siteConfig.academicCycle}
            </p>
            <p>
              Open-source credits: {siteConfig.credits.fonts} &middot;{" "}
              {siteConfig.credits.icons}.
            </p>
          </div>
          <p className="border-t border-hairline pt-4 text-xs leading-relaxed text-ink-muted">
            <strong className="font-semibold text-ink">Disclaimer:</strong>{" "}
            {siteConfig.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
