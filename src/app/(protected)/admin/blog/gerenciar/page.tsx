'use client'

import * as React from 'react'

import { getPosts } from '@/actions/blog'

import {
  type BlogPost,
  Filters,
  PageHeader,
  PostsTable,
  StatsCards,
} from './_components'

export default function BlogGerenciar() {
  // Estados principais
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [isLoading, setIsLoading] = React.useState(true)

  // Buscar posts do banco
  const fetchPosts = React.useCallback(async () => {
    try {
      const data = await getPosts()
      setPosts(data)
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Carregar posts na montagem do componente
  React.useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // Filtrar posts baseado na busca e status
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Deletar post
  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg">Carregando posts...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header com botão de criar */}
        <PageHeader />

        {/* Filtros de busca */}
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Cards de estatísticas */}
        <StatsCards posts={posts} />

        {/* Tabela de posts */}
        <PostsTable posts={filteredPosts} onDeletePost={handleDeletePost} />
      </div>
    </div>
  )
}
