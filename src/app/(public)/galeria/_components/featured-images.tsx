'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { getImages } from '@/actions/gallery'

interface GalleryImage {
  id: string
  url: string
  filename: string
  municipality: string
  takenAt: string
  author: string
  authorId: string
  createdAt: string
}

interface GalleryFeaturedImagesProps {
  filteredImages?: GalleryImage[]
}

const GalleryFeaturedImages = ({
  filteredImages,
}: GalleryFeaturedImagesProps) => {
  const [featuredImages, setFeaturedImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedImages = async () => {
      try {
        // Se temos imagens filtradas, usar elas
        if (filteredImages && filteredImages.length > 0) {
          setFeaturedImages(filteredImages.slice(0, 8))
          setIsLoading(false)
          return
        }

        // Caso contrário, buscar todas as imagens
        const images = await getImages()

        // Garantir diversidade de municípios
        const diverseImages = getDiverseImages(images, 8)
        setFeaturedImages(diverseImages)
      } catch (error) {
        console.error('Erro ao buscar imagens em destaque:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFeaturedImages()
  }, [filteredImages])

  // Função para obter imagens diversificadas por município
  const getDiverseImages = (images: GalleryImage[], count: number) => {
    if (images.length === 0) return []

    // Agrupar imagens por município
    const imagesByMunicipality = images.reduce(
      (acc, image) => {
        if (!acc[image.municipality]) {
          acc[image.municipality] = []
        }
        acc[image.municipality].push(image)
        return acc
      },
      {} as Record<string, GalleryImage[]>
    )

    const municipalities = Object.keys(imagesByMunicipality)
    const diverseImages: GalleryImage[] = []
    let municipalityIndex = 0
    let imageIndex = 0

    // Pegar imagens de municípios diferentes
    for (let i = 0; i < count && diverseImages.length < count; i++) {
      const currentMunicipality =
        municipalities[municipalityIndex % municipalities.length]
      const municipalityImages = imagesByMunicipality[currentMunicipality]

      if (municipalityImages && municipalityImages.length > 0) {
        const image = municipalityImages[imageIndex % municipalityImages.length]
        diverseImages.push(image)

        // Avançar para próximo município a cada imagem
        municipalityIndex++
        imageIndex++
      }
    }

    return diverseImages
  }

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-xl text-transparent md:text-2xl lg:text-3xl">
                Momentos em Destaque
              </h2>
            </div>
            <div className="flex items-center justify-center py-24">
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 rounded-full bg-orange-500" />
                <div className="h-4 w-4 rounded-full bg-pink-500" />
                <div className="h-4 w-4 rounded-full bg-yellow-500" />
                <span className="ml-3 text-slate-600">
                  Carregando momentos especiais...
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (featuredImages.length === 0) {
    return (
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-xl text-transparent md:text-2xl lg:text-3xl">
                Momentos em Destaque
              </h2>
            </div>
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="mb-4 text-6xl">📸</div>
                <div className="text-slate-600">Nenhuma imagem encontrada.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Dividir imagens para layout magazine
  const mainImage = featuredImages[0]
  const secondaryImages = featuredImages.slice(1, 5)
  const gridImages = featuredImages.slice(5, 8)

  const fadeUpAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header da seção */}
          <motion.div className="space-y-4 text-center" {...fadeUpAnimation}>
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 p-3">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-xl text-transparent md:text-2xl lg:text-3xl">
              Momentos em Destaque
            </h2>
            <p className="text-md mx-auto max-w-4xl leading-relaxed text-slate-600">
              Cada foto conta uma história única de alegria, esperança e
              transformação. Descubra os momentos mais especiais capturados
              pelos nossos Doutores Palhaços.
            </p>
          </motion.div>

          {/* Layout*/}
          <div className="space-y-8">
            {/* Primeira linha - Imagem principal + Grid secundário */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Imagem principal */}
              <motion.div className="group relative" {...fadeUpAnimation}>
                <div className="relative aspect-[4/3] h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={mainImage.url}
                    alt={mainImage.filename}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />

                  {/* Overlay gradiente + escurecimento no hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Informações - aparece no hover */}
                  <div className="absolute right-3 bottom-3 left-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="truncate text-lg font-semibold">
                      {mainImage.municipality}
                    </h3>
                    <p className="text-xs text-white/90">
                      {new Date(mainImage.takenAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Grid de imagens secundárias */}
              <div className="grid grid-cols-2 gap-4">
                {secondaryImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="group relative"
                    {...fadeUpAnimation}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="overflow-hidden rounded-lg border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <div className="w-ful relative aspect-square h-full">
                        <Image
                          src={image.url}
                          alt={image.filename}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Overlay no hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Informações - aparece no hover */}
                        <div className="absolute right-3 bottom-3 left-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <h4 className="truncate font-semibold">
                            {image.municipality}
                          </h4>
                          <p className="text-xs text-white/90">
                            {new Date(image.takenAt).toLocaleDateString(
                              'pt-BR'
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Segunda linha - Grid horizontal - Only show on desktop */}
            {gridImages.length > 0 && (
              <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-3">
                {gridImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="group relative"
                    {...fadeUpAnimation}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="overflow-hidden rounded-lg border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={image.url}
                          alt={image.filename}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="absolute right-3 bottom-3 left-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <h4 className="truncate font-semibold">
                            {image.municipality}
                          </h4>
                          <p className="text-xs text-white/90">
                            {new Date(image.takenAt).toLocaleDateString(
                              'pt-BR'
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryFeaturedImages
