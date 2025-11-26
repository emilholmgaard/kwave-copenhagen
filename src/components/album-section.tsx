'use client'

import { AddToCartButton } from '@/components/add-to-cart-button'
import { Button } from '@/components/button'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'

interface AlbumItem {
  artist: string
  title: string
  description: string
  price?: string
  albumId?: string
  isPreOrder?: boolean
}

const ITEMS_PER_PAGE = 2

export function AlbumSection({ albums }: { albums: AlbumItem[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(albums.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAlbums = albums.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8">
        {currentAlbums.map((album, index) => (
          <div
            key={index}
            className="group relative rounded-3xl bg-black/60 backdrop-blur-sm p-6 shadow-md ring-1 ring-white/10 transition-all hover:ring-white/20"
          >
            <div className="text-left">
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
                      View more
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => goToPage(currentPage - 1)}
            data-disabled={currentPage === 1 ? true : undefined}
            className="px-3 py-1.5"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'secondary' : 'outline'}
                onClick={() => goToPage(page)}
                className="px-3 py-1.5 text-sm min-w-[40px]"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => goToPage(currentPage + 1)}
            data-disabled={currentPage === totalPages ? true : undefined}
            className="px-3 py-1.5"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      )}
    </>
  )
}

