# Thread: Grolin Premium UI Build

## Status: IN PROGRESS

## Goal

Transform the Grolin grocery PWA from functional-but-generic to premium editorial quality — warm ivory backgrounds, mesh gradients, grain textures, floating card shadows, spring-physics animations, and editorial typography. Quality bar: "Would Zepto's design team be impressed?"

## Context

*Created 2026-03-25.*

### What This Is
- **App**: Grolin — premium grocery e-commerce PWA for Kolkata
- **Framework**: Next.js 14.2.35 App Router, TypeScript strict, Tailwind 3.4.1, Framer Motion 12.34.3, shadcn/ui + Radix UI
- **State**: Zustand 5.0.11 + TanStack Query 5.90.21
- **Font**: Plus Jakarta Sans (next/font/google)
- **Port**: 3001 (`npm run dev`)

### Current State
- Fully functional app: auth, cart, checkout, orders, profile, wallet, PWA manifest all work
- Visual layer needs full premium redesign — known issues:
  - Hero images have 404s (external URLs not resolving)
  - Category images have CORS errors from `grocery-api.shotlin.in`
  - Category page shows infinite spinner
  - Product detail (`/products/[slug]`) shows blank white on missing product
  - Product grid empty state is a plain white void

### Scope — VISUAL ONLY
```
✅ ALLOWED:    src/app/globals.css, tailwind.config.ts, src/components/**/*.tsx
✅ ALLOWED:    src/app/(shop)/**/page.tsx, src/lib/motion*.ts, new visual component files
❌ FORBIDDEN:  src/services/**, src/store/**, src/hooks/use*.ts
❌ FORBIDDEN:  src/lib/api.ts, src/lib/api-base.ts, src/providers/AuthProvider.tsx
❌ FORBIDDEN:  src/app/api/**, next.config.mjs, .env files
```

### Absolute Rules
1. Read skill files BEFORE each phase
2. Read every file BEFORE modifying it
3. Visual changes ONLY — never touch data/state/API
4. Verify EVERY change at 375px AND 1280px
5. One step at a time. Verify. Next step.

### Planning Artifacts
- `.planning/PROJECT.md` — full project context
- `.planning/ROADMAP.md` — 9-phase plan with success criteria
- `.planning/codebase/GROLIN_DEFINITIVE_BUILD.md` — 24-skill, 9-phase detailed step guide with READ→FIND→CHANGE→VERIFY steps
- `.planning/codebase/ARCHITECTURE.md`, `STACK.md`, `CONCERNS.md` — codebase map

### Design System
- Existing tokens: `--shop-*` CSS variables + Tailwind config in `tailwind.config.ts`
- Canvas color target: `--shop-canvas: #F0ECE8` (warm ivory)
- Shadow system: `warm-sm`, `warm-md`, `warm-lg`, `glow` to add to Tailwind config
- Demo assets: `public/demo-catalog/` (categories SVGs), `public/images/` (hero)

### Key Design Decisions
- Mesh gradients: `radial-gradient(ellipse at 20% 50%, rgba(110,73,216,0.04), transparent 50%)` + green + gold on canvas
- Grain: `url("data:image/svg+xml,...")` noise filter via CSS `::before` pseudo-element
- Motion: LazyMotion with `domAnimation` (not full bundle) — variants in `src/lib/motion-variants.ts`
- Typography: Plus Jakarta Sans is already set — needs sizing/weight/tracking corrections

## Workflow

The plan is to run each phase through:
1. `/gsd:ui-phase {N}` — generate UI-SPEC.md design contract
2. `/gsd:plan-phase {N}` — create execution plan
3. `/gsd:execute-phase {N}` — build it
4. `/gsd:progress` — check state + route to next

## References

- `.planning/ROADMAP.md` — 9-phase roadmap
- `.planning/codebase/GROLIN_DEFINITIVE_BUILD.md` — detailed build guide
- `.planning/PROJECT.md` — project context + requirements
- `src/app/globals.css` — existing CSS tokens
- `tailwind.config.ts` — existing Tailwind config
- `src/app/(shop)/page.tsx` — home page (entry point for visual work)
- `src/components/home/` — all home section components
- `src/components/layout/` — Header, BottomNav, Shell, Footer

## Phase Status

| Phase | Name | Status |
|-------|------|--------|
| 1 | Audit | Not started |
| 2 | Fix Broken | Not started |
| 3 | Design Tokens | Not started |
| 4 | Typography | Not started |
| 5 | Depth & Surface | Not started |
| 6 | Motion | Not started |
| 7 | Component Polish | Not started |
| 8 | Remotion Video | Not started |
| 9 | Final Polish + QA | Not started |

## Next Steps

- Run `/gsd:progress` to confirm state and route to Phase 1
- Run `/gsd:ui-phase 1` to generate UI-SPEC for the Audit phase
- Then `/gsd:plan-phase 1` → `/gsd:execute-phase 1`
- After each phase: update Phase Status table above
