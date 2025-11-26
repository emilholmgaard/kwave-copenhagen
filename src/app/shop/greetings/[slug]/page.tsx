import { GreetingPageClient } from './greeting-page-client'
import { getGreeting } from '@/data/greetings'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const greeting = getGreeting((await params).slug)

  return greeting
    ? {
        title: `${greeting.title} - ${greeting.artist}`,
        description: greeting.description,
      }
    : {}
}

export default async function GreetingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const greeting = getGreeting((await params).slug)
  if (!greeting) notFound()

  return <GreetingPageClient greeting={greeting} />
}

