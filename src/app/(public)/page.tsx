import AboutSection from '@/components/landing-page/about-section'
import BlogSection from '@/components/landing-page/blog-section'
import GallerySection from '@/components/landing-page/gallery-section'
import HeroSection from '@/components/landing-page/hero-section'
import ImpactSection from '@/components/landing-page/impact-section'
import { Partners } from '@/components/landing-page/partners'
import TestimonialsSection from '@/components/landing-page/testimonals'

export default function Home() {
  return (
    <div className={`w-full space-y-16 bg-gradient-to-br`}>
      <HeroSection />
      <div className="space-y-16">
        <AboutSection />
        <ImpactSection />
      </div>
      <GallerySection />
      <TestimonialsSection />
      <div className="space-y-16">
        <BlogSection />
        <Partners />
      </div>
    </div>
  )
}
