# Deployment Notes

## Required Actions Before Deployment

### 1. CV File Setup ⚠️ CRITICAL

The CV download functionality requires a PDF file in the `public` directory.

**Current Status:**
- CV file exists in root: `Genel Kutluhan Aygüzel CV.docx`
- **Action Required:** Convert to PDF and move to `public/cv.pdf`

**Steps:**
1. Convert `Genel Kutluhan Aygüzel CV.docx` to PDF format
2. Rename to `cv.pdf`
3. Move to `public/cv.pdf`
4. Verify the path matches `siteConfig.cvPdfPath` in `src/lib/constants.ts`

**Alternative:**
If you want to keep the DOCX format, update `src/lib/constants.ts`:
```typescript
cvPdfPath: '/cv.docx', // Change from '/cv.pdf'
```

### 2. Project Images (Optional)

Projects currently don't have images. To add images:

1. Add project images to `public/projects/` directory
2. Update project data in `src/lib/constants.ts` with image URLs:
```typescript
imageUrl: '/projects/project-name.jpg',
thumbnailUrl: '/projects/project-name-thumb.jpg',
```

### 3. Environment Variables

No environment variables are required for this build.

### 4. Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Export static site (if needed)
npm run build && npm run export
```

### 5. Deployment Checklist

- [ ] CV file converted to PDF and placed in `public/cv.pdf`
- [ ] Project images added (optional)
- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm run start`
- [ ] Verify CV download works
- [ ] Verify all navigation links work
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Deploy to hosting platform

### 6. Recommended Hosting Platforms

- **Vercel** (Recommended for Next.js)
  - Automatic deployments from Git
  - Built-in analytics
  - Edge network
  
- **Netlify**
  - Easy static site hosting
  - Form handling
  - Continuous deployment

- **GitHub Pages**
  - Free hosting
  - Requires static export
  - Custom domain support

### 7. Post-Deployment

1. Test all features on live site
2. Monitor Core Web Vitals
3. Set up analytics (Google Analytics, Vercel Analytics, etc.)
4. Share portfolio URL
5. Gather feedback

## Known Issues

None at this time.

## Support

For issues or questions, refer to:
- Manual Testing Checklist: `.kiro/specs/portfolio-redesign/MANUAL_TESTING_CHECKLIST.md`
- Performance Guide: `.kiro/specs/portfolio-redesign/PERFORMANCE_GUIDE.md`
- Implementation Summary: `.kiro/specs/portfolio-redesign/IMPLEMENTATION_SUMMARY.md`
