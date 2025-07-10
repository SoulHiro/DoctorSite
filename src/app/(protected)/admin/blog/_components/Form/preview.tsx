import Image from 'next/image'
import { useFormContext, useWatch } from 'react-hook-form'

import { Separator } from '@/components/ui/separator'
import { tagsEnum } from '@/db/schema/tables'
import { authClient } from '@/lib/auth-client'

const BlogPreview = () => {
  const { control } = useFormContext()

  const formData = useWatch({ control })

  const getTagLabel = (tagValue: string) => {
    return tagsEnum.enumValues.find((tag) => tag === tagValue) || tagValue
  }

  const { data: session } = authClient.useSession()

  return (
    <div className="flex h-full w-full flex-col space-y-4 rounded-md border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          📝 Preview do Post
        </h2>
        <p className="text-sm text-gray-600">Visualize como seu post ficará</p>
      </div>

      <Separator />

      <div className="flex-1 space-y-6">
        {formData.image ? (
          <div className="space-y-3">
            <div className="relative w-full overflow-hidden rounded-lg border">
              <Image
                src={URL.createObjectURL(formData.image)}
                alt="Preview da imagem do post"
                className="h-auto w-full object-contain"
                width={800}
                height={600}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
              {/* Fade */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/70 via-black/60 to-transparent" />
              {/* Título Sobreposto */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <h1 className="text-center text-2xl font-bold text-white drop-shadow-lg">
                  {formData.title || 'Título do post'}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
            <div className="text-center text-gray-500">
              <div className="mb-2 text-4xl">🖼️</div>
              <p className="text-sm">Imagem do post aparecerá aqui</p>
            </div>
          </div>
        )}

        {/* Título*/}
        <div className="space-y-2">
          <h1
            className={`text-2xl font-bold ${
              formData.title ? 'text-gray-900' : 'text-gray-400 italic'
            }`}
          >
            {formData.title || 'Título do seu post aqui'}
          </h1>
          <div className="text-sm text-gray-500">
            📅 {new Date().toLocaleDateString('pt-BR')} • ✍️{' '}
            {session?.user?.name}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="space-y-4">
          <div className="prose prose-sm max-w-full">
            {formData.content ? (
              formData.content
                .split('\n')
                .map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 break-words text-gray-700">
                    {paragraph || '\u00A0'}
                  </p>
                ))
            ) : (
              <p className="leading-relaxed text-gray-500 italic">
                O conteúdo do seu post será exibido aqui. Conforme você digita
                no formulário ao lado, o preview será atualizado em tempo real.
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">🏷️ Tags</h3>
          <div className="flex flex-wrap gap-2">
            {formData.tags && formData.tags.length > 0 ? (
              formData.tags.map((tag: string, index: number) => {
                const colors = [
                  'bg-blue-100 text-blue-800',
                  'bg-green-100 text-green-800',
                  'bg-purple-100 text-purple-800',
                  'bg-orange-100 text-orange-800',
                  'bg-pink-100 text-pink-800',
                  'bg-indigo-100 text-indigo-800',
                ]
                return (
                  <span
                    key={`${tag}-${index}`}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      colors[index % colors.length]
                    }`}
                  >
                    {getTagLabel(tag)}
                  </span>
                )
              })
            ) : (
              <>
                {tagsEnum.enumValues.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPreview
