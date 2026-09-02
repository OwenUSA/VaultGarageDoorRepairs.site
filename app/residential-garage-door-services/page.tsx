import type { Metadata } from 'next';
import {
  ButtonLink,
  Card,
  Carousel,
  Container,
  Eyebrow,
  Heading,
  JsonLd,
  Placeholder,
  Prose,
  Section,
  TextLink,
} from '@/components/ui';
import { SharedTail } from '@/components/patterns';
import { breadcrumbSchema } from '@/lib/schema';
import { hours, services } from '@/lib/site';

/**
 * ROUTE   /residential-garage-door-services
 * MODE    CLONE
 * CLASS   service-outer   (convergence exemplar for all six members)
 * SOURCE  /residential-roofing-services
 *
 * MEASURED TARGET SEQUENCE  (section height, per breakpoint 390/640/768/1024/1440)
 *   serviceouter-one    1113 / 874 / 837 /  510 / 593    pad 50 below xl, 75 at xl
 *   [logos              CONFIG FORBIDDEN — removed, not a divergence]
 *   serviceouter-two    3101 / 3073 / 815 / 767 / 818
 *   serviceouter-three   589 / 490 / 486 / 475 / 600
 *   template-ascend     1594 / 1326 / 986 / 919 / 852
 *   > SHARED TAIL (map-sec + contact-new, lead-owned)
 *
 * WHY THIS PAGE COMPOSES INLINE RATHER THAN CALLING Hero/CardCarousel/
 * SplitFeature/CardGrid: the target drops its section rhythm from 75 to 50
 * below 1440 and drops its display size from 42 to 32 below 1440. Neither
 * `Section`'s `rhythm` prop nor `Heading`'s level is reachable through those
 * pattern wrappers, and the wrappers are lead-owned. The class skeleton
 * therefore lives here, built only from `components/ui/*` primitives, and the
 * five sibling members bind to it by swapping copy.
 *
 * GATE RULING — opener repair has no route of its own. It is folded into this
 * page and stays reachable at `#opener-repair`, which `lib/site.ts` links to.
 *
 * COPY_MODE = ORIGINAL. Every row of CONFIG FORBIDDEN (CLAUDE.md) is observed
 * throughout: none of those claims appears in copy, alt text, schema or meta.
 */
