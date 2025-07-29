'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { getImages } from '@/actions/gallery'
// Removido Card e CardContent para tirar fundo branco/rounded
import { brandDesign } from '@/lib/brand-design'

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

const GalleryFeaturedImages = () => {
  const [featuredImages, setFeaturedImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedImages = async () => {
      try {
        const images = await getImages()
        // Pegar as 8 imagens mais recentes para um layout magazine
        const featured = images.slice(0, 8)
        setFeaturedImages(featured)
      } catch (error) {
        console.error('Erro ao buscar imagens em destaque:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFeaturedImages()
  }, [])

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="mb-2 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
                Momentos em Destaque
              </h2>
            </div>
            <div className="flex items-center justify-center py-24">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="h-4 w-4 rounded-full bg-orange-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="h-4 w-4 rounded-full bg-pink-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="h-4 w-4 rounded-full bg-yellow-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                />
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
              <h2 className="mb-2 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
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

  return (
    <section className="relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute right-10 bottom-20 h-40 w-40 rounded-full bg-pink-200/30 blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-24 w-24 rounded-full bg-orange-200/20 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [-20, 20, -20],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header da seção */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: brandDesign.animations.easing.smooth,
            }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 p-3">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="mb-2 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
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
              <motion.div
                className="group relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: brandDesign.animations.easing.smooth,
                }}
                viewport={{ once: true }}
              >
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
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: brandDesign.animations.easing.smooth,
                }}
                viewport={{ once: true }}
              >
                {secondaryImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="group relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: brandDesign.animations.easing.smooth,
                    }}
                    viewport={{ once: true }}
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
              </motion.div>
            </div>

            {/* Segunda linha - Grid horizontal */}
            {gridImages.length > 0 && (
              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: brandDesign.animations.easing.smooth,
                }}
                viewport={{ once: true }}
              >
                {gridImages.map((image) => (
                  <motion.div
                    key={image.id}
                    className="group relative"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Removido Card e CardContent */}
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
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryFeaturedImages
