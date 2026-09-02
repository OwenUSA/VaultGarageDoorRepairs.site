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
 * ROUTE   /commercial-garage-door-services/maintenance-program
 * MODE    CLONE
 * CLASS   service-outer   — BOUND to the converged exemplar,
 *         app/residential-garage-door-services/page.tsx
 * SOURCE  /commercial-roofing-services/roof-maintenance-program
 *
 * BINDING NOTE: skeleton, section order, rhythm, grid ratios and the
 * per-breakpoint media aspect ratios are inherited VERBATIM. Copy volume
 * matched to the exemplar's line counts per breakpoint rather than re-tuning
 * the ratios: 3 hero paragraphs, 6 carousel cards, 2 panel paragraphs,
 * 6 ascend links.
 *
 * COPY WATCH: a "maintenance program" page invites warranty, guarantee, price
 * and years-in-business language. All four are CONFIG FORBIDDEN. This page
 * describes a SCHEDULE of visits and the work done on them — it promises no
 * outcome, carries no figure and no term.
 *
 * The six carousel cards are TASKS inside the CONFIG FACTS service "routine
 * maintenance & tune-up". None of them is a new service line.
 *
 * COPY_MODE = ORIGINAL. CONFIG FORBIDDEN observed in copy, alt text and meta.
 */
