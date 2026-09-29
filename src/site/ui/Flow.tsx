import { Fragment } from 'react';
import { cn } from '@/lib/utils';

export interface FlowNode {
  label: string;
  sub?: string;
  via?: string;
  accent?: boolean;
}

/**
 * Architecture strip. Vertical on phones, horizontal from lg up.
 * Connectors carry the transport ("Kafka", "gRPC", ...).
 */
export function Flow({ steps, label }: { steps: readonly FlowNode[]; label: string }) {
  return (
    <ol aria-label={label} className="flex flex-col lg:flex-row lg:items-stretch">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          {i > 0 && (
            <li aria-hidden className="flex items-center justify-center gap-2 py-1.5 text-faint lg:w-[3.5rem] lg:shrink-0 lg:flex-col lg:gap-1 lg:py-0">
              <span className="text-[11px] leading-none">{step.via}</span>
              <span className="text-accent">
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>
            </li>
          )}
          <li className={cn('min-w-0 rounded-sm border px-4 py-3.5 lg:flex-1', step.accent ? 'border-accent/60 bg-accent/[0.06]' : 'border-fg/[0.12] bg-surface')}>
            <p className={cn('text-[13px] font-medium leading-snug', step.accent ? 'text-accent' : 'text-fg')}>{step.label}</p>
            {step.sub ? <p className="mt-1.5 text-xs leading-snug text-muted">{step.sub}</p> : null}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
