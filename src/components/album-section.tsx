'use client'

import { AddToCartButton } from '@/components/add-to-cart-button'
import { Button } from '@/components/button'

interface AlbumItem {
  artist: string
  title: string
  description: string
  price?: string
  albumId?: string
  isPreOrder?: boolean
}

export function AlbumSection({ albums }: { albums: AlbumItem[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 lg:grid-cols-2 lg:grid-rows-3">
      {albums.map((album, index) => (
        <div key={index} className="text-left">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {album.isPreOrder && (
              <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400">
                Pre-Order
              </span>
            )}
            <h4 className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {album.artist}
            </h4>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-2 mb-3">
            {album.title}
          </h3>
          <p className="text-sm/6 text-gray-500 dark:text-gray-400 mb-4">
            {album.description}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {album.price && (
              <div className="text-base font-medium text-gray-900 dark:text-gray-300">
                {album.price}
              </div>
            )}
            {album.albumId && (
              <div className="flex gap-2 flex-shrink-0">
                <AddToCartButton
                  albumId={album.albumId}
                  quantity={1}
                  type="album"
                  className="px-3 py-1.5 text-sm"
                />
                <Button variant="outline" href={`/shop/${album.albumId}`} className="px-3 py-1.5 text-sm">
                  Se mere
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

