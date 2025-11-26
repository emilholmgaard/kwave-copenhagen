// Magazine shop data

export interface Magazine {
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

export const magazines: Magazine[] = [
  {
    id: 'mag1',
    title: 'G-DRAGON Official Magazine',
    artist: 'G-DRAGON',
    slug: 'g-dragon-official-magazine',
    price: 199.95,
    currency: 'DKK',
    image: '/SHORT2.webp',
    imageShort: '/SHORT2.webp',
    imageLong: '/LONG2.webp',
    description:
      'Official G-DRAGON magazine featuring exclusive interviews, behind-the-scenes photos, and special content.',
    inStock: true,
    category: 'k-pop',
    releaseDate: '2025-03-30',
    features: [
      'Exclusive interviews',
      'Behind-the-scenes photos',
      'Special content',
      'High-quality print',
      'Limited edition'
    ],
  },
]

export function getMagazines(category?: string): Magazine[] {
  let filtered = magazines.filter((magazine) => {
    if (category && magazine.category !== category) return false
    return true
  })
  return filtered
}

export function getMagazine(slug: string): Magazine | null {
  return magazines.find((magazine) => magazine.slug === slug) || null
}

export function getMagazineCategories(): string[] {
  return [...new Set(magazines.map((magazine) => magazine.category))]
}

