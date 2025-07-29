import { ImageIcon, Upload, X } from 'lucide-react'
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
  value, // Adicionar prop value para receber o valor do React Hook Form
}: {
  onFilesAccepted: (file: File | null) => void
  value?: File | null // Tipagem da nova prop
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Detectar quando o valor foi resetado e limpar o estado local
  useEffect(() => {
    if (!value && selectedFile) {
      // Se o valor foi resetado (null/undefined) mas ainda temos arquivo selecionado
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      setPreviewUrl(null)
      setSelectedFile(null)
    }
  }, [value, selectedFile, previewUrl])

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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Imagem de Capa</h3>

      <Card
        {...getRootProps()}
        className={`relative overflow-hidden border-2 border-dashed transition-all duration-200 ${
          isDragActive
            ? 'scale-[1.02] border-red-400 bg-red-50'
            : selectedFile
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
        }`}
      >
        <input {...getInputProps()} />

        {previewUrl && selectedFile ? (
          <div className="group relative">
            <div className="aspect-video w-full overflow-hidden">
              <Image
                width={800}
                height={450}
                src={previewUrl}
                alt="Imagem selecionada"
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>

            {/* Overlay com informações */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="absolute right-4 bottom-4 left-4">
                <p className="truncate text-sm font-medium text-white">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-white/80">
                  {fileSize.toMB(selectedFile.size).toFixed(1)} MB
                </p>
              </div>
            </div>

            {/* Botão de remover */}
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Botão de alterar */}
            <Button
              type="button"
              onClick={open}
              variant="secondary"
              size="sm"
              className="absolute right-3 bottom-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              <Upload className="mr-1 h-4 w-4" />
              Alterar
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div
              className={`mb-4 rounded-full p-4 ${
                isDragActive ? 'bg-red-100' : 'bg-gray-100'
              }`}
            >
              <ImageIcon
                className={`h-8 w-8 ${
                  isDragActive ? 'text-red-500' : 'text-gray-400'
                }`}
              />
            </div>

            <h4 className="mb-2 font-semibold text-gray-900">
              {isDragActive
                ? 'Solte a imagem aqui'
                : 'Adicione uma imagem de capa'}
            </h4>

            <p className="mb-4 text-sm text-gray-500">
              Arraste e solte uma imagem ou clique no botão abaixo
            </p>

            <div className="mb-6 text-xs text-gray-400">
              Formatos aceitos: PNG, JPG, WEBP • Tamanho máximo: 10MB
            </div>

            <Button
              type="button"
              onClick={open}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              <Upload className="mr-2 h-4 w-4" />
              Selecionar Imagem
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
