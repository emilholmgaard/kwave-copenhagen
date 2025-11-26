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
  featured?: boolean
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
    id: '1',
    title: 'The Album',
    artist: 'BLACKPINK',
    slug: 'blackpink-the-album',
    price: 299,
    currency: 'DKK',
    image: '/company/1.jpg',
    description:
      'BLACKPINKs debut studio album featuring hit singles like "How You Like That" and "Ice Cream".',
    featured: true,
    inStock: true,
    category: 'k-pop',
    releaseDate: '2020-10-02',
    versions: [
      { id: 'standard', name: 'Standard Edition', price: 299 },
      { id: 'deluxe', name: 'Deluxe Edition', price: 349 },
      { id: 'vinyl', name: 'Vinyl Edition', price: 399 },
    ],
    tracklist: [
      'How You Like That',
      'Ice Cream (with Selena Gomez)',
      "Pretty Savage",
      "Bet You Wanna (feat. Cardi B)",
      "Lovesick Girls",
      "Crazy Over You",
      "Love To Hate Me",
      "You Never Know"
    ],
  },
  {
    id: '2',
    title: 'BORN PINK',
    artist: 'BLACKPINK',
    slug: 'blackpink-born-pink',
    price: 329,
    currency: 'DKK',
    image: '/company/2.jpg',
    description:
      'BLACKPINKs second studio album with the global hit "Pink Venom" and "Shut Down".',
    featured: true,
    inStock: true,
    category: 'k-pop',
    releaseDate: '2022-09-16',
    versions: [
      { id: 'standard', name: 'Standard Edition', price: 329 },
      { id: 'deluxe', name: 'Deluxe Edition', price: 379 },
    ],
    tracklist: [
      'Pink Venom',
      'Shut Down',
      'Typa Girl',
      'Yeah Yeah Yeah',
      'Hard to Love',
      'The Happiest Girl',
      'Tally',
      'Ready For Love'
    ],
  },
  {
    id: '3',
    title: 'BE',
    artist: 'BTS',
    slug: 'bts-be',
    price: 349,
    currency: 'DKK',
    image: '/company/3.jpg',
    description:
      'BTS album BE featuring the chart-topping single "Dynamite" and "Life Goes On".',
    featured: true,
    inStock: true,
    category: 'k-pop',
    releaseDate: '2020-11-20',
    versions: [
      { id: 'standard', name: 'Standard Edition', price: 349 },
      { id: 'deluxe', name: 'Deluxe Edition', price: 399 },
      { id: 'vinyl', name: 'Vinyl Edition', price: 449 },
    ],
    tracklist: [
      'Life Goes On',
      'Fly To My Room',
      'Blue & Grey',
      'Skit',
      'Telepathy',
      'Dis-ease',
      'Stay',
      'Dynamite'
    ],
  },
  {
    id: '4',
    title: 'Proof',
    artist: 'BTS',
    slug: 'bts-proof',
    price: 399,
    currency: 'DKK',
    image: '/company/4.jpg',
    description:
      'BTS anthology album featuring their greatest hits and three new tracks.',
    featured: false,
    inStock: true,
    category: 'k-pop',
    releaseDate: '2022-06-10',
    tracklist: [
      'Born Singer',
      'No More Dream',
      'N.O',
      'Boy In Luv',
      'Danger',
      'I Need U',
      'Run',
      'Fire',
      'Save Me',
      'Blood Sweat & Tears',
      'Spring Day',
      'DNA',
      'Fake Love',
      'Idol',
      'Boy With Luv',
      'ON',
      'Dynamite',
      'Butter',
      'Yet To Come',
      'Run BTS',
      'For Youth',
    ],
  },
  {
    id: '5',
    title: 'NewJeans 1st EP',
    artist: 'NewJeans',
    slug: 'newjeans-1st-ep',
    price: 279,
    currency: 'DKK',
    image: '/company/5.jpg',
    description:
      'NewJeans debut EP with viral hits "Attention", "Hype Boy", and "Cookie".',
    featured: false,
    inStock: true,
    category: 'k-pop',
    releaseDate: '2022-08-01',
    tracklist: [
      'Attention',
      'Hype Boy',
      'Cookie',
      'Hurt'
    ],
  },
  {
    id: '6',
    title: 'Get Up',
    artist: 'NewJeans',
    slug: 'newjeans-get-up',
    price: 289,
    currency: 'DKK',
    image: '/screenshots/app.png',
    description:
      'NewJeans second EP featuring "Super Shy", "ETA", and "Cool With You".',
    featured: false,
    inStock: true,
    category: 'k-pop',
    releaseDate: '2023-07-21',
    tracklist: [
      'New Jeans',
      'Super Shy',
      'ETA',
      'Cool With You',
      'Get Up',
      'ASAP'
    ],
  },
  {
    id: '7',
    title: 'I NEVER DIE',
    artist: '(G)I-DLE',
    slug: 'gidle-i-never-die',
    price: 299,
    currency: 'DKK',
    image: '/screenshots/competitors.png',
    description:
      '(G)I-DLEs first full album featuring the powerful title track "Tomboy".',
    featured: false,
    inStock: true,
    category: 'k-pop',
    releaseDate: '2022-03-14',
    tracklist: [
      'Tomboy',
      'Never Stop Me',
      'Villain Dies',
      'Already',
      'Escape',
      'Liar',
      'Polaroid',
      'My Bag',
      'I Never Die',
    ],
  },
  {
    id: '8',
    title: 'I feel',
    artist: '(G)I-DLE',
    slug: 'gidle-i-feel',
    price: 309,
    currency: 'DKK',
    image: '/screenshots/engagement.png',
    description:
      '(G)I-DLEs sixth mini album with the empowering anthem "Queencard".',
    featured: false,
    inStock: true,
    category: 'k-pop',
    releaseDate: '2023-05-15',
    tracklist: [
      'Queencard',
      'Allergy',
      'Lucid',
      'All Night',
      'Paradise',
      'Peter Pan',
      'I Do',
    ],
  },
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
    featured: false,
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

export function getAlbums(category?: string, featured?: boolean): Album[] {
  let filtered = albums.filter((album) => {
    if (featured !== undefined && album.featured !== featured) return false
    if (category && album.category !== category) return false
    return true
  })
  return filtered
}

export function getAlbum(slug: string): Album | null {
  return albums.find((album) => album.slug === slug) || null
}

export function getFeaturedAlbums(limit: number = 3): Album[] {
  return albums.filter((album) => album.featured).slice(0, limit)
}

export function getCategories(): string[] {
  return [...new Set(albums.map((album) => album.category))]
}

