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
 * ROUTE   /commercial-garage-door-services
 * MODE    CLONE
 * CLASS   service-outer   — BOUND to the converged exemplar,
 *         app/residential-garage-door-services/page.tsx
 * SOURCE  /commercial-roofing-services
 *
 * BINDING NOTE: skeleton, section order, rhythm, grid ratios and the
 * per-breakpoint media aspect ratios are inherited VERBATIM. Copy volume
 * matched to the exemplar's line counts per breakpoint rather than re-tuning
 * the ratios: 3 hero paragraphs, 6 carousel cards, 2 panel paragraphs,
 * 6 ascend links.
 *
 * Card set is the six CONFIG FACTS services in a commercial framing. No
 * seventh service is invented to fill the grid.
 *
 * COPY_MODE = ORIGINAL. CONFIG FORBIDDEN observed in copy, alt text and meta.
 */
export const metadata: Metadata = {
  title: 'Commercial Garage Door Services',
  description: `Repair, installation and scheduled servicing for doors on units, yards and loading bays. ${hours.emergency}. ${hours.response}.`,
  alternates: { canonical: '/commercial-garage-door-services' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Commercial Services', path: '/commercial-garage-door-services' },
];

/** serviceouter-two — one slide per CONFIG FACTS service. Titles from lib/site.ts. */
const slideCopy: Record<string, string> = {
  'spring-repair':
    'Springs are rated in cycles, not years, so a bay door opening forty times a day ends a domestic-rated spring inside months. We size the replacement on the actual cycle count rather than door width, fit in pairs and re-balance before handover.',
  'opener-repair':
    'A commercial operator runs hot when sized for the wrong load, and keeps running until it stops for good. We test drive, travel and force limits, safety edges and sensors, then fit an operator matched to the door weight and its real duty.',
  'off-track-cable-repair':
    'On a busy opening a derailment is the third symptom, not the first. We take the door out of load, straighten or replace the track run, re-spool both cables to equal length, and trace what put it off — a seized roller, a strike, a slipped drum.',
  'panel-replacement':
    'Loading bay doors get hit. A struck section can often be swapped rather than losing the whole opening for a day, so we identify the gauge and stile pattern, change that section, and re-hang the hinges and rollers around it.',
  'new-door-installation':
    'When a door is past repair we measure the opening, headroom, backroom and side clearance, and set the replacement plumb and sprung to its real weight. Fitting is scheduled around your hours and the old door goes the same visit.',
  'maintenance-tune-up':
    'Almost everything we get called out to announced itself weeks earlier as a noise or a door that no longer holds halfway. Servicing puts that on a record: rollers, hinges, bearings and cables checked, fixings re-torqued, balance and reversal tested.',
};

const relatedLinks = [
  {
    title: 'Commercial Inspection',
    body: 'A door-by-door condition check across a site, written up so repairs can be planned around your operating hours rather than reacted to.',
    href: '/commercial-garage-door-services/inspection',
  },
  {
    title: 'Commercial Repair',
    body: 'Springs, cables, tracks, panels and operators on doors that cycle dozens of times a day, where downtime costs more than the repair.',
    href: '/commercial-garage-door-services/repair',
  },
  {
    title: 'Maintenance Program',
    body: 'Planned visits on a cadence you set, so wear is caught while the door is still running instead of after it has stopped.',
    href: '/commercial-garage-door-services/maintenance-program',
  },
  {
    title: 'Emergency Garage Door Repair',
    body: `A door down out of hours blocks the whole opening and everything behind it. ${hours.emergency}.`,
    href: '/emergency-garage-door-repair',
  },
  {
    title: 'Residential Garage Door Services',
    body: 'The same running gear on a domestic door at domestic duty cycles, with the parts and spring ratings that suit it.',
    href: '/residential-garage-door-services',
  },
  {
    title: 'Arrange A Site Visit',
    body: `Tell us how many doors you run and how hard they work and we will come and look. ${hours.office}.`,
    href: '/contact',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      {/* ─────────────────────────────────── serviceouter-one */}
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
                label="Sectional and rolling doors on a commercial unit, placeholder"
              />
            </div>

            <div className="flex flex-col gap-6">
              <Heading level={2} as={1} id="sec-one-heading">
                Garage Door Repair, Operators And Servicing For Commercial Sites
              </Heading>
              <Prose className="text-on-band-muted">
                A door on a unit, a yard or a loading bay opens more in a month than a house door
                does in a year. It wears in the same places, far faster, and it fails while people
                wait on the other side.
              </Prose>
              <Prose className="text-on-band-muted">
                We work the whole assembly to duty cycle rather than door size: springs and cables
                sized on cycle count, operators matched to the load they lift, tracks, rollers,
                panels and safety edges.
              </Prose>
              <Prose className="text-on-band-muted">
                Everything happens on your site, scheduled around your hours. {hours.response}, so a
                blocked opening does not take the rest of the day with it, and{' '}
                <TextLink href="/emergency-garage-door-repair">emergency cover</TextLink> runs
                outside office hours.
              </Prose>
              <div className="flex flex-wrap gap-5 pt-5">
                <ButtonLink variant="primary" href="/contact">
                  Arrange a site visit
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────── serviceouter-two */}
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
              Our Commercial Garage Door Services
            </Heading>
            <Carousel perView={{ base: 1, md: 2, lg: 4 }} label="Commercial garage door services">
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
                      label={`${s.title} on a commercial door, placeholder`}
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
          Brand lockup is a PLACEHOLDER under COPY_MODE = ORIGINAL and is
          excluded from measurement. */}
      <Section
        tone="band"
        rhythm="tight"
        className="xl:py-section-y"
        id="duty-cycle"
        aria-labelledby="duty-cycle-heading"
      >
        <Container>
          <div className="rounded-lg bg-band-deep p-5 lg:w-3/4 xl:w-3/5">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[356/58] w-3/5">
                <Placeholder kind="logo lockup" tone="band" fill label="Brand lockup placeholder" />
              </div>
              <Heading level={2} id="duty-cycle-heading">
                Duty Cycle Is What Separates A Commercial Door From A Domestic One
              </Heading>
              <Prose className="text-on-band-muted">
                Two doors can be the same width, weight and construction and still need completely
                different running gear, because one opens twice a day and the other forty times.
                Spring cycle rating, cable gauge, roller type, bearing grade and operator power all
                follow from usage, and a door specified on dimensions alone comes back as a
                call-out.
              </Prose>
              <Prose className="text-on-band-muted">
                So the first thing we ask is how the opening is worked, not how big it is. Parts are
                sized to that number, safety edges and sensors are tested every visit, and anything
                we can see coming is written down so it can be scheduled.
              </Prose>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────── template-ascend */}
      <Section tone="page" rhythm="tight" id="sec-ascend" aria-labelledby="related">
        <Container>
          <div className="rounded-sm bg-elevated p-10 shadow-card">
            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-2">
                <Eyebrow className="text-accent">Keep reading</Eyebrow>
                <Heading level={2} id="related" className="text-ink">
                  Commercial Work In Detail
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
