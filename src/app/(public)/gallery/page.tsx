import GalleryFeaturedImages from './_components/featured-images'
import GalleryHeroSection from './_components/hero-section'
import GalleryPortfolioSection from './_components/mini-portfolio'
import GalleryMunicipalities from './_components/municipalities-section'

const GalleryPage = () => {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-start overflow-hidden">
      <div className="flex w-full max-w-6xl flex-col justify-center space-y-8">
        {/* Hero Section */}
        <GalleryHeroSection />

        {/* Featured Images */}
        <GalleryFeaturedImages />
      </div>

      {/* Mini-Portfolio - Width Full */}
      <GalleryPortfolioSection />

      <div className="flex w-full max-w-6xl flex-col justify-center space-y-8">
        {/* Photos by Municipality */}
        <GalleryMunicipalities />
      </div>
    </main>
  )
}

export default GalleryPage
