import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const iconButton =
  'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fg/15 text-muted transition-colors duration-200 hover:border-fg/35 hover:text-fg';

/** Custom properties (--d, --to, ...) need a cast in React's CSSProperties. */
export const vars = (v: Record<string, string | number>) => v as CSSProperties;

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('chip', className)}>{children}</span>;
}

export function ChipList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}

export function Bullets({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('max-w-[48rem] space-y-3.5', className)}>
      {items.map((item) => (
        <li key={item} className="relative pl-6 leading-relaxed text-muted">
          <span aria-hidden className="absolute left-0 top-[0.78em] h-px w-3.5 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function SectionHeading({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-14 sm:mb-20" data-reveal>
      <p className="eyebrow flex items-center gap-4">
        <span className="text-accent">{index}</span>
        <span aria-hidden className="h-px w-10 bg-fg/20" />
        <span>{label}</span>
      </p>
      <h2 id={id} className="h2 mt-6 max-w-4xl">
        {title}
      </h2>
      {children ? <div className="mt-6 max-w-prose text-lg text-muted">{children}</div> : null}
    </div>
  );
}
