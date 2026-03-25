# Roadmap: Grolin Customer Web — Premium UI Build

## Overview

A 9-phase visual redesign of the Grolin grocery PWA. The app is fully functional — this milestone transforms its appearance from generic AI-built to premium editorial quality that would impress a Zepto design team. Phases execute in strict order: audit first, fix broken next, then layer design tokens → typography → depth → motion → component polish → video → final QA.

Planning contract: Phase 2 keeps its existing expanded plan package. From Phase 3 onward, each phase should be planned as one detailed `XX-PLAN.md`, with inline subphases or waves only when they materially help execution rather than separate research, validation, or per-subphase planning files unless explicitly requested.

## Phases

- [x] **Phase 1: Audit** — Documented every visual gap, broken element, and AI-slop pattern
- [ ] **Phase 2: Fix Broken** — Resolve hero 404s, CORS errors, infinite spinner, blank product detail, empty grid
- [ ] **Phase 3: Design Tokens** — Add mesh gradients, grain overlay, gradient text, warm skeleton, glow shadows, editorial CSS utilities
- [ ] **Phase 4: Typography** — Editorial hierarchy across section headers, product cards, nav, footer
- [x] **Phase 5: Depth & Surface** — Warm ivory backgrounds, shadows replacing borders, alternating sections, grain on hero/promo (completed 2026-03-25)
- [ ] **Phase 6: Motion** — LazyMotion, motion variants, ViewportReveal, card stagger, Add→Stepper morph, hero entrance
- [ ] **Phase 7: Component Polish** — Hero, cards, header, footer, BottomNav, scroll containers, empty states, loading states
- [ ] **Phase 8: Remotion Video** — Hero loop video composition and integration
- [ ] **Phase 9: Final Polish + QA** — AI Slop Test, cross-page 375px + 1280px audit, performance check

---

## Phase Details

### Phase 1: Audit
**Goal**: Produce a complete written audit of every visual problem — broken images, AI-slop patterns, missing design system elements — before touching any code.
**Depends on**: Nothing (first phase)
**Requirements**: AUDIT-01, AUDIT-02, AUDIT-03
**Success Criteria** (what must be TRUE):
  1. Every broken element (404s, CORS, spinners) is documented with specific file + line
  2. Every AI-slop pattern is identified and flagged with a fix recommendation
  3. All existing design tokens (--shop-*) and Tailwind config are inventoried
  4. Audit report committed to `.planning/` before any code changes
**Plans**: 2 plans

Plans:
- [x] 01-01: Read all layout, page, and component files — inventory current state
- [x] 01-02: Document broken elements + visual gaps with specific fix recommendations

---

### Phase 2: Fix Broken
**Goal**: All pages render without errors. Zero console 404s, CORS errors, or infinite spinners. Every route shows content or a graceful fallback.
**Depends on**: Phase 1
**Requirements**: FIX-01, FIX-02, FIX-03, FIX-04, FIX-05
**Success Criteria** (what must be TRUE):
  1. Hero section renders — no broken images, no 404s in console
  2. `/categories` shows categories — no CORS errors, no infinite spinner
  3. `/products/[slug]` shows product or graceful "not found" — no blank white screen
  4. Product grid shows items or beautiful empty state — no white void
  5. All pages functional at 375px and 1280px
**Plans**: 3 plans

Plans:
- [x] 02-01: Fix hero images (replace 404 URLs with local assets or gradient placeholders)
- [x] 02-02: Fix category images (CORS → local demo-catalog SVGs or emoji fallbacks)
- [x] 02-03: Fix product detail blank + product grid empty state

---

### Phase 3: Design Tokens
**Goal**: The full design token system is in place. Mesh gradients, grain overlay, gradient text, warm ivory background, glow shadows, editorial CSS utilities, and Tailwind shadow tokens are all usable as classes.
**Depends on**: Phase 2
**Requirements**: TOKENS-01, TOKENS-02, TOKENS-03
**Success Criteria** (what must be TRUE):
  1. `.mesh-warm`, `.mesh-dark` classes work and render visible gradient backgrounds
  2. `.grain-overlay` adds subtle grain texture via CSS pseudo-element
  3. `.text-gradient-*` classes render gradient text on headings
  4. `.btn-press`, `.card-hover`, `.glow-shadow-*` utilities available
  5. Tailwind `boxShadow` config has `warm-sm`, `warm-md`, `warm-lg`, `glow` tokens
  6. `--shop-canvas: #F0ECE8` is the default page background
**Plans**: 1 detailed plan

Plans:
- [x] 03-PLAN: Detailed design-token plan with explicit defaults, token cleanup, semantic alias completion, and Tailwind shadow alignment

---

### Phase 4: Typography
**Goal**: Every text element on every page uses the editorial hierarchy — oversized section titles with optical tracking, product card text with correct weight/size ratio, nav using tight tracking, footer in muted small caps.
**Depends on**: Phase 3
**Requirements**: TYPE-01, TYPE-02, TYPE-03
**Success Criteria** (what must be TRUE):
  1. Section headings use editorial sizing (48px+ desktop, 32px+ mobile) with gradient or bold treatment
  2. Product card titles are correctly weighted (600) at proper size with truncation
  3. Header/nav text uses tight tracking (`tracking-tight`) consistently
  4. Footer uses muted small-caps or reduced-weight treatment
  5. No mixed font sizes on same hierarchy level
