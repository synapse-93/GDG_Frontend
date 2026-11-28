/**
 * Understated 9px architectural registration crosshairs (+) aligned precisely
 * to the left and right grid intersections of the desktop 1200px editorial frame.
 */
export function GridCrosshairs() {
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 9 9"
        className="pointer-events-none absolute -bottom-[5px] -left-[5px] z-20 hidden h-[9px] w-[9px] text-ink-muted/35 xl:block"
      >
        <path
          d="M4.5 0V9M0 4.5H9"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 9 9"
        className="pointer-events-none absolute -right-[5px] -bottom-[5px] z-20 hidden h-[9px] w-[9px] text-ink-muted/35 xl:block"
      >
        <path
          d="M4.5 0V9M0 4.5H9"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </>
  );
}
