'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Section, Heading, Eyebrow, Prose, Placeholder } from '@/components/ui';
import { serviceAreas } from '@/lib/site';

/**
 * PATTERN: map-sec — interactive SVG map + link grid.
 * h 903 @1440 / 1400 @390. Appears on 10 of 12 exemplars — shared tail.
 *
 * The target ships `svg#mapArea`, a 37 KB inline Inkscape trace of Oklahoma
 * counties. That geometry is region-specific and cannot be ported, so the map
 * face is a PLACEHOLDER slot here and the interaction is rebuilt against our
 * own area list. Flagged in docs/assets.md; the placeholder is a tracked gap.
 *
 * Measured state: `.map-name` click sets `.active` on the name, the matching
 * region image and the matching link. That three-way sync is reproduced.
 */
export function ServiceAreaMap({
  eyebrow = 'Where we work',
  title = 'Service areas we cover',
  body,
  headingId = 'service-area-heading',
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  headingId?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <Section tone="surface" aria-labelledby={headingId}>
      <Container>
        <div className="flex flex-col gap-11">
          <div className="flex max-w-prose flex-col gap-5">
            <Eyebrow className="text-accent">{eyebrow}</Eyebrow>
            <Heading level={2} id={headingId}>
              {title}
            </Heading>
            <Prose className="text-ink-muted">
              {body ??
                'We are a service-area business and travel to you. Pick an area to see it highlighted.'}
            </Prose>
          </div>

          <div className="grid gap-11 lg:grid-cols-2">
            <div className="relative">
              <Placeholder
                kind="square slot"
                tone="border"
                label={`Coverage map placeholder — ${serviceAreas[active]} highlighted`}
              />
            </div>

            <ul className="grid auto-rows-min content-start grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {serviceAreas.map((area, i) => (
                <li key={area}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={`w-full rounded-md px-6 py-3 text-left font-display text-xs font-bold uppercase leading-display transition-colors duration-fast ease-standard ${
                      active === i ? 'bg-band text-on-band' : 'bg-elevated text-ink hover:text-accent'
                    }`}
                  >
                    {area}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Prose className="text-ink-muted">
            Not listed?{' '}
            <Link
              href="/contact"
              className="text-accent underline underline-offset-2 transition-colors duration-fast ease-standard hover:text-accent-hover"
            >
              Ask about your area
            </Link>
            .
          </Prose>
        </div>
      </Container>
    </Section>
  );
}
