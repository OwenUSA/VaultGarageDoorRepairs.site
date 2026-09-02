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
 * ROUTE   /residential-garage-doors
 * MODE    CLONE
 * CLASS   service-outer  —  `so-material` VARIANT
 * SOURCE  /residential-roofing-material
 *
 * BINDS TO THE CONVERGED BASE CLASS in
 * app/residential-garage-door-services/page.tsx. Same skeleton, same
 * primitives, same rhythm props. Only copy volume differs, which is exactly
 * what the measured variant delta says it should be:
 *
 *   so-material MINUS base, dH @768/1024/1440
 *     serviceouter-one    -24 /  -39 /    0     h1 wraps to 2 lines, not 3
 *     serviceouter-two    -19 /  -19 /    0     shorter slide bodies
 *     serviceouter-three  +94 /  +94 / +107     FOUR paragraphs, not two
 *     template-ascend       0 /  +44 /    0     longer bodies on half the rows
 *     map-sec / contact-new  identical (SharedTail, lead-owned)
 *
 * MEASURED TARGET SEQUENCE (section height @390/640/768/1024/1440)
 *   serviceouter-one    1029 / 836 / 813 / 471 / 593
 *   [logos               1572/1472/366/318/306 — manufacturer-partnership
 *    strip, CONFIG FORBIDDEN, slot REMOVED not filled. Intentional
 *    structural deviation, never a divergence.]
 *   serviceouter-two    2521 / 2493 / 796 / 748 / 818
 *   serviceouter-three   773 /  629 / 580 / 569 / 707
 *   template-ascend     1617 / 1326 / 986 / 963 / 852
 *   > SHARED TAIL (map-sec + contact-new, lead-owned)
 *
 * 390/640 are REF-UNMEASURABLE on this exemplar (NitroPack deferred JS poisoned
 * the capture). Gated at 768/1024/1440 only.
 *
 * COPY_MODE = ORIGINAL. Every row of CONFIG FORBIDDEN is observed: the door
 * styles below are described by construction and behaviour only — no brand or
 * manufacturer name, no price, no warranty, no rating, no years-in-business.
 */
