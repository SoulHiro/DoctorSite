import { Metadata } from 'next'

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://doutorespalhacos.com'
const defaultImage = '/images/doctors/doutores1.jpg'

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
    'SOS Bom Humor',
    'doutores palhaços',
    'palhaçaria hospitalar',
    'voluntariado hospitalar RS',
    'humanização hospitalar',
    'arte como cuidado',
    'Rir é o Melhor Remédio',
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
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': 0,
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
      site: '@doutorespalhacos',
    },
    alternates: {
      canonical: canonicalUrl || pageUrl,
    },
  }
}

export const defaultSEOKeywords = [
  'SOS Bom Humor',
  'doutores palhaços',
  'palhaçaria hospitalar',
  'voluntariado hospitalar RS',
  'humanização hospitalar',
  'arte como cuidado',
  'Rir é o Melhor Remédio',
  'hospital Rio Grande do Sul',
  'voluntários da saúde',
  'alegria no hospital',
]

export const generatePageURL = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`
}
