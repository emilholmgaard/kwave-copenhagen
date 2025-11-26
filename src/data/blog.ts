export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  author?: {
    name: string
    image?: string
  }
  categories?: Array<{
    slug: string
    title: string
  }>
  mainImage?: {
    url: string
    alt?: string
  }
  body?: string
}

export function getPost(_slug: string): Promise<{ data: BlogPost | null }> {
  // Return empty for now - can be implemented later
  // slug parameter is available for future implementation
  return Promise.resolve({ data: null })
}

export function getPosts(): Promise<{ data: BlogPost[] }> {
  return Promise.resolve({ data: [] })
}

export function getPostsCount(): Promise<{ data: number }> {
  return Promise.resolve({ data: 0 })
}

export function getPostsForFeed(): Promise<{ data: BlogPost[] }> {
  return Promise.resolve({ data: [] })
}

export function getFeaturedPosts(): Promise<{ data: BlogPost[] }> {
  return Promise.resolve({ data: [] })
}

export function getCategories(): Promise<{
  data: Array<{ slug: string; title: string }>
}> {
  return Promise.resolve({ data: [] })
}
