---
phase: 1
name: Audit
status: draft
created: 2026-03-25
updated: 2026-03-25
---

# UI-SPEC — Phase 1: Audit

## Purpose

This UI-SPEC defines the **audit methodology** for Phase 1 — what to look at, what to document, and what output format to produce. Phase 1 makes **zero code changes**. Its deliverable is a written audit report committed to `.planning/` before any phase 2 work begins.

This spec answers: "What visual and interaction contracts does this phase need to document the current state?"

---

## Design System State

**Tool:** shadcn/ui (initialized). `components.json` is present. Design system is the `shop-*` token system layered on top of shadcn/Radix primitives.

**Detection method:** `npx shadcn info` was not run (read-only audit phase). Token inventory comes from direct file reads.

**Registry:** shadcn official only. No third-party registries declared.

---

## 1. Existing Token Inventory (Source of Truth)

The audit must confirm every value listed here is **actually rendered correctly** in the browser, not just defined in code.

### 1.1 CSS Custom Properties — `src/app/globals.css`

#### Color Tokens (`:root` light mode)

| Token | Value | Purpose |
|-------|-------|---------|
| `--shop-canvas` | `#F0ECE8` | Warm ivory page background |
| `--shop-surface` | `#FFFFFF` | Card / panel surface |
| `--shop-surface-elevated` | `#FFFFFF` | Floating card |
| `--shop-surface-subtle` | `#FAF8F5` | Alternate section tint |
| `--shop-ink` | `#1A232B` | Primary text |
| `--shop-ink-muted` | `#56606B` | Secondary text |
| `--shop-ink-faint` | `#8A949E` | Placeholder / disabled |
| `--shop-border` | `#DEDDE6` | Default border |
| `--shop-border-strong` | `#C8C7D3` | Emphasis border |
| `--shop-primary` | `#6E49D8` | Purple — CTA, focus rings, eyebrows |
| `--shop-primary-hover` | `#5E3DC8` | Purple hover |
| `--shop-primary-soft` | `#F0EBFF` | Purple tint background |
| `--shop-action` | `#16945E` | Green — Add to cart, success, price |
| `--shop-action-hover` | `#128050` | Green hover |
| `--shop-action-soft` | `#E8F7F1` | Green tint background |
| `--shop-trust` | `#1D6FB8` | Blue — trust / info |
| `--shop-trust-soft` | `#E8F2FB` | Blue tint |
| `--shop-accent` | `#E3B93C` | Gold — discount badges |
| `--shop-discount` | `#C2410C` | Orange-red — sale price |
| `--shop-discount-soft` | `#FEF0E8` | Discount tint |
| `--shop-danger` | `#DC2626` | Destructive actions |
| `--shop-success` | `(alias → --shop-action)` | `#16945E` |
| `--shop-warning` | `(alias → --shop-accent)` | `#E3B93C` |
| `--shop-free-delivery` | `(alias → --shop-action)` | `#16945E` |

#### Surface Gradient Tokens

| Token | Value |
|-------|-------|
| `--shop-page-gradient` | `linear-gradient(180deg, #F0ECE8 0%, #F0ECE8 100%)` — flat canvas (no actual gradient) |
| `--shop-hero-surface` | `linear-gradient(135deg, #6E49D8 → #7C3AED → #16945E)` |
| `--shop-promo-surface` | `linear-gradient(135deg, #F8F6FF → #F0FDF4)` |
| `--shop-footer-surface` | `linear-gradient(135deg, #1A0E3D → #2D1B69 → #1A232B)` |
| `--shop-header-surface` | `rgba(255,252,250,0.88)` — warm glass |
| `--shop-sidebar-surface` | `linear-gradient(180deg, rgba warm/purple)` |

#### Shadow Tokens

| Token | Value |
|-------|-------|
| `--shadow-1` / `--shop-shadow-level-1` | `0 2px 8px rgba(26,35,43,0.06), 0 1px 3px rgba(26,35,43,0.04)` |
| `--shadow-2` / `--shop-shadow-level-2` | `0 4px 16px rgba(26,35,43,0.08), 0 2px 6px rgba(26,35,43,0.05)` |
| `--shadow-3` / `--shop-shadow-level-3` | `0 8px 32px rgba(110,73,216,0.12), 0 2px 8px rgba(110,73,216,0.06)` |
| `--shadow-4` / `--shop-shadow-level-4` | `0 1px 0 rgba(26,35,43,0.06), 0 4px 20px rgba(26,35,43,0.10)` |
| `--shadow-5` / `--shop-shadow-level-5` | `0 12px 40px rgba(26,35,43,0.12), 0 4px 12px rgba(26,35,43,0.08)` |
| `--shadow-brand` | `0 4px 16px rgba(34,197,94,0.25)` |

