import { DVDPageClient } from './dvd-page-client'
import { getDVD } from '@/data/dvds'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const dvd = getDVD((await params).slug)

  return dvd
    ? {
        title: `${dvd.title} - ${dvd.artist}`,
        description: dvd.description,
      }
    : {}
}

export default async function DVDPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const dvd = getDVD((await params).slug)
  if (!dvd) notFound()

  return <DVDPageClient dvd={dvd} />
}

