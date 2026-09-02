/**
 * lib/site.ts — the SINGLE source of every CONFIG FACTS value.
 *
 * Every row in CLAUDE.md CONFIG FACTS is authoritative and must appear
 * identically everywhere it appears. Nothing here may be duplicated as a
 * literal in a component, a page, a metadata block, an alt text or schema.
 *
 * Nothing in CONFIG FORBIDDEN may ever be added to this file:
 *   no reviews, testimonials, star ratings, aggregateRating
 *   no license numbers, bonded/insured or any licensing claim
 *   no price claims, "starting at", figures, discounts, coupons
 *   no warranties, guarantees, "satisfaction guaranteed"
 *   no certifications, manufacturer authorizations, partnerships, awards
 *   no years-in-business claims, job counts, technician counts
 *   no named real people, staff photos, staff bios
 */

export const site = {
  brand: 'vaultgaragedoorrepairs',
  name: 'Vault Garage Door Repairs',
  domain: 'vaultgaragedoorrepairs.site',
  url: 'https://vaultgaragedoorrepairs.site',
  vertical: 'garage door repair',
  tagline: 'Garage door repair, installation and maintenance.',
  description:
    'Garage door spring repair, opener repair and installation, off-track and cable repair, panel replacement, new door installation and routine maintenance. Same-day and emergency dispatch, 24/7.',
} as const;

/** CONFIG FACTS -> nap. Placeholder. Service-area only — never a street address. */
export const nap = {
  name: 'Vault Garage Door Repairs',
  phone: '(555) 010-0199',
  phoneHref: 'tel:+15550100199',
  email: 'service@vaultgaragedoorrepairs.site',
  /** Single service-area business. No storefront address is shown, anywhere. */
  hasStorefront: false,
  serviceAreaOnly: true,
  locality: 'City',
  region: 'State',
  country: 'US',
} as const;

/** CONFIG FACTS -> hours */
export const hours = {
  emergency: '24/7 emergency service, 7 days a week',
  office: 'Office Mon-Sat 8am-6pm',
  /** CONFIG FACTS -> response */
  response: 'Same-day and emergency dispatch',
  officeSpec: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '18:00' },
  ],
} as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  /** Route this service is reachable at. Some are folded, per the gate ruling. */
  href: string;
};

/**
 * CONFIG FACTS -> services. Exactly six. Nothing may be added here that is not
 * in CONFIG FACTS, and no service may be invented to fill a layout slot.
 *
 * Gate ruling: opener repair has no route of its own (row 25 was dropped). It is
 * folded into /residential-garage-door-services and stays reachable there.
 */
export const services: readonly Service[] = [
  {
    slug: 'spring-repair',
    title: 'Garage Door Spring Repair',
    short: 'Spring Repair',
    summary:
      'Broken torsion and extension springs replaced so the door lifts under its own balance again.',
    href: '/residential-garage-door-services/spring-repair',
  },
  {
    slug: 'opener-repair',
    title: 'Opener Repair & Installation',
    short: 'Opener Repair & Installation',
    summary:
      'Diagnosis, repair and installation of garage door openers, drives, sensors and remotes.',
    href: '/residential-garage-door-services#opener-repair',
  },
  {
    slug: 'off-track-cable-repair',
    title: 'Off-Track & Cable Repair',
    short: 'Off-Track / Cable Repair',
    summary:
      'Doors that have jumped the track or snapped a lift cable, realigned and re-cabled.',
    href: '/residential-garage-door-services/off-track-cable-repair',
  },
  {
    slug: 'panel-replacement',
    title: 'Panel Replacement',
    short: 'Panel Replacement',
    summary:
      'Damaged or dented sections swapped out without replacing the whole door.',
    href: '/residential-garage-door-services/panel-replacement',
  },
  {
    slug: 'new-door-installation',
    title: 'New Door Installation',
    short: 'New Door Installation',
    summary:
      'Full garage door installation, measured, fitted, balanced and tested on site.',
    href: '/residential-garage-door-services/new-door-installation',
  },
  {
    slug: 'maintenance-tune-up',
    title: 'Routine Maintenance & Tune-Up',
    short: 'Maintenance & Tune-Up',
    summary:
      'Scheduled inspection, lubrication, balance and hardware tightening to keep a door running.',
    href: '/residential-garage-door-services/maintenance-tune-up',
  },
] as const;

/**
 * The resolved 17-row route table (docs/05-route-map.md).
 * sitemap.ts and the nav both read from here — one source, no drift.
 */
export type RouteRow = {
  path: string;
  label: string;
  mode: 'CLONE' | 'SYNTHESIZE';
  templateClass: 'home' | 'service-outer' | 'service-inner' | 'form-page' | 'generic-content';
  priority: number;
};

