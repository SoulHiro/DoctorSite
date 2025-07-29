'use client'

import * as React from 'react'

import type { BlogPost } from '../../../../../../types/blog-types'

interface StatsCardsProps {
  posts: BlogPost[]
}

export function StatsCards({ posts }: StatsCardsProps) {
  const totalPosts = posts.length
  const publishedPosts = posts.filter((p) => p.status === 'publicado').length
  const draftPosts = posts.filter((p) => p.status === 'rascunho').length

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="bg-card rounded-lg border p-4">
        <div className="text-2xl font-bold">{totalPosts}</div>
        <div className="text-muted-foreground text-sm">Total de Posts</div>
      </div>
      <div className="bg-card rounded-lg border p-4">
        <div className="text-2xl font-bold text-green-600">
          {publishedPosts}
        </div>
        <div className="text-muted-foreground text-sm">Publicados</div>
      </div>
      <div className="bg-card rounded-lg border p-4">
        <div className="text-2xl font-bold text-orange-600">{draftPosts}</div>
        <div className="text-muted-foreground text-sm">Rascunhos</div>
      </div>
    </div>
  )
}
