import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils'

export const metadata = generateSEOMetadata({
  title: 'Contato',
  description:
    'Entre em contato com o SOS Bom Humor Doutores Palhaços. Descubra como você pode fazer parte da nossa missão de levar alegria e esperança para crianças hospitalizadas. Seja um voluntário ou parceiro.',
  keywords: [
    'contato doutores palhaços',
    'voluntário hospital',
    'como ser voluntário',
    'parceria hospitalar',
    'doações ONG',
    'trabalho voluntário hospitalar',
    'humanização saúde',
    'palhaço voluntário',
    'ajudar crianças hospital',
  ],
  url: '/contato',
  image: '/images/doctors/doutores3.jpg',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
