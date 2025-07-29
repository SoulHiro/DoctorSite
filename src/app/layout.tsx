import './globals.css'

import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const InterFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const BebasFont = Bebas_Neue({
  variable: '--font-bebas',
  weight: '400',
  subsets: ['latin'],
  display: 'auto',
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
        className={`${InterFont.className} ${BebasFont.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
