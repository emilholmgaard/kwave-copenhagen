'use client'

import { AddToCartButton } from '@/components/add-to-cart-button'
import { Button } from '@/components/button'
import { Link } from '@/components/link'
import type { Greeting } from '@/data/greetings'
import { ShoppingBagIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'

export function GreetingCard({ greeting }: { greeting: Greeting }) {
  return (
    <Link
      href={`/shop/greetings/${greeting.slug}`}
      className="group relative flex flex-row items-stretch gap-2 rounded-3xl bg-black/60 backdrop-blur-sm p-2 shadow-md ring-1 ring-white/10 transition-all hover:ring-white/20 cursor-pointer"
    >
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {greeting.isPreOrder && (
            <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400">
              Pre-Order
            </span>
          )}
          {greeting.inStock && !greeting.lowStock && !greeting.isPreOrder && (
            <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
              In Stock
            </span>
          )}
          {greeting.lowStock && !greeting.isPreOrder && (
            <span className="rounded-full bg-orange-500/20 px-2 py-1 text-xs font-medium text-orange-400">
              Low Stock
            </span>
          )}
          {!greeting.inStock && !greeting.isPreOrder && (
            <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-medium text-red-400">
              Out of Stock
            </span>
          )}
        </div>
        <div className="text-sm/5 font-medium text-gray-300">
          {greeting.artist}
        </div>
        <div className="mt-2 text-base/7 font-semibold text-white">
          {greeting.title}
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Release: {dayjs(greeting.releaseDate).format('MMM D, YYYY')}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white capitalize">
            {greeting.category}
          </span>
        </div>
        <div className="mt-3 flex-1 text-sm/6 text-gray-400 line-clamp-3">
          {greeting.description}
        </div>
        <div className="mt-4" onClick={(e) => e.stopPropagation()}>
          <Button href={`/shop/greetings/${greeting.slug}`} variant="outline">
            View Details
          </Button>
        </div>
        <div className="mt-6 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
          <div className="text-base font-medium text-gray-300">
            {greeting.price} {greeting.currency}
          </div>
          {greeting.inStock || greeting.isPreOrder ? (
            <div className="flex gap-2">
              <AddToCartButton 
                albumId={greeting.id} 
                quantity={1}
                disabled={!greeting.inStock && !greeting.isPreOrder}
                type="greeting"
              />
              <Button variant="outline" href={`/shop/greetings/${greeting.slug}`}>
                Buy Now
              </Button>
            </div>
          ) : (
            <Button href={`/shop/greetings/${greeting.slug}`} variant="outline" className="gap-2">
              <ShoppingBagIcon className="size-4" />
              View
            </Button>
          )}
        </div>
      </div>
      <div className="relative w-2/5 flex-shrink-0 overflow-hidden rounded-2xl">
        <img
          alt={greeting.title}
          src={greeting.image}
          className="h-full w-full object-cover transition-transform group-data-hover:scale-110"
        />
        {!greeting.inStock && (
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

