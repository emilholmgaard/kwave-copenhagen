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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getPost(_slug: string): Promise<{ data: BlogPost | null }> {
  // Return empty for now - can be implemented later
  // slug parameter is available for future implementation
  return Promise.resolve({ data: null })
}

export function getPosts(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _start?: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _end?: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _category?: string
): Promise<{ data: BlogPost[] }> {
  return Promise.resolve({ data: [] })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getPostsCount(_category?: string): Promise<{ data: number }> {
  return Promise.resolve({ data: 0 })
}

export function getPostsForFeed(): Promise<{ data: BlogPost[] }> {
  return Promise.resolve({ data: [] })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getFeaturedPosts(_limit?: number): Promise<{ data: BlogPost[] }> {
  return Promise.resolve({ data: [] })
}

export function getCategories(): Promise<{
  data: Array<{ slug: string; title: string }>
}> {
  return Promise.resolve({ data: [] })
}
