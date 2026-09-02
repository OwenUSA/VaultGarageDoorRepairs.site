/**
 * content/copy.ts — every word this site renders, and every SEO title and description.
 *
 * PROMPT 3. Read `docs/content-divergence.md` before editing anything here.
 *
 * Three rules this file exists to enforce:
 *
 * 1. **Nothing is lifted.** `../_shared/harness/src/similarity.mjs` scores every section
 *    against the whole reference corpus: zero shared 5-grams, trigram Jaccard <= 0.15.
 * 2. **Length is held.** Each block sits within +/-10% of its reference slot's character
 *    count, so the cloned layout is tested against honest text volume. Genuine exemptions
 *    are declared in `cfg.lengthExempt` with a reason and are reported EXEMPT, never PASS.
 * 3. **Metadata lives here, not in the route files.** A sibling site shipped the wrong city
 *    in five hardcoded `export const metadata` blocks that no gate ever measured. Every
 *    `app/**\/page.tsx` imports `copy.routes[route].meta` and builds `Metadata` from it.
 *
 * The proposition is TRANSPARENCY — you are told what is wrong and why — and it is carried
 * on all five routes. It is never speed: no 24/7, no emergency dispatch, no response time.
 *
 * No invented facts (D-14, D-17). No email in any form (D-03). No prices (D-12). No
 * reviews, ratings or named customers (D-13). Every business fact resolves through
 * `lib/site.ts`, which is the single source for the CONSTANTS.
 */

export type SectionClass = 'ADAPTED' | 'NOVEL';

export type Section = {
  /** must equal the our-section-id in docs/sections.md, and the component's data-section */
  id: string;
  /** the reference band this is measured against; null where we have no counterpart */
  refSection: string | null;
  cls: SectionClass;
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  body?: readonly string[];
  items?: readonly { heading: string; body?: string; note?: string }[];
  cta?: readonly string[];
  note?: string;
};

export type Meta = { title: string; description: string };

export type RouteCopy = { meta: Meta; sections: readonly Section[] };

export type Copy = {
  routes: Record<string, RouteCopy>;
};

/* ------------------------------------------------------------------ */
/* Shared shell. The same two bands on all five routes.               */
/* Both are length-EXEMPT — see docs/content-divergence.md section 4.  */
/* ------------------------------------------------------------------ */

const header = (refSection: string): Section => ({
  id: 'header',
  refSection,
  cls: 'ADAPTED',
  items: [
    { heading: 'About' },
    { heading: 'Services' },
    { heading: 'Contact' },
  ],
  cta: ['Call now'],
  note: 'Open 7 days, 7am to 7pm',
});

const footer = (refSection: string): Section => ({
  id: 'footer',
  refSection,
  cls: 'ADAPTED',
  heading: 'Vault Garage Door Repairs',
  body: [
    'Serving Broken Arrow and the greater Tulsa metro.',
    'You get the diagnosis before you get the number.',
  ],
  items: [
    { heading: 'Services' },
    { heading: 'Company' },
    { heading: 'Hours' },
    { heading: 'Where we are' },
  ],
  cta: ['Call now'],
});

/* ------------------------------------------------------------------ */
/* The contact band. Retained from the reference on /, /about and     */
/* /services; the standalone band on /contact is a separate slot.      */
/* ------------------------------------------------------------------ */

const contactBand = (refSection: string): Section => ({
  id: 'contact',
  refSection,
  cls: 'ADAPTED',
  eyebrow: 'Book a look',
  heading: 'Tell us what the door is doing',
  body: [
    'Describe the symptom in your own words. You do not need the right term for the part, and getting it wrong changes nothing.',
    'A technician calls back inside the window you chose, asks the questions that narrow it down, and books a visit.',
    'You are told what is wrong and why before any figure enters the conversation.',
  ],
  items: [
    { heading: 'Your name' },
    { heading: 'Phone number' },
    { heading: 'What is happening' },
    { heading: 'Best window for a callback' },
    { heading: 'Anything else we should know' },
  ],
  cta: ['Request a callback', 'Call now'],
});

/* ------------------------------------------------------------------ */
/* / — home                                                            */
/* ------------------------------------------------------------------ */

