import type { Metadata } from 'next';
import { Section, Placeholder, JsonLd } from '@/components/ui';
import {
  Hero,
  SplitFeature,
  CardGrid,
  ContactForm,
  SharedTail,
} from '@/components/patterns';
import { nap, hours, services } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

/**
 * ROUTE   /commercial-garage-door-services/inspection
 * MODE    CLONE
 * CLASS   service-inner
 * SOURCE  /commercial-roofing-services/commercial-roof-inspection
 * GATED   structural divergence <= 2% per section per breakpoint,
 *         BOX_TOLERANCE <= 6px or 2% of section height
 *
 * SECTION SEQUENCE — measured from the target exemplar
 * (/commercial-roofing-services/commercial-roof-repair, profiled at all five
 * breakpoints in .harness/out/profile.json), h@1440:
 *   serviceinner-one 680 · hero-new.inner-form 423 · serviceinner-two 523 ·
 *   serviceinner-three 492 (media right) · serviceinner-four 530 (media right) ·
 *   blogs-one 703 · template-ascend 852 · [SHARED TAIL] · FOOTER
 *
 * CONFIG FORBIDDEN — removed, never substituted, never a divergence:
 *   `logos` band (slot 3, h=306 @1440) — manufacturer partnerships / awards
 *   `testimonial` (slot 10, h=702 @1440) — removed inside SharedTail by lead
 *   the `wprevpro_badge` star-rating badge inside serviceinner-one — reviews
 *   the target's "50 years of combined experience" line in serviceinner-four —
 *   years-in-business claim; the paragraph slot survives, the claim does not.
 *   No compliance, certification or code-inspection claim is written anywhere
 *   on this page.
 *
 * INTENTIONAL DEVIATIONS (reported, not fixed):
 *   `blogs-one` has no blog behind it in our build. The slot is repurposed as
 *   a related-services CardGrid reading straight from lib/site.ts.
 *   `template-ascend`'s "Show N More" XHR is not reproduced (no post archive);
 *   it is a static two-column link grid.
 *   Breadcrumb is emitted as SCHEMA only — the target service-inner sequence
 *   carries no visible breadcrumb band, and adding one would insert a section.
 *
 * COPY_MODE = ORIGINAL — every headline and every line of body copy is written
 * for this business. Structure is cloned; words are not. Every CONFIG FACTS
 * value comes from lib/site.ts. All photography is a <Placeholder>.
 */

