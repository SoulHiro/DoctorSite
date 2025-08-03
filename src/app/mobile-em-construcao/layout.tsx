import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Versão Mobile em Desenvolvimento | SOS Bom Humor',
  description:
    'Nossa versão mobile está em desenvolvimento para oferecer a melhor experiência. Acesse pelo computador para conhecer o projeto "Rir é o Melhor Remédio" completo.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function MobileEmConstrucaoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
