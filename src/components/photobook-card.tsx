'use client'

import { AddToCartButton } from '@/components/add-to-cart-button'
import { Button } from '@/components/button'
import { Link } from '@/components/link'
import type { Photobook } from '@/data/photobooks'
import { ShoppingBagIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'

export function PhotobookCard({ photobook }: { photobook: Photobook }) {
  return (
    <Link
      href={`/shop/photobooks/${photobook.slug}`}
      className="group relative flex flex-row items-stretch gap-2 rounded-3xl bg-black/60 backdrop-blur-sm p-2 shadow-md ring-1 ring-white/10 transition-all hover:ring-white/20 cursor-pointer"
    >
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {photobook.isPreOrder && (
            <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400">
              Pre-Order
            </span>
          )}
          {photobook.inStock && !photobook.lowStock && !photobook.isPreOrder && (
            <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
              In Stock
            </span>
          )}
          {photobook.lowStock && !photobook.isPreOrder && (
            <span className="rounded-full bg-orange-500/20 px-2 py-1 text-xs font-medium text-orange-400">
              Low Stock
            </span>
          )}
          {!photobook.inStock && !photobook.isPreOrder && (
            <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-medium text-red-400">
              Out of Stock
            </span>
          )}
        </div>
        <div className="text-sm/5 font-medium text-gray-300">
          {photobook.artist}
        </div>
        <div className="mt-2 text-base/7 font-semibold text-white">
          {photobook.title}
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Release: {dayjs(photobook.releaseDate).format('MMM D, YYYY')}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white capitalize">
            {photobook.category}
          </span>
        </div>
        <div className="mt-3 flex-1 text-sm/6 text-gray-400 line-clamp-3">
          {photobook.description}
        </div>
        <div className="mt-4" onClick={(e) => e.stopPropagation()}>
          <Button href={`/shop/photobooks/${photobook.slug}`} variant="outline">
            View Details
          </Button>
        </div>
        <div className="mt-6 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
          <div className="text-base font-medium text-gray-300">
            {photobook.price} {photobook.currency}
          </div>
          {photobook.inStock || photobook.isPreOrder ? (
            <div className="flex gap-2">
              <AddToCartButton 
                albumId={photobook.id} 
                quantity={1}
                disabled={!photobook.inStock && !photobook.isPreOrder}
                type="photobook"
              />
              <Button variant="outline" href={`/shop/photobooks/${photobook.slug}`}>
                Buy Now
              </Button>
            </div>
          ) : (
            <Button href={`/shop/photobooks/${photobook.slug}`} variant="outline" className="gap-2">
              <ShoppingBagIcon className="size-4" />
              View
            </Button>
          )}
        </div>
      </div>
      <div className="relative w-2/5 flex-shrink-0 overflow-hidden rounded-2xl">
        <img
          alt={photobook.title}
          src={photobook.image}
          className="h-full w-full object-cover transition-transform group-data-hover:scale-110"
        />
        {!photobook.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900">
              Out of Stock
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

