import type { Metadata } from 'next';
import { ServiceInnerPage, type ServiceInnerContent } from '../_service-inner/ServiceInnerTemplate';
import { hours } from '@/lib/site';

/**
 * ROUTE   /residential-garage-door-services/panel-replacement
 * MODE    CLONE          CLASS  service-inner
 * SOURCE  /residential-roofing-services/roof-replacement
 * COPY    ORIGINAL — structure cloned, wording is ours.
 */
export const metadata: Metadata = {
  title: 'Garage Door Panel Replacement',
  description:
    'Replacement of damaged, dented or split garage door sections without changing the whole door, with same-day and emergency dispatch.',
  alternates: { canonical: '/residential-garage-door-services/panel-replacement' },
};

const content: ServiceInnerContent = {
  slug: 'panel-replacement',
  eyebrow: 'Residential garage door service',
  heroBullets: [hours.emergency, hours.response],
  two: {
    heading: 'Panel Damage We Replace',
    body: 'A sectional door is built from separate panels, so damage to one of them is usually a panel job rather than a door job. What matters is whether the rest of the door is straight, whether the struts and hinges took any of the impact, and whether a matching section can be fitted to the existing track.',
    bullets: [
      'Dented or creased sections after a knock',
      'Cracked, split or delaminated panels',
      'Rusted or swollen bottom sections',
      'Panels pulling away at the hinge line',
      'Bent struts and stiles behind the face',
      'Bottom seal and retainer renewed with the section',
    ],
  },
  three: {
    heading: 'Replacing A Panel Rather Than The Door',
    body: 'Swapping a section keeps the tracks, springs, hardware and opener exactly as they are, so the door goes back to working the same day it is fitted. It is not always the right call — once several panels are damaged, or the door is out of square, a full replacement is the sounder answer and we will say so.',
    bullets: [
      'We check the door for square before ordering',
      'Section colour and profile matched to the existing door',
      'Hinges, rollers and struts inspected at the same time',
      'Door re-balanced once the new section is in',
      'Opener travel and force re-set afterwards',
    ],
  },
  four: {
    heading: 'Book Panel Replacement',
    body: 'Send us the make of the door and a look at the damage and we will confirm whether a section swap is the right route before anyone comes out.',
  },
};

export default function Page() {
  return <ServiceInnerPage content={content} />;
}
