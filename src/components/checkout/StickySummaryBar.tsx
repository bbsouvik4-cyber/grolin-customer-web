'use client'

import { useState, type ReactNode } from 'react'
import { ChevronUp } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { formatINR } from '@/lib/utils'
import { PrimaryCheckoutButton } from './PrimaryCheckoutButton'

interface StickySummaryBarProps {
    total: number
    itemCount: number
    ctaLabel: string
    onCtaClick: () => void
    disabled?: boolean
    loading?: boolean
    securityNote?: string
    children: ReactNode
}

export function StickySummaryBar({
    total,
    itemCount,
    ctaLabel,
    onCtaClick,
    disabled = false,
    loading = false,
    securityNote,
    children,
}: StickySummaryBarProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="fixed inset-x-0 bottom-0 z-[220] border-t border-[color:var(--shop-border)] bg-white px-4 py-3 shadow-[0_-12px_24px_rgba(15,23,42,0.08)] lg:hidden">
                <div className="mx-auto max-w-2xl">
                    <div className="flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="flex min-w-0 flex-1 items-center justify-between rounded-[14px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] px-3.5 py-3 text-left"
                        >
                            <p className="truncate text-sm font-semibold text-[color:var(--shop-ink)]">
                                {`${formatINR(total)} \u00B7 ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
                            </p>
                            <ChevronUp className="ml-3 h-4 w-4 shrink-0 text-[color:var(--shop-ink-muted)]" />
                        </button>

                        <div className="w-[172px] shrink-0 sm:w-[220px]">
                            <PrimaryCheckoutButton
                                label={ctaLabel}
                                loading={loading}
                                disabled={disabled}
                                onClick={onCtaClick}
                                className="h-11 rounded-[14px] bg-[color:var(--shop-action)] px-4 text-[13px] shadow-none hover:bg-[color:var(--shop-action-hover)]"
                            />
                        </div>
                    </div>

                    {securityNote && (
                        <p className="mt-2 text-center text-[11px] font-medium text-[color:var(--shop-trust)]">
                            {securityNote}
                        </p>
                    )}
                </div>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    side="bottom"
                    className="rounded-t-[28px] border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] px-4 pb-6 pt-5"
                >
                    <SheetHeader className="mb-4">
                        <SheetTitle className="text-left text-[color:var(--shop-ink)]">Order summary</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4">{children}</div>
                </SheetContent>
            </Sheet>
        </>
    )
}