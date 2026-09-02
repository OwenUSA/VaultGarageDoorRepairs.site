import type { ReactNode } from 'react';
import { Container, Section, Heading, Eyebrow, Prose, Accordion, type SectionTone } from '@/components/ui';

/**
 * PATTERN: faq-two — accordion. h 701 @1440 / 759 @390
 * Pairs with `SectionIntro` (faq-one) from Bands.tsx.
 */
export function FaqBlock({
  tone = 'page',
  eyebrow,
  title,
  body,
  items,
  id,
  section,
  headingId = 'faq-heading',
}: {
  tone?: SectionTone;
  eyebrow?: string;
  title?: ReactNode;
  body?: ReactNode;
  items: readonly { q: string; a: ReactNode }[];
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  headingId?: string;
}) {
  const onBand = tone === 'band' || tone === 'band-deep';
  return (
    <Section tone={tone} id={id} data-section={section} aria-labelledby={headingId}>
      <Container>
        <div className="flex flex-col gap-11">
          {title ? (
            <div className="flex max-w-prose flex-col gap-5">
              {eyebrow ? <Eyebrow className={onBand ? 'text-ink-on-band' : 'text-accent'}>{eyebrow}</Eyebrow> : null}
              <Heading level={2} id={headingId}>
                {title}
              </Heading>
              {body ? (
                <Prose className={onBand ? 'text-ink-on-band-muted' : 'text-ink-muted'}>{body}</Prose>
              ) : null}
            </div>
          ) : null}
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
}
