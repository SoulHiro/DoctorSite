import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils'

export const metadata = generateSEOMetadata({
  title: 'Blog',
  description:
    'Acompanhe o blog do SOS Bom Humor Doutores Palhaços. Histórias inspiradoras, dicas de voluntariado, novidades sobre nosso trabalho nos hospitais e muito mais sobre humanização da saúde.',
  keywords: [
    'blog doutores palhaços',
    'histórias hospital',
    'voluntariado hospitalar',
    'humanização saúde',
    'crianças hospitalizadas',
    'palhaçoterapia',
    'arte terapia hospital',
    'cuidado humanizado',
    'alegria hospital',
    'trabalho social saúde',
  ],
  url: '/blog',
  image: '/images/hero-section.webp',
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
