import './globals.css'

import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import { GoogleAnalytics } from '@/components/seo/google-analytics'
import { StructuredData } from '@/components/seo/structured-data'

const InterFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const BebasFont = Bebas_Neue({
  variable: '--font-bebas',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://doutorespalhacos.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'SOS Bom Humor Doutores Palhaços | Levando Alegria aos Hospitais',
    template: '%s | SOS Bom Humor Doutores Palhaços',
  },
  description:
    'ONG brasileira que leva alegria, carinho e esperança para crianças hospitalizadas através do trabalho voluntário dos Doutores Palhaços. Conheça nossa missão de humanizar o ambiente hospitalar.',
  keywords: [
    'doutores palhaços',
    'ONG',
    'voluntariado',
    'crianças hospitalizadas',
    'humanização hospitalar',
    'alegria',
    'palhaços',
    'hospital',
    'saúde infantil',
    'trabalho social',
    'SOS Bom Humor',
  ],
  authors: [{ name: 'SOS Bom Humor Doutores Palhaços' }],
  creator: 'SOS Bom Humor Doutores Palhaços',
  publisher: 'SOS Bom Humor Doutores Palhaços',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    siteName: 'SOS Bom Humor Doutores Palhaços',
    title: 'SOS Bom Humor Doutores Palhaços | Levando Alegria aos Hospitais',
    description:
      'ONG brasileira que leva alegria, carinho e esperança para crianças hospitalizadas através do trabalho voluntário dos Doutores Palhaços.',
    images: [
      {
        url: '/images/hero-section.webp',
        width: 1200,
        height: 630,
        alt: 'Doutores Palhaços levando alegria para crianças em hospitais',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOS Bom Humor Doutores Palhaços | Levando Alegria aos Hospitais',
    description:
      'ONG brasileira que leva alegria, carinho e esperança para crianças hospitalizadas através do trabalho voluntário dos Doutores Palhaços.',
    images: ['/images/hero-section.webp'],
    creator: '@doutorespalhacos',
    site: '@doutorespalhacos',
  },

  alternates: {
    canonical: baseUrl,
    languages: {
      'pt-BR': baseUrl,
      'x-default': baseUrl,
    },
  },
  category: 'Non-profit Organization',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <link rel="icon" href="/images/icon-site.png" sizes="any" />
        <link
          rel="icon"
          href="/images/icon-site.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/images/icon-site.png"
          type="image/png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/images/icon-site.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${InterFont.className} ${BebasFont.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
