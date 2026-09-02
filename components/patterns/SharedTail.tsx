import type { ReactNode } from 'react';
import { BusinessMap } from './BusinessMap';
import { ContactBlock } from './ContactBlock';

/**
 * SharedTail — the universal page tail, contracted once by the lead.
 *
 *   target:  map-sec  >  testimonial  >  contact-new
 *   ours:    map-sec  >  contact-new
 *
 * `testimonial` is CONFIG FORBIDDEN (reviews / ratings). This is an intentional
 * structural deviation, reported in docs/05-route-map.md — never a divergence
 * and never iterated on.
 *
 * One shared change touching 10 routes. Section agents must NOT re-implement
 * the tail or re-decide the removal; they compose this component.
 */
export function SharedTail({
  contactTitle,
  middle,
}: {
  contactTitle?: string;
  /**
   * The target sequence on `home` is map-sec > message-owner > contact-new.
   * `middle` renders in that measured slot so no route has to re-implement the
   * tail (or re-decide the `testimonial` removal) just to interleave a section.
   */
  middle?: ReactNode;
}) {
  return (
    <>
      <BusinessMap />
      {middle}
      <ContactBlock title={contactTitle} />
    </>
  );
}
