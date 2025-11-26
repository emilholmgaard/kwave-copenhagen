import { LightstickPageClient } from './lightstick-page-client'
import { getLightstick } from '@/data/lightsticks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const lightstick = getLightstick((await params).slug)

  return lightstick
    ? {
        title: `${lightstick.title} - ${lightstick.artist}`,
        description: lightstick.description,
      }
    : {}
}

export default async function LightstickPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const lightstick = getLightstick((await params).slug)
  if (!lightstick) notFound()

  return <LightstickPageClient lightstick={lightstick} />
}

