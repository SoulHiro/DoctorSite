import Image from 'next/image'
import Link from 'next/link'

import { getPosts } from '@/actions/blog'
import { Badge } from '@/components/ui/badge'
import { PageContainer } from '@/components/ui/page-container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { stripHtmlAndMarkdown } from '@/lib/utils'
import type { BlogPost } from '@/types/blog-types'

import { Button } from '../ui/button'

// Componente reutilizável para card de post
const PostCard = ({ post }: { post: BlogPost }) => {
  // Limpar o excerpt de formatação HTML/markdown
  const cleanExcerpt = stripHtmlAndMarkdown(post.excerpt || '')

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <Image
            src={post.imageUrl || '/images/hero-section.webp'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-3 p-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-red-100 text-xs font-semibold text-red-800 transition-colors hover:bg-red-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-red-600">
            {post.title}
          </h3>
          <p className="line-clamp-3 flex-1 text-sm text-gray-700">
            {cleanExcerpt || 'Clique para ler mais...'}
          </p>
          <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
            <span>Por {post.author}</span>
            {post.publishedAt && (
              <span>
                {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

// Função para filtrar posts por categoria
const filterPostsByCategory = (posts: BlogPost[], category: string) => {
  if (category === 'todos') return posts
  return posts.filter((post) => post.tags.includes(category))
}

const BlogSection = async () => {
  const p1 = await getPosts()
  const posts = p1.slice(0, 3) // Aumentar para 9 posts para melhor distribuição

  // Verificar se há posts para cada categoria
  const categories = ['todos', 'noticia', 'evento', 'artigo', 'outro'] as const

  return (
    <section className="w-full">
      <PageContainer className="flex flex-col items-center space-y-6 px-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-gray-900">Nosso Blog</h2>
          <p className="mx-auto max-w-2xl text-gray-700">
            Fique por dentro de novidades sobre humanização hospitalar, técnicas
            de palhaçaria terapêutica e histórias inspiradoras do nosso
            trabalho.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              Nenhum post disponível no momento.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Volte em breve para conferir nossos conteúdos!
            </p>
          </div>
        ) : (
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="mx-auto grid w-fit grid-cols-5 bg-white">
              <TabsTrigger
                value="todos"
                className="rounded-full data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="noticia"
                className="rounded-full data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Notícias
              </TabsTrigger>
              <TabsTrigger
                value="evento"
                className="rounded-full data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Eventos
              </TabsTrigger>
              <TabsTrigger
                value="artigo"
                className="rounded-full data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Artigos
              </TabsTrigger>
              <TabsTrigger
                value="outro"
                className="rounded-full data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Outros
              </TabsTrigger>
            </TabsList>

            {categories.map((category) => {
              const filteredPosts = filterPostsByCategory(posts, category)

              return (
                <TabsContent key={category} value={category} className="mt-8">
                  {filteredPosts.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">
                        Nenhum post encontrado para esta categoria.
                      </p>
                    </div>
                  ) : (
                    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                  )}
                </TabsContent>
              )
            })}
          </Tabs>
        )}

        {posts.length > 0 && (
          <div className="pt-8">
            <Link href="/blog">
              <Button variant="default">Ver todos os posts</Button>
            </Link>
          </div>
        )}
      </PageContainer>
    </section>
  )
}

export default BlogSection