export const metadata: Metadata = {
  title: 'Commercial Garage Door Inspection',
  description:
    'A door-by-door inspection of overhead, rolling steel and sectional doors on commercial sites: springs, cables, tracks, openers, balance, travel and safety reversal. Same-day and emergency dispatch.',
  alternates: { canonical: '/commercial-garage-door-services/inspection' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Commercial Services', path: '/commercial-garage-door-services' },
  { label: 'Commercial Inspection', path: '/commercial-garage-door-services/inspection' },
];

/** serviceinner-one — capability statements only. Nothing from FORBIDDEN. */
const heroBullets = [
  'Overhead, rolling steel and sectional doors',
  'Dock doors, service yards and storefront openings',
  'Springs, cables, rollers, tracks and hinges',
  'Openers, drives, sensors and remotes',
  hours.emergency,
] as const;

/** serviceinner-two — what gets looked at, door by door. */
const inspectionChecks = [
  'Balance: does the door hold at half-height without the opener carrying it',
  'Springs and cables: wear, stretch, fraying and uneven tension',
  'Tracks and rollers: alignment, flat spots, loose or missing fixings',
  'Panels and hinges: cracking, distortion and stress around the hardware',
  'Opener travel and force: how hard the drive is working to move the door',
  'Safety reversal: does the door stop and back off when something is in the way',
] as const;

/** blogs-one, repurposed — the work an inspection actually leads to. */
const relatedServices = services.slice(0, 3).map((s) => ({
  title: s.title,
  body: s.summary,
  href: s.href,
  media: '16:9 media' as const,
  mediaLabel: `${s.title} placeholder`,
}));

/** template-ascend — static cross-link grid, no load-more XHR. */
const crossLinks = [
  {
    title: 'Commercial Garage Door Repair',
    body: 'Doors already down, off-track or refusing to seal, put back into service.',
    href: '/commercial-garage-door-services/repair',
    media: 'none' as const,
  },
  {
    title: 'Commercial Maintenance Program',
    body: 'Planned visits across a whole site so doors are serviced on a schedule instead of on failure.',
    href: '/commercial-garage-door-services/maintenance-program',
    media: 'none' as const,
  },
  {
    title: 'All Commercial Services',
    body: 'The full picture of what we cover for businesses with overhead and rolling doors.',
    href: '/commercial-garage-door-services',
    media: 'none' as const,
  },
  {
    title: 'Emergency Garage Door Repair',
    body: `${hours.response} when a door has stopped somewhere it cannot be left.`,
    href: '/emergency-garage-door-repair',
    media: 'none' as const,
  },
  {
    title: 'Service Areas',
    body: 'Where we travel for commercial call-outs and scheduled inspections.',
    href: '/service-areas',
    media: 'none' as const,
  },
  {
    title: 'Questions Before You Book',
    body: 'Hours, dispatch, what we handle and how quickly we can get to you.',
    href: '/faqs',
    media: 'none' as const,
  },
] as const;

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      {/* serviceinner-one — hero, dark, copy left / media right (measured x=160 / x=847) */}
      <Hero
        variant="page"
        eyebrow="Commercial"
        title="Commercial Garage Door Inspection"
        subtitle="A door-by-door look at every overhead, rolling steel and sectional door on your site: what is worn, what is drifting out of balance, and what will stop a vehicle if it is left alone."
        bullets={heroBullets}
        primaryCta={{ href: '/contact', label: 'Book an inspection' }}
        secondaryCta={{ href: nap.phoneHref, label: nap.phone }}
        mediaLabel="Commercial garage door inspection placeholder"
        aside={
          <Placeholder
            kind="square slot"
            tone="band-deep"
            label="Rolling steel door on a loading bay placeholder"
          />
        }
        id="inspection-hero"
      />

      {/* hero-new.inner-form — the compact form strip, dark */}
      <Section tone="band-deep" rhythm="none" id="request">
        <ContactForm variant="standalone" />
      </Section>

      {/* serviceinner-two — full-width copy + checklist, dark */}
      <SplitFeature
        tone="band"
        media="none"
        eyebrow="The walk-round"
        heading="What we check on every door"
        body="An inspection is a physical test, not a look from the floor. We run each door through its full travel, put a hand on the hardware and write down what we find so you have something to work from rather than a verbal impression."
        bullets={inspectionChecks}
        headingId="inspection-checks-heading"
        id="inspection-checks"
      />

      {/* serviceinner-three — split, copy left / media right (measured x=160 / x=728) */}
      <SplitFeature
        tone="page"
        reverse
        eyebrow="Why it matters"
        heading="Commercial doors wear on a different clock"
        body="A door on a loading bay can cycle more in a week than a home door does in a year. Springs reach the end of their working life sooner, cables stretch unevenly, and rollers flat-spot long before anything looks obviously wrong. By the time a door is visibly struggling, the part that failed usually took something else with it. Catching that on a scheduled visit is the difference between a planned repair and a bay standing empty."
        media="16:9 media"
        mediaLabel="Sectional door tracks and rollers placeholder"
        headingId="inspection-wear-heading"
        id="inspection-wear"
      />

      {/* serviceinner-four — split, dark, copy left / media right (measured x=160 / x=745) */}
      <SplitFeature
        tone="band-deep"
        reverse
        eyebrow="After the visit"
        heading="What you get at the end of it"
        body={`A plain list of what we found on each door, sorted into what needs doing now, what can wait for the next visit, and what is fine. Where a door needs work we say which of our services it falls under, so nothing on the list is a mystery line item. If a door is unsafe to keep running we will tell you on the spot rather than in a follow-up. ${hours.emergency}. ${hours.response}.`}
        media="4:3 card"
        mediaLabel="Technician testing door balance placeholder"
        actions={[
          { href: '/contact', label: 'Book an inspection' },
          { href: nap.phoneHref, label: nap.phone },
        ]}
        headingId="inspection-outcome-heading"
        id="inspection-outcome"
      />

      {/* blogs-one slot, REPURPOSED as a related-services grid — intentional deviation */}
      <CardGrid
        tone="page"
        eyebrow="Follow-on work"
        heading="Services an inspection leads to"
        body="Everything on an inspection list resolves into one of these. We do not carry work outside them."
        items={relatedServices}
        columns={3}
        headingId="inspection-services-heading"
        id="inspection-services"
      />

      {/* template-ascend — static link grid, no load-more XHR */}
      <CardGrid
        tone="surface"
        eyebrow="Featured in"
        heading="More on commercial doors"
        items={crossLinks}
        columns={2}
        headingId="inspection-more-heading"
        id="inspection-more"
      />

      <SharedTail />
    </>
  );
}
