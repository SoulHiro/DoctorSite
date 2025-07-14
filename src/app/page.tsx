'use client'

import AboutSection from '@/components/landing-page/about-section'
import BlogSection from '@/components/landing-page/blog-section'
import GallerySection from '@/components/landing-page/gallery-section'
import HeroSection from '@/components/landing-page/hero-section'
import ImpactSection from '@/components/landing-page/impact-section'
import { Partners } from '@/components/landing-page/partners'
import TestimonialsSection from '@/components/landing-page/testimonals'

export default function Home() {
  const containerClassName = 'relative mx-auto w-full max-w-6xl space-y-16'
  return (
    <div className="w-screen space-y-16 bg-transparent">
      <HeroSection />
      <div className={containerClassName}>
        <AboutSection />
        <ImpactSection />
      </div>
      <GallerySection />
      <TestimonialsSection />
      <div className={containerClassName}>
        <BlogSection />
        <Partners />
      </div>
    </div>
  )
}
