import { useEffect, useState } from 'react'

import { getImages } from '@/actions/gallery'
import { GalleryImage } from '@/types/gallery'

export function useGallery(municipality: string) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchImages() {
      try {
        const allImages = await getImages()
        const municipalityImages = allImages
          .filter(
            (img) =>
              img.municipality.toLowerCase() === municipality.toLowerCase()
          )
          .sort(
            (a, b) =>
              new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime()
          )

        setImages(municipalityImages)
      } catch (error) {
        console.error('Erro ao buscar imagens:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [municipality])

  return { images, isLoading }
}
