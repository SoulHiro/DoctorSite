import { Eye } from 'lucide-react'
import Image from 'next/image'

import { GalleryImage } from '@/types/gallery'

interface ImageGridProps {
  images: GalleryImage[]
  onImageClick: (image: GalleryImage, index: number) => void
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function ImageGrid({ images, onImageClick }: ImageGridProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Grid simples e responsivo */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="group relative">
              {/* Card da imagem */}
              <div className="aspect-square overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1">
                <button
                  onClick={() => onImageClick(image, index)}
                  className="h-full w-full focus:ring-4 focus:ring-blue-500/50 focus:outline-none"
                >
                  <Image
                    fill
                    src={image.url}
                    alt={image.filename}
                    className="h-full w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlay com informações */}
                  <div className="absolute inset-0 flex flex-col justify-between rounded-xl bg-black/60 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-3">
                    {/* Ícone de visualizar */}
                    <div className="flex justify-end">
                      <div className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm sm:p-2">
                        <Eye className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                      </div>
                    </div>

                    {/* Informações da imagem */}
                    <div className="text-left text-white">
                      <p className="text-xs text-white/75">
                        {formatDate(image.takenAt)}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há imagens */}
        {images.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-lg text-gray-400">
              Nenhuma imagem encontrada
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
