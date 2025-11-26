'use client'

import { albums } from '@/data/albums'
import type { Album } from '@/data/albums'
import { createContext, useContext, useEffect, useState } from 'react'

export interface CartItem {
  albumId: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (albumId: string) => void
  removeItem: (albumId: string) => void
  updateQuantity: (albumId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getCartAlbums: () => Array<{ album: Album; quantity: number }>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load cart from localStorage', e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (albumId: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.albumId === albumId)
      if (existing) {
        return prev.map((item) =>
          item.albumId === albumId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { albumId, quantity: 1 }]
    })
  }

  const removeItem = (albumId: string) => {
    setItems((prev) => prev.filter((item) => item.albumId !== albumId))
  }

  const updateQuantity = (albumId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(albumId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.albumId === albumId ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const albumData = albums.find((a) => a.id === item.albumId)
      if (!albumData) return total
      return total + albumData.price * item.quantity
    }, 0)
  }

  const getCartAlbums = () => {
    return items
      .map((item) => {
        // Find album by ID
        const albumData = albums.find((a) => a.id === item.albumId)
        if (!albumData) return null
        return { album: albumData, quantity: item.quantity }
      })
      .filter(
        (item): item is { album: Album; quantity: number } => item !== null,
      )
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getCartAlbums,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

