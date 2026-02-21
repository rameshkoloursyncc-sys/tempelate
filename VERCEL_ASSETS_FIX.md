# Vercel Assets Fix - Images Not Showing in Production

## Problem
Images work locally but don't show on Vercel because:
- Vite handles asset imports differently in dev vs production
- Paths like `/src/assets/image.png` don't work in production build
- Vite needs to process assets at build time to generate proper URLs

## Solution Implemented

### 1. Created `src/utils/assetImports.js`
- Imports all assets properly so Vite can process them
- Provides `resolveAsset()` helper function
- Maps old `/src/assets/...` paths to proper imported assets
- Handles external URLs (http://, https://) and public folder paths

### 2. Updated `src/utils/domainConfig.js`
- Changed default config to use imported assets instead of string paths
- Example: `assets.thumbnail` instead of `'/src/assets/thumbnil.jpeg'`

### 3. Updated `src/App.jsx`
- Wraps all image URLs with `resolveAsset()` function
- Works for both default config and user-configured images
- Handles:
  - Hero section images (thumbnail, play icon, mentor, CTA icon)
  - Intro section image
  - Curriculum module images and certificate
  - Instructor image
  - Footer brand logos and domain icon

## How It Works

### For Default Images (Built-in)
```js
// Before (broken in production)
ctaIcon: '/src/assets/wf-buton-arrow.svg'

// After (works everywhere)
ctaIcon: assets.arrowIcon
```

### For User-Configured Images
```js
// Automatically resolves paths
resolveAsset('/src/assets/image.png')  // → Proper Vite URL
resolveAsset('https://example.com/image.png')  // → Returns as-is
resolveAsset('/public-image.png')  // → Returns as-is
```

## For Admin Panel Users

When configuring images in the admin panel, you can use:

1. **External URLs** (Recommended for production):
   ```
   https://your-cdn.com/image.png
   https://i.imgur.com/abc123.jpg
   ```

2. **Public folder paths** (if you add images to `/public`):
   ```
   /my-image.png
   /images/logo.png
   ```

3. **Old `/src/assets/` paths** (automatically converted):
   ```
   /src/assets/Keshav.png
   ```
   These are automatically mapped to proper imports.

## Testing

### Local Testing
```bash
npm run dev
```
All images should work as before.

### Production Build Testing
```bash
npm run build
npm run preview
```
Test the production build locally before deploying.

### Vercel Deployment
```bash
git add .
git commit -m "Fix: Asset paths for Vercel production"
git push
```
Vercel will automatically rebuild and deploy.

## Adding New Default Images

If you need to add new default images:

1. **Add import to `assetImports.js`**:
```js
import NewImage from '../assets/new-image.png'

export const assets = {
  // ... existing assets
  newImage: NewImage,
}
```

2. **Add to assetMap** (if using old path format):
```js
const assetMap = {
  // ... existing mappings
  '/src/assets/new-image.png': assets.newImage,
}
```

3. **Use in domainConfig.js**:
```js
someSection: {
  image: assets.newImage,
}
```

## Best Practices

1. **For Production**: Use external URLs (CDN, image hosting)
2. **For Development**: Use imported assets or public folder
3. **Never use**: `/src/assets/...` paths directly in JSX
4. **Always use**: `resolveAsset()` for user-configured images

## Troubleshooting

### Image still not showing?
1. Check browser console for 404 errors
2. Verify image exists in `src/assets/` folder
3. Check if image is imported in `assetImports.js`
4. Clear browser cache and rebuild

### New images not working?
1. Add import to `assetImports.js`
2. Add to `assets` export object
3. Add to `assetMap` if using path strings
4. Rebuild the project

## Files Modified
- ✅ `src/utils/assetImports.js` (new)
- ✅ `src/utils/domainConfig.js` (updated)
- ✅ `src/App.jsx` (updated)