export const routes: readonly RouteRow[] = [
  { path: '/', label: 'Home', mode: 'CLONE', templateClass: 'home', priority: 1.0 },
  { path: '/emergency-garage-door-repair', label: 'Emergency Repair', mode: 'CLONE', templateClass: 'service-outer', priority: 0.9 },
  { path: '/residential-garage-door-services', label: 'Residential Services', mode: 'CLONE', templateClass: 'service-outer', priority: 0.9 },
  { path: '/residential-garage-doors', label: 'Residential Doors', mode: 'CLONE', templateClass: 'service-outer', priority: 0.8 },
  { path: '/residential-garage-door-services/maintenance-tune-up', label: 'Maintenance & Tune-Up', mode: 'CLONE', templateClass: 'service-inner', priority: 0.7 },
  { path: '/residential-garage-door-services/spring-repair', label: 'Spring Repair', mode: 'CLONE', templateClass: 'service-inner', priority: 0.7 },
  { path: '/residential-garage-door-services/panel-replacement', label: 'Panel Replacement', mode: 'CLONE', templateClass: 'service-inner', priority: 0.7 },
  { path: '/residential-garage-door-services/new-door-installation', label: 'New Door Installation', mode: 'CLONE', templateClass: 'service-inner', priority: 0.7 },
  { path: '/residential-garage-door-services/off-track-cable-repair', label: 'Off-Track & Cable Repair', mode: 'CLONE', templateClass: 'service-outer', priority: 0.7 },
  { path: '/commercial-garage-door-services', label: 'Commercial Services', mode: 'CLONE', templateClass: 'service-outer', priority: 0.9 },
  { path: '/commercial-garage-door-services/inspection', label: 'Commercial Inspection', mode: 'CLONE', templateClass: 'service-inner', priority: 0.7 },
  { path: '/commercial-garage-door-services/repair', label: 'Commercial Repair', mode: 'CLONE', templateClass: 'service-inner', priority: 0.7 },
  { path: '/commercial-garage-door-services/maintenance-program', label: 'Maintenance Program', mode: 'CLONE', templateClass: 'service-outer', priority: 0.7 },
  { path: '/contact', label: 'Contact', mode: 'SYNTHESIZE', templateClass: 'form-page', priority: 0.8 },
  { path: '/service-areas', label: 'Service Areas', mode: 'SYNTHESIZE', templateClass: 'generic-content', priority: 0.6 },
  { path: '/faqs', label: 'FAQs', mode: 'SYNTHESIZE', templateClass: 'generic-content', priority: 0.5 },
  { path: '/privacy-policy', label: 'Privacy Policy', mode: 'SYNTHESIZE', templateClass: 'generic-content', priority: 0.3 },
] as const;

/** Primary navigation. Subset of `routes`, ordered for the header. */
export const primaryNav = [
  { path: '/residential-garage-door-services', label: 'Residential' },
  { path: '/commercial-garage-door-services', label: 'Commercial' },
  { path: '/residential-garage-doors', label: 'Doors' },
  { path: '/emergency-garage-door-repair', label: 'Emergency' },
  { path: '/service-areas', label: 'Service Areas' },
  { path: '/faqs', label: 'FAQs' },
  { path: '/contact', label: 'Contact' },
] as const;

export const footerNav = [
  {
    heading: 'Services',
    links: services.map((s) => ({ path: s.href, label: s.short })),
  },
  {
    heading: 'Company',
    links: [
      { path: '/service-areas', label: 'Service Areas' },
      { path: '/faqs', label: 'FAQs' },
      { path: '/contact', label: 'Contact' },
      { path: '/privacy-policy', label: 'Privacy Policy' },
    ],
  },
  {
    heading: 'Commercial',
    links: [
      { path: '/commercial-garage-door-services', label: 'Commercial Services' },
      { path: '/commercial-garage-door-services/inspection', label: 'Inspection' },
      { path: '/commercial-garage-door-services/repair', label: 'Repair' },
      { path: '/commercial-garage-door-services/maintenance-program', label: 'Maintenance Program' },
    ],
  },
] as const;

/**
 * Service areas. Placeholder locality names — CONFIG nap is `placeholder` and a
 * single service-area business, so these are generic until the client supplies
 * real ones. No street address is implied by any of them.
 */
export const serviceAreas: readonly string[] = [
  'Downtown',
  'North Side',
  'South Side',
  'East End',
  'West End',
  'Riverside',
  'Highland Park',
  'Oak Ridge',
  'Fairview',
  'Lakeside',
  'Brookfield',
  'Meadowbrook',
] as const;

export const faqs: readonly { q: string; a: string }[] = [
  {
    q: 'Do you offer emergency garage door service?',
    a: `${hours.emergency}. ${hours.response} is available when a door is stuck, off-track or will not secure.`,
  },
  {
    q: 'What are your office hours?',
    a: `${hours.office}. Emergency dispatch runs outside those hours, every day.`,
  },
  {
    q: 'Which garage door problems do you handle?',
    a: 'Spring repair, opener repair and installation, off-track and cable repair, panel replacement, new door installation, and routine maintenance and tune-ups.',
  },
  {
    q: 'Do you have a showroom I can visit?',
    a: 'No. We are a service-area business and work on site at your property rather than from a storefront.',
  },
  {
    q: 'How soon can someone come out?',
    a: `${hours.response}. Call ${nap.phone} and we will book the earliest slot available.`,
  },
  {
    q: 'Can a single damaged panel be replaced?',
    a: 'Often yes. Panel replacement swaps the damaged section rather than the whole door where the rest of the door is sound.',
  },
] as const;
