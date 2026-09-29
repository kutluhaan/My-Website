import { Fragment } from 'react';
import { cn } from '@/lib/utils';

export interface FlowNode {
  label: string;
  sub?: string;
  via?: string;
  accent?: boolean;
}

/**
 * Small architecture strip. Vertical on phones, horizontal from lg up.
 * Connectors carry the protocol / transport ("Kafka", "gRPC", ...).
 */
export function Flow({ steps, label }: { steps: readonly FlowNode[]; label: string }) {
  return (
    <ol aria-label={label} className="flex flex-col lg:flex-row lg:items-stretch">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          {i > 0 && (
            <li
              aria-hidden
              className="flex items-center justify-center gap-2 py-1.5 text-faint lg:w-[3.75rem] lg:shrink-0 lg:flex-col lg:gap-0.5 lg:py-0"
            >
              <span className="font-mono text-[10px] leading-none tracking-wide">
                {step.via}
              </span>
              <span className="text-sm leading-none">
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>
            </li>
          )}
          <li
            className={cn(
              'min-w-0 rounded-xl border px-4 py-3.5 lg:flex-1',
              step.accent
                ? 'border-accent/45 bg-accent/[0.07]'
                : 'border-fg/10 bg-surface-2',
            )}
          >
            <p className="font-mono text-[13px] font-medium leading-snug text-fg">{step.label}</p>
            {step.sub ? (
              <p className="mt-1 text-xs leading-snug text-muted">{step.sub}</p>
            ) : null}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
