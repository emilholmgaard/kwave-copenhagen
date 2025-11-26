// Greetings shop data

export interface Greeting {
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

export const greetings: Greeting[] = [
  {
    id: 'greet1',
    title: 'G-DRAGON Official Greetings',
    artist: 'G-DRAGON',
    slug: 'g-dragon-official-greetings',
    price: 149.95,
    currency: 'DKK',
    image: '/SHORT2.webp',
    imageShort: '/SHORT2.webp',
    imageLong: '/LONG2.webp',
    description:
      'Official G-DRAGON greetings set with special messages, photos, and exclusive content.',
    inStock: true,
    category: 'k-pop',
    releaseDate: '2025-03-30',
    features: [
      'Special messages',
      'Exclusive photos',
      'Premium quality',
      'Collectible items',
      'Official merchandise'
    ],
  },
]

export function getGreetings(category?: string): Greeting[] {
  let filtered = greetings.filter((greeting) => {
    if (category && greeting.category !== category) return false
    return true
  })
  return filtered
}

export function getGreeting(slug: string): Greeting | null {
  return greetings.find((greeting) => greeting.slug === slug) || null
}

export function getGreetingCategories(): string[] {
  return [...new Set(greetings.map((greeting) => greeting.category))]
}

