'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { ReactNode } from 'react'

import { PageContainer } from '@/components/ui/page-container'

interface HeroSectionProps {
  title: string
  subtitle: string
  icon?: LucideIcon
  iconElement?: ReactNode
  children?: ReactNode
  className?: string
  backgroundImage: string
}

export function HeroSection({
  title,
  subtitle,
  icon: Icon,
  iconElement,
  children,
  className = '',
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-gray-900 ${className}`}>
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay escuro */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Elementos decorativos animados */}
      <motion.div
        className="absolute top-20 left-10 z-20 h-20 w-20 animate-pulse rounded-full bg-yellow-400/30 blur-xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute right-10 bottom-20 z-20 h-32 w-32 animate-pulse rounded-full bg-purple-400/30 blur-xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 z-20 h-16 w-16 animate-bounce rounded-full bg-pink-400/20 blur-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute bottom-10 left-1/3 z-20 h-12 w-12 animate-ping rounded-full bg-orange-400/25 blur-md"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
      />

      <PageContainer className="relative z-30 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="animate-fade-in-up space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Ícone opcional */}
            {(Icon || iconElement) && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: 'easeOut',
                }}
              >
                <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm">
                  {Icon && <Icon className="h-16 w-16 text-white" />}
                  {iconElement && iconElement}
                </div>
              </motion.div>
            )}

            {/* Título */}
            <motion.h1
              className="text-4xl font-light text-white drop-shadow-lg md:text-5xl 2xl:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: 'easeOut',
              }}
            >
              {title}
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              className="text-md md:text-md max-w-4xl p-4 text-center text-white drop-shadow-md sm:p-0 2xl:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: 'easeOut',
              }}
            >
              {subtitle}
            </motion.p>

            {/* Conteúdo adicional (busca, botões, etc.) */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: 'easeOut',
                }}
              >
                {children}
              </motion.div>
            )}
          </motion.div>
        </div>
      </PageContainer>
    </section>
  )
}
