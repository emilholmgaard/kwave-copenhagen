'use client'

import { AddToCartButton } from '@/components/add-to-cart-button'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
import { FAQ } from '@/components/faq'
import type { DVD } from '@/data/dvds'
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import { useState } from 'react'

export function DVDPageClient({ dvd }: { dvd: DVD }) {
  const [quantity, setQuantity] = useState(1)
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const displayImage = dvd.imageShort || dvd.imageLong || dvd.image
  const hasMultipleImages = dvd.imageShort && dvd.imageLong

  return (
    <main>
      <Container>
        <Navbar />
        <div className="mt-16 grid grid-cols-1 gap-12 pb-24 lg:grid-cols-2 lg:items-start relative" style={{ zIndex: 1 }}>
          <div className="flex flex-col gap-4">
            {hasMultipleImages ? (
              <>
                <div className="flex items-center cursor-pointer" onClick={() => setFullscreenImage(dvd.imageShort!)}>
                  <img
                    alt={dvd.title}
                    src={dvd.imageShort}
                    className="w-full rounded-3xl shadow-2xl ring-1 ring-black/5 transition-transform hover:scale-[1.02]"
                  />
                </div>
                <div className="flex items-center cursor-pointer" onClick={() => setFullscreenImage(dvd.imageLong!)}>
                  <img
                    alt={dvd.title}
                    src={dvd.imageLong}
                    className="w-full rounded-3xl shadow-2xl ring-1 ring-black/5 transition-transform hover:scale-[1.02]"
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center cursor-pointer" onClick={() => setFullscreenImage(displayImage)}>
                <img
                  alt={dvd.title}
                  src={displayImage}
                  className="w-full rounded-3xl shadow-2xl ring-1 ring-black/5 transition-transform hover:scale-[1.02]"
                />
              </div>
            )}
          </div>
          <div className={`flex flex-col relative z-10 ${hasMultipleImages ? 'lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overflow-x-visible lg:pb-8 lg:px-2' : 'justify-center'}`}>
            <Subheading>{dvd.artist}</Subheading>
            <Heading as="h1" className="mt-2">
              {dvd.title}
            </Heading>
            <div className="mt-6 flex items-center gap-4">
              <div className="text-4xl font-semibold text-white">
                {dvd.price.toFixed(2).replace('.', ',')} {dvd.currency}
              </div>
              {dvd.isPreOrder && (
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400 transition-all duration-200 hover:bg-blue-500/30 hover:scale-105 cursor-default">
                  Pre-Order
                </span>
              )}
              {dvd.inStock && !dvd.lowStock && !dvd.isPreOrder && (
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400 transition-all duration-200 hover:bg-green-500/30 hover:scale-105 cursor-default">
                  In Stock
                </span>
              )}
              {dvd.lowStock && !dvd.isPreOrder && (
                <span className="rounded-full bg-orange-500/20 px-3 py-1 text-sm font-medium text-orange-400 transition-all duration-200 hover:bg-orange-500/30 hover:scale-105 cursor-default">
                  Low Stock
                </span>
              )}
              {!dvd.inStock && !dvd.isPreOrder && (
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/30 hover:scale-105 cursor-default">
                  Out of Stock
                </span>
              )}
            </div>
            <p className="mt-6 text-base/7 text-gray-300">{dvd.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div>
                <span className="text-sm font-medium text-white">
                  Release Date:
                </span>{' '}
                <span className="text-sm text-gray-400">
                  {dayjs(dvd.releaseDate).format('MMMM D, YYYY')}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-white">
                  Category:
                </span>{' '}
                <span className="text-sm text-gray-400 capitalize">
                  {dvd.category}
                </span>
              </div>
            </div>
            {dvd.features && dvd.features.length > 0 && (
              <div className="mt-8 px-1">
                <button
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent shadow-sm ring-1 ring-white/20 px-2 py-[calc(--spacing(1.5)-1px)] text-sm font-medium whitespace-nowrap text-white transition-all duration-200 hover:bg-white/10"
                >
                  <span>Features</span>
                  {isFeaturesOpen ? (
                    <ChevronUpIcon className="size-4" />
                  ) : (
                    <ChevronDownIcon className="size-4" />
                  )}
                </button>
                {isFeaturesOpen && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dvd.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center justify-center rounded-full border border-transparent shadow-sm ring-1 ring-white/20 px-2 py-[calc(--spacing(1.5)-1px)] text-sm font-medium whitespace-nowrap text-white"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="mt-8">
              <label className="block text-sm font-medium text-white mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="rounded-l-full p-2 text-gray-300 transition-all duration-200 hover:bg-white/10 hover:scale-110"
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon className="size-4" />
                  </button>
                  <span className="min-w-[3rem] px-4 text-center font-medium text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="rounded-r-full p-2 text-gray-300 transition-all duration-200 hover:bg-white/10 hover:scale-110"
                    aria-label="Increase quantity"
                  >
                    <PlusIcon className="size-4" />
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  Total: <span className="font-semibold text-white">{(dvd.price * quantity).toFixed(2).replace('.', ',')} {dvd.currency}</span>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {dvd.inStock || dvd.isPreOrder ? (
                <>
                  <AddToCartButton 
                    albumId={dvd.id} 
                    quantity={quantity}
                    type="dvd"
                  />
                  <Button variant="outline" href="/checkout">
                    Buy Now
                  </Button>
                </>
              ) : (
                <Button href="#" data-disabled>
                  Notify When Available
                </Button>
              )}
            </div>
            <div className="mt-8 mb-4 relative" style={{ zIndex: 50, isolation: 'isolate', paddingLeft: '0.5rem' }}>
              <Button variant="outline" href="/shop" className="gap-2 relative" style={{ zIndex: 50, position: 'relative' }}>
                <ChevronLeftIcon className="size-4" />
                Back to Shop
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <FAQ />
      <Footer />
      
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 z-[10000] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <XMarkIcon className="size-6" />
          </button>
          <img
            src={fullscreenImage}
            alt={dvd.title}
            className="max-h-full max-w-full rounded-3xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}

