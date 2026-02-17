/**
 * Animation Controller and utilities
 * Feature: portfolio-redesign
 * Requirements: 4.1, 4.2, 4.3
 */

import type { AnimationConfig, AnimationPresets } from '@/types';
import {
  BASE_ANIMATIONS,
  RESPONSIVE_ANIMATIONS,
  REDUCED_MOTION_ANIMATIONS,
  REDUCED_MOTION_QUERY,
  ANIMATION_DURATIONS,
  EASING_FUNCTIONS,
  STAGGER_DELAYS,
} from '@/config/animations';

// ============================================================================
// Animation Controller
// ============================================================================

export class AnimationController {
  private prefersReducedMotion: boolean = false;
  private currentBreakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop';

  constructor() {
    if (typeof window !== 'undefined') {
      this.prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
      this.updateBreakpoint();
      
      // Listen for reduced motion changes
      window.matchMedia(REDUCED_MOTION_QUERY).addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
      });
      
      // Listen for viewport changes
      window.addEventListener('resize', () => this.updateBreakpoint());
    }
  }

  /**
   * Update current breakpoint based on window width
   */
  private updateBreakpoint(): void {
    if (typeof window === 'undefined') return;
    
    const width = window.innerWidth;
    if (width < 768) {
      this.currentBreakpoint = 'mobile';
    } else if (width < 1024) {
      this.currentBreakpoint = 'tablet';
    } else {
      this.currentBreakpoint = 'desktop';
    }
  }

  /**
   * Get animation presets for current context
   */
  getPresets(): AnimationPresets {
    if (this.prefersReducedMotion) {
      return REDUCED_MOTION_ANIMATIONS;
    }
    return RESPONSIVE_ANIMATIONS[this.currentBreakpoint];
  }

  /**
   * Get specific animation config
   */
  getAnimation(type: keyof AnimationPresets): AnimationConfig {
    const presets = this.getPresets();
    return presets[type];
  }

  /**
   * Apply stagger delay to animation config
   */
  withStagger(config: AnimationConfig, index: number): AnimationConfig {
    const stagger = config.stagger || STAGGER_DELAYS.NORMAL;
    return {
      ...config,
      delay: config.delay + (index * stagger),
    };
  }

  /**
   * Check if reduced motion is preferred
   */
  shouldReduceMotion(): boolean {
    return this.prefersReducedMotion;
  }

  /**
   * Get current breakpoint
   */
  getBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
    return this.currentBreakpoint;
  }
}

// ============================================================================
// Global Animation Controller Instance
// ============================================================================

let globalController: AnimationController | null = null;

export function getAnimationController(): AnimationController {
  if (!globalController) {
    globalController = new AnimationController();
  }
  return globalController;
}

// ============================================================================
// Animation Utilities
// ============================================================================

/**
 * Generate CSS animation string from config
 */
export function generateAnimationCSS(config: AnimationConfig): string {
  return `${config.duration}ms ${config.easing} ${config.delay}ms`;
}

/**
 * Generate staggered delays for a group of elements
 */
export function generateStaggerDelays(
  count: number,
  baseDelay: number = 0,
  stagger: number = STAGGER_DELAYS.NORMAL
): number[] {
  return Array.from({ length: count }, (_, i) => baseDelay + (i * stagger));
}

/**
 * Apply animation to element
 */
export function applyAnimation(
  element: HTMLElement,
  config: AnimationConfig
): void {
  const { type, duration, delay, easing } = config;
  
  element.style.transition = `all ${duration}ms ${easing} ${delay}ms`;
  
  // Apply animation based on type
  switch (type) {
    case 'fade':
      element.style.opacity = '1';
      break;
    case 'slide':
      element.style.transform = 'translateY(0)';
      break;
    case 'scale':
      element.style.transform = 'scale(1)';
      break;
    case 'blur':
      element.style.filter = 'blur(0)';
      break;
  }
}

/**
 * Reset animation on element
 */
export function resetAnimation(element: HTMLElement, config: AnimationConfig): void {
  const { type } = config;
  
  // Reset based on animation type
  switch (type) {
    case 'fade':
      element.style.opacity = '0';
      break;
    case 'slide':
      element.style.transform = 'translateY(20px)';
      break;
    case 'scale':
      element.style.transform = 'scale(0.95)';
      break;
    case 'blur':
      element.style.filter = 'blur(10px)';
      break;
  }
}

// ============================================================================
// Performance Monitoring
// ============================================================================

export class PerformanceMonitor {
  private frameTimes: number[] = [];
  private maxSamples: number = 60;
  private lastFrameTime: number = 0;

  /**
   * Record a frame time
   */
  recordFrame(timestamp: number): void {
    if (this.lastFrameTime > 0) {
      const frameTime = timestamp - this.lastFrameTime;
      this.frameTimes.push(frameTime);
      
      if (this.frameTimes.length > this.maxSamples) {
        this.frameTimes.shift();
      }
    }
    this.lastFrameTime = timestamp;
  }

  /**
   * Get average frame time
   */
  getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) return 0;
    const sum = this.frameTimes.reduce((a, b) => a + b, 0);
    return sum / this.frameTimes.length;
  }

  /**
   * Get current FPS
   */
  getCurrentFPS(): number {
    const avgFrameTime = this.getAverageFrameTime();
    if (avgFrameTime === 0) return 60;
    return Math.round(1000 / avgFrameTime);
  }

  /**
   * Check if performance is degraded
   */
  isPerformanceDegraded(threshold: number = 20): boolean {
    return this.getAverageFrameTime() > threshold;
  }

  /**
   * Reset monitoring
   */
  reset(): void {
    this.frameTimes = [];
    this.lastFrameTime = 0;
  }
}
