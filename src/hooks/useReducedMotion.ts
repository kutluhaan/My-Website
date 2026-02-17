/**
 * Reduced motion support hook
 * Feature: portfolio-redesign
 * Requirements: 4.4
 */

import { useEffect, useState } from 'react';
import { REDUCED_MOTION_QUERY } from '@/config/animations';

// ============================================================================
// useReducedMotion Hook
// ============================================================================

/**
 * Hook to detect if user prefers reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') {
      return;
    }

    // Check if matchMedia is supported
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener (use addEventListener for modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

// ============================================================================
// useAnimationConfig Hook
// ============================================================================

/**
 * Hook to get animation config that respects reduced motion preference
 * @param normalDuration - Duration in ms for normal animation
 * @param reducedDuration - Duration in ms for reduced motion (default: 0)
 * @returns Animation duration to use
 */
export function useAnimationDuration(
  normalDuration: number,
  reducedDuration: number = 0
): number {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? reducedDuration : normalDuration;
}

/**
 * Hook to conditionally enable animations based on reduced motion preference
 * @returns boolean indicating if animations should be enabled
 */
export function useAnimationsEnabled(): boolean {
  const prefersReducedMotion = useReducedMotion();
  return !prefersReducedMotion;
}
