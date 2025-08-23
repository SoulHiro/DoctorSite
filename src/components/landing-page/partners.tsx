'use client'
import { motion } from 'framer-motion'

const partners = [
  'Sicredi Ibirubá',
  'Supermercado Casa do chimarrão',
  'Hospital da comunidade Annes Dias',
  'Indutar tecno Metal',
  'Theo transportes',
]

export default function Partners() {
  const duplicatedPartners = [...partners, ...partners, ...partners]

  return (
    <div className="flex w-full justify-center">
      <div className="relative w-full max-w-6xl overflow-hidden">
        {/* Gradientes laterais */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

        {/* Container com animação */}
        <div className="flex py-4">
          <motion.div
            className="flex gap-32 whitespace-nowrap"
            animate={{
              x: [0, -33.33 + '%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20,
                ease: 'linear',
              },
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <h3
                key={`${partner}-${index}`}
                className="flex-shrink-0 text-lg text-gray-700"
              >
                {partner}
              </h3>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
