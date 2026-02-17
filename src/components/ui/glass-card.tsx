import * as React from 'react';
import { cn } from '@/lib/utils';
import type { GlassCardProps } from '@/types';

/**
 * GlassCard component with glassmorphism effects
 * Feature: portfolio-redesign
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */

const GlassCard = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof GlassCardProps> & GlassCardProps
>(
  (
    {
      variant = 'default',
      blur = 10,
      opacity = 0.1,
      borderOpacity = 0.2,
      shadowIntensity = 'medium',
      interactive = false,
      animateOnView = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Shadow intensity mapping
    const shadowClasses = {
      low: 'shadow-sm',
      medium: 'shadow-lg shadow-black/10',
      high: 'shadow-2xl shadow-black/20',
    };

    // Variant-specific styles
    const variantClasses = {
      default: 'rounded-xl',
      elevated: 'rounded-xl translate-y-0 hover:translate-y-[-2px]',
      flat: 'rounded-lg',
    };

    // Interactive hover effects
    const interactiveClasses = interactive
      ? 'transition-all duration-300 hover:shadow-xl hover:shadow-black/20 cursor-pointer'
      : 'transition-all duration-300';

    // Animation on view
    const animationClasses = animateOnView ? 'opacity-0 animate-fade-in' : '';

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
          interactiveClasses,
          animationClasses,
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

GlassCard.displayName = 'GlassCard';

// Subcomponents for consistent structure
const GlassCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
GlassCardHeader.displayName = 'GlassCardHeader';

const GlassCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
GlassCardTitle.displayName = 'GlassCardTitle';

const GlassCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-400', className)}
    {...props}
  />
));
GlassCardDescription.displayName = 'GlassCardDescription';

const GlassCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
GlassCardContent.displayName = 'GlassCardContent';

const GlassCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
GlassCardFooter.displayName = 'GlassCardFooter';

export {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter,
};
