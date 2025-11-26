'use client'

import { Button } from './button'
import { useCart } from '@/contexts/cart-context'
import { useState } from 'react'

export function AddToCartButton({
  albumId,
  quantity = 1,
  versionId: _versionId,
  disabled = false,
}: {
  albumId: string
  quantity?: number
  versionId?: string
  disabled?: boolean
}) {
  const { addItem, updateQuantity } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (disabled) return
    // Add item with specified quantity
    for (let i = 0; i < quantity; i++) {
      addItem(albumId)
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
    >
      {added ? 'Added!' : 'Add to Cart'}
    </Button>
  )
}

