'use client'

import { Star } from 'lucide-react'

import type { BlogPost } from '@/types/blog-types'

import { PostCard } from './post-card'

interface FeaturedPostsProps {
  posts: BlogPost[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="animate-fade-in-up animation-delay-400">
        {/* Section Header */}
        <div className="mb-12 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-orange-500" />
            <h2 className="text-3xl font-bold text-slate-900">
              Posts em Destaque
            </h2>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {posts
            .filter((post) => post.status === 'publicado')
            .slice(0, 2)
            .map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                variant="featured"
                index={index}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
