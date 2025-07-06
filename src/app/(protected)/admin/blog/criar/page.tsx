'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import BlogForm from './_components/blog-form'
import BlogPreview from './_components/preview'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  content: z.string().min(1, { message: 'Conteúdo é obrigatório' }),
  tags: z.array(z.string()).min(1, { message: 'Selecione pelo menos uma tag' }),
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
      tags: [],
      image: undefined,
      shedule: undefined,
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const postData = {
      ...data,
      status: status,
      publishedAt: status === 'published' ? new Date() : undefined,
      scheduledFor: status === 'scheduled' ? data.shedule : undefined,
    }

    if (status === 'scheduled') {
      console.log('📅 Agendado para:', data.shedule, postData)
    } else if (status === 'published') {
      console.log('🚀 Publicado imediatamente:', postData)
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
