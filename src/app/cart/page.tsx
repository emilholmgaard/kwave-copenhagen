'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { useCart } from '@/contexts/cart-context'
import {
  ChevronLeftIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'

export default function CartPage() {
  const {
    getCartAlbums,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart()

  // Moms-sats i Danmark er 25%
  const VAT_RATE = 0.25

  const cartAlbums = getCartAlbums()
  const totalWithVAT = getTotalPrice()
  const totalWithoutVAT = totalWithVAT / (1 + VAT_RATE)
  const totalVAT = totalWithVAT - totalWithoutVAT
  const totalItems = getTotalItems()

  if (cartAlbums.length === 0) {
    return (
      <main className="overflow-hidden">
        <GradientBackground />
        <Container>
          <Navbar />
          <div className="mt-16 pb-24 text-center">
            <ShoppingBagIcon className="mx-auto size-16 text-gray-400" />
            <Heading as="h1" className="mt-6 text-white">
              Your cart is empty
            </Heading>
            <p className="mt-4 text-gray-400">
              Start shopping to add items to your cart.
            </p>
            <div className="mt-8">
              <Button href="/shop">Browse Albums</Button>
            </div>
          </div>
        </Container>
        <Footer />
      </main>
    )
  }

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">Shopping Cart</Subheading>
        <Heading as="h1" className="mt-2">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Review your items and proceed to checkout when you&apos;re ready.
        </Lead>
      </Container>
      <Container className="mt-16 pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartAlbums.map(({ album, quantity }) => (
                <div
                  key={album.id}
                  className="group relative flex flex-row gap-2 rounded-3xl bg-black/60 backdrop-blur-sm p-2 shadow-md ring-1 ring-white/10 transition-all hover:ring-white/20"
                >
                  <Link href={`/shop/${album.slug}`} className="shrink-0">
                    <img
                      alt={album.title}
                      src={album.image}
                      className="size-32 rounded-2xl object-cover sm:size-40"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link
                          href={`/shop/${album.slug}`}
                          className="text-lg font-semibold text-white data-hover:text-gray-300"
                        >
                          {album.title}
                        </Link>
                        <p className="mt-1 text-sm text-gray-300">
                          {album.artist}
                        </p>
                        <div className="mt-2 flex flex-col gap-1">
                          <div className="text-base font-semibold text-white">
                            Enhedspris: {album.price.toFixed(2).replace('.', ',')} {album.currency}
                          </div>
                          <div className="text-xs text-gray-400">
                            inkl. moms ({((album.price * VAT_RATE) / (1 + VAT_RATE)).toFixed(2).replace('.', ',')} {album.currency})
                          </div>
                          <div className="text-xs text-gray-500">
                            ekskl. moms: {(album.price / (1 + VAT_RATE)).toFixed(2).replace('.', ',')} {album.currency}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(album.id)}
                        className="shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <TrashIcon className="size-5" />
                      </button>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-300">
                        Quantity:
                      </span>
                      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5">
                        <button
                          onClick={() => updateQuantity(album.id, quantity - 1)}
                          className="rounded-l-full p-2 text-gray-300 transition-colors hover:bg-white/10"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="size-4" />
                        </button>
                        <span className="min-w-[3rem] px-4 text-center font-medium text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(album.id, quantity + 1)}
                          className="rounded-r-full p-2 text-gray-300 transition-colors hover:bg-white/10"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="size-4" />
                        </button>
                      </div>
                      <div className="ml-auto flex flex-col items-end gap-1">
                        <div className="text-lg font-semibold text-white">
                          Samlet: {(album.price * quantity).toFixed(2).replace('.', ',')} {album.currency}
                        </div>
                        <div className="text-xs text-gray-400">
                          ekskl. moms: {((album.price * quantity) / (1 + VAT_RATE)).toFixed(2).replace('.', ',')} {album.currency}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button
                variant="outline"
                onClick={clearCart}
                className="gap-2 text-red-400 hover:text-red-300"
              >
                <TrashIcon className="size-4" />
                Clear Cart
              </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl bg-black/60 backdrop-blur-sm p-6 shadow-md ring-1 ring-white/10">
              <h2 className="text-lg font-semibold text-white">
                Order Summary
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-white">{totalWithoutVAT.toFixed(2).replace('.', ',')} DKK</span>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Moms (25%)</span>
                  <span className="font-medium text-white">{totalVAT.toFixed(2).replace('.', ',')} DKK</span>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Shipping</span>
                  <span className="font-medium text-white">Free</span>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between text-lg font-semibold text-white">
                  <span>Total (inkl. moms)</span>
                  <span>{totalWithVAT.toFixed(2).replace('.', ',')} DKK</span>
                </div>
              </div>
              <div className="mt-8 space-y-3">
                <Button href="/checkout" className="w-full gap-2">
                  <ShoppingBagIcon className="size-4" />
                  Proceed to Checkout
                </Button>
                <Button variant="outline" href="/shop" className="w-full gap-2">
                  <ChevronLeftIcon className="size-4" />
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  )
}

