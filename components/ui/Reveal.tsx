import type { ReactNode } from 'react';

/**
 * Reveal — a NO-OP wrapper, deliberately, per docs/behavior/08.
 *
 * The Prompt 1 profile probed every reference page at every breakpoint and
 * found no motion library initialised anywhere: gsap false, ScrollTrigger
 * false, lenis false, locomotive false, aos false, wow false. The three
 * `data-aos` attributes in the theme are dead — the library that would read
 * them is not on any page. There is no choreography to clone, so there is
 * nothing here to implement.
 *
 * This file previously carried an IntersectionObserver and `.reveal { opacity:
 * 0 }`, against its own spec. `rendertruth.mjs` measured the consequence:
 * **165 text boxes painting as one flat tone — "no visible text"** — across all
 * five routes, because anything the observer had not yet reached was invisible
 * at paint time. That is the worst failure mode available on a page whose
 * purpose is a phone number: an observer error, a script error, an old browser,
 * a printed page or a bot leaves the content permanently invisible.
 *
 * So: content renders in its final position at its final opacity. No entrance
 * state, no observer, no `opacity: 0` anywhere. Do not reintroduce either —
 * the wrapper stays only so section code keeps a stable seam.
 */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string; once?: boolean }) {
  return <div className={className}>{children}</div>;
}
