import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers/Providers'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Grolin Grocery | Fresh Groceries Delivered',
    template: '%s | Grolin Grocery',
  },
  description:
    'Order fresh groceries online. Fast delivery to your doorstep. Fresh fruits, vegetables, dairy, snacks and more.',
  keywords: ['grocery', 'online grocery', 'fresh food', 'delivery', 'grolin'],
  openGraph: {
    title: 'Grolin Grocery',
    description: 'Fresh groceries delivered to your doorstep',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Grolin Grocery',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.className} min-h-screen antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