export const metadata: Metadata = {
  title: 'Residential Garage Door Services',
  description: `Spring repair, opener repair and installation, off-track and cable repair, panel replacement, new door installation and routine tune-ups for homes. ${hours.response}.`,
  alternates: { canonical: '/residential-garage-door-services' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Residential Services', path: '/residential-garage-door-services' },
];

/** serviceouter-two — one slide per CONFIG FACTS service. Titles from lib/site.ts. */
const slideCopy: Record<string, string> = {
  'spring-repair':
    'A broken torsion or extension spring takes the counterweight out of the door, which is why a door that weighed nothing yesterday will not move today. We match wire gauge, inside diameter and wind to the door, replace in pairs, then re-balance by hand.',
  'opener-repair':
    'An opener that hums without lifting, reverses halfway or ignores the remote is reporting a specific fault, not failing outright. We test the drive, the travel and force limits, the sensors and the board in that order, then repair or replace on the result.',
  'off-track-cable-repair':
    'A door that has jumped its track or shed a cable is under load in a way it was never meant to be. We secure it, release the tension safely, straighten or replace the track, re-seat the rollers and re-spool both cables to equal length.',
  'panel-replacement':
    'A single dented, split or rusted panel does not mean the whole door has to go. We identify the section, the gauge and the stile pattern, swap that panel and re-hang the hinges and rollers around it, or say plainly when the run is discontinued.',
  'new-door-installation':
    'A new door is a structural fit before it is a finish choice. We measure the opening, the headroom, the backroom and the side clearance, set the door plumb, spring it to its actual weight and run a full cycle. The old door is taken away the same visit.',
  'maintenance-tune-up':
    'Most of the failures we are called out to announce themselves months earlier as a noise or a shudder. A tune-up puts numbers on that: rollers, hinges, bearings and cables inspected, fixings re-torqued, the door re-balanced, the safety reversal tested.',
};

const relatedLinks = [
  {
    title: 'Residential Garage Doors',
    body: 'The door styles, panel builds and insulation options we fit on domestic openings, and how each one behaves through a winter and a hot summer.',
    href: '/residential-garage-doors',
  },
  {
    title: 'Emergency Garage Door Repair',
    body: `A door stuck open, off its track or refusing to lock, handled outside office hours. ${hours.emergency}.`,
    href: '/emergency-garage-door-repair',
  },
  {
    title: 'Commercial Garage Door Services',
    body: 'The same work on doors that cycle all day at a unit, yard or loading bay, where downtime costs more than the repair does.',
    href: '/commercial-garage-door-services',
  },
  {
    title: 'Service Areas',
    body: 'The neighbourhoods we cover. We work on site and carry the common parts with us, so there is no showroom to visit.',
    href: '/service-areas',
  },
  {
    title: 'Questions Before Booking',
    body: 'How dispatch works, what we can tell from a phone description of the noise, and what we bring to a first visit.',
    href: '/faqs',
  },
  {
    title: 'Book A Visit',
    body: `Send the details of the door and the way it is failing and we will find the earliest slot. ${hours.office}.`,
    href: '/contact',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      {/* ─────────────────────────────────── serviceouter-one
          Target: media column left, copy column right, 336 / 100 / 684 at
          1440; stacked below 1024 with a 40 gap. The media box is a fixed
          height in the target, so it is expressed here as a per-breakpoint
          aspect ratio (no px literal) rather than one ratio that drifts. */}
      <Section
        tone="band"
        rhythm="tight"
        className="xl:py-section-y"
        id="sec-one"
        aria-labelledby="sec-one-heading"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_2fr] lg:gap-10 xl:gap-13">
            <div className="relative w-full aspect-[360/417] sm:aspect-[610/324] md:aspect-[720/342] lg:aspect-[297/410] xl:aspect-[336/443]">
              <Placeholder
                kind="portrait card"
                tone="band-deep"
                fill
                label="Residential garage door on a driveway, placeholder"
              />
            </div>

            <div className="flex flex-col gap-6">
              <Heading level={2} as={1} id="sec-one-heading">
                Garage Door Repair, Openers And New Door Installation For Homes
              </Heading>
              <Prose className="text-on-band-muted">
                A house door is used more than the front door and is the only moving part of the
                building carrying its own weight on a spring. When it fails it usually stops being
                safe before it stops being usable.
              </Prose>
              <Prose className="text-on-band-muted">
                We work on the whole assembly rather than the symptom: springs, the opener and its
                safety circuit, tracks, rollers and cables, panels, replacement doors, and routine
                servicing.
              </Prose>
              <Prose className="text-on-band-muted">
                Every visit is a service call to your address, because there is no showroom to come
                to. Tell us what the door is doing and we can usually narrow it to one or two causes
                first. {hours.response}, and{' '}
                <TextLink href="/emergency-garage-door-repair">emergency cover</TextLink> runs
                outside office hours.
              </Prose>
              <div className="flex flex-wrap gap-5 pt-5">
                <ButtonLink variant="primary" href="/contact">
                  Book a visit
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────── serviceouter-two
          Target: centred h2, 15 gap, then a carousel region of 616 at 1440
          showing four slides of 576. Slide = media, title, body, per-slide CTA. */}
      <Section
        tone="page"
        rhythm="tight"
        className="xl:py-section-y"
        id="sec-two"
        aria-labelledby="services"
      >
        <Container>
          <div className="flex flex-col gap-5">
            <Heading level={2} id="services" className="text-center text-ink">
              Our Residential Garage Door Services
            </Heading>
            <Carousel perView={{ base: 1, md: 2, lg: 4 }} label="Residential garage door services">
              {services.map((s) => (
                <Card
                  key={s.slug}
                  variant="signature"
                  className="flex h-full flex-col overflow-hidden"
                >
                  <div className="relative w-full aspect-[4/3] md:aspect-[352/322] lg:aspect-[4/3] xl:aspect-[269/246]">
                    <Placeholder
                      kind="4:3 card"
                      tone="surface"
                      fill
                      label={`${s.title} placeholder`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <Heading level={4} as={3} className="text-ink">
                      {s.title}
                    </Heading>
                    <Prose className="flex-1 text-ink-muted">{slideCopy[s.slug]}</Prose>
                    <ButtonLink variant="inverse" href={s.href} className="self-start">
                      See this service
                    </ButtonLink>
                  </div>
                </Card>
              ))}
            </Carousel>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────── serviceouter-three
          Target: a 672-wide inset panel on a dark band — brand lockup, then a
          three-line h2 and two paragraphs. The lockup is a brand mark, so it is
          a PLACEHOLDER under COPY_MODE = ORIGINAL and excluded from measurement.
          This block also carries the folded opener-repair anchor. */}
      <Section
        tone="band"
        rhythm="tight"
        className="xl:py-section-y"
        id="opener-repair"
        aria-labelledby="opener-repair-heading"
      >
        <Container>
          <div className="rounded-lg bg-band-deep p-5 lg:w-3/4 xl:w-3/5">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[356/58] w-3/5">
                <Placeholder kind="logo lockup" tone="band" fill label="Brand lockup placeholder" />
              </div>
              <Heading level={2} id="opener-repair-heading">
                Opener Repair And Installation, Done From The Fault Rather Than The Symptom
              </Heading>
              <Prose className="text-on-band-muted">
                An opener that hums without lifting, reverses halfway, runs on the wall control but
                not the remote, or closes and immediately re-opens is describing a fault that has a
                short list of causes. We test the drive, the travel and force limits, the safety
                sensor alignment and the logic board before deciding whether the unit is worth
                repairing, because replacing a working motor over a misaligned sensor is a waste of
                a visit.
              </Prose>
              <Prose className="text-on-band-muted">
                Chain, belt and screw drives are all handled, along with remotes, keypads and wall
                controls. Where a new opener is the right answer we fit it, set the travel and force
                against the actual door, and test the safety reversal before we leave.
              </Prose>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────── template-ascend
          Target: an inset panel, label + title header, then a two-column grid
          of flush link rows. The target's "Show 14 More" XHR is not reproduced
          — our build has no post archive — so the row height carries that
          space instead of a dead control. */}
      <Section tone="page" rhythm="tight" id="sec-ascend" aria-labelledby="related">
        <Container>
          <div className="rounded-sm bg-elevated p-10 shadow-card">
            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-2">
                <Eyebrow className="text-accent">Keep reading</Eyebrow>
                <Heading level={2} id="related" className="text-ink">
                  Where To Go Next
                </Heading>
              </div>
              <ul className="grid gap-y-2 md:grid-cols-2 md:gap-y-8">
                {relatedLinks.map((item) => (
                  <li key={item.title}>
                    <TextLink
                      href={item.href}
                      className="flex h-full items-start gap-6 py-10 no-underline md:py-11"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 block h-7 w-7 shrink-0 rounded-xs bg-surface"
                      />
                      <span className="flex flex-col gap-2">
                        <span className="block font-display text-sm font-bold uppercase leading-display text-ink">
                          {item.title}
                        </span>
                        <span className="block font-body text-xs font-medium leading-body text-ink-muted">
                          {item.body}
                        </span>
                      </span>
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <SharedTail />
    </>
  );
}
