import { Resend } from 'resend'

import { NewPostEmail } from '@/lib/resend/templates/newPost'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailService {
  sendNewPostNotification: (
    postData: PostEmailData,
    subscribers: Subscriber[]
  ) => Promise<EmailResult>
  sendTestEmail: (to: string) => Promise<EmailResult>
}

export interface PostEmailData {
  title: string
  slug: string
  excerpt: string | null
  tags: string[]
  url: string
}

export interface Subscriber {
  email: string
  name: string | null
}

export interface EmailResult {
  success: boolean
  sent: number
  failed: number
  errors: string[]
}

class EmailServiceImpl implements EmailService {
  private readonly batchSize = 50
  private readonly retryAttempts = 3
  private readonly retryDelay = 1000

  async sendNewPostNotification(
    postData: PostEmailData,
    subscribers: Subscriber[]
  ): Promise<EmailResult> {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não configurado')
      return {
        success: false,
        sent: 0,
        failed: subscribers.length,
        errors: ['Chave API do Resend não configurada'],
      }
    }

    if (subscribers.length === 0) {
      console.log('Nenhum assinante para enviar email')
      return {
        success: true,
        sent: 0,
        failed: 0,
        errors: [],
      }
    }

    const result: EmailResult = {
      success: true,
      sent: 0,
      failed: 0,
      errors: [],
    }

    try {
      const batches = this.createBatches(subscribers, this.batchSize)

      console.log(
        `Enviando emails para ${subscribers.length} assinantes em ${batches.length} lotes`
      )

      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i]
        console.log(
          `Processando lote ${i + 1}/${batches.length} (${batch.length} emails)`
        )

        const batchResult = await this.sendBatch(postData, batch)
        result.sent += batchResult.sent
        result.failed += batchResult.failed
        result.errors.push(...batchResult.errors)

        if (i < batches.length - 1) {
          await this.sleep(1000)
        }
      }

      console.log(
        `Emails enviados: ${result.sent} sucesso, ${result.failed} falhas`
      )
      return result
    } catch (error) {
      console.error('Erro geral ao enviar emails:', error)
      return {
        success: false,
        sent: result.sent,
        failed: subscribers.length - result.sent,
        errors: [...result.errors, `Erro geral: ${error}`],
      }
    }
  }

  private async sendBatch(
    postData: PostEmailData,
    subscribers: Subscriber[]
  ): Promise<EmailResult> {
    const result: EmailResult = {
      success: true,
      sent: 0,
      failed: 0,
      errors: [],
    }

    const emailPromises = subscribers.map(async (subscriber) => {
      try {
        await this.sendSingleEmail(postData, subscriber)
        result.sent++
      } catch (error) {
        result.failed++
        const errorMessage = `Erro ao enviar para ${subscriber.email}: ${error}`
        result.errors.push(errorMessage)
        console.error(errorMessage)
      }
    })

    await Promise.all(emailPromises)
    return result
  }

  // Envia um email individual com retry
  private async sendSingleEmail(
    postData: PostEmailData,
    subscriber: Subscriber,
    attempt = 1
  ): Promise<void> {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noticias@doutorespalhacos.com',
        to: subscriber.email,
        subject: `📢 Novo post: ${postData.title}`,
        react: NewPostEmail({
          post: postData,
          subscriber: {
            name: subscriber.name || 'Assinante',
            email: subscriber.email,
          },
        }),
      })
    } catch (error) {
      if (attempt < this.retryAttempts) {
        console.log(
          `Retry ${attempt}/${this.retryAttempts} para ${subscriber.email}`
        )
        await this.sleep(this.retryDelay * attempt)
        return this.sendSingleEmail(postData, subscriber, attempt + 1)
      }
      throw error
    }
  }

  // Envia um email de teste
  async sendTestEmail(to: string): Promise<EmailResult> {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noticias@doutorespalhacos.com',
        to,
        subject: 'Teste de envio de email',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>✅ Teste de Email</h1>
            <p>Este é um email de teste enviado em ${new Date().toLocaleString('pt-BR')}.</p>
            <p>Se você recebeu este email, o serviço de email está funcionando corretamente!</p>
          </div>
        `,
      })

      return {
        success: true,
        sent: 1,
        failed: 0,
        errors: [],
      }
    } catch (error) {
      return {
        success: false,
        sent: 0,
        failed: 1,
        errors: [`Erro ao enviar teste: ${error}`],
      }
    }
  }

  // Divide um array em lotes
  private createBatches<T>(array: T[], size: number): T[][] {
    const batches: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      batches.push(array.slice(i, i + size))
    }
    return batches
  }

  // Pausa a execução por um tempo
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const emailService = new EmailServiceImpl()

// Cria dados do email a partir de um post
export const createPostEmailData = (post: {
  title: string
  slug: string
  excerpt: string | null
  tags: string[]
}): PostEmailData => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return {
    ...post,
    url: `${baseUrl}/blog/${post.slug}`,
  }
}
