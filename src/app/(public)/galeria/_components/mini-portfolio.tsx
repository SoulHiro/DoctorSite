'use client'

import { motion } from 'framer-motion'
import { Camera, Smile, Sparkles } from 'lucide-react'
import Image from 'next/image'

import { brandDesign } from '@/lib/brand-design'

const GalleryPortfolioSection = () => {
  const fadeUpAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      duration: 0.6,
      ease: brandDesign.animations.easing.smooth,
    },
    viewport: { once: true },
  }

  return (
    <section className="flex py-20">
      <div className="mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header da seção */}
          <motion.div className="space-y-4 text-center" {...fadeUpAnimation}>
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 p-3">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-xl text-transparent md:text-2xl lg:text-3xl">
              Nossa Fotógrafa
            </h2>
            <p className="text-md mx-auto max-w-3xl leading-relaxed text-slate-600">
              Conheça a profissional responsável por capturar todos os momentos
              especiais dos nossos Doutores Palhaços em ação.
            </p>
          </motion.div>

          {/* Conteúdo principal */}
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-16">
            {/* Foto da Daniela */}
            <motion.div
              className="w-full max-w-md lg:w-2/5"
              {...fadeUpAnimation}
            >
              <div className="group relative">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                    width={500}
                    height={625}
                    alt="Daniela - Fotógrafa Profissional"
                    src="/images/others/daniela.jpg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            </motion.div>

            {/* Informações */}
            <motion.div className="w-full lg:w-3/5" {...fadeUpAnimation}>
              <div className="space-y-8">
                {/* Nome e cargo */}
                <motion.div
                  className="text-center lg:text-left"
                  {...fadeUpAnimation}
                >
                  <h3 className="bg-clip-text text-xl md:text-2xl lg:text-3xl 2xl:text-4xl">
                    Daniela
                  </h3>
                  <p className="md:text-md bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-sm font-semibold text-transparent lg:text-lg">
                    Fotógrafa Profissional
                  </p>
                </motion.div>

                {/* Sobre */}
                <motion.div className="space-y-4" {...fadeUpAnimation}>
                  <h4 className="text-center text-lg text-slate-800 md:text-xl lg:text-left lg:text-2xl">
                    Sobre Meu Trabalho
                  </h4>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-600 md:space-y-4 md:text-base lg:text-lg">
                    <p className="text-center md:leading-relaxed lg:text-left lg:leading-loose">
                      Especializada em capturar momentos únicos e autênticos,
                      transformo cada sessão em uma experiência especial. Minha
                      paixão pela fotografia vai além da técnica - é sobre
                      contar histórias através de cada imagem.
                    </p>
                    <p className="text-center md:leading-relaxed lg:text-left lg:leading-loose">
                      Com uma abordagem personalizada e atenta aos detalhes,
                      trabalho para criar memórias que durarão para sempre,
                      sempre buscando a perfeição em cada clique.
                    </p>
                  </div>
                </motion.div>

                {/* Estatísticas */}
                <motion.div
                  className="grid grid-cols-3 gap-4 py-6 sm:gap-6"
                  {...fadeUpAnimation}
                >
                  <div className="flex flex-col items-center space-y-2 text-center sm:space-y-3">
                    <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-2 shadow-lg sm:p-4">
                      <Camera className="h-4 w-4 text-blue-600 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <span className="block text-base font-bold text-slate-800 sm:text-xl">
                        500+
                      </span>
                      <span className="text-xs tracking-wide text-slate-600 sm:text-sm">
                        Fotografias
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-2 text-center sm:space-y-3">
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-2 shadow-lg sm:p-4">
                      <Smile className="h-4 w-4 text-emerald-600 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <span className="block text-base font-bold text-slate-800 sm:text-xl">
                        2+
                      </span>
                      <span className="text-xs tracking-wide text-slate-600 sm:text-sm">
                        Anos
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-2 text-center sm:space-y-3">
                    <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-2 shadow-lg sm:p-4">
                      <Sparkles className="h-4 w-4 text-purple-600 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <span className="block text-base font-bold text-slate-800 sm:text-xl">
                        ∞
                      </span>
                      <span className="text-xs tracking-wide text-slate-600 sm:text-sm">
                        Momentos
                      </span>
                    </div>
                  </div>
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
