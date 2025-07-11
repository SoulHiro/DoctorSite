'use client'

import AboutSection from '@/components/landing-page/about-section'
import HeroSection from '@/components/landing-page/hero-section'
import ImpactSection from '@/components/landing-page/impact-section'

import FooterPublic from './(public)/_components/shared/footer'
import HeaderPublic from './(public)/_components/shared/header'

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-transparent">
      <HeaderPublic />
      <HeroSection />
      <div className="relative mx-auto w-full max-w-6xl">
        <AboutSection />
        <ImpactSection />
      </div>
      <FooterPublic />
    </div>
  )
}
