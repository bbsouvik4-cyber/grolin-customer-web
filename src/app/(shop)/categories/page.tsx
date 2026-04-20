'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { LayoutGrid } from 'lucide-react'
import { EmptyStateCard, PageHeader, PageShell } from '@/components/shared'
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants'
import { getCategoryImageSrc } from '@/lib/media'
import { categoriesService } from '@/services/categories.service'
import type { Category } from '@/types/product.types'

const CATEGORY_STYLES: Record<string, { gradient: string }> = {
    fruits: { gradient: 'from-orange-100 to-orange-200' },
    vegetables: { gradient: 'from-green-100 to-green-200' },
    dairy: { gradient: 'from-blue-100 to-blue-200' },
    snacks: { gradient: 'from-yellow-100 to-amber-100' },
    drinks: { gradient: 'from-sky-100 to-blue-100' },
    beverages: { gradient: 'from-sky-100 to-blue-100' },
    coffee: { gradient: 'from-amber-100 to-orange-200' },
    meat: { gradient: 'from-rose-100 to-pink-100' },
    bakery: { gradient: 'from-amber-50 to-amber-100' },
    frozen: { gradient: 'from-blue-50 to-blue-100' },
    personal: { gradient: 'from-violet-100 to-purple-100' },
    household: { gradient: 'from-teal-50 to-sky-100' },
    organic: { gradient: 'from-emerald-100 to-green-100' },
    spices: { gradient: 'from-orange-100 to-red-100' },
    rice: { gradient: 'from-yellow-50 to-amber-50' },
    oil: { gradient: 'from-yellow-100 to-amber-100' },
    fish: { gradient: 'from-blue-100 to-cyan-100' },
    baby: { gradient: 'from-pink-100 to-rose-100' },
    default: { gradient: 'from-gray-100 to-gray-200' },
}

function getStyle(name: string): { gradient: string } {
    const lower = name.toLowerCase()
    for (const [key, val] of Object.entries(CATEGORY_STYLES)) {
        if (lower.includes(key)) return val
    }
    return CATEGORY_STYLES.default!
}

function CategoryDirectoryImage({ category }: { category: Category }) {
    const [imageFailed, setImageFailed] = useState(false)
    const imageSrc = getCategoryImageSrc(category)

    useEffect(() => {
        setImageFailed(false)
    }, [imageSrc])

    if (!imageSrc || imageFailed) {
        return null
    }

    return (
        <div className="relative h-10 w-10">
            <Image
                src={imageSrc}
                alt={category.name}
                fill
                unoptimized
                onError={() => setImageFailed(true)}
                className="object-contain"
                sizes="40px"
            />
        </div>
    )
}

export default function CategoriesPage() {
    useEffect(() => {
        document.title = 'Categories - Grolin'
    }, [])

    const { data: allCategories = [], isLoading } = useQuery({
        queryKey: QUERY_KEYS.categories,
        queryFn: categoriesService.getAll,
        staleTime: STALE_TIMES.categories,
    })

    const categories = allCategories.filter((category: Category) => category.is_active && !category.parent_id)

    return (
        <PageShell spacing="relaxed">
            <PageHeader
                eyebrow="Browse"
                title="All Categories"
                subtitle={
                    isLoading
                        ? 'Loading curated aisles...'
                        : `${categories.length} curated categories available for faster discovery.`
                }
            />

            <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="eyebrow">Curated aisles</p>
                        <p className="mt-2 text-sm text-[color:var(--shop-ink-muted)]">
                            Explore fresh produce, pantry staples, and household essentials.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-4 py-2 text-sm font-semibold text-[color:var(--shop-ink)] shadow-[var(--shop-shadow-level-1)]">
                        <LayoutGrid className="h-4 w-4 text-[color:var(--shop-primary)]" />
                        {isLoading ? 'Loading' : `${categories.length} categories`}
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="skeleton-shimmer h-[132px] rounded-[24px]" />
                        ))}
                    </div>
                ) : categories.length === 0 ? (
                    <EmptyStateCard
                        icon={LayoutGrid}
                        title="No categories yet"
                        subtitle="The merchandising team has not published categories yet. Check back soon."
                        ctaLabel="Return Home"
                        ctaHref="/"
                    />
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {categories.map((category, index) => {
                            const style = getStyle(category.name)

                            return (
                                <Link
                                    key={category.id}
                                    href={`/categories/${category.id}`}
                                    className={`group relative h-[140px] overflow-hidden rounded-[22px] bg-gradient-to-br ${style.gradient} shadow-[var(--shop-shadow-level-1)] transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[var(--shop-shadow-level-2)] active:scale-[0.98]`}
                                    style={{ animationDelay: `${index * 40}ms` }}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(17,24,39,0.04)_100%)]" />
                                    <div className="relative flex h-full flex-col justify-between p-4">
                                        <div>
                                            <p className="text-[15px] font-bold leading-tight tracking-[-0.01em] text-[color:var(--shop-ink)] transition-colors group-hover:text-[color:var(--shop-primary)]">
                                                {category.name}
                                            </p>
                                            <p className="mt-1 text-[12px] font-medium text-[color:var(--shop-ink-muted)]">
                                                {category.product_count ?? 0} items
                                            </p>
                                        </div>

                                        <CategoryDirectoryImage category={category} />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </section>
        </PageShell>
    )
}
