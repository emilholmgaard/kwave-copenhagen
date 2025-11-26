import { AlbumPageClient } from './album-page-client'
import { getAlbum } from '@/data/albums'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const album = getAlbum((await params).slug)

  return album
    ? {
        title: `${album.title} - ${album.artist}`,
        description: album.description,
      }
    : {}
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const album = getAlbum((await params).slug)
  if (!album) notFound()

  return <AlbumPageClient album={album} />
}