#### Radius Tokens

| Token | Value |
|-------|-------|
| `--shop-radius-4` | `4px` |
| `--shop-radius-8` | `8px` |
| `--shop-radius-12` | `12px` |
| `--shop-radius-16` | `16px` |
| `--shop-radius-22` | `22px` |
| `--shop-radius-28` | `28px` |
| `--shop-radius-32` | `32px` |
| `--shop-radius-pill` | `999px` |
| `--shop-card-radius` | `var(--shop-radius-22)` (light) / `var(--shop-radius-28)` (dark) |

#### Spacing Tokens (8-point scale confirmed in code)

| Token | Value |
|-------|-------|
| `--space-4` | `4px` |
| `--space-8` | `8px` |
| `--space-12` | `12px` |
| `--space-16` | `16px` |
| `--space-20` | `20px` |
| `--space-24` | `24px` |
| `--space-32` | `32px` |
| `--space-48` | `48px` |
| `--space-64` | `64px` |

#### Duration Tokens

| Token | Value |
|-------|-------|
| `--duration-micro` | `150ms` |
| `--duration-state` | `300ms` |
| `--duration-spring` | `300ms` |
| `--duration-panel-open` | `360ms` |
| `--duration-panel-close` | `250ms` |
| `--duration-stagger` | `50ms` |
| `--duration-shimmer` | `1500ms` |
| `--duration-hero-progress` | `4000ms` |

#### Easing Tokens

| Token | Value |
|-------|-------|
| `--ease-standard` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--ease-panel-in` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--ease-panel-out` | `cubic-bezier(0.4, 0, 1, 1)` |

### 1.2 Tailwind Config — `tailwind.config.ts`

#### Color Extensions

| Token | Value |
|-------|-------|
| `page` | `#F0EDE8` — **NOTE: inconsistent with `--shop-canvas: #F0ECE8`** (3-digit difference, audit must flag) |
| `brand-50` through `brand-900` | Green palette `#F0FDF4` → `#14532D` |
| `shop.*` tokens | All map to CSS variables (already inventoried above) |

#### Box Shadow Extensions (Tailwind classes)

| Class | Resolves To |
|-------|-------------|
| `shadow-shop1` | `var(--shop-shadow-level-1)` |
| `shadow-shop2` | `var(--shop-shadow-level-2)` |
| `shadow-shop3` | `var(--shop-shadow-level-3)` |
| `shadow-shop4` | `var(--shop-shadow-level-4)` |
| `shadow-shopSoft` | `var(--shop-shadow-soft)` |
| `shadow-shopStrong` | `var(--shop-shadow-strong)` |
| `shadow-shop-1` | `0 2px 8px rgba(26,35,43,0.06), 0 1px 3px rgba(26,35,43,0.04)` (hardcoded duplicate) |
| `shadow-shop-2` through `shadow-shop-5` | Hardcoded duplicates of CSS var values |
| `shadow-nav-up` | `0 -8px 32px rgba(26,35,43,0.08), 0 -1px 0 rgba(26,35,43,0.06)` |
| `shadow-green-glow` | `0 2px 8px rgba(22,148,94,0.30)` |
| `shadow-green-glow-hover` | `0 4px 12px rgba(22,148,94,0.40)` |
| `shadow-purple-glow` | `0 8px 24px rgba(110,73,216,0.20)` |

#### Border Radius Extensions

| Class | Value |
|-------|-------|
| `rounded-shop4` through `rounded-shop32` | `var(--shop-radius-4)` through `var(--shop-radius-32)` |
| `rounded-shopPill` | `var(--shop-radius-pill)` |

#### Animation/Keyframe Extensions

