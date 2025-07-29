'use client'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

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

const BlogForm = ({
  formSchema,
  form,
  onSubmit,
}: {
  formSchema: z.ZodSchema
  form: UseFormReturn<z.infer<typeof formSchema>>
  onSubmit: (data: z.infer<typeof formSchema>) => void
  status: 'draft' | 'published'
  setStatus: (status: 'draft' | 'published') => void
}) => {
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
