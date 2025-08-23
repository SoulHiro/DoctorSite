'use client'

import { motion } from 'framer-motion'
import { ImageIcon, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getImages } from '@/actions/gallery'
import { Badge } from '@/components/ui/badge'

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

interface MunicipalityData {
  name: string
  imageCount: number
  latestImage: GalleryImage
  allImages: GalleryImage[]
  monthsActive: number
  lastVisit: string
}

const GalleryMunicipalities = () => {
  const [municipalitiesData, setMunicipalitiesData] = useState<
    MunicipalityData[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMunicipalitiesData = async () => {
      try {
        const images = await getImages()

        // Agrupar por município e calcular estatísticas
        const grouped = images.reduce(
          (acc, image) => {
            const municipality = image.municipality
            if (!acc[municipality]) {
              acc[municipality] = []
            }
            acc[municipality].push(image)
            return acc
          },
          {} as Record<string, GalleryImage[]>
        )

        // Criar array de dados do município com estatísticas
        const municipalitiesArray = Object.entries(grouped).map(
          ([name, municipalityImages]) => {
            const sortedImages = municipalityImages.sort(
              (a, b) =>
                new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime()
            )

            // Calcular meses ativos (quantos meses diferentes têm fotos)
            const uniqueMonths = new Set(
              municipalityImages.map((img) =>
                new Date(img.takenAt).toISOString().substring(0, 7)
              )
            )

            const lastVisitDate = new Date(sortedImages[0].takenAt)
            const now = new Date()
            const diffMonths = Math.floor(
              (now.getTime() - lastVisitDate.getTime()) /
                (1000 * 60 * 60 * 24 * 30)
            )

            return {
              name,
              imageCount: municipalityImages.length,
              latestImage: sortedImages[0],
              allImages: sortedImages,
              monthsActive: uniqueMonths.size,
              lastVisit:
                diffMonths === 0
                  ? 'Este mês'
                  : diffMonths === 1
                    ? 'Mês passado'
                    : `Há ${diffMonths} meses`,
            }
          }
        )

        municipalitiesArray.sort((a, b) => b.imageCount - a.imageCount)
        setMunicipalitiesData(municipalitiesArray)
      } catch (error) {
        console.error('Erro ao buscar dados dos municípios:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMunicipalitiesData()
  }, [])

  if (isLoading) {
    return (
      <section className="relative">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-2xl text-transparent sm:text-3xl md:text-4xl">
                Municípios Visitados
              </h2>
            </div>
            <div className="flex items-center justify-center py-24">
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 rounded-full bg-orange-500" />
                <div className="h-4 w-4 rounded-full bg-pink-500" />
                <div className="h-4 w-4 rounded-full bg-yellow-500" />
                <span className="ml-3 text-slate-600">
                  Carregando municípios...
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (municipalitiesData.length === 0) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50 to-pink-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-2xl text-transparent sm:text-3xl md:text-4xl">
                Municípios Visitados
              </h2>
            </div>
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="mb-4 text-4xl sm:text-5xl md:text-6xl">🏘️</div>
                <div className="text-slate-600">
                  Nenhum município encontrado.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const fadeUpAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  return (
    <section className="relative">
      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header da seção */}
          <motion.div className="mb-16 text-center" {...fadeUpAnimation}>
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-3">
                <MapPin className="h-6 w-6 text-white sm:h-7 sm:w-7 md:h-8 md:w-8" />
              </div>
            </div>
            <h2 className="mb-2 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-2xl text-transparent sm:text-3xl md:text-4xl">
              Municípios Visitados
            </h2>
            <p className="sm:text-md mx-auto max-w-3xl text-sm leading-relaxed text-slate-600">
              Conheça os municípios onde nossos Doutores Palhaços levam alegria,
              esperança e transformação.
            </p>
          </motion.div>

          {/* Grid de municípios */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {municipalitiesData.map((municipality, index) => (
              <motion.div
                key={municipality.name}
                {...fadeUpAnimation}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <Link
                  href={`/gallery/${encodeURIComponent(municipality.name.toLowerCase())}`}
                  className="group block"
                >
                  {/* Imagem principal */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={municipality.latestImage.url}
                      alt={`Galeria de ${municipality.name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />

                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Badge com contador */}
                    <Badge className="absolute top-3 right-3 border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg backdrop-blur-sm">
                      <ImageIcon className="mr-1 h-3 w-3" />
                      {municipality.imageCount}
                    </Badge>

                    {/* Informações principais */}
                    <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                      <h3 className="mb-2 text-base sm:text-lg md:text-xl">
                        {municipality.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Call to action final */}
          <motion.div
            className="mt-20 text-center"
            {...fadeUpAnimation}
          ></motion.div>
        </div>
      </div>
    </section>
  )
}

export default GalleryMunicipalities
