'use client'

import { ArrowRight, TrendingUp } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/ui/page-container'
import type { BlogPost } from '@/types/blog-types'

import { PostCard } from './post-card'

interface LatestPostsProps {
  posts: BlogPost[]
}

export function LatestPosts({ posts }: LatestPostsProps) {
  const [visiblePosts, setVisiblePosts] = useState(6)

  const handleLoadMore = () => {
    setVisiblePosts(visiblePosts + 6)
  }

  const hasMorePosts = visiblePosts < posts.length
  const postsToShow = posts.slice(0, visiblePosts)

  return (
    <section className="pb-16">
      <PageContainer className="px-4 sm:px-0">
        <div className="animate-fade-in-up animation-delay-800 space-y-8">
          {/* Cabeçalho da Seção */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-pink-500" />
              <div>
                <h2 className="text-xl text-slate-900 md:text-2xl lg:text-3xl">
                  Últimos Artigos
                </h2>
                <p className="text-lg text-slate-600">
                  Conteúdo atualizado semanalmente por nossa equipe
                </p>
              </div>
            </div>
          </div>

          {/* Grid de Posts */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {postsToShow.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                variant="default"
                index={index}
              />
            ))}
          </div>

          {/* Botão Carregar Mais */}
          <div className="animate-fade-in-up animation-delay-1600 space-y-0 pt-4 text-center">
            <Button
              size="default"
              variant="default"
              className="gap-0"
              onClick={handleLoadMore}
              disabled={!hasMorePosts}
            >
              Carregar mais artigos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
