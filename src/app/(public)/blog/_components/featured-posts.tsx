'use client'

import { Star } from 'lucide-react'

import { PageContainer } from '@/components/ui/page-container'
import type { BlogPost } from '@/types/blog-types'

import { PostCard } from './post-card'

interface FeaturedPostsProps {
  posts: BlogPost[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="py-16">
      <PageContainer className="px-4 sm:px-0">
        <div className="animate-fade-in-up animation-delay-400 space-y-12">
          {/* Cabeçalho da Seção */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl text-slate-900 md:text-2xl lg:text-3xl">
                Posts em Destaque
              </h2>
            </div>
          </div>

          {/* Grid de Posts */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {posts
              .filter((post) => post.status === 'publicado')
              .slice(0, 3)
              .map((post, index) => (
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
  )
}