export const metadata: Metadata = {
  title: 'Commercial Garage Door Maintenance Program',
  description: `Planned garage door servicing visits on a cadence you set — inspection, lubrication, balance, hardware, cables and safety circuit, door by door. ${hours.office}.`,
  alternates: { canonical: '/commercial-garage-door-services/maintenance-program' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Commercial Services', path: '/commercial-garage-door-services' },
  { label: 'Maintenance Program', path: '/commercial-garage-door-services/maintenance-program' },
];

const maintenance = services.find((s) => s.slug === 'maintenance-tune-up');

/** serviceouter-two — what a scheduled visit covers, in the order it is done. */
const visitCards = [
  {
    slug: 'walk-through',
    title: 'Inspection Walk-Through',
    body: 'Every door on the site is opened, closed and watched through a full cycle before anything is touched, because most faults are audible or visible in motion and invisible standing still. Tracks, rollers, hinges and fixings are checked against how that door is actually worked.',
  },
  {
    slug: 'lubrication',
    title: 'Lubrication',
    body: 'Rollers, hinges, bearings and spring assemblies are cleaned down and lubricated so the door runs quietly and the wear spreads evenly instead of concentrating on whichever part has started to bind. A door that has gone noisy is usually telling you this was overdue.',
  },
  {
    slug: 'balance',
    title: 'Balance Check',
    body: 'The door is disconnected from the operator and tested by hand at several points through its travel. A door that drifts down or runs up on its own is out of balance and is loading the operator to make up the difference, so spring tension is adjusted until it holds.',
  },
  {
    slug: 'hardware',
    title: 'Hardware And Fixings',
    body: 'Vibration walks bolts loose, and a hinge or bracket that has backed off is what puts a door out of square. Every fixing on the track, the brackets, the hinges and the operator mount is checked and re-torqued, and anything worn past adjustment is listed for replacement.',
  },
  {
    slug: 'cables',
    title: 'Cables And Drums',
    body: 'Lift cables are inspected along their full length for fraying, kinking and slack, and the drums are checked for equal spooling and any sign of slip on the shaft. Cable failures give plenty of warning and almost none of it is noticed unless someone is looking.',
  },
  {
    slug: 'safety',
    title: 'Operator And Safety Circuit',
    body: 'Travel and force limits are tested against the door as it is now rather than as it was set, and the safety reversal, photo-eyes and any safety edge are checked and re-aligned. The result of each test is written down so the next visit has something to compare against.',
  },
];

const relatedLinks = [
  {
    title: 'Commercial Garage Door Services',
    body: 'The full commercial picture: repair, operators, panels and new door installation on units, yards and loading bays.',
    href: '/commercial-garage-door-services',
  },
  {
    title: 'Commercial Inspection',
    body: 'A one-off condition check rather than a standing schedule, written up door by door so the work can be planned.',
    href: '/commercial-garage-door-services/inspection',
  },
  {
    title: 'Commercial Repair',
    body: 'When a scheduled visit turns something up, or a door fails between visits, the repair itself is booked as its own job.',
    href: '/commercial-garage-door-services/repair',
  },
  {
    title: maintenance?.title ?? 'Routine Maintenance & Tune-Up',
    body: maintenance?.summary ?? '',
    href: maintenance?.href ?? '/residential-garage-door-services/maintenance-tune-up',
  },
  {
    title: 'Emergency Garage Door Repair',
    body: `A door stuck open is a security problem before it is a mechanical one, so it is treated as one. ${hours.emergency}.`,
    href: '/emergency-garage-door-repair',
  },
  {
    title: 'Set Up A Schedule',
    body: `Tell us how many doors you run and how hard they work and we will propose a cadence. ${hours.office}.`,
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
                label="Scheduled garage door servicing visit, placeholder"
              />
            </div>

            <div className="flex flex-col gap-6">
              <Heading level={2} as={1} id="sec-one-heading">
                A Garage Door Maintenance Program On A Schedule You Set
              </Heading>
              <Prose className="text-on-band-muted">
                Doors on a working site are serviced either on a calendar or on the day one of them
                stops. The second option always costs the opening as well as the repair, and it
                never picks a convenient morning to happen on.
              </Prose>
              <Prose className="text-on-band-muted">
                A program is simply planned visits at a cadence you choose, each one running the
                same sequence on every door, so a reading from this visit means something next to
                the last one and wear shows up as a trend.
              </Prose>
              <Prose className="text-on-band-muted">
                Visits are booked ahead and worked around your operating hours. Anything needing
                more than adjustment is written up and agreed as its own job. {hours.office}, and{' '}
                <TextLink href="/emergency-garage-door-repair">emergency cover</TextLink> still
                applies between visits.
              </Prose>
              <div className="flex flex-wrap gap-5 pt-5">
                <ButtonLink variant="primary" href="/contact">
                  Set up a schedule
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
        aria-labelledby="coverage"
      >
        <Container>
          <div className="flex flex-col gap-5">
            <Heading level={2} id="coverage" className="text-center text-ink">
              What A Scheduled Visit Covers
            </Heading>
            <Carousel perView={{ base: 1, md: 2, lg: 4 }} label="Scheduled maintenance visit tasks">
              {visitCards.map((v) => (
                <Card
                  key={v.slug}
                  variant="signature"
                  className="flex h-full flex-col overflow-hidden"
                >
                  <div className="relative w-full aspect-[4/3] md:aspect-[352/322] lg:aspect-[4/3] xl:aspect-[269/246]">
                    <Placeholder
                      kind="4:3 card"
                      tone="surface"
                      fill
                      label={`${v.title} placeholder`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <Heading level={4} as={3} className="text-ink">
                      {v.title}
                    </Heading>
                    <Prose className="flex-1 text-ink-muted">{v.body}</Prose>
                    <ButtonLink variant="inverse" href="/contact" className="self-start">
                      Set up a schedule
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
        id="how-it-runs"
        aria-labelledby="how-it-runs-heading"
      >
        <Container>
          <div className="rounded-lg bg-band-deep p-5 lg:w-3/4 xl:w-3/5">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[356/58] w-3/5">
                <Placeholder kind="logo lockup" tone="band" fill label="Brand lockup placeholder" />
              </div>
              <Heading level={2} id="how-it-runs-heading">
                How The Program Runs, And What It Deliberately Does Not Do
              </Heading>
              <Prose className="text-on-band-muted">
                You set the cadence. Doors running constantly on a bay usually want visiting far
                more often than a door that opens for a delivery twice a week, and there is no
                reason to put both on the same rotation. We book the dates ahead, arrive in the
                window agreed, run the same sequence on every door, and leave a written note of what
                was adjusted, what was tested and what we are watching for next time.
              </Prose>
              <Prose className="text-on-band-muted">
                What a visit is not is a repair slot. If a door needs a part it is written up and
                agreed as its own job, and it is never carried out on the assumption that a
                scheduled visit covers it. That keeps the record honest and keeps you deciding what
                gets spent. Between visits, {hours.emergency.toLowerCase()}.
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
                  More On Commercial Garage Doors
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
