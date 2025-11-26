'use client'

import { AddToCartButton } from '@/components/add-to-cart-button'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
import type { Album } from '@/data/albums'
import { useImageColors } from '@/hooks/use-image-colors'
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon, MinusIcon, PlusIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import { useState } from 'react'

export function AlbumPageClient({ album }: { album: Album }) {
  const [selectedVersion, setSelectedVersion] = useState<string>(
    album.versions && album.versions.length > 0 ? album.versions[0].id : ''
  )
  const [quantity, setQuantity] = useState(1)
  const [isWhatsIncludedOpen, setIsWhatsIncludedOpen] = useState(false)

  const currentPrice = album.versions && selectedVersion
    ? album.versions.find(v => v.id === selectedVersion)?.price || album.price
    : album.price

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  // Determine which images to show
  const displayImage = album.imageShort || album.imageLong || album.image
  const hasMultipleImages = album.imageShort && album.imageLong
  
  // Extract colors from the first image
  const imageForColorExtraction = album.imageShort || album.image || album.imageLong
  const colors = useImageColors(imageForColorExtraction)

  return (
    <main>
      <GradientBackground colors={colors} />
      <Container>
        <Navbar />
        <div className="mt-16 grid grid-cols-1 gap-12 pb-24 lg:grid-cols-2 lg:items-start relative" style={{ zIndex: 1 }}>
          <div className="flex flex-col gap-4">
            {hasMultipleImages ? (
              <>
                <div className="flex items-center">
                  <img
                    alt={album.title}
                    src={album.imageShort}
                    className="w-full rounded-3xl shadow-2xl ring-1 ring-black/5"
                  />
                </div>
                <div className="flex items-center">
                  <img
                    alt={album.title}
                    src={album.imageLong}
                    className="w-full rounded-3xl shadow-2xl ring-1 ring-black/5"
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center">
                <img
                  alt={album.title}
                  src={displayImage}
                  className="w-full rounded-3xl shadow-2xl ring-1 ring-black/5"
                />
              </div>
            )}
          </div>
          <div className={`flex flex-col relative z-10 ${hasMultipleImages ? 'lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overflow-x-visible lg:pb-8 lg:px-2' : 'justify-center'}`}>
            <Subheading>{album.artist}</Subheading>
            <Heading as="h1" className="mt-2">
              {album.title}
            </Heading>
            <div className="mt-6 flex items-center gap-4">
              <div className="text-4xl font-semibold text-white">
                {currentPrice.toFixed(2).replace('.', ',')} {album.currency}
              </div>
              {album.isPreOrder && (
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400 transition-all duration-200 hover:bg-blue-500/30 hover:scale-105 cursor-default">
                  Pre-Order
                </span>
              )}
              {album.inStock && !album.lowStock && !album.isPreOrder && (
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400 transition-all duration-200 hover:bg-green-500/30 hover:scale-105 cursor-default">
                  In Stock
                </span>
              )}
              {album.lowStock && !album.isPreOrder && (
                <span className="rounded-full bg-orange-500/20 px-3 py-1 text-sm font-medium text-orange-400 transition-all duration-200 hover:bg-orange-500/30 hover:scale-105 cursor-default">
                  Low Stock
                </span>
              )}
              {!album.inStock && !album.isPreOrder && (
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/30 hover:scale-105 cursor-default">
                  Out of Stock
                </span>
              )}
            </div>
            <p className="mt-6 text-base/7 text-gray-300">{album.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div>
                <span className="text-sm font-medium text-white">
                  Release Date:
                </span>{' '}
                <span className="text-sm text-gray-400">
                  {dayjs(album.releaseDate).format('MMMM D, YYYY')}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-white">
                  Category:
                </span>{' '}
                <span className="text-sm text-gray-400 capitalize">
                  {album.category}
                </span>
              </div>
            </div>
            <div className="mt-8 px-1">
              <button
                onClick={() => setIsWhatsIncludedOpen(!isWhatsIncludedOpen)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent shadow-sm ring-1 ring-white/20 px-2 py-[calc(--spacing(1.5)-1px)] text-sm font-medium whitespace-nowrap text-white transition-all duration-200 hover:bg-white/10"
              >
                <span>What's Included</span>
                {isWhatsIncludedOpen ? (
                  <ChevronUpIcon className="size-4" />
                ) : (
                  <ChevronDownIcon className="size-4" />
                )}
              </button>
              {isWhatsIncludedOpen && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {(album.albumContent && album.albumContent.length > 0 ? album.albumContent : [
                    'CD Album',
                    'Photo Book',
                    'Photo Cards (Random)',
                    'Poster',
                    'Sticker Sheet',
                  ]).map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center justify-center rounded-full border border-transparent shadow-sm ring-1 ring-white/20 px-2 py-[calc(--spacing(1.5)-1px)] text-sm font-medium whitespace-nowrap text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {album.tracklist && album.tracklist.length > 0 && (
              <div className="mt-8 px-1">
                <h3 className="text-lg font-semibold text-white">
                  Tracklist
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {album.tracklist.map((track, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-gray-300 transition-all duration-200 hover:bg-white/10 hover:border-white/30 hover:scale-105 cursor-default"
                      style={{ transformOrigin: 'center' }}
                    >
                      <span className="flex size-5 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white">
                        {index + 1}
                      </span>
                      {track}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8 px-1">
              <label className="block text-sm font-medium text-white mb-3">
                Choose version
              </label>
              {album.versions && album.versions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {album.versions.map((version) => (
                    <button
                      key={version.id}
                      onClick={() => setSelectedVersion(version.id)}
                      data-selected={selectedVersion === version.id ? true : undefined}
                      className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 data-selected:bg-white data-selected:text-gray-950 transition-all duration-200 hover:bg-white/10 hover:border-white/30 hover:scale-105"
                      style={{ transformOrigin: 'center' }}
                    >
                      {version.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300">
                  Standard Edition
                </div>
              )}
            </div>
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
                  Total: <span className="font-semibold text-white">{(currentPrice * quantity).toFixed(2).replace('.', ',')} {album.currency}</span>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {album.inStock || album.isPreOrder ? (
                <>
                  <AddToCartButton 
                    albumId={album.id} 
                    quantity={quantity}
                    versionId={selectedVersion || undefined}
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
      <Footer />
    </main>
  )
}

