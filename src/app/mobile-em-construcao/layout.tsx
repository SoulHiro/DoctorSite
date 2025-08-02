import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mobile em Construção | SOS Bom Humor',
  description:
    'Estamos trabalhando na versão mobile do nosso site. Acesse pelo computador para a melhor experiência.',
  robots: 'noindex, nofollow',
}

export default function MobileEmConstrucaoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
