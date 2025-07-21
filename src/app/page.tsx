'use client'

import AboutSection from '@/components/landing-page/about-section'
import BlogSection from '@/components/landing-page/blog-section'
import GallerySection from '@/components/landing-page/gallery-section'
import HeroSection from '@/components/landing-page/hero-section'
import ImpactSection from '@/components/landing-page/impact-section'
import { Partners } from '@/components/landing-page/partners'
import TestimonialsSection from '@/components/landing-page/testimonals'
import { PageContainer } from '@/components/ui/page-container'

export default function Home() {
  return (
    <div className="w-full space-y-16 bg-transparent">
      <HeroSection />
      <PageContainer className="space-y-16">
        <AboutSection />
        <ImpactSection />
      </PageContainer>
      <GallerySection />
      <TestimonialsSection />
      <PageContainer className="space-y-16">
        <BlogSection />
        <Partners />
      </PageContainer>
    </div>
  )
}
