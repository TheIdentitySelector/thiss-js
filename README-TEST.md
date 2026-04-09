# Upgrade Testing for SeamlessAccess

This document describes the upgrade testing mechanism for validating that different combinations of entry point versions work correctly during a rolling deployment.

## Background

The SeamlessAccess deployment involves 4 authoritative servers behind Fastly. During an upgrade, there's a window where different servers may serve different versions. To ensure users don't experience issues, we need to test that all combinations of old/new entry points work together.

## Deployment Steps

### Step 1: Pre-release (PRE_RELEASE=true)

Deploy with `PRE_RELEASE=true` in the Makefile or as an environment variable.

This deploys:
- All assets from both VERSION and PREV_VERSION at `/`
- Entry points (`/cta/`, `/ps/`, `/ds/`, `/result/`) serve **PREV_VERSION**
- New entry points at `/new/cta/`, `/new/ps/`, `/new/ds/`, `/new/result/` serve **VERSION**
- `/thiss.js` loads PREV_VERSION CTA
- `/new/thiss.js` loads VERSION CTA
- `/upgrade-test/` page for manual testing

At this point, production traffic still uses the old version, but you can test the new version via `/new/` paths.

### Step 2: Release (PRE_RELEASE=false)

Deploy with `PRE_RELEASE=false` (the default).

This deploys:
- All assets from both VERSION and PREV_VERSION at `/`
- Entry points serve **VERSION**
- `/new/` paths are not created (not needed post-upgrade)

## Using the Upgrade Test Page

During step 1 deployment, navigate to:

```
https://<your-domain>/upgrade-test/
```

This page provides:

1. **8 Test Combinations** - Cards showing all possible combinations of CTA, PS, and DS versions
2. **Direct Links** - Links to access each entry point directly for both current and new versions

### Test Combinations

| # | CTA | PS | DS | Description |
|---|-----|----|----|-------------|
| 1 | Current | Current | Current | Standard production (pre-upgrade) |
| 2 | New | New | New | Full new version (post-upgrade) |
| 3 | New | Current | Current | New CTA with old services |
| 4 | Current | New | New | Old CTA with new services |
| 5 | New | New | Current | New CTA & PS, old DS |
| 6 | Current | Current | New | Old CTA & PS, new DS |
| 7 | New | Current | New | New CTA & DS, old PS |
| 8 | Current | New | Current | Old CTA & DS, new PS |

### Direct Entry Point Links

**Current Version (from /):**
- `/ds/` - Discovery Service
- `/cta/` - Call-to-Action component
- `/ps/` - Persistence Service
- `/result/` - Result page

**New Version (from /new/):**
- `/new/ds/` - Discovery Service
- `/new/cta/` - Call-to-Action component
- `/new/ps/` - Persistence Service
- `/new/result/` - Result page

## Manual Testing Checklist

Before completing step 2 deployment, verify:

- [ ] Combination 1 works (baseline - current production)
- [ ] Combination 2 works (target - new production)
- [ ] Combination 3 works (new CTA can work with old PS/DS)
- [ ] Combination 4 works (old CTA can work with new PS/DS)
- [ ] No console errors in browser developer tools
- [ ] Institution search works in all DS combinations
- [ ] Institution selection persists correctly in all PS combinations
- [ ] CTA button displays correctly and responds to clicks

## Files Modified

- `scripts/subst-vars.sh` - Added `copy_entry_points_to_new()` function
- `webpack.common.js` - Added `upgrade-test` entry point
- `src/upgrade-test/index.ejs` - Test page HTML template
- `src/upgrade-test/index.js` - Test page JavaScript
- `src/upgrade-test/styles.scss` - Test page styles

## Troubleshooting

**Q: The `/new/` paths return 404**
A: The `/new/` paths are only available during step 1 deployment (PRE_RELEASE=true). After step 2, they don't exist.

**Q: Some test combinations show "Could not load thiss.js"**
A: This is expected if `/new/thiss.js` is not available. Ensure you're testing during step 1 deployment.

**Q: The CTA doesn't load in a test card**
A: Check browser console for errors. The test page attempts to dynamically load and configure CTA components, which may fail if there are cross-origin or script loading issues.
