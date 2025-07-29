'use client'
import { Loader2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { ChooseFile } from './form/choose-file'
import { TagsSelector } from './form/tag-selector'
import ToggleOptions from './form/toggle-options'

const BlogForm = ({
  formSchema,
  form,
  onSubmit,
  status,
  setStatus,
}: {
  formSchema: z.ZodSchema
  form: UseFormReturn<z.infer<typeof formSchema>>
  onSubmit: (data: z.infer<typeof formSchema>) => void
  status: 'draft' | 'published'
  setStatus: (status: 'draft' | 'published') => void
}) => {
  return (
    <div className="bg-card text-card-foreground flex h-full flex-col space-y-4 rounded-lg border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Criar Post</h2>
        <ToggleOptions
          value={status}
          onChange={(value) => setStatus(value as 'draft' | 'published')}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título do post" {...field} />
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
                <FormLabel>Conteúdo</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Digite o conteúdo do post"
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[200px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagsSelector value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <ChooseFile
                    onFilesAccepted={(file: File | null) =>
                      field.onChange(file)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-auto flex gap-2 pt-4">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="flex-1"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : status === 'published' ? (
                '🚀 Publicar'
              ) : (
                '📝 Rascunho'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              🗑️ Limpar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default BlogForm
