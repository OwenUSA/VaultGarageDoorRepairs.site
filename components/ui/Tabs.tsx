'use client';

import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';

/**
 * Tabs — the `roofing-service .main-tabs` state (measured: 2 tabs,
 * Residential / Commercial) plus the servicearea and step tab groups.
 * Full roving-tabindex keyboard support; the target had none.
 */
export function Tabs({
  items,
  className = '',
}: {
  items: readonly { label: string; panel: ReactNode }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const base = useId();

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') setActive((i) => (i + 1) % items.length);
    else if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + items.length) % items.length);
    else if (e.key === 'Home') setActive(0);
    else if (e.key === 'End') setActive(items.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className={className}>
      <div role="tablist" onKeyDown={onKey} className="flex flex-wrap gap-3">
        {items.map((t, i) => (
          <button
            key={t.label}
            id={`${base}-t-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`${base}-p-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            /* WCAG 2.5.8: the tab measures 146x38 at 390 on its padding alone. */
            className={`inline-flex min-h-[44px] items-center px-9 py-3 font-display text-xs font-bold uppercase leading-display transition-colors duration-[var(--duration-base)] ease-standard ${
              active === i ? 'bg-cta text-cta-ink' : 'bg-transparent hover:text-cta'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {items.map((t, i) => (
        <div
          key={t.label}
          id={`${base}-p-${i}`}
          role="tabpanel"
          aria-labelledby={`${base}-t-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="mt-9"
        >
          {t.panel}
        </div>
      ))}
    </div>
  );
}
