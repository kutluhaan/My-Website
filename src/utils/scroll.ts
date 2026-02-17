/**
 * Scroll calculation and viewport detection utilities
 * Feature: portfolio-redesign
 */

// ============================================================================
// Scroll Progress Calculations
// ============================================================================

/**
 * Calculate scroll progress as a value between 0 and 1
 * @param scrollY - Current vertical scroll position
 * @param documentHeight - Total document height
 * @param windowHeight - Viewport height
 * @returns Scroll progress (0 at top, 1 at bottom)
 */
export function calculateScrollProgress(
  scrollY: number,
  documentHeight: number,
  windowHeight: number
): number {
  const maxScroll = documentHeight - windowHeight;
  if (maxScroll <= 0) return 0;
  return Math.min(Math.max(scrollY / maxScroll, 0), 1);
}

/**
 * Get current scroll progress from window
 * @returns Scroll progress (0 at top, 1 at bottom)
 */
export function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0;
  
  const scrollY = window.scrollY || window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  
  return calculateScrollProgress(scrollY, documentHeight, windowHeight);
}

/**
 * Calculate scroll progress within a specific element
 * @param element - The element to calculate scroll progress for
 * @returns Scroll progress (0 at top, 1 at bottom)
 */
export function getElementScrollProgress(element: HTMLElement): number {
  if (typeof window === 'undefined') return 0;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // Element is above viewport
  if (rect.bottom < 0) return 1;
  
  // Element is below viewport
  if (rect.top > windowHeight) return 0;
  
  // Element is in viewport
  const elementHeight = rect.height;
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const scrolledPast = Math.max(0, -rect.top);
  
  return Math.min(Math.max(scrolledPast / elementHeight, 0), 1);
}

// ============================================================================
// Viewport Detection
// ============================================================================

/**
 * Check if an element is in the viewport
 * @param element - The element to check
 * @param threshold - Percentage of element that must be visible (0-1)
 * @param rootMargin - Margin around viewport (CSS margin format)
 * @returns True if element is in viewport
 */
export function isInViewport(
  element: HTMLElement,
  threshold: number = 0,
  rootMargin: string = '0px'
): boolean {
  if (typeof window === 'undefined') return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  // Parse root margin
  const margins = parseRootMargin(rootMargin);
  
  // Calculate adjusted viewport bounds
  const viewportTop = 0 - margins.top;
  const viewportBottom = windowHeight + margins.bottom;
  const viewportLeft = 0 - margins.left;
  const viewportRight = windowWidth + margins.right;
  
  // Calculate visible area
  const visibleHeight = Math.min(rect.bottom, viewportBottom) - Math.max(rect.top, viewportTop);
  const visibleWidth = Math.min(rect.right, viewportRight) - Math.max(rect.left, viewportLeft);
  
  const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
  const totalArea = rect.height * rect.width;
  
  if (totalArea === 0) return false;
  
  const visibleRatio = visibleArea / totalArea;
  return visibleRatio >= threshold;
}

/**
 * Parse CSS margin string into pixel values
 * @param rootMargin - CSS margin format (e.g., "10px 20px 30px 40px")
 * @returns Object with top, right, bottom, left margins in pixels
 */
function parseRootMargin(rootMargin: string): { top: number; right: number; bottom: number; left: number } {
  const parts = rootMargin.split(' ').map(part => {
    const value = parseFloat(part);
    return isNaN(value) ? 0 : value;
  });
  
  // CSS margin shorthand: top, right, bottom, left
  if (parts.length === 1) {
    return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
  } else if (parts.length === 2) {
    return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
  } else if (parts.length === 3) {
    return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] };
  } else {
    return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] };
  }
}

/**
 * Get the percentage of an element visible in the viewport
 * @param element - The element to check
 * @returns Percentage visible (0-1)
 */
export function getVisibilityRatio(element: HTMLElement): number {
  if (typeof window === 'undefined') return 0;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  
  const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
  const totalArea = rect.height * rect.width;
  
  if (totalArea === 0) return 0;
  
  return Math.min(Math.max(visibleArea / totalArea, 0), 1);
}

// ============================================================================
// Section Detection
// ============================================================================

/**
 * Find the currently active section based on scroll position
 * @param sectionIds - Array of section IDs to check
 * @param offset - Offset from top of viewport (in pixels)
 * @returns ID of the active section, or null if none found
 */
export function getActiveSection(sectionIds: string[], offset: number = 100): string | null {
  if (typeof window === 'undefined') return null;
  
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  
  let activeSection: string | null = null;
  let maxVisibility = 0;
  
  for (const id of sectionIds) {
    const element = document.getElementById(id);
    if (!element) continue;
    
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + scrollY;
    const elementBottom = elementTop + rect.height;
    
    // Check if section is in view
    const viewportTop = scrollY + offset;
    const viewportBottom = scrollY + windowHeight;
    
    if (elementBottom > viewportTop && elementTop < viewportBottom) {
      // Calculate how much of the section is visible
      const visibleTop = Math.max(elementTop, viewportTop);
      const visibleBottom = Math.min(elementBottom, viewportBottom);
      const visibleHeight = visibleBottom - visibleTop;
      const visibility = visibleHeight / rect.height;
      
      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        activeSection = id;
      }
    }
  }
  
  return activeSection;
}

// ============================================================================
// Smooth Scroll
// ============================================================================

/**
 * Smooth scroll to an element
 * @param elementId - ID of the element to scroll to
 * @param offset - Offset from top (in pixels)
 * @param duration - Animation duration (in milliseconds)
 */
export function smoothScrollTo(
  elementId: string,
  offset: number = 0,
  duration: number = 800
): void {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();
  
  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  
  function animation(currentTime: number): void {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * eased);
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }
  
  requestAnimationFrame(animation);
}

/**
 * Check if smooth scroll is supported
 * @returns True if smooth scroll is supported
 */
export function isSmoothScrollSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'scrollBehavior' in document.documentElement.style;
}

// ============================================================================
// Throttle and Debounce
// ============================================================================

/**
 * Throttle a function to run at most once per specified time
 * @param func - Function to throttle
 * @param delay - Minimum time between calls (in milliseconds)
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    
    if (timeSinceLastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func.apply(this, args);
      }, delay - timeSinceLastCall);
    }
  };
}

/**
 * Debounce a function to run only after it stops being called
 * @param func - Function to debounce
 * @param delay - Time to wait after last call (in milliseconds)
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// ============================================================================
// Interpolation
// ============================================================================

/**
 * Linear interpolation between two values
 * @param start - Start value
 * @param end - End value
 * @param progress - Progress (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

/**
 * Clamp a value between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map a value from one range to another
 * @param value - Value to map
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped value
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const progress = (value - inMin) / (inMax - inMin);
  return lerp(outMin, outMax, progress);
}
