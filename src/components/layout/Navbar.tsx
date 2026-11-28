"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as m from "motion/react-m";
import {
  LayoutGroup,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { Calendar, Home, Search, Users } from "lucide-react";
import { GdgLogo } from "@/components/brand/GdgLogo";
import { COMMAND_PALETTE_EVENT } from "@/components/layout/CommandPalette";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/data/site";

const emptySubscribe = () => () => {};

function getShortcutHint(): string {
  if (typeof navigator === "undefined") return "⌘K";
  const platform = navigator.platform || navigator.userAgent || "";
  return /mac|iphone|ipad|ipod/i.test(platform) ? "⌘K" : "Ctrl K";
}

function getServerShortcutHint(): string {
  return "⌘K";
}

const MOBILE_DOCK_ROUTES = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/events", label: "Events", Icon: Calendar },
  { href: "/team", label: "Team", Icon: Users },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  const shortcutHint = useSyncExternalStore(
    emptySubscribe,
    getShortcutHint,
    getServerShortcutHint
  );

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Hide floating mobile dock on /events/[slug] where the sticky Register action bar sits
  const isEventDetailRoute =
    pathname.startsWith("/events/") && pathname !== "/events";

  const triggerCommandPalette = () => {
    window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label={`${siteConfig.chapterName} — Home`}
            className="-ml-2 inline-flex min-w-0 shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
          >
            <GdgLogo responsive />
          </Link>

          {/* Desktop navigation with spring hover pill (nav-hover) + active underline (nav-indicator) */}
          <LayoutGroup id="navbar-links">
            <nav
              aria-label="Primary navigation"
              onMouseLeave={() => setHoveredHref(null)}
              className="hidden items-center gap-2 md:flex"
            >
              {siteConfig.navLinks.map((item) => {
                const active = isActive(item.href);
                const hovered = hoveredHref === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setHoveredHref(item.href)}
                    onFocus={() => setHoveredHref(item.href)}
                    onBlur={() => setHoveredHref(null)}
                    className={`relative inline-flex h-16 items-center gap-2 px-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                      active ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {hovered && (
                      <m.span
                        layoutId="nav-hover"
                        aria-hidden="true"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="pointer-events-none absolute inset-x-0.5 top-1/2 h-9 -translate-y-1/2 rounded-full bg-surface-muted/85"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={`relative z-10 h-1.5 w-1.5 rounded-full transition-opacity ${
                        item.accentDot
                      } ${active || hovered ? "opacity-100" : "opacity-35"}`}
                    />
                    <span className="relative z-10">{item.label}</span>
                    {active && (
                      <m.span
                        layoutId="nav-indicator"
                        aria-hidden="true"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                          mass: 0.8,
                        }}
                        className="absolute right-2 bottom-0 left-2 h-[2.5px] rounded-full bg-gdg-blue"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>

          {/* Actions: Desktop ⌘K Launcher (hidden on mobile; lives in bottom dock) + 3D Theme Toggle */}
          <div className="flex items-center gap-2.5">
            <m.button
              type="button"
              onClick={triggerCommandPalette}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              aria-label="Open command navigation (Ctrl+K or Command+K)"
              className="group relative hidden h-10 items-center gap-2 overflow-hidden rounded-lg border border-hairline bg-surface px-3 text-xs font-medium text-ink-muted transition-colors hover:border-gdg-blue/60 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] md:inline-flex"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-60% to-[#34A853] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
              <Search
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-gdg-blue-ink"
                aria-hidden="true"
              />
              <span>Search...</span>
              <kbd className="rounded border border-hairline bg-canvas px-1.5 py-0.5 font-mono text-xs text-ink transition-colors group-hover:border-gdg-blue/40">
                {shortcutHint}
              </kbd>
            </m.button>

            <ThemeToggle />
          </div>
        </div>

        {/* Live Scroll-Linked 4-Color Google Progress Hairline (GPU-composited scaleX) */}
        <m.div
          aria-hidden="true"
          style={
            prefersReducedMotion
              ? { scaleX: 0, transformOrigin: "left" }
              : { scaleX, transformOrigin: "left" }
          }
          className="pointer-events-none absolute right-0 -bottom-px left-0 grid h-[2.5px] w-full grid-cols-4 will-change-transform"
        >
          <span className="bg-[#4285F4]" />
          <span className="bg-[#EA4335]" />
          <span className="bg-[#FBBC04]" />
          <span className="bg-[#34A853]" />
        </m.div>
      </header>

      {/* Native App-Style Floating Frosted-Glass Bottom Dock (md:hidden, hidden on /events/[slug]) */}
      {!isEventDetailRoute && (
        <nav
          aria-label="Mobile bottom navigation"
          className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-sm md:hidden"
        >
          <LayoutGroup id="mobile-bottom-dock">
            <div className="grid grid-cols-4 items-center gap-1 rounded-full border border-hairline bg-surface/90 p-1.5 shadow-[0_14px_38px_rgba(12,15,20,0.18)] backdrop-blur-xl dark:bg-surface/85 dark:shadow-[0_16px_42px_rgba(0,0,0,0.55)]">
              {MOBILE_DOCK_ROUTES.map(({ href, label, Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-[44px] flex-col items-center justify-center rounded-full px-2 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                      active ? "text-canvas" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {active && (
                      <m.span
                        layoutId="mobile-dock-active"
                        aria-hidden="true"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="pointer-events-none absolute inset-0 rounded-full bg-ink"
                      />
                    )}
                    <m.span
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 500, damping: 28 }}
                      className="relative z-10 flex flex-col items-center gap-0.5"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="leading-none">{label}</span>
                    </m.span>
                  </Link>
                );
              })}

              <m.button
                type="button"
                onClick={triggerCommandPalette}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                aria-label="Open quick search"
                className="relative flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1.5 text-[11px] font-semibold text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span className="leading-none">Search</span>
              </m.button>
            </div>
          </LayoutGroup>
        </nav>
      )}
    </>
  );
}