export const metadata: Metadata = {
  title: 'Residential Garage Doors',
  description: `Sectional, insulated, carriage, glazed and composite garage doors for homes — measured, sprung to weight and tested on site. ${hours.response}.`,
  alternates: { canonical: '/residential-garage-doors' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Residential Doors', path: '/residential-garage-doors' },
];

/** serviceouter-two — one slide per door construction. */
const doorStyles = [
  {
    slug: 'sectional-steel',
    title: 'Sectional Steel Doors',
    body: 'Hinged panels that roll up and back along a track, so nothing swings out over the driveway. It is the most common domestic build and the most forgiving one to repair, because a damaged section can be changed on its own.',
  },
  {
    slug: 'insulated',
    title: 'Insulated Doors',
    body: 'A bonded core between two skins. Quieter through the cycle and far steadier in temperature where the garage shares a wall or a ceiling with a room, though the extra mass changes how the door has to be sprung.',
  },
  {
    slug: 'carriage-style',
    title: 'Carriage-Style Doors',
    body: 'Ordinary sectional running gear behind a side-hinged appearance. The opening keeps working the way it always did, with the same headroom and the same track, while the elevation reads as a pair of swing doors.',
  },
  {
    slug: 'glazed-aluminium',
    title: 'Glazed Aluminium Doors',
    body: 'An aluminium frame carrying glazed or infill panels. Light on the structure and light on the springs, which means the balance is set to a very different weight than a steel door of the same size would need.',
  },
  {
    slug: 'composite-panel',
    title: 'Composite Panel Doors',
    body: 'A timber grain over a stable manufactured core, so the panel keeps its shape through a wet winter and a dry summer instead of moving with the weather the way a solid timber door will.',
  },
  {
    slug: 'full-view-and-custom',
    title: 'Full-View And Custom Widths',
    body: 'Wider than standard openings, double openings and non-standard heights are all fitted, but they are measured first. Width drives the track gauge, the spring count and whether the opener has the travel to handle it.',
  },
];

/** template-ascend — two-column link panel, longer bodies than the base member. */
const relatedLinks = [
  {
    title: 'Residential Garage Door Services',
    body: 'Springs, openers, tracks, cables and panels on domestic doors, and what each fault usually sounds like before it stops the door completely.',
    href: '/residential-garage-door-services',
  },
  {
    title: 'New Door Installation',
    body: 'How a replacement door is measured, sprung to its finished weight and cycled before handover, and what happens to the door being taken out.',
    href: '/residential-garage-door-services/new-door-installation',
  },
  {
    title: 'Panel Replacement',
    body: 'When a single dented or split section can be swapped instead of the whole door, and how we check the run is still available before starting.',
    href: '/residential-garage-door-services/panel-replacement',
  },
  {
    title: 'Emergency Garage Door Repair',
    body: `A door stuck open, off its track or refusing to lock, handled outside office hours. ${hours.emergency}.`,
    href: '/emergency-garage-door-repair',
  },
  {
    title: 'Service Areas',
    body: 'The neighbourhoods we cover. Everything is done on site and the common parts travel with us, so there is no showroom to visit.',
    href: '/service-areas',
  },
  {
    title: 'Book A Visit',
    body: `Tell us the opening, the door you have now and what you want it to do, and we will find the earliest slot. ${hours.office}.`,
    href: '/contact',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      {/* ─────────────────────────────────── serviceouter-one   813 / 471 / 593
          Same two-column skeleton as the base class. The variant's h1 wraps to
          two lines where the base wraps to three, which is the whole -39 at
          1024, so the headline is deliberately kept short. */}
      <Section
        tone="band"
        rhythm="tight"
        className="xl:py-section-y"
        id="sec-one"
        aria-labelledby="sec-one-heading"
      >
        <Container>
          <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-[1fr_2fr] lg:gap-10 xl:gap-13">
            <div className="relative w-full aspect-[360/417] sm:aspect-[610/324] md:aspect-[720/342] lg:aspect-[279/349] xl:aspect-[336/443]">
              <Placeholder
                kind="portrait card"
                tone="band-deep"
                fill
                label="Residential garage door elevation, placeholder"
              />
            </div>

            <div className="flex flex-col gap-6">
              <Heading level={2} as={1} id="sec-one-heading">
                Garage Doors For Homes, Measured Before They Are Chosen
              </Heading>
              <Prose className="text-on-band-muted">
                A garage door is a moving structure rather than a panel across a hole. Its weight,
                the headroom above the opening and the room behind it decide which builds will
                actually fit, and those three numbers are worth knowing before a finish is picked.
              </Prose>
              <Prose className="text-on-band-muted">
                We measure the opening, work out how the finished door has to be balanced, and fit
                it so the springs carry the weight and the opener only moves it. {hours.response},
                and a door already failing is handled under{' '}
                <TextLink href="/emergency-garage-door-repair">emergency cover</TextLink>.
              </Prose>
              <div className="flex flex-wrap gap-5 pt-5">
                <ButtonLink variant="primary" href="/contact">
                  Talk about a door
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────── serviceouter-two   796 / 748 / 818 */}
      <Section
        tone="page"
        rhythm="tight"
        className="xl:py-section-y"
        id="sec-two"
        aria-labelledby="styles"
      >
        <Container>
          <div className="flex flex-col gap-5">
            <Heading level={2} id="styles" className="text-center text-ink">
              Garage Door Styles We Install And Repair
            </Heading>
            <Carousel perView={{ base: 1, md: 2, lg: 4 }} label="Residential garage door styles">
              {doorStyles.map((d) => (
                <Card
                  key={d.slug}
                  variant="signature"
                  className="flex h-full flex-col overflow-hidden"
                >
                  <div className="relative w-full aspect-[4/3] md:aspect-[352/322] lg:aspect-[4/3] xl:aspect-[269/246]">
                    <Placeholder
                      kind="4:3 card"
                      tone="surface"
                      fill
                      label={`${d.title} placeholder`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <Heading level={4} as={3} className="text-ink">
                      {d.title}
                    </Heading>
                    <Prose className="flex-1 text-ink-muted">{d.body}</Prose>
                    <ButtonLink
                      variant="inverse"
                      href="/residential-garage-door-services"
                      className="self-start"
                    >
                      See this service
                    </ButtonLink>
                  </div>
                </Card>
              ))}
            </Carousel>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────── serviceouter-three   580 / 569 / 707
          THE ONE REAL VARIANT DEVIATION. Identical inset-panel skeleton to the
          base class, but the target carries a two-line h2 and FOUR paragraphs
          (67 / 90 / 67 / 67 at 1440) where the base carries a three-line h2 and
          two. That extra copy is the whole +107. The lockup is a brand mark, so
          it stays a PLACEHOLDER under COPY_MODE = ORIGINAL and is excluded from
          measurement. */}
      <Section
        tone="band"
        rhythm="tight"
        className="xl:py-section-y"
        id="sec-three"
        aria-labelledby="sec-three-heading"
      >
        <Container>
          <div className="rounded-lg bg-band-deep xl:w-3/5 xl:p-5">
            <div className="flex flex-col gap-3 lg:gap-5 xl:gap-7">
              <div className="relative aspect-[356/58] w-full xl:w-3/5">
                <Placeholder kind="logo lockup" tone="band" fill label="Brand lockup placeholder" />
              </div>
              <Heading level={2} id="sec-three-heading">
                Choosing A Door The Opening Can Actually Carry
              </Heading>
              <Prose className="text-on-band-muted">
                Weight, headroom and how often the door is used decide more than the finish does. An
                insulated steel door and a glazed aluminium door of the same size are two different
                loads, and they are sprung to two different sizes.
              </Prose>
              <Prose className="text-on-band-muted">
                Headroom is the constraint people find last. The gap between the top of the opening
                and the ceiling sets the track type, and a shallow one narrows the choice before any
                panel is picked. Backroom matters just as much, because the door has to have
                somewhere to go once it is up and clear of the frame.
              </Prose>
              <Prose className="text-on-band-muted">
                Cycle count is the quiet one. A door opened four times a day and a door opened
                twenty times a day wear their rollers, hinges and bearings at very different rates,
                and that changes what is worth fitting.
              </Prose>
              <Prose className="text-on-band-muted">
                So the measuring comes first and the ordering comes second. We take the opening, the
                headroom, the backroom and the side clearance, and we say plainly when a door you
                like is the wrong fit for the hole it has to sit in.
              </Prose>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────── template-ascend   986 / 963 / 852
          The target's "Show 14 More" XHR is not reproduced — our build has no
          post archive — so the row height carries that space rather than a dead
          control. Bodies run a line longer than the base member's, which is the
          +44 at 1024. */}
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
              <ul className="grid gap-y-2 md:grid-cols-2 md:gap-y-8 lg:gap-y-12 xl:gap-y-8">
                {relatedLinks.map((item) => (
                  <li key={item.title}>
                    <TextLink
                      href={item.href}
                      className="flex h-full items-start gap-6 py-10 no-underline md:py-11 xl:py-10"
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
