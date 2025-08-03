import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils'

export const metadata = generateSEOMetadata({
  title: 'Blog',
  description:
    'Histórias reais do projeto "Rir é o Melhor Remédio". Acompanhe relatos emocionantes de nossas visitas a 20+ hospitais do RS, dicas de voluntariado e o impacto da arte na humanização hospitalar.',
  keywords: [
    'blog SOS Bom Humor',
    'Rir é o Melhor Remédio',
    'histórias hospitais RS',
    'relatos palhaçaria hospitalar',
    'voluntariado no Rio Grande do Sul',
    'humanização da saúde',
    'arte como terapia',
    'impacto social hospitais',
    'experiências voluntários',
    'transformação social ONG',
  ],
  url: '/blog',
  image: '/images/og-hero.webp',
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data específico para blog */}
      {children}
    </>
  )
}
