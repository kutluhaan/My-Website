/**
 * ViewportObserver hook for entrance animations
 * Feature: portfolio-redesign
 * Requirements: 3.4, 4.3
 */

import { useEffect, useRef, useState } from 'react';
import type { ViewportTrigger } from '@/types';
import { VIEWPORT_TRIGGERS } from '@/config/animations';

// ============================================================================
// useViewportObserver Hook
// ============================================================================

export interface UseViewportObserverOptions extends Partial<ViewportTrigger> {
  enabled?: boolean;
}

export function useViewportObserver(
  options: UseViewportObserverOptions = {}
): [React.RefObject<HTMLElement>, boolean] {
  const {
    threshold = VIEWPORT_TRIGGERS.DEFAULT.threshold,
    triggerOnce = VIEWPORT_TRIGGERS.DEFAULT.triggerOnce,
    rootMargin = VIEWPORT_TRIGGERS.DEFAULT.rootMargin,
    enabled = true,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    
    const element = elementRef.current;
    if (!element) return;

    // Check if Intersection Observer is supported
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: assume element is visible
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!triggerOnce || !hasTriggered.current) {
              setIsVisible(true);
              hasTriggered.current = true;
            }
          } else {
            if (!triggerOnce) {
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, rootMargin, enabled]);

  return [elementRef, isVisible];
}

// ============================================================================
// useIntersectionObserver Hook (more generic)
// ============================================================================

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  enabled?: boolean;
}

export function useIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: UseIntersectionObserverOptions = {}
): React.RefObject<HTMLElement> {
  const {
    threshold = 0,
    rootMargin = '0px',
    root = null,
    enabled = true,
  } = options;

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled) return;
    
    const element = elementRef.current;
    if (!element) return;

    // Check if Intersection Observer is supported
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(callback);
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [callback, threshold, rootMargin, root, enabled]);

  return elementRef;
}

// ============================================================================
// useStaggeredAnimation Hook
// ============================================================================

export interface UseStaggeredAnimationOptions {
  count: number;
  baseDelay?: number;
  stagger?: number;
  enabled?: boolean;
}

export function useStaggeredAnimation(
  options: UseStaggeredAnimationOptions
): [React.RefObject<HTMLElement>[], boolean[]] {
  const { count, baseDelay = 0, stagger = 100, enabled = true } = options;

  const refs = useRef<React.RefObject<HTMLElement>[]>(
    Array.from({ length: count }, () => ({ current: null }))
  );
  const [visibilityStates, setVisibilityStates] = useState<boolean[]>(
    Array(count).fill(false)
  );

  useEffect(() => {
    if (!enabled) return;

    // Check if Intersection Observer is supported
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: make all visible with stagger
      refs.current.forEach((_, index) => {
        setTimeout(() => {
          setVisibilityStates((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }, baseDelay + index * stagger);
      });
      return;
    }

    const observers: IntersectionObserver[] = [];

    refs.current.forEach((ref, index) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibilityStates((prev) => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              }, index * stagger);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px',
        }
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [count, baseDelay, stagger, enabled]);

  return [refs.current, visibilityStates];
}

// ============================================================================
// useScrollProgress Hook
// ============================================================================

export function useScrollProgress(elementRef: React.RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Element is above viewport
      if (rect.bottom < 0) {
        setProgress(1);
        return;
      }

      // Element is below viewport
      if (rect.top > windowHeight) {
        setProgress(0);
        return;
      }

      // Element is in viewport
      const elementHeight = rect.height;
      const scrolledPast = Math.max(0, -rect.top);
      const calculatedProgress = Math.min(
        Math.max(scrolledPast / elementHeight, 0),
        1
      );

      setProgress(calculatedProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]);

  return progress;
}