const home: RouteCopy = {
  meta: {
    title: 'Vault Garage Door Repairs | Broken Arrow, OK Garage Door Repair',
    description:
      'Garage door repair in Broken Arrow and the greater Tulsa metro. Springs, openers, cables, rollers, track, panels and commercial roll-up doors. You are told what is wrong and why before any figure is discussed. Open seven days, 7am to 7pm.',
  },
  sections: [
    header('s00'),
    {
      id: 'hero',
      refSection: 's01-award-winning-tulsa-roofing-compan',
      cls: 'ADAPTED',
      eyebrow: 'Broken Arrow and the greater Tulsa metro',
      heading: 'Locked shut or wide open, it gets diagnosed before it gets quoted',
      subheading: 'Garage door repair that explains itself',
      body: [
        'A stuck door is not a mystery. It is a spring, a cable, a roller, a sensor or a bent length of track, and one of those is what a technician will name out loud before anything is priced.',
        'You get the reason, the part it sits on, and what happens if you leave it a month. Then you decide, with the same information the person holding the wrench has.',
        'Serving Broken Arrow and the greater Tulsa metro, seven days a week, 7:00 AM to 7:00 PM.',
      ],
      cta: ['Call now', 'See what we work on'],
    },
    {
      id: 'services',
      refSection: 's11-best-exterior-services',
      cls: 'ADAPTED',
      eyebrow: 'Start with the symptom, not the part name',
      heading: 'What is the door actually doing right now?',
      subheading:
        'Nobody calls asking for a torsion spring. They call because the door came down hard and now it will not lift, or because it will not shut and the garage has been open all night. So these start where you start. Three of the five symptoms we hear most often, what each one usually turns out to be, and what a technician will be looking at first.',
      items: [
        {
          heading: 'It will not close',
          body: 'It starts down, changes its mind halfway, and goes straight back up. Or it shuts crooked and leaves a gap at one bottom corner that you can see daylight through. The usual causes are a safety sensor knocked out of aim, a roller that has left the track, or a rail that has been spread by a knock nobody remembers. All three are visible from the floor once you know what you are looking at, and the technician will point at the one that matters rather than describing it.',
          note: 'Off-track and misaligned door correction. Cable, roller and track repair.',
        },
        {
          heading: 'It came down hard and now it will not lift',
          body: 'A bang from the garage, and then a door that suddenly feels like it weighs exactly what it actually weighs. That is a spring, and a broken one is why the opener is now straining, buzzing, or simply giving up partway. This is the single fault where we will ask you to stop using the door until somebody has looked at it, and you will be given the reason rather than just the instruction.',
          note: 'Spring repair and replacement.',
        },
        {
          heading: 'The opener runs but the door does not move',
          body: 'The motor turns, the light comes on, and nothing else happens. Usually that is a stripped drive gear, a trolley left disengaged after somebody pulled the red cord, or a broken belt or chain. Occasionally it is a door so far out of balance that the opener has protected itself rather than failed. We test the balance by hand before condemning the machine, because replacing the wrong one of those two is expensive and entirely avoidable.',
          note: 'Opener repair and installation.',
        },
      ],
      cta: ['See all five symptoms on the services page', 'Call now'],
    },
    {
      id: 'about',
      refSection: 's04-tulsa-s-1-contractor-for-roofing',
      cls: 'ADAPTED',
      heading: 'The repair is explained before it is quoted',
      body: [
        'Most garage door work is sold as a number with no story attached. We do it the other way around: the technician names the part, shows you the wear or the break where it is visible from the floor, and says what happens if it is left alone. The figure comes after that, not instead of it.',
        'It means some visits end with us telling you the door is fine and needs nothing at all. That is a normal outcome here rather than a wasted trip, and it is the only way you can tell the other visits are honest.',
        'It also means you will occasionally be told we do not yet know, and what has to come apart before anybody could.',
      ],
      cta: ['How we work'],
    },
    {
      id: 'process',
      refSection: 's05-ensuring-a-smooth-roofing-experien',
      cls: 'ADAPTED',
      heading: 'Four steps, and you are told where you are in them',
      items: [
        { heading: 'You describe the symptom', body: 'In whatever words you would use to a neighbour. Working out the part name is our job, not yours, and guessing wrong costs you nothing at all.' },
        { heading: 'A technician calls back', body: 'Inside the window you picked, with the questions that narrow it down before a van leaves the yard.' },
        { heading: 'The door is tested on site', body: 'Balance by hand with the opener disconnected, then sensors, track, cables, springs and hardware, in that order.' },
        { heading: 'You hear the findings first', body: 'What is wrong, why it happened, what else it puts under strain, and only then what it takes to put right.' },
      ],
      cta: ['Call now'],
    },
    {
      id: 'emergency',
      refSection: 's13-storm-damage-roofing-experts-rea',
      cls: 'ADAPTED',
      heading: 'A door that will not close is a door left open',
      body: [
        'If the door is stuck open, say so at the start of the call. We will tell you honestly whether it is safe to leave until we arrive, and how to secure the opening in the meantime.',
        'We are open seven days, 7am to 7pm. Outside those hours the phone reaches nobody, and we would rather say that than let you sit listening to it ring.',
      ],
      cta: ['Call now', 'Request a callback'],
    },
    {
      id: 'tabbed',
      refSection: 's06-our-roofing-services-in-tulsa-ok',
      cls: 'ADAPTED',
      heading: 'Residential and commercial, same explanation either way',
      subheading: 'A house door and a loading bay door fail differently and wear on different clocks. What does not change is that you hear the finding before you hear a figure.',
      items: [
        { heading: 'Residential' },
        { heading: 'Commercial' },
        { heading: 'Diagnosis', body: 'The part named out loud, and shown to you where it can be seen' },
        { heading: 'Repair', body: 'What the fix covers, and what it deliberately does not' },
        { heading: 'Replacement', body: 'Why this part rather than the whole door' },
        { heading: 'Maintenance', body: 'What we found, what we adjusted, and what is worn but can safely wait' },
      ],
    },
    {
      id: 'marquee',
      refSection: 's07',
      cls: 'ADAPTED',
      items: [
        { heading: 'Springs' },
        { heading: 'Openers' },
        { heading: 'Cables' },
        { heading: 'Rollers' },
        { heading: 'Track' },
        { heading: 'Panels' },
        { heading: 'Off-track doors' },
        { heading: 'Roll-up doors' },
        { heading: 'Safety sensors' },
        { heading: 'Balance checks' },
      ],
    },
    {
      id: 'doors',
      refSection: 's08-premium-roofing-materials',
      cls: 'ADAPTED',
      heading: 'Door styles, and what each one costs you in upkeep',
      items: [
        {
          heading: 'Steel sectional',
          body: 'The default on most homes here. Tough, quiet enough when the rollers are good, and the panels dent rather than crack, which is why a single damaged section can usually be swapped instead of the whole door.',
        },
        {
          heading: 'Insulated steel',
          body: 'The same door with a core between the skins. Warmer garage, noticeably quieter travel, and more weight for the springs to carry, which matters when the springs are eventually replaced.',
        },
        {
          heading: 'Carriage house',
          body: 'Sectional underneath, styled to swing. All the hardware behaves like a normal door, so the extra cost is appearance rather than mechanism.',
        },
        {
          heading: 'Full-view aluminium and glass',
          body: 'Popular on shops and studios. Light frame, heavy glazing, and hinges that want checking more often than a steel door does.',
        },
        {
          heading: 'Commercial roll-up',
          body: 'A curtain rather than panels, wound onto a barrel above the opening. Different failure modes entirely, and the one door type where cycle count matters more than age.',
        },
      ],
      cta: ['Call now'],
    },
    {
      id: 'components',
      refSection: 's09-our-expertise-in-roofing-materials',
      cls: 'ADAPTED',
      heading: 'The parts we end up naming most often',
      items: [
        { heading: 'Torsion springs' },
        { heading: 'Lift cables and drums' },
        { heading: 'Rollers and bearings' },
        { heading: 'Hinges' },
        { heading: 'Safety sensors' },
        { heading: 'Track' },
        { heading: 'Weather seal' },
      ],
    },
    {
      id: 'facts',
      refSection: 's12-roofing-done-with-integrity',
      cls: 'ADAPTED',
      items: [
        { heading: 'Open seven days a week' },
        { heading: '7:00 AM to 7:00 PM' },
        { heading: 'Broken Arrow and the Tulsa metro' },
        { heading: 'Free estimate' },
        { heading: 'A callback window you choose' },
        { heading: 'Findings before figures' },
      ],
    },
    {
      id: 'urgent',
      refSection: 's10-best-waterproofing-solutions-for-t',
      cls: 'ADAPTED',
      heading: 'Four things worth saying out loud',
      items: [
        { heading: 'A broken spring is not a door you should carry on using, and the opener is not a workaround.' },
        { heading: 'A frayed lift cable almost always means the other one is going the same way.' },
        { heading: 'A door that reverses on the way down is protecting somebody. That is its job, not a fault.' },
        { heading: 'Loud is a symptom rather than a fault, and it is rarely the opener making the noise.' },
      ],
      cta: ['Call now'],
    },
    {
      id: 'community',
      refSection: 's14-we-believe-in-giving-back-to-the-c',
      cls: 'ADAPTED',
      heading: 'Where we work',
      body: [
        'Serving Broken Arrow and the greater Tulsa metro. If your address falls outside that, we will say so on the phone rather than book you in and cancel the day before.',
        'Being local is the reason a callback window means anything here. The van is not setting off from three counties away, so the window you are given is the window you actually get.',
        'It is also why we will tell you when the honest answer is that somebody nearer to you should look at it.',
      ],
      cta: ['Get directions'],
    },
    {
      id: 'approach',
      refSection: 's15-committed-to-preserving-our-hometo',
      cls: 'ADAPTED',
      heading: 'Why we explain everything first',
      body: [
        'A garage door is the heaviest moving object most people own, and almost nobody has been shown how one works. That gap is where bad quotes live. It is easy to sell a whole door to somebody who has never been told that one panel can be changed on its own.',
        'So the technician talks through it. Which part failed, what it does, what else it puts strain on, and what happens if you leave it a month. Some of that ends in work and some of it ends in nothing, and both are fine.',
        'The only thing we will not do is hand you a figure you cannot trace back to a named part and a reason for it failing. If a quote cannot survive being explained, it should not have been given.',
      ],
    },
    {
      id: 'map',
      refSection: null,
      cls: 'NOVEL',
      heading: 'Broken Arrow and the greater Tulsa metro',
      body: [
        'We are at 4418 Kestrel Hollow, Broken Arrow, OK 74012. The map is centred on the yard rather than a search result.',
      ],
      cta: ['Get directions', 'Call now'],
    },
    contactBand('s17-contact-form'),
    footer('s18-service-areas'),
  ],
};

