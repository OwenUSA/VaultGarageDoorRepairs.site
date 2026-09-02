'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { Icon } from './Icon';

/**
 * Carousel — replaces the target's 9 slick instances with a CSS scroll-snap
 * track. No carousel library: scroll-snap plus two controls reproduces the
 * measured behaviour, keeps keyboard and touch scrolling native, and degrades
 * to a plain horizontal scroller with JS off.
 *
 * `perView` mirrors slick `slidesToShow` and its `responsive` config.
 *
 * NOTE: the basis classes are a static lookup, not interpolated. Tailwind's JIT
 * scans source text, so a computed class name like `basis-[calc(100%/3)]` built
 * from a variable would never be generated.
 */
export type PerView = 1 | 2 | 3 | 4;

const baseBasis: Record<PerView, string> = {
  1: 'basis-full',
  2: 'basis-1/2',
  3: 'basis-1/3',
  4: 'basis-1/4',
};

const mdBasis: Record<PerView, string> = {
  1: 'md:basis-full',
  2: 'md:basis-1/2',
  3: 'md:basis-1/3',
  4: 'md:basis-1/4',
};

const lgBasis: Record<PerView, string> = {
  1: 'lg:basis-full',
  2: 'lg:basis-1/2',
  3: 'lg:basis-1/3',
  4: 'lg:basis-1/4',
};

export function Carousel({
  children,
  perView = { base: 1, md: 2, lg: 3 },
  label,
  className = '',
}: {
  children: ReactNode[];
  perView?: { base: PerView; md?: PerView; lg?: PerView };
  label: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  const basis = [
    baseBasis[perView.base],
    perView.md ? mdBasis[perView.md] : '',
    perView.lg ? lgBasis[perView.lg] : '',
  ].join(' ');

  return (
    <div
      className={`relative ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <li key={i} className={`shrink-0 grow-0 snap-start ${basis}`}>
            {child}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex gap-3">
        <Button variant="arrow" onClick={() => page(-1)} disabled={atStart} aria-label="Previous slide">
          <Icon icon={ChevronLeft} />
        </Button>
        <Button variant="arrow" onClick={() => page(1)} disabled={atEnd} aria-label="Next slide">
          <Icon icon={ChevronRight} />
        </Button>
      </div>
    </div>
  );
}
