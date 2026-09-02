import type { ReactNode } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import {
  Container,
  Section,
  Heading,
  Eyebrow,
  Prose,
  Lead,
  Card,
  Icon,
  Placeholder,
  ButtonLink,
  Carousel,
  Tabs,
  Reveal,
  type SectionTone,
  type PlaceholderKind,
} from '@/components/ui';

/**
 * Sections.tsx — the canonical SECTION PATTERN vocabulary.
 *
 * Every extracted pattern in docs/03-design-system.md lives here or in one of
 * the single-purpose pattern files (Hero, ContactBlock, ContactForm,
 * ServiceAreaMap, FaqBlock, SiteHeader, SiteFooter). SYNTHESIZE routes compose
 * ONLY from these plus components/ui/*.
 *
 * Geometry per breakpoint is recorded against each pattern below and in full in
 * .harness/out/profile.json.
 */

export type PatternAction = { href: string; label: string };

function Actions({ actions, onBand }: { actions?: readonly PatternAction[]; onBand: boolean }) {
  if (!actions?.length) return null;
  return (
    <div className="flex flex-wrap gap-5">
      {actions.map((a, i) => (
        <ButtonLink
          key={a.href + a.label}
          href={a.href}
          variant={i === 0 ? 'primary' : onBand ? 'phone' : 'inverse'}
        >
          {a.label}
        </ButtonLink>
      ))}
    </div>
  );
}

