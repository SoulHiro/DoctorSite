'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Calendar, Tag, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createPost } from '@/actions/blog'
import { Button } from '@/components/ui/button'
import { tagsEnum } from '@/db/schema/tables'
import { useAuthSession } from '@/hooks/use-auth-session'
import { uploadImage } from '@/lib/cloudinary'

import BlogForm from './_components/blog-form'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  content: z.string().min(1, { message: 'Conteúdo é obrigatório' }),
  tags: z
    .array(
      z.enum([
        'noticia',
        'evento',
        'artigo',
        'entrevista',
        'hospital',
        'blog',
        'outro',
      ])
    )
    .min(1, { message: 'Selecione pelo menos uma tag' }),
  imageUrl: z.string().optional(),
  image: z.any().optional(),
})

const BlogCriar = () => {
  const [status, setStatus] = useState<'draft' | 'published'>('published')
  const [editingTitle, setEditingTitle] = useState(false)
  const [showTagSelector, setShowTagSelector] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
      imageUrl: '',
    },
  })

  const { user } = useAuthSession()
  const formData = useWatch({ control: form.control })

  const onSubmit = async () => {
    try {
      const data = form.getValues()
      toast.loading('Criando post...')

      let imageUrl = data.imageUrl || ''

      // Se há um arquivo de imagem, fazer upload primeiro
      if (data.image && data.image instanceof File) {
        toast.loading('Fazendo upload da imagem...')

        try {
          const uploadResult = await uploadImage(data.image, 'blog-posts')
          imageUrl = uploadResult.secure_url
        } catch {
          toast.dismiss()
          toast.error('Erro ao fazer upload da imagem')
          return
        }
      }

      // Mapear status de inglês para português
      const statusMap = {
        draft: 'rascunho',
        published: 'publicado',
      } as const

      const formDataObj = new FormData()
      formDataObj.append('title', data.title)
      formDataObj.append('content', data.content)
      data.tags.forEach((tag) => formDataObj.append('tags', tag))
      formDataObj.append('imageUrl', imageUrl)

      const result = await createPost(formDataObj, statusMap[status])

      toast.dismiss()

      if (result.error) {
        toast.error(result.error)
      } else if (result.success && result.post) {
        let successMessage = 'Post criado com sucesso!'

        if (result.post.status === 'publicado') {
          successMessage = 'Post publicado com sucesso!'
        }

        toast.success(successMessage)

        form.reset()
        setStatus('published')
      }
    } catch (error) {
      toast.dismiss()
      toast.error(error instanceof Error ? error.message : 'Erro ao criar post')
    }
  }

  const handleTitleClick = () => {
    setEditingTitle(true)
  }

  const handleTitleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    form.setValue('title', e.target.value)
    setEditingTitle(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      // Permite quebra de linha com Shift+Enter
      return
    }
    if (e.key === 'Enter') {
      form.setValue('title', e.currentTarget.value)
      setEditingTitle(false)
    }
  }

  const addTag = (tag: string) => {
    const currentTags = form.watch('tags') || []
    if (!currentTags.includes(tag as (typeof tagsEnum.enumValues)[number])) {
      form.setValue('tags', [
        ...currentTags,
        tag as (typeof tagsEnum.enumValues)[number],
      ])
    }
    setShowTagSelector(false)
  }

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.watch('tags') || []
    form.setValue(
      'tags',
      currentTags.filter((tag: string) => tag !== tagToRemove)
    )
  }

  const clearForm = () => {
    form.reset({
      title: '',
      content: '',
      tags: [],
      imageUrl: '',
      image: null,
    })
    setStatus('published')
    setEditingTitle(false)
    setShowTagSelector(false)
    toast.success('Formulário limpo')
  }

  return (
    <div className="min-h-screen">
      <FormProvider {...form}>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {formData.image && formData.image instanceof File ? (
            <Image
              src={URL.createObjectURL(formData.image)}
              alt="Preview da imagem do post"
              fill
              quality={100}
              priority
              className="-z-10 object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-500 to-red-600" />
          )}

          <div className="absolute inset-0 -z-[5] bg-black/60" />

          {/* Header com controles */}
          <div className="relative container mx-auto max-w-6xl px-4 pt-8">
            <div className="flex items-center justify-between">
              <Link
                href="/admin/blog/gerenciar"
                className="inline-flex items-center gap-2 text-white/90 transition-colors duration-200 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Voltar ao Gerenciar</span>
              </Link>

              <div className="flex items-center gap-4">
                {/* Botão de Limpar */}
                <Button
                  onClick={clearForm}
                  variant="outline"
                  size="sm"
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  🗑️ Limpar
                </Button>

                {/* Toggle Status */}
                <div className="flex rounded-lg border border-white/20 bg-white/10 p-1 backdrop-blur-sm">
                  <button
                    onClick={() => setStatus('published')}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      status === 'published'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-white hover:text-white/80'
                    }`}
                  >
                    🚀 Publicar
                  </button>
                  <button
                    onClick={() => setStatus('draft')}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      status === 'draft'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-white hover:text-white/80'
                    }`}
                  >
                    📝 Rascunho
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative container mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl">
              {/* Tags */}
              <div className="relative mb-6 flex flex-wrap justify-center gap-2">
                {formData.tags && formData.tags.length > 0
                  ? formData.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="group inline-flex cursor-pointer items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                        onClick={() => removeTag(tag)}
                        title="Clique para remover"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                        <X className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                    ))
                  : null}

                {/* Botão para adicionar tag */}
                <button
                  onClick={() => setShowTagSelector(!showTagSelector)}
                  className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  ➕ Adicionar Tag
                </button>

                {/* Dropdown de tags */}
                {showTagSelector && (
                  <div className="absolute top-full z-50 mt-2 rounded-lg border bg-white p-2 shadow-lg">
                    <div className="grid grid-cols-2 gap-1">
                      {tagsEnum.enumValues.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => addTag(tag)}
                          className="rounded px-2 py-1 text-left text-sm capitalize hover:bg-gray-100"
                          disabled={formData.tags?.includes(
                            tag as (typeof tagsEnum.enumValues)[number]
                          )}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="animate-fade-in-up">
                {editingTitle ? (
                  <textarea
                    defaultValue={formData.title || ''}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                    className="mb-6 w-full resize-none border-none bg-transparent text-center text-3xl font-bold tracking-tight text-white drop-shadow-lg outline-none placeholder:text-white/70 md:text-4xl lg:text-5xl"
                    placeholder="Escreva seu título aqui..."
                    autoFocus
                    rows={2}
                  />
                ) : (
                  <h1
                    className="mb-6 flex min-h-[4rem] cursor-pointer items-center justify-center rounded-lg p-2 text-center text-3xl font-bold tracking-tight whitespace-pre-wrap text-white drop-shadow-lg transition-colors hover:bg-white/10 md:text-4xl lg:text-5xl"
                    onClick={handleTitleClick}
                  >
                    {formData.title || 'Escreva seu título aqui...'}
                  </h1>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90 md:text-base">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name || 'Autor'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date().toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="container mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-8">
            <BlogForm
              form={form}
              onSubmit={onSubmit}
              status={status}
              setStatus={setStatus}
            />
          </div>
        </section>

        {/* Botão de Publicar flutuante */}
        <section className="fixed right-8 bottom-8 z-50">
          <div>
            <button
              onClick={onSubmit}
              disabled={form.formState.isSubmitting}
              className="rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50"
            >
              {form.formState.isSubmitting
                ? '⏳ Salvando...'
                : status === 'published'
                  ? '🚀 Publicar'
                  : '📝 Salvar Rascunho'}
            </button>
          </div>
        </section>
      </FormProvider>
    </div>
  )
}

export default BlogCriar
