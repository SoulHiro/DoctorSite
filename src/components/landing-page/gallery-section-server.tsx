import { getImages } from '@/actions/gallery'
import { ColumnItem, GalleryData, GalleryImage } from '@/types/gallery-section'

import GallerySectionClient from './gallery-section-client'

/**
 * Processa as imagens e organiza em colunas para mobile e desktop
 */
function processGalleryImages(images: GalleryImage[]): GalleryData {
  if (images.length === 0) {
    return { mobile: [], desktop: [] }
  }

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

  // Agrupar imagens por município para garantir diversidade
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

  // Para mobile: 4 imagens em 2 colunas (2 por coluna)
  const mobileColumns: ColumnItem[][] = [[], []]

  // Para desktop: 8 imagens em 4 colunas (2 por coluna)
  const desktopColumns: ColumnItem[][] = [[], [], [], []]

  let imageIndex = 0
  let municipalityIndex = 0

  // Distribuir 4 imagens para mobile
  for (let i = 0; i < 4; i++) {
    const columnIndex = Math.floor(i / 2)
    const currentMunicipality =
      municipalities[municipalityIndex % municipalities.length]
    const municipalityImages = imagesByMunicipality[currentMunicipality]
    const image = municipalityImages[imageIndex % municipalityImages.length]

    mobileColumns[columnIndex].push({
      id: image.id,
      src: image.url,
      alt: `${image.municipality} - ${image.filename}`,
      municipality: image.municipality,
      className: heights[i],
    })

    if ((i + 1) % 2 === 0) {
      municipalityIndex++
    }
    imageIndex++
  }

  // Reset para desktop
  imageIndex = 0
  municipalityIndex = 0

  // Distribuir 8 imagens para desktop
  for (let i = 0; i < 8; i++) {
    const columnIndex = Math.floor(i / 2)
    const currentMunicipality =
      municipalities[municipalityIndex % municipalities.length]
    const municipalityImages = imagesByMunicipality[currentMunicipality]
    const image = municipalityImages[imageIndex % municipalityImages.length]

    desktopColumns[columnIndex].push({
      id: image.id,
      src: image.url,
      alt: `${image.municipality} - ${image.filename}`,
      municipality: image.municipality,
      className: heights[i],
    })

    if ((i + 1) % 2 === 0) {
      municipalityIndex++
    }
    imageIndex++
  }

  return { mobile: mobileColumns, desktop: desktopColumns }
}

/**
 * Componente server que busca e processa os dados da galeria
 */
const GallerySectionServer = async () => {
  try {
    const images = await getImages()
    const processedData = processGalleryImages(images)

    return <GallerySectionClient galleryData={processedData} />
  } catch (error) {
    console.error('Erro ao buscar imagens da galeria:', error)
    // Retorna componente client com dados vazios em caso de erro
    return <GallerySectionClient galleryData={{ mobile: [], desktop: [] }} />
  }
}

export default GallerySectionServer
