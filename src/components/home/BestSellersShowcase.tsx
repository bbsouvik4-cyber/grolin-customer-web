'use client'

import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Heart, Plus, ShoppingBasket, Star, Sparkles, TrendingUp, ChevronRight, Crown, Flame, Award, Zap, Clock, ShoppingCart, Users, ArrowUpRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/hooks/useCart'
import { PRODUCT_IMAGE_PLACEHOLDER, getProductImageSrc } from '@/lib/media'
import { cn, discountPercent, formatINR } from '@/lib/utils'
import type { Product } from '@/types/product.types'

/* ════════════════════════════════  HELPERS  ════════════════════════ */
type Props = { products: Product[] }

const dp = (p: Product) => p.sale_price ?? p.price
const rc = (p: Product) => Math.max(5, Math.min(99, Math.round((p.total_sold || 1) / 12)))
const orderCount = (p: Product) => Math.max(42, Math.min(999, Math.round((p.total_sold || 10) * 3.8)))

const MEDALS: Record<number, { bg: string; border: string; icon: string; label: string }> = {
  1: { bg: 'from-[#FFD700] via-[#FFC107] to-[#FF9800]', border: 'rgba(255,215,0,0.6)', icon: '👑', label: 'Champion' },
  2: { bg: 'from-[#E8E8E8] via-[#C0C0C0] to-[#A8A8A8]', border: 'rgba(192,192,192,0.5)', icon: '🥈', label: 'Runner Up' },
  3: { bg: 'from-[#E6A44E] via-[#CD7F32] to-[#B8691A]', border: 'rgba(205,127,50,0.5)', icon: '🥉', label: 'Rising Star' },
}

/* ─── Stars ─── */
function Stars({ count, light = false }: { count: number; light?: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-[#FBBF24] text-[#FBBF24]" />
      ))}
      <span className={cn('ml-1.5 text-[11px] font-semibold', light ? 'text-white/60' : 'text-[color:var(--shop-ink-muted)]')}>
        {count}
      </span>
    </div>
  )
}

