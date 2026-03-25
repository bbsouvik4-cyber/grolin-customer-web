'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ShoppingCart } from 'lucide-react'
import { HeroLayered } from '@/components/home/HeroLayered'
import { BestSellersShowcase, BestSellersShowcaseSkeleton } from '@/components/home/BestSellersShowcase'
import { CategoryRow } from '@/components/home/CategoryRow'
import { CategoryRowSkeleton } from '@/components/home/CategoryRowSkeleton'
import { CollectionRow } from '@/components/home/CollectionRow'
import { HomeCategoryGrid, HomeCategoryGridSkeleton } from '@/components/home/HomeCategoryGrid'
import { HomeFeatureGrid, HomeFeatureGridSkeleton } from '@/components/home/HomeFeatureGrid'
import { LocalTrustSection } from '@/components/home/LocalTrustSection'
import { PromoBand } from '@/components/home/PromoBand'
import { TodaysFreshPicks } from '@/components/home/TodaysFreshPicks'
import { HomePromiseBanner } from '@/components/home/HomePromiseBanner'
import { HomeSectionHeader } from '@/components/home/HomeSectionHeader'
import { HomeTrendingGrid } from '@/components/home/HomeTrendingGrid'
import { RecommendedSection } from '@/components/home/RecommendedSection'
import { YourUsualsSection } from '@/components/home/YourUsualsSection'
import { HeaderCategoryNav, HeaderCategoryNavSkeleton } from '@/components/layout/HeaderCategoryNav'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants'
import {
  getHomepageCategoryGrid,
  getHomepageCategoryNav,
  getTrendingProducts,
  type HomepageCategoryNavItem,
} from '@/lib/shopfront/shopfront-home.utils'
import {
  getDemoAllProducts,
  getDemoBanners,
  getDemoCategories,
  getDemoDealProducts,
  getDemoFeaturedProducts,
  getDemoNewArrivals,
} from '@/lib/shopfront/shopfront-demo-data'
import { bannersService } from '@/services/banners.service'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
import type { Category, Product } from '@/types/product.types'

type CollectionDefinition = {
  id: string
  title: string
  eyebrow: string
  emoji: string
  query: string
  gradient: string
  subtitle: string
  productKeywords: string[]
  categoryKeywords: string[]
  image?: string
}

const COLLECTION_DEFINITIONS: CollectionDefinition[] = [
  {
    id: 'quick-breakfast',
    title: 'Quick Breakfast',
    eyebrow: 'BREAKFAST',
    emoji: '\u{1F950}',
    query: 'breakfast',
    gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    subtitle: 'Fast-start pantry and dairy staples for rushed mornings and easy first orders.',
    productKeywords: ['bread', 'egg', 'milk', 'butter', 'jam', 'banana', 'cereal', 'breakfast', 'toast', 'oats'],
    categoryKeywords: ['dairy', 'bakery', 'fruits', 'breakfast'],
    image: '/images/collections/col-breakfast.webp',
  },
  {
    id: 'tonights-dinner',
    title: "Tonight's Dinner",
    eyebrow: 'DINNER',
    emoji: '\u{1F372}',
    query: 'dinner',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #16945E 100%)',
    subtitle: 'Dinner-building essentials that help a shopper move from idea to basket fast.',
    productKeywords: ['rice', 'pasta', 'sauce', 'paneer', 'masala', 'dal', 'oil', 'vegetable', 'dinner', 'cook'],
    categoryKeywords: ['pantry', 'vegetables', 'dairy', 'snacks'],
    image: '/images/collections/col-dinner.webp',
  },
  {
    id: 'healthy-week',
    title: 'Healthy Week',
    eyebrow: 'HEALTHY',
    emoji: '\u{1F96C}',
    query: 'healthy',
    gradient: 'linear-gradient(135deg, #065F46 0%, #16945E 100%)',
    subtitle: 'Light, clean, repeatable picks for fruit, greens, oats, yogurt, and balance-led baskets.',
    productKeywords: ['salad', 'fruit', 'oats', 'nuts', 'yogurt', 'healthy', 'granola', 'fresh', 'greens'],
    categoryKeywords: ['fruits', 'vegetables', 'dairy'],
    image: '/images/collections/col-healthy.webp',
  },
  {
    id: 'weekend-treats',
    title: 'Weekend Treats',
    eyebrow: 'TREATS',
    emoji: '\u{1F370}',
    query: 'treats',
    gradient: 'linear-gradient(135deg, #BE185D 0%, #7C3AED 100%)',
    subtitle: 'Snacks, sweets, drinks, and indulgent picks that make the weekend feel worth planning.',
    productKeywords: ['chips', 'ice cream', 'cookie', 'biscuit', 'chocolate', 'cola', 'juice', 'snack', 'treat'],
    categoryKeywords: ['snacks', 'beverages', 'dairy'],
    image: '/images/collections/col-treats.webp',
  },
  {
    id: 'home-essentials',
    title: 'Home Essentials',
    eyebrow: 'ESSENTIALS',
    emoji: '\u{1F9F4}',
    query: 'essentials',
    gradient: 'linear-gradient(135deg, #1E3A5F 0%, #1D6FB8 100%)',
    subtitle: 'Utility-led products for the home layer of grocery shopping, not just the kitchen layer.',
    productKeywords: ['detergent', 'soap', 'tissue', 'dishwash', 'cleaner', 'essential', 'wash', 'care'],
    categoryKeywords: ['care', 'home', 'personal'],
    image: '/images/collections/col-essentials.webp',
  },
  {
    id: 'family-favourites',
    title: 'Family Favourites',
    eyebrow: 'FAMILY',
    emoji: '\u{1F46A}',
    query: 'family',
    gradient: 'linear-gradient(135deg, #9A3412 0%, #EA580C 100%)',
    subtitle: 'Friendly staples for bigger households, repeat orders, and kid-safe crowd-pleasers.',
    productKeywords: ['family', 'kids', 'juice', 'snack', 'milk', 'cereal', 'biscuit', 'favourite'],
    categoryKeywords: ['baby', 'dairy', 'snacks', 'beverages'],
    image: '/images/collections/col-family.webp',
  },
]

