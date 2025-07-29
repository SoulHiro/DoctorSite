'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createPost } from '@/actions/blog'
import { BlogPost } from '@/types/blog-types'

import BlogForm from './blog-form'
import BlogPreview from './preview'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  content: z.string().min(1, { message: 'Conteúdo é obrigatório' }),
  tags: z
    .array(z.enum(['noticia', 'evento', 'artigo', 'outro']))
    .min(1, { message: 'Selecione pelo menos uma tag' }),
  image: z.instanceof(File).optional(),
})

interface BlogFormContainerProps {
  mode: 'create' | 'edit'
  initialData?: BlogPost
  postId?: string
}

const BlogFormContainer = ({}: BlogFormContainerProps) => {
  const [status, setStatus] = useState<'draft' | 'published'>('published')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: ['noticia'],
      image: undefined,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      let imageUrl: string | undefined

      // Se há uma imagem, fazer upload primeiro
      if (data.image) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', data.image)
        uploadFormData.append('folder', 'blog-posts')

        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadFormData,
        })

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          throw new Error(errorData.error || 'Erro ao fazer upload da imagem')
        }

        const uploadResult = await uploadResponse.json()
        imageUrl = uploadResult.secure_url
      }

      // Converter dados para FormData
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)

      // Adicionar tags como múltiplos valores
      data.tags.forEach((tag) => {
        formData.append('tags', tag)
      })

      // Adicionar URL da imagem se existir
      if (imageUrl) {
        formData.append('imageUrl', imageUrl)
      }

      // Converter status para o formato esperado pela action
      const postStatus = status === 'published' ? 'publicado' : 'rascunho'

      const result = await createPost(formData, postStatus)

      if (result.error) {
        toast.error(result.error)
      } else if (result.success && result.post) {
        // Mensagem de sucesso personalizada baseada no status
        let successMessage = 'Post criado com sucesso!'

        if (result.post.status === 'publicado') {
          successMessage = 'Post publicado com sucesso!'
        }

        toast.success(successMessage)

        // Reset do formulário
        form.reset()
        setStatus('published')
      }
    } catch (error) {
      console.error('Erro ao criar post:', error)
      toast.error(
        error instanceof Error ? error.message : 'Erro inesperado ao criar post'
      )
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

export default BlogFormContainer
