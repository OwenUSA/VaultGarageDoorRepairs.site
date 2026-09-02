/**
 * lib/site.ts — the SINGLE source of every CONSTANTS value in CLAUDE.md.
 *
 * Every fact here is FICTIONAL AND DELIBERATE (see CLAUDE.md section 0) and is
 * listed in docs/PRE-LAUNCH.md as must-replace-before-public. Nothing here may
 * be duplicated as a literal in a component, a page, metadata, alt text or
 * schema.
 *
 * Never added to this file (D-03, D-12, D-13, D-14, D-17):
 *   no electronic-mail address of any kind, and no sign-up block of any kind
 *   no reviews, testimonials, star ratings, aggregateRating
 *   no license numbers, bonded/insured or any licensing claim
 *   no prices, "starting at", figures, discounts, coupons
 *   no warranties, guarantees, certifications, awards, partnerships
 *   no years-in-business claims, job counts, technician counts
 *   no named real people, staff photos, staff bios
 */

export const site = {
  brand: 'vaultgaragedoorrepairs',
  name: 'Vault Garage Door Repairs',
  domain: 'vaultgaragedoorrepairs.site',
  url: 'https://vaultgaragedoorrepairs.site',
  vertical: 'garage door repair',
  /** CONSTANTS -> TAGLINE */
  tagline: 'Locked shut or wide open, it gets diagnosed before it gets quoted.',
  description:
    'Garage door spring repair, opener repair and installation, cable, roller and track repair, panel replacement, off-track correction, new door installation, commercial and roll-up doors, and annual maintenance.',
} as const;

/** CONSTANTS -> PHONE / ADDRESS / MAP_COORDS / SERVICE_AREA. Phone only (D-03). */
export const nap = {
  name: 'Vault Garage Door Repairs',
  phone: '(918) 555-0117',
  phoneHref: 'tel:+19185550117',
  street: '4418 Kestrel Hollow',
  locality: 'Broken Arrow',
  region: 'OK',
  postalCode: '74012',
  country: 'US',
  address: '4418 Kestrel Hollow, Broken Arrow, OK 74012',
  /** CONSTANTS -> MAP_COORDS. The address is fake; never geocode it (D-07). */
  coords: '36.0526,-95.7908',
  latitude: 36.0526,
  longitude: -95.7908,
  /** CONSTANTS -> SERVICE_AREA. The single surviving service-area sentence (D-02). */
  serviceArea: 'Serving Broken Arrow and the greater Tulsa metro.',
} as const;

/** D-08 — both maps are embedded by coordinates in a keyless iframe. */
export const maps = {
  embed: (zoom: number) => `https://www.google.com/maps?q=${nap.coords}&z=${zoom}&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${nap.coords}`,
} as const;

/** CONSTANTS -> HOURS. One block, all seven days. No 24/7 claim (D-06). */
export const hours = {
  label: '7 days, 7:00 AM - 7:00 PM',
  short: 'Open 7 days, 7am to 7pm',
  spec: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '07:00',
      closes: '19:00',
    },
  ],
} as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  /** Every service is an in-page anchor on /services. No per-service routes (D-01). */
  href: string;
};

