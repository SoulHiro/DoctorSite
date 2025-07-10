import { UploadCloud, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const fileSize = {
  MB: (size: number) => size * 1024 * 1024,
  toMB: (bytes: number) => bytes / (1024 * 1024),
}

export function ChooseFile({
  onFilesAccepted,
}: {
  onFilesAccepted: (file: File | null) => void
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Limpar URL quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null

      if (file) {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
        }

        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setSelectedFile(file)
      }

      onFilesAccepted(file)
    },
    [onFilesAccepted, previewUrl]
  )

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setSelectedFile(null)
    onFilesAccepted(null)
  }

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxSize: fileSize.MB(10),
    onDropAccepted: () => {
      toast.success('Imagem carregada com sucesso')
    },
    onDropRejected: () => {
      toast.error('Arquivo muito grande ou formato inválido')
    },
    noKeyboard: true,
    noClick: true,
    multiple: false,
  })

  return (
    <Card
      {...getRootProps()}
      className={`border-muted flex cursor-pointer flex-col items-center justify-center border-2 border-dashed p-6 transition-colors ${
        isDragActive
          ? 'bg-muted'
          : selectedFile
            ? 'border-green-200 bg-green-50'
            : 'bg-background'
      }`}
    >
      <input {...getInputProps()} />

      {previewUrl && selectedFile ? (
        <div className="w-full space-y-4">
          <div className="relative">
            <Image
              width={1000}
              height={1000}
              src={previewUrl}
              alt="Imagem selecionada"
              className="h-32 w-full rounded-lg border bg-white object-contain"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="text-center">
            <p className="flex items-center justify-center gap-1 text-sm font-medium text-green-700">
              ✅ {selectedFile.name}
            </p>
            <p className="text-xs text-gray-500">
              {fileSize.toMB(selectedFile.size).toFixed(2)} MB
            </p>
          </div>
        </div>
      ) : (
        <>
          <UploadCloud className="text-muted-foreground mb-2 h-8 w-8" />
          <p className="text-muted-foreground flex flex-col text-center text-sm">
            {isDragActive
              ? 'Solte a imagem aqui...'
              : 'Arraste e solte uma imagem ou clique para selecionar'}
            <span className="text-muted-foreground text-xs">
              (PNG, JPG, WEBP) - Max 10MB
            </span>
          </p>
        </>
      )}

      <Button type="button" onClick={open} variant="outline" className="mt-4">
        {selectedFile ? 'Alterar Imagem' : 'Selecionar Imagem'}
      </Button>
    </Card>
  )
}
