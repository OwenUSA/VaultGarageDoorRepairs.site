import type { ElementType, ReactNode } from 'react';

/** Container — the measured width ladder 360/610/720/930/1120. */
export function Container({
  as: Tag = 'div',
  className = '',
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`container-site ${className}`}>{children}</Tag>;
}
