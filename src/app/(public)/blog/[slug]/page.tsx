import { ArrowLeft, Calendar, Tag, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getPostBySlug } from '@/actions/blog'
import { TipTapViewer } from '@/components/ui/Tiptap'

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return <div>Post não encontrado</div>
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <Image
          src={post?.imageUrl ?? ''}
          alt="Seção principal - Doutores Palhaços"
          fill
          quality={100}
          priority
          className="-z-10 object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-[5] bg-black/60" />

        {/* Back Button */}
        <div className="relative container mx-auto max-w-6xl px-4 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/90 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Voltar ao Blog</span>
          </Link>
        </div>

        <div className="relative container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            {/* Tags */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {post?.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <div className="animate-fade-in-up">
              <h1 className="mb-6 text-center text-4xl font-bold tracking-tight whitespace-pre-wrap text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                {post?.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90 md:text-base">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post?.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post?.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8">
          {/* Main Content */}
          <article className="space-y-8">
            {/* Featured Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <div className="flex aspect-video items-center justify-center">
                <Image
                  src={post?.imageUrl ?? ''}
                  alt="Seção principal - Doutores Palhaços"
                  fill
                  quality={100}
                  className="-z-10 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Article Content */}
            <div className="mx-auto max-w-4xl">
              <TipTapViewer
                content={post?.content ?? ''}
                className="leading-relaxed text-gray-700"
              />
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
