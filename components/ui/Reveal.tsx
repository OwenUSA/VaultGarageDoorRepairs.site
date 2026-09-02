'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Reveal — IntersectionObserver + CSS transition. Nothing more.
 *
 * The behaviour profile (docs/04) found NO scroll-linked motion on the target:
 * no GSAP, no ScrollTrigger, no Lenis, no Locomotive, no AOS, no split-text.
 * The only two scroll handlers were a boolean header class and a FORBIDDEN
 * counter. A motion library would be dead weight, so there is none.
 */
export function Reveal({
  children,
  className = '',
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div ref={ref} className={`reveal ${className}`} data-visible={visible ? 'true' : 'false'}>
      {children}
    </div>
  );
}