function getSelectedCategoryScopeIds(categories: Category[], selectedCategoryId: string) {
  if (selectedCategoryId === 'all') {
    return null
  }

  const categoryScopeIds = new Set<string>([selectedCategoryId])
  let expanded = true

  while (expanded) {
    expanded = false

    for (const category of categories) {
      if (category.parent_id && categoryScopeIds.has(category.parent_id) && !categoryScopeIds.has(category.id)) {
        categoryScopeIds.add(category.id)
        expanded = true
      }
    }
  }

  return categoryScopeIds
}

function filterProductsForHome(products: Product[], categoryScopeIds: Set<string> | null) {
  if (!categoryScopeIds) {
    return products
  }

  return products.filter((product) => categoryScopeIds.has(product.category_id))
}

function dedupeProducts(products: Product[]) {
  const seen = new Set<string>()
  return products.filter((product) => {
    if (!product.id || seen.has(product.id)) return false
    seen.add(product.id)
    return true
  })
}

function buildProductSearchText(product: Product, categoriesById: Map<string, Category>) {
  return [
    product.name,
    product.description ?? '',
    product.category_name ?? '',
    categoriesById.get(product.category_id)?.name ?? '',
    ...(product.tags ?? []),
  ]
    .join(' ')
    .toLowerCase()
}

function countMatches(text: string, keywords: string[]) {
  return keywords.reduce((count, keyword) => (text.includes(keyword) ? count + 1 : count), 0)
}

