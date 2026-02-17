/**
 * Viewport and responsive breakpoint utilities
 * Feature: portfolio-redesign
 */

// ============================================================================
// Breakpoint Constants
// ============================================================================

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
} as const;

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

// ============================================================================
// Viewport Detection
// ============================================================================

/**
 * Get current breakpoint based on window width
 * @returns Current breakpoint ('mobile', 'tablet', or 'desktop')
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < BREAKPOINTS.MOBILE) {
    return 'mobile';
  } else if (width < BREAKPOINTS.TABLET) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

/**
 * Check if current viewport is mobile
 * @returns True if viewport width is below mobile breakpoint
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.MOBILE;
}

/**
 * Check if current viewport is tablet
 * @returns True if viewport width is between mobile and tablet breakpoints
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.TABLET;
}

/**
 * Check if current viewport is desktop
 * @returns True if viewport width is above tablet breakpoint
 */
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return true;
  return window.innerWidth >= BREAKPOINTS.TABLET;
}

/**
 * Check if viewport matches a media query
 * @param query - Media query string
 * @returns True if media query matches
 */
export function matchesMediaQuery(query: string): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
}

/**
 * Check if user prefers reduced motion
 * @returns True if prefers-reduced-motion is enabled
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if device supports touch
 * @returns True if touch is supported
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Check if device supports hover
 * @returns True if hover is supported
 */
export function supportsHover(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(hover: hover)').matches;
}

// ============================================================================
// Viewport Dimensions
// ============================================================================

/**
 * Get viewport width
 * @returns Viewport width in pixels
 */
export function getViewportWidth(): number {
  if (typeof window === 'undefined') return 0;
  return window.innerWidth;
}

/**
 * Get viewport height
 * @returns Viewport height in pixels
 */
export function getViewportHeight(): number {
  if (typeof window === 'undefined') return 0;
  return window.innerHeight;
}

/**
 * Get viewport dimensions
 * @returns Object with width and height
 */
export function getViewportDimensions(): { width: number; height: number } {
  return {
    width: getViewportWidth(),
    height: getViewportHeight(),
  };
}

/**
 * Get document dimensions
 * @returns Object with width and height
 */
export function getDocumentDimensions(): { width: number; height: number } {
  if (typeof document === 'undefined') {
    return { width: 0, height: 0 };
  }
  
  return {
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  };
}

// ============================================================================
// Touch Target Validation
// ============================================================================

export const MIN_TOUCH_TARGET_SIZE = 44; // pixels, per WCAG guidelines

/**
 * Check if an element meets minimum touch target size
 * @param element - Element to check
 * @param minSize - Minimum size in pixels (default: 44px)
 * @returns True if element meets minimum size
 */
export function meetsTouchTargetSize(
  element: HTMLElement,
  minSize: number = MIN_TOUCH_TARGET_SIZE
): boolean {
  const rect = element.getBoundingClientRect();
  return rect.width >= minSize && rect.height >= minSize;
}

/**
 * Get touch target size for an element
 * @param element - Element to measure
 * @returns Object with width and height
 */
export function getTouchTargetSize(element: HTMLElement): { width: number; height: number } {
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
}

// ============================================================================
// CSS Support Detection
// ============================================================================

/**
 * Check if CSS backdrop-filter is supported
 * @returns True if backdrop-filter is supported
 */
export function supportsBackdropFilter(): boolean {
  if (typeof CSS === 'undefined') return false;
  return CSS.supports('backdrop-filter', 'blur(10px)') || CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
}

/**
 * Check if CSS custom properties are supported
 * @returns True if custom properties are supported
 */
export function supportsCustomProperties(): boolean {
  if (typeof CSS === 'undefined') return false;
  return CSS.supports('--test', '0');
}

/**
 * Check if CSS scroll-behavior is supported
 * @returns True if scroll-behavior is supported
 */
export function supportsScrollBehavior(): boolean {
  if (typeof document === 'undefined') return false;
  return 'scrollBehavior' in document.documentElement.style;
}

/**
 * Check if Intersection Observer is supported
 * @returns True if Intersection Observer is supported
 */
export function supportsIntersectionObserver(): boolean {
  if (typeof window === 'undefined') return false;
  return 'IntersectionObserver' in window;
}

// ============================================================================
// Orientation Detection
// ============================================================================

export type Orientation = 'portrait' | 'landscape';

/**
 * Get current screen orientation
 * @returns 'portrait' or 'landscape'
 */
export function getOrientation(): Orientation {
  if (typeof window === 'undefined') return 'landscape';
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

/**
 * Check if device is in portrait orientation
 * @returns True if in portrait orientation
 */
export function isPortrait(): boolean {
  return getOrientation() === 'portrait';
}

/**
 * Check if device is in landscape orientation
 * @returns True if in landscape orientation
 */
export function isLandscape(): boolean {
  return getOrientation() === 'landscape';
}
