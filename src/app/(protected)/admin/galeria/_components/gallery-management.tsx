'use client'

import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Eye,
  FileImage,
  Folder,
  FolderOpen,
  Grid,
  List,
  MapPin,
  Plus,
  Search,
  Trash2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { deleteImage, getImages } from '@/actions/gallery'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Toggle } from '@/components/ui/toggle'

import { PageHeader } from './page-header'

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

// Função para agrupar imagens por município e data
const groupImagesByMunicipalityAndDate = (images: GalleryImage[]) => {
  const grouped = images.reduce(
    (acc, image) => {
      const municipality = image.municipality
      const date = new Date(image.takenAt).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
      })

      if (!acc[municipality]) {
        acc[municipality] = {}
      }
      if (!acc[municipality][date]) {
        acc[municipality][date] = []
      }
      acc[municipality][date].push(image)
      return acc
    },
    {} as Record<string, Record<string, GalleryImage[]>>
  )

  // Ordenar municípios e datas
  const sorted = Object.keys(grouped)
    .sort()
    .reduce(
      (acc, municipality) => {
        acc[municipality] = Object.keys(grouped[municipality])
          .sort(
            (a, b) =>
              new Date(grouped[municipality][b][0].takenAt).getTime() -
              new Date(grouped[municipality][a][0].takenAt).getTime()
          )
          .reduce(
            (dateAcc, date) => {
              dateAcc[date] = grouped[municipality][date].sort(
                (a, b) =>
                  new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime()
              )
              return dateAcc
            },
            {} as Record<string, GalleryImage[]>
          )
        return acc
      },
      {} as Record<string, Record<string, GalleryImage[]>>
    )

  return sorted
}

