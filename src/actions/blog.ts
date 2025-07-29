'use server'

import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { z } from 'zod'

import { blogPostsTable, db } from '@/db'
import { auth } from '@/lib/auth'
import {
  generateExcerpt,
  generateSlug,
  validatePostData,
} from '@/lib/post-utils'

// Função simples para formatar data sem segundos e milissegundos
const formatDateForDB = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`
}

const createPostSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  content: z.string().min(1, { message: 'Conteúdo é obrigatório' }),
  tags: z
    .array(z.enum(['noticia', 'evento', 'artigo', 'outro']))
    .min(1, { message: 'Selecione pelo menos uma tag' }),
  imageUrl: z.string().optional(),
  status: z.enum(['rascunho', 'publicado']),
})

export async function createPost(
  formData: FormData,
  status: 'rascunho' | 'publicado'
) {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })
  const userId = session?.user?.id

  if (!userId) {
    return { error: 'Usuário não autenticado' }
  }

  // Extrair e converter os dados do FormData
  const rawTags = formData.getAll('tags')
  const tags = Array.isArray(rawTags) ? rawTags : [rawTags]

  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    tags: tags as string[],
    imageUrl: formData.get('imageUrl') as string,
    status,
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
    status: formStatus,
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
    imageUrl,
  }

  // Validação extra (campos obrigatórios, regras de negócio)
  const validation = validatePostData(postData)
  if (!validation.isValid) {
    return { error: validation.errors.join(', ') }
  }

  // Determinar status final
  const finalStatus: 'rascunho' | 'publicado' =
    formStatus === 'publicado' ? 'publicado' : 'rascunho'

  const excerpt = generateExcerpt(postData.content)

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
    publishedAt:
      finalStatus === 'publicado' ? formatDateForDB(new Date()) : null,
  }

  try {
    const [newPost] = await db
      .insert(blogPostsTable)
      .values(insertData)
      .returning()

    return {
      success: true,
      post: {
        id: newPost.id,
        title: newPost.title,
        slug: newPost.slug,
        content: newPost.content,
        excerpt: newPost.excerpt,
        status: newPost.status,
        tags: newPost.tags,
        imageUrl: newPost.imageUrl,
        publishedAt: newPost.publishedAt,
        createdAt: newPost.createdAt,
      },
    }
  } catch (error) {
    console.error('Erro ao criar post:', error)
    return { error: 'Erro interno ao criar post' }
  }
}

export async function getPosts() {
  try {
    const posts = await db.query.blogPostsTable.findMany({
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    })

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status,
      author: post.user.name,
      authorId: post.userId,
      tags: post.tags,
      imageUrl: post.imageUrl,
      publishedAt: post.publishedAt
        ? formatDateForDB(new Date(post.publishedAt))
        : null,
      createdAt: formatDateForDB(new Date(post.createdAt)),
    }))
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    return []
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

export async function getPostBySlug(slug: string) {
  try {
    const post = await db.query.blogPostsTable.findFirst({
      where: (posts, { eq }) => eq(posts.slug, slug),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!post) {
      return null
    }

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status,
      author: post.user.name,
      authorId: post.userId,
      tags: post.tags,
      imageUrl: post.imageUrl,
      publishedAt: post.publishedAt
        ? formatDateForDB(new Date(post.publishedAt))
        : null,
      createdAt: formatDateForDB(new Date(post.createdAt)),
    }
  } catch (error) {
    console.error('Erro ao buscar post por slug:', error)
    return null
  }
}
