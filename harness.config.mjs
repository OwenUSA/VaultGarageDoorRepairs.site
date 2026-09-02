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

  // PROMPT 3 -- length exemptions. TWO rows, both shared-shell, both because a decision
  // register entry deletes the content that makes up the reference's character count.
  // Everything else is held to +/-10% and was rewritten until it fit rather than exempted:
  // /contact::breadcrumb is a 26-character reference band and is matched at 26.
  // Reported EXEMPT, never PASS.
  lengthExempt: {
    '*::header':
      'D-01 + D-02. The reference header is a 166-item mega menu (2,177 chars over 158 list '
      + 'items) covering a blog, a careers page, a gallery, per-service routes and a /locations '
      + 'city tree. D-01 fixes us at five routes and D-02 deletes the locations tree outright, '
      + 'so there is no honest way to reach that character count -- padding a nav with labels '
      + 'that lead nowhere would be worse than the miss. Measured structurally instead.',
    '*::footer':
      'D-02. 744 of the reference footer\'s 781 chars are the service-area city grid: 30 '
      + 'paragraphs of Tulsa-metro place names. D-02 deletes the grid entirely and leaves '
      + 'exactly one SERVICE_AREA sentence as its only survivor, which is the content this '
      + 'row is allowed to carry. Measured structurally instead.',
  },

  // Set when the palette is generated (merged Prompt 5+9). Every site in this programme
  // MUST land on a distinct palette -- already taken, by primary hue:
  //   Atlas 332 (plum/crimson)  Titan 217 (teal/rust)  Ridge 270 (violet-slate)
  //   Axel  252 (navy/crimson)  Forge ~150 (green/dark)
  // Re-roll on anything within ~30 degrees of those. These sites must look independently
  // built, and the auto-selector is biased toward magenta accents because at fixed OKLCH
  // L/C the lowest luminance sits near hue 300-360 -- so collisions are structural, not
  // bad luck. Steer the masterSeed, never the selection rule.

  // ---------------------------------------------------------------------------
  // PROMPT 2 -- asset slot classification. inventory.mjs checks these in order,
  // first match wins, so anchor every pattern and put the longer base name first
  // (Group-1000008942-2-1 must be tested before Group-1000008942).
  //
  // prov: 'REPLACE' -> we build the slot, we generate a placeholder, and the
  //       reference file is NEVER downloaded (D-09).
  //       'DELETED'  -> inventoried so the count is honest, then not built: the
  //       band is deleted (D-13/D-14), or the asset is third-party widget chrome,
  //       or it is a UI glyph that becomes a lucide-react icon rather than a file.
  // There is no 'TAKE' provenance row: nothing from the reference is copied into
  // this repo. The two genuinely TAKE-able things -- Roboto Condensed and Rubik --
  // are OFL fonts loaded from Google Fonts via next/font, not lifted files, and
  // they are recorded in assets/INVENTORY.tail.md instead.
  slotRules: [
    // -- third-party accessibility widget (onetap): 45 language flags + its logo --
    { match: /^(arabic|bangladesh|brasilian|bulgarian|chinese-simplified|croatia|czech|danish|england|english|estonian|finnland|french|german|greece|hindi|hungarian|indonesian|iran|ireland|israel|italia|japanese|korean|latvian|lithuanian|macedonia|netherland|norwegan|pakistan|philippines|poland|portugal|rumania|russian|serbian|slowakia|slowenien|spanish|swedish|thailand|turkish|ukrainian|vietnam|Original_Logo_Icon)$/,
      id: 'widget-onetap', sec: '(third-party)', prov: 'DELETED',
      note: 'onetap accessibility widget chrome, 45 language flags plus its own mark. Not shipped; the whole widget is DELETED in docs/sections.md.' },

    // -- UI glyphs that become lucide-react icons, not files --
    { match: /^icon-drop-down-menu$/, id: 'icon-chevron', sec: 'header', prov: 'DELETED',
      note: 'nav chevron. lucide ChevronDown in the same 10x6 box, stroke 2. No file.' },
    { match: /^Group-883799$/, id: 'icon-topbar-claim', sec: 'header', prov: 'DELETED',
      note: 'top-bar glyph, 22x22. lucide ShieldCheck. No file, and no insurance-claim claim in our copy (D-14).' },
    { match: /^Contact-Us$/, id: 'icon-phone', sec: 'emergency', prov: 'DELETED',
      note: 'phone glyph, 36x42 box. lucide Phone. No file.' },
    { match: /^(Frame-100001021[2-7]|Group-1000009000-1|residential-services-icons)$/,
      id: 'icon-tab-set', sec: 'tabbed', prov: 'DELETED',
      note: '8 tab icons, 25x25 at 390/768 and 40x40 at 1440. lucide set, stroke 2. No files.' },
    { match: /^exteriors-services-Icons-[456]$/, id: 'icon-service-set', sec: 'services', prov: 'DELETED',
      note: '50x50 service-grid icons. lucide set, stroke 2. No files.' },
    { match: /^Group-88386[0-3]-[23]$|^Group-884008$/, id: 'icon-services-bullets', sec: 'services', prov: 'DELETED',
      note: '25x25 bullet glyphs on the /services grid. lucide Check. No files.' },
    { match: /^Frame-10000102(23|25|26|28|53)/, id: 'icon-doors-carousel', sec: 'doors', prov: 'DELETED',
      note: '69x55 carousel chips. lucide set. No files.' },
    { match: /^Frame-37[45]/, id: 'icon-social', sec: 'footer', prov: 'DELETED',
      note: 'Yelp / Facebook marks at 50x50. Third-party trademarks, and we publish no social profiles (TODO(fact)).' },

    // -- reviews, ratings and badges: forbidden outright (D-13) or unearned (D-14) --
    { match: /^Frame-1000009842-1-1$|^Frame-10000100(57|58|59|60)$/, id: 'review-screenshot-set', sec: 'hero', prov: 'DELETED',
      note: '5 Google review screenshots, 1402x910. D-13: no reviews, no ratings, no review markup.' },
    { match: /^ACg8oc/, id: 'review-avatar-set', sec: 'testimonial', prov: 'DELETED',
      note: '10 Google reviewer avatars, 135x135. D-13, and the whole testimonial band is DELETED.' },
    { match: /^google_small_icon$/, id: 'review-google-mark', sec: 'testimonial', prov: 'DELETED', note: 'D-13.' },
    { match: /^Group-8839(32|37)$/, id: 'review-star-logos', sec: 'community', prov: 'DELETED',
      note: 'Google / Facebook 5-star rating lockups, 100x43 and 100x38. D-13.' },
    { match: /^Group-10000089(90|99)$|^review-no$/, id: 'review-rating-strip', sec: 'hero', prov: 'DELETED',
      note: 'rating strips, 300x39 / 424x60 / 284x56. D-13; the geometry survives as a TODO(fact) chip row.' },
    { match: /^blue-seal-200-42-whitetxt-bbb/, id: 'badge-bbb', sec: 'footer', prov: 'DELETED',
      note: 'BBB accreditation seal, 200x42. D-14: we hold no accreditation to show. TODO(fact) chip at the same box.' },
    { match: /^Group-1000008993-1$/, id: 'badge-signature-strip', sec: 'about', prov: 'DELETED',
      note: '252x60 credential/signature lockup. D-14.' },

    // -- partnership / manufacturer logo strips: both bands are DELETED (D-14) --
    { match: /^(berridge-1|Group-1000008956|Group-10000089565|Group-13|Group-8839(57|58|60|61)|Johns-Manville-\.as_|Polyglass-Roofing-\.as_|Progressive-Materials-as|Tamko-Pro-Diamond-\.as_|Verisco-Commercial-Roofing-Products-\.as_|Frame-1000010028)$/,
      id: 'partner-logo-strip', sec: 'logos-strip', prov: 'DELETED',
      note: '13 manufacturer / association marks, 150x100 each. Third-party trademarks AND unearned credentials (D-14).' },

    // -- their own brand marks and decorative shapes --
    { match: /^Logo\.ic_$/, id: 'brand-mark-inline', sec: 'about', prov: 'DELETED',
      note: 'their logo repeated inside the about band, 176x73. D-09.' },
    { match: /^Group-1000008570-removebg-preview$/, id: 'brand-shape', sec: 'doors', prov: 'DELETED',
      note: '431x216 decorative brand shape. Prompt 5 token gradient, not a file.' },
    { match: /^Vector-3$/, id: 'brand-rule-services', sec: 'service-detail', prov: 'DELETED',
      note: '356x58 decorative divider. CSS, not a file.' },
    { match: /^Vector$/, id: 'brand-rule-facts', sec: 'facts', prov: 'DELETED',
      note: '50x22 decorative divider. CSS, not a file.' },
    { match: /^Group-883470$/, id: 'header-topbar-texture', sec: 'header', prov: 'DELETED',
      note: '1440x78 top-bar texture. Prompt 5 token gradient, not a file.' },

    // ---- REPLACE: slots we actually build; placeholders generated ----
    { match: /^Group-259$/, id: 'logo-wordmark', sec: 'header', prov: 'REPLACE',
      note: 'TODO(fact): logo asset. Wordmark in the display font until a file exists.' },
    { match: /^Group-259-1$/, id: 'logo-footer', sec: 'footer', prov: 'REPLACE',
      note: 'TODO(fact): logo asset, footer lockup. Same wordmark, larger box.' },

    { match: /^hero-img-4$/, id: 'hero-bg', sec: 'hero', prov: 'REPLACE', note: 'full-bleed hero background, object-fit cover.' },
    { match: /^Group-1000008852$/, id: 'hero-side-image', sec: 'hero', prov: 'REPLACE', note: 'hero side panel; the same file also backs the /contact form panel.' },

    { match: /^Frame-1000010272$|^Frame-1000010709-1$/, id: 'about-band-bg', sec: 'about', prov: 'REPLACE', note: 'about band background.' },
    { match: /^A\.Fricker-\.co_$/,   id: 'about-gallery-1', sec: 'about', prov: 'REPLACE', note: 'about gallery 1 of 8.' },
    { match: /^A\.Fricker-\.co-1$/,  id: 'about-gallery-2', sec: 'about', prov: 'REPLACE', note: 'about gallery 2 of 8.' },
    { match: /^A\.Fricker-\.co-3$/,  id: 'about-gallery-3', sec: 'about', prov: 'REPLACE', note: 'about gallery 3 of 8.' },
    { match: /^home-about$/,         id: 'about-gallery-4', sec: 'about', prov: 'REPLACE', note: 'about gallery 4 of 8.' },
    { match: /^Rectangle-23387-1$/,  id: 'about-gallery-5', sec: 'about', prov: 'REPLACE', note: 'about gallery 5 of 8.' },
    { match: /^Rectangle-23388-2$/,  id: 'about-gallery-6', sec: 'about', prov: 'REPLACE', note: 'about gallery 6 of 8.' },
    { match: /^Rectangle-23395$/,    id: 'about-gallery-7', sec: 'about', prov: 'REPLACE', note: 'about gallery 7 of 8.' },
    { match: /^Rectangle-23399$/,    id: 'about-gallery-8', sec: 'about', prov: 'REPLACE', note: 'about gallery 8 of 8.' },

    { match: /^Group-883740-2$/, id: 'process-band-bg', sec: 'process', prov: 'REPLACE', note: 'four-step band background.' },

    { match: /^Commercial-Inspection$/,     id: 'tabbed-panel-1', sec: 'tabbed', prov: 'REPLACE', note: 'tab panel 1 of 8.' },
    { match: /^commercial-installation-2$/, id: 'tabbed-panel-2', sec: 'tabbed', prov: 'REPLACE', note: 'tab panel 2 of 8.' },
    { match: /^Commercial-Replacement$/,    id: 'tabbed-panel-3', sec: 'tabbed', prov: 'REPLACE', note: 'tab panel 3 of 8.' },
    { match: /^Group-1000008942-2-1$/,      id: 'tabbed-panel-4', sec: 'tabbed', prov: 'REPLACE', note: 'tab panel 4 of 8.' },
    { match: /^Group-1000008942-3-1$/,      id: 'tabbed-panel-5', sec: 'tabbed', prov: 'REPLACE', note: 'tab panel 5 of 8.' },
    { match: /^Group-1000008942-4-1$/,      id: 'tabbed-panel-6', sec: 'tabbed', prov: 'REPLACE', note: 'tab panel 6 of 8.' },
    { match: /^Group-1000008942-8$/,        id: 'tabbed-panel-7', sec: 'tabbed', prov: 'REPLACE', note: 'tab panel 7 of 8.' },
    { match: /^Group-1000008942$/,          id: 'tabbed-panel-8', sec: 'tabbed', prov: 'REPLACE', note: 'tab panel 8 of 8.' },

    { match: /^Frame-397$/,          id: 'doors-band-bg', sec: 'doors', prov: 'REPLACE', note: 'door-styles carousel band background.' },
    { match: /^Frame-1000010230$/,   id: 'doors-slide-1', sec: 'doors', prov: 'REPLACE', note: 'door style 1 of 9.' },
    { match: /^Frame-1000010231$/,   id: 'doors-slide-2', sec: 'doors', prov: 'REPLACE', note: 'door style 2 of 9.' },
    { match: /^Frame-1000010236$/,   id: 'doors-slide-3', sec: 'doors', prov: 'REPLACE', note: 'door style 3 of 9.' },
    { match: /^Frame-1000010237-3$/, id: 'doors-slide-4', sec: 'doors', prov: 'REPLACE', note: 'door style 4 of 9.' },
    { match: /^Frame-1000010241$/,   id: 'doors-slide-5', sec: 'doors', prov: 'REPLACE', note: 'door style 5 of 9.' },
    { match: /^Frame-1000010242$/,   id: 'doors-slide-6', sec: 'doors', prov: 'REPLACE', note: 'door style 6 of 9.' },
    { match: /^Frame-1000010243$/,   id: 'doors-slide-7', sec: 'doors', prov: 'REPLACE', note: 'door style 7 of 9.' },
    { match: /^Frame-1000010250$/,   id: 'doors-slide-8', sec: 'doors', prov: 'REPLACE', note: 'door style 8 of 9.' },
    { match: /^Frame-1000010252$/,   id: 'doors-slide-9', sec: 'doors', prov: 'REPLACE', note: 'door style 9 of 9.' },

    { match: /^built-up-roofing-construction-1$/,   id: 'components-slide-1', sec: 'components', prov: 'REPLACE', note: 'component carousel 1 of 6.' },
    { match: /^built-up-roofing-construction-2$/,   id: 'components-slide-2', sec: 'components', prov: 'REPLACE', note: 'component carousel 2 of 6.' },
    { match: /^built-up-roofing-construction-4-2$/, id: 'components-slide-3', sec: 'components', prov: 'REPLACE', note: 'component carousel 3 of 6.' },
    { match: /^built-up-roofing-construction-5$/,   id: 'components-slide-4', sec: 'components', prov: 'REPLACE', note: 'component carousel 4 of 6.' },
    { match: /^built-up-roofing-construction-6$/,   id: 'components-slide-5', sec: 'components', prov: 'REPLACE', note: 'component carousel 5 of 6.' },
    { match: /^built-up-roofing-construction-7$/,   id: 'components-slide-6', sec: 'components', prov: 'REPLACE', note: 'component carousel 6 of 6.' },

    { match: /^image-13-2$/,  id: 'urgent-image',    sec: 'urgent',   prov: 'REPLACE', note: 'dark list+CTA band image.' },
    { match: /^image-168-3$/, id: 'services-card-1', sec: 'services', prov: 'REPLACE', note: 'home service grid card 1 of 3.' },
    { match: /^image-169-4$/, id: 'services-card-2', sec: 'services', prov: 'REPLACE', note: 'home service grid card 2 of 3.' },
    { match: /^image-170-3$/, id: 'services-card-3', sec: 'services', prov: 'REPLACE', note: 'home service grid card 3 of 3.' },

    { match: /^Frame-889217-1$/, id: 'emergency-band-bg', sec: 'emergency', prov: 'REPLACE', note: 'phone-led dark band background.' },
    { match: /^A-Fricker-right-side-truck-5$/, id: 'emergency-vehicle', sec: 'emergency', prov: 'REPLACE',
      note: 'their branded truck (D-09). Ours is an unbranded service van, generated.' },
    { match: /^truck$/, id: 'breadcrumb-vehicle', sec: 'breadcrumb', prov: 'REPLACE',
      note: 'their branded truck on /contact (D-09). Ours is an unbranded service van, generated.' },

    { match: /^Group-1-1$/, id: 'community-band-bg', sec: 'community', prov: 'REPLACE', note: 'reversed-split band background.' },
    { match: /^africker-1-2-1-1$/, id: 'community-photo', sec: 'community', prov: 'REPLACE',
      note: 'their staff group photo (D-09). Ours is a non-identifying work photo, generated.' },
    { match: /^Austin-\.co-1$/, id: 'approach-photo', sec: 'approach', prov: 'REPLACE',
      note: 'their owner portrait (D-09). No named people and no portrait in ours (D-17): a work-in-progress shot.' },

    { match: /^Rectangle-23376-1$/, id: 'contact-band-bg', sec: 'contact', prov: 'REPLACE', note: 'contact band background.' },
    { match: /^A-Fricker-Gallery-\.co-1-1-1$/,   id: 'contact-gallery-1', sec: 'contact', prov: 'REPLACE', note: 'contact gallery 1 of 6.' },
    { match: /^A-Fricker-Gallery-\.co-2-1$/,     id: 'contact-gallery-2', sec: 'contact', prov: 'REPLACE', note: 'contact gallery 2 of 6.' },
    { match: /^A-Fricker-Gallery-\.co-3-1-1$/,   id: 'contact-gallery-3', sec: 'contact', prov: 'REPLACE', note: 'contact gallery 3 of 6.' },
    { match: /^A-Fricker-Gallery-\.co-3-1-2-1$/, id: 'contact-gallery-4', sec: 'contact', prov: 'REPLACE', note: 'contact gallery 4 of 6.' },
    { match: /^A-Fricker-Gallery-\.co-3-1-3-1$/, id: 'contact-gallery-5', sec: 'contact', prov: 'REPLACE', note: 'contact gallery 5 of 6.' },
    { match: /^A-Fricker-Gallery-\.co-4-1$/,     id: 'contact-gallery-6', sec: 'contact', prov: 'REPLACE', note: 'contact gallery 6 of 6.' },
    { match: /^Frame-292$/, id: 'testimonial-band-bg', sec: 'testimonial', prov: 'DELETED',
      note: 'testimonial band background; the whole band is DELETED (D-13).' },
    // The reference's only <video>: a 535x535 muted/autoplay/playsinline mp4 inside the
    // testimonial band. Video policy is poster-still-only, but the band itself is DELETED
    // (D-13), so there is no slot to hold a poster and none is generated.
    { match: /^iLhQRdL6QrywfSLfzVl7_trim/i, id: 'testimonial-video', sec: 'testimonial', prov: 'DELETED',
      note: 'the reference\'s only video, 535x535 at 1440, absent below 1440. Testimonial band, DELETED (D-13); no poster slot survives.' },

    // -- /about --
    { match: /^WhatsApp-Image-2022-05-01-at-1\.44\.03-AM$/, id: 'who-photo', sec: 'who', prov: 'REPLACE',
      note: '/about lead image, 458x458 at 1440. Non-identifying (D-17).' },
    { match: /^Frame-198$/,    id: 'how-band-bg', sec: 'how', prov: 'REPLACE', note: '/about step-row band background.' },
    { match: /^Frame-885226$/, id: 'how-panel-1', sec: 'how', prov: 'REPLACE', note: '/about step-row panel 1 of 2 (390/768 only).' },
    { match: /^Frame-885230$/, id: 'how-panel-2', sec: 'how', prov: 'REPLACE', note: '/about step-row panel 2 of 2 (390/768 only).' },

    // -- /services --
    { match: /^Frame-401$/,          id: 'services-hero-bg',    sec: 'hero',           prov: 'REPLACE', note: '/services hero background.' },
    { match: /^Untitled-design-32$/, id: 'services-hero-photo', sec: 'hero',           prov: 'REPLACE', note: '/services hero photo; aspect changes across breakpoints.' },
    { match: /^Frame-402$/,          id: 'services-grid-bg',    sec: 'services',       prov: 'REPLACE', note: '/services grid band background.' },
    { match: /^Frame-416$/,          id: 'service-detail-bg',   sec: 'service-detail', prov: 'REPLACE', note: 'the detail band repeated for all eight anchors.' },
    { match: /^Rectangle-160-1$/,    id: 'services-tile-1', sec: 'services', prov: 'REPLACE', note: '/services grid tile 1 of 5.' },
    { match: /^Untitled-design-33$/, id: 'services-tile-2', sec: 'services', prov: 'REPLACE', note: '/services grid tile 2 of 5.' },
    { match: /^Untitled-design-34$/, id: 'services-tile-3', sec: 'services', prov: 'REPLACE', note: '/services grid tile 3 of 5.' },
    { match: /^Untitled-design-35$/, id: 'services-tile-4', sec: 'services', prov: 'REPLACE', note: '/services grid tile 4 of 5.' },
    { match: /^Untitled-design-36$/, id: 'services-tile-5', sec: 'services', prov: 'REPLACE', note: '/services grid tile 5 of 5.' },

    // -- /contact --
    { match: /^Frame-883651$/, id: 'breadcrumb-bg', sec: 'breadcrumb', prov: 'REPLACE', note: '/contact breadcrumb band background.' },
  ],

  // No badge grid survives: every badge on this reference is either a review artefact
  // (D-13) or an unearned credential (D-14), and both are handled explicitly above.
  badgePatterns: [],

  // Slots that appear on more than one route are ONE slot, not one per route.
  sharedSlots: {
    'logo-wordmark': true, 'logo-footer': true, 'contact-band-bg': true,
    'contact-gallery-1': true, 'contact-gallery-2': true, 'contact-gallery-3': true,
    'contact-gallery-4': true, 'contact-gallery-5': true, 'contact-gallery-6': true,
    'hero-side-image': true, 'widget-onetap': true, 'icon-chevron': true,
    'icon-topbar-claim': true, 'icon-social': true, 'badge-bbb': true,
    'review-avatar-set': true, 'review-google-mark': true, 'review-rating-strip': true,
    'partner-logo-strip': true, 'testimonial-band-bg': true, 'header-topbar-texture': true,
  },

  // ---------------------------------------------------------------------------
  // PROMPT 5+9 -- PALETTE. Randomized at token-write time (A-7).
  //
  // referenceRamp: the reference's OWN measured values, one per structural slot. The
  // rotation holds every L and C exactly and re-derives H, so what this table fixes is the
  // LIGHTNESS/CHROMA STRUCTURE, not the colours.
  //
  // ONE extraction judgement is recorded here rather than buried. The reference's CTA fill
  // is #fecc32, a light amber at OKLCH L 0.87. Held at that L, a CTA fill measures 1.51:1
  // against a white page AT EVERY HUE, so `CTA fill separates from the page (>=3:1)` is
  // unsatisfiable for any candidate and the generator would reject 4000 rolls in a row.
  // The reference gets away with it by placing its amber almost exclusively on its own dark
  // navy band. Ours is gated on the page surface, so the CTA slot takes the reference's
  // most chromatic INTERACTIVE value instead -- #3d58a9, its measured accent-hover -- and
  // the label goes white. Structure preserved, constraint satisfiable, and recorded in
  // docs/known-divergence.md rather than silently fudged.
  referenceRamp: {
    accent:      '#3d58a9', // measured accent-hover, 34 uses -> the CALL CTA fill
    accentDeep:  '#263e86', // measured --primary, 1254 bg + 673 ink -> CTA hover/pressed
    primary:     '#093145', // measured --primary-light -> the structural dark band
    primaryDeep: '#0b2434', // measured deep surface, 85 uses -> the deeper band
    neutral0:    '#ffffff', // measured page-bg, 484 bg + 4156 ink
    neutral200:  '#f7f7f7', // measured surface, 114 uses
    neutral400:  '#e4e4e4', // measured border, 115 uses
    neutral600:  '#333333', // measured ink-muted, 40 uses
    neutral900:  '#08090e', // measured deepest ink/surface
  },

  // EXEMPT from the hue rotation (A-7). A randomly green error state is a bug.
  semantic: { error: '#b3261e', success: '#1b7f4b', warning: '#8a5200' },

  // What the SHELL ACTUALLY RENDERS, not the ramp in theory. Every row here maps to a real
  // fg/bg combination in tokens.css + the shell components. Gradient bands are declared as
  // one gradient row, never as two flat rows -- that flat model is how Atlas shipped an
  // invisible CTA that "passed AA".
  pairsInUse: [
    // body and headings on the light surfaces
    { name: 'ink-on-page',            fg: 'neutral900', bg: 'neutral0',   min: 4.5 },
    { name: 'ink-muted-on-page',      fg: 'neutral600', bg: 'neutral0',   min: 4.5 },
    { name: 'ink-on-surface',         fg: 'neutral900', bg: 'neutral200', min: 4.5 },
    { name: 'ink-muted-on-surface',   fg: 'neutral600', bg: 'neutral200', min: 4.5 },
    // dark bands
    { name: 'on-band',                fg: 'neutral0',   bg: 'primary',     min: 4.5 },
    { name: 'on-band-muted',          fg: 'neutral200', bg: 'primary',     min: 4.5 },
    { name: 'on-band-deep',           fg: 'neutral0',   bg: 'primaryDeep', min: 4.5 },
    { name: 'on-band-deep-muted',     fg: 'neutral200', bg: 'primaryDeep', min: 4.5 },
    // the hero overlay is a gradient, sampled on its worst stop
    { name: 'hero-overlay-text',      fg: 'neutral0',   bg: { gradient: ['primary', 'primaryDeep'] }, min: 4.5 },
    // the call CTA -- the only filled chromatic action on any page
    { name: 'cta-label',   kind: 'cta', fg: 'neutral0', bg: 'accent',      min: 4.5 },
    { name: 'cta-hover-label',         fg: 'neutral0',  bg: 'accentDeep',  min: 4.5 },
    // the secondary action is filled NEUTRAL, never primary: a primary fill can out-chroma
    // the CTA in the sRGB terms rendertruth measures and fail cta-primacy on every route.
    { name: 'solid-label',             fg: 'neutral0',   bg: 'neutral900', min: 4.5 },
    { name: 'solid-band-label',        fg: 'neutral900', bg: 'neutral200', min: 4.5 },
    // links
    { name: 'link-on-page',            fg: 'accent',     bg: 'neutral0',   min: 4.5 },
    { name: 'link-hover-on-page',      fg: 'accentDeep', bg: 'neutral0',   min: 4.5 },
    { name: 'link-on-surface',         fg: 'accent',     bg: 'neutral200', min: 4.5 },
    // UI edges a user has to perceive
    { name: 'input-border-on-page',    fg: 'borderStrong', bg: 'neutral0',   min: 3 },
    { name: 'input-border-on-surface', fg: 'borderStrong', bg: 'neutral200', min: 3 },
    // focus is TWO layers: a page-coloured inner HALO sitting immediately outside the
    // element and the dark RING outside that (globals.css: box-shadow halo + outline ring
    // at a matching offset). So the ring is never gated against a saturated fill it never
    // touches -- it is gated against the halo, and the halo against whatever it sits on.
    // Gating focus vs the CTA fill directly is unsatisfiable at every hue (both are
    // mid-dark by construction) and rejected 800 of 800 rolls before this was corrected.
    { name: 'focus-ring-on-page', kind: 'focus', fg: 'focus',    bg: 'neutral0',     min: 3 },
    { name: 'focus-halo-on-cta',  kind: 'focus', fg: 'neutral0', bg: 'accent',       min: 3 },
    { name: 'focus-halo-on-band', kind: 'focus', fg: 'neutral0', bg: 'primary',      min: 3 },
    { name: 'focus-halo-on-deep', kind: 'focus', fg: 'neutral0', bg: 'primaryDeep',  min: 3 },
    // semantic text, on the surfaces the form actually renders them on
    { name: 'error-on-page',           fg: 'error',   bg: 'neutral0', min: 4.5 },
    { name: 'success-on-page',         fg: 'success', bg: 'neutral0', min: 4.5 },
    { name: 'warning-on-page',         fg: 'warning', bg: 'neutral0', min: 4.5 },
  ],

  // masterSeed 3126 -- steered, not selected. The auto-selection rule is untouched (highest
  // CTA contrast, ties to the lowest seed); only the master seed moved, 22 master seeds
  // tried, until the WINNER's primary and accent hues both cleared ~30 degrees from every
  // hue already taken in this programme (332 plum, 270 violet-slate, 252 navy, 217 teal,
  // ~150 green, 46 amber). Winner: seed 9611, complementary, primary hue 184 (deep
  // teal-green band), accent hue 4 (crimson-rose CTA). Nearest neighbours are 33 deg
  // (184 vs Titan's 217) and 32 deg (4 vs Atlas's 332), and the two sites differ in ROLE as
  // well: Atlas is plum-dominant, ours is teal-dominant with a crimson call CTA.
  // A stricter >=40 deg search was run and does exist (masterSeed 5378, seed 49048, primary
  // hue 109, accent 79) but 2274 master seeds in, and the >=40 window on this fleet is only
  // hue 82-114 wide -- an olive band with an analogous bronze CTA, 30 deg apart, which is a
  // weaker hierarchy than a complementary pair. Recorded in docs/known-divergence.md.
  masterSeed: 3126,
  gradientSamples: 5,
};