/** CLAUDE.md pre-answered list - exactly these eight, in this order. */
export const services: readonly Service[] = [
  {
    slug: 'spring-repair',
    title: 'Spring Repair and Replacement',
    short: 'Spring Repair',
    summary:
      'Broken torsion and extension springs replaced and rebalanced so the door lifts under its own weight again.',
    href: '/services#spring-repair',
  },
  {
    slug: 'opener-repair',
    title: 'Opener Repair and Installation',
    short: 'Opener Repair',
    summary:
      'Openers, drives, safety sensors, remotes and keypads diagnosed, repaired or replaced.',
    href: '/services#opener-repair',
  },
  {
    slug: 'cable-roller-track',
    title: 'Cable, Roller and Track Repair',
    short: 'Cable / Roller / Track',
    summary:
      'Frayed lift cables, worn rollers and bent or spread track put back into alignment.',
    href: '/services#cable-roller-track',
  },
  {
    slug: 'panel-replacement',
    title: 'Panel Replacement',
    short: 'Panel Replacement',
    summary:
      'Damaged or dented sections swapped out without replacing a door that is otherwise sound.',
    href: '/services#panel-replacement',
  },
  {
    slug: 'off-track-correction',
    title: 'Off-Track and Misaligned Door Correction',
    short: 'Off-Track Correction',
    summary:
      'Doors that have jumped the track or are binding on one side reseated and squared up.',
    href: '/services#off-track-correction',
  },
  {
    slug: 'new-door-installation',
    title: 'New Residential Door Installation',
    short: 'New Door Installation',
    summary: 'Full residential installation, measured, fitted, balanced and tested on site.',
    href: '/services#new-door-installation',
  },
  {
    slug: 'commercial-roll-up',
    title: 'Commercial and Roll-Up Doors',
    short: 'Commercial and Roll-Up',
    summary:
      'Sectional, roll-up and high-cycle commercial doors serviced around the working day.',
    href: '/services#commercial-roll-up',
  },
  {
    slug: 'maintenance-tune-up',
    title: 'Annual Maintenance and Tune-Up',
    short: 'Maintenance and Tune-Up',
    summary:
      'Scheduled inspection, lubrication, balance check and hardware tightening once a year.',
    href: '/services#maintenance-tune-up',
  },
] as const;

/** ROUTES - exactly five (D-01). Adding one is out of scope. */
export type RouteRow = { path: string; label: string; priority: number };

export const routes: readonly RouteRow[] = [
  { path: '/', label: 'Home', priority: 1.0 },
  { path: '/about', label: 'About', priority: 0.8 },
  { path: '/services', label: 'Services', priority: 0.9 },
  { path: '/contact', label: 'Contact', priority: 0.8 },
  { path: '/privacy', label: 'Privacy Policy', priority: 0.3 },
] as const;

export const primaryNav = [
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
] as const;

export const footerNav = [
  { heading: 'Services', links: services.map((s) => ({ path: s.href, label: s.short })) },
  {
    heading: 'Company',
    links: [
      { path: '/about', label: 'About' },
      { path: '/services', label: 'Services' },
      { path: '/contact', label: 'Contact' },
      { path: '/privacy', label: 'Privacy Policy' },
    ],
  },
] as const;

/** D-05 - the preferred-callback-window options on the contact form. */
export const callbackWindows: readonly string[] = [
  'Morning, 7am to 11am',
  'Midday, 11am to 3pm',
  'Afternoon, 3pm to 7pm',
  'Any time today',
  'The next day that works',
] as const;

/**
 * FAQ - in-page on /services only. Generic garage-door technical content.
 * Nothing about response time, pricing, warranty or credentials.
 */
export const faqs: readonly { q: string; a: string }[] = [
  {
    q: 'Why does my garage door reverse before it reaches the floor?',
    a: 'Nine times out of ten it is the safety sensors either side of the opening - misaligned, dirty, or with a loose wire. The other common cause is a down-force setting that is too tight for a door that has lost some of its balance.',
  },
  {
    q: 'What is the difference between torsion and extension springs?',
    a: 'Torsion springs sit on a shaft above the opening and wind up as the door closes. Extension springs run along the horizontal tracks and stretch instead. Both store the energy that makes a heavy door feel light, and both are under load whether the door is up or down.',
  },
  {
    q: 'The door has become very loud. Is that a fault?',
    a: 'Noise usually points at hardware rather than the opener. Worn rollers, dry hinges, loose track bolts and an unbalanced door each have their own sound. A grinding noise from the top of the opening is worth looking at sooner rather than later.',
  },
  {
    q: 'Can one damaged panel be replaced on its own?',
    a: 'Often yes, if the rest of the door is straight and the section is still made in a matching profile. Where the door has taken a hit hard enough to twist the struts or the track, replacing the section alone will not hold.',
  },
  {
    q: 'How often should a garage door be serviced?',
    a: 'Once a year for a door in normal residential use, and more often for a door cycled several times a day. A service is an inspection, a lubrication, a balance check and a re-torque of the hardware that vibration loosens.',
  },
  {
    q: 'Is it safe to keep using a door with a broken spring?',
    a: 'No. With a spring broken the opener is lifting the full weight of the door, which is what bends track, snaps cables and burns out a motor. Leave the door down and disengage the opener until it has been looked at.',
  },
] as const;