**Plans**: 1 detailed plan

Plans:
- [x] 04-PLAN: Detailed typography plan covering editorial headings, commerce hierarchy, navigation/footer scale, and auth/fallback cleanup

---

### Phase 5: Depth & Surface
**Goal**: The app has visible depth. Pages use warm ivory backgrounds, sections alternate between `--shop-canvas` and white, cards have floating shadows instead of borders, hero and promo zones have grain texture.
**Depends on**: Phase 4
**Requirements**: DEPTH-01, DEPTH-02, DEPTH-03
**Success Criteria** (what must be TRUE):
  1. Page background is `#F0ECE8` (warm ivory) — not flat white
  2. Product/content cards use `shadow-warm-md` — no hard borders as primary separation
  3. Home sections alternate background tone (canvas / white / canvas)
  4. Hero and at least one promo section have `.grain-overlay`
  5. Image zones have warm gradient overlay (not plain gray)
**Plans**: 1 detailed plan

Plans:
- [x] 05-PLAN: Detailed depth plan covering canvas warmth, section rhythm, card elevation, and image-zone texture

---

### Phase 6: Motion
**Goal**: The app feels alive. LazyMotion is configured, motion variants defined, ViewportReveal wraps content sections, product cards stagger in, Add→Stepper morphs, hero entrance staggers.
**Depends on**: Phase 5
**Requirements**: MOTION-01, MOTION-02, MOTION-03
**Success Criteria** (what must be TRUE):
  1. LazyMotion with `domAnimation` loaded — no full Framer Motion bundle
  2. `motion-variants.ts` has `fadeUp`, `stagger`, `scaleIn`, `slideIn` variants
  3. Home section content fades up on scroll enter (ViewportReveal)
  4. Product grid cards stagger in with 50ms delay
  5. Add-to-cart → stepper transition is smooth morph, not jump
  6. Hero headline/subtext staggers in on mount
**Plans**: 1 detailed plan

Plans:
- [ ] 06-PLAN: Detailed motion plan covering shared motion primitives, reveal choreography, and hero/cart interaction consistency

---

### Phase 7: Component Polish
**Goal**: Every major component looks premium. Hero is editorial, cards have hover depth, header is glass/blur, BottomNav is elevated, empty states are beautiful, skeletons are warm.
**Depends on**: Phase 6
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04
**Success Criteria** (what must be TRUE):
  1. Hero component: editorial layout, no plain image-on-left pattern, grain + mesh
  2. Product cards: floating shadow, image fill, hover lift (`card-hover`) working
  3. Header: backdrop blur + semi-transparent background on scroll
  4. BottomNav: elevated shadow, active indicator is visually distinct
  5. Empty states: illustration or emoji treatment, not just plain text
  6. Skeleton loading: warm ivory base, not flat gray
**Plans**: 1 detailed plan

Plans:
- [ ] 07-PLAN: Detailed component-polish plan covering hero, commerce cards, navigation chrome, and fallback/loading surfaces

---

### Phase 8: Remotion Video
**Goal**: The existing hero loop video system is refined into a production-ready branded motion layer with a real master render, reliable local outputs, device-aware integration, and graceful fallback behavior.
**Depends on**: Phase 7
**Requirements**: VIDEO-01
**Success Criteria** (what must be TRUE):
  1. `remotion/` directory has a valid composition that renders without errors
  2. Hero uses the rendered video intentionally on desktop and preserves a premium fallback path on mobile
  3. If `public/videos/hero-loop.mp4` or `.webm` is missing → graceful fallback to poster / gradient treatment (no crash)
  4. Video renders at `1280x720` minimum resolution
**Plans**: 1 detailed plan

Plans:
- [ ] 08-PLAN: Detailed Remotion-video plan with subphases covering the master composition contract, composition refinement, hero integration rules, render outputs, and verification

---

### Phase 9: Final Polish + QA
**Goal**: The app passes the AI Slop Test. Every page at 375px and 1280px is visually consistent and premium. Performance is not regressed. Accessibility basics pass.
**Depends on**: Phase 8
**Requirements**: QA-01, QA-02, QA-03
**Success Criteria** (what must be TRUE):
  1. AI Slop Test passed on all 8 routes: /, /categories, /products, /cart, /checkout, /orders, /profile, /login
  2. Zero layout breaks at 375px mobile
  3. Zero console errors that affect visual rendering
  4. LCP < 3s on simulated 3G (Lighthouse)
  5. No obvious accessibility regressions (contrast, focus states)
**Plans**: 1 detailed plan

Plans:
- [ ] 09-PLAN: Detailed final QA plan with subphases covering the polish checklist, AI-slop audit, route-matrix review, performance/accessibility sanity, and closeout fixes

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Audit | 2/2 | Completed | 2026-03-25 |
| 2. Fix Broken | 3/3 | Awaiting Verification | - |
| 3. Design Tokens | 1/1 | Awaiting Verification | - |
| 4. Typography | 1/1 | Awaiting Verification | - |
| 5. Depth & Surface | 1/1 | Complete   | 2026-03-25 |
| 6. Motion | 0/1 | Planned | - |
| 7. Component Polish | 0/1 | Planned | - |
| 8. Remotion Video | 0/1 | Planned | - |
| 9. Final Polish + QA | 0/1 | Planned | - |

---
*Roadmap created: 2026-03-25*
*Milestone: v1.0 Premium UI*
