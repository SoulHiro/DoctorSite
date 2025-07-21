'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

// Lista fixa de municípios (exemplo SP)
const MUNICIPALITIES = [
  'São Paulo',
  'Campinas',
  'Santos',
  'Ribeirão Preto',
  'Sorocaba',
  'Bauru',
  'Presidente Prudente',
  'São José dos Campos',
  'Mogi das Cruzes',
  'Guarulhos',
]

const schema = z.object({
  images: z.array(z.instanceof(File)).min(1, 'Selecione pelo menos uma imagem'),
  takenAt: z.date({ required_error: 'Selecione a data da foto' }),
  municipality: z.string().min(1, 'Selecione o município'),
})

type FormData = z.infer<typeof schema>

export default function GalleryUploadPage() {
  const [previews, setPreviews] = useState<string[]>([])
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      images: [],
      takenAt: undefined,
      municipality: '',
    },
  })

  const images = watch('images')

  // Preview das imagens
  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const arr = Array.from(files)
    setValue('images', arr, { shouldValidate: true })
    setPreviews(arr.map((file) => URL.createObjectURL(file)))
  }

  const removeImage = (idx: number) => {
    const newImages = images.filter((_, i) => i !== idx)
    setValue('images', newImages, { shouldValidate: true })
    setPreviews(newImages.map((file) => URL.createObjectURL(file)))
  }

  const onSubmit = async () => {
    // TODO: upload para Cloudinary e salvar no banco
    toast.info('Upload iniciado (mock)')
  }

  return (
    <div className="mx-auto max-w-xl py-10">
      <h1 className="mb-6 text-2xl font-bold">Upload de Imagens da Galeria</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="mb-1 block font-medium">Imagens</label>
          <Input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />
          {errors.images && (
            <p className="mt-1 text-sm text-red-500">{errors.images.message}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-4">
            {previews.map((src, idx) => (
              <div key={src} className="relative h-24 w-24">
                <Image
                  width={400}
                  height={400}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="h-full w-full rounded border object-cover"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
                  onClick={() => removeImage(idx)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 block font-medium">Data/Hora da Foto</label>
          <Controller
            control={control}
            name="takenAt"
            render={({ field }) => (
              <Input
                type="datetime-local"
                value={
                  field.value
                    ? new Date(field.value).toISOString().slice(0, 16)
                    : ''
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? new Date(e.target.value) : undefined
                  )
                }
              />
            )}
          />
          {errors.takenAt && (
            <p className="mt-1 text-sm text-red-500">
              {errors.takenAt.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block font-medium">Município</label>
          <Controller
            control={control}
            name="municipality"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>Selecione...</SelectTrigger>
                <SelectContent>
                  {MUNICIPALITIES.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.municipality && (
            <p className="mt-1 text-sm text-red-500">
              {errors.municipality.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Imagens'}
        </Button>
      </form>
    </div>
  )
}
