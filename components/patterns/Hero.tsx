import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { Container, Heading, Eyebrow, Lead, Prose, Placeholder, ButtonLink, Icon } from '@/components/ui';
import type { SplitAt } from './Sections';

/**
 * PATTERN: hero-new  (home)  —  measured h 1168 @1440 / 1588 @390
 * PATTERN: hero-new.inner-form (service-inner) — measured h 423 @1440
 * PATTERN: serviceouter-one     — measured h 593 @1440 / 1113 @390
 * PATTERN: serviceinner-one     — measured h 680 @1440 / 1347 @390
 * PATTERN: serviceareaouter-one — measured h 499 @1440 / 750 @390
 *
 * One configurable hero covers all five: they differ only in rhythm, whether a
 * media slot is present, and whether an aside (form) sits beside the copy.
 */
export type HeroVariant = 'full' | 'compact' | 'page';

export function Hero({
  variant = 'full',
  eyebrow,
  title,
  subtitle,
  body,
  bullets,
  primaryCta,
  secondaryCta,
  aside,
  badges,
  tab,
  mediaLabel = 'Garage door service placeholder',
  id,
  section,
  splitAt = 'lg',
  display = false,
}: {
  variant?: HeroVariant;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Body paragraphs under the lead. Rendered as <p> inside the Prose div. */
  body?: readonly string[];
  bullets?: readonly string[];
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  aside?: ReactNode;
  /** D-14 slot: the reference rating strip survives as visible TODO(fact) chips. */
  badges?: ReactNode;
  /** The vertical label tab beside the h1 (the reference FREE ESTIMATES flag). */
  tab?: string;
  mediaLabel?: string;
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  /**
   * Where the copy/aside split collapses. Measured: serviceouter-one (510 @1024
   * -> 593 @1440) and serviceinner-one (612 -> 680) are already two-column at
   * 1024, so `lg` is the default. Only home's hero-new (1652 -> 1168) is still
   * stacked at 1024 and opts into `xl`.
   */
  splitAt?: SplitAt;
  /** h1 sizing. The home hero measures 58/700 @1440; every other h1 measures 42. */
  display?: boolean;
}) {
  /* Section rhythm follows the measured ladder: 50/50 at 390-1024, 75/75 at
     1440 (q.mjs section service-outer 1 1024 -> pad=50 0 50 0). */
  const rhythm =
    variant === 'full'
      ? 'py-section-y-tight xl:py-section-y'
      : variant === 'page'
        ? 'py-section-y-tight xl:py-section-y'
        : 'py-section-y-tight';
  const asideCols = splitAt === 'xl' ? 'xl:grid-cols-2' : 'lg:grid-cols-2';

  return (
    <section
      id={id}
      data-section={section}
      className={`relative overflow-hidden bg-band text-ink-on-band ${rhythm}`}
    >
      {/* full-bleed media slot behind the copy. The scene is drawn (ArtPanel);
          the overlay above it is what actually buys the contrast the copy needs,
          so it stays even when real photography lands here. */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* `house`, not `door`. The hero box is roughly 1440x760 — a scene whose
            subject is a single door gets sliced to about 3x and the copy then
            runs across the door's own near-white panels at ~2:1. The roofline
            scene is uniformly dark at any crop, so it reads as a picture behind
            the words instead of competing with them. */}
        <Placeholder kind="full-bleed band" art="house" tone="band-deep" fill label={mediaLabel} />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-80" />
        <div className="absolute inset-0 bg-overlay" />
      </div>

      <Container className="relative">
        <div className={`grid gap-11 ${aside ? asideCols : ''} items-center`}>
          <div className="flex flex-col gap-7">
            {eyebrow ? <Eyebrow className="text-ink-on-band">{eyebrow}</Eyebrow> : null}

            {/* The reference's vertical tab beside the h1. Purely a label, so
                it is aria-hidden and the same words are in the eyebrow above —
                a rotated string is announced letter-perfect but read aloud in a
                place that makes no sense in the reading order. */}
            <div className="flex items-stretch gap-7">
              {tab ? (
                <span
                  aria-hidden="true"
                  className="hidden shrink-0 items-center justify-center bg-cta px-3 py-5 font-display text-3xs font-bold uppercase leading-display tracking-tracked text-cta-ink [writing-mode:vertical-rl] [transform:rotate(180deg)] sm:flex"
                >
                  {tab}
                </span>
              ) : null}
              <Heading level={1} as={1} display={display}>
                {title}
              </Heading>
            </div>

            {subtitle ? (
              <Lead className="self-start bg-accent px-7 py-4 text-ink-on-band">{subtitle}</Lead>
            ) : null}

            {body?.length ? (
              <Prose className="flex flex-col gap-5 text-ink-on-band-muted">
                {body.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </Prose>
            ) : null}

            {/* The reference's amber check discs. A filled disc, not a bare
                glyph: an amber tick alone is 1.9:1 on the hero overlay, and the
                disc is what makes the mark visible rather than the tick. */}
            {bullets?.length ? (
              <ul className="flex flex-col gap-5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-5">
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-circle bg-cta text-cta-ink"
                    >
                      <Icon icon={Check} size="sm" />
                    </span>
                    <span className="font-body text-xs font-medium leading-body text-ink-on-band">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            {primaryCta || secondaryCta ? (
              <div className="flex flex-wrap gap-5">
                {primaryCta ? (
                  <ButtonLink
                    variant={primaryCta.href.startsWith('tel:') ? 'call' : 'solid'}
                    href={primaryCta.href}
                  >
                    {primaryCta.label}
                  </ButtonLink>
                ) : null}
                {secondaryCta ? (
                  <ButtonLink
                    variant={secondaryCta.href.startsWith('tel:') ? 'call' : 'outline-band'}
                    href={secondaryCta.href}
                  >
                    {secondaryCta.label}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}

            {badges}
          </div>

          {aside ? <div className="w-full">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
