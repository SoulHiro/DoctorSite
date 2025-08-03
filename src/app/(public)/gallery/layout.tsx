import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils'

export const metadata = generateSEOMetadata({
  title: 'Galeria',
  description:
    'Veja o impacto visual do projeto "Rir é o Melhor Remédio" em ação. Fotos autênticas de nossas visitas a hospitais do RS, capturando momentos de alegria, acolhimento e humanização da saúde.',
  keywords: [
    'galeria SOS Bom Humor',
    'fotos Rir é o Melhor Remédio',
    'palhaçaria hospitalar RS',
    'imagens humanização hospitalar',
    'voluntários hospitais Rio Grande Sul',
    'registros visuais impacto social',
    'momentos de alegria hospitais',
    'arte transformadora saúde',
    'fotos autênticas voluntariado',
    'trabalho social visual',
  ],
  url: '/gallery',
  image: '/images/doctors/doutores1.jpg',
})

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Galeria visual do impacto da SOS Bom Humor */}
      {children}
    </>
  )
}
