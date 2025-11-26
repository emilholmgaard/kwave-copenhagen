'use client'

import { Button } from './button'
import { useWishlist } from '@/contexts/wishlist-context'
import { HeartIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

export function AddToWishlistButton({
  albumId,
  disabled = false,
}: {
  albumId: string
  disabled?: boolean
}) {
  const { isInWishlist, toggleItem } = useWishlist()
  const [added, setAdded] = useState(false)
  const inWishlist = isInWishlist(albumId)

  const handleClick = () => {
    if (disabled) return
    toggleItem(albumId)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      data-disabled={disabled ? true : undefined}
      className="gap-2"
    >
      <HeartIcon className={`size-4 ${inWishlist ? 'fill-red-500' : ''}`} />
      {added
        ? inWishlist
          ? 'Tilføjet!'
          : 'Fjernet!'
        : 'ADD TO ØNSKESKYEN'}
    </Button>
  )
}

