import { Section, Placeholder, JsonLd } from '@/components/ui';
import {
  Hero,
  SplitFeature,
  CardGrid,
  ContactForm,
  SharedTail,
  type GridItem,
} from '@/components/patterns';
import { services, routes, hours, nap } from '@/lib/site';
import { serviceSchema, breadcrumbSchema } from '@/lib/schema';

/**
 * TEMPLATE CLASS  service-inner        MODE  CLONE
 * Canonical exemplar  /residential-roofing-material/asphalt-shingle-roof
 *
 * Measured section sequence @1440 (docs/02-template-classes.md,
 * .harness/out/profile.json):
 *
 *   serviceinner-one (680)          -> Hero variant="page"
 *   hero-new.inner-form (423)       -> Section + ContactForm
 *   serviceinner-two (523)          -> SplitFeature media="none", band
 *   serviceinner-three (492)        -> SplitFeature reverse
 *   serviceinner-four (530)         -> CtaBand
 *   blogs-one (724)                 -> CardGrid  [REPURPOSED, see below]
 *   template-ascend (852)           -> CardGrid  [static, no load-more]
 *   SHARED TAIL                     -> <SharedTail />
 *
 * INTENTIONAL STRUCTURAL DEVIATIONS — reported, never iterated on:
 *   - `logos` slot REMOVED. CONFIG FORBIDDEN: manufacturer authorizations,
 *     brand partnerships, awards.
 *   - `testimonial` REMOVED site-wide inside <SharedTail /> by the lead.
 *     CONFIG FORBIDDEN: reviews, testimonials, ratings.
 *   - the review strip inside serviceinner-one ("4.9 Stars - Based on N User
 *     Reviews") REMOVED. CONFIG FORBIDDEN: star ratings, review counts.
 *   - `blogs-one` REPURPOSED as a related-services grid. Our build has no blog
 *     archive, and inventing three articles to fill the slot is forbidden.
 *   - `template-ascend` "Show N More" XHR NOT reproduced — static link grid.
 *   - no visible breadcrumb band: the target's service-inner sequence has none.
 *     BreadcrumbList is emitted as JSON-LD only.
 *
 * Every business fact is read from lib/site.ts. No fact is restated as a
 * literal anywhere in this file or in the four route files that use it.
 */
export type ServiceInnerContent = {
  /** must match a `slug` in lib/site.ts services */
  slug: string;
  eyebrow: string;
  heroBullets: readonly string[];
  /** serviceinner-two — dark band, heading + lead + bullet list */
  two: { heading: string; body: string; bullets: readonly string[] };
  /** serviceinner-three — reversed split, heading + body + bullet list */
  three: { heading: string; body: string; bullets: readonly string[] };
  /** serviceinner-four — dark CTA band, heading + two paragraphs */
  four: { heading: string; body: string };
};

/* Short original blurbs for the internal-link grid. Copy is ours (COPY_MODE =
   ORIGINAL) and carries no claim from CONFIG FORBIDDEN. Keyed by route path so
   the grid stays in step with lib/site.ts. */
const ASCEND_BLURB: Record<string, string> = {
  '/emergency-garage-door-repair':
    'A door stuck open, hanging off its track, or dropped because a spring let go. Calls are picked up round the clock and a van is sent as soon as one is free.',
  '/residential-garage-door-services':
    'The full list of work we take on at houses, from a single worn roller through to a whole new door, with what each visit involves and how long it usually takes.',
  '/residential-garage-doors':
    'Door types, materials, insulation and hardware side by side, and what each one asks of you once it has been fitted and is in daily use.',
  '/residential-garage-door-services/maintenance-tune-up':
    'A scheduled look over the springs, cables, rollers, hinges and opener, with everything adjusted and lubricated before any of it has the chance to let go.',
  '/residential-garage-door-services/spring-repair':
    'Torsion and extension springs replaced in pairs so the door stays balanced on the shaft, then the opener re-set to the new weight it has to lift.',
  '/residential-garage-door-services/panel-replacement':
    'Damaged sections swapped out on the existing track rather than replacing the whole door, with the profile and colour matched to what is already there.',
  '/residential-garage-door-services/new-door-installation':
    'Measuring up, taking the old door out, and a full fit with tracks, springs and opener all set up together so the door runs right from the first cycle.',
  '/residential-garage-door-services/off-track-cable-repair':
    'Cables reseated and the door brought back square onto its track, then run end to end under power to confirm nothing else moved while it was off.',
  '/commercial-garage-door-services':
    'Rolling shutters, sectional doors and high-cycle openers kept moving on working premises, scheduled around the hours you actually need the bay clear.',
  '/commercial-garage-door-services/inspection':
    'A documented walk-through of every door on the site, with each fault written up and ranked so you can decide what gets done first and what can wait.',
  '/commercial-garage-door-services/repair':
    'Breakdown work on commercial doors, dispatched the same day wherever we can reach you, because a door that will not open usually stops everything else too.',
  '/commercial-garage-door-services/maintenance-program':
    'A repeating visit schedule so the doors on a busy site are looked at on a rhythm and seen well before one of them stops in the middle of a shift.',
  '/contact':
    'Send the details of the job through and we will call you back to fix a time that works, or ring straight through if the door has already failed.',
  '/service-areas':
    'Where our vans already go day to day, and how far out beyond that we will travel when a call comes in that nobody nearer can pick up.',
  '/faqs':
    'The questions we get asked most often about garage door work, answered plainly and without the jargon that usually comes attached to them.',
};
const OUTER = { path: '/residential-garage-door-services', label: 'Residential Services' };

