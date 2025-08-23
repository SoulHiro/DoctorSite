import { ArrowLeft, Camera, Images } from 'lucide-react'
import Link from 'next/link'

interface PageHeaderProps {
  municipality: string
  imageCount: number
}

export function PageHeader({ municipality, imageCount }: PageHeaderProps) {
  return (
    <div className="relative border-b border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(156_163_175,0.15)_1px,transparent_0)] [background-size:24px_24px]" />

      <div className="relative container mx-auto px-6 py-12">
        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/galeria"
            className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-600 transition-all duration-200 hover:bg-white hover:text-gray-900 hover:shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Galeria Principal</span>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/70 px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm">
            <Images className="h-4 w-4" />
            <span>
              {imageCount} foto{imageCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 blur-lg" />
              <div className="relative rounded-full border border-blue-200/30 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <h1 className="mb-3 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-5xl font-bold text-transparent capitalize">
            {municipality}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500">
            Explore as imagens capturadas pelos nossos Doutores Palhaços durante
            as visitas em {municipality}. Cada foto conta uma história de
            alegria e esperança.
          </p>
        </div>
      </div>
    </div>
  )
}
