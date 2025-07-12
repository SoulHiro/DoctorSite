'use client'

import AboutSection from '@/components/landing-page/about-section'
import BlogSection from '@/components/landing-page/blog-section'
import GallerySection from '@/components/landing-page/gallery-section'
import HeroSection from '@/components/landing-page/hero-section'
import ImpactSection from '@/components/landing-page/impact-section'
import { Partners } from '@/components/landing-page/partners'
import TestimonialsSection from '@/components/landing-page/testimonals'

import FooterPublic from './(public)/_components/shared/footer'
import HeaderPublic from './(public)/_components/shared/header'

export default function Home() {
  const containerClassName = 'relative mx-auto w-full max-w-6xl space-y-16'
  return (
    <div className="min-h-screen w-full space-y-16 bg-transparent pb-8">
      <HeaderPublic />
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
        <FooterPublic />
      </div>
    </div>
  )
}
