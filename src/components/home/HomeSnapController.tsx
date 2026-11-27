"use client";

import { useEffect } from "react";

/**
 * Enables soft desktop-only proximity scroll snapping strictly while on Home (/).
 * Cleans up data-home-snap on unmount so /events, /events/[slug], and /team are unaffected.
 */
export function HomeSnapController() {
  useEffect(() => {
    document.documentElement.setAttribute("data-home-snap", "true");
    return () => {
      document.documentElement.removeAttribute("data-home-snap");
    };
  }, []);

  return null;
}
