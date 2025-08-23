// Utilitários para manipulação de posts

import { z } from 'zod'

// Gera um slug único baseado no título
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Gera um excerpt do conteúdo
export const generateExcerpt = (
  content: string,
  maxLength: number = 150
): string => {
  if (content.length <= maxLength) {
    return content
  }

  const truncated = content.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace === -1) {
    return truncated + '...'
  }

  return truncated.substring(0, lastSpace) + '...'
}

// Formata uma data para exibição
export const formatDate = (
  date: Date | string,
  includeTime: boolean = false
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (includeTime) {
    return dateObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Calcula o tempo estimado de leitura
export const calculateReadingTime = (
  content: string,
  wordsPerMinute: number = 200
): number => {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return Math.max(1, minutes)
}

// Sanitiza o conteúdo do post removendo tags HTML perigosas
export const sanitizeContent = (content: string): string => {
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
}

// Valida os dados de um post
export const validatePostData = (postData: {
  title: string
  content: string
  tags: string[]
}) => {
  const errors: string[] = []

  if (!postData.title || postData.title.trim().length === 0) {
    errors.push('Título é obrigatório')
  }

  if (!postData.content || postData.content.trim().length === 0) {
    errors.push('Conteúdo é obrigatório')
  }

  if (!postData.tags || postData.tags.length === 0) {
    errors.push('Pelo menos uma tag é obrigatória')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Schema para validação de posts
export const postSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  tags: z
    .array(
      z.enum([
        'noticia',
        'evento',
        'artigo',
        'entrevista',
        'hospital',
        'blog',
        'outro',
      ])
    )
    .min(1, 'Selecione pelo menos uma tag'),
  imageUrl: z.string().url('URL da imagem deve ser válida').optional(),
})

// Tipos TypeScript
export type PostStatus = 'rascunho' | 'publicado'

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  status: PostStatus
  tags: string[]
  imageUrl: string | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export type CreatePostData = z.infer<typeof postSchema>
