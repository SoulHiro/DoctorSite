'use client'

import { Calendar, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { stripHtmlAndMarkdown } from '@/lib/utils'
import type { BlogPost } from '@/types/blog-types'

interface PostCardProps {
  post: BlogPost
  variant?: 'featured' | 'default'
  index?: number
}

export function PostCard({
  post,
  variant = 'default',
  index = 0,
}: PostCardProps) {
  const isFeatured = variant === 'featured'
  const router = useRouter()

  const formatedDate = new Date(post.publishedAt || '').toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
  )

  // Limpar o excerpt de formatação HTML/markdown
  const cleanExcerpt = stripHtmlAndMarkdown(post.excerpt || '')

  // Função para definir cores baseadas na categoria
  const getCategoryColors = (category: string) => {
    const colors = {
      Histórias: 'bg-blue-500 hover:bg-blue-600',
      'Impacto Social': 'bg-green-500 hover:bg-green-600',
      Bastidores: 'bg-purple-500 hover:bg-purple-600',
      Depoimentos: 'bg-pink-500 hover:bg-pink-600',
      Eventos: 'bg-orange-500 hover:bg-orange-600',
      Voluntários: 'bg-red-500 hover:bg-red-600',
      Reflexões: 'bg-indigo-500 hover:bg-indigo-600',
      Parcerias: 'bg-teal-500 hover:bg-teal-600',
    }
    return (
      colors[category as keyof typeof colors] ||
      'bg-orange-500 hover:bg-orange-600'
    )
  }

  return (
    <article
      onClick={() => router.push(`/blog/${post.slug}`)}
      className={`group animate-fade-in-up overflow-hidden border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl ${
        isFeatured
          ? 'rounded-3xl shadow-lg hover:-translate-y-1 hover:border-orange-300 hover:shadow-2xl'
          : 'rounded-2xl'
      }`}
      style={{
        animationDelay: `${isFeatured ? 600 + index * 200 : 1000 + index * 100}ms`,
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Image
          src={post.imageUrl || '/images/hero-section.webp'}
          alt={post.title}
          width={isFeatured ? 600 : 400}
          height={isFeatured ? 300 : 200}
          className={`w-full object-cover transition-transform duration-500 ${
            isFeatured
              ? 'h-64 group-hover:scale-105'
              : 'h-48 group-hover:scale-110'
          }`}
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            isFeatured ? 'from-black/40' : 'from-black/20'
          }`}
        />

        {/* Category Badge */}
        <Badge
          className={`absolute top-4 left-4 text-white transition-colors ${getCategoryColors(post.tags[0])}`}
        >
          {post.tags[0]}
        </Badge>
      </div>

      {/* Content */}
      <div className={isFeatured ? 'p-8' : 'p-6'}>
        <h3
          className={`line-clamp-2 font-semibold text-slate-900 transition-colors duration-300 group-hover:text-orange-600 ${
            isFeatured ? 'mb-4 text-2xl' : 'mb-3 text-xl'
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`line-clamp-3 leading-relaxed text-slate-600 ${
            isFeatured ? 'mb-6 text-lg' : 'mb-4'
          }`}
        >
          {cleanExcerpt}
        </p>

        {/* Footer */}
        <div
          className={`flex items-center justify-between border-t border-slate-100 ${
            isFeatured ? 'pt-6' : 'pt-4'
          }`}
        >
          {/* Author */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-red-400 ${
                isFeatured ? 'h-10 w-10' : 'h-8 w-8'
              }`}
            >
              <User className={isFeatured ? 'h-5 w-5' : 'h-4 w-4'} />
            </div>
            <div>
              <p
                className={`font-medium text-slate-900 ${
                  isFeatured ? 'font-semibold' : 'text-sm'
                }`}
              >
                {post.author}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatedDate}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
