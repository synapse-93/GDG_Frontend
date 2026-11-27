"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { GdgLogo } from "@/components/brand/GdgLogo";
import { COMMAND_PALETTE_EVENT } from "@/components/layout/CommandPalette";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const triggerCommandPalette = () => {
    setMobileOpen(false);
    window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
  };

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (
        headerRef.current &&
        event.target instanceof Node &&
        !headerRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-hairline bg-canvas/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          aria-label={`${siteConfig.chapterName} — Home`}
          className="-ml-2 inline-flex min-w-0 shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
        >
          <GdgLogo responsive />
        </Link>

        {/* Desktop editorial navigation — clean unnumbered links with Google indicator dots */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 md:flex"
        >
          {siteConfig.navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex h-16 items-center gap-2 px-1 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                    item.accentDot
                  } ${active ? "opacity-100" : "opacity-35"}`}
                />
                <span>{item.label}</span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute right-0 bottom-0 left-0 h-[2px] bg-gdg-blue"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions: ⌘K Launcher + Theme Toggle + Mobile Drawer */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerCommandPalette}
            aria-label="Open command navigation (Ctrl+K or Command+K)"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-hairline bg-surface px-2.5 text-xs font-medium text-ink-muted transition-colors hover:border-gdg-blue/60 hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] sm:px-3"
          >
            <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Jump to...</span>
            <kbd className="hidden rounded border border-hairline bg-canvas px-1.5 py-0.5 font-mono text-xs text-ink sm:inline">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface text-ink transition-transform duration-150 hover:bg-surface-muted active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-hairline bg-surface md:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-6xl flex-col divide-y divide-hairline px-4 py-2 sm:px-6"
          >
            {siteConfig.navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[48px] items-center justify-between py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  <span className="inline-flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${item.accentDot}`}
                    />
                    <span>{item.label}</span>
                  </span>
                  {active && (
                    <span className="font-mono text-xs text-gdg-blue-ink">
                      Current
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
