'use client'

import {
  AlertCircle,
  Calendar,
  CheckCircle,
  MapPin,
  Upload,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { createImages } from '@/actions/gallery'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { uploadImage } from '@/lib/cloudinary'

interface SelectedImage {
  id: string
  file: File
  preview: string
  uploaded?: boolean
  uploadProgress?: number
}

const UploadGalleryPage = () => {
  const [images, setImages] = useState<SelectedImage[]>([])
  const [municipality, setMunicipality] = useState('')
  const [takenAt, setTakenAt] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStep, setUploadStep] = useState<
    'idle' | 'validating' | 'uploading' | 'saving'
  >('idle')

  // Data máxima (hoje) no formato YYYY-MM-DD
  const maxDate = new Date().toISOString().split('T')[0]

  // Municípios disponíveis
  const municipalities = [
    'Ibirubá',
    'Tapera',
    'Quinze De Novembro',
    'Não-Me-Toque',
    'Panambi',
    'Selbach',
    'Marau',
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newImages: SelectedImage[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      uploaded: false,
      uploadProgress: 0,
    }))

    setImages((prev) => [...prev, ...newImages])

    // Feedback visual para seleção de arquivos
    if (newImages.length === 1) {
      toast.success(`${newImages.length} imagem selecionada`)
    } else {
      toast.success(`${newImages.length} imagens selecionadas`)
    }
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id)
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }
      return prev.filter((img) => img.id !== id)
    })
  }

  const validateForm = () => {
    if (images.length === 0) {
      toast.error('Selecione pelo menos uma imagem')
      return false
    }

    if (!municipality) {
      toast.error('Município é obrigatório')
      return false
    }

    if (!takenAt) {
      toast.error('Data é obrigatória')
      return false
    }

    // Validar se a data não é futura
    const selectedDate = new Date(takenAt)
    const today = new Date()
    today.setHours(23, 59, 59, 999) // Permitir até o final do dia atual

    if (selectedDate > today) {
      toast.error('Não é possível selecionar uma data futura')
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    // Validar ANTES de qualquer upload
    setUploadStep('validating')

    if (!validateForm()) {
      setUploadStep('idle')
      return
    }

    setIsUploading(true)
    setUploadStep('uploading')

    try {
      toast.loading('Fazendo upload das imagens para o Cloudinary...')

      // Calcular folder path: gallery/municipio/ano-mes
      const date = new Date(takenAt)
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const folderPath = `gallery/${municipality}/${yearMonth}`

      console.log('Folder path calculado:', folderPath)

      // Upload de todas as imagens para o Cloudinary com progress
      const uploadResults = []
      for (let i = 0; i < images.length; i++) {
        const image = images[i]

        // Atualizar progresso visual
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id ? { ...img, uploadProgress: 0 } : img
          )
        )

        try {
          const result = await uploadImage(image.file, folderPath)
          uploadResults.push(result)

          // Marcar como uploaded
          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id
                ? { ...img, uploaded: true, uploadProgress: 100 }
                : img
            )
          )
        } catch (error) {
          toast.dismiss()
          toast.error(`Erro ao fazer upload da imagem ${image.file.name}`)
          console.error('Erro específico do upload:', error)
          setIsUploading(false)
          setUploadStep('idle')
          return
        }
      }

      toast.dismiss()
      toast.loading('Salvando informações no banco de dados...')
      setUploadStep('saving')

      // Preparar dados para salvar no banco
      const formData = new FormData()
      formData.append('imageCount', uploadResults.length.toString())
      formData.append('municipality', municipality)
      formData.append('takenAt', takenAt)

      uploadResults.forEach((result, index) => {
        formData.append(`images[${index}].url`, result.secure_url)
        formData.append(
          `images[${index}].filename`,
          result.original_filename || `gallery-image-${Date.now()}-${index}`
        )
      })

      // Salvar no banco de dados
      const result = await createImages(formData)

      toast.dismiss()

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.message || 'Imagens enviadas com sucesso!')
        // Limpar formulário
        images.forEach((img) => URL.revokeObjectURL(img.preview))
        setImages([])
        setMunicipality('')
        setTakenAt('')
      }
    } catch (error) {
      console.error('Erro no upload:', error)
      toast.dismiss()
      toast.error('Erro ao fazer upload das imagens')
    } finally {
      setIsUploading(false)
      setUploadStep('idle')
    }
  }

  const getStepMessage = () => {
    switch (uploadStep) {
      case 'validating':
        return 'Validando dados...'
      case 'uploading':
        return 'Enviando imagens para o Cloudinary...'
      case 'saving':
        return 'Salvando no banco de dados...'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Upload de Imagens</h1>
        <p className="mt-2 text-lg text-slate-600">
          Faça upload de várias imagens de uma vez definindo município e data
          para o grupo.
        </p>
      </div>

      {/* Status do upload */}
      {isUploading && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              <span className="font-medium text-blue-900">
                {getStepMessage()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configurações do grupo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Configurações do Grupo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Município */}
            <div className="space-y-2">
              <Label htmlFor="municipality" className="text-sm font-medium">
                <MapPin className="mr-1 inline h-4 w-4" />
                Município *
              </Label>
              <Select
                value={municipality}
                onValueChange={setMunicipality}
                disabled={isUploading}
              >
                <SelectTrigger
                  className={!municipality ? 'border-red-200' : ''}
                >
                  <SelectValue placeholder="Selecione o município" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((mun) => (
                    <SelectItem key={mun} value={mun}>
                      {mun}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Data */}
            <div className="space-y-2">
              <Label htmlFor="takenAt" className="text-sm font-medium">
                <Calendar className="mr-1 inline h-4 w-4" />
                Data das fotos
              </Label>
              <Input
                id="takenAt"
                type="date"
                value={takenAt}
                onChange={(e) => setTakenAt(e.target.value)}
                disabled={isUploading}
                className={!takenAt ? 'border-red-200' : ''}
                max={maxDate}
              />
              {takenAt && (
                <p className="text-xs text-slate-500">
                  Data selecionada:{' '}
                  {new Date(takenAt).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seleção de arquivos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Selecionar Imagens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                  isUploading
                    ? 'cursor-not-allowed border-slate-200 bg-slate-50'
                    : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload
                    className={`mb-4 h-8 w-8 ${isUploading ? 'text-slate-400' : 'text-slate-500'}`}
                  />
                  <p
                    className={`mb-2 text-sm ${isUploading ? 'text-slate-400' : 'text-slate-500'}`}
                  >
                    <span className="font-semibold">
                      {isUploading
                        ? 'Upload em andamento...'
                        : 'Clique para enviar'}
                    </span>{' '}
                    {!isUploading && 'ou arraste arquivos'}
                  </p>
                  <p
                    className={`text-xs ${isUploading ? 'text-slate-400' : 'text-slate-500'}`}
                  >
                    PNG, JPG ou JPEG (MAX. 10MB por imagem)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview das imagens selecionadas */}
      {images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Imagens Selecionadas ({images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200"
                >
                  <Image
                    src={image.preview}
                    alt={image.file.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  />

                  {/* Status de upload */}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      {image.uploaded ? (
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span className="text-xs text-white">
                            {image.uploadProgress || 0}%
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Botão remover */}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImage(image.id)}
                    disabled={isUploading}
                    className="absolute top-1 right-1 h-6 w-6 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </Button>

                  {/* Nome do arquivo */}
                  <div className="absolute right-0 bottom-0 left-0 truncate bg-black/50 p-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {image.file.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo do upload */}
            {municipality && takenAt && (
              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <h4 className="mb-2 font-medium text-slate-900">
                  Resumo do Upload
                </h4>
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-3 w-3" />
                    Município:{' '}
                    <span className="ml-1 font-medium">{municipality}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-3 w-3" />
                    Data:{' '}
                    <span className="ml-1 font-medium">
                      {new Date(takenAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Upload className="mr-2 h-3 w-3" />
                    Imagens:{' '}
                    <span className="ml-1 font-medium">{images.length}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aviso sobre campos obrigatórios */}
            {(!municipality || !takenAt) && (
              <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                  <div>
                    <h4 className="font-medium text-yellow-800">
                      Campos obrigatórios faltando
                    </h4>
                    <p className="mt-1 text-sm text-yellow-700">
                      Preencha o município e a data antes de enviar as imagens.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Botão de upload */}
            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={
                  isUploading ||
                  images.length === 0 ||
                  !municipality ||
                  !takenAt
                }
                className="min-w-[140px]"
              >
                {isUploading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {getStepMessage() || 'Enviando...'}
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Enviar {images.length}{' '}
                    {images.length === 1 ? 'Imagem' : 'Imagens'}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default UploadGalleryPage