/* ─── Product Image ─── */
function ProdImg({ product, sizes, priority = false, className }: {
  product: Product; sizes: string; priority?: boolean; className: string
}) {
  const src0 = useMemo(() => getProductImageSrc(product), [product])
  const [fail, setFail] = useState(false)
  useEffect(() => { setFail(false) }, [src0])
  const src = fail ? PRODUCT_IMAGE_PLACEHOLDER : src0
  return (
    <Image
      src={src} alt={product.name} fill priority={priority}
      unoptimized={src.startsWith('http')} onError={() => setFail(true)}
      className={className} sizes={sizes}
    />
  )
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const dur = 1500, start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─── Popularity Ring (SVG circular progress) ─── */
function PopularityRing({ percent, size = 48 }: { percent: number; size?: number }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - percent / 100)
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="url(#ring-gradient)" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        className="transition-all duration-1000 ease-out"
      />
      <defs>
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ═══════════════════════  PODIUM CARD (Top 3)  ═══════════════════ */
function PodiumCard({ product, rank, isActive, onClick, inView, reduced, delay }: {
  product: Product; rank: number; isActive: boolean; onClick: () => void
  inView: boolean; reduced: boolean | null; delay: number
}) {
  const disc = product.sale_price !== null && product.sale_price < product.price
    ? discountPercent(product.price, product.sale_price) : null
  const defaultMedal = MEDALS[3]!
  const medal = MEDALS[rank] ?? defaultMedal
  const popularity = Math.min(95, 60 + rank * 10)
  const orders = orderCount(product)

  return (
    <m.button
      type="button" onClick={onClick}
      initial={reduced ? false : { opacity: 0, x: -20, rotateY: -8 }}
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, y: -3 }}
      className={cn(
        'group relative flex w-full items-start gap-4 rounded-[22px] p-4 text-left backdrop-blur-md transition-all duration-400',
        isActive
          ? 'bg-white/18 shadow-[0_16px_48px_rgba(167,139,250,0.25)] ring-1 ring-[#FBBF24]/40'
          : 'bg-white/8 ring-1 ring-white/10 hover:bg-white/14 hover:ring-white/25',
      )}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Animated border glow for active */}
      {isActive && (
        <div className="absolute -inset-[1px] -z-10 rounded-[23px] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${medal.border}, rgba(251,191,36,0.3), ${medal.border})`,
              backgroundSize: '200% 200%',
              animation: 'rotate-gradient 3s linear infinite',
            }}
          />
        </div>
      )}

      {/* Rank + Popularity Ring */}
      <div className="relative shrink-0">
        <PopularityRing percent={isActive ? popularity : popularity - 15} size={52} />
        <div className={cn(
          'absolute inset-0 flex items-center justify-center text-[16px]',
        )}>
          <span>{medal.icon}</span>
        </div>
      </div>

      {/* Product image */}
      <div className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-[14px] bg-white/90 shadow-md">
        <ProdImg product={product} sizes="56px" className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110" />
        {disc && (
          <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[color:var(--shop-discount)] text-[7px] font-black text-white px-1">
            -{disc}%
          </span>
        )}
        {/* Hover glint */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className={cn(
            'rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-wider',
            isActive ? 'bg-[#FBBF24]/20 text-[#FBBF24]' : 'bg-white/10 text-white/50',
          )}>
            {medal.label}
          </span>
        </div>
        <p className="line-clamp-1 text-[14px] font-bold text-white group-hover:text-[#FBBF24] transition-colors">
          {product.name}
        </p>
        <div className="mt-1 flex items-end gap-2">
          <span className="text-[20px] font-black tabular-nums leading-none text-[#FBBF24]">
            {formatINR(dp(product))}
          </span>
          {disc && (
            <span className="pb-[1px] text-[10px] text-white/35 line-through">{formatINR(product.price)}</span>
          )}
        </div>
        {/* Mini order counter */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-full bg-white/8 px-2 py-0.5">
            <ShoppingCart className="h-2.5 w-2.5 text-[#FBBF24]" />
            <span className="text-[9px] font-bold text-white/60">{orders} ordered</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/8 px-2 py-0.5">
            <Users className="h-2.5 w-2.5 text-[#A78BFA]" />
            <span className="text-[9px] font-bold text-white/60">{rc(product)} reviews</span>
          </div>
        </div>
      </div>

      {/* Active arrow indicator */}
      {isActive && (
        <m.div
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FBBF24] text-[#2D1560] self-center"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </m.div>
      )}
    </m.button>
  )
}

