'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { HeaderValueBar } from '@/components/layout/HeaderValueBar'

export function ShopHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <>
      {isHomePage && <HeaderValueBar />}
      <div className="sticky top-0 z-[190]">
        <Header />
      </div>
    </>
  )
}