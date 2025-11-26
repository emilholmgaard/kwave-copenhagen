'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export interface WishlistItem {
  albumId: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (albumId: string) => void
  removeItem: (albumId: string) => void
  isInWishlist: (albumId: string) => boolean
  toggleItem: (albumId: string) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Load wishlist from localStorage on mount (client-side only)
  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wishlist')
      if (saved) {
        try {
          setItems(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to load wishlist from localStorage', e)
        }
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(items))
    }
  }, [items, isMounted])

  const addItem = (albumId: string) => {
    setItems((prev) => {
      if (prev.find((item) => item.albumId === albumId)) {
        return prev
      }
      return [...prev, { albumId }]
    })
  }

  const removeItem = (albumId: string) => {
    setItems((prev) => prev.filter((item) => item.albumId !== albumId))
  }

  const isInWishlist = (albumId: string) => {
    return items.some((item) => item.albumId === albumId)
  }

  const toggleItem = (albumId: string) => {
    if (isInWishlist(albumId)) {
      removeItem(albumId)
    } else {
      addItem(albumId)
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