| Class | Keyframe | Duration |
|-------|----------|----------|
| `animate-slide-up` | `slideUp` (Y: 12px → 0) | `0.3s ease-out` |
| `animate-slide-down` | `slideDown` (Y: -8px → 0) | `0.3s ease-out` |
| `animate-fade-in` | `fadeIn` (opacity 0 → 1) | `0.2s ease-out` |
| `animate-shimmer` | `shimmer` (backgroundPosition) | `1.5s infinite` |
| `animate-badge-bounce` | `badgeBounce` (scale 1 → 1.3 → 1) | `0.3s ease-out` |

#### Background Image Extensions

| Class | Value |
|-------|-------|
| `bg-shop-page` | `var(--shop-page-gradient)` |
| `bg-shop-hero` | `var(--shop-hero-surface)` |
| `bg-shop-promo` | `var(--shop-promo-surface)` |
| `bg-shop-footer` | `var(--shop-footer-surface)` |

#### Transition Duration Extensions

Custom durations: `80`, `220`, `250`, `320`, `380`, `400`, `600` (ms). All usable as `duration-80`, `duration-220`, etc.

#### Font

| Class | Value |
|-------|-------|
| `font-sans` | `var(--font-plus-jakarta)`, DM Sans, system-ui fallbacks |

Loaded via `next/font/google` with weights `400`, `500`, `600`, `700`, `800`. Variable: `--font-plus-jakarta`.

### 1.3 CSS Utility Classes in `globals.css`

The following utility classes are **already present** and must be verified as rendering correctly:

| Class | Purpose | Audit Check |
|-------|---------|-------------|
| `.warm-canvas` | `background: var(--shop-page-gradient)` | Applied to shop layout root |
| `.grain-overlay` | SVG noise texture via `::before` pseudo | Hero and YourUsuals sections |
| `.mesh-purple` | Radial gradient warm purple + green on canvas | Verify: renders, not just defined |
| `.mesh-green` | Radial gradient warm green + purple on canvas | Applied to YourUsuals section |
| `.mesh-dark` | Dark radial gradient on `#1A0E3D` base | Verify: dark promo zones |
| `.glass-surface` | Backdrop blur panel `rgba(255,252,250,0.72)` | Header / overlays |
| `.gradient-text-green` | `-webkit-background-clip: text` green gradient | Section headings |
| `.gradient-text-purple` | `-webkit-background-clip: text` purple gradient | Section headings |
| `.reveal-on-scroll` / `.visible` | CSS-only scroll reveal (opacity + translateY) | Used via `ScrollReveal` component |
| `.stagger-1` through `.stagger-5` | Delay overrides: 80/160/250/340/430ms | Used with `.reveal-on-scroll` |
| `.page-enter` | `pageEnter` keyframe 350ms | Page transition |
| `.premium-panel` | Surface + border + shadow composite | Card variants |
| `.shop-surface` | `bg-surface-elevated + border + shadow-soft` | Generic surface utility |
| `.header-nav-link` | Underline hover via `::after` pseudo | Header nav items |
| `.home-section-spacing` | `padding-top: 2rem` (3xl: 2.5rem) | Home section vertical rhythm |
| `.frosted-panel` | `backdrop-filter: blur(18px)` | Floating UI |
| `.card-glow:hover` | Purple multi-layer glow on hover | Card hover state |
| `.glass-nav-surface` | White/purple gradient glass for nav | Navigation panel |
| `.footer-layered-surface` | Alias for `var(--shop-footer-surface)` | Footer |
| `.editorial-hero-surface` | Alias for `var(--shop-hero-surface)` | Hero |
| `.grain-overlay::before` | `inset: -50%` + `width/height: 200%` + animated drift | Verify: no layout overflow |

**NOTE — Missing utilities flagged for Phase 3:**
The following are defined in `GROLIN_DEFINITIVE_BUILD.md` as needed but are **not present** in the current `globals.css` and must be added in Phase 3:
- `.mesh-warm` (the build doc specifies this; currently only `.mesh-purple` and `.mesh-green` exist)
- `.skeleton-warm` (build doc specifies; current `Skeleton` component uses default shadcn gray)
- `.btn-press` (not found)
- `.card-hover` (not found)
- `.shadow-green-glow`, `.shadow-green-glow-hover`, `.shadow-purple-glow` CSS classes (exist as Tailwind tokens but not as standalone CSS classes)
- `.eyebrow`, `.headline-editorial`, `.section-heading` CSS classes (build doc specifies; not found)
- `.fade-edge-mask` (not found)

