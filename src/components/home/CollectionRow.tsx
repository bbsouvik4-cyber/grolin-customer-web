'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types/product.types'
import { cn } from '@/lib/utils'
import { EditorialBannerCard } from './EditorialBannerCard'

interface CollectionRowProps {
  title: string
  eyebrow: string
  emoji: string
  subtitle?: string
  gradient: string
  products: Product[]
  viewAllHref: string
  image?: string
}

function RowArrow({
  direction,
  onClick,
  hidden,
}: {
  direction: 'left' | 'right'
  onClick: () => void
  hidden?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll collection left' : 'Scroll collection right'}
      className={cn(
        'absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#101216] text-white shadow-[0_18px_36px_rgba(16,18,22,0.24)] transition-all duration-200 hover:scale-[1.03] hover:bg-black lg:flex',
        direction === 'left' ? 'left-0' : 'right-0',
        hidden && 'pointer-events-none opacity-0',
      )}
    >
      {direction === 'left' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </button>
  )
}

export function CollectionRow({
  title,
  eyebrow,
  emoji,
  subtitle,
  gradient,
  products,
  viewAllHref,
  image,
}: CollectionRowProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const updateState = () => {
      setCanScrollLeft(element.scrollLeft > 8)
      setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 8)
    }

    updateState()
    element.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)

    return () => {
      element.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [products])

  const scrollByAmount = (direction: 'left' | 'right') => {
    const element = scrollRef.current
    if (!element) return

    element.scrollBy({
      left: (direction === 'left' ? -1 : 1) * Math.max(320, element.clientWidth * 0.7),
      behavior: 'smooth',
    })
  }

  return (
    <section className="mt-12 px-4 sm:px-4 lg:px-6">
      <div className="reveal-on-scroll mb-5 flex items-end justify-between gap-4 px-0 sm:px-0">
        <div className="flex items-start gap-3">
          <span className="mt-1 hidden h-8 w-[2px] rounded-full bg-[color:var(--shop-primary)] sm:block" />
          <div className="space-y-1">
            <span className="eyebrow mb-0.5">
              {eyebrow}
            </span>
            <h2 className="section-heading">
              {title}
            </h2>
            {subtitle ? (
              <p className="max-w-[560px] text-[14px] leading-6 text-[color:var(--shop-ink-muted)]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <Link
          href={viewAllHref}
          className="hidden shrink-0 items-center gap-1 text-[13px] font-semibold text-[color:var(--shop-primary)] transition-colors duration-200 hover:text-[color:var(--shop-primary-hover)] sm:inline-flex"
        >
          <span>See all</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative">
        <RowArrow direction="left" onClick={() => scrollByAmount('left')} hidden={!canScrollLeft} />
        <RowArrow direction="right" onClick={() => scrollByAmount('right')} hidden={!canScrollRight} />

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-4 pb-3 pt-1 scrollbar-none fade-edge-mask"
        >
          <EditorialBannerCard title={title} eyebrow={eyebrow} emoji={emoji} gradient={gradient} href={viewAllHref} image={image} />

          {products.map((product, index) => (
            <div key={product.id} className="w-[148px] shrink-0 snap-start self-stretch">
              <ProductCard product={product} priority={index < 2} variant="section" />
            </div>
          ))}

          <Link
            href={viewAllHref}
            className="flex min-h-[200px] w-[72px] shrink-0 snap-start flex-col items-center justify-center gap-2 self-stretch rounded-[22px] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)] shadow-[var(--shop-shadow-level-1)] transition-all duration-200 hover:shadow-[var(--shop-shadow-level-2)] hover:bg-[color:var(--shop-surface-elevated)]"
            aria-label={`See more in ${title}`}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="text-[11px] font-medium">More</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
