'use client'

import { MessageSquare } from 'lucide-react'

import { HeroSection } from '@/components/shared/hero-section'

import { ContactForm, ContactInfo } from './_components'

export default function ContactPage() {
  return (
    <div className="space-y-16">
      <HeroSection
        title="Fale Conosco"
        subtitle="Estamos aqui para ajudar você. Entre em contato conosco e descubra como pode fazer parte da nossa missão de levar alegria e esperança."
        icon={MessageSquare}
        backgroundImage="/images/doctors/doutores3.jpg"
      />

      <div className="flex flex-col items-center space-y-16">
        {/* Conteúdo principal */}
        <div className="grid w-full max-w-6xl gap-16 lg:grid-cols-2">
          {/* Contact Information - Left Side */}
          <ContactInfo />

          {/* Contact Form - Right Side */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
