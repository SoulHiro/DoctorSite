'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createPost } from '@/actions/create-post'
import { formatDate } from '@/lib/post-utils'

import BlogForm from './_components/blog-form'
import BlogPreview from './_components/preview'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  content: z.string().min(1, { message: 'Conteúdo é obrigatório' }),
  tags: z
    .array(z.enum(['noticia', 'evento', 'artigo', 'outro']))
    .min(1, { message: 'Selecione pelo menos uma tag' }),
  image: z.instanceof(File).optional(),
  shedule: z.date().optional(),
})

const BlogCriar = () => {
  const [status, setStatus] = useState<'draft' | 'scheduled' | 'published'>(
    'published'
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: ['noticia'],
      image: undefined,
      shedule: undefined,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Validação específica para agendamento
      if (status === 'scheduled') {
        if (!data.shedule) {
          toast.error('Selecione uma data e hora para agendamento')
          return
        }

        const now = new Date()
        if (data.shedule <= now) {
          toast.error('A data de agendamento deve ser no futuro')
          return
        }
      }

      const result = await createPost(data, status)

      if (result.error) {
        toast.error(result.error)
      } else if (result.success && result.post) {
        // Mensagem de sucesso personalizada baseada no status
        let successMessage = 'Post criado com sucesso!'

        if (result.post.status === 'agendado' && result.post.scheduledAt) {
          const scheduledDate = new Date(result.post.scheduledAt)
          successMessage = `Post agendado para ${formatDate(scheduledDate, true)}`
        } else if (result.post.status === 'publicado') {
          successMessage = 'Post publicado com sucesso!'
        }

        toast.success(successMessage)

        // Reset do formulário
        form.reset()
        setStatus('published')
      }
    } catch (error) {
      console.error('Erro ao criar post:', error)
      toast.error('Erro inesperado ao criar post')
    }
  }

  return (
    <div className="grid h-screen w-full grid-cols-2 gap-4 p-8">
      <FormProvider {...form}>
        <BlogForm
          formSchema={formSchema}
          form={form}
          onSubmit={onSubmit}
          status={status}
          setStatus={setStatus}
        />
        <BlogPreview />
      </FormProvider>
    </div>
  )
}

export default BlogCriar
