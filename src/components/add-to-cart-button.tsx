'use client'

import { Button } from './button'
import { useCart } from '@/contexts/cart-context'
import { useState } from 'react'
import { clsx } from 'clsx'

export function AddToCartButton({
  albumId,
  quantity = 1,
  disabled = false,
  type = 'album',
  className,
}: {
  albumId: string
  quantity?: number
  versionId?: string
  disabled?: boolean
  type?: 'album' | 'lightstick' | 'magazine' | 'photobook' | 'greeting' | 'dvd'
  className?: string
}) {
  const { addItem, updateQuantity } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (disabled) return
    // Add item with specified quantity
    for (let i = 0; i < quantity; i++) {
      addItem(albumId, type)
    }
    // If quantity > 1, update to correct quantity
    if (quantity > 1) {
      updateQuantity(albumId, quantity)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      data-disabled={disabled ? true : undefined}
      className={clsx(className, 'data-hover:bg-white data-hover:text-blue-400 data-hover:ring-blue-400 data-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]')}
    >
      {added ? 'Added!' : 'Add to Cart'}
    </Button>
  )
}

