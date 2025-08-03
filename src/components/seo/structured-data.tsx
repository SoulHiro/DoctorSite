import Script from 'next/script'
import { useMemo } from 'react'

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'article' | 'event'
  data?: Record<string, unknown>
}

export function StructuredData({
  type = 'organization',
  data = {},
}: StructuredDataProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://doutorespalhacos.com'

  const jsonLd = useMemo(() => {
    if (type === 'organization') {
      return {
        '@context': 'https://schema.org',
        '@type': 'NonprofitOrganization',
        name: 'SOS Bom Humor Doutores Palhaços',
        alternateName: ['Doutores Palhaços', 'SOS Bom Humor'],
        description:
          'ONG voluntária do RS que há 3 anos visita +20 hospitais levando palhaçaria hospitalar para mais de 60 000 pacientes, famílias e profissionais de saúde.',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo.webp`,
          width: 512,
          height: 512,
        },
        image: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/og-hero.webp`,
          width: 1200,
          height: 630,
        },
        sameAs: [
          'https://www.instagram.com/doutorespalhacos',
          'https://www.facebook.com/doutorespalhacos',
          'https://www.youtube.com/@doutorespalhacos',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'volunteering',
          email: 'contato@doutorespalhacos.com',
          availableLanguage: ['Portuguese', 'English'],
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BR',
          addressRegion: 'RS',
          addressLocality: 'Ibirubá',
        },
        foundingDate: '2022',
        mission:
          'Levar alegria, acolhimento e humanização a crianças, acompanhantes e equipes de saúde com visitas palhaças voluntárias.',
        donationUrl: `${baseUrl}/doe-agora`,
        areaServed: ['Rio Grande do Sul'],
        ...data,
      }
    }

    if (type === 'website') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'SOS Bom Humor Doutores Palhaços',
        description:
          'Site oficial da ONG que promove palhaçaria hospitalar voluntária no RS com o projeto Rir é o Melhor Remédio.',
        url: baseUrl,
        publisher: {
          '@type': 'NonprofitOrganization',
          name: 'SOS Bom Humor Doutores Palhaços',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logo.webp`,
          },
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'pt-BR',
        ...data,
      }
    }

    if (type === 'article') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data?.url ?? baseUrl,
        },
        headline: data?.headline ?? '',
        image: data?.image
          ? { '@type': 'ImageObject', ...data.image }
          : undefined,
        author: {
          '@type': 'Organization',
          name: 'SOS Bom Humor Doutores Palhaços',
        },
        publisher: {
          '@type': 'Organization',
          name: 'SOS Bom Humor Doutores Palhaços',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logo.webp`,
          },
        },
        datePublished: data?.datePublished ?? undefined,
        dateModified: data?.dateModified ?? undefined,
        description: data?.description ?? undefined,
        inLanguage: 'pt-BR',
        ...data,
      }
    }

    if (type === 'event') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: data?.name ?? 'Visita Rir é o Melhor Remédio',
        startDate: data?.startDate,
        endDate: data?.endDate,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: data?.locationName ?? 'Hospital ou Unidade de Saúde',
          address: data?.locationAddress ?? {},
        },
        organizer: {
          '@type': 'NonprofitOrganization',
          name: 'SOS Bom Humor Doutores Palhaços',
          url: baseUrl,
        },
        description: data?.description ?? '',
        inLanguage: 'pt-BR',
        ...data,
      }
    }

    // fallback: just merge data keys
    return data
  }, [type, data, baseUrl])

  // Render only if structuredData has at least @context
  if (!jsonLd || typeof jsonLd !== 'object') return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
