'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface GridItem {
  id: string;
  kinds: string[];
  node: ReactNode;
}

/**
 * Filter chips + grid. The cards are rendered on the server and passed in as
 * nodes, so this small client component ships no illustration code.
 */
export function ProjectGrid({ items, labels }: { items: GridItem[]; labels: Record<string, string> }) {
  const [filter, setFilter] = useState('all');
  const kinds = Object.keys(labels);
  const shown = items.filter((i) => filter === 'all' || i.kinds.includes(filter)).length;

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {['all', ...kinds].map((k) => {
          const on = filter === k;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(k)}
              className={cn(
                'rounded-full border px-4 py-2 font-mono text-xs transition-all duration-200',
                on
                  ? 'border-accent bg-accent text-accent-fg shadow-[0_8px_20px_-10px_rgb(var(--accent)/0.8)]'
                  : 'border-fg/[0.12] bg-surface text-muted hover:-translate-y-0.5 hover:border-fg/30 hover:text-fg',
              )}
            >
              {k === 'all' ? 'All' : labels[k]}
            </button>
          );
        })}
        <span className="sr-only" aria-live="polite">
          {shown} projects shown
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            data-kinds={item.kinds.join(' ')}
            hidden={!(filter === 'all' || item.kinds.includes(filter))}
            className="min-w-0"
          >
            {item.node}
          </div>
        ))}
      </div>
    </div>
  );
}
