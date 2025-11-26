import { CartProvider } from '@/contexts/cart-context'
import { WishlistProvider } from '@/contexts/wishlist-context'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - K-pop Album Shop',
    default: 'K-pop Album Shop - Your Collection Starts Here',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Radiant Blog"
          href="/blog/feed.xml"
        />
      </head>
      <body className="bg-black text-white antialiased">
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
