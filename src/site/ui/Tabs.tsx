'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * WAI-ARIA tabs: roving tabindex, arrow / Home / End keys. Every panel is in
 * the server-rendered HTML; inactive ones are just `hidden`.
 */
export function Tabs({ items, label, prefix }: { items: TabItem[]; label: string; prefix: string }) {
  const [active, setActive] = useState(items[0].id);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (i: number) => {
    const next = (i + items.length) % items.length;
    setActive(items[next].id);
    buttons.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight') move(i + 1);
    else if (e.key === 'ArrowLeft') move(i - 1);
    else if (e.key === 'Home') move(0);
    else if (e.key === 'End') move(items.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="-mx-1 flex gap-1 overflow-x-auto border-b border-fg/10 px-1 pb-px"
      >
        {items.map((item, i) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${prefix}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${prefix}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'relative -mb-px shrink-0 whitespace-nowrap rounded-t-lg px-4 py-3 font-mono text-[13px] transition-colors',
                selected ? 'text-fg' : 'text-muted hover:text-fg',
              )}
            >
              {item.label}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent transition-opacity duration-200',
                  selected ? 'opacity-100' : 'opacity-0',
                )}
              />
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${prefix}-panel-${item.id}`}
          aria-labelledby={`${prefix}-tab-${item.id}`}
          hidden={item.id !== active}
          tabIndex={0}
          className="tab-panel pt-8 focus-visible:outline-offset-8"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
