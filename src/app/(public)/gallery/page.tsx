import { PageContainer } from '@/components/ui/page-container'

import GalleryFeaturedImages from './_components/featured-images'
import GalleryHeroSection from './_components/hero-section'
import GalleryPortfolioSection from './_components/mini-portfolio'
import GalleryMunicipalities from './_components/municipalities-section'

const GalleryPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      {/* Hero Section */}
      <PageContainer>
        <GalleryHeroSection />
      </PageContainer>

      {/* Featured Images */}
      <PageContainer>
        <GalleryFeaturedImages />
      </PageContainer>

      {/* Mini-Portfolio - largura total com background */}
      <GalleryPortfolioSection />

      {/* Municipalities */}
      <PageContainer>
        <GalleryMunicipalities />
      </PageContainer>
    </main>
  )
}

export default GalleryPage
