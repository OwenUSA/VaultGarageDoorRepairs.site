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
import { hours, nap } from '@/lib/site';

/**
 * ROUTE   /emergency-garage-door-repair
 * MODE    CLONE
 * CLASS   service-outer   — BOUND to the converged exemplar,
 *         app/residential-garage-door-services/page.tsx
 * SOURCE  /emergency-services
 *
 * BINDING NOTE: skeleton, section order, rhythm, grid ratios and the
 * per-breakpoint media aspect ratios are inherited from the exemplar VERBATIM.
 * Only copy, card set and metadata differ. Copy volume was written to the
 * exemplar's line counts per breakpoint rather than re-tuning the ratios:
 * 3 hero paragraphs, 6 carousel cards, 2 panel paragraphs, 6 ascend links.
 *
 * COPY_MODE = ORIGINAL. CONFIG FORBIDDEN observed in copy, alt text and meta:
 * no reviews, licensing, prices, guarantees, certifications, awards,
 * years-in-business, job/technician counts or named people.
 */
export const metadata: Metadata = {
  title: 'Emergency Garage Door Repair',
  description: `${hours.emergency} for doors stuck open, off their track, cabled or refusing to lock. ${hours.response}. Call ${nap.phone}.`,
  alternates: { canonical: '/emergency-garage-door-repair' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Emergency Repair', path: '/emergency-garage-door-repair' },
];

/** serviceouter-two — failure modes we are called out to, not service lines. */
const situations = [
  {
    slug: 'stuck-open',
    title: 'Door Stuck Open',
    body: 'An opening that will not close is the call we take most often after dark, and it is a security problem first. We get the door down and holding, then work out whether the travel limits, the sensor path or the door itself stopped it.',
    href: '/contact',
  },
  {
    slug: 'off-track',
    title: 'Door Off Its Track',
    body: 'A roller out of the rail wedges the door at an angle and bends the track further every time the opener pulls. Stop using the opener. We take the load off, straighten or swap the track section, and re-seat the rollers before it moves.',
    href: '/residential-garage-door-services/off-track-cable-repair',
  },
  {
    slug: 'snapped-spring',
    title: 'Spring Let Go',
    body: 'A bang from the garage and a door that suddenly weighs what it actually weighs is a broken spring. The counterweight is gone, so the opener is now dragging the full load. We replace in pairs, match gauge and wind to the door, and re-balance by hand.',
    href: '/residential-garage-door-services/spring-repair',
  },
  {
    slug: 'cable-off',
    title: 'Cable Snapped Or Unwound',
    body: 'When one lift cable goes, that side of the door drops and the other side holds, which twists the panel and jams the whole assembly. We de-tension the shaft, re-spool both cables to equal length and check the drums and bearings that let it happen.',
    href: '/residential-garage-door-services/off-track-cable-repair',
  },
  {
    slug: 'opener-dead',
    title: 'Opener Dead Overnight',
    body: 'Drives, boards, sensors and remotes stop without warning, and a door with no opener is not one you can always lift. We test the drive, the travel and force limits, the sensor alignment and the board, then repair or replace on the result.',
    href: '/residential-garage-door-services#opener-repair',
  },
  {
    slug: 'impact',
    title: 'Struck Or Forced Door',
    body: 'A vehicle into the bottom section, or a door run onto an obstruction, damages more than the panel you can see. We check the section, the hinges either side, the track and the balance, and secure the opening the same visit.',
    href: '/residential-garage-door-services/panel-replacement',
  },
];

const relatedLinks = [
  {
    title: 'Residential Garage Door Services',
    body: 'The planned version of the same work: springs, openers, tracks, cables, panels and door replacement on domestic openings.',
    href: '/residential-garage-door-services',
  },
  {
    title: 'Off-Track & Cable Repair',
    body: 'What we do to a derailed door, why it came off in the first place, and how the cause is traced rather than just the symptom.',
    href: '/residential-garage-door-services/off-track-cable-repair',
  },
  {
    title: 'Garage Door Spring Repair',
    body: 'Torsion and extension springs matched to the door by gauge, diameter and wind, replaced in pairs and re-balanced on site.',
    href: '/residential-garage-door-services/spring-repair',
  },
  {
    title: 'Commercial Garage Door Services',
    body: 'Doors on units, yards and loading bays, where an opening out of action stops more than one person getting to work.',
    href: '/commercial-garage-door-services',
  },
  {
    title: 'Service Areas',
    body: 'The neighbourhoods we cover out of hours. We work on site and carry the common parts, so there is nowhere to drive to.',
    href: '/service-areas',
  },
  {
    title: 'Questions Before You Call',
    body: `How dispatch works after hours, what we can narrow down from a description, and what we bring out. ${hours.office}.`,
    href: '/faqs',
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
                label="Night call-out to a garage door left open, placeholder"
              />
            </div>

            <div className="flex flex-col gap-6">
              <Heading level={2} as={1} id="sec-one-heading">
                Emergency Garage Door Repair, Any Hour Of Any Day
              </Heading>
              <Prose className="text-on-band-muted">
                A garage door fails at the worst moment because that is when it is asked to carry
                the most. Stuck open, dropped shut or off its rail, it stops being a convenience
                and becomes a way in.
              </Prose>
              <Prose className="text-on-band-muted">
                {hours.emergency}. We come out to make the opening safe first — take the load off
                the door, secure it, and only then work out what let go and whether it can be
                finished the same visit.
              </Prose>
              <Prose className="text-on-band-muted">
                Tell us what the door did and what it is doing now. A bang then dead weight, a jam
                halfway, a reverse on close — each points somewhere different. {hours.response}, and{' '}
                <TextLink href="/residential-garage-door-services">planned repairs</TextLink> book
                in normal hours.
              </Prose>
              <div className="flex flex-wrap gap-5 pt-5">
                <ButtonLink variant="primary" href={nap.phoneHref}>
                  Call {nap.phone}
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
        aria-labelledby="situations"
      >
        <Container>
          <div className="flex flex-col gap-5">
            <Heading level={2} id="situations" className="text-center text-ink">
              Doors We Get Called Out To
            </Heading>
            <Carousel perView={{ base: 1, md: 2, lg: 4 }} label="Emergency garage door situations">
              {situations.map((s) => (
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
                    <Prose className="flex-1 text-ink-muted">{s.body}</Prose>
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
        id="what-happens"
        aria-labelledby="what-happens-heading"
      >
        <Container>
          <div className="rounded-lg bg-band-deep p-5 lg:w-3/4 xl:w-3/5">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[356/58] w-3/5">
                <Placeholder kind="logo lockup" tone="band" fill label="Brand lockup placeholder" />
              </div>
              <Heading level={2} id="what-happens-heading">
                What Happens Between Your Call And The Door Being Safe
              </Heading>
              <Prose className="text-on-band-muted">
                One call, answered by someone who can book it. You describe the door and the way it
                failed, and we work out on the phone whether there is anything you can safely do
                first — usually the answer is to stop using the opener and leave the door where it
                is, because a part-open door under uneven load is the one that hurts people.
              </Prose>
              <Prose className="text-on-band-muted">
                On site the sequence is fixed: de-tension, secure the opening, diagnose, explain,
                then repair. If the right part is not on the van the door is still left secure and
                the return visit is booked before we go. {hours.office} for the rest.
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
