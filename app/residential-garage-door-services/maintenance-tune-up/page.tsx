import type { Metadata } from 'next';
import { ServiceInnerPage, type ServiceInnerContent } from '../_service-inner/ServiceInnerTemplate';
import { hours } from '@/lib/site';

/**
 * ROUTE   /residential-garage-door-services/maintenance-tune-up
 * MODE    CLONE          CLASS  service-inner
 * SOURCE  /residential-roofing-services/roof-inspection
 * COPY    ORIGINAL — structure cloned, wording is ours.
 */
export const metadata: Metadata = {
  title: 'Garage Door Maintenance & Tune-Up',
  description:
    'Scheduled garage door inspection, lubrication, balance test and hardware tightening, with same-day and emergency dispatch.',
  alternates: { canonical: '/residential-garage-door-services/maintenance-tune-up' },
};

const content: ServiceInnerContent = {
  slug: 'maintenance-tune-up',
  eyebrow: 'Residential garage door service',
  heroBullets: [hours.emergency, hours.response],
  two: {
    heading: 'What A Tune-Up Covers',
    body: 'A garage door is the heaviest moving thing in most homes and it runs on parts that loosen as they cycle. A tune-up is a pass over every one of them: what is wearing, what has worked loose, and what is about to stop the door working at an inconvenient moment.',
    bullets: [
      'Full inspection of springs, cables, drums and shaft',
      'Rollers, hinges, brackets and track fixings tightened',
      'Moving parts cleaned and lubricated',
      'Balance test with the opener disengaged',
      'Photo-eye alignment and the auto-reverse test',
      'Weather seal and track alignment checked',
    ],
  },
  three: {
    heading: 'Why Doors Get Serviced On A Schedule',
    body: 'Almost nothing on a garage door fails without warning. Cables fray a strand at a time, rollers get noisy before they seize, and a door slipping out of balance makes the opener work harder every single cycle. A scheduled look catches those while they are still small jobs: a frayed strand is spotted before the cable parts, noise is traced back to the roller, hinge or bearing actually making it, and balance is corrected so the opener is not carrying the door on its own. The safety reversal is confirmed working, and anything worth watching goes in a written note for the next visit.',
    bullets: [],
  },
  four: {
    heading: 'Book A Maintenance Visit',
    body: 'A tune-up takes one visit and leaves the door balanced, quiet and tested.',
  },
};

export default function Page() {
  return <ServiceInnerPage content={content} />;
}
