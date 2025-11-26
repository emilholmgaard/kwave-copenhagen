import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { getAlbums } from '@/data/albums'
import { getPopularArtists } from '@/data/artists'
import { ChevronRightIcon, EnvelopeIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { AlbumSection } from '@/components/album-section'

export const metadata: Metadata = {
  description:
    'Shop the latest K-pop albums and music. Discover your next favorite album from top artists.',
}

function Hero() {
  return (
    <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
      <div className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/mhKCRnUKp5U?autoplay=1&loop=1&mute=1&playlist=mhKCRnUKp5U&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1"
          className="h-full w-full scale-[3] sm:scale-[2.5] md:scale-[2] lg:scale-150"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: 'none', transformOrigin: 'center' }}
        />
      </div>
      <div className="absolute inset-2 bottom-0 rounded-4xl bg-black/40" />
      <Container className="relative">
        <Navbar />
        <div className="pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-28">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-white ring-1 ring-white/10 hover:ring-white/20 inline-block">
            Populært produkt.{' '}
            <Link href="/shop" className="font-semibold text-gray-900 dark:text-white">
              <span aria-hidden="true" className="absolute inset-0" />
              Se alle <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <h1 className="mt-6 font-display text-5xl/[0.9] font-medium tracking-tight text-white sm:text-7xl/[0.8] md:text-8xl/[0.8]">
            Your K-pop album collection<br />
            starts here.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-300 sm:text-2xl/8">
            <span className="whitespace-nowrap">Discover the latest albums from your favorite K-pop artists.</span>{' '}
            <span className="whitespace-nowrap">From BLACKPINK to BTS, find the perfect addition to your collection.</span>
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button variant="secondary" href="/shop">Shop Now</Button>
            <Button variant="outline" href="/shop">
              Browse Albums
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

async function FeaturedAlbums() {
  const allAlbums = getAlbums()

  if (allAlbums.length === 0) {
    return null
  }

  return (
    <Container className="pb-24">
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {allAlbums.map((album) => (
          <div key={album.id} className="product-teaser group relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
            <div
              className="product-teaser__block absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${album.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />
            </div>
            <div className="product-teaser__content relative flex min-h-[600px] flex-col justify-between p-8">
              <div className="product-teaser__header">
                <h2 className="product-teaser__heading text-3xl font-semibold leading-tight text-white">
                  {album.title}
                </h2>
                <p className="product-teaser__text mt-4 text-base leading-relaxed text-gray-200">
                  {album.description}
                </p>
                <Button
                  variant="outline"
                  href={`/shop/${album.slug}`}
                  className="btn btn--round-icon btn--link btn--white mt-6 gap-2"
                >
                  <span className="btn__text">Læs mere om {album.title}</span>
                  <span className="btn__icon">
                    <ChevronRightIcon className="size-4" />
                  </span>
                </Button>
              </div>
              <div className="product-teaser__footer mt-8">
                <div className="product-teaser__price mb-6">
                  <h3 className="text-4xl font-bold text-white">
                    {album.price.toFixed(2).replace('.', ',')} {album.currency}
                  </h3>
                  <p className="product-teaser__price-text mt-1 text-sm text-gray-300">inkl. moms</p>
                </div>
                <div className="product-teaser__footer__actions flex flex-wrap items-center gap-4">
                  <Button
                    variant="secondary"
                    href={`/shop/${album.slug}`}
                    className="btn btn--round-icon gap-2"
                  >
                    <span className="btn__text">Køb nu</span>
                    <span className="btn__icon">
                      <ChevronRightIcon className="size-4" />
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    href={`/shop/${album.slug}`}
                    className="btn btn--round-icon btn--link btn--white gap-2"
                  >
                    <span className="btn__text">Læs mere om {album.title}</span>
                    <span className="btn__icon">
                      <ChevronRightIcon className="size-4" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button href="/shop" className="gap-2">
          Se alle albums
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </Container>
  )
}

async function ShopSection() {
  const artists = getPopularArtists(6)
  const fanNames = artists.map(artist => artist.fanName).filter(Boolean)

  return (
    <>
      <Container className="pt-8 pb-16 sm:pt-12 sm:pb-24">
        <Subheading>FANDOMS FROM KPOP ARTISTS</Subheading>
        <div className="mt-2 -mx-4 px-4 sm:-mx-6 sm:px-6">
          <Heading as="h2" className="flex justify-between">
            {fanNames.length > 0 ? (
              fanNames.map((fanName, index) => (
                <span key={index}>{fanName}</span>
              ))
            ) : (
              'SHOP'
            )}
          </Heading>
        </div>
      </Container>
      <div className="relative pt-0 pb-12 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex items-center">
            <div className="text-left px-4 sm:px-6 lg:px-8">
              <Subheading className="-mt-4">PRE-ORDERS</Subheading>
              <Heading as="h3" className="mt-2">
                <span className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-all duration-200 hover:text-blue-300 hover:drop-shadow-[0_0_12px_rgba(96,165,250,1)] cursor-pointer">
                  Pre-order the latest K-pop releases
                </span>
              </Heading>
              <p className="mt-6 text-2xl font-medium text-gray-500 dark:text-gray-400">
                Pre-order now and secure exclusive benefits, limited editions, and early delivery on the latest K-pop releases.
              </p>
              <AlbumSection
                albums={[
                  {
                    artist: 'WayV',
                    title: 'Winter Special Album',
                    description: 'Winter Special Album - Limited and exclusive album editions with special photobooks, signed cards and unique merchandise.',
                    price: '219,95 DKK',
                    albumId: 'wayv-winter-special',
                    isPreOrder: true,
                  },
                  {
                    artist: 'ITZY',
                    title: 'TUNNEL VISION',
                    description: 'TUNNEL VISION - Limited and exclusive album editions with special photobooks, signed cards and unique merchandise.',
                    price: '169,95 DKK',
                    albumId: 'itzy-tunnel-vision',
                    isPreOrder: true,
                  },
                  {
                    artist: 'TAEYEON',
                    title: 'Panorama',
                    description: 'Panorama - Limited and exclusive album editions with special photobooks, signed cards and unique merchandise.',
                    price: '249,95 DKK',
                    albumId: 'taeyeon-panorama',
                    isPreOrder: true,
                  },
                  {
                    artist: 'tripleS msnz',
                    title: 'Beyond Beauty',
                    description: 'Beyond Beauty - Limited and exclusive album editions with special photobooks, signed cards and unique merchandise.',
                    price: '219,95 DKK',
                    albumId: 'triples-msnz-beyond-beauty',
                    isPreOrder: true,
                  },
                  {
                    artist: 'RESCENE',
                    title: 'lip bomb',
                    description: 'lip bomb - Limited and exclusive album editions with special photobooks, signed cards and unique merchandise.',
                    price: '219,95 DKK',
                    albumId: 'rescene-lip-bomb',
                    isPreOrder: true,
                  },
                  {
                    artist: 'CHA EUN-WOO (ASTRO)',
                    title: 'ELSE',
                    description: 'ELSE - Limited and exclusive album editions with special photobooks, signed cards and unique merchandise.',
                    price: '219,95 DKK',
                    albumId: 'cha-eun-woo-else',
                    isPreOrder: true,
                  },
                  {
                    artist: 'SEVENTEEN',
                    title: '2026 SEASON\'S GREETINGS',
                    description: '2026 SEASON\'S GREETINGS - Limited and exclusive album editions with special photobooks, signed cards and unique merchandise.',
                    price: '409,95 DKK',
                    albumId: 'seventeen-2026-season-greetings',
                    isPreOrder: true,
                  },
                  {
                    artist: 'LE SSERAFIM',
                    title: '2026 SEASON\'S GREETINGS',
                    description: '2026 SEASON\'S GREETINGS - Limited and exclusive album editions with special photobooks, signed cards and unique merchandise.',
                    price: '409,95 DKK',
                    albumId: 'le-sserafim-2026-season-greetings',
                    isPreOrder: true,
                  },
                ]}
              />
              <div className="relative h-96 sm:h-[500px] md:h-[600px] lg:hidden mt-8 mb-8">
                <div className="absolute inset-2 rounded-4xl ring-1 ring-black/5 ring-inset overflow-hidden">
                  <img
                    alt="K-pop produkter visning"
                    loading="lazy"
                    decoding="async"
                    className="object-cover w-full h-full"
                    src="/SHORT2.webp"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block -mr-2">
            <div className="relative h-full">
              <div className="sticky top-24">
                <div className="relative h-[1200px]">
                  <div className="absolute inset-2 rounded-4xl ring-1 ring-black/5 ring-inset overflow-hidden">
                    <img
                      alt="K-pop produkter visning"
                      loading="lazy"
                      decoding="async"
                      className="object-cover w-full h-full"
                      src="/LONG2.webp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16 pb-16 sm:pt-24 sm:pb-24 w-full">
        <div className="text-left px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <h2 className="dark:text-white font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase data-dark:text-gray-400">
                Kontakt os i dag
              </h2>
              <h3 className="mt-2 dark:text-white text-4xl font-medium tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-6xl">
                <span className="transition-all duration-200 hover:text-red-600 dark:hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] cursor-pointer">
                  Har du brug for vagttjenester i København?
                </span>
              </h3>
              <p className="mt-6 text-base/6 text-gray-600 dark:text-gray-400 max-w-2xl">
                Kontakt os i dag for en uforpligtende samtale og få et tilbud på dine vagttjenester. Vi er klar til at hjælpe dig med at sikre tryghed og orden.
              </p>
            </div>
            <div className="lg:flex-shrink-0">
              <Button
                variant="outline"
                href="mailto:hej@trustsecurity.dk?subject=Vagttjenester i København [REF: CTA-X7K9P2]&body=Hej Trust Security Service ApS,%0D%0A%0D%0AJeg er interesseret i at høre mere om jeres vagttjenester i København:%0D%0A%0D%0A- Hvilke muligheder I kan tilbyde%0D%0A- Priser og vilkår%0D%0A- Mulighed for et møde%0D%0A%0D%0AMed venlig hilsen"
                className="text-lg px-6 py-2 flex items-center gap-2"
              >
                <EnvelopeIcon className="size-6" />
                Send mail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default async function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <ShopSection />
      <main>
        <div className="bg-linear-to-b from-black from-50% to-black py-32">
          <FeaturedAlbums />
        </div>
      </main>
      <Testimonials />
      <Footer />
    </div>
  )
}
