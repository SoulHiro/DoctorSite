export interface ColumnItem {
  id: string | number
  src: string
  alt: string
  municipality: string
  className: string
}

export interface GalleryData {
  mobile: ColumnItem[][]
  desktop: ColumnItem[][]
}

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
