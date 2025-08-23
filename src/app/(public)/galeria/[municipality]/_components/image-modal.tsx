import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, X } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { GalleryImage } from '@/types/gallery'

interface ImageModalProps {
  isOpen: boolean
  selectedImage: GalleryImage | null
  currentIndex: number
  totalImages: number
  canGoPrevious: boolean
  canGoNext: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function ImageModal({
  isOpen,
  selectedImage,
  currentIndex,
  totalImages,
  canGoPrevious,
  canGoNext,
  onClose,
  onPrevious,
  onNext,
}: ImageModalProps) {
  if (!selectedImage) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="relative flex h-screen items-center justify-center p-4">
            {/* Imagem principal com transição suave */}
            <div className="relative h-full max-h-[90vh] w-full max-w-[90vw]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage.id}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.filename}
                    fill
                    className="rounded-lg object-contain"
                    sizes="90vw"
                    priority
                    quality={95}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Botão fechar */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-30 h-12 w-12 rounded-full bg-black/60 text-white transition-all duration-200 hover:bg-black/80"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navegação anterior */}
            {canGoPrevious && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                className="absolute top-1/2 left-4 z-30 h-12 w-12 -translate-y-1/2 rounded-full bg-black/60 text-white transition-all duration-200 hover:bg-black/80"
                aria-label="Imagem anterior"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
            )}

            {/* Navegação próxima */}
            {canGoNext && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                className="absolute top-1/2 right-4 z-30 h-12 w-12 -translate-y-1/2 rounded-full bg-black/60 text-white transition-all duration-200 hover:bg-black/80"
                aria-label="Próxima imagem"
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            )}

            {/* Informações na parte inferior */}
            <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2">
              <div className="flex items-center gap-4 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(selectedImage.takenAt)}</span>
                </div>
                <div className="h-4 w-px bg-white/30" />
                <span className="font-medium">
                  {currentIndex + 1} / {totalImages}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
