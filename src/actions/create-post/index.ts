'use server'

import { headers } from 'next/headers'
import z from 'zod'

import { db } from '@/db'
import { blogPostsTable } from '@/db/schema'
import { auth } from '@/lib/auth'

const createPostSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  content: z.string().min(1, { message: 'Conteúdo é obrigatório' }),
  tags: z
    .array(z.enum(['noticia', 'evento', 'artigo', 'outro']))
    .min(1, { message: 'Selecione pelo menos uma tag' }),
  image: z.instanceof(File).optional(),
  shedule: z.date().optional(),
})

export const createPost = async (data: z.infer<typeof createPostSchema>) => {
  try {
    const validatedData = createPostSchema.parse(data)

    const headersList = await headers()
    const session = await auth.api.getSession({
      headers: headersList,
    })
    const userId = session?.user?.id

    if (!userId) {
      return { error: 'Usuário não autenticado' }
    }

    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }

    const slug = generateSlug(validatedData.title)

    const [newPost] = await db
      .insert(blogPostsTable)
      .values({
        title: validatedData.title,
        content: validatedData.content,
        slug,
        userId,
        status: 'publicado',
        tags: validatedData.tags,
        viewCount: 0,
        publishedAt: new Date().toISOString(),
        excerpt: validatedData.content.substring(0, 100),
      })
      .returning()

    return { success: true, post: newPost }
  } catch (error) {
    return { error: 'Erro ao criar post: ' + (error as Error).message }
  }
}
