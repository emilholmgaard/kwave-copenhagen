import { AlbumCard } from '@/components/album-card'
import { LightstickCard } from '@/components/lightstick-card'
import { MagazineCard } from '@/components/magazine-card'
import { PhotobookCard } from '@/components/photobook-card'
import { GreetingCard } from '@/components/greeting-card'
import { DVDCard } from '@/components/dvd-card'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { getAlbums, getCategories } from '@/data/albums'
import { getLightsticks, getLightstickCategories } from '@/data/lightsticks'
import { getMagazines, getMagazineCategories } from '@/data/magazines'
import { getPhotobooks, getPhotobookCategories } from '@/data/photobooks'
import { getGreetings, getGreetingCategories } from '@/data/greetings'
import { getDVDs, getDVDCategories } from '@/data/dvds'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our collection of K-pop albums, lightsticks, magazines, photobooks, greetings, and DVDs.',
}

type ShopType = 'all' | 'albums' | 'lightsticks' | 'magazines' | 'photobooks' | 'greetings' | 'dvds'

function CategoryFilter({ selected, type }: { selected?: string; type: ShopType }) {
  let categories: string[] = []
  
  if (type === 'all') {
    const allCategories = [
      ...getCategories(),
      ...getLightstickCategories(),
      ...getMagazineCategories(),
      ...getPhotobookCategories(),
      ...getGreetingCategories(),
      ...getDVDCategories()
    ]
    categories = [...new Set(allCategories)]
  } else if (type === 'albums') {
    categories = getCategories()
  } else if (type === 'lightsticks') {
    categories = getLightstickCategories()
  } else if (type === 'magazines') {
    categories = getMagazineCategories()
  } else if (type === 'photobooks') {
    categories = getPhotobookCategories()
  } else if (type === 'greetings') {
    categories = getGreetingCategories()
  } else if (type === 'dvds') {
    categories = getDVDCategories()
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium text-white">
          {selected || 'All categories'}
          <ChevronUpDownIcon className="size-4 fill-white" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-gray-900 p-1 shadow-lg ring-1 ring-white/10 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
        >
          <MenuItem>
            <Link
              href={`/shop?type=${type}`}
              data-selected={selected === undefined ? true : undefined}
              className="group grid grid-cols-[1rem_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5 text-white"
            >
              <CheckIcon className="hidden size-4 group-data-selected:block" />
              <p className="col-start-2 text-sm/6">All categories</p>
            </Link>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category}>
              <Link
                href={`/shop?type=${type}&category=${category}`}
                data-selected={category === selected ? true : undefined}
                className="group grid grid-cols-[16px_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5 text-white"
              >
                <CheckIcon className="hidden size-4 group-data-selected:block" />
                <p className="col-start-2 text-sm/6 capitalize">{category}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}

function AllItemsGrid({ category }: { category?: string }) {
  const albums = getAlbums(category)
  const lightsticks = getLightsticks(category)
  const magazines = getMagazines(category)
  const photobooks = getPhotobooks(category)
  const greetings = getGreetings(category)
  const dvds = getDVDs(category)
  
  const allItems = [
    ...albums.map(album => ({ type: 'album' as const, item: album })),
    ...lightsticks.map(lightstick => ({ type: 'lightstick' as const, item: lightstick })),
    ...magazines.map(magazine => ({ type: 'magazine' as const, item: magazine })),
    ...photobooks.map(photobook => ({ type: 'photobook' as const, item: photobook })),
    ...greetings.map(greeting => ({ type: 'greeting' as const, item: greeting })),
    ...dvds.map(dvd => ({ type: 'dvd' as const, item: dvd }))
  ]

  if (allItems.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-gray-400">No items found in this category.</p>
      </div>
    )
  }

  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {allItems.map(({ type, item }) => {
        if (type === 'album') {
          return <AlbumCard key={item.id} album={item} />
        } else if (type === 'lightstick') {
          return <LightstickCard key={item.id} lightstick={item} />
        } else if (type === 'magazine') {
          return <MagazineCard key={item.id} magazine={item} />
        } else if (type === 'photobook') {
          return <PhotobookCard key={item.id} photobook={item} />
        } else if (type === 'greeting') {
          return <GreetingCard key={item.id} greeting={item} />
        } else if (type === 'dvd') {
          return <DVDCard key={item.id} dvd={item} />
        }
        return null
      })}
    </div>
  )
}

function AlbumGrid({ category }: { category?: string }) {
  const albums = getAlbums(category)

  if (albums.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-gray-400">No albums found in this category.</p>
      </div>
    )
  }

  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  )
}

function LightstickGrid({ category }: { category?: string }) {
  const lightsticks = getLightsticks(category)

  if (lightsticks.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-gray-400">No lightsticks found in this category.</p>
      </div>
    )
  }

  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {lightsticks.map((lightstick) => (
        <LightstickCard key={lightstick.id} lightstick={lightstick} />
      ))}
    </div>
  )
}

function MagazineGrid({ category }: { category?: string }) {
  const magazines = getMagazines(category)

  if (magazines.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-gray-400">No magazines found in this category.</p>
      </div>
    )
  }

  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {magazines.map((magazine) => (
        <MagazineCard key={magazine.id} magazine={magazine} />
      ))}
    </div>
  )
}

