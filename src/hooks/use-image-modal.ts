import { useCallback, useEffect, useState } from 'react'

import { GalleryImage } from '@/types/gallery'

export function useImageModal(images: GalleryImage[]) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const isOpen = !!selectedImage
  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < images.length - 1

  function openModal(image: GalleryImage, index: number) {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  function closeModal() {
    setSelectedImage(null)
  }

  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setSelectedImage(images[newIndex])
    }
  }, [canGoPrevious, currentIndex, images])

  const goToNext = useCallback(() => {
    if (canGoNext) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setSelectedImage(images[newIndex])
    }
  }, [canGoNext, currentIndex, images])

  // Navegação por teclado
  useEffect(() => {
    if (!isOpen) return

    function handleKeyPress(e: KeyboardEvent) {
      switch (e.key) {
        case 'Escape':
          closeModal()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, goToNext, goToPrevious])

  return {
    selectedImage,
    currentIndex,
    isOpen,
    canGoPrevious,
    canGoNext,
    openModal,
    closeModal,
    goToPrevious,
    goToNext,
  }
}
