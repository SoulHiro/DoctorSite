import './globals.css'

import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { Suspense } from 'react'
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
    default: 'SOS Bom Humor Doutores Palhaços',
    template: '%s | SOS Bom Humor Doutores Palhaços',
  },
  applicationName: 'SOS Bom Humor Doutores Palhaços',
  description:
    'ONG voluntária do norte do RS que há 3 anos leva alegria e humanização a 20+ hospitais com o projeto “Rir é o Melhor Remédio” — mais de 60 000 pacientes impactados.',
  keywords: [
    'SOS Bom Humor',
    'doutores palhaços',
    'palhaçaria hospitalar',
    'voluntariado hospitalar RS',
    'humanização hospitalar',
    'arte como cuidado',
    'Rir é o Melhor Remédio',
  ],
  authors: [{ name: 'SOS Bom Humor Doutores Palhaços', url: baseUrl }],
  creator: 'SOS Bom Humor Doutores Palhaços',
  publisher: 'SOS Bom Humor Doutores Palhaços',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': 0,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'pt-BR': baseUrl,
      'x-default': baseUrl,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? '',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    siteName: 'SOS Bom Humor Doutores Palhaços',
    title: 'SOS Bom Humor | Leve Alegria com o Rir é o Melhor Remédio',
    description:
      'Há mais de 60 000 pacientes, famílias e equipes impactados em 20+ hospitais do RS com nossas visitas palhaças humanizadoras.',
    images: [
      {
        url: '/images/doctors/doutores1.jpg',
        width: 1200,
        height: 630,
        alt: 'Palhaços hospitalares levando alegria em hospitais do RS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOS Bom Humor Doutores Palhaços',
    description:
      'Doutores Palhaços transformando hospitais com humor e acolhimento no RS.',
    images: ['/images/doctors/doutores1.jpg'],
    site: '@doutorespalhacos', // confirme se existir
  },
  icons: {
    icon: ['/favicon-for-app/icon1.png', '/favicon-for-app/favicon.ico'],
    apple: '/favicon-for-app/apple-icon.png',
    other: [{ rel: 'manifest', url: '/favicon-for-app/manifest.json' }],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  category: 'NonprofitOrganization',
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
        <link rel="icon" href="/favicon-for-app/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-for-app/icon1.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon-for-app/icon1.png"
          type="image/png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/favicon-for-app/apple-icon.png" />
        <link rel="manifest" href="/favicon-for-app/manifest.json" />
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
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