const GalleryManagement = () => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [expandedMunicipalities, setExpandedMunicipalities] = useState<
    Set<string>
  >(new Set())
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [previewImage, setPreviewImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const data = await getImages()
      setImages(data)
    } catch (error) {
      console.error('Erro ao carregar imagens:', error)
      toast.error('Erro ao carregar imagens')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteImage = async () => {
    if (!imageToDelete) return

    setIsDeleting(true)
    try {
      const result = await deleteImage(imageToDelete.id)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.message)
        setImages((prev) => prev.filter((img) => img.id !== imageToDelete.id))
        setDeleteDialogOpen(false)
        setImageToDelete(null)
      }
    } catch (error) {
      console.error('Erro ao deletar imagem:', error)
      toast.error('Erro ao deletar imagem')
    } finally {
      setIsDeleting(false)
    }
  }

  const toggleMunicipality = (municipality: string) => {
    setExpandedMunicipalities((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(municipality)) {
        newSet.delete(municipality)
      } else {
        newSet.add(municipality)
      }
      return newSet
    })
  }

  const toggleDate = (municipalityDate: string) => {
    setExpandedDates((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(municipalityDate)) {
        newSet.delete(municipalityDate)
      } else {
        newSet.add(municipalityDate)
      }
      return newSet
    })
  }

  // Filtrar imagens por busca
  const filteredImages = images.filter((image) => {
    if (searchTerm === '') return true
    return (
      image.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.municipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Agrupar imagens filtradas
  const groupedImages = groupImagesByMunicipalityAndDate(filteredImages)

  const formatFileSize = () => {
    // Simulação - normalmente viria da API
    return `${Math.floor(Math.random() * 900 + 100)} KB`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-lg">Carregando imagens...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header seguindo o mesmo padrão do blog */}
      <PageHeader />

      {/* Filtros e controles */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-500" />
          <Input
            placeholder="Buscar arquivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Toggle
              pressed={viewMode === 'list'}
              onPressedChange={() => setViewMode('list')}
              size="sm"
            >
              <List className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={viewMode === 'grid'}
              onPressedChange={() => setViewMode('grid')}
              size="sm"
            >
              <Grid className="h-4 w-4" />
            </Toggle>
          </div>
        </div>
      </div>

      {/* Info de arquivos */}
      <div className="text-muted-foreground text-sm">
        {filteredImages.length} arquivo
        {filteredImages.length !== 1 ? 's' : ''} em{' '}
        {Object.keys(groupedImages).length} pasta
        {Object.keys(groupedImages).length !== 1 ? 's' : ''}
      </div>

      {/* Explorador de Arquivos */}
      {Object.keys(groupedImages).length === 0 ? (
        <div className="py-24 text-center">
          <Folder className="mx-auto mb-4 h-16 w-16 text-slate-300" />
          <h3 className="mb-2 text-xl font-semibold">
            {images.length === 0 ? 'Pasta vazia' : 'Nenhum arquivo encontrado'}
          </h3>
          <p className="mb-4 text-slate-600">
            {images.length === 0
              ? 'Faça upload de imagens para começar.'
              : 'Tente ajustar os termos de busca.'}
          </p>
          {images.length === 0 && (
            <Link href="/admin/galeria/upload">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Primeiro Upload
              </Button>
            </Link>
          )}
        </div>
      ) : viewMode === 'list' ? (
        // View Lista (Explorer style)
        <Card>
          <Table>
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[100px]">Tipo</TableHead>
                <TableHead className="w-[120px]">Data</TableHead>
                <TableHead className="w-[100px]">Tamanho</TableHead>
                <TableHead className="w-[100px]">Autor</TableHead>
                <TableHead className="w-[80px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(groupedImages).map(
                ([municipality, dateGroups]) => {
                  const isExpanded = expandedMunicipalities.has(municipality)
                  const totalImages = Object.values(dateGroups).flat().length

                  return (
                    <>
                      {/* Linha do Município */}
                      <TableRow
                        key={municipality}
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => toggleMunicipality(municipality)}
                      >
                        <TableCell>
                          <div className="flex items-center">
                            {isExpanded ? (
                              <ChevronDown className="h-3 w-3 text-slate-500" />
                            ) : (
                              <ChevronRight className="h-3 w-3 text-slate-500" />
                            )}
                            {isExpanded ? (
                              <FolderOpen className="ml-1 h-4 w-4 text-blue-600" />
                            ) : (
                              <Folder className="ml-1 h-4 w-4 text-blue-600" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-orange-600" />
                            <span className="font-medium">{municipality}</span>
                            <Badge variant="secondary" className="text-xs">
                              {totalImages}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          Pasta
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          -
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          -
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          -
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>

                      {/* Subpastas de Data */}
                      {isExpanded &&
                        Object.entries(dateGroups).map(([date, dateImages]) => {
                          const dateKey = `${municipality}-${date}`
                          const isDateExpanded = expandedDates.has(dateKey)

                          return (
                            <>
                              <TableRow
                                key={dateKey}
                                className="cursor-pointer hover:bg-slate-50"
                                onClick={() => toggleDate(dateKey)}
                              >
                                <TableCell>
                                  <div className="flex items-center pl-6">
                                    {isDateExpanded ? (
                                      <ChevronDown className="h-3 w-3 text-slate-500" />
                                    ) : (
                                      <ChevronRight className="h-3 w-3 text-slate-500" />
                                    )}
                                    {isDateExpanded ? (
                                      <FolderOpen className="ml-1 h-4 w-4 text-amber-600" />
                                    ) : (
                                      <Folder className="ml-1 h-4 w-4 text-amber-600" />
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2 pl-6">
                                    <Calendar className="h-3 w-3 text-slate-500" />
                                    <span className="text-sm">{date}</span>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {dateImages.length}
                                    </Badge>
                                  </div>
                                </TableCell>
                                <TableCell className="text-xs text-slate-500">
                                  Pasta
                                </TableCell>
                                <TableCell className="text-xs text-slate-500">
                                  -
                                </TableCell>
                                <TableCell className="text-xs text-slate-500">
                                  -
                                </TableCell>
                                <TableCell className="text-xs text-slate-500">
                                  -
                                </TableCell>
                                <TableCell></TableCell>
                              </TableRow>

                              {/* Arquivos de Imagem */}
                              {isDateExpanded &&
                                dateImages.map((image) => (
                                  <TableRow
                                    key={image.id}
                                    className="hover:bg-slate-50"
                                  >
                                    <TableCell>
                                      <div className="flex items-center pl-12">
                                        <FileImage className="h-4 w-4 text-green-600" />
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2 pl-12">
                                        <div className="h-6 w-6 overflow-hidden rounded">
                                          <Image
                                            src={image.url}
                                            alt={image.filename}
                                            width={24}
                                            height={24}
                                            className="object-cover"
                                          />
                                        </div>
                                        <span className="max-w-[200px] truncate text-sm">
                                          {image.filename}
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500">
                                      Imagem
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500">
                                      {new Date(
                                        image.takenAt
                                      ).toLocaleDateString('pt-BR')}
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500">
                                      {formatFileSize()}
                                    </TableCell>
                                    <TableCell className="max-w-[80px] truncate text-xs text-slate-500">
                                      {image.author}
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setPreviewImage(image)}
                                          className="h-6 w-6 p-0"
                                        >
                                          <Eye className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => {
                                            setImageToDelete(image)
                                            setDeleteDialogOpen(true)
                                          }}
                                          className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </>
                          )
                        })}
                    </>
                  )
                }
              )}
            </TableBody>
          </Table>
        </Card>
      ) : (
        // View Grid (compacto)
        <div className="space-y-3">
          {Object.entries(groupedImages).map(([municipality, dateGroups]) => {
            const totalImages = Object.values(dateGroups).flat().length

            return (
              <Card key={municipality} className="p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Folder className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">{municipality}</span>
                  <Badge variant="secondary" className="text-xs">
                    {totalImages}
                  </Badge>
                </div>

                <div className="grid grid-cols-8 gap-2 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20">
                  {Object.values(dateGroups)
                    .flat()
                    .map((image) => (
                      <div
                        key={image.id}
                        className="group relative aspect-square overflow-hidden rounded border border-slate-200 hover:border-slate-300"
                      >
                        <Image
                          src={image.url}
                          alt={image.filename}
                          fill
                          className="object-cover transition-transform duration-200 group-hover:scale-105"
                          sizes="80px"
                        />

                        {/* Overlay com ações */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <div className="flex gap-1">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => setPreviewImage(image)}
                              className="h-6 w-6 p-0"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setImageToDelete(image)
                                setDeleteDialogOpen(true)
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Dialog de Preview */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {previewImage?.filename.replace(/\.[^/.]+$/, '')}
            </DialogTitle>
            <DialogDescription>
              {previewImage?.municipality} •{' '}
              {previewImage &&
                new Date(previewImage.takenAt).toLocaleDateString('pt-BR')}
            </DialogDescription>
          </DialogHeader>

          {previewImage && (
            <div className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={previewImage.url}
                  alt={previewImage.filename}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <strong>Autor:</strong> {previewImage.author}
                  </p>
                  <p>
                    <strong>Município:</strong> {previewImage.municipality}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Data:</strong>{' '}
                    {new Date(previewImage.takenAt).toLocaleDateString('pt-BR')}
                  </p>
                  <p>
                    <strong>Upload:</strong>{' '}
                    {new Date(previewImage.createdAt).toLocaleDateString(
                      'pt-BR'
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmação de delete */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja deletar a imagem &quot;
              {imageToDelete?.filename}&quot;? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          {imageToDelete && (
            <div className="py-4">
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={imageToDelete.url}
                  alt={imageToDelete.filename}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setImageToDelete(null)
              }}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteImage}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Deletando...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deletar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GalleryManagement
