'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'
import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product.types'

// Receives data from page.tsx — no data fetching here.
// Caller passes: products={filteredNewArrivals} isLoading={shouldShowFeaturedSkeleton}

interface TodaysFreshPicksProps {
  products: Product[]
  isLoading?: boolean
}

/**
 * Today's Fresh Picks — Cinematic Apple-style marquee showcase
 *
 * V2 Upgrade:
 * - Glassmorphic showcase frame with animated border glow
 * - Floating ambient light orbs for atmospheric depth
 * - Mesh-purple-warm background with grain overlay
 * - Frosted pill badge header + animated gradient text
 * - Glowing edge fades with purple/green depth
 * - Top shimmer accent line for visual separation
 * - Slower marquee for premium unhurried feel
 */
export function TodaysFreshPicks({ products, isLoading = false }: TodaysFreshPicksProps) {
  const visibleProducts = products.slice(0, 8)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()

  if (!isLoading && visibleProducts.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden mesh-purple-warm py-10 md:py-14"
      aria-label="Today's Fresh Picks"
    >
      {/* ═══ ATMOSPHERIC BACKGROUND LAYERS ═══ */}

      {/* Top shimmer accent line */}
      <div className="absolute left-0 right-0 top-0 z-[1] shimmer-accent-line" />

      {/* Floating ambient orbs */}
      <div
        className="ambient-orb z-0"
        style={{
          width: 300, height: 300,
          top: '-10%', right: '-5%',
          background: 'rgba(110, 73, 216, 0.08)',
          filter: 'blur(80px)',
          animationDelay: '0s',
        }}
      />
      <div
        className="ambient-orb z-0"
        style={{
          width: 250, height: 250,
          bottom: '-8%', left: '10%',
          background: 'rgba(22, 148, 94, 0.07)',
          filter: 'blur(70px)',
          animationDelay: '2s',
        }}
      />
      <div
        className="ambient-orb z-0"
        style={{
          width: 180, height: 180,
          top: '30%', left: '55%',
          background: 'rgba(227, 185, 60, 0.05)',
          filter: 'blur(60px)',
          animationDelay: '4s',
        }}
      />

      {/* Subtle dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(110,73,216,0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-[2] max-w-screen-xl mx-auto">

        {/* Cinematic editorial header */}
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="px-4 md:px-8 flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4"
        >
          <div className="flex flex-col gap-2">
            {/* Frosted pill badge */}
            <m.span
              initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--shop-primary)] shadow-[0_4px_16px_rgba(110,73,216,0.08)] ring-1 ring-[color:var(--shop-primary)]/12 backdrop-blur-md"
            >
              <Sparkles className="h-3 w-3" strokeWidth={2.2} />
              Fresh Today
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              </span>
            </m.span>

            {/* Headline with gradient accent */}
            <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-black tracking-[-0.03em] leading-[1.1] text-[color:var(--shop-ink)]">
              Today&apos;s Fresh{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16945E] via-[#22C77A] to-[#16945E]" style={{ backgroundSize: '200% 100%', animation: 'shimmer-accent 4s ease-in-out infinite' }}>
                  Picks
                </span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#16945E] via-[#22C77A] to-[#16945E]"
                  style={{ backgroundSize: '200% 100%', animation: 'shimmer-accent 4s ease-in-out infinite' }}
                />
              </span>
            </h2>

            {/* Sub-description */}
            <p className="mt-1 max-w-[480px] text-[13px] sm:text-[14px] leading-[1.6] text-[color:var(--shop-ink-muted)] font-medium">
              Hand-picked new arrivals — from farm-fresh produce to artisan pantry staples, curated daily.
            </p>
          </div>

          {/* See all link */}
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/products?sort=new"
              className="group inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-[12px] font-bold text-[color:var(--shop-primary)] shadow-sm ring-1 ring-[color:var(--shop-primary)]/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/90 hover:shadow-md hover:ring-[color:var(--shop-primary)]/20"
              aria-label="See all new arrivals"
            >
              See all
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </m.div>

        {/* ═══ GLASSMORPHIC SHOWCASE FRAME ═══ */}
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 10, scale: 0.99 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="mx-3 sm:mx-4 lg:mx-6 glass-showcase py-5"
        >
          <div className="relative">
            {/* Left gradient fade — with purple glow */}
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 md:w-24"
              style={{
                background: `linear-gradient(to right, 
                  rgba(255,252,250,0.85) 0%, 
                  rgba(255,252,250,0.5) 30%,
                  rgba(110,73,216,0.03) 60%,
                  transparent 100%)`,
              }}
            />
            {/* Right gradient fade — with green glow */}
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 md:w-24"
              style={{
                background: `linear-gradient(to left, 
                  rgba(255,252,250,0.85) 0%, 
                  rgba(255,252,250,0.5) 30%,
                  rgba(22,148,94,0.03) 60%,
                  transparent 100%)`,
              }}
            />

            <Marquee
              pauseOnHover
              className={cn(
                'py-2 [--duration:55s] [--gap:0.75rem]',
                'md:[--gap:1rem]',
              )}
            >
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      className="flex-shrink-0 w-[160px] sm:w-[180px]"
                    >
                      <ProductCardSkeleton />
                    </div>
                  ))
                : visibleProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-[160px] sm:w-[180px]"
                    >
                      <ProductCard
                        product={product}
                        showNewBadge
                        priority={false}
                      />
                    </div>
                  ))}
            </Marquee>
          </div>
        </m.div>

      </div>

      {/* Bottom shimmer accent line */}
      <div className="absolute left-0 right-0 bottom-0 z-[1] shimmer-accent-line" />
    </section>
  )
}