/* ═══════════════════════  TRENDING CARD (Ranks 4-7)  ══════════════ */
function TrendingCard({ product, rank, inView, reduced, delay }: {
  product: Product; rank: number; inView: boolean; reduced: boolean | null; delay: number
}) {
  const disc = product.sale_price !== null && product.sale_price < product.price
    ? discountPercent(product.price, product.sale_price) : null
  const popularity = Math.max(30, 80 - rank * 8)
  const orders = orderCount(product)

  return (
    <m.div
      initial={reduced ? false : { opacity: 0, x: 20, rotateY: 8 }}
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      style={{ willChange: 'transform, opacity' }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group relative flex gap-3.5 overflow-hidden rounded-[20px] bg-white/10 p-3 ring-1 ring-white/12 backdrop-blur-md transition-all duration-400 hover:bg-white/18 hover:ring-white/25 hover:shadow-[0_12px_36px_rgba(167,139,250,0.15)]"
      >
        {/* Hover gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FBBF24]/0 via-[#FBBF24]/0 to-[#FBBF24]/0 transition-all duration-500 group-hover:from-[#FBBF24]/5 group-hover:via-transparent group-hover:to-[#A78BFA]/5" />

        {/* Product image with rank overlay */}
        <div className="relative flex h-[78px] w-[78px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-white/90 shadow-md">
          <ProdImg product={product} sizes="78px" className="object-contain p-2 transition-transform duration-500 group-hover:scale-110" />
          {/* Rank badge */}
          <div className="absolute left-1 top-1 flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-gradient-to-br from-[#6E49D8] to-[#A78BFA] text-[10px] font-black text-white shadow-md px-1">
            {rank}
          </div>
          {disc && (
            <div className="absolute bottom-1 left-1 rounded-md bg-[color:var(--shop-discount)] px-1.5 py-0.5 text-[8px] font-black text-white shadow">
              -{disc}%
            </div>
          )}
          {/* Hover glint sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <p className="line-clamp-1 text-[14px] font-bold text-white group-hover:text-[#FBBF24] transition-colors duration-300">
              {product.name}
            </p>
            <Stars count={rc(product)} light />
          </div>

          <div className="flex items-end justify-between gap-2">
            <div className="flex items-end gap-1.5">
              <span className="text-[20px] font-black tabular-nums leading-none text-white">
                {formatINR(dp(product))}
              </span>
              {disc && <span className="pb-[1px] text-[10px] text-white/35 line-through">{formatINR(product.price)}</span>}
            </div>

            {/* Mini stats */}
            <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
              <TrendingUp className="h-2.5 w-2.5 text-emerald-400" />
              <span className="text-[9px] font-bold text-emerald-400">{orders}+</span>
            </div>
          </div>

          {/* Popularity mini-bar */}
          <div className="mt-1.5 flex items-center gap-2">
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
              <m.div
                className="h-full rounded-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B]"
                initial={{ width: 0 }}
                animate={inView ? { width: `${popularity}%` } : {}}
                transition={{ delay: delay + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="text-[8px] font-bold text-white/40">{popularity}%</span>
          </div>
        </div>

        {/* Add button */}
        <div className="flex items-center self-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12 text-white ring-1 ring-white/15 transition-all duration-300 group-hover:bg-[color:var(--shop-action)] group-hover:text-white group-hover:ring-0 group-hover:shadow-[0_4px_12px_rgba(22,163,74,0.4)] group-hover:scale-110">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </div>
        </div>
      </Link>
    </m.div>
  )
}

/* ═══════════════════════════  MAIN EXPORT  ═════════════════════════ */
export function BestSellersShowcase({ products }: Props) {
  const { addToCart, isAdding } = useCart()
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const sorted = useMemo(() => products.slice(0, 7), [products])
  const top3 = sorted.slice(0, 3)
  const rest = sorted.slice(3, 7)

  const [activeIdx, setActiveIdx] = useState(0)
  const activeProduct = top3[activeIdx]

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const reduced = useReducedMotion()

  const toggle = useCallback((id: string) => setLiked(p => ({ ...p, [id]: !p[id] })), [])

  // Auto-cycle every 5s
  useEffect(() => {
    if (!inView || reduced) return
    const timer = setInterval(() => setActiveIdx(prev => (prev + 1) % top3.length), 5000)
    return () => clearInterval(timer)
  }, [inView, reduced, top3.length])

  if (!activeProduct) return null

  const disc = activeProduct.sale_price !== null && activeProduct.sale_price < activeProduct.price
    ? discountPercent(activeProduct.price, activeProduct.sale_price) : null
  const stockBase = Math.max(50, activeProduct.max_order_qty ?? 50)
  const stockPct = Math.max(0, Math.min(100, (activeProduct.stock_quantity / stockBase) * 100))

  return (
    <section ref={ref} className="relative overflow-hidden rounded-[36px]" style={{
      background: 'linear-gradient(135deg, #0F0525 0%, #1A0A3E 15%, #2D1560 35%, #4A2899 55%, #3D1F80 75%, #1A0A3E 100%)',
    }}>
      {/* ═══ CINEMATIC BACKGROUND LAYERS ═══ */}

      {/* Layer 1: Cinematic food photograph */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banners/bestsellers-cinematic.png"
          alt="" fill className="object-cover opacity-[0.15] mix-blend-soft-light"
          sizes="100vw" priority={false}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>

      {/* Layer 2: Multi-point radial spotlights */}
      <div className="pointer-events-none absolute -right-16 -top-16 z-0 h-[700px] w-[700px] rounded-full bg-[#7C3AED] opacity-[0.1] blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 z-0 h-[600px] w-[600px] rounded-full bg-[#FBBF24] opacity-[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute right-1/3 top-1/4 z-0 h-[300px] w-[300px] rounded-full bg-[#A78BFA] opacity-[0.08] blur-[80px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/3 z-0 h-[200px] w-[400px] rounded-full bg-[#EC4899] opacity-[0.04] blur-[100px]" />

      {/* Layer 3: Sweeping light beam */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{
        background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.02) 42%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 58%, transparent 65%)',
        backgroundSize: '400% 100%',
        animation: 'sweep-beam 10s ease-in-out infinite',
      }} />

      {/* Layer 4: Grid texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Layer 5: Top shimmer bar */}
      <div className="absolute left-0 right-0 top-0 z-0 h-[2px]" style={{
        background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.5) 20%, rgba(251,191,36,0.6) 50%, rgba(167,139,250,0.5) 80%, transparent)',
        backgroundSize: '200% 100%',
        animation: 'shimmer-border 3s linear infinite',
      }} />

      {/* Layer 6: Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-40 bg-gradient-to-t from-[#0F0525]/60 to-transparent" />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 px-5 py-10 sm:px-7 sm:py-12 lg:px-10 lg:py-14">

        {/* ─── HEADER ─── */}
        <m.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div>
              <m.div
                initial={reduced ? false : { opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-4 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#FBBF24] ring-1 ring-[#FBBF24]/25 backdrop-blur-md shadow-[0_4px_20px_rgba(251,191,36,0.15)]"
              >
                <Crown className="h-3.5 w-3.5" />
                Live Rankings
                <span className="relative ml-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                </span>
              </m.div>

              <m.h2
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-[32px] sm:text-[40px] lg:text-[48px] font-black tracking-[-0.04em] leading-[1.05] text-white"
              >
                Kolkata&apos;s Most{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] via-[#FFD700] to-[#F59E0B]">Loved</span>
                  <m.span
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left rounded-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B]"
                  />
                </span>
              </m.h2>
              <m.p
                initial={reduced ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-3 max-w-[520px] text-[15px] leading-[1.7] text-white/55 font-medium"
              >
                Real-time bestsellers curated from thousands of live orders. Updated every hour.
              </m.p>
            </div>

            {/* Stats + CTA */}
            <m.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2.5 backdrop-blur-md ring-1 ring-white/15">
                <Zap className="h-4 w-4 text-amber-400" />
                <div>
                  <p className="text-[16px] font-black text-white leading-none"><AnimatedCounter value={1247} suffix="+" /></p>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white/45">orders today</p>
                </div>
              </div>
              <Link
                href="/products"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-[#2D1560] shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] hover:scale-[1.03]"
              >
                See All Rankings
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </m.div>
          </div>
        </m.div>

        {/* ─── AUTO-CYCLING PROGRESS BAR ─── */}
        <m.div
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mb-8 flex gap-3"
        >
          {top3.map((p, i) => (
            <button key={p.id} type="button" onClick={() => setActiveIdx(i)} className="flex-1 group">
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                {i === activeIdx ? (
                  <m.div
                    key={`bar-${i}-${activeIdx}`}
                    className="h-full rounded-full bg-gradient-to-r from-[#FBBF24] via-[#FFD700] to-[#F59E0B]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                  />
                ) : i < activeIdx ? (
                  <div className="h-full w-full rounded-full bg-[#FBBF24] opacity-50" />
                ) : null}
              </div>
              <p className={cn(
                'mt-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors',
                i === activeIdx ? 'text-[#FBBF24]' : 'text-white/30',
              )}>
                #{i + 1} {p.name.split(' ').slice(0, 2).join(' ')}
              </p>
            </button>
          ))}
        </m.div>

        {/* ─── MAIN LAYOUT ─── */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,1.4fr)_minmax(0,1fr)] lg:gap-7">

          {/* LEFT — Podium Selectors */}
          <div className="flex flex-col gap-3">
            <div className="mb-1 flex items-center gap-2">
              <Award className="h-4 w-4 text-[#FBBF24]" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FBBF24]">Top 3 Podium</span>
            </div>
            {top3.map((p, i) => (
              <PodiumCard
                key={p.id} product={p} rank={i + 1} isActive={i === activeIdx}
                onClick={() => setActiveIdx(i)} inView={inView} reduced={reduced}
                delay={0.15 + i * 0.08}
              />
            ))}
          </div>

          {/* CENTER — Active Spotlight */}
          <m.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <m.article
                key={activeProduct.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-[28px] bg-white shadow-[0_32px_72px_rgba(15,5,37,0.4)] ring-1 ring-white/20"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Animated top gradient bar */}
                <div className="h-[3px] w-full" style={{
                  background: 'linear-gradient(90deg, #6E49D8, #A78BFA, #FBBF24, #A78BFA, #6E49D8)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer-border 3s linear infinite',
                }} />

                <div className="p-5 sm:p-6 lg:p-7">
                  {/* Badge row */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <m.div
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-[0_4px_18px_rgba(255,165,0,0.45)]"
                        animate={{ rotate: [0, -5, 5, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Crown className="h-5 w-5 text-white" strokeWidth={2.5} />
                      </m.div>
                      <div>
                        <p className="text-[14px] font-black uppercase tracking-[0.08em] text-[color:var(--shop-primary)]">
                          #{activeIdx + 1} Bestseller
                        </p>
                        <p className="text-[11px] font-medium text-[color:var(--shop-ink-muted)]">Most ordered this week</p>
                      </div>
                    </div>
                    <button
                      type="button" onClick={() => toggle(activeProduct.id)}
                      className="rounded-full bg-[color:var(--shop-surface-subtle)] p-2.5 transition-all hover:bg-red-50 hover:text-red-500 hover:scale-110"
                    >
                      <Heart className={cn('h-5 w-5', liked[activeProduct.id] ? 'fill-red-500 text-red-500' : 'text-[color:var(--shop-ink-faint)]')} />
                    </button>
                  </div>

                  {/* Hero image */}
                  <div className="relative mb-6 h-[260px] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#F8F5FF] via-[#F3EEFF] to-[#EDE5FF] sm:h-[300px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(110,73,216,0.07),transparent_60%)]" />
                    <ProdImg
                      product={activeProduct} priority
                      sizes="(max-width: 1024px) 80vw, 500px"
                      className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    {disc && (
                      <m.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="absolute left-4 top-4 flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#EF4444] to-[#DC2626] px-3.5 py-2 shadow-lg"
                      >
                        <Flame className="h-3.5 w-3.5 text-white" />
                        <span className="text-[13px] font-black text-white">{disc}% OFF</span>
                      </m.div>
                    )}
                    {/* Hover light sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-[1s] group-hover:translate-x-full group-hover:opacity-100" />
                  </div>

                  {/* Product info */}
                  <Stars count={rc(activeProduct)} />
                  <h3 className="mt-2.5 text-[26px] sm:text-[32px] font-black leading-[1.1] tracking-[-0.02em] text-[color:var(--shop-ink)]">
                    {activeProduct.name}
                  </h3>
                  <div className="mt-3 flex items-end gap-2.5">
                    <span className="text-[38px] font-black leading-none tabular-nums tracking-[-0.03em] text-[color:var(--shop-ink)]">{formatINR(dp(activeProduct))}</span>
                    {disc && <span className="pb-1 text-[15px] font-medium text-[color:var(--shop-ink-faint)] line-through">{formatINR(activeProduct.price)}</span>}
                  </div>
                  <p className="mt-2.5 line-clamp-2 text-[13px] leading-[1.65] text-[color:var(--shop-ink-muted)]">
                    {activeProduct.description || 'Premium pantry essential chosen for freshness, consistency, and repeat purchase confidence.'}
                  </p>

                  {/* Urgency bar */}
                  <div className="mt-5 flex items-center gap-3 rounded-[16px] border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
                      <Flame className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-700">Selling Fast</span>
                        <span className="text-[11px] font-bold text-amber-800 tabular-nums"><AnimatedCounter value={activeProduct.stock_quantity} /> left</span>
                      </div>
                      <div className="h-[6px] w-full overflow-hidden rounded-full bg-amber-200/60">
                        <m.div
                          key={`stock-${activeProduct.id}`}
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #FBBF24, #F59E0B, #EA580C)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${stockPct}%` }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    type="button" onClick={() => addToCart(activeProduct.id, 1)}
                    disabled={isAdding || activeProduct.stock_quantity === 0}
                    className="mt-5 group/btn relative flex h-[52px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-[16px] bg-[color:var(--shop-action)] text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(22,163,74,0.3)] transition-all duration-300 hover:bg-[color:var(--shop-action-hover)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(22,163,74,0.35)] disabled:opacity-55 disabled:hover:translate-y-0"
                  >
                    <ShoppingBasket className="h-[18px] w-[18px]" strokeWidth={2.5} />
                    <span>{activeProduct.stock_quantity === 0 ? 'Out of stock' : 'Add to Cart — Best Price'}</span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                  </button>
                </div>
              </m.article>
            </AnimatePresence>
          </m.div>

          {/* RIGHT — Trending Cards (4-7) */}
          <div className="flex flex-col gap-3">
            <div className="mb-1 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#FBBF24]" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FBBF24]">Also Trending</span>
            </div>
            {rest.map((p, i) => (
              <TrendingCard
                key={p.id} product={p} rank={i + 4}
                inView={inView} reduced={reduced} delay={0.25 + i * 0.07}
              />
            ))}
          </div>
        </div>

        {/* ─── BOTTOM PROMO STRIP ─── */}
        <m.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 border-t border-white/8 pt-8"
        >
          {[
            { icon: Clock, title: 'Refreshed Hourly', desc: 'Rankings from live order data', color: '#A78BFA' },
            { icon: TrendingUp, title: '1,247+ Orders', desc: 'Kolkata shops with Grolin daily', color: '#22C55E' },
            { icon: Sparkles, title: 'Expert Curated', desc: 'Handpicked by our grocery team', color: '#FBBF24' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3.5 rounded-[18px] bg-white/6 px-4 py-3.5 ring-1 ring-white/8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:ring-white/15">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: `${item.color}18`, border: `1px solid ${item.color}25` }}>
                <item.icon className="h-4 w-4" style={{ color: item.color }} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white">{item.title}</p>
                <p className="text-[11px] text-white/45">{item.desc}</p>
              </div>
            </div>
          ))}
        </m.div>
      </div>

      {/* CSS keyframes */}
      <style jsx>{`
        @keyframes shimmer-border {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes sweep-beam {
          0%, 100% { background-position: -400% 0; }
          50% { background-position: 400% 0; }
        }
        @keyframes rotate-gradient {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════  SKELETON  ════════════════════════════ */
export function BestSellersShowcaseSkeleton() {
  return (
    <section className="overflow-hidden rounded-[36px]" style={{
      background: 'linear-gradient(135deg, #0F0525, #1A0A3E, #2D1560)',
    }}>
      <div className="px-5 py-10 sm:px-7 sm:py-12 lg:px-10 lg:py-14">
        <div className="mb-10">
          <Skeleton className="mb-4 h-8 w-36 rounded-full bg-white/10" />
          <Skeleton className="mb-3 h-12 w-80 rounded-lg bg-white/10" />
          <Skeleton className="h-5 w-[400px] rounded-md bg-white/8" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,1.4fr)_minmax(0,1fr)] lg:gap-7">
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map(i => <Skeleton key={i} className="h-[110px] rounded-[22px] bg-white/8" />)}
          </div>
          <Skeleton className="h-[600px] rounded-[28px] bg-white/10" />
          <div className="flex flex-col gap-3">
            {[0, 1, 2, 3].map(i => <Skeleton key={i} className="h-[100px] rounded-[20px] bg-white/8" />)}
          </div>
        </div>
      </div>
    </section>
  )
}
