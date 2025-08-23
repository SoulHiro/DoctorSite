'use client'

import { useParams } from 'next/navigation'

import { useGallery } from '@/hooks/use-gallery'
import { useImageModal } from '@/hooks/use-image-modal'

import { ImageGrid, ImageModal, PageHeader } from './_components'

export default function MunicipalityGalleryPage() {
  const params = useParams()
  const municipality = decodeURIComponent(params.municipality as string)

  const { images } = useGallery(municipality)
  const modal = useImageModal(images)

  return (
    <>
      <PageHeader municipality={municipality} imageCount={images.length} />
      <ImageGrid images={images} onImageClick={modal.openModal} />
      <ImageModal
        isOpen={modal.isOpen}
        selectedImage={modal.selectedImage}
        currentIndex={modal.currentIndex}
        totalImages={images.length}
        canGoPrevious={modal.canGoPrevious}
        canGoNext={modal.canGoNext}
        onClose={modal.closeModal}
        onPrevious={modal.goToPrevious}
        onNext={modal.goToNext}
      />
    </>
  )
}
