# Performance Testing and Optimization Guide

## Running Lighthouse Audit

### Using Chrome DevTools

1. Open Chrome DevTools (F12)
2. Navigate to the "Lighthouse" tab
3. Select categories:
   - Performance
   - Accessibility
   - Best Practices
   - SEO
4. Select device: Mobile and Desktop
5. Click "Analyze page load"

### Target Scores
- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

## Performance Metrics to Monitor

### Core Web Vitals

**Largest Contentful Paint (LCP)**
- Target: < 2.5s
- Measures: Loading performance
- Check: Hero section loads quickly

**First Input Delay (FID)**
- Target: < 100ms
- Measures: Interactivity
- Check: Navigation responds immediately

**Cumulative Layout Shift (CLS)**
- Target: < 0.1
- Measures: Visual stability
- Check: No layout shifts during load

### Additional Metrics

**First Contentful Paint (FCP)**
- Target: < 1.5s on 3G
- Measures: Initial render
- Check: Content appears quickly

**Time to Interactive (TTI)**
- Target: < 3.5s
- Measures: Full interactivity
- Check: All features work quickly

**Total Blocking Time (TBT)**
- Target: < 300ms
- Measures: Main thread blocking
- Check: Smooth interactions

## Testing Network Conditions

### Chrome DevTools Network Throttling

1. Open DevTools (F12)
2. Go to "Network" tab
3. Select throttling profile:
   - Fast 3G
   - Slow 3G
   - Offline (for error testing)
4. Reload page and observe performance

### Key Checks on Slow 3G
- [ ] First Contentful Paint < 1.5s
- [ ] Page is usable within 3s
- [ ] Lazy loading works correctly
- [ ] Images load progressively

## Animation Performance Testing

### Checking Frame Rate

1. Open DevTools (F12)
2. Go to "Performance" tab
3. Click record
4. Scroll through the page
5. Stop recording
6. Check FPS graph (should be consistently 60fps)

### Key Checks
- [ ] Scroll animations are smooth
- [ ] Background transitions don't drop frames
- [ ] Modal animations are fluid
- [ ] Hover effects respond immediately

### Performance Profiling

1. Record performance while:
   - Scrolling through sections
   - Opening/closing modals
   - Navigating with menu
   - Interacting with projects

2. Look for:
   - Long tasks (> 50ms)
   - Layout thrashing
   - Excessive repaints
   - Memory leaks

## Optimization Checklist

### Images
- [ ] All images use Next.js Image component
- [ ] Images have appropriate sizes
- [ ] Images are lazy loaded below fold
- [ ] WebP format is used where supported

### JavaScript
- [ ] Code splitting is implemented
- [ ] Below-fold components are lazy loaded
- [ ] Unused code is eliminated
- [ ] Bundle size is optimized

### CSS
- [ ] Critical CSS is inlined
- [ ] Unused CSS is removed
- [ ] CSS is minified
- [ ] Tailwind purge is configured

### Animations
- [ ] Only transform and opacity are animated
- [ ] will-change is used sparingly
- [ ] will-change is removed after animation
- [ ] GPU acceleration is utilized

### Fonts
- [ ] Fonts are preloaded
- [ ] Font display: swap is used
- [ ] Subset fonts if possible
- [ ] Limit font variations

## Common Performance Issues and Fixes

### Issue: Low Performance Score

**Possible Causes:**
- Large JavaScript bundles
- Unoptimized images
- Render-blocking resources
- Too many network requests

**Fixes:**
- Implement code splitting
- Optimize and compress images
- Defer non-critical JavaScript
- Use HTTP/2 or HTTP/3

### Issue: Layout Shifts

**Possible Causes:**
- Images without dimensions
- Dynamic content insertion
- Web fonts loading

**Fixes:**
- Set explicit width/height on images
- Reserve space for dynamic content
- Use font-display: swap

### Issue: Slow Animations

**Possible Causes:**
- Animating non-GPU properties
- Too many simultaneous animations
- Heavy JavaScript during animation

**Fixes:**
- Only animate transform and opacity
- Stagger animations
- Use requestAnimationFrame
- Reduce animation complexity

### Issue: High Memory Usage

**Possible Causes:**
- Memory leaks in event listeners
- Unreleased animation frames
- Large DOM trees

**Fixes:**
- Clean up event listeners
- Cancel animation frames on unmount
- Virtualize long lists

## Build Optimization

### Next.js Production Build

```bash
npm run build
npm run start
```

### Analyze Bundle Size

```bash
npm run build -- --analyze
```

### Key Checks
- [ ] Total bundle size < 200KB (gzipped)
- [ ] First load JS < 100KB
- [ ] No duplicate dependencies
- [ ] Tree shaking is working

## Monitoring in Production

### Tools to Use
- Google Analytics (Core Web Vitals)
- Vercel Analytics (if deployed on Vercel)
- Chrome User Experience Report
- Real User Monitoring (RUM)

### Metrics to Track
- Page load times
- Core Web Vitals
- Error rates
- User engagement

## Performance Budget

Set and enforce performance budgets:

- **JavaScript**: < 200KB (gzipped)
- **CSS**: < 50KB (gzipped)
- **Images**: < 500KB total
- **Fonts**: < 100KB
- **Total Page Weight**: < 1MB

## Optimization Priorities

### High Priority (Must Fix)
1. Achieve Lighthouse Performance score ≥ 90
2. Maintain 60fps during animations
3. First Contentful Paint < 1.5s on 3G
4. No layout shifts (CLS < 0.1)

### Medium Priority (Should Fix)
1. Reduce bundle size
2. Optimize images further
3. Implement service worker
4. Add resource hints

### Low Priority (Nice to Have)
1. Implement HTTP/3
2. Use CDN for static assets
3. Add progressive web app features
4. Implement offline support

## Testing Commands

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run Lighthouse CI (if configured)
npm run lighthouse

# Analyze bundle
npm run analyze
```

## Sign-off

- [ ] Lighthouse Performance ≥ 90
- [ ] All Core Web Vitals pass
- [ ] 60fps animations confirmed
- [ ] 3G performance acceptable
- [ ] No performance regressions

Tested by: _______________
Date: _______________
Performance Score: _______________
