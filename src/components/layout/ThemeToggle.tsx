"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle color theme"
      }
      title={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle color theme"
      }
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface text-ink transition-transform duration-150 hover:bg-surface-muted active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4 text-gdg-yellow" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4 text-ink" aria-hidden="true" />
        )
      ) : (
        <span className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
