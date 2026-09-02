/** Skip link — visually hidden until focused, above every other layer. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-[var(--z-skip)] focus:bg-cta focus:px-9 focus:py-3 focus:font-display focus:text-xs focus:font-bold focus:uppercase focus:text-cta-ink"
    >
      Skip to main content
    </a>
  );
}
