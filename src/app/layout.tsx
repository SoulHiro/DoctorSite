import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const regularInter = Inter({
  variable: '--font-regular-inter',
  subsets: ['latin'],
})

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
      <body className={`${regularInter.variable} antialiased`}>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
