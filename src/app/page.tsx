import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Testimonials } from '@/components/testimonials'
import { getFeaturedAlbums } from '@/data/albums'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Shop the latest K-pop albums and music. Discover your next favorite album from top artists.',
}

function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/mhKCRnUKp5U?autoplay=1&loop=1&mute=1&playlist=mhKCRnUKp5U&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1"
          className="h-full w-full scale-150"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: 'none', transformOrigin: 'center' }}
        />
      </div>
      <div className="absolute inset-2 bottom-0 rounded-4xl bg-black/40" />
      <Container className="relative">
        <Navbar />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
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
  const featuredAlbums = getFeaturedAlbums(3)

  if (featuredAlbums.length === 0) {
    return null
  }

  return (
    <Container className="pb-24">
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {featuredAlbums.map((album) => (
          <div key={album.id} className="product-teaser group relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
            <div
              className="product-teaser__block absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${album.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />
            </div>
            <div className="product-teaser__content relative flex min-h-[600px] flex-col justify-between p-8">
              <div className="product-teaser__header">
                <span className="chip chip--small chip--white inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  Populært produkt
                </span>
                <h2 className="product-teaser__heading mt-6 text-3xl font-semibold leading-tight text-white">
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

export default async function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
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
