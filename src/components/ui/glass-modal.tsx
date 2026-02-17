import * as React from 'react';
import { cn } from '@/lib/utils';
import type { GlassmorphismProps } from '@/types';

/**
 * GlassModal component - modal overlay with glassmorphism backdrop
 * Feature: portfolio-redesign
 * Requirements: 2.1, 2.2, 2.3
 */

export interface GlassModalProps extends GlassmorphismProps {
  open?: boolean;
  onClose?: () => void;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const GlassModal = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof GlassModalProps> & GlassModalProps
>(
  (
    {
      open = false,
      onClose,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      size = 'md',
      blur = 16,
      opacity = 0.1,
      borderOpacity = 0.2,
      shadowIntensity = 'high',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Handle escape key press
    React.useEffect(() => {
      if (!open || !closeOnEscape || !onClose) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);

    // Prevent body scroll when modal is open
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && onClose && e.target === e.currentTarget) {
        onClose();
      }
    };

    // Size-specific styles
    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    // Shadow intensity mapping
    const shadowClasses = {
      low: 'shadow-lg shadow-black/10',
      medium: 'shadow-xl shadow-black/20',
      high: 'shadow-2xl shadow-black/30',
    };

    if (!open) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Glassmorphism backdrop */}
        <div
          className={cn(
            'absolute inset-0',
            'backdrop-blur-md',
            'bg-black/30',
            'transition-opacity duration-300',
            'supports-[backdrop-filter]:bg-black/30',
            '[&:not(supports-[backdrop-filter])]:bg-black/60'
          )}
          aria-hidden="true"
        />

        {/* Modal content */}
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(
            // Base glassmorphism styles
            'relative',
            'w-full',
            sizeClasses[size],
            'backdrop-blur-[var(--glass-blur)]',
            'bg-white/[var(--glass-opacity)]',
            'border border-white/[var(--glass-border-opacity)]',
            'rounded-2xl',
            shadowClasses[shadowIntensity],
            // Animation
            'animate-in fade-in-0 zoom-in-95 duration-300',
            // Fallback for browsers without backdrop-filter support
            'supports-[backdrop-filter]:bg-white/[var(--glass-opacity)]',
            '[&:not(supports-[backdrop-filter])]:bg-white/95',
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
      </div>
    );
  }
);

GlassModal.displayName = 'GlassModal';

// Subcomponents for consistent modal structure
const GlassModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 pb-4', className)}
    {...props}
  />
));
GlassModalHeader.displayName = 'GlassModalHeader';

const GlassModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
GlassModalTitle.displayName = 'GlassModalTitle';

const GlassModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-400', className)}
    {...props}
  />
));
GlassModalDescription.displayName = 'GlassModalDescription';

const GlassModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
GlassModalContent.displayName = 'GlassModalContent';

const GlassModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-end gap-2 p-6 pt-4', className)}
    {...props}
  />
));
GlassModalFooter.displayName = 'GlassModalFooter';

export {
  GlassModal,
  GlassModalHeader,
  GlassModalTitle,
  GlassModalDescription,
  GlassModalContent,
  GlassModalFooter,
};
