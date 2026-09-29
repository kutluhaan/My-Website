import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Card wrapper with the cursor-follow highlight. The pointer tracking lives in
 * the shared page effects (it looks for `.spotlight`), so this stays a plain
 * server component.
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
  return (
    <Tag id={id} className={cn('card spotlight', className)}>
      {children}
    </Tag>
  );
}
