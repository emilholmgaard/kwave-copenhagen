import { MagazinePageClient } from './magazine-page-client'
import { getMagazine } from '@/data/magazines'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const magazine = getMagazine((await params).slug)

  return magazine
    ? {
        title: `${magazine.title} - ${magazine.artist}`,
        description: magazine.description,
      }
    : {}
}

export default async function MagazinePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const magazine = getMagazine((await params).slug)
  if (!magazine) notFound()

  return <MagazinePageClient magazine={magazine} />
}

