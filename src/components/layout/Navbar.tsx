"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { GdgLogo } from "@/components/brand/GdgLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          aria-label={`${siteConfig.chapterName} — Home`}
          className="-ml-2 inline-flex min-w-0 shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
        >
          <GdgLogo responsive />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {siteConfig.navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                  active
                    ? "bg-surface text-ink ring-1 ring-hairline"
                    : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`font-mono text-[11px] ${
                    active ? "text-gdg-blue" : "text-ink-muted"
                  }`}
                >
                  {item.index}
                </span>
                <span>{item.label}</span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute right-3 bottom-0.5 left-3 h-[2px] rounded-full bg-gdg-blue"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
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
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {siteConfig.navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded-lg border px-3.5 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4] ${
                    active
                      ? "border-gdg-blue/50 bg-canvas text-ink"
                      : "border-transparent text-ink-muted hover:bg-surface-muted hover:text-ink"
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <span className="font-mono text-xs text-gdg-blue">
                      {`${item.index} //`}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  {active && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gdg-blue">
                      Active
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
