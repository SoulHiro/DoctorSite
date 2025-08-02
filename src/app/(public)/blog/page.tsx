'use client'

import { BookOpen, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { getPosts } from '@/actions/blog'
import { HeroSection } from '@/components/shared/hero-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

  // Verificar se há busca ou filtro ativo
  const hasActiveFilters = searchTerm !== '' || selectedTag !== 'todos'

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
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Barra de busca */}
      <div className="group relative">
        <Input
          type="text"
          placeholder="Buscar histórias, depoimentos, eventos..."
          className="h-14 w-full rounded-full border-orange-200 bg-white py-6 pl-12 text-lg text-slate-900 shadow-lg focus:border-orange-300 focus:ring-orange-200"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="pointer-events-none absolute top-1/2 left-4 flex -translate-y-1/2 items-center">
          <Search className="h-5 w-5 text-orange-500 transition-colors" />
        </span>
      </div>

      {/* Filtros por Tag */}
      <div className="flex flex-wrap justify-center gap-2">
        {availableTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(tag)}
            className="rounded-full transition-all duration-200 hover:scale-105"
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
          <p className="text-lg text-slate-600">
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
        {/* Mensagem quando não há resultados */}
        {filteredPosts.length === 0 &&
          (searchTerm || selectedTag !== 'todos') && (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                Nenhum resultado encontrado
              </h3>
              <p className="mb-4 text-slate-600">
                {searchTerm
                  ? `Não encontramos posts para "${searchTerm}"`
                  : `Não há posts com a tag "${selectedTag}"`}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTag('todos')
                }}
                className="rounded-full"
              >
                Limpar filtros
              </Button>
            </div>
          )}

        {/* Conteúdo condicional baseado em filtros */}
        {hasActiveFilters ? (
          // Se há filtros ativos, mostrar apenas uma seção de resultados
          <div className="animate-fade-in-up">
            {/* Section Header */}
            <div className="mb-12 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                <h2 className="text-3xl font-bold text-slate-900">
                  Resultados encontrados
                </h2>
              </div>
            </div>

            {/* Posts Grid */}
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
        ) : (
          // Se não há filtros, mostrar as seções originais
          <>
            {/* Posts em Destaque */}
            <FeaturedPosts posts={filteredPosts} />

            {/* Posts Mais Recentes */}
            <LatestPosts posts={filteredPosts} />
          </>
        )}
      </div>
    </>
  )
}
