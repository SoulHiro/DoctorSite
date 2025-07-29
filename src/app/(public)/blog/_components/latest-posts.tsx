'use client'

import { ArrowRight, TrendingUp } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
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
    <section className="container mx-auto max-w-6xl px-4 pb-16 md:pb-24">
      <div className="animate-fade-in-up animation-delay-800">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-pink-500" />
            <div>
              <h2 className="mb-2 text-3xl font-bold text-slate-900">
                Últimos Artigos
              </h2>
              <p className="text-lg text-slate-600">
                Conteúdo atualizado semanalmente por nossa equipe
              </p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
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

        {/* Load More Button */}
        <div className="animate-fade-in-up animation-delay-1600 mt-16 text-center">
          <Button
            size="lg"
            className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 text-white transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600 hover:shadow-lg"
            onClick={handleLoadMore}
            disabled={!hasMorePosts}
          >
            Carregar mais artigos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
