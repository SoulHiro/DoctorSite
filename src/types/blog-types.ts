// Tipos baseados no que a action getPosts retorna
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  status: 'rascunho' | 'publicado'
  author: string
  authorId: string
  tags: string[]
  imageUrl: string | null
  publishedAt: string | null
  createdAt: string
}
