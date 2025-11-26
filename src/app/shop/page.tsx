import { AlbumCard } from '@/components/album-card'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { getAlbums, getCategories } from '@/data/albums'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our collection of K-pop albums and music.',
}

function CategoryFilter({ selected }: { selected?: string }) {
  const categories = getCategories()

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium">
          {selected || 'All categories'}
          <ChevronUpDownIcon className="size-4 fill-gray-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-gray-900 p-1 shadow-lg ring-1 ring-white/10 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
        >
          <MenuItem>
            <Link
              href="/shop"
              data-selected={selected === undefined ? true : undefined}
              className="group grid grid-cols-[1rem_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5"
            >
              <CheckIcon className="hidden size-4 group-data-selected:block" />
              <p className="col-start-2 text-sm/6">All categories</p>
            </Link>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category}>
              <Link
                href={`/shop?category=${category}`}
                data-selected={category === selected ? true : undefined}
                className="group grid grid-cols-[16px_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5"
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

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const category =
    typeof params.category === 'string' ? params.category : undefined

  if (category && !getCategories().includes(category)) {
    notFound()
  }

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">Shop</Subheading>
        <Heading as="h1" className="mt-2">
          Discover your next favorite album.
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Browse our curated collection of K-pop albums and music. From
          chart-topping hits to hidden gems, find the perfect addition to your
          collection.
        </Lead>
      </Container>
      <Container className="mt-16 pb-24">
        <CategoryFilter selected={category} />
        <AlbumGrid category={category} />
      </Container>
      <Footer />
    </main>
  )
}

