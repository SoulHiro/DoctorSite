'use server'

import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

import { db } from '@/db'
import { blogPostsTable } from '@/db/schema'
import { auth } from '@/lib/auth'

export interface DeletePostResult {
  error?: string
  success?: boolean
}

export const deletePost = async (postId: string): Promise<DeletePostResult> => {
  try {
    const header = await headers()
    const session = await auth.api.getSession({
      headers: header,
    })

    const userId = session?.user?.id

    if (!userId) {
      return { error: 'Usuário não autenticado' }
    }

    const post = await db.query.blogPostsTable.findFirst({
      where: eq(blogPostsTable.id, postId),
    })

    if (!post) {
      return { error: 'Post não encontrado' }
    }

    if (post.userId !== userId) {
      return {
        error: 'Você não tem permissão para deletar este post',
      }
    }

    await db.delete(blogPostsTable).where(eq(blogPostsTable.id, postId))

    return { success: true }
  } catch (error) {
    console.error('erro ao deletar post:', error)
    return { error: 'Erro ao deletar post' }
  }
}
