'use client';

import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Icon } from './Icon';

/**
 * Accordion — the `faq-two` state, rebuilt as an accessible disclosure list.
 * The target had no ARIA on its accordion; this adds it.
 */
export function Accordion({
  items,
  className = '',
}: {
  items: readonly { q: string; a: ReactNode }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className={`flex flex-col gap-5 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b-${i}`;
        const panelId = `${base}-p-${i}`;
        return (
          <li key={item.q} className="overflow-hidden rounded-md border border-border bg-elevated">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-5 p-6 text-left font-display text-sm font-bold leading-display transition-colors duration-[var(--duration-fast)] ease-standard hover:text-accent"
              >
                <span>{item.q}</span>
                <Icon
                  icon={ChevronDown}
                  className={`shrink-0 transition-transform duration-[var(--duration-base)] ease-standard ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-6 pb-6 font-body text-xs leading-body text-ink-muted"
            >
              {item.a}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
