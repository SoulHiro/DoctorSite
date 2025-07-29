'use client'

import { motion } from 'framer-motion'
import { Camera, Smile, Sparkles } from 'lucide-react'
import Image from 'next/image'

import { brandDesign } from '@/lib/brand-design'

const GalleryPortfolioSection = () => {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Elementos decorativos */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 h-32 w-32 rounded-full bg-orange-200/20 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-20 bottom-1/4 h-24 w-24 rounded-full bg-pink-200/30 blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [-10, 10, -10],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header da seção */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: brandDesign.animations.easing.smooth,
            }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 p-3">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="mb-2 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
              Nossa Fotógrafa
            </h2>
            <p className="text-md mx-auto max-w-3xl leading-relaxed text-slate-600">
              Conheça a profissional responsável por capturar todos os momentos
              especiais dos nossos Doutores Palhaços em ação.
            </p>
          </motion.div>

          {/* Conteúdo principal */}
          <div className="flex flex-col space-y-12 lg:flex-row lg:space-y-0 lg:space-x-16">
            {/* Foto da Daniela */}
            <motion.div
              className="w-full lg:w-2/5"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: brandDesign.animations.easing.smooth,
              }}
              viewport={{ once: true }}
            >
              <div className="group relative">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={500}
                    height={625}
                    alt="Daniela - Fotógrafa Profissional"
                    src="/images/others/daniela.jpg"
                  />

                  {/* Overlay sutil no hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            </motion.div>

            {/* Informações */}
            <motion.div
              className="flex w-full flex-col justify-center lg:w-3/5"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: brandDesign.animations.easing.smooth,
              }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                {/* Nome e cargo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl font-bold text-slate-800 lg:text-4xl">
                    Daniela
                  </h3>
                  <p className="text-md bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text font-semibold text-transparent">
                    Fotógrafa Profissional
                  </p>
                </motion.div>

                {/* Sobre */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold text-slate-800">
                    Sobre Meu Trabalho
                  </h4>
                  <div className="space-y-4 leading-relaxed text-slate-600">
                    <p>
                      Especializada em capturar momentos únicos e autênticos,
                      transformo cada sessão em uma experiência especial. Minha
                      paixão pela fotografia vai além da técnica - é sobre
                      contar histórias através de cada imagem.
                    </p>
                    <p>
                      Com uma abordagem personalizada e atenta aos detalhes,
                      trabalho para criar memórias que durarão para sempre,
                      sempre buscando a perfeição em cada clique.
                    </p>
                  </div>
                </motion.div>

                {/* Estatísticas */}
                <motion.div
                  className="grid grid-cols-3 gap-6 py-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="flex flex-col items-center space-y-3 text-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-lg">
                      <Camera className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xl font-bold text-slate-800">
                        500+
                      </span>
                      <span className="text-sm tracking-wide text-slate-600">
                        Sessões
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-col items-center space-y-3 text-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 shadow-lg">
                      <Smile className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <span className="block text-xl font-bold text-slate-800">
                        2+
                      </span>
                      <span className="text-sm tracking-wide text-slate-600">
                        Anos
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-col items-center space-y-3 text-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-4 shadow-lg">
                      <Sparkles className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <span className="block text-xl font-bold text-slate-800">
                        ∞
                      </span>
                      <span className="text-sm tracking-wide text-slate-600">
                        Momentos
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryPortfolioSection
