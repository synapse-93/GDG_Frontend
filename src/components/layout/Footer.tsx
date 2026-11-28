"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="border-t border-hairline bg-canvas pb-24 md:pb-0">
      {/* 4-color Google hairline top rule */}
      <div aria-hidden="true" className="grid h-[3px] w-full grid-cols-4">
        <div className="bg-[#4285F4]" />
        <div className="bg-[#EA4335]" />
        <div className="bg-[#FBBC04]" />
        <div className="bg-[#34A853]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* MOBILE (< md): Compact Zero-Bloat Footer */}
        <div className="space-y-5 md:hidden">
          <div className="space-y-2">
            <div className="-ml-2">
              <GdgLogo />
            </div>
            <p className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted">
              <MapPin
                className="h-3.5 w-3.5 shrink-0 text-gdg-red"
                aria-hidden="true"
              />
              <span>{siteConfig.location}</span>
            </p>
          </div>

          {/* Single compact horizontal row: Home · Events · Team */}
          <nav
            aria-label="Footer navigation"
            className="flex items-center gap-3 border-y border-hairline py-3 text-sm font-semibold text-ink"
          >
            {siteConfig.navLinks.map((item, idx) => (
              <span key={item.href} className="inline-flex items-center gap-3">
                <Link
                  href={item.href}
                  className="transition-colors hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                >
                  {item.label}
                </Link>
                {idx < siteConfig.navLinks.length - 1 && (
                  <span aria-hidden="true" className="text-ink-muted">
                    &middot;
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Hide duplicate social buttons on Home where CommunityLinks sits directly above */}
          {!isHome && (
            <div className="flex items-center gap-2.5">
              {siteConfig.communityLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} — ${link.handle}`}
                  title={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink transition-colors hover:border-gdg-blue/60 hover:text-gdg-blue-ink active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                >
                  <CommunityIcon id={link.id} />
                </a>
              ))}
            </div>
          )}

          {/* Tight credits & independent chapter disclaimer */}
          <div className="space-y-2.5 text-xs leading-relaxed text-ink-muted">
            <p>
              Credits: {siteConfig.credits.fonts} &middot;{" "}
              {siteConfig.credits.icons}.
            </p>
            <p>
              <strong className="font-semibold text-ink">Disclaimer:</strong>{" "}
              {siteConfig.disclaimer}
            </p>
          </div>
        </div>

        {/* DESKTOP & TABLET (md: and up) */}
        <div className="hidden md:block">
          {isHome ? (
            /* Minimal Home Footer — CommunityLinks already lists all social channels directly above */
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="-ml-2">
                  <GdgLogo />
                </div>
                <p className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted">
                  <MapPin
                    className="h-3.5 w-3.5 shrink-0 text-gdg-red"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.location}</span>
                </p>
              </div>

              <nav
                aria-label="Footer navigation"
                className="flex items-center gap-4 text-sm font-semibold text-ink"
              >
                {siteConfig.navLinks.map((item, idx) => (
                  <span
                    key={item.href}
                    className="inline-flex items-center gap-4"
                  >
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 transition-colors hover:text-gdg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${item.accentDot}`}
                      />
                      <span>{item.label}</span>
                    </Link>
                    {idx < siteConfig.navLinks.length - 1 && (
                      <span aria-hidden="true" className="text-hairline">
                        &middot;
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            </div>
          ) : (
            /* Full 3-Column Editorial Footer on /events, /events/[slug], and /team */
            <div className="grid grid-cols-12 gap-10">
              {/* Chapter Identity */}
              <div className="col-span-5 space-y-4">
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

              {/* Site Navigation */}
              <div className="col-span-3">
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
              <div className="col-span-4">
                <h2 className="text-sm font-bold text-ink">
                  Community Channels
                </h2>
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
                          <span>{link.handle}</span>
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
          )}

          {/* Credits & Explicit Independent Chapter Disclaimer */}
          <div className="mt-8 space-y-4 border-t border-hairline pt-6">
            <div className="flex flex-row items-center justify-between gap-2 text-xs text-ink-muted">
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
      </div>
    </footer>
  );
}