### 1.4 Motion System — `src/lib/motion-variants.ts` + `src/lib/motion.ts`

#### Confirmed present variants

| Export | Behavior |
|--------|---------|
| `fadeUp` | `opacity: 0, y: 24` → visible, `duration: 0.6, ease: standard` |
| `eyebrowReveal` | `opacity: 0, y: 8` → visible, `duration: 0.4` |
| `scaleIn` | `opacity: 0, scale: 0.95, y: 12` → visible, spring ease |
| `springPop` | `opacity: 0, scale: 0` → visible, `spring stiffness: 420, damping: 22` |
| `staggerContainer` | staggerChildren: `0.05s`, delayChildren: `0.08s` |
| `staggerItem` | `opacity: 0, y: 16` → visible, `duration: 0.3` |
| `slideInLeft` | `opacity: 0, x: -24` → visible, `duration: 0.32` |
| `slideInRight` | `opacity: 0, x: 24` → visible, `duration: 0.32` |
| `panelOpen` | `opacity: 0, y: 16, scale: 0.98` → visible (+ exit state) |
| `fadeIn` (motion.ts) | `opacity: 0` → visible, `duration: 0.18, easeOut` |

#### LazyMotion status — CONFIRMED

`src/components/ui/MotionProvider.tsx` wraps `<LazyMotion features={domAnimation} strict>`. This is mounted in `src/app/layout.tsx` via `<MotionProvider>`. **LazyMotion is correctly configured.** The audit must confirm no components import from `framer-motion` directly (bypassing LazyMotion's `strict` mode) — only `m` from `framer-motion` is valid inside strict LazyMotion.

#### Missing variants flagged for Phase 6

The build doc specifies `cardReveal`, `staggerContainerFast`, and `fadeIn` (the one in `motion.ts` is minimal — only opacity, no Y). These need to be compared against usage in components during audit.

---

## 2. Typography — Current State

### Font Loading

- **Font family:** Plus Jakarta Sans
- **Loaded via:** `next/font/google` in `src/app/layout.tsx`
- **Weights loaded:** 400, 500, 600, 700, 800
- **CSS variable:** `--font-plus-jakarta`
- **Applied via:** `body` in `globals.css` + `plusJakartaSans.className` on `<body>` element
- **Fallbacks:** DM Sans, system-ui, -apple-system, BlinkMacSystemFont, sans-serif

### Type Scale to Audit

The audit must document the **actual rendered sizes and weights** used in the following locations:

| Location | Expected Pattern | Audit: Is it applied? |
|----------|-----------------|----------------------|
| Home section headings (`HomeSectionHeader`) | `text-2xl md:text-3xl font-extrabold tracking-tight` | Check |
| Product card name | `text-sm font-semibold line-clamp-2` | Check |
| Product card price | `text-base/lg font-extrabold tabular-nums` | Check |
| Product card struck price | `text-xs line-through` color: `--shop-ink-faint` | Check |
| Product card unit label | `text-[11px] font-medium` color: `--shop-ink-muted` | Check |
| Header brand | Bold, authoritative | Check |
| BottomNav labels | `text-[11px] font-semibold` | Check |
| Footer headings | `text-sm font-bold uppercase` | Check |
| Footer body | `text-xs font-medium` | Check |
| Eyebrow labels | `text-[11px] font-700 uppercase tracking-[0.08em]` | Check |

### Typography Problems to Flag

For each location: note font size, weight, line-height, and letter-spacing **as rendered**. Flag anything that:
- Uses `font-normal` (400) where hierarchy requires at least 600
- Has no visible size step between adjacent hierarchy levels
- Uses non-Plus-Jakarta-Sans fonts
- Has no optical tracking on headings (no `tracking-tight` / negative `letter-spacing`)
- Uses text smaller than 11px on mobile (accessibility minimum)

---

## 3. Color — Current State (60/30/10 Audit Contract)

### Target Split (for audit verification)

| Role | % Dominance | Token | Value |
|------|-------------|-------|-------|
| Dominant surface (canvas) | 60% | `--shop-canvas` | `#F0ECE8` |
| Secondary (cards, panels, nav) | 30% | `--shop-surface` | `#FFFFFF` |
| Accent — reserved for specific uses | 10% | `--shop-primary` (purple) + `--shop-action` (green) | `#6E49D8` / `#16945E` |

**Accent reservation rule (must be verified):**
- `--shop-primary` (`#6E49D8` purple): CTAs, focus rings, eyebrow labels, active nav states, primary buttons
- `--shop-action` (`#16945E` green): Add-to-cart buttons, price display, success states, free delivery indicators
- `--shop-accent` (`#E3B93C` gold): Discount/deal badges only
- `--shop-discount` (`#C2410C` orange-red): Struck-through original prices, sale labels only
- `--shop-danger` (`#DC2626` red): Destructive actions only (cancel order, delete account)

**Audit must flag any accent color used outside its reserved context.**

### Dark Mode Tokens

Dark mode CSS variables exist in `.dark {}` block. Audit must note whether dark mode is:
1. Triggerable in the running app (next-themes + `ShopThemeProvider`)
2. Visually correct when activated
3. Consistent (no hardcoded `#FFFFFF` or `#000000` in components that would override dark tokens)

### Specific Color Problems to Flag (AI-Slop Patterns)

| Pattern | What to Look For | Flag If Found |
|---------|-----------------|---------------|
| Flat white sections | `bg-white` used as page background (not card surface) | Flag — use `--shop-canvas` |
| Generic gray | `bg-gray-*`, `bg-neutral-*`, `bg-slate-*` used for non-text elements | Flag |
| Hard borders as primary separator | `border border-gray-200` on cards instead of shadow | Flag |
| Identical gray skeletons | `bg-gray-200` shimmer in skeleton components | Flag — use `.skeleton-warm` |
| Unsaturated neutrals | Any `#F5F5F5`, `#EEEEEE`, `#E0E0E0` without warm tint | Flag |
| Purple-on-white gradient text | Gradient text on white background (accessibility + slop) | Flag |

---

## 4. Spacing — Current State

### Grid System

- **Max content width:** `max-w-[1680px]` (used in home page sections)
- **Content padding:** `px-3 sm:px-4 lg:px-6` (home sections)
- **Section vertical spacing:** `.home-section-spacing` → `pt-8 lg:pt-10`
- **Card gap:** `gap-3 sm:gap-4` in product grids
- **Card grid:** `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`

### Spacing Problems to Flag

| Check | Flag If |
|-------|---------|
| Touch targets | Any interactive element with tap area < 44px height on mobile |
| Dense packing | Cards with < 8px gap |
| Over-padded empty space | Sections with > 96px vertical padding without content justification |
| Inconsistent padding | Page sections using arbitrary pixel values instead of spacing tokens |
| BottomNav clearance | `pb-24 lg:pb-6` on main — verify content is not clipped behind BottomNav |

---

## 5. Component Inventory — What to Audit

### Home Page (`/`) — Component List (from `src/app/(shop)/page.tsx`)

In render order:

1. `PromoBand` — announcement strip at top
2. `HeroLayered` — hero with banner data (CORS / 404 risk)
3. `YourUsualsSection` — mesh-green + grain-overlay wrapper
4. Category Discovery section — `HeaderCategoryNav` + `CategoryRow` in rounded card
5. `HomeFeatureGrid` / `HomeFeatureGridSkeleton` — featured deals
6. `CollectionRow` × 6 — curated collections (collection images: `/images/collections/*.webp`)
7. `RecommendedSection`
8. `HomePromiseBanner`
9. `HomeCategoryGrid` / `HomeCategoryGridSkeleton`
10. `LocalTrustSection`
11. `BestSellersShowcase` / `BestSellersShowcaseSkeleton`
12. `HomeTrendingGrid`
13. `TodaysFreshPicks`
14. Weekly Picks grid — `ProductCard` × 6
15. `AllProductsSection` (conditional)

### Layout Components (from `src/app/(shop)/layout.tsx`)

- `ShopHeader` — visible on all shop routes except cart/checkout/order-confirmed
- `ShopFooter` — same exclusion
- `BottomNav` — same exclusion
- Root gradient overlay: `radial-gradient(circle_at_top,rgba(255,255,255,0.58),transparent_44%)` — verify it's visible
- `warm-canvas` class on layout root — verify warm ivory background applied

### Other Routes to Audit

| Route | Key Components | Known Issues |
|-------|---------------|--------------|
| `/categories` | Category listing | Potential infinite spinner (CORS on category images from `grocery-api.shotlin.in`) |
| `/products` | ProductGrid, FilterBar, ProductCard | Possible empty grid |
| `/products/[slug]` | ProductGallery, ProductInfo, AddToCartSection | Blank white screen on missing slug |
| `/cart` | CartItem, CartSummary, CartEmpty | No header chrome |
| `/checkout` | Multi-step wizard | No header chrome |
| `/login` | Auth layout | Font + spacing check |
| `/search` | SearchEmpty state | Empty state quality |
| `/orders` | OrderCard | Status badge colors |
| `/profile` | ProfileHeader | Avatar, menu styling |
| `/wallet` | WalletCard | Balance display |

---

## 6. Audit Methodology — What Reviewers Must Do

### Step A: Static Code Read

For each component file:
1. List every `className` string containing colors, spacing, or typography
2. Flag any value that diverges from the `--shop-*` token system (hardcoded hex, raw Tailwind grays)
3. Note whether Framer Motion is used and if `m.*` (LazyMotion safe) or `motion.*` (bypasses LazyMotion strict mode)
4. Note whether skeleton uses `bg-gray-*` (slop) or the warm token pattern

### Step B: Runtime Visual Check (dev server at port 3001)

Open each route at **375px** and **1280px**. Document each section using this template:

```
Route: [path]  Viewport: [375px / 1280px]
Section: [component name]
Status: [renders / broken / missing]
Visual quality: [premium / acceptable / AI-slop]
Specific issues:
  - [issue 1] → File: [src/components/...] Line: [N]
  - [issue 2] → ...
Console errors: [404s, CORS, hydration]
Fix recommendation: [specific change]
```

### Step C: Console Error Sweep

With devtools open at each route, record:
1. Network tab — every 404 (images, fonts, scripts)
2. Console tab — CORS errors, hydration warnings, unhandled errors
3. Sources tab — any `motion.*` imports in client components (strict mode violation check)

### Step D: AI-Slop Test

Apply this checklist to the running homepage:

| Test | Pass Condition | Current State |
|------|---------------|---------------|
| Background warmth | Page bg is `#F0ECE8` (warm ivory), not `#FFFFFF` or `#F5F5F5` | Document |
| Grain texture | Hero/promo sections show subtle noise (`.grain-overlay`) | Document |
| Mesh gradients | At least one above-fold section has mesh gradient atmosphere | Document |
| Card depth | Cards float with shadow, not bordered boxes | Document |
| Typography hierarchy | 5 distinct visual levels: headline > sub > body > caption > metadata | Document |
| Tracking on headings | Section titles have `tracking-tight` or negative `letter-spacing` | Document |
| Eyebrow labels | Present above at least 3 section titles | Document |
| Section rhythm | Consecutive sections alternate background color | Document |
| Color intentionality | Purple used only for primary/interactive; green for action/price | Document |
| No bounce animations | All motion uses exponential easing only | Document |
| Touch targets | All interactive elements ≥ 44px height on 375px | Document |
| No horizontal scroll | `375px` viewport: no horizontal scrollbar | Document |
| Image zones | Product image containers have warm gradient bg, not plain `bg-gray-*` | Document |

---

## 7. Broken Elements Checklist — What to Document

### Known Issues (from CONCERNS.md + BUILD.md)

These are pre-identified. The audit must confirm existence and add file + line references:

| Issue | Location | How to Confirm |
|-------|---------|----------------|
| Hero image 404s | `HeroLayered.tsx` | Check `<Image src>` values; hit /categories or / and watch Network tab |
| CORS on category images | Category components using `grocery-api.shotlin.in` URLs | CORS error in Console tab |
| Category page infinite spinner | `src/app/(shop)/categories/[id]/page.tsx` | Navigate to `/categories`; observe loading state |
| Blank product detail | `src/app/(shop)/products/[slug]/page.tsx` | Navigate to `/products/nonexistent`; check for white screen |
| Empty product grid | `ProductGrid` / product list pages | Navigate to `/products`; check for empty state |
| LazyMotion strict mode | Any component with `import { motion } from 'framer-motion'` (not `m`) | `grep -r "from 'framer-motion'" src/components` |
| Missing `loading.tsx` | All routes except `categories/[id]` | `find src/app -name "loading.tsx"` |
| Collection images | `/images/collections/col-*.webp` | `ls public/images/collections/` |

### Audit Output Format for Each Broken Element

```
BROKEN: [Short description]
File: [exact path]
Line: [line number or "unknown"]
Console error: [exact error message]
Severity: [blocks render / degrades visual / minor]
Phase to fix: [2 = Fix Broken, 3 = Tokens, etc.]
Fix: [specific one-line change]
```

---

## 8. Copywriting — Current State

The audit documents existing copy; it does not prescribe new copy (that is Phase 7).

### Copy Patterns to Inventory

| Element | Current Copy | Quality |
|---------|-------------|---------|
| Empty category state | "No products in [X] yet. Try another category..." | Document: Does it feel premium? |
| Empty catalog state | "Check back soon for fresh groceries." | Document |
| Product not found | [unknown — may be blank screen, not copy] | Document |
| Free delivery indicator | [from `FreeDeliveryBar` component] | Document |
| Add to cart CTA | [from `ProductCard` / `AddToCartSection`] | Document label text |
| PromoBand text | [from `PromoBand` component] | Document |
| Promise banner | `HomePromiseBanner` | Document |
| Trust section | `LocalTrustSection` | Document |

---

## 9. Audit Output Spec — What Gets Written

The audit produces one file: `.planning/phases/01-audit/AUDIT-REPORT.md`

### Required Sections in AUDIT-REPORT.md

```markdown
# Audit Report — Grolin Customer Web

## Summary
- Routes audited: [N]
- Broken elements found: [N]
- AI-slop patterns found: [N]
- Design token gaps: [N]
- Total fix items: [N]

## Broken Elements
[One entry per broken element using the BROKEN: format above]

## AI-Slop Patterns
[One entry per slop pattern, with file/line and recommended fix]

## Token Inventory Deltas
[Tokens defined in code but NOT rendering correctly in browser]
[Tokens defined in BUILD.md but NOT present in code]
[Inconsistencies: e.g., `page: #F0EDE8` vs `--shop-canvas: #F0ECE8`]

## Component Visual Status
[Table: Route | Component | Status | Quality Score (1-10) | Top Issue]

## Missing Utilities
[CSS classes in BUILD.md not yet present in globals.css]

## Motion System Status
[LazyMotion: confirmed / violated | Missing variants | Components using motion.* not m.*]

## Typography Findings
[Actual sizes/weights found vs target hierarchy]

## Priority Fix List (for Phase 2)
[Ordered by: blocks-render first, then visual severity]
```

---

## 10. Registry Safety Gate

**Not applicable.** Phase 1 makes zero code changes and installs no packages. No shadcn components are added during this phase.

---

## Pre-Population Sources

| Section | Source | Decisions Used |
|---------|--------|---------------|
| Token inventory | `src/app/globals.css` + `tailwind.config.ts` | All CSS vars and Tailwind extensions inventoried |
| Motion system | `src/lib/motion-variants.ts`, `src/lib/motion.ts`, `src/components/ui/MotionProvider.tsx` | LazyMotion confirmed, variants inventoried |
| Component list | `src/app/(shop)/page.tsx` + `src/app/(shop)/layout.tsx` | Full home page component order documented |
| Known issues | `.planning/codebase/CONCERNS.md` + `GROLIN_DEFINITIVE_BUILD.md` | All pre-identified broken elements listed |
| Audit methodology | `GROLIN_DEFINITIVE_BUILD.md` Phase 0 steps 0.1–0.13 | Audit steps formalized into this spec |
| Stack | `.planning/codebase/STACK.md` | Font, libraries, port confirmed |
| Missing utilities | Cross-reference `globals.css` vs BUILD.md Phase 2 prescriptions | Missing CSS classes identified |

---

## Constraints

- **No code changes during Phase 1.** Read-only. All findings are documented; no fixes applied.
- **Forbidden files:** `src/services/**`, `src/store/**`, `src/hooks/use*.ts`, `src/lib/api.ts`, `src/lib/api-base.ts`, `src/providers/AuthProvider.tsx`, `src/app/api/**`, `next.config.mjs`, `.env`
- **Dev server port:** 3001 (`npm run dev` starts `next dev -p 3001`)
- **Breakpoints to audit:** 375px (mobile) and 1280px (desktop) — both required for every route
