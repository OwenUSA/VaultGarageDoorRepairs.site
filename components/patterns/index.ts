/**
 * The pattern vocabulary. SYNTHESIZE routes may use ONLY these plus
 * components/ui/*. Every entry maps to a named SECTION PATTERN in
 * docs/03-design-system.md with measured geometry at all five breakpoints.
 *
 * Extracted pattern              -> component
 *   hero-new / .inner-form
 *   serviceouter-one
 *   serviceinner-one
 *   serviceareaouter-one         -> Hero (variant full | compact | page)
 *   about-us-new, giving
 *   serviceouter-two
 *   serviceinner-two / -three
 *   message-owner                -> SplitFeature (reverse, tone)
 *   waterproofing, emergency
 *   serviceinner-four            -> CtaBand
 *   faq-one                      -> SectionIntro
 *   marquee                      -> Marquee
 *   breadcrumb                   -> Breadcrumb
 *   steps                        -> StepRow
 *   feature                      -> FeatureRow  (counters REMOVED, FORBIDDEN)
 *   serviceouter-three
 *   blogs-one, services
 *   template-ascend              -> CardGrid
 *   slatedroof-new
 *   roofing-materials            -> CardCarousel
 *   roofing-service              -> TabbedGrid
 *   blankpage                    -> ContentColumn + ProseBlock
 *   contact-new / contact-one    -> ContactBlock + ContactForm
 *   map-sec                      -> ServiceAreaMap
 *   faq-two                      -> FaqBlock
 *   HEADER                       -> SiteHeader
 *   FOOTER                       -> SiteFooter
 *
 * NOT BUILT — CONFIG FORBIDDEN: testimonial, logos, brand-logo, team-one,
 * team-three, and the `.count` counters inside feature.
 *
 * NOTE FOR SECTION AGENTS: import from '@/components/patterns' only. Do not
 * import from sibling files directly — Sections.tsx is the canonical module and
 * other files in this folder may be stale duplicates.
 */
export {
  SplitFeature,
  CtaBand,
  SectionIntro,
  Marquee,
  Breadcrumb,
  StepRow,
  FeatureRow,
  CardGrid,
  CardCarousel,
  TabbedGrid,
  ContentColumn,
  ProseBlock,
} from './Sections';
export type { PatternAction, Step, Fact, GridItem, SplitAt } from './Sections';

export { Hero } from './Hero';
export type { HeroVariant } from './Hero';

export { ContactBlock } from './ContactBlock';
export { ContactForm } from './ContactForm';
export { ServiceAreaMap } from './ServiceAreaMap';
export { FaqBlock } from './FaqBlock';

export { SiteHeader } from './SiteHeader';
export { SiteFooter } from './SiteFooter';

/**
 * SHARED TAIL — the contraction applied once by the lead, per the gate ruling.
 *
 *   target:  map-sec > testimonial > contact-new
 *   ours:    map-sec > contact-new
 *
 * `testimonial` is CONFIG FORBIDDEN (reviews). Every route that had the tail
 * composes <SharedTail /> so the removal lives in exactly one place and section
 * agents never re-derive it.
 */
export { SharedTail } from './SharedTail';
