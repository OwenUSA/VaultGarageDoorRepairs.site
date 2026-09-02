import { Container, Section, Heading, Eyebrow, Prose, TextLink } from '@/components/ui';
import { nap, maps, hours } from '@/lib/site';

/**
 * PATTERN: map-sec — replaced, not cloned.
 *
 * The reference ships an interactive inline SVG trace of Oklahoma counties with
 * a clickable city grid. That whole affordance is a locations/service-area list
 * and is DELETED per D-02; the one surviving sentence is `nap.serviceArea`.
 *
 * What stands in its place is D-07 / D-08: a keyless Google Maps iframe keyed on
 * MAP_COORDS only — the postal address is fictional and is never handed to a
 * geocoder — inside a fixed aspect-ratio wrapper so it cannot shift layout,
 * `loading="lazy"`, an explicit `title`, and a "Get directions" link.
 *
 * LEAD OWNS THIS FILE (A-6). Section agents compose it; they never edit it.
 */
export function BusinessMap({
  zoom = 13,
  eyebrow = 'Where we are',
  title = 'Find us on the map',
  body,
  headingId = 'map-heading',
}: {
  /** D-08: ~13 on the home page, ~15 beside the contact form. */
  zoom?: number;
  eyebrow?: string;
  title?: string;
  body?: string;
  headingId?: string;
}) {
  return (
    <Section tone="surface" aria-labelledby={headingId}>
      <Container>
        <div className="grid gap-11 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Eyebrow className="text-accent">{eyebrow}</Eyebrow>
            <Heading level={2} id={headingId}>
              {title}
            </Heading>
            <Prose className="text-ink-muted">
              {body ?? `${nap.serviceArea} Open ${hours.label}.`}
            </Prose>
            <address className="not-italic font-body text-xs leading-body text-ink-muted">
              {nap.address}
            </address>
            <TextLink href={maps.directions}>Get directions</TextLink>
          </div>

          <div className="aspect-media w-full overflow-hidden rounded-md border border-border">
            <iframe
              src={maps.embed(zoom)}
              title={`Map showing the location of ${nap.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