function Bullets({ items }: { items?: readonly string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3">
          <Icon icon={Check} size="sm" className="mt-1 shrink-0 text-cta" />
          <span className="font-display text-xs font-bold capitalize leading-display">{b}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionHead({
  eyebrow,
  heading,
  body,
  headingId,
  onBand,
  center = false,
}: {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  body?: ReactNode;
  headingId?: string;
  onBand: boolean;
  center?: boolean;
}) {
  if (!heading && !eyebrow && !body) return null;
  return (
    <div className={`flex max-w-prose flex-col gap-5 ${center ? 'mx-auto items-center text-center' : ''}`}>
      {eyebrow ? <Eyebrow className={onBand ? 'text-cta' : 'text-accent'}>{eyebrow}</Eyebrow> : null}
      {heading ? (
        <Heading level={2} id={headingId}>
          {heading}
        </Heading>
      ) : null}
      {body ? <Prose className={onBand ? 'text-on-band-muted' : 'text-ink-muted'}>{body}</Prose> : null}
    </div>
  );
}

const isBand = (t: SectionTone) => t === 'band' || t === 'band-deep';

/* ------------------------------------------------------------------ SPLIT */

/**
 * PATTERN: about-us-new (863) · giving (712) · serviceouter-two (818)
 *          serviceinner-two (523) · serviceinner-three (492, reversed)
 *          message-owner (658)
 *
 * `message-owner` in the target carries an owner portrait and a signed personal
 * message. Staff photos and named real people are CONFIG FORBIDDEN, so that
 * usage passes `media="none"` with company-voice copy. Layout survives, person
 * does not.
 */
/**
 * SplitAt — where a two-column split collapses to one column.
 *
 * The target does NOT use one switch point. Measured section heights at 1024 vs
 * 1440 sort every split into two groups:
 *   still stacked at 1024 (switch is above it): hero-new 1652->1168,
 *     about-us-new 1945->863, message-owner 1042->658, contact-new 1645->677
 *   already two-column at 1024: giving 563->712, waterproofing 502->646,
 *     emergency 460->491, map-sec 803->903
 * So `lg` stays the default and only the first group opts into `xl`. A blanket
 * move of every split to `xl` would break the second group.
 */
export type SplitAt = 'lg' | 'xl';

export function SplitFeature({
  tone = 'page',
  reverse = false,
  eyebrow,
  heading,
  body,
  bullets,
  actions,
  media = '4:3 card',
  mediaLabel,
  id,
  headingId,
  splitAt = 'lg',
  children,
}: {
  tone?: SectionTone;
  reverse?: boolean;
  eyebrow?: ReactNode;
  heading: ReactNode;
  body?: ReactNode;
  bullets?: readonly string[];
  actions?: readonly PatternAction[];
  media?: PlaceholderKind | 'none';
  mediaLabel?: string;
  id?: string;
  headingId?: string;
  splitAt?: SplitAt;
  children?: ReactNode;
}) {
  const onBand = isBand(tone);
  const cols = splitAt === 'xl' ? 'xl:grid-cols-2' : 'lg:grid-cols-2';
  const first = splitAt === 'xl' ? 'xl:order-1' : 'lg:order-1';
  const second = splitAt === 'xl' ? 'xl:order-2' : 'lg:order-2';
  return (
    <Section tone={tone} id={id} aria-labelledby={headingId}>
      <Container>
        <div className={`grid items-center gap-11 ${media === 'none' ? '' : cols}`}>
          {media !== 'none' ? (
            <Reveal className={reverse ? second : first}>
              <Placeholder
                kind={media}
                tone={onBand ? 'band-deep' : 'surface'}
                label={mediaLabel ?? 'Garage door placeholder'}
              />
            </Reveal>
          ) : null}
          <Reveal className={reverse ? first : second}>
            <div className="flex flex-col gap-7">
              <SectionHead eyebrow={eyebrow} heading={heading} body={body} headingId={headingId} onBand={onBand} />
              <Bullets items={bullets} />
              {children}
              <Actions actions={actions} onBand={onBand} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ BANDS */

/** PATTERN: waterproofing (646) · emergency (491) · serviceinner-four (530) */
export function CtaBand({
  tone = 'band',
  layout = 'between',
  eyebrow,
  heading,
  body,
  actions,
  id,
  headingId,
}: {
  tone?: SectionTone;
  layout?: 'between' | 'center';
  eyebrow?: ReactNode;
  heading: ReactNode;
  body?: ReactNode;
  actions?: readonly PatternAction[];
  id?: string;
  headingId?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section tone={tone} id={id} aria-labelledby={headingId}>
      <Container>
        <Reveal>
          <div
            className={
              layout === 'center'
                ? 'flex flex-col items-center gap-7'
                : 'flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between'
            }
          >
            <SectionHead
              eyebrow={eyebrow}
              heading={heading}
              body={body}
              headingId={headingId}
              onBand={onBand}
              center={layout === 'center'}
            />
            <div className="shrink-0">
              <Actions actions={actions} onBand={onBand} />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** PATTERN: faq-one — thin band intro (304) */
export function SectionIntro({
  tone = 'band',
  eyebrow,
  heading,
  body,
  headingLevel = 2,
  id,
  headingId,
}: {
  tone?: SectionTone;
  eyebrow?: ReactNode;
  heading: ReactNode;
  body?: ReactNode;
  headingLevel?: 1 | 2;
  id?: string;
  headingId?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section tone={tone} rhythm="tight" id={id} aria-labelledby={headingId}>
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-prose flex-col items-center gap-5 text-center">
            {eyebrow ? <Eyebrow className={onBand ? 'text-cta' : 'text-accent'}>{eyebrow}</Eyebrow> : null}
            <Heading level={2} as={headingLevel} id={headingId}>
              {heading}
            </Heading>
            {body ? <Lead className={onBand ? 'text-on-band-muted' : 'text-ink-muted'}>{body}</Lead> : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * PATTERN: marquee — infinite ticker (90 @1440 / 71 @390)
 * The target drives this with a slick instance at speed 4000 / autoplaySpeed 0
 * / cssEase linear — a carousel used purely as a marquee. CSS is the honest
 * equivalent and needs no library. Halts under prefers-reduced-motion.
 * The duplicate run is aria-hidden so the list is announced once.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  return (
    <section aria-label="Service highlights" className="overflow-hidden bg-cta py-7 text-cta-ink xl:py-9">
      <div className="flex w-max animate-marquee gap-11 motion-reduce:animate-none">
        {items.map((item) => (
          <span key={`a-${item}`} className="whitespace-nowrap font-display text-2xl font-bold uppercase leading-display">
            {item}
          </span>
        ))}
        {items.map((item) => (
          <span
            key={`b-${item}`}
            aria-hidden="true"
            className="whitespace-nowrap font-display text-2xl font-bold uppercase leading-display"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

/** PATTERN: breadcrumb — thin band (232 @1440 / 282 @390) */
export function Breadcrumb({ trail }: { trail: readonly { label: string; path: string }[] }) {
  return (
    <Section tone="surface" rhythm="tight">
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-3">
            {trail.map((t, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={t.path} className="flex items-center gap-3">
                  {last ? (
                    <span aria-current="page" className="font-display text-xs font-bold uppercase leading-display">
                      {t.label}
                    </span>
                  ) : (
                    <Link
                      href={t.path}
                      className="font-display text-xs font-regular uppercase leading-display text-ink-muted transition-colors duration-fast ease-standard hover:text-accent"
                    >
                      {t.label}
                    </Link>
                  )}
                  {!last ? (
                    <span aria-hidden="true" className="text-ink-muted">
                      /
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </Section>
  );
}

/** PATTERN: steps — numbered process row (597 @1440 / 1473 @390) */
export type Step = { title: string; body: string };

export function StepRow({
  tone = 'page',
  eyebrow,
  heading,
  steps,
  id,
  headingId,
}: {
  tone?: SectionTone;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  steps: readonly Step[];
  id?: string;
  headingId?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section tone={tone} id={id} aria-labelledby={headingId}>
      <Container>
        <div className="flex flex-col gap-11">
          <SectionHead eyebrow={eyebrow} heading={heading} headingId={headingId} onBand={onBand} />
          <ol className="grid gap-9 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal>
                  <div className="flex h-full flex-col gap-5">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-circle bg-cta font-display text-2xl font-bold leading-flat text-cta-ink"
                    >
                      {i + 1}
                    </span>
                    <Heading level={4} as={3}>
                      {s.title}
                    </Heading>
                    <Prose className={onBand ? 'text-on-band-muted' : 'text-ink-muted'}>{s.body}</Prose>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/**
 * PATTERN: feature — stat row (322 @1440 / 599 @390), counters REMOVED.
 *
 * The target animates `.count` from 0 to `data-value` on scroll. Those values
 * are job counts and years-in-business figures — both CONFIG FORBIDDEN. The
 * numbers AND the scroll handler are deleted. Intentional structural
 * deviation, never a divergence.
 *
 * `Fact.value` is deliberately a STRING and must stay qualitative (hours,
 * response, coverage). Do not pass a count here.
 */
export type Fact = { label: string; value: string };

export function FeatureRow({
  tone = 'surface',
  heading,
  facts,
  id,
  headingId,
}: {
  tone?: SectionTone;
  heading?: ReactNode;
  facts: readonly Fact[];
  id?: string;
  headingId?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section tone={tone} id={id} aria-labelledby={headingId}>
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-9">
            {heading ? (
              <Heading level={2} id={headingId} className="text-center">
                {heading}
              </Heading>
            ) : null}
            <dl className="grid w-full gap-9 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-3 text-center">
                  <dt
                    className={`font-display text-3xs font-semibold uppercase leading-display tracking-tracked ${
                      onBand ? 'text-on-band-muted' : 'text-ink-muted'
                    }`}
                  >
                    {f.label}
                  </dt>
                  <dd className="font-display text-2xl font-bold leading-display">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ GRIDS */

export type GridItem = {
  title: string;
  body?: string;
  href?: string;
  media?: PlaceholderKind | 'none';
  mediaLabel?: string;
};

function ItemCard({ item, onBand }: { item: GridItem; onBand: boolean }) {
  const inner = (
    <Card variant="signature" className="flex h-full flex-col overflow-hidden">
      {item.media && item.media !== 'none' ? (
        <Placeholder
          kind={item.media}
          tone={onBand ? 'band-deep' : 'surface'}
          className="rounded-none"
          label={item.mediaLabel ?? `${item.title} placeholder`}
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Heading level={4} as={3} className="text-ink">
          {item.title}
        </Heading>
        {item.body ? <Prose className="flex-1 text-ink-muted">{item.body}</Prose> : null}
        {item.href ? (
          <span className="mt-3 inline-flex items-center gap-3 font-display text-xs font-bold uppercase leading-display text-accent">
            Learn more
            <Icon icon={ArrowRight} size="sm" />
          </span>
        ) : null}
      </div>
    </Card>
  );
  return item.href ? (
    <Link href={item.href} className="block h-full transition-transform duration-base ease-standard hover:-translate-y-1">
      {inner}
    </Link>
  ) : (
    inner
  );
}

/**
 * Grid column ladders. `stackUntil` picks where the grid starts splitting,
 * because the target does not use one answer:
 *   `sm` (default) — 2-up from 640, matching serviceouter-three and services
 *   `lg`           — single column all the way to 1024, matching blogs-one
 *                    (measured 2247 @768 stacked -> 652 @1024 three-up)
 */
const colsFor = (n: 2 | 3 | 4, stackUntil: 'sm' | 'lg' = 'sm') => {
  if (stackUntil === 'lg') return n === 2 ? 'lg:grid-cols-2' : n === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
  return n === 2 ? 'sm:grid-cols-2' : n === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3';
};

/**
 * PATTERN: serviceouter-three (707) · blogs-one (724) · services (790)
 *          template-ascend (2653)
 *
 * `template-ascend`'s "Show 14 More" XHR is NOT reproduced — our build has no
 * post archive, so this is a static grid. Recorded as a SKIPPED axis in docs/04.
 */
export function CardGrid({
  tone = 'page',
  eyebrow,
  heading,
  body,
  items,
  columns = 3,
  stackUntil = 'sm',
  id,
  headingId,
}: {
  tone?: SectionTone;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  body?: ReactNode;
  items: readonly GridItem[];
  columns?: 2 | 3 | 4;
  /** Where the grid starts splitting. See `colsFor`. */
  stackUntil?: 'sm' | 'lg';
  id?: string;
  headingId?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section tone={tone} id={id} aria-labelledby={headingId}>
      <Container>
        <div className="flex flex-col gap-11">
          <SectionHead eyebrow={eyebrow} heading={heading} body={body} headingId={headingId} onBand={onBand} />
          <ul className={`grid gap-9 ${colsFor(columns, stackUntil)}`}>
            {items.map((item) => (
              <li key={item.title} className="h-full">
                <Reveal>
                  <ItemCard item={item} onBand={onBand} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/** PATTERN: slatedroof-new (708) · roofing-materials (557) */
export function CardCarousel({
  tone = 'page',
  eyebrow,
  heading,
  body,
  items,
  perView = { base: 1, md: 2, lg: 3 },
  id,
  headingId,
}: {
  tone?: SectionTone;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  body?: ReactNode;
  items: readonly GridItem[];
  perView?: { base: 1 | 2 | 3 | 4; md?: 1 | 2 | 3 | 4; lg?: 1 | 2 | 3 | 4 };
  id?: string;
  headingId?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section tone={tone} id={id} aria-labelledby={headingId}>
      <Container>
        <div className="flex flex-col gap-11">
          <SectionHead eyebrow={eyebrow} heading={heading} body={body} headingId={headingId} onBand={onBand} />
          <Carousel perView={perView} label={typeof heading === 'string' ? heading : 'Items'}>
            {items.map((item) => (
              <ItemCard key={item.title} item={item} onBand={onBand} />
            ))}
          </Carousel>
        </div>
      </Container>
    </Section>
  );
}

/** PATTERN: roofing-service — tabbed grid, dark (539). Measured: exactly 2 tabs. */
export function TabbedGrid({
  tone = 'band',
  eyebrow,
  heading,
  groups,
  columns = 3,
  id,
  headingId,
}: {
  tone?: SectionTone;
  eyebrow?: ReactNode;
  heading: ReactNode;
  groups: readonly { label: string; items: readonly GridItem[] }[];
  columns?: 2 | 3 | 4;
  id?: string;
  headingId?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section tone={tone} id={id} aria-labelledby={headingId}>
      <Container>
        <div className="flex flex-col gap-11">
          <SectionHead eyebrow={eyebrow} heading={heading} headingId={headingId} onBand={onBand} />
          <Tabs
            items={groups.map((g) => ({
              label: g.label,
              panel: (
                <ul className={`grid gap-9 ${colsFor(columns)}`}>
                  {g.items.map((item) => (
                    <li key={item.title} className="h-full">
                      <ItemCard item={item} onBand={onBand} />
                    </li>
                  ))}
                </ul>
              ),
            }))}
          />
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ PROSE */

/**
 * PATTERN: blankpage — generic content column (5114 @1440 / 10491 @390).
 * The degenerate class: HEADER > blankpage > FOOTER, no shared tail.
 * Token utilities rather than a prose plugin, so system compliance stays
 * mechanically checkable.
 */
export function ContentColumn({
  title,
  intro,
  children,
  headingId = 'page-heading',
}: {
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  headingId?: string;
}) {
  return (
    <Section tone="page" aria-labelledby={headingId}>
      <Container>
        <div className="mx-auto flex max-w-prose flex-col gap-9">
          <Heading level={2} as={1} id={headingId}>
            {title}
          </Heading>
          {intro ? <Lead className="text-ink-muted">{intro}</Lead> : null}
          <div className="flex flex-col gap-9">{children}</div>
        </div>
      </Container>
    </Section>
  );
}

/** A single titled block inside a ContentColumn. */
export function ProseBlock({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      {title ? <Heading level={3}>{title}</Heading> : null}
      <Prose className="text-ink-muted">{children}</Prose>
    </section>
  );
}
