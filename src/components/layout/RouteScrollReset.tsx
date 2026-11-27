"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets scroll cleanly to the top on client route transitions (unless a hash target is present)
 * and ensures Home's proximity snap attribute never lingers on inner routes.
 */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      document.documentElement.removeAttribute("data-home-snap");
    }

    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
