# Core Infrastructure and Utilities

This document describes the core infrastructure set up for the portfolio redesign feature.

## Overview

Task 1 establishes the foundational types, utilities, and testing infrastructure needed for the portfolio redesign. This includes TypeScript type definitions, animation configurations, scroll utilities, viewport detection, and property-based testing setup.

## Files Created

### Type Definitions
- **`src/types/index.ts`**: Complete TypeScript type definitions for all data models
  - Project data models (Project, Technology, ProjectMetrics)
  - Background system models (BackgroundState, BackgroundLayer, BackgroundConfig)
  - Animation system models (AnimationConfig, AnimationPresets, ViewportTrigger)
  - Component system models (GlassmorphismProps, LayoutConfig)
  - Portfolio configuration models (PortfolioConfig, PersonalInfo, ThemeConfig)
  - Navigation system models (NavItem, NavState, ScrollSpyConfig)
  - CTA system models (CTAConfig)

### Configuration
- **`src/config/animations.ts`**: Animation configuration constants and presets
  - Duration constants (FAST, NORMAL, SLOW, MAX_INTERACTIVE)
  - Easing functions (cubic-bezier values for natural motion)
  - Stagger delays for grouped animations
  - Viewport trigger configurations
  - Base animation presets (entrance, hover, scroll, transition)
  - Responsive animation presets (mobile, tablet, desktop)
  - Specific animation variants (FADE_IN, SLIDE_UP, SCALE_UP, etc.)
  - GPU-accelerated properties list
  - Performance thresholds (target FPS, frame times)
  - Reduced motion support

### Utilities
- **`src/utils/scroll.ts`**: Scroll calculation and viewport detection utilities
  - `calculateScrollProgress()`: Calculate scroll progress (0-1)
  - `getScrollProgress()`: Get current scroll progress from window
  - `getElementScrollProgress()`: Calculate scroll progress for specific element
  - `isInViewport()`: Check if element is in viewport
  - `getVisibilityRatio()`: Get percentage of element visible
  - `getActiveSection()`: Find currently active section
  - `smoothScrollTo()`: Smooth scroll to element
  - `throttle()`: Throttle function calls
  - `debounce()`: Debounce function calls
  - `lerp()`: Linear interpolation
  - `clamp()`: Clamp value between min/max
  - `mapRange()`: Map value from one range to another

- **`src/utils/viewport.ts`**: Viewport and responsive breakpoint utilities
  - Breakpoint constants (MOBILE: 768px, TABLET: 1024px, DESKTOP: 1440px)
  - `getCurrentBreakpoint()`: Get current breakpoint
  - `isMobile()`, `isTablet()`, `isDesktop()`: Breakpoint checks
  - `prefersReducedMotion()`: Check reduced motion preference
  - `isTouchDevice()`: Check touch support
  - `supportsHover()`: Check hover support
  - `getViewportDimensions()`: Get viewport width/height
  - `meetsTouchTargetSize()`: Validate touch target size (44px minimum)
  - `supportsBackdropFilter()`: Check CSS backdrop-filter support
  - `supportsIntersectionObserver()`: Check Intersection Observer support
  - `getOrientation()`: Get screen orientation (portrait/landscape)

### Testing Infrastructure
- **`jest.config.js`**: Jest configuration with Next.js integration
- **`jest.setup.js`**: Global test setup with browser API mocks
- **`src/__tests__/README.md`**: Testing documentation and guidelines
- **`package.json`**: Updated with test scripts and dependencies

### Test Files
- **`src/utils/__tests__/scroll.test.ts`**: Unit tests for scroll utilities (13 tests)
- **`src/utils/__tests__/viewport.test.ts`**: Unit tests for viewport utilities (14 tests)
- **`src/config/__tests__/animations.property.test.ts`**: Property-based tests for animations (5 tests)

## Testing Setup