function buildCollectionProducts(
  definition: CollectionDefinition,
  products: Product[],
  categoriesById: Map<string, Category>,
) {
  const scored = dedupeProducts(products)
    .map((product, index) => {
      const text = buildProductSearchText(product, categoriesById)
      const productHits = countMatches(text, definition.productKeywords)
      const categoryHits = countMatches(text, definition.categoryKeywords)
      const queryHit = text.includes(definition.query.toLowerCase()) ? 1 : 0
      const score =
        productHits * 6 +
        categoryHits * 4 +
        queryHit * 3 +
        (product.is_featured ? 1 : 0) +
        Math.min(3, Math.floor((product.total_sold || 0) / 50))

      return { product, score, index }
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        (b.product.total_sold || 0) - (a.product.total_sold || 0) ||
        a.index - b.index,
    )

  const selected = scored.filter((entry) => entry.score > 0).map((entry) => entry.product)

  if (selected.length >= 6) {
    return selected.slice(0, 6)
  }

  const leftovers = scored
    .map((entry) => entry.product)
    .filter((product) => !selected.some((chosen) => chosen.id === product.id))

  return [...selected, ...leftovers].slice(0, 6)
}

export default function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const demoBanners = useMemo(() => getDemoBanners(), [])
  const demoCategories = useMemo(() => getDemoCategories(), [])
  const demoFeaturedProducts = useMemo(() => getDemoFeaturedProducts(12), [])
  const demoNewArrivals = useMemo(() => getDemoNewArrivals(12), [])
  const demoDealProducts = useMemo(() => getDemoDealProducts(12), [])
  const demoCatalogProducts = useMemo(() => getDemoAllProducts({ limit: 60 }).products, [])

  const { data: banners = demoBanners } = useQuery({
    queryKey: QUERY_KEYS.banners,
    queryFn: bannersService.getActive,
    staleTime: STALE_TIMES.banners,
    retry: false,
    placeholderData: demoBanners,
  })

  const { data: allCategories = demoCategories, isLoading: loadingCategories } = useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: categoriesService.getAll,
    staleTime: STALE_TIMES.categories,
    retry: false,
    placeholderData: demoCategories,
  })

  const { data: featuredProducts = demoFeaturedProducts, isLoading: loadingFeatured } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productsService.getFeatured(12),
    staleTime: STALE_TIMES.products,
    retry: false,
    placeholderData: demoFeaturedProducts,
  })

  const { data: newArrivals = demoNewArrivals } = useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: () => productsService.getNewArrivals(12),
    staleTime: STALE_TIMES.products,
    retry: false,
    placeholderData: demoNewArrivals,
  })

  const { data: dealProducts = demoDealProducts } = useQuery({
    queryKey: ['products', 'deals'],
    queryFn: () => productsService.getDeals(12),
    staleTime: STALE_TIMES.products,
    retry: false,
    placeholderData: demoDealProducts,
  })

  const { data: catalogData, isLoading: loadingCatalog } = useQuery({
    queryKey: ['products', 'all-home'],
    queryFn: () => productsService.getAll({ limit: 60 }),
    staleTime: STALE_TIMES.products,
    retry: false,
    placeholderData: { products: demoCatalogProducts, pagination: { page: 1, limit: 60, total: demoCatalogProducts.length, totalPages: 1 } },
  })

  const resolvedBanners = useMemo(
    () => (banners.length > 0 ? banners : demoBanners),
    [banners, demoBanners],
  )
  const resolvedCategories = useMemo(
    () => (allCategories.length > 0 ? allCategories : demoCategories) as Category[],
    [allCategories, demoCategories],
  )
  const resolvedFeaturedProducts = useMemo(
    () => (featuredProducts.length > 0 ? featuredProducts : demoFeaturedProducts),
    [demoFeaturedProducts, featuredProducts],
  )
  const resolvedNewArrivals = useMemo(
    () => (newArrivals.length > 0 ? newArrivals : demoNewArrivals),
    [demoNewArrivals, newArrivals],
  )
  const resolvedDealProducts = useMemo(
    () => (dealProducts.length > 0 ? dealProducts : demoDealProducts),
    [dealProducts, demoDealProducts],
  )
  const resolvedCatalogProducts = useMemo(
    () => (catalogData?.products?.length ? catalogData.products : demoCatalogProducts),
    [catalogData?.products, demoCatalogProducts],
  )

  const discoveryCategories = useMemo(() => getHomepageCategoryNav(resolvedCategories, 8), [resolvedCategories])

  useEffect(() => {
    if (selectedCategoryId === 'all') {
      return
    }

    if (!discoveryCategories.some((category) => category.id === selectedCategoryId)) {
      setSelectedCategoryId('all')
    }
  }, [discoveryCategories, selectedCategoryId])

  const discoveryCategoryIds = useMemo(() => discoveryCategories.map((category) => category.id), [discoveryCategories])
  const categories = getHomepageCategoryGrid(resolvedCategories, 10, discoveryCategoryIds)
  const selectedCategoryScopeIds = useMemo(
    () => getSelectedCategoryScopeIds(resolvedCategories, selectedCategoryId),
    [resolvedCategories, selectedCategoryId],
  )
  const selectedCategoryLabel = useMemo(() => {
    if (selectedCategoryId === 'all') {
      return 'All Categories'
    }

    return (
      discoveryCategories.find((category) => category.id === selectedCategoryId)?.navLabel ??
      resolvedCategories.find((category) => category.id === selectedCategoryId)?.name ??
      'Selected Category'
    )
  }, [discoveryCategories, resolvedCategories, selectedCategoryId])

  const filteredFeaturedProducts = useMemo(
    () => filterProductsForHome(resolvedFeaturedProducts, selectedCategoryScopeIds),
    [resolvedFeaturedProducts, selectedCategoryScopeIds],
  )
  const filteredNewArrivals = useMemo(
    () => filterProductsForHome(resolvedNewArrivals, selectedCategoryScopeIds),
    [resolvedNewArrivals, selectedCategoryScopeIds],
  )
  const filteredDealProducts = useMemo(
    () => filterProductsForHome(resolvedDealProducts, selectedCategoryScopeIds),
    [resolvedDealProducts, selectedCategoryScopeIds],
  )

  const trendingProducts = getTrendingProducts({
    featured: resolvedFeaturedProducts,
    deals: resolvedDealProducts,
    newArrivals: resolvedNewArrivals,
    excludeIds: resolvedFeaturedProducts.slice(0, 6).map((product) => product.id),
  })

  const filteredTrendingProducts = useMemo(
    () => filterProductsForHome(trendingProducts, selectedCategoryScopeIds),
    [selectedCategoryScopeIds, trendingProducts],
  )

  const categoriesById = useMemo(
    () => new Map(resolvedCategories.map((category) => [category.id, category])),
    [resolvedCategories],
  )

  const collectionSourceProducts = useMemo(
    () =>
      dedupeProducts([
        ...resolvedFeaturedProducts,
        ...resolvedNewArrivals,
        ...resolvedDealProducts,
        ...resolvedCatalogProducts,
      ]),
    [resolvedCatalogProducts, resolvedDealProducts, resolvedFeaturedProducts, resolvedNewArrivals],
  )

  const curatedCollections = useMemo(
    () =>
      COLLECTION_DEFINITIONS.map((definition) => ({
        ...definition,
        viewAllHref: `/search?q=${encodeURIComponent(definition.query)}`,
        products: buildCollectionProducts(definition, collectionSourceProducts, categoriesById),
      })),
    [categoriesById, collectionSourceProducts],
  )

  const shouldShowCategorySkeleton = loadingCategories && discoveryCategories.length === 0
  const shouldShowFeaturedSkeleton = loadingFeatured && resolvedFeaturedProducts.length === 0

  return (
    <div className="pb-12">
      <PromoBand />
      <HeroLayered banners={resolvedBanners} />

      {/* YourUsuals — mesh green atmosphere */}
      <div className="relative overflow-hidden mesh-green grain-overlay py-8">
        <div className="relative max-w-screen-xl mx-auto">
          <YourUsualsSection />
        </div>
      </div>

      {/* Category Discovery — lifted white card on warm canvas */}
      <div className="relative overflow-hidden bg-[color:var(--shop-canvas)] pb-4">
        <div className="relative">
          {shouldShowCategorySkeleton ? (
            <HomepageCategoryDiscoverySkeleton />
          ) : discoveryCategories.length > 0 ? (
            <HomepageCategoryDiscovery
              categories={discoveryCategories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />
          ) : null}
        </div>
      </div>

      {/* Featured + Collections 1-2 — warm surface lift */}
      <div className="relative overflow-hidden py-6 bg-[color:var(--shop-surface-subtle)]">
        <div className="relative mx-auto max-w-[1680px]">
          {shouldShowFeaturedSkeleton ? (
            <HomeFeatureGridSkeleton />
          ) : filteredFeaturedProducts.length > 0 ? (
            <HomeFeatureGrid
              products={filteredFeaturedProducts.slice(0, 10)}
              title="Featured Deals"
              subtitle="High-conviction value picks designed to open the homepage with energy and intent."
            />
          ) : null}

          {curatedCollections[0] && curatedCollections[0].products.length > 0 && (
            <CollectionRow
              title={curatedCollections[0].title}
              eyebrow={curatedCollections[0].eyebrow}
              emoji={curatedCollections[0].emoji}
              subtitle={curatedCollections[0].subtitle}
              gradient={curatedCollections[0].gradient}
              products={curatedCollections[0].products}
              viewAllHref={curatedCollections[0].viewAllHref}
              image={curatedCollections[0].image}
            />
          )}

          <RecommendedSection />

          {curatedCollections[1] && curatedCollections[1].products.length > 0 && (
            <CollectionRow
              title={curatedCollections[1].title}
              eyebrow={curatedCollections[1].eyebrow}
              emoji={curatedCollections[1].emoji}
              subtitle={curatedCollections[1].subtitle}
              gradient={curatedCollections[1].gradient}
              products={curatedCollections[1].products}
              viewAllHref={curatedCollections[1].viewAllHref}
              image={curatedCollections[1].image}
            />
          )}
        </div>
      </div>

      {/* Promise + Collection 3 + Category Grid — warm canvas with mesh atmosphere */}
      <div className="relative overflow-hidden mesh-warm grain-overlay py-5">
        <div className="relative mx-auto max-w-[1680px]">
          <HomePromiseBanner />

          {curatedCollections[2] && curatedCollections[2].products.length > 0 && (
            <CollectionRow
              title={curatedCollections[2].title}
              eyebrow={curatedCollections[2].eyebrow}
              emoji={curatedCollections[2].emoji}
              subtitle={curatedCollections[2].subtitle}
              gradient={curatedCollections[2].gradient}
              products={curatedCollections[2].products}
              viewAllHref={curatedCollections[2].viewAllHref}
              image={curatedCollections[2].image}
            />
          )}

          {loadingCategories && categories.length === 0 ? <HomeCategoryGridSkeleton /> : categories.length > 0 ? <HomeCategoryGrid categories={categories} /> : null}
        </div>
      </div>

      <LocalTrustSection />

      {/* Collections 4-6 — white lift off dark anchor */}
      <div className="relative overflow-hidden bg-[color:var(--shop-surface-subtle)] py-6">
        <div className="relative mx-auto max-w-[1680px]">
          {curatedCollections[3] && curatedCollections[3].products.length > 0 && (
            <CollectionRow
              title={curatedCollections[3].title}
              eyebrow={curatedCollections[3].eyebrow}
              emoji={curatedCollections[3].emoji}
              subtitle={curatedCollections[3].subtitle}
              gradient={curatedCollections[3].gradient}
              products={curatedCollections[3].products}
              viewAllHref={curatedCollections[3].viewAllHref}
              image={curatedCollections[3].image}
            />
          )}

          {curatedCollections[4] && curatedCollections[4].products.length > 0 && (
            <CollectionRow
              title={curatedCollections[4].title}
              eyebrow={curatedCollections[4].eyebrow}
              emoji={curatedCollections[4].emoji}
              subtitle={curatedCollections[4].subtitle}
              gradient={curatedCollections[4].gradient}
              products={curatedCollections[4].products}
              viewAllHref={curatedCollections[4].viewAllHref}
              image={curatedCollections[4].image}
            />
          )}

          {curatedCollections[5] && curatedCollections[5].products.length > 0 && (
            <CollectionRow
              title={curatedCollections[5].title}
              eyebrow={curatedCollections[5].eyebrow}
              emoji={curatedCollections[5].emoji}
              subtitle={curatedCollections[5].subtitle}
              gradient={curatedCollections[5].gradient}
              products={curatedCollections[5].products}
              viewAllHref={curatedCollections[5].viewAllHref}
              image={curatedCollections[5].image}
            />
          )}
        </div>
      </div>

      {/* Best Sellers — elevated white surface with shadow separation */}
      <div className="relative overflow-hidden bg-[color:var(--shop-surface)] py-5 shadow-[var(--shop-shadow-level-4)]">
        <div className="relative mx-auto max-w-[1680px]">
          {shouldShowFeaturedSkeleton ? (
            <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
              <BestSellersShowcaseSkeleton />
            </section>
          ) : filteredFeaturedProducts.length > 0 ? (
            <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
              <BestSellersShowcase products={filteredFeaturedProducts} />
            </section>
          ) : null}
        </div>
      </div>

      <div className="relative overflow-hidden bg-[color:var(--shop-canvas)] py-4">
        <div className="relative mx-auto max-w-[1680px]">
          {filteredTrendingProducts.length > 0 && <HomeTrendingGrid products={filteredTrendingProducts} />}

          <TodaysFreshPicks products={filteredNewArrivals} isLoading={shouldShowFeaturedSkeleton} />

          {filteredDealProducts.length > 0 && (
            <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
              <HomeSectionHeader
                title="Weekly Picks"
                subtitle="Current-value products pulled from the live deals feed without crowding the main merchandising."
                viewAllHref="/products"
                eyebrow="DEALS"
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                {filteredDealProducts.slice(0, 6).map((product, index) => (
                  <ProductCard key={product.id} product={product} priority={index < 4} />
                ))}
              </div>
            </section>
          )}

          {(selectedCategoryId !== 'all' || (!loadingCatalog && resolvedCatalogProducts.length === 0)) && (
            <AllProductsSection
              products={resolvedCatalogProducts}
              isLoading={loadingCatalog}
              selectedCategoryId={selectedCategoryId}
              selectedCategoryLabel={selectedCategoryLabel}
              selectedCategoryScopeIds={selectedCategoryScopeIds}
              onResetSelection={() => setSelectedCategoryId('all')}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function HomepageCategoryDiscovery({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: {
  categories: HomepageCategoryNavItem[]
  selectedCategoryId: string
  onSelectCategory: (categoryId: string) => void
}) {
  return (
    <section className="px-2 pt-4 sm:px-4 lg:px-4 lg:pt-5">
      <div className="overflow-hidden rounded-[30px] border border-[color:var(--shop-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,244,255,0.86)_100%)] shadow-[var(--shop-shadow-level-2)]">
        <HeaderCategoryNav
          categories={categories}
          mode="select"
          activeCategoryId={selectedCategoryId}
          onCategorySelect={onSelectCategory}
        />

        <div className="px-0 pb-5 pt-4 sm:px-5 sm:pb-6 lg:px-7 lg:pb-7 lg:pt-5">
          <CategoryRow
            categories={categories}
            selectedCategoryId={selectedCategoryId === 'all' ? undefined : selectedCategoryId}
          />
        </div>
      </div>
    </section>
  )
}

function HomepageCategoryDiscoverySkeleton() {
  return (
    <section className="px-2 pt-4 sm:px-4 lg:px-4 lg:pt-5">
      <div className="overflow-hidden rounded-[30px] border border-[color:var(--shop-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,244,255,0.86)_100%)] shadow-[var(--shop-shadow-level-2)]">
        <HeaderCategoryNavSkeleton />
        <div className="px-0 pb-5 pt-4 sm:px-5 sm:pb-6 lg:px-7 lg:pb-7 lg:pt-5">
          <CategoryRowSkeleton />
        </div>
      </div>
    </section>
  )
}

function AllProductsSection({
  products,
  isLoading,
  selectedCategoryId = 'all',
  selectedCategoryLabel = 'All Categories',
  selectedCategoryScopeIds,
  onResetSelection,
}: {
  products: Product[]
  isLoading: boolean
  selectedCategoryId?: string
  selectedCategoryLabel?: string
  selectedCategoryScopeIds: Set<string> | null
  onResetSelection?: () => void
}) {
  const visibleProducts = useMemo(
    () => filterProductsForHome(products, selectedCategoryScopeIds),
    [products, selectedCategoryScopeIds],
  )

  if (isLoading && products.length === 0) {
    return (
      <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
        <Skeleton className="mb-4 h-6 w-32 rounded" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    )
  }

  if (selectedCategoryId !== 'all' && visibleProducts.length === 0) {
    return (
      <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-6 py-16 text-center shadow-[var(--shop-shadow-level-1)]">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
            <ShoppingCart className="h-10 w-10" />
          </div>
          <h2 className="mb-2 text-lg font-bold text-[color:var(--shop-ink)]">No products in {selectedCategoryLabel} yet</h2>
          <p className="max-w-[340px] text-sm text-[color:var(--shop-ink-muted)]">
            Try another category from the selector above and keep exploring without leaving the homepage.
          </p>
          <button
            type="button"
            onClick={onResetSelection}
            className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--shop-primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--shop-primary-hover)]"
          >
            Show All Products
          </button>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-6 py-20 shadow-[var(--shop-shadow-level-1)]">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
            <ShoppingCart className="h-10 w-10" />
          </div>
          <h2 className="mb-1 text-lg font-bold text-[color:var(--shop-ink)]">No products yet</h2>
          <p className="max-w-[300px] text-center text-sm text-[color:var(--shop-ink-muted)]">
            Check back soon for fresh groceries.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
      <HomeSectionHeader
        title={selectedCategoryId === 'all' ? 'All Products' : `More in ${selectedCategoryLabel}`}
        subtitle={
          selectedCategoryId === 'all'
            ? 'Fallback live catalog rendering when primary featured merchandising is unavailable.'
            : `Products filtered to ${selectedCategoryLabel.toLowerCase()} without leaving the homepage.`
        }
        eyebrow={selectedCategoryId === 'all' ? 'CATALOG' : 'SELECTED'}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {visibleProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}



