// DVD shop data

export interface DVD {
  id: string
  title: string
  artist: string
  slug: string
  price: number
  currency: string
  image: string
  imageShort?: string
  imageLong?: string
  description: string
  inStock: boolean
  lowStock?: boolean
  isPreOrder?: boolean
  expectedInStock?: string
  category: 'k-pop' | 'pop' | 'hip-hop' | 'r&b'
  releaseDate: string
  features?: string[]
  shippingInfo?: {
    freeShippingThreshold?: number
    shippingTime?: string
    preOrderShippingNote?: string
  }
}

export const dvds: DVD[] = [
  {
    id: 'dvd1',
    title: 'G-DRAGON Official DVD',
    artist: 'G-DRAGON',
    slug: 'g-dragon-official-dvd',
    price: 299.95,
    currency: 'DKK',
    image: '/SHORT2.webp',
    imageShort: '/SHORT2.webp',
    imageLong: '/LONG2.webp',
    description:
      'Official G-DRAGON DVD with concert footage, behind-the-scenes content, and exclusive videos.',
    inStock: true,
    category: 'k-pop',
    releaseDate: '2025-03-30',
    features: [
      'Concert footage',
      'Behind-the-scenes content',
      'Exclusive videos',
      'High-quality video',
      'Official release'
    ],
  },
]

export function getDVDs(category?: string): DVD[] {
  let filtered = dvds.filter((dvd) => {
    if (category && dvd.category !== category) return false
    return true
  })
  return filtered
}

export function getDVD(slug: string): DVD | null {
  return dvds.find((dvd) => dvd.slug === slug) || null
}

export function getDVDCategories(): string[] {
  return [...new Set(dvds.map((dvd) => dvd.category))]
}