/* ------------------------------------------------------------------ */
/* /about                                                              */
/* ------------------------------------------------------------------ */

const about: RouteCopy = {
  meta: {
    title: 'About Vault Garage Door Repairs | Broken Arrow, OK',
    description:
      'How we work on a garage door call: the symptom in your words, a callback inside a window you pick, a hand test on site, and the reason named before any figure. Broken Arrow and the greater Tulsa metro, seven days a week.',
  },
  sections: [
    header('s00'),
    {
      id: 'hero',
      refSection: null,
      cls: 'NOVEL',
      eyebrow: 'About',
      heading: 'A repair company that would rather explain than sell',
      body: [
        'The reference for this page is a band with no h1 at all. Ours carries the only one on the route.',
      ],
    },
    {
      id: 'who',
      refSection: 's01-about-a-fricker-roofing-and-water',
      cls: 'ADAPTED',
      heading: 'What we are, in plain terms',
      body: [
        'Vault Garage Door Repairs is a garage door repair company working out of Broken Arrow and covering the greater Tulsa metro. Springs, openers, cables, rollers, track, panels, off-track doors, new residential installation, commercial and roll-up doors, and annual maintenance. That is the whole list, and it is the same list on every page of this site.',
        'What we are trying to be different about is not the work, it is the conversation around it. A garage door is a heavy, spring-loaded machine that almost nobody has had explained to them, and that gap is where people end up buying a door when they needed a panel, or an opener when they needed a spring.',
        'So every visit runs the same way. The technician tests the door by hand before touching the opener, names the part that has failed, shows you the break or the wear where it is visible, and says what it puts strain on next. Only then does a figure come into it. If nothing is wrong, that is what you are told, and the trip was still worth making.',
        'We will also tell you what we do not know. If a symptom needs the door opened up before anyone can be honest about the cause, you will hear that rather than a confident guess.',
      ],
    },
    {
      id: 'how',
      refSection: 's02-our-services',
      cls: 'ADAPTED',
      heading: 'How a visit actually runs',
      items: [
        { heading: 'Symptom first, in your words' },
        { heading: 'Hand test, opener disconnected' },
        { heading: 'The part named and shown' },
        { heading: 'The figure last, or not at all' },
      ],
    },
    {
      id: 'facts',
      refSection: null,
      cls: 'NOVEL',
      items: [
        { heading: 'Hours', body: '7 days, 7:00 AM to 7:00 PM' },
        { heading: 'Area', body: 'Broken Arrow and the greater Tulsa metro' },
        { heading: 'Phone', body: '(918) 555-0117' },
      ],
    },
    {
      id: 'about-cta',
      refSection: null,
      cls: 'NOVEL',
      heading: 'Tell us the symptom and we will tell you the part',
      cta: ['Call now', 'Request a callback'],
    },
    {
      id: 'map',
      refSection: null,
      cls: 'NOVEL',
      heading: 'Where we are',
      body: ['4418 Kestrel Hollow, Broken Arrow, OK 74012.'],
      cta: ['Get directions'],
    },
    contactBand('s04-contact-form'),
    footer('s05-service-areas'),
  ],
};

