'use client'

import { albums } from '@/data/albums'
import { lightsticks } from '@/data/lightsticks'
import { magazines } from '@/data/magazines'
import { photobooks } from '@/data/photobooks'
import { greetings } from '@/data/greetings'
import { dvds } from '@/data/dvds'
import type { Album } from '@/data/albums'
import type { Lightstick } from '@/data/lightsticks'
import type { Magazine } from '@/data/magazines'
import type { Photobook } from '@/data/photobooks'
import type { Greeting } from '@/data/greetings'
import type { DVD } from '@/data/dvds'
import { createContext, useContext, useEffect, useState } from 'react'

export type ItemType = 'album' | 'lightstick' | 'magazine' | 'photobook' | 'greeting' | 'dvd'
export type CartItemType = Album | Lightstick | Magazine | Photobook | Greeting | DVD

export interface CartItem {
  itemId: string
  quantity: number
  type: ItemType
}

interface CartContextType {
  items: CartItem[]
  addItem: (itemId: string, type?: ItemType) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getCartItems: () => Array<{ item: CartItemType; quantity: number; type: ItemType }>
  getCartAlbums: () => Array<{ album: Album; quantity: number }>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart')
      if (saved) {
        try {
          setItems(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to load cart from localStorage', e)
        }
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, isMounted])

  const addItem = (itemId: string, type: ItemType = 'album') => {
    setItems((prev) => {
      const existing = prev.find((item) => item.itemId === itemId && item.type === type)
      if (existing) {
        return prev.map((item) =>
          item.itemId === itemId && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { itemId, quantity: 1, type }]
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.itemId !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.itemId === itemId ? { ...item, quantity } : item,
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
      let itemData: CartItemType | undefined
      if (item.type === 'album') {
        itemData = albums.find((a) => a.id === item.itemId)
      } else if (item.type === 'lightstick') {
        itemData = lightsticks.find((l) => l.id === item.itemId)
      } else if (item.type === 'magazine') {
        itemData = magazines.find((m) => m.id === item.itemId)
      } else if (item.type === 'photobook') {
        itemData = photobooks.find((p) => p.id === item.itemId)
      } else if (item.type === 'greeting') {
        itemData = greetings.find((g) => g.id === item.itemId)
      } else if (item.type === 'dvd') {
        itemData = dvds.find((d) => d.id === item.itemId)
      }
      if (!itemData) return total
      return total + itemData.price * item.quantity
    }, 0)
  }

  const getCartItems = () => {
    return items
      .map((item) => {
        let itemData: CartItemType | undefined
        if (item.type === 'album') {
          itemData = albums.find((a) => a.id === item.itemId)
        } else if (item.type === 'lightstick') {
          itemData = lightsticks.find((l) => l.id === item.itemId)
        } else if (item.type === 'magazine') {
          itemData = magazines.find((m) => m.id === item.itemId)
        } else if (item.type === 'photobook') {
          itemData = photobooks.find((p) => p.id === item.itemId)
        } else if (item.type === 'greeting') {
          itemData = greetings.find((g) => g.id === item.itemId)
        } else if (item.type === 'dvd') {
          itemData = dvds.find((d) => d.id === item.itemId)
        }
        if (!itemData) return null
        return { item: itemData, quantity: item.quantity, type: item.type }
      })
      .filter(
        (item): item is { item: CartItemType; quantity: number; type: ItemType } => item !== null,
      )
  }

  const getCartAlbums = () => {
    return items
      .filter((item) => item.type === 'album')
      .map((item) => {
        const albumData = albums.find((a) => a.id === item.itemId)
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
        getCartItems,
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

