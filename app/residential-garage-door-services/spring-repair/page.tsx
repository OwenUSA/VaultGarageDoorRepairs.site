import type { Metadata } from 'next';
import { ServiceInnerPage, type ServiceInnerContent } from '../_service-inner/ServiceInnerTemplate';
import { hours } from '@/lib/site';

/**
 * ROUTE   /residential-garage-door-services/spring-repair
 * MODE    CLONE          CLASS  service-inner
 * SOURCE  /residential-roofing-services/roof-repair
 * COPY    ORIGINAL — structure cloned, wording is ours.
 *
 * REBOUND to the converged class template. The previous hand-rolled body
 * duplicated the section sequence with drifted tones, a `Hero variant="compact"`
 * form band and a four-column ascend grid; all of that is now the template's.
 * Copy intent preserved, metadata preserved.
 */
export const metadata: Metadata = {
  title: 'Garage Door Spring Repair',
  description:
    'Broken torsion and extension springs replaced and re-balanced by a service-area garage door team, with same-day and emergency dispatch.',
  alternates: { canonical: '/residential-garage-door-services/spring-repair' },
};

const content: ServiceInnerContent = {
  slug: 'spring-repair',
  eyebrow: 'Residential garage door service',
  heroBullets: [hours.emergency, hours.response],
  two: {
    heading: 'Signs The Spring Has Gone',
    body: 'A garage door spring carries almost the whole weight of the door. When one fails the opener is suddenly lifting a load it was never built to lift, so the symptoms show up fast and they are easy to read once you know what they look like.',
    bullets: [
      'A loud bang from the garage with nothing obviously moved',
      'A visible gap in the coil above the door',
      'The door lifts a few inches and then stops',
      'One side rising faster than the other',
      'The opener straining, juddering or reversing',
      'The door slamming down as soon as it is released',
    ],
  },
  three: {
    heading: 'How The Replacement Runs',
    body: 'We work on the door where it hangs. The door is weighed so the replacement spring is sized to it rather than guessed, the old spring is wound off under bar control, and the cables and drums are re-seated on the shaft. Balance is then checked at every point of travel by hand before the opener goes back on, and the force and safety reverse are re-set to the new weight. Springs are replaced in pairs so the door stays even on the shaft, and the hardware is tightened through before we leave.',
    bullets: [],
  },
  four: {
    heading: 'Spring Snapped? Leave The Door Down.',
    body: 'A door with a failed spring is unbalanced and can drop without warning. Stop using the opener, keep people and vehicles clear of the opening, and call us.',
  },
};

export default function Page() {
  return <ServiceInnerPage content={content} />;
}
