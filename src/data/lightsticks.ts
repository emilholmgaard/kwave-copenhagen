// Lightstick shop data

export interface LightstickVersion {
  id: string
  name: string
  price: number
}

export interface Lightstick {
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
  versions?: LightstickVersion[]
  features?: string[] // List of features
  shippingInfo?: {
    freeShippingThreshold?: number
    shippingTime?: string
    preOrderShippingNote?: string
  }
}

export const lightsticks: Lightstick[] = [
  {
    id: 'ls1',
    title: 'G-DRAGON OFFICIAL LIGHT STICK',
    artist: 'G-DRAGON',
    slug: 'g-dragon-official-light-stick',
    price: 399.95,
    currency: 'DKK',
    image: '/SHORT2.webp',
    imageShort: '/SHORT2.webp',
    imageLong: '/LONG2.webp',
    description:
      'Official G-DRAGON lightstick. The perfect companion for concerts and fan events. Show your support with this official merchandise.',
    inStock: true,
    category: 'k-pop',
    releaseDate: '2025-03-30',
    features: [
      'Official G-DRAGON merchandise',
      'Out box included',
      'Light stick',
      'Strap included',
      'Setup guide included',
      'Uses 3 AAA batteries',
      'Batteries not included'
    ],
  },
]

export function getLightsticks(category?: string): Lightstick[] {
  let filtered = lightsticks.filter((lightstick) => {
    if (category && lightstick.category !== category) return false
    return true
  })
  return filtered
}

export function getLightstick(slug: string): Lightstick | null {
  return lightsticks.find((lightstick) => lightstick.slug === slug) || null
}

export function getLightstickCategories(): string[] {
  return [...new Set(lightsticks.map((lightstick) => lightstick.category))]
}

