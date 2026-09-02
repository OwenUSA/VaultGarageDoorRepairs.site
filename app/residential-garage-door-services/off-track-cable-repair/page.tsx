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
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { hours, nap } from '@/lib/site';

/**
 * ROUTE   /residential-garage-door-services/off-track-cable-repair
 * MODE    CLONE
 * CLASS   service-outer   — BOUND to the converged exemplar,
 *         app/residential-garage-door-services/page.tsx. A leaf route on the
 *         OUTER template, matching the target, where
 *         /residential-roofing-services/water-proofing carries the
 *         serviceouter sequence rather than the serviceinner one.
 * SOURCE  /residential-roofing-services/water-proofing
 *
 * BINDING NOTE: skeleton, section order, rhythm, grid ratios and the
 * per-breakpoint media aspect ratios are inherited VERBATIM. Copy volume
 * matched to the exemplar's line counts per breakpoint rather than re-tuning
 * the ratios: 3 hero paragraphs, 6 carousel cards, 2 panel paragraphs,
 * 6 ascend links.
 *
 * COPY_MODE = ORIGINAL. CONFIG FORBIDDEN observed in copy, alt text and meta.
 */
export const metadata: Metadata = {
  title: 'Off-Track & Cable Repair',
  description: `Garage doors that have jumped the track or snapped a lift cable, de-tensioned, realigned and re-cabled on site. ${hours.response}. Call ${nap.phone}.`,
  alternates: { canonical: '/residential-garage-door-services/off-track-cable-repair' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Residential Services', path: '/residential-garage-door-services' },
  {
    label: 'Off-Track & Cable Repair',
    path: '/residential-garage-door-services/off-track-cable-repair',
  },
];

/** serviceouter-two — the running gear a derailed door is checked against. */
const checks = [
  {
    slug: 'cables',
    title: 'Lift Cables',
    body: 'A frayed, slack or snapped cable lets one side of the door drop while the other side holds, which twists the panel and jams the whole assembly in the opening. Both cables are replaced together and re-spooled to equal length, because a mismatched pair pulls the door out of square again.',
  },
  {
    slug: 'rollers',
    title: 'Rollers And Hinges',
    body: 'A seized roller is the most common thing that starts a derailment: it stops turning, drags in the track, and eventually climbs out of it. We free the door, replace the roller, and check the hinge it runs from, since a hinge that has spread will put the next roller out the same way.',
  },
  {
    slug: 'track',
    title: 'Track Alignment',
    body: 'Once a door has come off, the track is almost always bent at the point it left, and often further along where the opener kept pulling. We straighten the section or replace the run, then reset the brackets to the correct spacing so the door is not riding against the rail.',
  },
  {
    slug: 'drums',
    title: 'Drums And Bearings',
    body: 'The cables wind onto a drum at each end of the torsion shaft. If a drum has slipped its set screws, or an end bearing has worn enough to let the shaft wander, the cables spool unevenly and the door will derail again however well the track is straightened.',
  },
  {
    slug: 'bottom-brackets',
    title: 'Bottom Brackets',
    body: 'The bottom bracket is where the cable meets the door, and it is under the full spring load the entire time the door is closed. It is never adjusted with the door under tension. We inspect it for cracking and pull-through, and replace it rather than re-using a bracket that has moved.',
  },
  {
    slug: 'balance',
    title: 'Springs And Balance',
    body: 'Once everything is back on the rail the door still has to be re-balanced, because whatever caused the derailment usually changed the load. We test it by hand at several points, adjust spring tension until it holds where it is left, then re-test the safety reversal.',
  },
];

const relatedLinks = [
  {
    title: 'Residential Garage Door Services',
    body: 'The whole residential picture: springs, openers, tracks and cables, panels, new doors and routine servicing.',
    href: '/residential-garage-door-services',
  },
  {
    title: 'Garage Door Spring Repair',
    body: 'The failure that most often puts a door off its track in the first place, matched by gauge, diameter and wind.',
    href: '/residential-garage-door-services/spring-repair',
  },
  {
    title: 'Panel Replacement',
    body: 'A derailed or struck door frequently damages one section. That section can usually be swapped without a new door.',
    href: '/residential-garage-door-services/panel-replacement',
  },
  {
    title: 'Routine Maintenance & Tune-Up',
    body: 'Rollers, cables and bearings inspected before they seize, which is the only reliable way to not need this page.',
    href: '/residential-garage-door-services/maintenance-tune-up',
  },
  {
    title: 'Emergency Garage Door Repair',
    body: `A door hanging off its rail cannot be left half open overnight. ${hours.emergency}.`,
    href: '/emergency-garage-door-repair',
  },
  {
    title: 'Book A Visit',
    body: `Describe what the door did and where it is stuck and we will find the earliest slot. ${hours.office}.`,
    href: '/contact',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd data={serviceSchema('off-track-cable-repair')} />

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
                label="Garage door hanging off its track, placeholder"
              />
            </div>

            <div className="flex flex-col gap-6">
              <Heading level={2} as={1} id="sec-one-heading">
                Off-Track And Cable Repair For Doors That Have Come Off The Rail
              </Heading>
              <Prose className="text-on-band-muted">
                A derailed door is stuck, heavy and loaded unevenly. Whatever is still holding it up
                is holding more than it was designed to, which is why this is the one fault where
                the first instruction is to stop.
              </Prose>
              <Prose className="text-on-band-muted">
                Leave the door exactly where it is and stop using the opener. Every pull against a
                jammed door bends more track, spreads more hinges and puts more load through a cable
                that may already be the thing that failed.
              </Prose>
              <Prose className="text-on-band-muted">
                We take the tension out of the assembly before anything moves, then work back
                through cables, rollers, track, drums and balance to find what actually started it.{' '}
                {hours.response}, and{' '}
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

      {/* ─────────────────────────────────── serviceouter-two */}
      <Section
        tone="page"
        rhythm="tight"
        className="xl:py-section-y"
        id="sec-two"
        aria-labelledby="checks"
      >
        <Container>
          <div className="flex flex-col gap-5">
            <Heading level={2} id="checks" className="text-center text-ink">
              What We Check On A Derailed Door
            </Heading>
            <Carousel perView={{ base: 1, md: 2, lg: 4 }} label="Off-track and cable repair checks">
              {checks.map((c) => (
                <Card
                  key={c.slug}
                  variant="signature"
                  className="flex h-full flex-col overflow-hidden"
                >
                  <div className="relative w-full aspect-[4/3] md:aspect-[352/322] lg:aspect-[4/3] xl:aspect-[269/246]">
                    <Placeholder
                      kind="4:3 card"
                      tone="surface"
                      fill
                      label={`${c.title} placeholder`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <Heading level={4} as={3} className="text-ink">
                      {c.title}
                    </Heading>
                    <Prose className="flex-1 text-ink-muted">{c.body}</Prose>
                    <ButtonLink variant="inverse" href="/contact" className="self-start">
                      Book a visit
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
        id="why"
        aria-labelledby="why-heading"
      >
        <Container>
          <div className="rounded-lg bg-band-deep p-5 lg:w-3/4 xl:w-3/5">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[356/58] w-3/5">
                <Placeholder kind="logo lockup" tone="band" fill label="Brand lockup placeholder" />
              </div>
              <Heading level={2} id="why-heading">
                A Door Coming Off Its Track Is The Second Failure, Never The First
              </Heading>
              <Prose className="text-on-band-muted">
                Something else nearly always went first. A cable let go, a roller seized, a bearing
                wore through, a vehicle caught the bottom section, or the door was run down onto an
                obstruction until the track gave way. Lifting the door back into the rail without
                finding that cause is a repair that lasts until the next time the door is used,
                which is why we work the assembly rather than the position the door is stuck in.
              </Prose>
              <Prose className="text-on-band-muted">
                The order matters as much as the parts. De-tension, secure, then diagnose, then
                straighten, then re-cable, then re-balance, then test the safety reversal with the
                door back on the opener. If the right track section or drum is not on the van the
                opening is still left secure and the return visit is booked before we leave.
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
                  Other Garage Door Services
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
