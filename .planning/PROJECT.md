# Grolin Customer Web — Premium UI Build

## What This Is

Grolin is a premium grocery e-commerce PWA for Kolkata, built on Next.js 14 App Router with TypeScript, Tailwind CSS, Framer Motion, and Radix UI/shadcn. The app is fully functional with auth, cart, checkout, orders, wallet, and profile flows — but the visual quality needs to be elevated to match the premium positioning. This project executes a complete 9-phase visual redesign to make the UI look and feel like a ₹1,00,000 product.

## Core Value

Every pixel must pass the AI Slop Test: warm ivory backgrounds, grain textures, mesh gradients, floating card shadows, spring-physics animations, and editorial typography — so that a Zepto design team would be impressed.

## Requirements

### Validated

- ✓ Next.js 14 App Router with (auth) and (shop) route groups — existing
- ✓ Full e-commerce flows: auth, cart, checkout, orders, profile, wallet — existing
- ✓ Zustand auth store + TanStack Query for server state — existing
- ✓ Tailwind CSS with custom shop-* token system — existing
- ✓ Framer Motion installed and partially used — existing
- ✓ shadcn/ui + Radix UI component library — existing
- ✓ Demo/shopfront mode with static fallback data — existing
- ✓ PWA manifest — existing

### Active

- [ ] Phase 0 — Audit: Document every broken element, visual gap, and AI-slop pattern
- [ ] Phase 1 — Fix Broken: Resolve hero image 404s, CORS errors, category spinner, blank product detail, empty product grid
- [ ] Phase 2 — Design Tokens: Add mesh gradients, grain overlay, gradient text, warm skeleton, btn-press, card-hover, glow shadows, editorial typography CSS utilities, Tailwind shadow tokens
- [ ] Phase 3 — Typography: Editorial hierarchy — section headings, product card text, header/nav, footer
- [ ] Phase 4 — Depth & Surface: Borders → shadows, warm ivory page background, alternating section backgrounds, warm image zone gradients, grain on hero + promo
- [ ] Phase 5 — Motion: LazyMotion setup, motion variants, ViewportReveal, scroll reveals, card stagger, Add→Stepper morph, hero entrance stagger
- [ ] Phase 6 — Component Polish: Hero, cards, header, footer, BottomNav, scroll containers, empty states, loading states
- [ ] Phase 7 — Remotion Video: Hero loop video composition and integration (skip if sources missing)
- [ ] Phase 8 — Final Polish + QA: Polish checklist, AI Slop Test, cross-page 375px + 1280px, performance audit

### Out of Scope

- Backend/API changes — only visual layer (src/services, src/store, src/hooks, src/lib/api.ts are forbidden)
- Data fetching logic — visual fixes only, never touch data flow
- Auth logic — no changes to AuthProvider or auth flows
- next.config.mjs, .env files — no infrastructure changes
- New features or pages — polish existing, don't add functionality

## Context

- **Codebase state**: Fully built functional app with known visual gaps — hero image 404s, potential CORS issues on category images, incomplete motion system, missing design token utilities
- **Design system**: shop-* Tailwind tokens + CSS variables already exist; need additional utilities added
- **Font**: Plus Jakarta Sans via next/font/google — already configured
- **Animation**: Framer Motion 12.34.3 installed; LazyMotion + motion variants partially set up
- **Build doc**: `.planning/codebase/GROLIN_DEFINITIVE_BUILD.md` — detailed 24-skill, 9-phase plan with exact READ→FIND→CHANGE→VERIFY steps for every task
- **Absolute rules from build doc**: RULE 1: Read skill files BEFORE each phase. RULE 2: Read every file BEFORE modifying it. RULE 3: Visual changes ONLY. RULE 4: Verify EVERY change — desktop + 375px mobile. RULE 5: One step at a time.
- **Quality bar**: "Would Zepto's design team be impressed?" — if no, fix it
- **Port**: 3001 (npm run dev)

## Constraints

- **Tech stack**: Next.js 14.2.35, TypeScript strict, Tailwind 3.4.1, Framer Motion 12.34.3 — no major version changes
- **Visual only**: No changes to services, store, hooks, API layer, or next.config.mjs
- **No new pages**: Polish existing routes only
- **Mobile-first verification**: Every change verified at 375px AND 1280px

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Visual-only scope | Avoid breaking live API integrations and auth flows | — Pending |
| Standard granularity | 9 build phases map naturally to 5-8 GSD phases | — Pending |
| Keep existing token system | shop-* tokens already established; add utilities on top | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-25 after initialization*
