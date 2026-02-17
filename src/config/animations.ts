/**
 * Animation configuration constants and presets
 * Feature: portfolio-redesign
 */

import type { AnimationConfig, AnimationPresets, ResponsiveAnimations, ViewportTrigger } from '@/types';

// ============================================================================
// Animation Duration Constants (in milliseconds)
// ============================================================================

export const ANIMATION_DURATIONS = {
  INSTANT: 0,
  FAST: 150,
  NORMAL: 250,
  SLOW: 400,
  VERY_SLOW: 600,
  MAX_INTERACTIVE: 300, // Maximum for interactive animations per requirements
} as const;

// ============================================================================
// Easing Functions (CSS cubic-bezier values)
// ============================================================================

export const EASING_FUNCTIONS = {
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  EASE_IN_QUAD: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  EASE_OUT_QUAD: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  EASE_IN_OUT_QUAD: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  EASE_IN_CUBIC: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  EASE_OUT_CUBIC: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  EASE_IN_OUT_CUBIC: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  EASE_IN_QUART: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  EASE_OUT_QUART: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  EASE_IN_OUT_QUART: 'cubic-bezier(0.77, 0, 0.175, 1)',
  SPRING: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// ============================================================================
// Stagger Delays (in milliseconds)
// ============================================================================

export const STAGGER_DELAYS = {
  TIGHT: 50,
  NORMAL: 100,
  RELAXED: 150,
  LOOSE: 200,
} as const;

// ============================================================================
// Viewport Trigger Configurations
// ============================================================================

export const VIEWPORT_TRIGGERS: Record<string, ViewportTrigger> = {
  DEFAULT: {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px 0px -100px 0px',
  },
  IMMEDIATE: {
    threshold: 0,
    triggerOnce: true,
    rootMargin: '0px',
  },
  HALFWAY: {
    threshold: 0.5,
    triggerOnce: true,
    rootMargin: '0px',
  },
  FULL: {
    threshold: 1,
    triggerOnce: true,
    rootMargin: '0px',
  },
  REPEATING: {
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '0px 0px -100px 0px',
  },
} as const;

// ============================================================================
// Base Animation Presets
// ============================================================================

export const BASE_ANIMATIONS: AnimationPresets = {
  entrance: {
    type: 'fade',
    duration: ANIMATION_DURATIONS.NORMAL,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_OUT_CUBIC,
    stagger: STAGGER_DELAYS.NORMAL,
  },
  hover: {
    type: 'scale',
    duration: ANIMATION_DURATIONS.FAST,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_OUT_QUAD,
  },
  scroll: {
    type: 'slide',
    duration: ANIMATION_DURATIONS.SLOW,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_IN_OUT_CUBIC,
  },
  transition: {
    type: 'fade',
    duration: ANIMATION_DURATIONS.NORMAL,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_IN_OUT_QUAD,
  },
} as const;

// ============================================================================
// Responsive Animation Presets
// ============================================================================

export const RESPONSIVE_ANIMATIONS: ResponsiveAnimations = {
  mobile: {
    entrance: {
      type: 'fade',
      duration: ANIMATION_DURATIONS.FAST,
      delay: 0,
      easing: EASING_FUNCTIONS.EASE_OUT,
      stagger: STAGGER_DELAYS.TIGHT,
    },
    hover: {
      type: 'scale',
      duration: ANIMATION_DURATIONS.INSTANT,
      delay: 0,
      easing: EASING_FUNCTIONS.EASE_OUT,
    },
    scroll: {
      type: 'fade',
      duration: ANIMATION_DURATIONS.NORMAL,
      delay: 0,
      easing: EASING_FUNCTIONS.EASE_OUT,
    },
    transition: {
      type: 'fade',
      duration: ANIMATION_DURATIONS.FAST,
      delay: 0,
      easing: EASING_FUNCTIONS.EASE_IN_OUT,
    },
  },
  tablet: {
    entrance: {
      type: 'fade',
      duration: ANIMATION_DURATIONS.NORMAL,
      delay: 0,
      easing: EASING_FUNCTIONS.EASE_OUT_QUAD,
      stagger: STAGGER_DELAYS.NORMAL,
    },
    hover: {
      type: 'scale',
      duration: ANIMATION_DURATIONS.FAST,
      delay: 0,
      easing: EASING_FUNCTIONS.EASE_OUT_QUAD,
    },
    scroll: {
      type: 'slide',
      duration: ANIMATION_DURATIONS.NORMAL,
      delay: 0,
      easing: EASING_FUNCTIONS.EASE_IN_OUT_QUAD,
    },
    transition: {
      type: 'fade',
      duration: ANIMATION_DURATIONS.NORMAL,
      delay: 0,
      easing: EASING_FUNCTIONS.EASE_IN_OUT_QUAD,
    },
  },
  desktop: BASE_ANIMATIONS,
} as const;

// ============================================================================
// Specific Animation Variants
// ============================================================================

export const ENTRANCE_ANIMATIONS: Record<string, AnimationConfig> = {
  FADE_IN: {
    type: 'fade',
    duration: ANIMATION_DURATIONS.NORMAL,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_OUT,
  },
  SLIDE_UP: {
    type: 'slide',
    duration: ANIMATION_DURATIONS.NORMAL,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_OUT_CUBIC,
  },
  SLIDE_DOWN: {
    type: 'slide',
    duration: ANIMATION_DURATIONS.NORMAL,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_OUT_CUBIC,
  },
  SCALE_IN: {
    type: 'scale',
    duration: ANIMATION_DURATIONS.NORMAL,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_OUT_QUAD,
  },
  BLUR_IN: {
    type: 'blur',
    duration: ANIMATION_DURATIONS.SLOW,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_OUT,
  },
} as const;

export const HOVER_ANIMATIONS: Record<string, AnimationConfig> = {
  SCALE_UP: {
    type: 'scale',
    duration: ANIMATION_DURATIONS.FAST,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_OUT_QUAD,
  },
  LIFT: {
    type: 'slide',
    duration: ANIMATION_DURATIONS.FAST,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_OUT_QUAD,
  },
  GLOW: {
    type: 'fade',
    duration: ANIMATION_DURATIONS.FAST,
    delay: 0,
    easing: EASING_FUNCTIONS.EASE_OUT,
  },
} as const;

// ============================================================================
// GPU-Accelerated Properties
// ============================================================================

export const GPU_ACCELERATED_PROPERTIES = [
  'transform',
  'opacity',
  'filter',
] as const;

export const NON_GPU_PROPERTIES = [
  'width',
  'height',
  'top',
  'left',
  'right',
  'bottom',
  'margin',
  'padding',
  'background-color',
  'color',
] as const;

// ============================================================================
// Performance Thresholds
// ============================================================================

export const PERFORMANCE_THRESHOLDS = {
  TARGET_FPS: 60,
  MIN_FRAME_TIME: 16.67, // milliseconds (1000ms / 60fps)
  MAX_FRAME_TIME: 20, // milliseconds (threshold for performance degradation)
  THROTTLE_DELAY: 16, // milliseconds (roughly 60fps)
  DEBOUNCE_DELAY: 150, // milliseconds
} as const;

// ============================================================================
// Reduced Motion Support
// ============================================================================

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export const REDUCED_MOTION_ANIMATIONS: AnimationPresets = {
  entrance: {
    type: 'fade',
    duration: ANIMATION_DURATIONS.INSTANT,
    delay: 0,
    easing: EASING_FUNCTIONS.LINEAR,
  },
  hover: {
    type: 'fade',
    duration: ANIMATION_DURATIONS.INSTANT,
    delay: 0,
    easing: EASING_FUNCTIONS.LINEAR,
  },
  scroll: {
    type: 'fade',
    duration: ANIMATION_DURATIONS.INSTANT,
    delay: 0,
    easing: EASING_FUNCTIONS.LINEAR,
  },
  transition: {
    type: 'fade',
    duration: ANIMATION_DURATIONS.INSTANT,
    delay: 0,
    easing: EASING_FUNCTIONS.LINEAR,
  },
} as const;
