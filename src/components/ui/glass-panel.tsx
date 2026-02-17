import * as React from 'react';
import { cn } from '@/lib/utils';
import type { GlassmorphismProps } from '@/types';

/**
 * GlassPanel component - larger panel for section containers with glassmorphism effects
 * Feature: portfolio-redesign
 * Requirements: 2.1, 2.2, 2.3
 */

export interface GlassPanelProps extends GlassmorphismProps {
  variant?: 'default' | 'bordered' | 'subtle';
}

const GlassPanel = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof GlassPanelProps> & GlassPanelProps
>(
  (
    {
      variant = 'default',
      blur = 12,
      opacity = 0.08,
      borderOpacity = 0.15,
      shadowIntensity = 'low',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Shadow intensity mapping
    const shadowClasses = {
      low: 'shadow-md shadow-black/5',
      medium: 'shadow-xl shadow-black/10',
      high: 'shadow-2xl shadow-black/15',
    };

    // Variant-specific styles
    const variantClasses = {
      default: 'rounded-2xl',
      bordered: 'rounded-2xl border-2',
      subtle: 'rounded-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base glassmorphism styles
          'relative overflow-hidden',
          'backdrop-blur-[var(--glass-blur)]',
          'bg-white/[var(--glass-opacity)]',
          'border border-white/[var(--glass-border-opacity)]',
          shadowClasses[shadowIntensity],
          variantClasses[variant],
          'transition-all duration-300',
          // Fallback for browsers without backdrop-filter support
          'supports-[backdrop-filter]:bg-white/[var(--glass-opacity)]',
          '[&:not(supports-[backdrop-filter])]:bg-white/90',
          className
        )}
        style={
          {
            '--glass-blur': `${blur}px`,
            '--glass-opacity': opacity,
            '--glass-border-opacity': borderOpacity,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

export { GlassPanel };
