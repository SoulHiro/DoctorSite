import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils'

export const metadata = generateSEOMetadata({
  title: 'Contato',
  description:
    'Faça parte da transformação! Entre em contato com a SOS Bom Humor para se tornar voluntário do projeto "Rir é o Melhor Remédio", fazer parcerias ou apoiar nosso trabalho nos hospitais do RS.',
  keywords: [
    'contato SOS Bom Humor',
    'ser voluntário RS',
    'como participar Rir é o Melhor Remédio',
    'voluntariado hospitalar Rio Grande Sul',
    'parceria ONG hospitais',
    'apoiar humanização hospitalar',
    'participe palhaçaria hospitalar',
    'trabalho social RS',
    'transformar vidas hospitais',
    'fazer diferença saúde',
  ],
  url: '/contato',
  image: '/images/doctors/doutores3.jpg',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Facilitar contato e engajamento com a SOS Bom Humor */}
      {children}
    </>
  )
}
