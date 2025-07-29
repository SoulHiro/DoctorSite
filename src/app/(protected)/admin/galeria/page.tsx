'use client'

import { GalleryManagement } from './_components'

const AdminGalleryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <GalleryManagement />
      </div>
    </div>
  )
}

export default AdminGalleryPage
