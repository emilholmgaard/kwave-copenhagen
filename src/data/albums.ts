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

export const albums: Album[] = [
  {
    id: '9',
    title: 'ALLDAY PROJECT (MERCH ver.)',
    artist: 'ALLDAY PROJECT',
    slug: 'allday-project-merch',
    price: 319.95,
    currency: 'DKK',
    image: '/short.webp',
    imageShort: '/short.webp',
    imageLong: '/long.webp',
    description:
      '[PRE-ORDER] ALLDAY PROJECT - ALLDAY PROJECT (MERCH ver.) - Limited edition merchandise bundle featuring exclusive collectibles, premium packaging, and special edition items. Perfect for collectors and fans.',
    inStock: true,
    category: 'k-pop',
    releaseDate: '2025-12-08',
    versions: [
      { id: 'suede', name: 'SUEDE DRAWSTRING ver.', price: 319.95 },
      { id: 'gloves', name: 'FINGERLESS GLOVES ver.', price: 319.95 },
    ],
    tracklist: [
      'All Day',
      'Project One',
      'Merch Theme',
      'Special Edition',
      'Bonus Track',
    ],
  },
]

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

