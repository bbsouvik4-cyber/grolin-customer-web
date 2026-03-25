import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Leaf, ShieldCheck } from 'lucide-react'
import { SHOPFRONT_PROMISE_BANNER } from '@/lib/shopfront/shopfront-content'

const ICONS = [ShieldCheck, Leaf, BadgeCheck]
const DESCRIPTIONS = [
  'Premium standards for sourcing and handling are built into every delivery window.',
  'Freshness signals stay clear from discovery through doorstep handoff.',
  'Pricing and support stay transparent when a basket decision matters.',
]

export function HomePromiseBanner() {
  return (
    <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
      <div
        className="overflow-hidden rounded-[28px] shadow-[var(--shop-shadow-level-3)]"
        style={{ backgroundImage: 'var(--shop-gradient-promo)' }}
      >
        <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:px-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--shop-primary)]">
              {SHOPFRONT_PROMISE_BANNER.eyebrow}
            </p>
            <h3 className="mt-3 max-w-[620px] text-[28px] font-bold leading-[1.05] tracking-[-0.03em] text-[color:var(--shop-ink)] sm:text-[34px]">
              {SHOPFRONT_PROMISE_BANNER.title}
            </h3>
            <p className="mt-3 max-w-[620px] text-[14px] leading-6 text-[color:var(--shop-ink-muted)] sm:text-[15px]">
              {SHOPFRONT_PROMISE_BANNER.subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {SHOPFRONT_PROMISE_BANNER.points.map((point, index) => {
                const Icon = ICONS[index % ICONS.length] ?? ShieldCheck
                return (
                  <span
                    key={point}
                    className="inline-flex items-center gap-2 rounded-full bg-[color:var(--shop-surface-elevated)] px-4 py-2 text-[13px] font-semibold text-[color:var(--shop-ink)] shadow-[var(--shop-shadow-level-2)]"
                  >
                    <Icon className="h-4 w-4 text-[color:var(--shop-primary)]" />
                    {point}
                  </span>
                )
              })}
            </div>

            <Link
              href={SHOPFRONT_PROMISE_BANNER.ctaHref}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--shop-primary)] transition-colors hover:text-[color:var(--shop-primary-hover)]"
            >
              {SHOPFRONT_PROMISE_BANNER.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="relative hidden md:block overflow-hidden rounded-[20px] shadow-[var(--shop-shadow-level-2)]">
              <Image
                src="/images/promo/promo-lifestyle.png"
                alt="Grolin lifestyle"
                width={480}
                height={280}
                className="w-full object-cover rounded-[20px]"
              />
              {/* Warm atmospheric overlay on promo image zone */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(240,236,232,0.18) 0%, transparent 50%, rgba(110,73,216,0.10) 100%)',
                }}
              />
            </div>

            {SHOPFRONT_PROMISE_BANNER.points.map((point, index) => {
              const Icon = ICONS[index % ICONS.length] ?? ShieldCheck
              return (
                <div
                  key={point}
                  className="rounded-[16px] bg-[color:var(--shop-surface-elevated)] p-4 shadow-[var(--shop-shadow-level-2)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-[15px] font-semibold text-[color:var(--shop-ink)]">{point}</p>
                  <p className="mt-1 text-[13px] leading-5 text-[color:var(--shop-ink-muted)]">
                    {DESCRIPTIONS[index]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}