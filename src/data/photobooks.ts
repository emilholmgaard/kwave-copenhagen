// Photobook shop data

export interface Photobook {
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

export const photobooks: Photobook[] = [
  {
    id: 'pb1',
    title: 'G-DRAGON Official Photobook',
    artist: 'G-DRAGON',
    slug: 'g-dragon-official-photobook',
    price: 249.95,
    currency: 'DKK',
    image: '/SHORT2.webp',
    imageShort: '/SHORT2.webp',
    imageLong: '/LONG2.webp',
    description:
      'Official G-DRAGON photobook with stunning photography, exclusive shots, and premium quality pages.',
    inStock: true,
    category: 'k-pop',
    releaseDate: '2025-03-30',
    features: [
      'Premium quality pages',
      'Exclusive photography',
      'Stunning visuals',
      'High-quality print',
      'Collector\'s item'
    ],
  },
]

export function getPhotobooks(category?: string): Photobook[] {
  let filtered = photobooks.filter((photobook) => {
    if (category && photobook.category !== category) return false
    return true
  })
  return filtered
}

export function getPhotobook(slug: string): Photobook | null {
  return photobooks.find((photobook) => photobook.slug === slug) || null
}

export function getPhotobookCategories(): string[] {
  return [...new Set(photobooks.map((photobook) => photobook.category))]
}

