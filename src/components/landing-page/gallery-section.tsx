'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getImages } from '@/actions/gallery'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ColumnItem {
  id: string | number
  src: string
  alt: string
  municipality: string
  className: string
}

const GallerySection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [columnsData, setColumnsData] = useState<ColumnItem[][]>([])

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const images = await getImages()

        // Se temos imagens reais, organizá-las em colunas
        if (images.length > 0) {
          const heights = [
            'h-64',
            'h-40',
            'h-48',
            'h-56',
            'h-40',
            'h-64',
            'h-56',
            'h-48',
          ]
          const realColumns: ColumnItem[][] = [[], [], [], []]

          // Distribuir as primeiras 8 imagens nas 4 colunas (2 por coluna)
          images.slice(0, 8).forEach((image, index) => {
            const columnIndex = Math.floor(index / 2)
            realColumns[columnIndex].push({
              id: image.id,
              src: image.url,
              alt: `${image.municipality} - ${image.filename}`,
              municipality: image.municipality,
              className: heights[index],
            })
          })

          setColumnsData(realColumns)
        }
      } catch (error) {
        console.error('Erro ao buscar imagens da galeria:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryImages()
  }, [])

  return (
    <section className="w-full space-y-8">
      <div className="relative h-[350px] w-full border-y">
        <div
          className="h-full w-full bg-cover bg-fixed bg-center"
          style={{ backgroundImage: `url('/images/hero-section.webp')` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col items-center justify-center space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">
              Nossa Galeria de Momentos
            </h2>
            <p className="text-md max-w-2xl text-center text-white/90">
              Explore nossa galeria e veja de perto o impacto que um sorriso
              pode causar.
            </p>
          </div>
          <Link href="/gallery">
            <Button
              size="default"
              className="w-fit rounded-full bg-red-500 font-semibold text-white shadow transition duration-300 hover:scale-105 hover:bg-red-600"
            >
              Ver Galeria Completa
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative -top-24 z-20 mx-auto mb-[-4rem] max-w-6xl px-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-600">Carregando galeria...</div>
          </div>
        ) : (
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
            {columnsData.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4">
                {column.map(({ id, src, alt, municipality, className }) => (
                  <div
                    key={id}
                    className={cn(
                      'group overflow-hidden rounded-xl border-2 border-white bg-gray-300 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl',
                      className
                    )}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={src}
                        alt={alt}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Overlay com informação do município */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-medium">{municipality}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default GallerySection
