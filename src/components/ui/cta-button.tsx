import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'backdrop-blur-xl border shadow-lg',
      // Glassmorphism effect
      'relative overflow-hidden',
      'before:absolute before:inset-0 before:bg-gradient-to-r before:opacity-0 before:transition-opacity before:duration-300',
      'hover:before:opacity-100 hover:scale-105 hover:shadow-xl',
    );

    const variantStyles = {
      primary: cn(
        'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
        'hover:bg-cyan-500/30 hover:border-cyan-400/50 hover:text-cyan-300',
        'before:from-cyan-500/20 before:to-cyan-600/20',
        'shadow-cyan-500/20 hover:shadow-cyan-500/40',
      ),
      secondary: cn(
        'bg-slate-700/20 border-slate-600/30 text-slate-300',
        'hover:bg-slate-700/30 hover:border-slate-500/50 hover:text-white',
        'before:from-slate-600/20 before:to-slate-700/20',
        'shadow-slate-500/10 hover:shadow-slate-500/20',
      ),
    };

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : icon ? (
          <span className="relative z-10">{icon}</span>
        ) : null}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

CTAButton.displayName = 'CTAButton';

export { CTAButton };