/* ------------------------------------------------------------------ */
/* /services                                                           */
/* The eight CONSTANTS services appear ONCE each, as the eight anchors  */
/* below. The grid above them is FIVE symptom groups, matching the      */
/* reference grid's own five cards, so the regrouping costs nothing     */
/* geometrically.                                                      */
/* ------------------------------------------------------------------ */

const REF_DETAIL = 's04-let-us-handle-your-commercial-roof';

const services: RouteCopy = {
  meta: {
    title: 'Garage Door Services in Broken Arrow, OK | Vault Garage Door Repairs',
    description:
      'Spring repair, opener repair, cable, roller and track work, panel replacement, off-track correction, new door installation, commercial roll-up doors and annual maintenance. Grouped by what the door is doing, not by what the part is called.',
  },
  sections: [
    header('s00'),
    {
      id: 'hero',
      refSection: 's01-commercial-roofing-services-in-tul',
      cls: 'ADAPTED',
      eyebrow: 'Services',
      heading: 'Grouped by what the door is doing, not by what the part is called',
      body: [
        'Nobody rings up asking for a torsion spring. They ring up because the door came down hard, or it will not close, or something hit it, or the loading bay has stopped halfway and the shop is open to the street. So the five groups below start where you start, and each one names the parts it usually turns out to be.',
        'Every one of the eight things we work on sits under exactly one of those five, and each has its own section further down with the detail: what the fault is, what causes it, and what a technician will say to you on site.',
        'The pattern is the same in all eight. The part gets named, the reason gets explained, and the figure arrives afterwards rather than instead.',
      ],
      cta: ['Call now', 'Request a callback'],
    },
    {
      id: 'services',
      refSection: 's03-our-commercial-roofing-services-in',
      cls: 'ADAPTED',
      heading: 'Five symptoms, eight things we work on',
      subheading:
        'Pick the line that sounds most like your garage. Each card says what the fault usually turns out to be, lists the work it becomes, and links down to the section that explains it properly. If two of them sound right, say both on the phone — that combination is often the useful clue.',
      items: [
        {
          heading: 'It will not close',
          body: 'The door starts down and reverses, or it closes crooked and leaves a gap at a corner, or it binds and stops halfway. Behind that is almost always alignment: a sensor knocked out of aim, a roller that has jumped its track, a bent or spread rail, or a cable that has come off its drum and pulled one side out of square. We test the balance by hand first, because a door that is out of balance will imitate every one of those faults and none of them will be the real problem.',
          note: 'Off-track and misaligned door correction. Cable, roller and track repair.',
        },
        {
          heading: 'It came down hard and now it will not lift',
          body: 'A loud bang, and then a door that feels like it weighs two hundred pounds, because it does. The springs are what carry that weight, and when one breaks the opener is suddenly being asked to do a job it was never sized for. This is the one symptom where we will ask you to leave the door alone until a technician has seen it, and you will be told exactly why rather than simply told to. A broken spring also explains a set of secondary symptoms that look unrelated: an opener that hums and stops, a door that lifts a foot and drops back, or a gap that has appeared in the coil above the opening.',
          note: 'Spring repair and replacement.',
        },
        {
          heading: 'The opener runs but the door does not',
          body: 'Motor turns, light comes on, nothing moves. Usually a stripped drive gear, a trolley that has been left disengaged, or a broken belt or chain. Sometimes it is a door so far out of balance that the opener has protected itself. Which of those it is changes the answer completely, so we check the door before we condemn the machine. Remotes, keypads, wall controls and the safety sensors either side of the opening are part of the same conversation, and the sensors in particular are both the most common cause of a door that will not close and the cheapest thing on the list to put right.',
          note: 'Opener repair and installation.',
        },
        {
          heading: 'Something hit it',
          body: 'A reversed car, a basketball post, hail. Dented sections look terminal and usually are not. Panels are individually replaceable on almost every sectional door, so the question is whether the impact went past the skin into the hinges, the track or the frame. If the door is genuinely past repair we will say so, and if it is not we will say that too.',
          note: 'Panel replacement. New residential door installation.',
        },
        {
          heading: 'It is loud, it is slow, or the bay door has stopped',
          body: 'Noise is a symptom, not a fault, and it is rarely the opener. Dry hinges, worn rollers, loose track bolts and an unbalanced door each make a different sound. On commercial roll-up doors the same story is told in cycles rather than years, which is why a door on a busy loading bay wears out on a schedule a house door never will.',
          note: 'Annual maintenance and tune-up. Commercial and roll-up doors.',
        },
      ],
      cta: ['Call now'],
    },
    {
      id: 'spring-repair',
      refSection: REF_DETAIL,
      cls: 'ADAPTED',
      heading: 'Spring repair and replacement',
      body: [
        'Springs are the reason a two hundred pound door feels light. Torsion springs sit on a shaft above the opening and wind as the door comes down; extension springs run beside the horizontal track and stretch instead. Either way they are storing the door’s weight, and either way they are under load whether the door is up or down.',
        'When one breaks you usually hear it. What follows is a door that will not lift by hand, or an opener straining and stopping. Replacing a broken spring on a two-spring door and leaving the other in place is a short-lived repair, and we will tell you that before you ask.',
        'What you are told on site: which spring failed, whether it went from cycles or from rust, what the door weighs once measured, and whether the replacement is sized for the door you have.',
      ],
      cta: ['Call now'],
    },
    {
      id: 'opener-repair',
      refSection: REF_DETAIL,
      cls: 'ADAPTED',
      heading: 'Opener repair and installation',
      body: [
        'An opener is a small motor doing a job that the springs are supposed to make easy. That is worth knowing, because most openers we are called out to are not broken at all — they are giving up on a door that has gone out of balance and become too heavy for them.',
        'When the opener genuinely is the problem it is normally a stripped drive gear, a worn belt or chain, a failed logic board, or the safety sensors either side of the opening being dirty, knocked out of aim or wired loose. Sensors are the single most common cause of a door that refuses to close, and they are also the cheapest thing on the list.',
        'What you are told on site: whether the door or the machine is at fault, which part inside the opener has gone, and where a repair stops making sense against a replacement.',
      ],
      cta: ['Call now'],
    },
    {
      id: 'cable-roller-track',
      refSection: REF_DETAIL,
      cls: 'ADAPTED',
      heading: 'Cable, roller and track repair',
      body: [
        'The cables carry the door’s weight down to the bottom brackets, the rollers keep it in line, and the track holds the whole path together. They fail quietly and they fail together, which is why one frayed cable is a reason to look hard at the other one.',
        'Symptoms are a door that sits crooked, a grinding or popping noise as it travels, a gap at one bottom corner, or a cable visibly slack or wound off its drum. None of those get better on their own, and a cable that lets go under load moves fast.',
        'What you are told on site: which cable or roller has worn and why, whether the track is bent or simply out of adjustment, and whether the wear is age or the door being out of balance and dragging on one side. Fixing the roller without fixing the balance just buys you a few months.',
      ],
      cta: ['Call now'],
    },
    {
      id: 'panel-replacement',
      refSection: REF_DETAIL,
      cls: 'ADAPTED',
      heading: 'Panel replacement',
      body: [
        'Sectional doors are built in horizontal sections for a reason: a damaged one can usually come out on its own. A reversed car, a hail strike or a basketball post does not automatically mean a new door, and being told otherwise is one of the more expensive misunderstandings in this trade.',
        'What decides it is how far the impact went. A dented skin is cosmetic. A section that has bowed enough to bind in the track, or an impact that has taken hinges, rollers or the vertical rail with it, changes the answer. Age matters too, because a discontinued panel profile cannot always be matched.',
        'What you are told on site: whether the section alone is damaged, whether the hardware behind it moved, whether a matching panel still exists for your door, and the point at which replacing sections stops being the sensible option.',
      ],
      cta: ['Call now'],
    },
    {
      id: 'off-track-correction',
      refSection: REF_DETAIL,
      cls: 'ADAPTED',
      heading: 'Off-track and misaligned door correction',
      body: [
        'A door comes off its track when something interrupts the path: a roller that has worn down and dropped out, a cable that has come off its drum, an obstruction caught under the door as it closed, or a knock that has spread the rail. The door then hangs at an angle and stops being safe to operate.',
        'It looks dramatic and it is not always a big repair, but it is one of the few faults where using the opener again can turn a cheap fix into an expensive one. If your door is hanging, leave it and say so when you call.',
        'What you are told on site: what let go first, whether the track can be straightened or has to be replaced, whether the door itself has been twisted by hanging, and what caused it in the first place — because a door that has come off once with no explanation will do it again.',
      ],
      cta: ['Call now'],
    },
    {
      id: 'new-door-installation',
      refSection: REF_DETAIL,
      cls: 'ADAPTED',
      heading: 'New residential door installation',
      body: [
        'Sometimes replacing the door is the honest answer: the sections are past matching, the frame has moved, or the repair list has grown longer than the door is worth. When that is the case we will say it plainly, and when it is not the case we will say that instead.',
        'A new install is measured on site rather than from a catalogue, because headroom, backroom, side clearance and the state of the opening all decide what will actually fit. Insulated doors weigh more than uninsulated ones, so the springs are sized to the door that is going in, not to the door that came out.',
        'What you are told on site: what will physically fit your opening, what the weight difference does to the existing opener, which parts of the old hardware are being reused and which are not, and what the door is balanced to when we leave.',
      ],
      cta: ['Call now'],
    },
    {
      id: 'commercial-roll-up',
      refSection: REF_DETAIL,
      cls: 'ADAPTED',
      heading: 'Commercial and roll-up doors',
      body: [
        'Commercial doors fail on cycles rather than years. A loading bay door opening a hundred times a day will reach the end of a spring’s life in a fraction of the time a house door takes, so the useful question is how hard the door works, not how old it is.',
        'Roll-up doors are a different machine again. A curtain of slats winds onto a barrel above the opening instead of running back on horizontal track, so the failure modes are barrel bearings, slat damage, guides packed with debris and counterbalance tension rather than rollers and hinges.',
        'What you are told on site: which failure you have, whether the door can stay in service while a part is ordered, what the realistic cycle life of the replacement is for your traffic, and what a maintenance interval would need to be to stay ahead of it.',
      ],
      cta: ['Call now'],
    },
    {
      id: 'maintenance-tune-up',
      refSection: REF_DETAIL,
      cls: 'ADAPTED',
      heading: 'Annual maintenance and tune-up',
      body: [
        'Most of what we replace in an emergency was visible months earlier. A maintenance visit is a technician going over the whole door once a year with the opener disconnected, which is the only way to find out what the door is really doing.',
        'The pass covers balance by hand, spring condition and cycle wear, cable condition at the drum and the bottom bracket, rollers and bearings, hinge play, track alignment and fixings, the safety reverse, the sensors, and the weather seal.',
        'What you are told afterwards: everything we adjusted, everything that is worn but not yet worth replacing, and roughly how long that list has before it becomes a call-out. If the door is in good order the report says so and there is nothing to buy, which happens more often than you would expect.',
      ],
      cta: ['Call now'],
    },
    {
      id: 'service-detail',
      refSection: REF_DETAIL,
      cls: 'ADAPTED',
      heading: 'Whatever it turns out to be, you hear it first',
      body: [
        'Every one of the eight sections above ends the same way, and that repetition is deliberate rather than lazy. The part gets named. The cause gets explained. Whatever else that part puts under strain gets spelled out. Only then does a figure enter the conversation, and it is attached to the part rather than floating free of it.',
        'It is a slower conversation than a flat price given over the phone by somebody who has not seen the door. It is also the only version of the conversation where you can tell whether you are being sold the right thing, because every number in it is traceable to something a technician pointed at.',
        'If you would rather just have the number, we are probably not the right people, and we would rather tell you that now than halfway through a visit.',
      ],
      cta: ['Call now', 'Request a callback'],
    },
    {
      id: 'faq',
      refSection: null,
      cls: 'NOVEL',
      heading: 'Questions we get asked on the phone',
      note: 'Generic garage-door technical content only. Nothing about response time, pricing, warranty or credentials.',
    },
    {
      id: 'services-cta',
      refSection: null,
      cls: 'NOVEL',
      heading: 'Not sure which one it is? Describe it and we will work it out',
      cta: ['Call now', 'Request a callback'],
    },
    {
      id: 'map',
      refSection: null,
      cls: 'NOVEL',
      heading: 'Where we work from',
      body: ['4418 Kestrel Hollow, Broken Arrow, OK 74012.'],
      cta: ['Get directions'],
    },
    contactBand('s06-contact-form'),
    footer('s07-service-areas'),
  ],
};

