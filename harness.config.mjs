// Per-site harness config -- Vault Garage Door Repairs.
// The shared harness at ../_shared/harness carries no site data by design.
// See _shared/harness/src/config.mjs for the full field list and defaults.

export default {
  // Points at the LOCAL reference server by default (A-15). Start it with:
  //   REF_PORT=3198 node ../_shared/harness/src/serve-reference.mjs
  //
  // PORT 3198, NOT the package default 3199: a sibling site in this programme was already
  // holding 3199 when this was profiled, and its server answered on that port with ITS
  // reference (title "Family Tree Roofing"). A gate that trusts 3199 blind will silently
  // measure another site's markup. Verify identity before trusting any number:
  //   curl -s 127.0.0.1:3198/ | grep -o '<title>[^<]*'   -> A Fricker Roofing
  // Set REF_ORIGIN to hit the live site instead -- but three references in this programme
  // went behind a bot wall mid-build, so the saved copy is the reliable one.
  referenceOrigin: process.env.REF_ORIGIN || 'http://127.0.0.1:3198',
  devPort: 3105,

  // ref path -> our route. The package keys on the REFERENCE path.
  // Live reference: https://africkerroofing.com/
  routeMap: {
    '/': '/',
    '/about-us/': '/about',
    '/commercial-roofing-services/': '/services',
    '/contact-us/': '/contact',
    '/privacy-policy/': '/privacy',
  },

  breakpoints: { diff: [390, 768, 1440], extra: [430], canonical: 1440 },

  // PROFILED IN PROMPT 1 from reference/raw/ (see docs/profile.md).
  // The reference is a hand-built WordPress theme, NOT a page builder: every band is a
  // semantic <section class="<band-name>"> directly under <main>. The Elementor generator
  // meta is present but no Elementor markup is emitted on any of the five saved pages
  // (0 hits for .elementor-top-section / .e-con.e-parent), and NitroPack only rewrites
  // asset URLs, not class names. So the band-name class IS the stable section id.
  sectionCandidates: ['main > section', 'body > section', 'section'],
  // EXACT selectors only -- config.mjs rejects [class*=] matchers (Atlas defect #1).
  // chromeSelectors ADDS bands (probe.mjs pushes each outer chrome node into the section
  // list) -- it does not exclude them. So the .onetap-container accessibility widget is
  // deliberately NOT listed: it is a third-party off-canvas panel at x=1440 that we do not
  // ship, and listing it fabricated a 1673px band at s01 on four of the five routes,
  // shifting every ordinal after it. header/footer ARE real bands and stay.
  // Bare 'header' matched the widget's own <header class="onetap-header-top"> once the
  // widget itself was out of the set, which fabricated a 351px band at s01 on four routes;
  // 'header.pc' is the site header exactly.
  // The widget still appears on /privacy, whose only band is `blankpage`, so `main > section`
  // yields <2 outer bands there and segmentation falls through to bare `section`.
  // That row is classified DELETED in docs/sections.md.
  chromeSelectors: ['header.pc', 'footer'],
  headerSelector: 'header.pc',
  navToggleSelector: 'button[aria-controls], .menu-toggle, .hamburger, .mobile-menu a',
  drawerSelector: '#mySidenav',
  ctaSelector: 'a[href^="tel:"], button, [class*=btn], [class*=button]',
  logoSelector: 'header.pc img',
  iconFontFamilies: /fontawesome|icomoon|material symbols|material icons|elementskit|awb-icons|slick/i,

  thresholds: { fidelity: 2, struct: 5, token: 0 },
  fidelityMode: 'auto',

  tokenSources: ['app/globals.css', 'app/tokens.css', 'styles/tokens.css'],
  contractPath: 'docs/sections.md',
  reportPath: 'docs/divergence.md',
  copyModulePath: 'content/copy.ts',

  industryAllowlist: [
    'garage door', 'torsion spring', 'extension spring', 'opener', 'cable', 'roller',
    'track', 'panel', 'off-track', 'remote', 'keypad', 'sensor', 'weather seal',
    'residential', 'commercial', 'same-day', 'free estimate', 'repair', 'installation',
    'replacement',
  ],
  gramN: 5,
  trigramMax: 0.15,
  lengthTolerance: 0.1,

  // Set when the palette is generated (merged Prompt 5+9). Every site in this programme
  // MUST land on a distinct palette -- already taken, by primary hue:
  //   Atlas 332 (plum/crimson)  Titan 217 (teal/rust)  Ridge 270 (violet-slate)
  //   Axel  252 (navy/crimson)  Forge ~150 (green/dark)
  // Re-roll on anything within ~30 degrees of those. These sites must look independently
  // built, and the auto-selector is biased toward magenta accents because at fixed OKLCH
  // L/C the lowest luminance sits near hue 300-360 -- so collisions are structural, not
  // bad luck. Steer the masterSeed, never the selection rule.
  masterSeed: 3105,
  gradientSamples: 5,
};
