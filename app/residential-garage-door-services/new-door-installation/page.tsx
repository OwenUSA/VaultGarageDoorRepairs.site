import type { Metadata } from 'next';
import { ServiceInnerPage, type ServiceInnerContent } from '../_service-inner/ServiceInnerTemplate';
import { hours } from '@/lib/site';

/**
 * ROUTE   /residential-garage-door-services/new-door-installation
 * MODE    CLONE          CLASS  service-inner
 * SOURCE  /residential-roofing-services/new-roof-installation
 * COPY    ORIGINAL — structure cloned, wording is ours.
 */
export const metadata: Metadata = {
  title: 'New Garage Door Installation',
  description:
    'Full residential garage door installation — measured, fitted, balanced and tested on site, with same-day and emergency dispatch.',
  alternates: { canonical: '/residential-garage-door-services/new-door-installation' },
};

const content: ServiceInnerContent = {
  slug: 'new-door-installation',
  eyebrow: 'Residential garage door service',
  heroBullets: [hours.emergency, hours.response],
  two: {
    heading: 'What An Installation Covers',
    body: 'A new door is a whole system, not just the panels. The opening is measured first, because headroom, backroom and side clearance decide which track layout will actually fit. Everything behind the door is renewed with it, so the spring set is sized to the finished door rather than the old one.',
    bullets: [
      'Opening measured for headroom, backroom and side room',
      'Old door, tracks and hardware removed and taken away',
      'New tracks, brackets, rollers and hinges fitted',
      'Spring set sized to the weight of the finished door',
      'Weather seal at the floor and along the jambs',
      'Opener refitted or newly installed and set up',
    ],
  },
  three: {
    heading: 'Choosing A Door That Suits The Opening',
    body: 'Steel, timber-effect and insulated sectional doors all hang differently and weigh differently, and an attached garage behind a heated room asks for something other than a detached one. We work back from the opening and from how the garage is used, then fit what the structure will carry. Insulated or single-skin is decided by how the garage is used, the track layout is chosen around low headroom where there is not much of it, and the opener drive is matched to the door weight and the length of travel. Windows and hardware are picked to suit the elevation, and the safety sensors are set and the reversal test run before we hand the door over.',
    bullets: [],
  },
  four: {
    heading: 'Book A New Door Installation',
    body: 'Tell us the size of the opening and how the garage is used, and we will walk the options with you on site rather than over a form.',
  },
};

export default function Page() {
  return <ServiceInnerPage content={content} />;
}
