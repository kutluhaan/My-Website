import * as React from 'react';
import { cn } from '@/lib/utils';
import type { GlassmorphismProps } from '@/types';

/**
 * GlassButton component - interactive button with glassmorphism effects
 * Feature: portfolio-redesign
 * Requirements: 2.1, 2.2, 2.3
 */

export interface GlassButtonProps extends Omit<GlassmorphismProps, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
}

const GlassButton = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof GlassButtonProps> & GlassButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      blur = 10,
      opacity = 0.15,
      borderOpacity = 0.3,
      shadowIntensity = 'medium',
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Shadow intensity mapping
    const shadowClasses = {
      low: 'shadow-sm',
      medium: 'shadow-md shadow-black/10',
      high: 'shadow-lg shadow-black/20',
    };

    // Size-specific styles
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    // Variant-specific styles
    const variantClasses = {
      primary: cn(
        'bg-white/[var(--glass-opacity)]',
        'border-white/[var(--glass-border-opacity)]',
        'hover:bg-white/25 hover:border-white/40',
        'active:bg-white/30 active:scale-[0.98]',
        'focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent'
      ),
      secondary: cn(
        'bg-white/[calc(var(--glass-opacity)*0.7)]',
        'border-white/[calc(var(--glass-border-opacity)*0.7)]',
        'hover:bg-white/15 hover:border-white/25',
        'active:bg-white/20 active:scale-[0.98]',
        'focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent'
      ),
      ghost: cn(
        'bg-transparent',
        'border-transparent',
        'hover:bg-white/10 hover:border-white/20',
        'active:bg-white/15 active:scale-[0.98]',
        'focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent'
      ),
    };

    // Disabled styles
    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer';

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base glassmorphism styles
          'relative overflow-hidden',
          'backdrop-blur-[var(--glass-blur)]',
          'border',
          'rounded-lg',
          shadowClasses[shadowIntensity],
          sizeClasses[size],
          variantClasses[variant],
          disabledClasses,
          // Interactive transitions
          'transition-all duration-200 ease-out',
          'hover:shadow-lg hover:shadow-black/20',
          'focus:outline-none',
          // Fallback for browsers without backdrop-filter support
          'supports-[backdrop-filter]:bg-white/[var(--glass-opacity)]',
          '[&:not(supports-[backdrop-filter])]:bg-white/80',
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
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export { GlassButton };
