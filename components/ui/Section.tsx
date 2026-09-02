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
  band: 'bg-band text-ink-on-band',
  'band-deep': 'bg-band-deep text-ink-on-band',
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
  'data-section': dataSection,
}: {
  tone?: SectionTone;
  rhythm?: SectionRhythm;
  id?: string;
  className?: string;
  children: ReactNode;
  'aria-labelledby'?: string;
  /** docs/sections.md our-section-id. Identity pairing (PASS 1) joins on this.
      Owned by the lead; every band the wave builds must declare it. */
  'data-section'?: string;
}) {
  return (
    <section
      id={id}
      data-section={dataSection}
      aria-labelledby={labelledBy}
      /* Deliberately a BLOCK. The reference mixes block bands with flex-ROW
         bands and there is no single value that matches both: forcing
         `flex flex-col` was measured and moved 37 display mismatches onto 24
         display + 61 flexDir mismatches. Floored in docs/known-divergence.md. */
      className={`relative ${tones[tone]} ${rhythms[rhythm]} ${className}`}
    >
      {children}
    </section>
  );
}
