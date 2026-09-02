import type { ReactNode } from 'react';

/**
 * Section — the decomposition unit. Every band on the site is one of these.
 * Vertical rhythm comes only from the extracted spacing scale:
 *   default 75px · hero 120px · tight 50px · none 0
 */
export type SectionTone = 'page' | 'surface' | 'band' | 'band-deep';
export type SectionRhythm = 'default' | 'hero' | 'tight' | 'none';

const tones: Record<SectionTone, string> = {
  page: 'bg-page-bg text-ink',
  surface: 'bg-surface text-ink',
  band: 'bg-band text-on-band',
  'band-deep': 'bg-band-deep text-on-band',
};

const rhythms: Record<SectionRhythm, string> = {
  /* Measured: the target section pads 50/50 at 390-1024 and 75/75 at 1440.
     (q.mjs section service-outer 1 1024 -> pad=50 0 50 0; @1440 -> pad=75 0 75 0) */
  default: 'py-section-y-tight xl:py-section-y',
  hero: 'py-section-y-hero',
  tight: 'py-section-y-tight',
  none: 'py-0',
};

export function Section({
  tone = 'page',
  rhythm = 'default',
  id,
  className = '',
  children,
  'aria-labelledby': labelledBy,
}: {
  tone?: SectionTone;
  rhythm?: SectionRhythm;
  id?: string;
  className?: string;
  children: ReactNode;
  'aria-labelledby'?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative ${tones[tone]} ${rhythms[rhythm]} ${className}`}
    >
      {children}
    </section>
  );
}
