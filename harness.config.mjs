// Per-site harness config -- Vault Garage Door Repairs.
// The shared harness at ../_shared/harness carries no site data by design.
// See _shared/harness/src/config.mjs for the full field list and defaults.

export default {
  // Points at the LOCAL reference server by default (A-15). Start it with:
  //   node ../_shared/harness/src/serve-reference.mjs
  // Set REF_ORIGIN to hit the live site instead -- but three references in this programme
  // went behind a bot wall mid-build, so the saved copy is the reliable one.
  referenceOrigin: process.env.REF_ORIGIN || 'http://127.0.0.1:3199',
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

  // Reference framework is unprofiled at the time of writing -- Prompt 1 fills this in.
  // The saved copy is in reference/raw/; profile IT, not the live site.
  sectionCandidates: ['.elementor-top-section', '.e-con.e-parent', '.et_pb_section', '.fusion-fullwidth', 'main > section', 'section'],
  // EXACT selectors only -- config.mjs rejects [class*=] matchers (Atlas defect #1).
  chromeSelectors: ['header', 'footer'],
  headerSelector: 'header',
  navToggleSelector: 'button[aria-controls], .menu-toggle, .hamburger',
  drawerSelector: '[data-drawer], .mobile-menu, .nav-drawer',
  ctaSelector: 'a[href^="tel:"], button, [class*=btn], [class*=button]',
  logoSelector: 'header img, .logo img, #logo',
  iconFontFamilies: /fontawesome|icomoon|material|elementskit|awb-icons/i,

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
