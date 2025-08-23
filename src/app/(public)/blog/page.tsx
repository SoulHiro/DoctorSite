'use client'

import { BookOpen, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { getPosts } from '@/actions/blog'
import { HeroSection } from '@/components/shared/hero-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageContainer } from '@/components/ui/page-container'
import { stripHtmlAndMarkdown } from '@/lib/utils'
import type { BlogPost } from '@/types/blog-types'

import { FeaturedPosts, LatestPosts } from './_components'
import { PostCard } from './_components/post-card'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('todos')
  const [isLoading, setIsLoading] = useState(true)

  // Buscar posts na montagem do componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Filtrar posts baseado na busca e tag selecionada
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Limpar o excerpt para busca
      const cleanExcerpt = stripHtmlAndMarkdown(post.excerpt || '')

      // Filtro por busca (título, conteúdo, autor)
      const matchesSearch =
        searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cleanExcerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro por tag
      const matchesTag =
        selectedTag === 'todos' || post.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [posts, searchTerm, selectedTag])

  // Tags disponíveis para filtro
  const availableTags = ['todos', 'noticia', 'evento', 'artigo', 'outro']

  if (isLoading) {
    return (
      <>
        <HeroSection
          title="Diário da Alegria"
          subtitle="Um caderno de bordo dos Doutores Palhaços: bastidores, reflexões e pequenos momentos que fazem pacientes (e a gente) lembrar da própria alegria."
          icon={BookOpen}
          backgroundImage="/images/doctors/doutores1.jpg"
        />
        <div className="flex items-center justify-center py-24">
          <div className="text-lg">Carregando posts...</div>
        </div>
      </>
    )
  }

  // Componente de barra de pesquisa
  const SearchSection = (
    <div className="mx-auto w-full max-w-2xl space-y-4 px-4 sm:space-y-6">
      {/* Barra de busca */}
      <div className="group relative">
        <Input
          type="text"
          placeholder="Buscar histórias, depoimentos, eventos..."
          className="h-10 w-full rounded-full border-orange-200 bg-white pl-10 text-base text-slate-900 shadow-lg focus:border-orange-300 focus:ring-orange-200 sm:h-14 sm:py-6 sm:pl-12 sm:text-lg"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center sm:left-4">
          <Search className="h-4 w-4 text-orange-500 transition-colors sm:h-5 sm:w-5" />
        </span>
      </div>

      {/* Filtros por Tag */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {availableTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(tag)}
            className="rounded-full text-xs transition-all duration-200 hover:scale-105 sm:text-sm"
          >
            {tag === 'todos'
              ? 'Todos'
              : tag === 'noticia'
                ? 'Notícias'
                : tag === 'evento'
                  ? 'Eventos'
                  : tag === 'artigo'
                    ? 'Artigos'
                    : 'Outros'}
          </Button>
        ))}
      </div>

      {/* Resultados da busca */}
      {searchTerm && (
        <div className="text-center">
          <p className="text-base text-slate-600 sm:text-lg">
            {filteredPosts.length} resultado
            {filteredPosts.length !== 1 ? 's' : ''} encontrado
            {filteredPosts.length !== 1 ? 's' : ''} para &quot;{searchTerm}
            &quot;
          </p>
        </div>
      )}
    </div>
  )

  return (
    <>
      <HeroSection
        title="Diário da Alegria"
        subtitle="Um caderno de bordo dos Doutores Palhaços: bastidores, reflexões e pequenos momentos que fazem pacientes e a gente lembrar da própria alegria."
        icon={BookOpen}
        backgroundImage="/images/doctors/doutores1.jpg"
      >
        {SearchSection}
      </HeroSection>

      <div className="space-y-8">
        {/* Se não houver nenhum post, mostrar mensagem e não renderizar mais nada */}
        {filteredPosts.length === 0 && (
          <div className="space-y-4 py-12 text-center">
            <div className="text-6xl">🔍</div>
            <h3 className="text-xl text-slate-900 md:text-2xl lg:text-3xl">
              Nenhum resultado encontrado
            </h3>
            <p className="text-slate-600">
              {searchTerm
                ? `Não encontramos posts para "${searchTerm}"`
                : selectedTag !== 'todos'
                  ? `Não há posts com a tag "${selectedTag}"`
                  : 'Ainda não há posts publicados.'}
            </p>
          </div>
        )}

        {/* Se houver exatamente 1 post OU filtros ativos (exceto "todos"), mostrar apenas "Resultados encontrados" */}
        {filteredPosts.length > 0 && selectedTag !== 'todos' && (
          <section className="py-16">
            <PageContainer className="px-4 sm:px-0">
              <div className="animate-fade-in-up">
                <div className="mb-12 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                    <h2 className="text-xl text-slate-900 md:text-2xl lg:text-3xl">
                      Resultados encontrados
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      variant="default"
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </PageContainer>
          </section>
        )}

        {/* Se a tag selecionada for "todos" e houver posts, mostrar FeaturedPosts e LatestPosts */}
        {selectedTag === 'todos' && filteredPosts.length > 0 && (
          <>
            <FeaturedPosts posts={filteredPosts} />
            <LatestPosts posts={filteredPosts} />
          </>
        )}
      </div>
    </>
  )
}
