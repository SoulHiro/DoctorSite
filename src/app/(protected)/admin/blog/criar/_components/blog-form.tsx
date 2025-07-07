'use client'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
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
import ScheduleComponent from './form/schedule'
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
  status: 'draft' | 'scheduled' | 'published'
  setStatus: (status: 'draft' | 'scheduled' | 'published') => void
}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex h-full w-full flex-col space-y-4 rounded-md border bg-white p-6 shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-800">✍️ Criar Post</h2>
          <p className="text-sm text-gray-600">Preencha os campos abaixo</p>
        </div>
        <div className="flex items-center gap-2">
          <ToggleOptions
            value={status}
            onChange={(value) =>
              setStatus(value as 'draft' | 'scheduled' | 'published')
            }
          />
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite o título do post..."
                    {...field}
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
                <FormLabel>Conteúdo</FormLabel>
                <FormControl>
                  <textarea
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Escreva o conteúdo do seu post aqui..."
                    {...field}
                    onChange={(e) => field.onChange(e)}
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <ChooseFile onFilesAccepted={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {status === 'scheduled' && (
            <FormField
              control={form.control}
              name="shedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agendar para</FormLabel>
                  <FormControl>
                    <ScheduleComponent
                      date={field.value}
                      setDate={field.onChange}
                      open={open}
                      setOpen={setOpen}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="mt-auto flex gap-2 pt-4">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              onClick={() => console.log(form.formState)}
              className="flex-1"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : status === 'published' ? (
                '🚀 Publicar'
              ) : status === 'scheduled' ? (
                '⏰ Agendar'
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
