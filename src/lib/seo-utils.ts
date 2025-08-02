import { Metadata } from 'next'

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://doutorespalhacos.com'
const defaultImage = '/images/hero-section.webp'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  noIndex?: boolean
  canonicalUrl?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = defaultImage,
  url,
  type = 'website',
  noIndex = false,
  canonicalUrl,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: SEOConfig): Metadata {
  const fullTitle = title.includes('SOS Bom Humor')
    ? title
    : `${title} | SOS Bom Humor Doutores Palhaços`

  const pageUrl = url ? `${baseUrl}${url}` : baseUrl
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  const allKeywords = [
    ...keywords,
    'doutores palhaços',
    'ONG',
    'voluntariado',
    'crianças hospitalizadas',
    'humanização hospitalar',
  ]

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: 'SOS Bom Humor Doutores Palhaços',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/webp',
        },
      ],
      locale: 'pt_BR',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@doutorespalhacos',
      site: '@doutorespalhacos',
    },
    alternates: {
      canonical: canonicalUrl || pageUrl,
    },
  }
}

export const defaultSEOKeywords = [
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
]

export const generatePageURL = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`
}
