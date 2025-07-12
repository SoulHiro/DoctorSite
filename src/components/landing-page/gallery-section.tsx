'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const columnsData = [
  // Coluna 1
  [
    {
      id: 1,
      src: '/images/hero-section.webp',
      alt: 'Galeria 1',
      category: 'Hospitais',
      className: 'h-64',
    },
    {
      id: 2,
      src: '/images/hero-section.webp',
      alt: 'Galeria 2',
      category: 'Eventos',
      className: 'h-40',
    },
  ],
  // Coluna 2
  [
    {
      id: 3,
      src: '/images/hero-section.webp',
      alt: 'Galeria 3',
      category: 'Outros',
      className: 'h-48',
    },
    {
      id: 4,
      src: '/images/hero-section.webp',
      alt: 'Galeria 4',
      category: 'Hospitais',
      className: 'h-56',
    },
  ],
  // Coluna 3
  [
    {
      id: 5,
      src: '/images/hero-section.webp',
      alt: 'Galeria 5',
      category: 'Eventos',
      className: 'h-40',
    },
    {
      id: 6,
      src: '/images/hero-section.webp',
      alt: 'Galeria 6',
      category: 'Outros',
      className: 'h-64',
    },
  ],
  // Coluna 4
  [
    {
      id: 8,
      src: '/images/hero-section.webp',
      alt: 'Galeria 8',
      category: 'Eventos',
      className: 'h-56',
    },
    {
      id: 9,
      src: '/images/hero-section.webp',
      alt: 'Galeria 9',
      category: 'Outros',
      className: 'h-48',
    },
  ],
]

const GallerySection = () => {
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
          <Link href="/galeria">
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
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
          {columnsData.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              {column.map(({ id, src, alt, className }) => (
                <div
                  key={id}
                  className={cn(
                    'overflow-hidden rounded-xl border-2 border-white bg-gray-300 shadow-lg transition-all duration-300',
                    className
                  )}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
