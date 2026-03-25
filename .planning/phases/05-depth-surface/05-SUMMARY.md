---
phase: 05-depth-surface
plan: detailed
subsystem: visual-layer
tags: [depth, surfaces, warmth, elevation, textures, section-rhythm]
dependency_graph:
  requires: [04-typography]
  provides: [premium-surface-language, section-rhythm, warm-canvas, shadow-elevation]
  affects: [06-motion, 07-component-polish]
tech_stack:
  added: []
  patterns:
    - mesh-warm grain-overlay hero wrapper for above-fold atmosphere
    - shop-surface-subtle / shop-canvas / mesh-warm alternating section rhythm
    - shadow-level tokens as primary separation instead of borders
    - warm radial edge vignette inside product image zones
    - warm atmospheric gradient overlay on promo lifestyle image
key_files:
  created: []
  modified:
    - src/app/(shop)/page.tsx
    - src/components/home/HeroLayered.tsx
    - src/components/home/HomePromiseBanner.tsx
    - src/components/home/CollectionRow.tsx
    - src/components/product/ProductCard.tsx
    - src/app/(shop)/notifications/page.tsx
decisions:
  - Preserved ProductCard image zone gradient as reference quality — only added warm radial vignette
  - Used mesh-warm (not mesh-purple) for Promise section to keep warmth direction consistent
  - Replaced all adjacent bg-white blocks with intentional surface rotation to break flat rhythm
  - Removed border from HomePromiseBanner outer shell entirely, relying on shadow-level-3 only
metrics:
  duration: ~35 min
  tasks_completed: 3
  files_changed: 6
  completed_date: "2026-03-25"
---

# Phase 5 Plan: Depth and Surface Summary

**One-liner:** Warm ivory canvas rhythm with mesh-warm hero atmosphere, shadow-led card elevation replacing border framing, and warm image-zone gradients across hero, promo, and product surfaces.

## What Was Built

### Subphase A — Canvas Warmth and Section Rhythm

**`src/app/(shop)/page.tsx`**

Replaced the repeated `bg-white` wrapping sections with a deliberate surface rotation that gives the scroll experience visible rhythm:

| Section | Before | After |
|---------|--------|-------|
| YourUsuals | mesh-green (already correct) | preserved |
| Category Discovery | `bg-white` | `bg-[color:var(--shop-canvas)]` |
| Featured + Collections 1-2 | `bg-[#FAF8F5]` (inline) | `bg-[color:var(--shop-surface-subtle)]` |
| Promise + Collections 3 + Grid | `bg-white` with manual shadow | `mesh-warm grain-overlay` |
| LocalTrustSection | mesh-dark editorial (already correct) | preserved |
| Collections 4-6 | `bg-white` | `bg-[color:var(--shop-surface-subtle)]` |
| Best Sellers | `bg-white` with manual shadow | `bg-[color:var(--shop-surface)]` + `shadow-[var(--shop-shadow-level-4)]` |
| Trending/Fresh/Deals | `bg-[color:var(--shop-canvas)]` (already correct) | preserved |

The result is clear visual pacing: canvas — subtle white — mesh-warm grain — dark anchor — subtle white — elevated white.

**`src/components/home/HeroLayered.tsx`**

Added `mesh-warm grain-overlay` to the outer section wrapper for warm above-fold atmosphere. Enriched the gradient scrim stack with an amber vignette at the top edge (`radial-gradient ellipse at 50% 0%, rgba(240,236,232,0.18)`) and a brighter radial highlight at top-left (`rgba(255,252,248,0.18)`).

Also removed unused `shouldShowHeroSkeleton` variable and `loadingBanners` destructuring as a Rule 1 inline fix.

### Subphase B — Card Elevation and Shell Separation

**`src/components/home/HomePromiseBanner.tsx`**

