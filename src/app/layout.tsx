import './globals.css'

import type { Metadata, Viewport } from 'next'
import { Inter, Luckiest_Guy } from 'next/font/google'
import { Toaster } from 'sonner'

import Footer from '../components/shared/footer'
import HeaderPublic from '../components/shared/header'

const regularInter = Inter({
  variable: '--font-regular-inter',
  subsets: ['latin'],
})

const luckiestRegular = Luckiest_Guy({
  variable: '--font-luckiest-regular',
  subsets: ['latin'],
  weight: '400',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'SOS Bom Humor Doutores Palhaços',
  description: 'Site Institucional do SOS Bom Humor Doutores Palhaços',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${regularInter.variable} ${luckiestRegular.variable} antialiased`}
      >
        <HeaderPublic />
        {children}
        <Toaster position="bottom-right" richColors />
        <Footer />
      </body>
    </html>
  )
}
