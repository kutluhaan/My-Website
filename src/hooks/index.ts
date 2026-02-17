/**
 * Hooks exports
 * Feature: portfolio-redesign
 */

export { useViewportObserver, useIntersectionObserver, useStaggeredAnimation, useScrollProgress } from './useViewportObserver';
export { useReducedMotion, useAnimationDuration, useAnimationsEnabled } from './useReducedMotion';
export { useMediaQuery, useBreakpoint, useIsMobile, useIsTablet, useIsDesktop, breakpoints } from './useMediaQuery';

export type { UseViewportObserverOptions, UseIntersectionObserverOptions, UseStaggeredAnimationOptions } from './useViewportObserver';
export type { Breakpoint } from './useMediaQuery';
