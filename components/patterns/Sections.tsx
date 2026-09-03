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
  type ArtKind,
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
      {actions.map((a) => (
        <ButtonLink
          key={a.href + a.label}
          href={a.href}
          /* The variant is chosen by WHAT THE ACTION IS, never by its position
             in the list: a `tel:` action is the filled chromatic CTA and every
             other action is filled neutral. This is the one-filled-chromatic-
             action rule from components/ui/Button.tsx, encoded so a section
             cannot opt out of it. Ordering the CTA first is still right, but it
             is a layout decision, not a colour one. */
          variant={a.href.startsWith('tel:') ? 'call' : onBand ? 'solid-band' : 'solid'}
        >
          {a.label}
        </ButtonLink>
      ))}
    </div>
  );
}

/**
 * The reference draws its check bullets as a filled disc with the tick knocked
 * out of it, never as a bare glyph — and it has to: an amber tick on white is
 * 1.5:1, so the mark is carried by the disc, not by the tick. On a light band
 * the disc is the brand navy; on a dark one it is the amber.
 */
function Bullets({
  items,
  onBand,
  single = false,
}: {
  items?: readonly string[];
  onBand: boolean;
  /** true where the list already sits in one half of a split. */
  single?: boolean;
}) {
  if (!items?.length) return null;
  return (
    <ul className={`grid gap-5 ${single ? '' : 'sm:grid-cols-2'}`}>
      {items.map((b) => (
        <li key={b} className="flex items-start gap-5">
          <span
            aria-hidden="true"
            className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-circle ${
              onBand ? 'bg-cta text-cta-ink' : 'bg-accent text-ink-on-band'
            }`}
          >
            <Icon icon={Check} size="sm" />
          </span>
          <span className="font-body text-xs font-medium leading-body">{b}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The two-tone rule under a centred section heading — amber then navy, the
 * reference's signature divider. Only under CENTRED heads: left-aligned bands
 * in the reference carry no rule, and adding one there turns a deliberate
 * distinction between band types into noise.
 */
function HeadRule({ onBand }: { onBand: boolean }) {
  return (
    <span aria-hidden="true" className="flex h-1 w-24">
      <span className="h-full flex-1 bg-cta" />
      <span className={`h-full flex-1 ${onBand ? 'bg-ink-on-band' : 'bg-accent'}`} />
    </span>
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
    <div
      className={`flex flex-col gap-5 ${
        center ? 'mx-auto max-w-[70ch] items-center text-center' : 'max-w-prose'
      }`}
    >
      {eyebrow ? <Eyebrow className={onBand ? 'text-cta' : 'text-accent'}>{eyebrow}</Eyebrow> : null}
      {heading ? (
        <Heading level={2} id={headingId}>
          {heading}
        </Heading>
      ) : null}
      {center ? <HeadRule onBand={onBand} /> : null}
      {body ? <Prose className={onBand ? 'text-ink-on-band-muted' : 'text-ink-muted'}>{body}</Prose> : null}
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
  art,
  id,
  section,
  className,
  headingId,
  splitAt = 'lg',
  children,
  src,
  srcMobile,
  bgSrc,
  bgSrcMobile,
  gallery,
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
  /** Which scene the media slot draws. See components/ui/ArtPanel. */
  art?: ArtKind;
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  /** Per-band padding override where the reference band's own value differs. */
  className?: string;
  headingId?: string;
  splitAt?: SplitAt;
  children?: ReactNode;
  /** Real photograph for the media slot. One-line swap over the drawn scene. */
  src?: string;
  srcMobile?: string;
  /** Real photograph for the band's own full-bleed background. */
  bgSrc?: string;
  bgSrcMobile?: string;
  /** A row of small real-photo thumbnails rendered below the copy. */
  gallery?: readonly { src: string; srcMobile?: string; alt?: string }[];
}) {
  const onBand = isBand(tone);
  const cols = splitAt === 'xl' ? 'xl:grid-cols-2' : 'lg:grid-cols-2';
  const first = splitAt === 'xl' ? 'xl:order-1' : 'lg:order-1';
  const second = splitAt === 'xl' ? 'xl:order-2' : 'lg:order-2';
  return (
    <Section
      tone={tone}
      id={id}
      data-section={section}
      className={className}
      aria-labelledby={headingId}
      bgSrc={bgSrc}
      bgSrcMobile={bgSrcMobile}
    >
      <Container>
        {/* A `media="none"` band still has to fill the row. Left as a single
            column inside a two-column grid it painted half the band empty on
            three home bands — the reference's own no-photo band (storm damage)
            puts its bullet list in the second column instead, and so does this. */}
        <div className={`grid items-center gap-11 ${media === 'none' && !bullets?.length ? '' : cols}`}>
          {media !== 'none' ? (
            <Reveal className={reverse ? second : first}>
              <Placeholder
                kind={media}
                art={art}
                tone={onBand ? 'band-deep' : 'surface'}
                label={mediaLabel ?? 'Garage door placeholder'}
                src={src}
                srcMobile={srcMobile}
              />
            </Reveal>
          ) : null}
          <Reveal className={media === 'none' ? '' : reverse ? first : second}>
            <div className="flex flex-col gap-7">
              <SectionHead eyebrow={eyebrow} heading={heading} body={body} headingId={headingId} onBand={onBand} />
              {media === 'none' ? null : <Bullets items={bullets} onBand={onBand} />}
              {children}
              {gallery?.length ? (
                <ul className="grid grid-cols-4 gap-3">
                  {gallery.map((g) => (
                    <li key={g.src} className="aspect-[8/5] overflow-hidden rounded-lg">
                      <picture>
                        {g.srcMobile ? <source media="(max-width: 767px)" srcSet={g.srcMobile} /> : null}
                        <img
                          src={g.src}
                          alt={g.alt ?? ''}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </picture>
                    </li>
                  ))}
                </ul>
              ) : null}
              <Actions actions={actions} onBand={onBand} />
            </div>
          </Reveal>
          {media === 'none' && bullets?.length ? (
            <Reveal>
              <Bullets items={bullets} onBand={onBand} single />
            </Reveal>
          ) : null}
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
  art = 'van',
  id,
  section,
  className,
  headingId,
  src,
  srcMobile,
  cornerSrc,
}: {
  tone?: SectionTone;
  layout?: 'between' | 'center';
  eyebrow?: ReactNode;
  heading: ReactNode;
  body?: ReactNode;
  actions?: readonly PatternAction[];
  /** The scene behind the card. See components/ui/ArtPanel. */
  art?: ArtKind;
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  /** Per-band padding override where the reference band's own value differs. */
  className?: string;
  headingId?: string;
  /** Real photograph for the card's backdrop. One-line swap over the drawn scene. */
  src?: string;
  srcMobile?: string;
  /** A small real-photo (e.g. the service vehicle) shown in the card's corner. */
  cornerSrc?: string;
}) {
  return (
    <Section tone={tone} id={id} data-section={section} className={className} aria-labelledby={headingId}>
      <Container>
        <Reveal>
          {/* The reference's waterproofing band is a CARD inside the section,
              not the section itself: a drawn scene bleeding out of the right
              edge with the copy sitting on a navy wash over the left of it.
              The wash is `overlay-strong` and covers the whole card rather than
              half, because a gradient that fades to nothing puts the last line
              of body copy on bare artwork at exactly the width where the split
              lands. */}
          <div className="relative overflow-hidden rounded-xl">
            <div aria-hidden="true" className="absolute inset-0">
              <Placeholder kind="full-bleed band" tone="band-deep" fill art={art} label="" src={src} srcMobile={srcMobile} />
              <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-90" />
            </div>
            <div
              className={`relative p-9 xl:p-12 ${
                layout === 'center'
                  ? 'flex flex-col items-center gap-7'
                  : 'flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between'
              }`}
            >
              <SectionHead
                eyebrow={eyebrow}
                heading={heading}
                body={body}
                headingId={headingId}
                onBand
                center={layout === 'center'}
              />
              <div className="shrink-0 flex flex-col items-start gap-5">
                <Actions actions={actions} onBand />
                {cornerSrc ? (
                  <img
                    src={cornerSrc}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="hidden h-16 w-40 rounded-lg object-cover sm:block"
                  />
                ) : null}
              </div>
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
  section,
  className,
  headingId,
}: {
  tone?: SectionTone;
  eyebrow?: ReactNode;
  heading: ReactNode;
  body?: ReactNode;
  headingLevel?: 1 | 2;
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  /** Per-band padding override where the reference band's own value differs. */
  className?: string;
  headingId?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section tone={tone} rhythm="tight" id={id} data-section={section} className={className} aria-labelledby={headingId}>
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-prose flex-col items-center gap-5 text-center">
            {eyebrow ? <Eyebrow className={onBand ? 'text-ink-on-band' : 'text-accent'}>{eyebrow}</Eyebrow> : null}
            <Heading level={2} as={headingLevel} id={headingId}>
              {heading}
            </Heading>
            {body ? <Lead className={onBand ? 'text-ink-on-band-muted' : 'text-ink-muted'}>{body}</Lead> : null}
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
export function Marquee({ items, section }: { items: readonly string[]; section?: string }) {
  /* The reference alternates SOLID and OUTLINED words along the ticker and
     separates them with an amber chevron. The outline is decoration on a word
     that is also present in solid form elsewhere in the run, so the reduced
     legibility of stroked type is not carrying any information on its own. */
  const run = (dup: boolean) =>
    items.map((item, i) => (
      <span
        key={`${dup ? 'b' : 'a'}-${item}`}
        aria-hidden={dup ? 'true' : undefined}
        className="flex shrink-0 items-center gap-11"
      >
        <span
          className={`whitespace-nowrap font-display text-3xl font-bold uppercase leading-display ${
            i % 2 === 0
              ? 'text-accent'
              : 'text-transparent [-webkit-text-stroke:1.5px_var(--color-accent)]'
          }`}
        >
          {item}
        </span>
        {/* A drawn chevron, not the &#10148; glyph. As text the amber separator
            scored 1.43:1 against this light band on all 20 of its instances —
            `contrast.mjs` rightly scores a character as text no matter how
            decorative it is. Drawn, it is a graphic with a navy edge that
            carries the contrast, and it keeps the reference's amber. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0"
          fill="var(--color-amber)"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinejoin="round"
        >
          <path d="M5 3 L20 12 L5 21 Z" />
        </svg>
      </span>
    ));

  return (
    <section
      data-section={section}
      aria-label="Service highlights"
      className="overflow-hidden border-y-4 border-cta bg-surface py-5"
    >
      <div className="flex w-max animate-marquee gap-11 motion-reduce:animate-none">
        {run(false)}
        {run(true)}
      </div>
    </section>
  );
}

/** PATTERN: breadcrumb — thin band (232 @1440 / 282 @390) */
export function Breadcrumb({
  trail,
  section,
  bgSrc,
  bgSrcMobile,
  vehicleSrc,
}: {
  trail: readonly { label: string; path: string }[];
  section?: string;
  /** Real photograph for the band's own full-bleed background. */
  bgSrc?: string;
  bgSrcMobile?: string;
  /** A small real photograph (the service vehicle) shown at the row's end. */
  vehicleSrc?: string;
}) {
  return (
    /* Measured: the reference breadcrumb band pads 20/20, not the 50 the
       `tight` rhythm gives. */
    <Section
      tone="surface"
      rhythm="none"
      data-section={section}
      className="py-7"
      bgSrc={bgSrc}
      bgSrcMobile={bgSrcMobile}
    >
      <Container>
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-7">
          <ol className="flex flex-wrap items-center gap-3">
            {trail.map((t, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={t.path} className="flex items-center gap-3">
                  {last ? (
                    <span aria-current="page" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center font-display text-xs font-bold uppercase leading-display">
                      {t.label}
                    </span>
                  ) : (
                    <Link
                      href={t.path}
                      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center font-display text-xs font-regular uppercase leading-display text-ink-muted transition-colors duration-[var(--duration-fast)] ease-standard hover:text-accent"
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
          {vehicleSrc ? (
            <img
              src={vehicleSrc}
              alt=""
              loading="lazy"
              decoding="async"
              className="hidden h-16 w-36 shrink-0 rounded-lg object-cover sm:block"
            />
          ) : null}
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
  section,
  className,
  headingId,
  bgSrc,
  bgSrcMobile,
  panelSrcs,
}: {
  tone?: SectionTone;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  steps: readonly Step[];
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  /** Per-band padding override where the reference band's own value differs. */
  className?: string;
  headingId?: string;
  /** Real photograph for the band's own full-bleed background. */
  bgSrc?: string;
  bgSrcMobile?: string;
  /** Up to two small real-photo accents shown beside the heading. */
  panelSrcs?: readonly string[];
}) {
  const onBand = isBand(tone);
  return (
    <Section
      tone={tone}
      id={id}
      data-section={section}
      className={className}
      aria-labelledby={headingId}
      bgSrc={bgSrc}
      bgSrcMobile={bgSrcMobile}
    >
      <Container>
        <div className="flex flex-col gap-11">
          <SectionHead eyebrow={eyebrow} heading={heading} headingId={headingId} onBand={onBand} center />
          {panelSrcs?.length ? (
            <div className="mx-auto flex gap-3">
              {panelSrcs.map((p) => (
                <img
                  key={p}
                  src={p}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-24 w-40 rounded-lg object-cover"
                />
              ))}
            </div>
          ) : null}
          {/* The reference's zigzag: a dashed spine with the step cards
              alternating above and below it. The spine and the offsets only
              exist from xl — below that the steps stack and a horizontal spine
              would be drawing a line through nothing. */}
          <div className="relative">
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 top-1/2 hidden border-t-2 border-dashed xl:block ${
                onBand ? 'border-border-on-band' : 'border-border-strong'
              }`}
            />
            <ol className="grid gap-9 sm:grid-cols-2 xl:grid-cols-4">
              {steps.map((s, i) => {
                const above = i % 2 === 0;
                return (
                  <li key={s.title} className={above ? 'xl:pb-32' : 'xl:pt-32'}>
                    <Reveal>
                      <div
                        className={`relative flex h-full flex-col gap-3 border-2 border-cta p-7 ${
                          onBand ? 'bg-band-deep' : 'bg-surface'
                        }`}
                      >
                        <span className="font-display text-xl font-bold uppercase leading-display text-accent">
                          Step {i + 1}
                        </span>
                        <Heading level={4} as={3}>
                          {s.title}
                        </Heading>
                        <Prose className={onBand ? 'text-ink-on-band-muted' : 'text-ink-muted'}>
                          {s.body}
                        </Prose>
                        {/* the tick down to (or up from) the spine */}
                        <span
                          aria-hidden="true"
                          className={`absolute left-1/2 hidden h-16 w-0.5 -translate-x-1/2 bg-cta xl:block ${
                            above ? 'top-full' : 'bottom-full'
                          }`}
                        />
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
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
  section,
  className,
  headingId,
}: {
  tone?: SectionTone;
  heading?: ReactNode;
  facts: readonly Fact[];
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  /** Per-band padding override where the reference band's own value differs. */
  className?: string;
  headingId?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section tone={tone} id={id} data-section={section} className={className} aria-labelledby={headingId}>
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-9">
            {heading ? (
              <Heading level={2} id={headingId} className="text-center">
                {heading}
              </Heading>
            ) : null}
            {/* The reference's stat tiles: a navy chip carrying the value, with
                the amber sitting behind it as a hard offset rather than a blur,
                and the label below the tile in the page ink. The counters that
                animate in the reference are gone for good — every number they
                count to is a business fact nobody has supplied (see the header
                comment). */}
            <dl className="grid w-full gap-9 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map((f) => (
                /* dt BEFORE dd in the markup, because a description list is
                   only valid that way, and `flex-col-reverse` to put the tile
                   on top where the reference has it. Reordering the DOM to get
                   the visual order would make the list invalid to a screen
                   reader for the sake of a layout that CSS already handles. */
                <div
                  key={f.label}
                  className="flex flex-col-reverse items-center gap-5 text-center"
                >
                  <dt
                    className={`font-display text-sm font-bold uppercase leading-display tracking-tracked ${
                      onBand ? 'text-ink-on-band' : 'text-ink'
                    }`}
                  >
                    {f.label}
                  </dt>
                  <dd className="m-0 flex min-h-[92px] w-full max-w-[260px] items-center justify-center rounded-xl bg-accent px-5 py-5 shadow-[6px_6px_0_var(--color-amber)]">
                    <span className="font-display text-2xl font-bold leading-display text-ink-on-band">
                      {f.value}
                    </span>
                  </dd>
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
  /** Which scene the card's media slot draws. See components/ui/ArtPanel. */
  art?: ArtKind;
  /** Real photograph for the card's media slot. One-line swap over the drawn scene. */
  src?: string;
  srcMobile?: string;
};

function ItemCard({ item, onBand }: { item: GridItem; onBand: boolean }) {
  const inner = (
    /* The amber top edge is what makes a plain white card read as part of this
       site rather than as a default card. It is a border rather than a bar so
       it cannot fall out of alignment with the card's own corner radius. */
    <Card
      variant="signature"
      className="flex h-full flex-col overflow-hidden border-t-4 border-cta"
    >
      {item.media && item.media !== 'none' ? (
        <Placeholder
          kind={item.media}
          art={item.art}
          tone={onBand ? 'band-deep' : 'surface'}
          className="rounded-none"
          label={item.mediaLabel ?? `${item.title} placeholder`}
          src={item.src}
          srcMobile={item.srcMobile}
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-7">
        <Heading level={4} as={3} className="text-accent">
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
    <Link href={item.href} className="block h-full transition-transform duration-[var(--duration-base)] ease-standard hover:-translate-y-1">
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
  center = false,
  id,
  section,
  className,
  headingId,
  bgSrc,
  bgSrcMobile,
}: {
  tone?: SectionTone;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  body?: ReactNode;
  items: readonly GridItem[];
  columns?: 2 | 3 | 4;
  /** Where the grid starts splitting. See `colsFor`. */
  stackUntil?: 'sm' | 'lg';
  /** Centre the head and give it the two-tone rule, as the reference does on
      its grid bands but not on its split bands. */
  center?: boolean;
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  /** Per-band padding override where the reference band's own value differs. */
  className?: string;
  headingId?: string;
  /** Real photograph for the band's own full-bleed background. */
  bgSrc?: string;
  bgSrcMobile?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section
      tone={tone}
      id={id}
      data-section={section}
      className={className}
      aria-labelledby={headingId}
      bgSrc={bgSrc}
      bgSrcMobile={bgSrcMobile}
    >
      <Container>
        <div className="flex flex-col gap-11">
          <SectionHead
            eyebrow={eyebrow}
            heading={heading}
            body={body}
            headingId={headingId}
            onBand={onBand}
            center={center}
          />
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
  center = false,
  id,
  section,
  className,
  headingId,
  bgSrc,
  bgSrcMobile,
}: {
  tone?: SectionTone;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  body?: ReactNode;
  items: readonly GridItem[];
  perView?: { base: 1 | 2 | 3 | 4; md?: 1 | 2 | 3 | 4; lg?: 1 | 2 | 3 | 4 };
  /** Centre the head and give it the two-tone rule. */
  center?: boolean;
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  /** Per-band padding override where the reference band's own value differs. */
  className?: string;
  headingId?: string;
  /** Real photograph for the band's own full-bleed background. */
  bgSrc?: string;
  bgSrcMobile?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section
      tone={tone}
      id={id}
      data-section={section}
      className={className}
      aria-labelledby={headingId}
      bgSrc={bgSrc}
      bgSrcMobile={bgSrcMobile}
    >
      <Container>
        <div className="flex flex-col gap-11">
          <SectionHead
            eyebrow={eyebrow}
            heading={heading}
            body={body}
            headingId={headingId}
            onBand={onBand}
            center={center}
          />
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
  section,
  className,
  headingId,
}: {
  tone?: SectionTone;
  eyebrow?: ReactNode;
  heading: ReactNode;
  groups: readonly { label: string; items: readonly GridItem[] }[];
  columns?: 2 | 3 | 4;
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  /** Per-band padding override where the reference band's own value differs. */
  className?: string;
  headingId?: string;
}) {
  const onBand = isBand(tone);
  return (
    <Section tone={tone} id={id} data-section={section} className={className} aria-labelledby={headingId}>
      <Container>
        {/* The reference's services band puts the heading and the tab switch in
            a narrow left rail with the panel filling the rest of the row, rather
            than stacking a heading over a full-width tab strip. At 1024 and
            below the rail sits above the panel and the tabs go horizontal —
            a vertical tab list in a 360px column is a column of full-width
            buttons pretending to be a rail. */}
        <div className="grid gap-11 xl:grid-cols-[minmax(0,320px)_1fr] xl:items-start">
          <div className="flex flex-col gap-7">
            <SectionHead eyebrow={eyebrow} heading={heading} headingId={headingId} onBand={onBand} />
          </div>
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
  section,
  className,
  headingId = 'page-heading',
}: {
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  /** Per-band padding override where the reference band's own value differs. */
  className?: string;
  headingId?: string;
}) {
  return (
    <Section tone="page" data-section={section} className={className} aria-labelledby={headingId}>
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
