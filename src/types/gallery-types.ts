// Tipos para a galeria de imagens

export interface GalleryImage {
  id: string
  url: string
  filename: string
  municipality: string
  takenAt: string
  author: string
  authorId: string
  createdAt: string
}

export interface SelectedImage {
  id: string
  file: File
  preview: string
}

export interface ImageUploadData {
  url: string
  filename: string
}

export interface BatchUploadData {
  images: ImageUploadData[]
  municipality: string
  takenAt: string
}

export interface GalleryFilters {
  municipality?: string
  startDate?: string
  endDate?: string
  orderBy?: 'date-desc' | 'date-asc' | 'municipality'
  limit?: number
  offset?: number
}

export interface GalleryStats {
  totalImages: number
  totalMunicipalities: number
  imagesByMunicipality: Array<{
    municipality: string
    count: number
  }>
}

export interface CreateImagesResponse {
  success?: boolean
  error?: string
  message?: string
  images?: Array<{
    id: string
    url: string
    filename: string
    municipality: string
    takenAt: string
    createdAt: string
  }>
}

export interface DeleteImageResponse {
  success?: boolean
  error?: string
  message?: string
  deletedImage?: {
    id: string
    filename: string
    municipality: string
  }
}
