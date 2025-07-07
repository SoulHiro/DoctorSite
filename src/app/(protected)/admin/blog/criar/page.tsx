'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createPost } from '@/actions/create-post'

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
      if (status === 'scheduled') {
        // TODO: Implementar agendamento
      } else if (status === 'published') {
        const result = await createPost(data)

        if (result.error) {
          toast.error(result.error)
        } else {
          toast.success('Post criado com sucesso')
          form.reset()
        }
      }
    } catch (error) {
      toast.error(error as string)
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
