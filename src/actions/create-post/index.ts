'use server'

import { headers } from 'next/headers'
import { z } from 'zod'

import { db } from '@/db'
import { blogPostsTable } from '@/db/schema'
import { auth } from '@/lib/auth'
import {
  determinePostStatus,
  generateExcerpt,
  generateSlug,
  type PostData,
  type PostStatus,
  sanitizeContent,
  toLocalISOString,
  validatePostData,
} from '@/lib/post-utils'

const createPostSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  content: z.string().min(1, { message: 'Conteúdo é obrigatório' }),
  tags: z
    .array(z.enum(['noticia', 'evento', 'artigo', 'outro']))
    .min(1, { message: 'Selecione pelo menos uma tag' }),
  image: z.instanceof(File).optional(),
  shedule: z.date().optional(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

export interface CreatePostResult {
  success?: boolean
  error?: string
  post?: {
    id: string
    title: string
    slug: string
    status: PostStatus
    scheduledAt?: string
  }
}

export const createPost = async (
  data: CreatePostInput,
  status: 'draft' | 'scheduled' | 'published'
): Promise<CreatePostResult> => {
  try {
    const validatedData = createPostSchema.parse(data)

    // Autenticação
    const headersList = await headers()
    const session = await auth.api.getSession({
      headers: headersList,
    })
    const userId = session?.user?.id

    if (!userId) {
      return { error: 'Usuário não autenticado' }
    }

    // Preparação dos dados
    const postData: PostData = {
      title: validatedData.title.trim(),
      content: sanitizeContent(validatedData.content),
      tags: validatedData.tags,
      scheduledAt: validatedData.shedule,
      image: validatedData.image,
    }

    // Validação personalizada
    const validation = validatePostData(postData)
    if (!validation.isValid) {
      return { error: validation.errors.join(', ') }
    }

    // Determina o status final do post
    const isScheduled = status === 'scheduled'
    const finalStatus = determinePostStatus(isScheduled, postData.scheduledAt)

    // Verifica se é agendamento e tem data válida
    if (isScheduled && (!postData.scheduledAt || finalStatus !== 'agendado')) {
      return { error: 'Data de agendamento inválida ou no passado' }
    }

    // Geração de slug único
    const slug = generateSlug(postData.title)

    // Verifica se o slug já existe
    const existingPost = await db.query.blogPostsTable.findFirst({
      where: (posts, { eq }) => eq(posts.slug, slug),
    })

    if (existingPost) {
      return { error: 'Já existe um post com este título' }
    }

    // Geração do excerpt
    const excerpt = generateExcerpt(postData.content)

    // Prepara a data agendada no formato correto
    let scheduledAtISO: string | null = null
    if (finalStatus === 'agendado' && postData.scheduledAt) {
      scheduledAtISO = toLocalISOString(postData.scheduledAt)
    }

    // Preparação dos dados para inserção
    const insertData = {
      title: postData.title,
      content: postData.content,
      slug,
      userId,
      status: finalStatus,
      tags: postData.tags as ('noticia' | 'evento' | 'artigo' | 'outro')[],
      excerpt,
      viewCount: 0,
      publishedAt:
        finalStatus === 'publicado' ? new Date().toISOString() : null,
      scheduledAt: scheduledAtISO,
    }

    // Inserção no banco
    const [newPost] = await db
      .insert(blogPostsTable)
      .values(insertData)
      .returning({
        id: blogPostsTable.id,
        title: blogPostsTable.title,
        slug: blogPostsTable.slug,
        status: blogPostsTable.status,
        scheduledAt: blogPostsTable.scheduledAt,
      })

    // Log da operação
    console.log(`Post criado: ${newPost.title} (${newPost.status})`)
    if (newPost.scheduledAt) {
      console.log(
        `Agendado para: ${new Date(newPost.scheduledAt).toLocaleString('pt-BR')}`
      )
    }

    return {
      success: true,
      post: {
        id: newPost.id,
        title: newPost.title,
        slug: newPost.slug,
        status: newPost.status,
        scheduledAt: newPost.scheduledAt || undefined,
      },
    }
  } catch (error) {
    console.error('Erro ao criar post:', error)

    if (error instanceof z.ZodError) {
      const errors = error.errors.map((e) => e.message).join(', ')
      return { error: `Dados inválidos: ${errors}` }
    }

    return { error: 'Erro interno do servidor ao criar post' }
  }
}
