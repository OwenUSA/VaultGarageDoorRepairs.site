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
  contactBody,
  mapZoom = 13,
  mapEyebrow,
  mapTitle,
  mapBody,
  middle,
}: {
  contactTitle?: string;
  contactBody?: string;
  /** D-08: ~13 on the home page, ~15 beside the contact form. */
  mapZoom?: number;
  mapEyebrow?: string;
  mapTitle?: string;
  mapBody?: string;
  /**
   * The target sequence on `home` is map-sec > message-owner > contact-new.
   * `middle` renders in that measured slot so no route has to re-implement the
   * tail (or re-decide the `testimonial` removal) just to interleave a section.
   */
  middle?: ReactNode;
}) {
  return (
    <>
      <BusinessMap zoom={mapZoom} eyebrow={mapEyebrow} title={mapTitle} body={mapBody} />
      {middle}
      <ContactBlock title={contactTitle} body={contactBody} />
    </>
  );
}
