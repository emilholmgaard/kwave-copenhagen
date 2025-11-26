'use client'

import { Link } from '@/components/link'
import type { Artist } from '@/data/artists'

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link
      href={`/shop?type=all&category=${artist.category}`}
      className="group relative flex flex-col items-center rounded-3xl bg-black/60 backdrop-blur-sm p-4 shadow-md ring-1 ring-white/10 transition-all hover:ring-white/20 cursor-pointer"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl mb-4">
        <img
          alt={artist.name}
          src={artist.image}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <div className="text-center">
        <h3 className="text-base font-semibold text-white">
          {artist.name}
        </h3>
      </div>
    </Link>
  )
}

