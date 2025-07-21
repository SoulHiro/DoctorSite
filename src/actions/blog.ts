'use server'

import { v2 as cloudinary } from 'cloudinary'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { z } from 'zod'

import { db } from '@/db'
import { blogPostsTable } from '@/db/schema'
import { auth } from '@/lib/auth'
import {
  determinePostStatus,
  generateExcerpt,
  generateSlug,
  toLocalISOString,
  validatePostData,
} from '@/lib/post-utils'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const createPostSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  content: z.string().min(1, { message: 'Conteúdo é obrigatório' }),
  tags: z
    .array(z.enum(['noticia', 'evento', 'artigo', 'outro']))
    .min(1, { message: 'Selecione pelo menos uma tag' }),
  imageUrl: z
    .string()
    .url({ message: 'URL da imagem é obrigatória e deve ser válida' }),
  shedule: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional()
  ),
  status: z.enum(['draft', 'scheduled', 'published']),
})

export async function createPost(formData: FormData) {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })
  const userId = session?.user?.id

  if (!userId) {
    return { error: 'Usuário não autenticado' }
  }

  // Extrair e converter os dados do FormData
  const rawTags = formData.getAll('tags')
  const tags = Array.isArray(rawTags) ? rawTags : [rawTags]
  const sheduleRaw = formData.get('shedule')
  const shedule = sheduleRaw ? new Date(sheduleRaw as string) : undefined

  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    tags: tags as string[],
    imageUrl: formData.get('imageUrl') as string,
    shedule,
    status: formData.get('status') as 'draft' | 'scheduled' | 'published',
  }

  const validatedData = createPostSchema.safeParse(data)

  if (!validatedData.success) {
    return {
      error: validatedData.error.errors.map((e) => e.message).join(', '),
    }
  }

  const {
    title,
    content,
    tags: validTags,
    imageUrl,
    shedule: validShedule,
    status,
  } = validatedData.data

  // Gerar slug e verificar unicidade
  const slug = generateSlug(title.trim())
  const existingPost = await db.query.blogPostsTable.findFirst({
    where: (posts, { eq }) => eq(posts.slug, slug),
  })
  if (existingPost) {
    return { error: 'Já existe um post com este título' }
  }

  // Preparar dados do post
  const postData = {
    title: title.trim(),
    content,
    tags: validTags,
    scheduledAt: validShedule,
    imageUrl,
  }

  // Validação extra (campos obrigatórios, regras de negócio)
  const validation = validatePostData(postData)
  if (!validation.isValid) {
    return { error: validation.errors.join(', ') }
  }

  // Determinar status final
  const isScheduled = status === 'scheduled'
  const finalStatus = determinePostStatus(isScheduled, postData.scheduledAt)

  if (isScheduled && (!postData.scheduledAt || finalStatus !== 'agendado')) {
    return { error: 'Data de agendamento inválida ou no passado' }
  }

  const excerpt = generateExcerpt(postData.content)
  let scheduledAtISO: string | null = null
  if (finalStatus === 'agendado' && postData.scheduledAt) {
    scheduledAtISO = toLocalISOString(postData.scheduledAt)
  }

  const insertData = {
    title: postData.title,
    slug,
    content: postData.content,
    excerpt,
    userId,
    status: finalStatus,
    tags: postData.tags,
    featured: false,
    viewCount: 0,
    imageUrl: postData.imageUrl || null,
    publishedAt: finalStatus === 'publicado' ? new Date().toISOString() : null,
    scheduledAt: scheduledAtISO,
  }

  try {
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
    return { error: 'Erro interno do servidor ao criar post' }
  }
}

export async function deletePost(postId: string) {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })
  const userId = session?.user?.id

  if (!userId) {
    return { error: 'Usuário não autenticado' }
  }

  try {
    const [deletedPost] = await db
      .delete(blogPostsTable)
      .where(
        and(eq(blogPostsTable.id, postId), eq(blogPostsTable.userId, userId))
      )
      .returning()

    if (!deletedPost) {
      return {
        error: 'Post não encontrado ou você não tem permissão para deletar.',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar post:', error)
    return { error: 'Erro ao deletar o post.' }
  }
}