function PhotobookGrid({ category }: { category?: string }) {
  const photobooks = getPhotobooks(category)

  if (photobooks.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-gray-400">No photobooks found in this category.</p>
      </div>
    )
  }

  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {photobooks.map((photobook) => (
        <PhotobookCard key={photobook.id} photobook={photobook} />
      ))}
    </div>
  )
}

function GreetingGrid({ category }: { category?: string }) {
  const greetings = getGreetings(category)

  if (greetings.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-gray-400">No greetings found in this category.</p>
      </div>
    )
  }

  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {greetings.map((greeting) => (
        <GreetingCard key={greeting.id} greeting={greeting} />
      ))}
    </div>
  )
}

function DVDGrid({ category }: { category?: string }) {
  const dvds = getDVDs(category)

  if (dvds.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-gray-400">No DVDs found in this category.</p>
      </div>
    )
  }

  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {dvds.map((dvd) => (
        <DVDCard key={dvd.id} dvd={dvd} />
      ))}
    </div>
  )
}

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const type = (typeof params.type === 'string' ? params.type : 'all') as ShopType
  const category =
    typeof params.category === 'string' ? params.category : undefined

  const allCategories = [...new Set([
    ...getCategories(),
    ...getLightstickCategories(),
    ...getMagazineCategories(),
    ...getPhotobookCategories(),
    ...getGreetingCategories(),
    ...getDVDCategories()
  ])]
  
  if (type === 'albums' && category && !getCategories().includes(category)) {
    notFound()
  }
  if (type === 'lightsticks' && category && !getLightstickCategories().includes(category)) {
    notFound()
  }
  if (type === 'magazines' && category && !getMagazineCategories().includes(category)) {
    notFound()
  }
  if (type === 'photobooks' && category && !getPhotobookCategories().includes(category)) {
    notFound()
  }
  if (type === 'greetings' && category && !getGreetingCategories().includes(category)) {
    notFound()
  }
  if (type === 'dvds' && category && !getDVDCategories().includes(category)) {
    notFound()
  }
  if (type === 'all' && category && !allCategories.includes(category)) {
    notFound()
  }

  const getHeading = () => {
    switch (type) {
      case 'albums': return 'Discover your next favorite album.'
      case 'lightsticks': return 'Find the perfect lightstick for concerts.'
      case 'magazines': return 'Browse official magazines.'
      case 'photobooks': return 'Explore stunning photobooks.'
      case 'greetings': return 'Collect official greetings.'
      case 'dvds': return 'Watch exclusive DVD content.'
      default: return 'Discover albums, lightsticks, and more.'
    }
  }

  const getDescription = () => {
    switch (type) {
      case 'albums':
        return 'Browse our curated collection of K-pop albums and music. From chart-topping hits to hidden gems, find the perfect addition to your collection.'
      case 'lightsticks':
        return 'Browse our collection of official K-pop lightsticks. Perfect for concerts, fan events, and showing your support for your favorite artists.'
      case 'magazines':
        return 'Browse our collection of official K-pop magazines. Featuring exclusive interviews, behind-the-scenes content, and special features.'
      case 'photobooks':
        return 'Browse our collection of official K-pop photobooks. Stunning photography and exclusive content for collectors and fans.'
      case 'greetings':
        return 'Browse our collection of official K-pop greetings. Special messages, photos, and exclusive content from your favorite artists.'
      case 'dvds':
        return 'Browse our collection of official K-pop DVDs. Concert footage, behind-the-scenes content, and exclusive videos.'
      default:
        return 'Browse our curated collection of K-pop albums, lightsticks, magazines, photobooks, greetings, and DVDs. Find everything you need for your collection.'
    }
  }

  return (
    <main className="overflow-hidden">
      <Container>
        <Navbar />
        <Subheading className="mt-16">Shop</Subheading>
        <Heading as="h1" className="mt-2">
          {getHeading()}
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          {getDescription()}
        </Lead>
      </Container>
      <Container className="mt-16 pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/shop?type=all"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                type === 'all'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              All
            </Link>
            <Link
              href="/shop?type=albums"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                type === 'albums'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Albums
            </Link>
            <Link
              href="/shop?type=lightsticks"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                type === 'lightsticks'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Lightsticks
            </Link>
            <Link
              href="/shop?type=magazines"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                type === 'magazines'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Magazines
            </Link>
            <Link
              href="/shop?type=photobooks"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                type === 'photobooks'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Photobooks
            </Link>
            <Link
              href="/shop?type=greetings"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                type === 'greetings'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Greetings
            </Link>
            <Link
              href="/shop?type=dvds"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                type === 'dvds'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              DVDs
            </Link>
          </div>
          <CategoryFilter selected={category} type={type} />
        </div>
        {type === 'all' ? (
          <AllItemsGrid category={category} />
        ) : type === 'albums' ? (
          <AlbumGrid category={category} />
        ) : type === 'lightsticks' ? (
          <LightstickGrid category={category} />
        ) : type === 'magazines' ? (
          <MagazineGrid category={category} />
        ) : type === 'photobooks' ? (
          <PhotobookGrid category={category} />
        ) : type === 'greetings' ? (
          <GreetingGrid category={category} />
        ) : (
          <DVDGrid category={category} />
        )}
      </Container>
      <Footer />
    </main>
  )
}
