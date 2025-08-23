import AboutSection from '@/components/landing-page/about-section'
import BlogSection from '@/components/landing-page/blog-section'
import GallerySection from '@/components/landing-page/gallery-section'
import HeroSection from '@/components/landing-page/hero-section'
import ImpactSection from '@/components/landing-page/impact-section'
import Partners from '@/components/landing-page/partners'
import TestimonialsSection from '@/components/landing-page/testimonals'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils'

export const metadata = generateSEOMetadata({
  title: 'SOS Bom Humor Doutores Palhaços | Levando Alegria aos Hospitais',
  description:
    'ONG brasileira que leva alegria, carinho e esperança para crianças hospitalizadas através do trabalho voluntário dos Doutores Palhaços. Conheça nossa missão de humanizar o ambiente hospitalar e como você pode participar.',
  keywords: [
    'doutores palhaços',
    'voluntariado hospitalar',
    'crianças hospitalizadas',
    'humanização da saúde',
    'palhaçoterapia',
    'ONG Brasil',
    'trabalho social',
    'alegria hospital',
    'cuidado infantil',
    'arte terapia',
  ],
  url: '/',
  image: '/images/hero-section.webp',
})

export default function Home() {
  return (
    <div className={`w-full bg-gradient-to-br`}>
      <HeroSection />
      <div className="space-y-16 pt-32 pb-16 sm:space-y-32">
        <div className="space-y-16 sm:space-y-64">
          <AboutSection />
          <ImpactSection />
        </div>
        <GallerySection />
        <TestimonialsSection />
        <div className="space-y-16 sm:space-y-16">
          <BlogSection />
          <Partners />
        </div>
      </div>
    </div>
  )
}
