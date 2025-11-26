'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
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

  const cartAlbums = getCartAlbums()
  const total = getTotalPrice()
  const totalItems = getTotalItems()

  if (cartAlbums.length === 0) {
    return (
      <main className="overflow-hidden">
        <GradientBackground />
        <Container>
          <Navbar />
          <div className="mt-16 pb-24 text-center">
            <ShoppingBagIcon className="mx-auto size-16 text-gray-400" />
            <Heading as="h1" className="mt-6">
              Your cart is empty
            </Heading>
            <p className="mt-4 text-gray-600">
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
      </Container>
      <Container className="mt-16 pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartAlbums.map(({ album, quantity }) => (
                <div
                  key={album.id}
                  className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-md ring-1 ring-black/5 sm:flex-row"
                >
                  <Link href={`/shop/${album.slug}`} className="shrink-0">
                    <img
                      alt={album.title}
                      src={album.image}
                      className="size-32 rounded-2xl object-cover sm:size-40"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link
                          href={`/shop/${album.slug}`}
                          className="text-lg font-semibold text-gray-950 data-hover:text-gray-700"
                        >
                          {album.title}
                        </Link>
                        <p className="mt-1 text-sm text-gray-600">
                          {album.artist}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-gray-950">
                          {album.price} {album.currency}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(album.id)}
                        className="shrink-0 rounded-lg p-2 text-gray-400 data-hover:bg-gray-100 data-hover:text-gray-600"
                        aria-label="Remove item"
                      >
                        <TrashIcon className="size-5" />
                      </button>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-700">
                        Quantity:
                      </span>
                      <div className="flex items-center gap-2 rounded-lg border border-gray-200">
                        <button
                          onClick={() => updateQuantity(album.id, quantity - 1)}
                          className="rounded-l-lg p-2 text-gray-600 data-hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="size-4" />
                        </button>
                        <span className="min-w-[3rem] px-4 text-center font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(album.id, quantity + 1)}
                          className="rounded-r-lg p-2 text-gray-600 data-hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="size-4" />
                        </button>
                      </div>
                      <div className="ml-auto text-lg font-semibold text-gray-950">
                        {album.price * quantity} {album.currency}
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
                className="gap-2 text-red-600 data-hover:text-red-700"
              >
                <TrashIcon className="size-4" />
                Clear Cart
              </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-md ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-gray-950">
                Order Summary
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium">{total} DKK</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold text-gray-950">
                  <span>Total</span>
                  <span>{total} DKK</span>
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