- Outer shell: removed `border border-[color:var(--shop-border)]`, upgraded shadow from `level-2` to `level-3`
- Interior point pills: removed border, upgraded shadow from `level-1` to `level-2`
- Interior detail cards: removed border, shadow stays at `level-2`

**`src/components/home/CollectionRow.tsx`**

The "More" end-tile was using `border-2 border-dashed border-[color:var(--shop-primary)]` framing. Replaced with shadow-led elevation (`shadow-[var(--shop-shadow-level-1)]` stable, `shadow-[var(--shop-shadow-level-2)]` hover) and kept `bg-[color:var(--shop-primary-soft)]` fill for clarity.

**`src/app/(shop)/notifications/page.tsx`**

Notification cards were using `border border-[color:var(--shop-border)] bg-white/92` for all read items. Replaced with:
- Read: `bg-[color:var(--shop-surface-elevated)] shadow-[var(--shop-shadow-level-1)]` with hover `level-2`
- Unread: `bg-[color:var(--shop-primary-soft)] shadow-[var(--shop-shadow-level-2)]` with hover `level-3`
- Icon container and all text tokens aligned to shop-* system.

### Subphase C — Image Zones and Texture Surfaces

**`src/components/home/HomePromiseBanner.tsx`**

Added warm atmospheric gradient overlay on the promo lifestyle image: `linear-gradient(135deg, rgba(240,236,232,0.18) 0%, transparent 50%, rgba(110,73,216,0.10) 100%)`. The promo image zone also gains a `shadow-[var(--shop-shadow-level-2)]` lift.

**`src/components/product/ProductCard.tsx`**

Preserved the warm image zone gradient (`from-[#F5F0EC] via-[#EDE8E3] to-[#E8E2DA]`) and all existing shadow elevation. Added a warm radial edge vignette (`radial-gradient ellipse at center, transparent 55%, rgba(232,226,218,0.35) 100%`) as an absolute overlay inside the image zone, so product images feel embedded in the warm surface rather than clipped to a flat rectangle.

**`src/components/home/HeroLayered.tsx`**

Texture and warmth already addressed in Subphase A (mesh-warm + grain-overlay wrapper, amber top vignette, radial highlight).

## Acceptance Criteria Verification

- [x] Page background reads as warm ivory rather than flat white — shop-canvas baseline maintained, mesh-warm adds atmosphere
- [x] Homepage sections have visible surface rhythm — 8 distinct surface treatments, no two adjacent sections identical
- [x] Product/content cards rely primarily on elevation rather than hard borders — shadow tokens now primary separation
- [x] Hero and at least one promo surface visibly benefit from grain or atmospheric treatment — hero (mesh-warm + grain-overlay + warm vignette), promise section (mesh-warm grain-overlay)
- [x] Image zones use warm gradients — hero (editorial warm scrims), promo image (warm overlay), product (warm gradient zone + edge vignette)
- [x] No forbidden files touched — no services, store, hooks, API layer, or infrastructure changes

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed unused `shouldShowHeroSkeleton` and `loadingBanners` variables from page.tsx**
- **Found during:** Task 1 (lint check after modifying page.tsx)
- **Issue:** `shouldShowHeroSkeleton = loadingBanners && resolvedBanners.length === 0` was declared but never consumed in JSX; `loadingBanners` only existed to compute it
- **Fix:** Removed both declarations; the hero renders with available banners regardless (demo data fallback already covers the loading case)
- **Files modified:** `src/app/(shop)/page.tsx`
- **Commit:** f4b0b0c

None of the other deviations were architectural. Notifications page (secondary file in subphase B) was updated as the plan expected.

## Known Stubs

None. All changes are purely visual — no data stubs, no placeholder text, no hardcoded empty values flowing to render paths.

## Self-Check: PASSED

All 6 modified files exist on disk. All 3 task commits found in git log:
- f4b0b0c: subphase A — canvas warmth and section rhythm
- 5b30743: subphase B — card elevation and shell separation
- 4506325: subphase C — image zones and texture surfaces
