'use client';

import type { ElementType, ReactNode, PointerEvent } from 'react';
import { cn } from '@/lib/utils';

/**
 * Card wrapper that feeds the pointer position to CSS (--mx / --my) so the
 * `.spotlight` gradient follows the cursor. Purely decorative; no-op on touch.
 */
export function Spotlight({
  as: Tag = 'div',
  className,
  children,
  id,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Tag id={id} className={cn('card spotlight', className)} onPointerMove={onMove}>
      {children}
    </Tag>
  );
}
