import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Custom properties (--d, --to, ...) need a cast in React's CSSProperties. */
export const vars = (v: Record<string, string | number>) => v as CSSProperties;

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('chip', className)}>{children}</span>;
}

export function ChipList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
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
    <ul className={cn('max-w-[52rem] space-y-3.5', className)}>
      {items.map((item) => (
        <li key={item} className="relative pl-6 leading-relaxed text-muted">
          <span aria-hidden className="absolute left-0 top-[0.8em] h-px w-3 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Section header: small label, then a serif headline. */
export function SectionHead({
  id,
  no,
  label,
  title,
  children,
}: {
  id: string;
  no: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-14 max-w-3xl sm:mb-20">
      <p data-reveal className="hud flex items-center gap-3">
        <span className="text-accent">{no}</span>
        <span aria-hidden className="h-px w-8 bg-fg/20" />
        {label}
      </p>
      <h2 id={id} data-reveal className="display display-lg mt-6" style={{ transitionDelay: '80ms' }}>
        {title}
      </h2>
      {children ? (
        <p data-reveal className="lede mt-7 max-w-prose" style={{ transitionDelay: '160ms' }}>
          {children}
        </p>
      ) : null}
    </div>
  );
}

/** Small "table" row: label on the left, value on the right. */
export function KV({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-fg/10 py-4 sm:grid-cols-[8rem_1fr]">
      <dt className="hud pt-0.5">{k}</dt>
      <dd className="text-[15px] text-fg">{children}</dd>
    </div>
  );
}
