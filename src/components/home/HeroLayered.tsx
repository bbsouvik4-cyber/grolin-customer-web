'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { m } from 'framer-motion'
import type { Banner } from '@/types/banner.types'

const AUTOPLAY_DELAY = 4500

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, color-mix(in srgb, var(--shop-action) 54%, var(--shop-ink) 46%) 0%, color-mix(in srgb, var(--shop-ink) 84%, black 16%) 100%)',
  'linear-gradient(135deg, color-mix(in srgb, var(--shop-primary) 60%, var(--shop-danger) 40%) 0%, color-mix(in srgb, var(--shop-primary) 48%, var(--shop-ink) 52%) 100%)',
  'linear-gradient(135deg, color-mix(in srgb, var(--shop-trust) 58%, var(--shop-ink) 42%) 0%, color-mix(in srgb, var(--shop-ink) 86%, white 14%) 100%)',
  'linear-gradient(135deg, color-mix(in srgb, var(--shop-accent) 54%, var(--shop-primary) 46%) 0%, color-mix(in srgb, var(--shop-accent) 42%, var(--shop-ink) 58%) 100%)',
]

const EYEBROWS = ['Curated Fresh', 'Limited Run', 'Daily Highlight', 'Editor Pick']
const LOCAL_HERO_IMAGE_MAP: Record<string, string> = {
  'banner-fresh-dinner': '/images/hero/hero-basket.webp',
  'banner-breakfast': '/images/hero/hands-produce.webp',
  'banner-snacks': '/images/hero/produce-scatter.webp',
}
const DEFAULT_HERO_IMAGE = '/images/hero/basket-thumb.webp'

function getEyebrow(banner: Banner, index: number) {
  return banner.subtitle?.trim() || EYEBROWS[index % EYEBROWS.length]
}

function getHeroImageSrc(banner: Banner) {
  const rawImageUrl = banner.image_url?.trim()

  if (rawImageUrl?.startsWith('/images/hero/')) {
    return rawImageUrl
  }

  return LOCAL_HERO_IMAGE_MAP[banner.id] ?? DEFAULT_HERO_IMAGE
}

function shouldRenderHeroLoopVideo(banner: Banner, index: number) {
  const rawImageUrl = banner.image_url?.trim()

  return index === 0 && !rawImageUrl?.startsWith('/images/hero/') && !LOCAL_HERO_IMAGE_MAP[banner.id]
}

export function HeroLayered({ banners }: { banners: Banner[] }) {
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: AUTOPLAY_DELAY,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: banners.length > 1,
      align: 'start',
      slidesToScroll: 1,
      dragFree: false,
      containScroll: 'trimSnaps',
    },
    [autoplay],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const openBanner = (banner: Banner) => {
    if (!banner.link_type || banner.link_type === 'none') return
    if (banner.link_type === 'category' && banner.link_value) {
      router.push(`/categories/${banner.link_value}`)
      return
    }
    if (banner.link_type === 'product' && banner.link_value) {
      router.push(`/products/${banner.link_value}`)
      return
    }
    if (banner.link_type === 'url' && banner.link_value) {
      window.open(banner.link_value, '_blank')
    }
  }

  if (banners.length === 0) return null

  return (
    <m.section
      className="relative w-full overflow-hidden mesh-warm grain-overlay"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-label="Featured promotions"
    >
      {/* Embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, index) => {
            const isActive = selectedIndex === index
            const eyebrow = getEyebrow(banner, index)
            const heroImageSrc = getHeroImageSrc(banner)
            const renderLoopVideo = shouldRenderHeroLoopVideo(banner, index)

            return (
              <article
                key={banner.id}
                className="min-w-0 flex-[0_0_100%] relative overflow-hidden"
                style={{
                  height: 'clamp(260px, 40vw, 420px)',
                  filter: isActive ? 'blur(0px)' : 'blur(1.5px)',
                  opacity: isActive ? 1 : 0.78,
                  transform: isActive ? 'scale(1)' : 'scale(0.97)',
                  transition:
                    'filter 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transformOrigin: 'center',
                }}
              >
                {/* ── Background ── */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: renderLoopVideo
                      ? FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length]
                      : undefined,
                  }}
                >
                  {!renderLoopVideo && heroImageSrc && (
                    <Image
                      src={heroImageSrc}
                      alt={banner.title ?? 'Promotional banner'}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={index < 2}
                    />
                  )}

                  {/* Hero loop video — plays only on first slide, sits behind scrim */}
                  {renderLoopVideo && (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                      poster={heroImageSrc ?? DEFAULT_HERO_IMAGE}
                    >
                      <source src="/videos/hero-loop.webm" type="video/webm" />
                      <source src="/videos/hero-loop.mp4" type="video/mp4" />
                    </video>
                  )}
                </div>

                {/* ── Gradient scrim — bottom-heavy for text legibility ── */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none z-[1]"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.30) 48%, rgba(0,0,0,0.04) 100%)',
                  }}
                />

                {/* ── Warm amber vignette — top edge atmosphere ── */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none z-[1]"
                  style={{
                    background:
                      'radial-gradient(ellipse 100% 40% at 50% 0%, rgba(240,236,232,0.18) 0%, transparent 100%)',
                  }}
                />

                {/* ── Radial highlight — top left sparkle ── */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none z-[1]"
                  style={{
                    background:
                      'radial-gradient(circle at top left, rgba(255,252,248,0.18), transparent 40%)',
                  }}
                />

                {/* ── Full-slide click target ── */}
                <button
                  type="button"
                  onClick={() => openBanner(banner)}
                  className="absolute inset-0 z-[2] w-full h-full text-left group"
                  aria-label={banner.title ?? 'View promotion'}
                >
                  {/* Eyebrow pill — top left */}
                  <span
                    className="absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{
                      color: 'rgba(255,255,255,0.90)',
                      backgroundColor: 'rgba(0,0,0,0.22)',
                      border: '1px solid rgba(255,255,255,0.28)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    {eyebrow}
                  </span>

                  {/* Bottom-left editorial text + CTA */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 pt-16 text-left">
                    <h3
                      className="font-extrabold text-white leading-tight tracking-tight mb-4 max-w-[280px] md:max-w-sm"
                      style={{ fontSize: 'clamp(20px, 4vw, 30px)' }}
                    >
                      {banner.title || 'Fresh essentials delivered beautifully'}
                    </h3>
                    <span
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold shadow-lg btn-press transition-shadow duration-200 group-hover:shadow-xl"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.94)',
                        color: 'var(--shop-action)',
                      }}
                    >
                      Shop Now →
                    </span>
                  </div>
                </button>

                {/* ── Progress bar — bottom edge, animates per slide ── */}
                {isActive && banners.length > 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[3px] z-[3] pointer-events-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <div
                      key={selectedIndex}
                      className="h-full"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.82)',
                        animation: `progress-fill ${AUTOPLAY_DELAY}ms linear forwards`,
                      }}
                    />
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>

      {/* ── Dot indicators — overlaid bottom right ── */}
      {banners.length > 1 && (
        <div
          className="absolute bottom-4 right-5 z-[4] flex items-center gap-1.5"
          aria-label="Slide navigation"
        >
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className="rounded-full transition-all duration-300"
              style={{
                width: selectedIndex === index ? '24px' : '6px',
                height: '6px',
                backgroundColor:
                  selectedIndex === index
                    ? 'rgba(255,255,255,0.90)'
                    : 'rgba(255,255,255,0.35)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </m.section>
  )
}
