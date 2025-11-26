export interface BlogPost {
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

export function getPost(slug: string): Promise<{ data: BlogPost | null }> {
  // Return empty for now - can be implemented later
  return Promise.resolve({ data: null })
}

export function getPosts() {
  return []
}
