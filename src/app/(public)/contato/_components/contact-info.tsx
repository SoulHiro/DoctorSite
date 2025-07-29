'use client'

import { motion } from 'framer-motion'

import { brandDesign } from '@/lib/brand-design'

import { SocialMedia } from './social-media'

export function ContactInfo() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-8"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        ease: brandDesign.animations.easing.smooth,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: brandDesign.animations.easing.smooth,
        }}
      >
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Entre em Contato
        </h2>
        <p className="text-lg text-gray-600">
          Estamos aqui para esclarecer suas dúvidas e ajudar você a fazer parte
          da nossa missão de levar alegria aos hospitais.
        </p>
      </motion.div>
      <SocialMedia />
    </motion.div>
  )
}
