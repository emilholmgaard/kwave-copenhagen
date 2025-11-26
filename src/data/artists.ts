// Artist data

export interface Artist {
  id: string
  name: string
  slug: string
  image: string
  category: 'k-pop' | 'pop' | 'hip-hop' | 'r&b'
  fanName?: string
}

export const artists: Artist[] = [
  {
    id: 'artist1',
    name: 'G-DRAGON',
    slug: 'g-dragon',
    image: '/SHORT2.webp',
    category: 'k-pop',
    fanName: 'VIP',
  },
  {
    id: 'artist2',
    name: 'BLACKPINK',
    slug: 'blackpink',
    image: '/SHORT2.webp',
    category: 'k-pop',
    fanName: 'BLINK',
  },
  {
    id: 'artist3',
    name: 'BTS',
    slug: 'bts',
    image: '/SHORT2.webp',
    category: 'k-pop',
    fanName: 'ARMY',
  },
  {
    id: 'artist4',
    name: 'TWICE',
    slug: 'twice',
    image: '/SHORT2.webp',
    category: 'k-pop',
    fanName: 'ONCE',
  },
  {
    id: 'artist5',
    name: 'Red Velvet',
    slug: 'red-velvet',
    image: '/SHORT2.webp',
    category: 'k-pop',
    fanName: 'REVELUV',
  },
  {
    id: 'artist6',
    name: 'NewJeans',
    slug: 'newjeans',
    image: '/SHORT2.webp',
    category: 'k-pop',
    fanName: 'BUNNIES',
  },
]

export function getPopularArtists(limit?: number): Artist[] {
  const kpopArtists = artists.filter((artist) => artist.category === 'k-pop')
  if (limit) {
    return kpopArtists.slice(0, limit)
  }
  return kpopArtists
}

export function getArtist(slug: string): Artist | null {
  return artists.find((artist) => artist.slug === slug) || null
}

