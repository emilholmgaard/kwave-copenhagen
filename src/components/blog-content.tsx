export function BlogContent({ html }: { html: string }) {
  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

