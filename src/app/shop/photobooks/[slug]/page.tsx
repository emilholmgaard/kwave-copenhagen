import { PhotobookPageClient } from './photobook-page-client'
import { getPhotobook } from '@/data/photobooks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const photobook = getPhotobook((await params).slug)

  return photobook
    ? {
        title: `${photobook.title} - ${photobook.artist}`,
        description: photobook.description,
      }
    : {}
}

export default async function PhotobookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const photobook = getPhotobook((await params).slug)
  if (!photobook) notFound()

  return <PhotobookPageClient photobook={photobook} />
}

