'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ColumnItem, GalleryData } from '@/types/gallery-section'

interface GallerySectionClientProps {
  galleryData: GalleryData
}

const GallerySectionClient = ({ galleryData }: GallerySectionClientProps) => {
  const hasImages =
    galleryData.mobile.length > 0 || galleryData.desktop.length > 0

  return (
    <section className="w-full space-y-8">
      <div className="relative h-[350px] w-full border-y">
        <div
          className="h-full w-full bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: `url('/images/hero-section.webp')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-4">
          <div className="text-center">
            <h2 className="text-white">Nossa Galeria de Momentos</h2>
            <p className="text-center text-white/90">
              Explore nossa galeria e veja de perto o impacto que um sorriso
              pode causar.
            </p>
          </div>
          <Link href="/galeria">
            <Button size="default" variant="default">
              Ver Galeria Completa
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative -top-12 z-20 mx-auto mb-[-3rem] max-w-6xl px-4 md:-top-24 md:mb-[-4rem]">
        {!hasImages ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-600">Nenhuma imagem encontrada.</div>
          </div>
        ) : (
          <>
            {/* Versão Mobile - 4 fotos em 2 colunas */}
            <div className="grid w-full grid-cols-2 gap-4 md:hidden">
              {galleryData.mobile.map(
                (column: ColumnItem[], colIndex: number) => (
                  <div key={colIndex} className="flex flex-col gap-4">
                    {column.map(
                      ({
                        id,
                        src,
                        alt,
                        municipality,
                        className,
                      }: ColumnItem) => (
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <div className="absolute bottom-4 left-4 text-white">
                                <p className="text-sm font-medium">
                                  {municipality}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )
              )}
            </div>

            {/* Versão Desktop - 8 fotos em 4 colunas */}
            <div className="hidden w-full grid-cols-4 gap-4 md:grid">
              {galleryData.desktop?.map((column, colIndex) => (
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-sm font-medium">
                              {municipality}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default GallerySectionClient