export function ServiceInnerPage({ content }: { content: ServiceInnerContent }) {
  const service = services.find((s) => s.slug === content.slug);
  if (!service) throw new Error(`Unknown service slug: ${content.slug}`);

  /* blogs-one, repurposed: the three nearest sibling services. Three cards is
     the measured card count of the target grid (blogs-one, 3 posts @1440). */
  const related: GridItem[] = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3)
    .map((s) => ({ title: s.title, body: s.summary, href: s.href, media: '16:9 media' }));

  /* template-ascend, static: the internal link grid. Measured target grid is
     TWO columns of tall cards, six visible before the (unreproduced) "Show N
     More" control — 580x219 per card @1440. */
  const ascend: GridItem[] = routes
    .filter((r) => r.path !== service.href && r.path !== '/privacy-policy' && r.path !== '/')
    .slice(0, 6)
    .map((r) => ({
      title: r.label,
      body: ASCEND_BLURB[r.path] ??
        'Read through what the visit covers, what we check while we are there, and how to get one booked in.',
      href: r.path,
      media: 'none' as const,
    }));

  const trail = [
    { label: 'Home', path: '/' },
    { label: OUTER.label, path: OUTER.path },
    { label: service.title, path: service.href },
  ];

  return (
    <>
      <JsonLd data={serviceSchema(service.slug)} />
      <JsonLd data={breadcrumbSchema(trail)} />

      {/* serviceinner-one — hero, compact, dark. h 680 @1440 / 1347 @390 */}
      <Hero
        variant="page"
        id="overview"
        eyebrow={content.eyebrow}
        title={service.title}
        subtitle={service.summary}
        bullets={content.heroBullets}
        primaryCta={{ href: '#request', label: 'Request a visit' }}
        secondaryCta={{ href: nap.phoneHref, label: nap.phone }}
        mediaLabel={`${service.title} placeholder`}
        aside={
          <Placeholder
            kind="square slot"
            tone="band-deep"
            label={`${service.title} placeholder`}
          />
        }
      />

      {/* hero-new.inner-form — the compact form band. h 423 @1440.
          Measured target: ZERO section padding, one full-width card, no media
          slot beside the form. The only image in the target band is a brand
          lockup, which is a placeholder under COPY_MODE = ORIGINAL and is not
          reinstated. */}
      <Section tone="band-deep" rhythm="none" id="request">
        <ContactForm variant="standalone" />
      </Section>

      {/* serviceinner-two — dark, full-width copy + list. h 523 @1440 */}
      <SplitFeature
        tone="band"
        id="scope"
        headingId="scope-heading"
        media="none"
        eyebrow="What we cover"
        heading={content.two.heading}
        body={content.two.body}
        bullets={content.two.bullets}
      />

      {/* serviceinner-three — reversed split. h 492 @1440 */}
      <SplitFeature
        tone="page"
        reverse
        id="detail"
        headingId="detail-heading"
        heading={content.three.heading}
        body={content.three.body}
        media="16:9 media"
        mediaLabel={`${service.title} placeholder`}
      />

      {/* serviceinner-four — dark CTA band. h 530 @1440 */}
      <SplitFeature
        tone="band-deep"
        reverse
        id="book"
        headingId="book-heading"
        heading={content.four.heading}
        body={`${content.four.body} ${hours.emergency}. ${hours.response}.`}
        media="4:3 card"
        mediaLabel={`${service.title} placeholder`}
        actions={[
          { href: '#request', label: 'Request a visit' },
          { href: nap.phoneHref, label: nap.phone },
        ]}
      />

      {/* blogs-one — REPURPOSED as related services. h 724 @1440 */}
      <CardGrid
        tone="page"
        id="related"
        headingId="related-heading"
        eyebrow="More services"
        heading="Other Garage Door Services"
        body={`${nap.name} works on site across the whole service area, so a visit can cover more than one job at once.`}
        items={related}
        columns={3}
        /* Measured: blogs-one is 2247 @768 (stacked) and 652 @1024 (three-up). */
        stackUntil="lg"
      />

      {/* template-ascend — static internal link grid. h 852 @1440 */}
      <CardGrid
        tone="surface"
        id="explore"
        headingId="explore-heading"
        eyebrow="Keep reading"
        heading="Browse The Rest Of The Site"
        items={ascend}
        columns={2}
      />

      <SharedTail />
    </>
  );
}
