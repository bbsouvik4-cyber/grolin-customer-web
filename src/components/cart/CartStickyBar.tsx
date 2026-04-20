'use client'

import { ArrowRight } from 'lucide-react'
import { formatINR } from '@/lib/utils'

interface CartStickyBarProps {
    itemCount: number
    total: number
    savings?: number
    onCheckout: () => void
    disabled?: boolean
    loading?: boolean
}

export function CartStickyBar({
    itemCount,
    total,
    onCheckout,
    disabled = false,
    loading = false,
}: CartStickyBarProps) {
    return (
        <div className="fixed inset-x-0 bottom-0 z-[220] border-t border-[color:var(--shop-border)] bg-white px-4 py-3 shadow-[0_-12px_24px_rgba(15,23,42,0.08)] lg:hidden">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
                <div aria-live="polite" className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[color:var(--shop-ink)]">
                        {formatINR(total)} {'\u00B7'} {itemCount} item{itemCount !== 1 ? 's' : ''}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCheckout}
                    disabled={disabled || loading}
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-[color:var(--shop-action)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Checkout'}
                    {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
            </div>
        </div>
    )
}
