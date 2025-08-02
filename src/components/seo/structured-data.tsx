import Script from 'next/script'

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'article' | 'event'
  data?: Record<string, unknown>
}

export function StructuredData({
  type = 'organization',
  data,
}: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'https://doutorespalhacos.com'

    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'NonProfitOrganization',
          name: 'SOS Bom Humor Doutores Palhaços',
          alternateName: ['Doutores Palhaços', 'SOS Bom Humor'],
          description:
            'ONG brasileira que leva alegria, carinho e esperança para crianças hospitalizadas através do trabalho voluntário dos Doutores Palhaços.',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/icon-site.png`,
            width: 512,
            height: 512,
          },
          image: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/hero-section.webp`,
            width: 1200,
            height: 630,
          },
          sameAs: [
            'https://www.facebook.com/doutorespalhacos',
            'https://www.instagram.com/doutorespalhacos',
            'https://www.youtube.com/doutorespalhacos',
            'https://twitter.com/doutorespalhacos',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'contato@doutorespalhacos.com',
            availableLanguage: 'Portuguese',
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'BR',
            addressLocality: 'São Paulo',
            addressRegion: 'SP',
          },
          foundingDate: '2000',
          nonprofitStatus: 'Nonprofit501c3',
          seeks:
            'Humanização do ambiente hospitalar através da arte do palhaço',
          mission:
            'Levar alegria, carinho e esperança para crianças hospitalizadas e suas famílias',
          knowsAbout: [
            'Voluntariado hospitalar',
            'Humanização da saúde',
            'Arte terapia',
            'Cuidado infantil',
            'Palhaçoterapia',
          ],
          ...data,
        }

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'SOS Bom Humor Doutores Palhaços',
          description: 'Site oficial da ONG SOS Bom Humor Doutores Palhaços',
          url: baseUrl,
          publisher: {
            '@type': 'NonProfitOrganization',
            name: 'SOS Bom Humor Doutores Palhaços',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/icon-site.png`,
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

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          publisher: {
            '@type': 'NonProfitOrganization',
            name: 'SOS Bom Humor Doutores Palhaços',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/icon-site.png`,
            },
          },
          author: {
            '@type': 'Organization',
            name: 'SOS Bom Humor Doutores Palhaços',
          },
          inLanguage: 'pt-BR',
          ...data,
        }

      case 'event':
        return {
          '@context': 'https://schema.org',
          '@type': 'Event',
          organizer: {
            '@type': 'NonProfitOrganization',
            name: 'SOS Bom Humor Doutores Palhaços',
            url: baseUrl,
          },
          location: {
            '@type': 'Place',
            addressCountry: 'BR',
          },
          inLanguage: 'pt-BR',
          ...data,
        }

      default:
        return data
    }
  }

  const structuredData = getStructuredData()

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