### Installed Packages
- `@fast-check/jest`: Jest integration for fast-check
- `fast-check`: Property-based testing library
- `jest`: Testing framework
- `jest-environment-jsdom`: DOM environment for React testing
- `@testing-library/react`: React component testing utilities
- `@testing-library/jest-dom`: Custom Jest matchers
- `@testing-library/user-event`: User interaction simulation
- `@types/jest`: TypeScript types for Jest

### Test Scripts
```bash
npm test              # Run all tests
npm test:watch        # Run tests in watch mode
npm test:coverage     # Run tests with coverage report
```

### Coverage Goals
- Unit test coverage: 80% of component code
- Property test coverage: All 21 correctness properties from design
- Integration test coverage: All major user flows

## Key Design Decisions

### 1. Type Safety
All data models are fully typed with TypeScript interfaces, ensuring type safety throughout the application and catching errors at compile time.

### 2. Animation Performance
- All animation configurations use GPU-accelerated properties (transform, opacity)
- Interactive animations limited to 300ms per requirements
- Non-linear easing functions for natural motion
- Reduced motion support built-in

### 3. Scroll Performance
- Throttle and debounce utilities to prevent excessive calculations
- Efficient scroll progress calculations
- Intersection Observer support for viewport detection

### 4. Responsive Design
- Mobile-first breakpoints (768px, 1024px)
- Touch target validation (44px minimum per WCAG)
- Device capability detection (touch, hover, orientation)

### 5. Browser Compatibility
- Feature detection for modern CSS (backdrop-filter, custom properties)
- Fallback support for older browsers
- Polyfill detection for Intersection Observer

### 6. Testing Strategy
- Dual approach: Unit tests + Property-based tests
- Unit tests for specific examples and edge cases
- Property tests for universal correctness properties
- Minimum 100 iterations per property test

## Usage Examples

### Scroll Progress
```typescript
import { getScrollProgress, smoothScrollTo } from '@/utils/scroll';

// Get current scroll progress
const progress = getScrollProgress(); // 0-1

// Smooth scroll to section
smoothScrollTo('projects-section', 80, 800);
```

### Viewport Detection
```typescript
import { getCurrentBreakpoint, prefersReducedMotion } from '@/utils/viewport';

// Get current breakpoint
const breakpoint = getCurrentBreakpoint(); // 'mobile' | 'tablet' | 'desktop'

// Check reduced motion preference
if (prefersReducedMotion()) {
  // Disable animations
}
```

### Animation Configuration
```typescript
import { BASE_ANIMATIONS, ENTRANCE_ANIMATIONS } from '@/config/animations';

// Use predefined animation
const entranceAnim = BASE_ANIMATIONS.entrance;

// Use specific variant
const fadeIn = ENTRANCE_ANIMATIONS.FADE_IN;
```

### Type Usage
```typescript
import type { Project, AnimationConfig, BackgroundState } from '@/types';

const project: Project = {
  id: 'project-1',
  title: 'My Project',
  description: 'Project description',
  technologies: [],
  category: 'web-application',
  featured: true,
  startDate: '2024-01-01',
};
```

## Next Steps

With the core infrastructure in place, the next tasks will build upon these foundations:

1. **Task 2**: Implement glassmorphism component primitives using the type definitions
2. **Task 3**: Build dynamic background system using scroll utilities and animation configs
3. **Task 5**: Implement animation system using the animation presets and viewport detection
4. **Task 6**: Build component layout system using the Project types and layout configs

## Test Results

All tests passing:
- ✅ 13 scroll utility tests
- ✅ 14 viewport utility tests
- ✅ 5 animation property tests
- **Total: 32 tests passing**

## Requirements Validated

This task provides the foundation for all requirements:
- ✅ Type safety for all data models
- ✅ Animation configurations meeting performance requirements (≤300ms for interactive)
- ✅ Non-linear easing functions for natural motion
- ✅ Scroll calculation utilities for dynamic backgrounds
- ✅ Viewport detection for responsive layouts
- ✅ Touch target validation (44px minimum)
- ✅ Reduced motion support
- ✅ Property-based testing infrastructure
- ✅ 80% coverage threshold configured
