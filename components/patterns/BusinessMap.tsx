'use client';

import { useEffect, useRef, useState } from 'react';
import { Container, Section, Heading, Eyebrow, Prose, TextLink } from '@/components/ui';
import { nap, maps, hours } from '@/lib/site';

/**
 * PATTERN: map-sec — replaced, not cloned. LEAD OWNS THIS FILE (A-6).
 *
 * The reference ships an interactive SVG trace of Oklahoma counties with a
 * clickable city grid. That whole affordance is a service-area list and is
 * DELETED per D-02; the one surviving sentence is `nap.serviceArea`.
 *
 * What stands in its place is D-07 / D-08: a keyless Google Maps iframe keyed on
 * MAP_COORDS ONLY — the postal address is fictional and is never handed to a
 * geocoder — inside a fixed aspect-ratio wrapper so the mount causes zero layout
 * shift, `loading="lazy"`, an explicit `title`, and a "Get directions" link.
 *
 * ── THE BYPASS LINK IS PART OF THIS COMPONENT, NOT A SEPARATE TASK ──────────
 * Three sibling sites shipped this map as a keyboard trap because the bypass was
 * specified in an accessibility document and never built. A Google Maps iframe
 * holds dozens of focusable controls; on /contact the map sits beside the form,
 * so the trap is directly between the page heading and the phone field.
 *
 * The bypass is the FIRST CHILD and the component does not render without it.
 * It is parked offscreen, NOT `display:none` and NOT `visibility:hidden` —
 * both remove it from the tab order, which is the entire point of it existing.
 *
 * Acceptance (docs/behavior/07), all three or the component is broken:
 *   1. Tab from "Get directions" reaches a VISIBLE "Skip the map" control.
 *   2. Activating it lands focus after the map.
 *   3. The next Tab reaches the element following the map section.
 * ───────────────────────────────────────────────────────────────────────────
 */
export function BusinessMap({
  zoom = 13,
  eyebrow = 'Where we are',
  title = 'Find us on the map',
  body,
  section = 'map',
  headingId = 'map-heading',
}: {
  /** D-08: ~13 on the home page, ~15 beside the contact form. */
  zoom?: number;
  eyebrow?: string;
  title?: string;
  body?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  headingId?: string;
}) {
  const frame = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const afterMapId = `${headingId}-after`;

  /* IntersectionObserver controls the ELEMENT; loading="lazy" controls the
     FETCH. Both, not either: the attribute alone defers the request but the
     iframe, its focusable contents and its accessibility subtree exist from
     first render. The observer is created in an effect so the ref is already
     attached, and it disconnects on unmount — an observer left alive on a
     detached node keeps the iframe reference and leaks on every navigation
     between / and /contact. */
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section tone="surface" data-section={section} aria-labelledby={headingId}>
      <Container>
        <a href={`#${afterMapId}`} className="map-bypass">
          Skip the map
        </a>
        <div className="grid gap-11 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading level={2} id={headingId}>
              {title}
            </Heading>
            <Prose className="text-ink-muted">
              {body ?? `${nap.serviceArea} Open ${hours.label}.`}
            </Prose>
            {/* The address is TEXT, in the same section, so the location is
                available without entering the frame at all. */}
            <address className="font-body text-xs not-italic leading-body text-ink-muted">
              {nap.address}
            </address>
            {/* WCAG 2.5.8: the anchor itself carries the 44px minimum, not a
                wrapper — rendertruth measured it at 360x22 otherwise. */}
            <TextLink href={maps.directions} className="inline-flex min-h-[44px] items-center">
              Get directions
            </TextLink>
          </div>

          {/* Fixed ratio, never a px height: the poster and the iframe occupy
              identical space, so the mount shifts nothing. 4:3 at 390 — a 16:9
              map on a phone is a 220px letterbox. */}
          <div
            ref={frame}
            className="aspect-[4/3] w-full overflow-hidden rounded-md border border-border md:aspect-media"
          >
            {mounted ? (
              <iframe
                src={maps.embed(zoom)}
                title={`Map showing the location of ${nap.name} in ${nap.locality}, ${nap.region}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            ) : (
              <div aria-hidden="true" className="h-full w-full bg-border" />
            )}
          </div>
        </div>
        <span id={afterMapId} tabIndex={-1} />
      </Container>
    </Section>
  );
}