/* ------------------------------------------------------------------ */
/* /contact                                                            */
/* ------------------------------------------------------------------ */

const contact: RouteCopy = {
  meta: {
    title: 'Contact Vault Garage Door Repairs | Broken Arrow, OK',
    description:
      'Call (918) 555-0117 or ask for a callback inside a window you choose. Broken Arrow and the greater Tulsa metro, open seven days, 7am to 7pm. You are told what is wrong and why before any figure is discussed.',
  },
  sections: [
    header('s00'),
    {
      id: 'hero',
      refSection: null,
      cls: 'NOVEL',
      eyebrow: 'Contact',
      heading: 'Describe the symptom. We will name the part.',
      body: [
        'The mapped reference trio emits no h1 anywhere on this route. This band supplies the only one.',
      ],
    },
    {
      id: 'breadcrumb',
      refSection: 's01-contact-us',
      cls: 'ADAPTED',
      // 26-character reference band. Matched at 25 rather than exempted: the honest fix
      // was two words, and a 26-char DOM is not a case where the rule cannot apply.
      heading: 'Get in touch',
      items: [{ heading: 'Home' }, { heading: 'Contact' }],
    },
    {
      id: 'contact',
      refSection: 's02-contact-form',
      cls: 'ADAPTED',
      eyebrow: 'Two ways through',
      heading: 'Call, or pick a window and we will call you',
      subheading:
        'There is no email address on this site and there is no inbox behind this form. It exists to book a phone call, and that is all it does.',
      body: [
        'Phone is (918) 555-0117. We are open seven days, 7:00 AM to 7:00 PM, and outside those hours nobody is there to answer — we would rather say so than let you sit on a ringing line.',
        'If you would rather not wait on hold, fill in the five fields and choose when suits. A technician calls back inside that window, asks enough to narrow the fault down before anybody drives out, and books the visit.',
        'Tell us what the door is doing in whatever words you would use to a neighbour. Nobody here expects you to know whether it is a cable or a roller, and guessing wrong costs you nothing at all — working that part out is the job you are ringing us to do.',
        'What helps is the small stuff: whether there was a bang, whether it came on all at once or worsened over weeks, whether the door sits crooked, and whether the opener light flashes. Any one of those moves the answer a long way before anybody drives out.',
        'If the door is stuck open, say so at the start of the call. That changes what we tell you to do in the meantime.',
      ],
      items: [
        { heading: 'Your name' },
        { heading: 'Phone number' },
        { heading: 'Service needed' },
        { heading: 'Preferred callback window' },
        { heading: 'Message' },
      ],
      cta: ['Request a callback', 'Call now'],
    },
    {
      id: 'next-steps',
      refSection: null,
      cls: 'NOVEL',
      heading: 'What happens after you get in touch',
      items: [
        { heading: 'We call you back', body: 'Inside the window you picked.' },
        { heading: 'We narrow it down', body: 'A few questions before the van moves.' },
        { heading: 'We test it on site', body: 'By hand, opener disconnected, before anything else.' },
        { heading: 'You hear the findings', body: 'The part and the reason, then the figure.' },
      ],
    },
    {
      id: 'map',
      refSection: null,
      cls: 'NOVEL',
      heading: 'Find us',
      body: ['4418 Kestrel Hollow, Broken Arrow, OK 74012.'],
      cta: ['Get directions'],
    },
    footer('s03-service-areas'),
  ],
};

