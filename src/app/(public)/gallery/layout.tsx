import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils'

export const metadata = generateSEOMetadata({
  title: 'Galeria',
  description:
    'Conheça a galeria de fotos do SOS Bom Humor Doutores Palhaços. Veja momentos especiais de alegria, carinho e esperança que nossos voluntários levam para hospitais em todo o Brasil.',
  keywords: [
    'galeria doutores palhaços',
    'fotos hospital',
    'voluntários hospitais',
    'crianças hospitalizadas fotos',
    'palhaços hospital',
    'humanização hospitalar imagens',
    'alegria hospital',
    'trabalho voluntário fotos',
    'momentos especiais hospital',
    'sorrisos hospital',
  ],
  url: '/gallery',
  image: '/images/doctors/doutores1.jpg',
})

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
