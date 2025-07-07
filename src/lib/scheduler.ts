import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { blogPostsTable, newsletterSubscribersTable } from '@/db/schema'
import { createPostEmailData, emailService } from '@/lib/email-service'
import { toLocalISOString } from '@/lib/post-utils'

export interface ScheduledPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  tags: string[]
  scheduledAt: string | null
  userId: string
}

export interface PublishResult {
  success: boolean
  postsPublished: number
  emailsSent: number
  errors: string[]
}

/**
 * Publica posts agendados que chegaram na hora
 */
export const publishScheduledPosts = async (): Promise<PublishResult> => {
  const errors: string[] = []
  let postsPublished = 0
  let emailsSent = 0

  try {
    // -- início pipeline publicação programada
    const now = new Date()
    console.log(
      `Verificando posts agendados em: ${now.toLocaleString('pt-BR')}`
    )

    const scheduledPosts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.status, 'agendado'))

    if (scheduledPosts.length === 0) {
      return { success: true, postsPublished: 0, emailsSent: 0, errors: [] }
    }

    // filtra posts prontos para publicação
    const postsToPublish = scheduledPosts.filter((post) => {
      if (!post.scheduledAt) return false
      const scheduledTime = new Date(post.scheduledAt)
      console.log(
        `Post "${post.title}" agendado para: ${scheduledTime.toLocaleString('pt-BR')}`
      )
      return scheduledTime <= now
    })

    console.log(`Encontrados ${postsToPublish.length} posts para publicar`)

    if (postsToPublish.length === 0) {
      return { success: true, postsPublished: 0, emailsSent: 0, errors: [] }
    }

    // obtém assinantes ativos
    const activeSubscribers = await db
      .select()
      .from(newsletterSubscribersTable)
      .where(eq(newsletterSubscribersTable.status, 'ativo'))

    console.log(`Encontrados ${activeSubscribers.length} assinantes ativos`)

    // itera posts e publica
    for (const post of postsToPublish) {
      try {
        // marca como publicado no BD e limpa scheduledAt
        await db
          .update(blogPostsTable)
          .set({
            status: 'publicado',
            publishedAt: now.toISOString(),
            scheduledAt: null,
          })
          .where(eq(blogPostsTable.id, post.id))

        console.log(`Post publicado: ${post.title}`)
        postsPublished++

        // dispara email se houver assinantes
        if (activeSubscribers.length > 0) {
          const postEmailData = createPostEmailData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            tags: post.tags,
          })

          const emailResult = await emailService.sendNewPostNotification(
            postEmailData,
            activeSubscribers
          )

          emailsSent += emailResult.sent

          if (emailResult.errors.length > 0) {
            errors.push(...emailResult.errors)
          }
        }
      } catch (error) {
        const errorMessage = `Erro ao publicar post "${post.title}": ${error}`
        console.error(errorMessage)
        errors.push(errorMessage)
      }
    }

    return {
      success: true,
      postsPublished,
      emailsSent,
      errors,
    }
  } catch (error) {
    const errorMessage = `Erro geral ao publicar posts: ${error}`
    console.error(errorMessage)
    return {
      success: false,
      postsPublished,
      emailsSent,
      errors: [errorMessage],
    }
  }
}

// Agenda um post para publicação
export const schedulePost = async (
  postId: string,
  scheduledAt: Date
): Promise<{ success: boolean; message: string }> => {
  try {
    const now = new Date()

    if (scheduledAt <= now) {
      return {
        success: false,
        message: 'Data de agendamento deve ser no futuro',
      }
    }

    await db
      .update(blogPostsTable)
      .set({
        status: 'agendado',
        scheduledAt: toLocalISOString(scheduledAt),
      })
      .where(eq(blogPostsTable.id, postId))

    console.log(
      `Post ${postId} agendado para ${scheduledAt.toLocaleString('pt-BR')}`
    )

    return {
      success: true,
      message: 'Post agendado com sucesso',
    }
  } catch (error) {
    console.error('Erro ao agendar post:', error)
    return {
      success: false,
      message: 'Erro ao agendar post',
    }
  }
}

// Cancela o agendamento de um post
export const cancelScheduledPost = async (
  postId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await db
      .update(blogPostsTable)
      .set({
        status: 'rascunho',
        scheduledAt: null,
      })
      .where(eq(blogPostsTable.id, postId))

    console.log(`Agendamento cancelado para post ${postId}`)

    return {
      success: true,
      message: 'Agendamento cancelado com sucesso',
    }
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error)
    return {
      success: false,
      message: 'Erro ao cancelar agendamento',
    }
  }
}

// Lista posts agendados
export const getScheduledPosts = async () => {
  try {
    const scheduledPosts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.status, 'agendado'))

    return scheduledPosts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      tags: post.tags,
      scheduledAt: post.scheduledAt,
      createdAt: post.createdAt,
    }))
  } catch (error) {
    console.error('Erro ao buscar posts agendados:', error)
    return []
  }
}