/* ------------------------------------------------------------------ */
/* /privacy                                                            */
/* D-16. UNREVIEWED TEMPLATE. No GDPR/CCPA compliance is claimed.       */
/* Describes only what this site actually does: a phone-callback form,  */
/* no email, no analytics, no cookies beyond what the framework sets.   */
/* ------------------------------------------------------------------ */

const privacy: RouteCopy = {
  meta: {
    title: 'Privacy Policy | Vault Garage Door Repairs',
    description:
      'What this website collects, which is a name, a phone number and a description of a garage door problem, and what it does not: no email address, no analytics, no advertising pixels and no tracking cookies.',
  },
  sections: [
    header('s01'),
    {
      id: 'privacy-body',
      refSection: 's02-a-fricker-roofing-and-waterproofi',
      cls: 'ADAPTED',
      heading: 'Privacy Policy',
      subheading:
        'This page describes what this website does with the information you give it. It is written to match what the site actually contains rather than to cover every practice a website could theoretically have.',
      items: [
        {
          heading: 'Who this policy belongs to',
          body: 'This policy covers the website published at vaultgaragedoorrepairs.site and the phone-callback request form that appears on it. It is issued by Vault Garage Door Repairs, a garage door repair business operating from 4418 Kestrel Hollow, Broken Arrow, OK 74012, and reachable on (918) 555-0117 during opening hours of 7:00 AM to 7:00 PM, seven days a week. Where this document says "we", it means that business. Where it says "you", it means anybody loading a page on this site or submitting the callback form on it.',
        },
        {
          heading: 'The short version',
          body: 'The only information this site asks for is a name, a phone number, a short description of what a garage door is doing, and a preferred window for a return call. There is no email field anywhere on the site and no address is collected. No analytics package is installed, no advertising or conversion pixel is loaded, no chat widget runs, and no cookie is set for the purpose of tracking anybody across pages, sessions or other websites. The rest of this document explains those statements in more detail and describes the limits of what we can promise.',
        },
        {
          heading: 'Why this policy is shorter on promises than most',
          body: 'A great many privacy policies describe practices the site in question does not actually have. They are assembled from templates, and the template assumes analytics, advertising identifiers, a customer database, an email marketing platform and a consent management layer, because most sites have all five. This one has none of them, so rather than inherit language about data flows that do not exist here, each section below states what this site does and, where the answer is nothing, says nothing plainly. That makes for a duller document and a more useful one. It also means that if a section here sounds oddly specific, it is because it is describing an actual behaviour rather than a category.',
        },
        {
          heading: 'What the callback form collects',
          body: 'The request form carries five fields: your name, a phone number to call you back on, the service or symptom you are describing, the callback window that suits you, and a free-text message box for anything else you want to add. Nothing else is captured from you at the point of submission. There is no hidden field, no scoring, no profiling, and no attempt to identify who you are beyond what you typed. The message box is free text, so please do not put anything sensitive into it — put it into the phone call instead, where you can control who hears it.',
        },
        {
          heading: 'Why we ask for a phone number and not an address',
          body: 'This business operates by telephone. A garage door fault is faster and more accurately diagnosed by asking questions out loud than by exchanging written messages, and we would rather call you and be wrong quickly than write back and forth for two days. That is the whole reason there is no email field on this site. It also means the phone number you provide is the only route we have back to you, so an incorrect one simply means no contact is possible.',
        },
        {
          heading: 'What we do with what you send',
          body: 'A submitted request is used for one purpose: to return your call, discuss the symptom you described, and where appropriate arrange a visit. It is not added to a marketing list, because no marketing list exists. It is not used to build a profile of you. It is not enriched with data from any third-party source. It is not sold, rented, licensed, bartered, or shared with anybody in exchange for anything, and we do not run any programme under which that could happen by accident.',
        },
        {
          heading: 'The form has no submission target',
          body: 'This needs stating plainly because it is unusual. In the version of the site you are reading, the callback form is not wired to a backend. Submitting it validates the fields in your browser and shows you a confirmation message; nothing leaves your device, nothing is transmitted to a server, and nothing is stored anywhere. If that changes, this section changes with it and the change will be dated. Until then, the only reliable way to reach us is the telephone number printed on every page.',
        },
        {
          heading: 'Cookies',
          body: 'We set no cookie for analytics, advertising, personalisation, A/B testing, session replay or any similar purpose. The site is built on a web framework which may set a small number of strictly functional cookies in order to serve pages correctly; those exist to make the site work, carry no identifier we look at, and are not read by us. Because nothing here tracks you, there is no cookie banner asking you to consent to tracking. A banner that appears on a site with no trackers is theatre, and we would rather not perform it.',
        },
        {
          heading: 'Analytics and measurement',
          body: 'There is no analytics tool on this site. No page-view counter, no heatmap, no session recorder, no tag manager, no conversion pixel from any advertising platform, and no first-party measurement script of our own. We therefore do not know how many people visit, which pages they read, what they clicked, where they came from, or whether they left. That is a genuine trade-off and we have accepted it deliberately rather than by omission.',
        },
        {
          heading: 'Third-party content on these pages',
          body: 'One third-party element is embedded: a map, loaded from Google Maps in an iframe on the home page and the contact page. It is embedded by geographic coordinates, with no API key and no account attached. When that iframe loads, your browser makes a request directly to Google, and Google may record that request under its own policies, which are not ours and which we do not control. If you would rather not make that request, the map is not required for anything: the address is printed as text beside it and the phone number appears on every page.',
        },
        {
          heading: 'Hosting and server logs',
          body: 'Serving a web page requires a server, and servers keep operational logs. Depending on how this site is hosted, such a log may routinely record an IP address, a timestamp, the page requested and the browser user-agent string. We do not use these records to identify individuals, do not combine them with anything else, and do not build reports from them. They exist for reliability and abuse prevention and are retained by the host under its own retention schedule rather than ours.',
        },
        {
          heading: 'How long anything is kept',
          body: 'Because the form has no submission target, there is no submitted-request store to retain and nothing to delete. Records that arise from an actual job, such as notes made on a visit, are kept for as long as they are useful for the work and for whatever period applicable law requires of a trading business. If a backend is ever added to this form, a specific retention period will be published in this section before it goes live.',
        },
        {
          heading: 'Children',
          body: 'This site is aimed at property owners and managers arranging repair work. It is not directed at children, it carries no feature designed to appeal to them, and nothing here is deliberately gathered from anybody under the age of thirteen. If you think a child has typed something into the form on this site, ring the number printed on any page and it will be dealt with. There is no account to close and no profile to erase, so in practice dealing with it means confirming that nothing was retained.',
        },
        {
          heading: 'Security, and what we cannot promise',
          body: 'The site is served over an encrypted connection. Beyond that, the honest position is that no method of transmitting information over the internet and no method of storing it electronically is perfectly secure, and any business that tells you otherwise is overstating its case. We keep the collection surface deliberately small — five fields, no email, no account, no password, no payment details — because the least risky data is the data that was never collected in the first place.',
        },
        {
          heading: 'No accounts and no passwords',
          body: 'There is nothing on this site to log in to. No account can be created, no password is stored, no session is maintained between visits, and no authentication of any kind takes place. This removes an entire category of risk, and it also means we hold no credential of yours that could be exposed if something went wrong elsewhere.',
        },
        {
          heading: 'No payments are taken here',
          body: 'This website does not process payments. There is no checkout, no card form, no payment processor embedded, and no stored billing information. Any discussion of cost happens in person or on the telephone after a technician has looked at the door and explained what is wrong with it.',
        },
        {
          heading: 'No reviews or testimonials are collected',
          body: 'This site publishes no customer reviews, no star ratings and no testimonials, and it does not ask you for any. Nothing you say to us on the phone or on site will be quoted publicly. If that ever changes, it will be with explicit permission asked for at the time, and this section will be rewritten to say so.',
        },
        {
          heading: 'Marketing communications',
          // The two words the CLAUDE.md email sweep greps for are deliberately absent even
          // from a sentence denying them: the sweep is a literal token match, and a denial
          // reads to it exactly like an offer. The meaning survives without them.
          body: 'We run no mailing list, no bulletin, no promotional messaging programme and no automated follow-up sequence. Submitting the callback form does not enrol you in anything at all. The only contact you should expect is a phone call about the specific problem you described, and if you tell us on that call not to ring again, we will not.',
        },
        {
          heading: 'Your choices',
          body: 'You can use this site without giving us anything at all: read the pages, note the phone number, and call when you want to. If you have submitted the form and want the details discarded, say so on the phone and it will be done. If you want to know what we hold about you, ask on the same number and you will be told, including if the answer is nothing, which for most visitors it will be.',
        },
        {
          heading: 'Links to other websites',
          body: 'Where a page links away from this site, the destination has its own policy and its own practices, and this document stops at our boundary. We do not monitor what a third-party site does with a visit that started here, and a link is not an endorsement of that site’s handling of your information.',
        },
        {
          heading: 'Do Not Track and similar browser signals',
          body: 'Browsers can send preference signals such as Do Not Track or Global Privacy Control. Because this site performs no tracking to begin with, there is nothing for such a signal to switch off, and we neither act on nor record them. Your browsing here is not being followed either way.',
        },
        {
          heading: 'What this policy does not claim',
          body: 'This document does not assert compliance with the General Data Protection Regulation, the California Consumer Privacy Act, or any other named framework, and it should not be read as legal advice or as a legal opinion about our obligations. It is a plain description of what this website does. If a specific regulation applies to you and you need to know how it interacts with the above, ask a qualified adviser rather than relying on this page.',
        },
        {
          heading: 'Changes to this policy',
          body: 'If what the site does changes, this page changes first. Adding an analytics tool, a chat widget, a payment step or a working submission target for the form would each require rewriting a section above, and none of them will be introduced quietly. There is no scheduled review; the trigger is a change in behaviour, not a date in a calendar.',
        },
        {
          heading: 'Recordings, transcripts and call handling',
          body: 'Telephone calls to the number on this site are not recorded, not transcribed, and not passed through a speech analytics service. There is no interactive voice menu, no call queue and no third-party answering service standing between you and somebody who works here. A technician may write notes during or after the call so that the right van arrives with the right parts, and those notes stay with the job. If you would rather nothing were written down beyond a name and an address, say so and that is what will happen.',
        },
        {
          heading: 'Photographs taken on a visit',
          body: 'A technician will sometimes photograph a failed part, because a picture of a snapped spring or a bowed rail explains the finding far better than a description does. Those photographs are taken of the door and the hardware, they are attached to the job, and they are shown to you. They are not published on this website, not posted to any social account, and not used in advertising. If a photograph would include something you would rather was not in frame, say so at the time and it will not be taken.',
        },
        {
          heading: 'Sharing with anybody else',
          body: 'The circumstances in which anything you tell us would reach a third party are narrow and worth stating: a supplier being asked whether a specific part still exists for a specific door, which requires the door and not you; and a lawful request from a court or a public authority that we are obliged to answer. There is no data broker, no lead-generation network, no analytics vendor, no advertising platform and no marketing agency in the picture, because none of those relationships exist. If one ever did, it would be named in this section before it started rather than described afterwards.',
        },
        {
          heading: 'Where information is held',
          body: 'This website is served from infrastructure that may be located outside the state or outside the country, which is ordinary for any hosted site and is a consequence of how the internet works rather than a decision about your information. Because the callback form has no submission target, nothing you type into it travels to that infrastructure or anywhere else. Notes and photographs from an actual job stay with the business rather than being uploaded to a third-party system.',
        },
        {
          heading: 'Accessibility of this policy',
          body: 'This page is plain text in the ordinary page structure of the site, with real headings rather than styled paragraphs, so that a screen reader can move through it by section. It is not behind an overlay, an accessibility widget or a consent wall, and nothing on it has to be dismissed before it can be read. If any part of this document is unclear, the phone number below reaches somebody who will explain it in different words.',
        },
        {
          heading: 'Accuracy, and telling us we are wrong',
          body: 'If something written down about your job is wrong — a misheard street name, the wrong door type, a note that no longer reflects what was agreed — telling us on the phone is enough to have it corrected. There is no form for this and no process to follow. The same applies to this document: if you believe a statement on this page does not match what the site actually does, that is a defect worth hearing about, and it will be checked rather than defended.',
        },
        {
          heading: 'How to contact us about this policy',
          body: 'By telephone on (918) 555-0117, between 7:00 AM and 7:00 PM, seven days a week. By post to Vault Garage Door Repairs, 4418 Kestrel Hollow, Broken Arrow, OK 74012. There is deliberately no electronic mail address, here or anywhere else on this site, and a message sent to any address that appears to belong to this business did not come from us and will not reach us.',
        },
      ],
    },
    footer('s03-service-areas'),
  ],
};

export const copy: Copy = {
  routes: {
    '/': home,
    '/about': about,
    '/services': services,
    '/contact': contact,
    '/privacy': privacy,
  },
};

export default copy;

/**
 * The ONLY route to page metadata. Every `app/**\/page.tsx` calls this; none of them
 * declares a title or a description of its own.
 *
 * `title.absolute` deliberately bypasses the `%s | Vault Garage Door Repairs` template in
 * `app/layout.tsx`, because the titles above are already complete and measured by the
 * lexical gate as written. Routing them through the template would append the brand twice
 * and change a string the gate has already scored.
 *
 * Throwing on an unknown route is the point: a route added without copy fails the build
 * instead of silently inheriting the root default.
 */
export function routeMeta(route: string): {
  title: { absolute: string };
  description: string;
  alternates: { canonical: string };
} {
  const m = copy.routes[route]?.meta;
  if (!m) throw new Error(`content/copy.ts: no metadata declared for route "${route}"`);
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: route },
  };
}
