'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createPost } from '@/actions/blog'
import { formatDate } from '@/lib/post-utils'

import BlogForm from './_components/blog-form'
import BlogPreview from './_components/preview'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  content: z.string().min(1, { message: 'Conteúdo é obrigatório' }),
  tags: z
    .array(z.enum(['noticia', 'evento', 'artigo', 'outro']))
    .min(1, { message: 'Selecione pelo menos uma tag' }),
  imageUrl: z.string().optional(),
  image: z.any().optional(),
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
      imageUrl: '',
      shedule: undefined,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast.loading('Criando post...')
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    data.tags.forEach((tag) => formData.append('tags', tag))
    if (typeof data.imageUrl === 'string') {
      formData.append('imageUrl', data.imageUrl)
    }
    if (data.shedule) {
      formData.append('shedule', data.shedule.toISOString())
    }
    formData.append('status', status)

    const result = await createPost(formData)

    toast.dismiss()

    if (result.error) {
      toast.error(result.error)
    } else if (result.success && result.post) {
      let successMessage = 'Post criado com sucesso!'

      if (result.post.status === 'agendado' && result.post.scheduledAt) {
        const scheduledDate = new Date(result.post.scheduledAt)
        successMessage = `Post agendado para ${formatDate(scheduledDate, true)}`
      } else if (result.post.status === 'publicado') {
        successMessage = 'Post publicado com sucesso!'
      }

      toast.success(successMessage)

      form.reset()
      setStatus('published')
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
