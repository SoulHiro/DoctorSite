'use client'
import { UseFormReturn } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Tiptap from '@/components/ui/Tiptap'

import { ChooseFile } from './form/choose-file'

interface BlogFormData {
  title: string
  content: string
  tags: (
    | 'noticia'
    | 'evento'
    | 'artigo'
    | 'entrevista'
    | 'hospital'
    | 'blog'
    | 'outro'
  )[]
  imageUrl?: string
  image?: File
}

interface BlogFormProps {
  form: UseFormReturn<BlogFormData>
  onSubmit: (data: BlogFormData) => void
  status: 'draft' | 'published'
  setStatus: (status: 'draft' | 'published') => void
}

const BlogForm = ({ form, onSubmit }: BlogFormProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="rounded-2xl border bg-white p-8 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ChooseFile
                      onFilesAccepted={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Conteúdo
                  </FormLabel>
                  <FormControl>
                    <Tiptap value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default BlogForm
