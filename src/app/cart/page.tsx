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
  // Gratis fragt over 800 kr
  const FREE_SHIPPING_THRESHOLD = 800
  const SHIPPING_COST = 49 // Standard fragtpris

  const cartAlbums = getCartAlbums()
  const totalWithVAT = getTotalPrice()
  const totalWithoutVAT = totalWithVAT / (1 + VAT_RATE)
  const totalVAT = totalWithVAT - totalWithoutVAT
  const totalItems = getTotalItems()
  
  // Beregn fragt
  const qualifiesForFreeShipping = totalWithVAT >= FREE_SHIPPING_THRESHOLD
  const shippingCost = qualifiesForFreeShipping ? 0 : SHIPPING_COST
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalWithVAT)
  const finalTotal = totalWithVAT + shippingCost

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
                  className="group relative flex flex-row items-stretch gap-2 rounded-3xl bg-black/60 backdrop-blur-sm p-2 shadow-md ring-1 ring-white/10 transition-all hover:ring-white/20"
                >
                  <Link href={`/shop/${album.slug}`} className="relative w-1/5 flex-shrink-0 overflow-hidden rounded-2xl">
                    <img
                      alt={album.title}
                      src={album.image}
                      className="h-full w-full object-cover transition-transform group-data-hover:scale-110"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link
                              href={`/shop/${album.slug}`}
                              className="text-lg font-semibold text-white data-hover:text-gray-300"
                            >
                              {album.title}
                            </Link>
                            {album.isPreOrder && (
                              <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400">
                                Pre-Order
                              </span>
                            )}
                            {album.inStock && !album.lowStock && !album.isPreOrder && (
                              <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
                                In Stock
                              </span>
                            )}
                            {album.lowStock && !album.isPreOrder && (
                              <span className="rounded-full bg-orange-500/20 px-2 py-1 text-xs font-medium text-orange-400">
                                Low Stock
                              </span>
                            )}
                            {!album.inStock && !album.isPreOrder && (
                              <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-medium text-red-400">
                                Out of Stock
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-300">
                            {album.artist}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(album.id)}
                          className="shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-red-400"
                          aria-label="Remove item"
                        >
                          <TrashIcon className="size-5" />
                        </button>
                      </div>
                      <div className="mt-4 flex flex-col gap-1">
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
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
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
                      </div>
                      <div className="flex flex-col items-end gap-1">
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
                  <span className="font-medium text-white">
                    {qualifiesForFreeShipping ? 'Free' : `${shippingCost.toFixed(0)} DKK`}
                  </span>
                </div>
                {!qualifiesForFreeShipping && amountNeededForFreeShipping > 0 && (
                  <div className="rounded-lg bg-blue-500/20 border border-blue-500/50 p-3 text-sm">
                    <p className="text-blue-300">
                      Add {amountNeededForFreeShipping.toFixed(2).replace('.', ',')} DKK more for <strong>free shipping</strong>!
                    </p>
                  </div>
                )}
                {qualifiesForFreeShipping && (
                  <div className="rounded-lg bg-green-500/20 border border-green-500/50 p-3 text-sm">
                    <p className="text-green-300">
                      You qualify for <strong>free shipping</strong>!
                    </p>
                  </div>
                )}
                <hr className="border-white/10" />
                <div className="flex justify-between text-lg font-semibold text-white">
                  <span>Total (inkl. moms)</span>
                  <span>{finalTotal.toFixed(2).replace('.', ',')} DKK</span>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="secondary" href="/checkout" className="w-[180px] !text-base">
                  Proceed to Checkout
                </Button>
                <Button variant="outline" href="/shop" className="w-[180px] !text-base">
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

