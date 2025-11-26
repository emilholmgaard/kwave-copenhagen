// Album shop data

export interface AlbumVersion {
  id: string
  name: string
  price: number
}

export interface Album {
  id: string
  title: string
  artist: string
  slug: string
  price: number
  currency: string
  image: string
  imageShort?: string // First image (short)
  imageLong?: string // K-pop image showing all items (long)
  description: string
  inStock: boolean
  lowStock?: boolean
  isPreOrder?: boolean
  expectedInStock?: string // e.g., "5-10 DAYS AFTER RELEASE DATE"
  category: 'k-pop' | 'pop' | 'hip-hop' | 'r&b'
  releaseDate: string
  tracklist?: string[]
  versions?: AlbumVersion[]
  albumContent?: string[] // List of items included in the album
  shippingInfo?: {
    freeShippingThreshold?: number
    shippingTime?: string
    preOrderShippingNote?: string
  }
}

export const albums: Album[] = []

export function getAlbums(category?: string): Album[] {
  let filtered = albums.filter((album) => {
    if (category && album.category !== category) return false
    return true
  })
  return filtered
}

export function getAlbum(slug: string): Album | null {
  return albums.find((album) => album.slug === slug) || null
}

export function getCategories(): string[] {
  return [...new Set(albums.map((album) => album.category))]
}

