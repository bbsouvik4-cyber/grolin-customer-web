'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ClipboardList, Home, LayoutGrid, Search, User } from 'lucide-react'
import { m } from 'framer-motion'
import { cn } from '@/lib/utils'

const TABS = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/categories', icon: LayoutGrid, label: 'Categories' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/orders', icon: ClipboardList, label: 'Orders' },
  { href: '/profile', icon: User, label: 'Account' },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const prefetchRoute = (href: string) => {
    if (href === '/orders' || href === '/profile') {
      router.prefetch(href)
    }
  }

  return (
    <nav aria-label="Main navigation" className="fixed bottom-0 left-0 right-0 z-[300] border-t border-[color:var(--shop-border)] bg-[rgba(240,236,232,0.94)] pb-[env(safe-area-inset-bottom)] shadow-nav-up backdrop-blur-xl md:hidden">
      <div className="flex min-h-[64px] items-center px-1.5">
        {TABS.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
          const Icon = tab.icon

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2"
              onMouseEnter={() => prefetchRoute(tab.href)}
              onTouchStart={() => prefetchRoute(tab.href)}
            >
              {/* Spring-animated pill — shared layout between tabs */}
              {isActive && (
                <m.span
                  layoutId="bottom-nav-pill"
                  className="absolute left-1/2 top-[8px] h-[32px] w-[52px] -translate-x-1/2 rounded-full bg-[color:var(--shop-primary-soft)]"
                  aria-hidden="true"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.8 }}
                />
              )}
              {/* Top accent line */}
              {isActive && (
                <m.span
                  layoutId="bottom-nav-accent"
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 h-[3px] w-10 -translate-x-1/2 rounded-b-full bg-[linear-gradient(90deg,#6E49D8,#9B6DFF)]"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 600, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  'relative z-10 flex h-8 w-[52px] items-center justify-center transition-colors duration-200',
                  isActive ? 'text-[color:var(--shop-primary)]' : 'text-[color:var(--shop-ink-faint)]',
                )}
              >
                <Icon
                  className={cn('transition-all duration-200', isActive ? 'h-[22px] w-[22px]' : 'h-[20px] w-[20px]')}
                  strokeWidth={isActive ? 2.2 : 1.9}
                />
              </span>
              <span
                className={cn(
                  'relative z-10 text-[11px] leading-none tracking-[-0.01em] transition-all duration-200',
                  isActive ? 'font-bold text-[color:var(--shop-primary)]' : 'font-semibold text-[color:var(--shop-ink-faint)]',
                )}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
