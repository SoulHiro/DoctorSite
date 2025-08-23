'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/ui/page-container'
import { useIsMobile } from '@/hooks/use-mobile'

const AboutSection = () => {
  const imagesRef = useRef(null)
  const isInView = useInView(imagesRef, { once: true })
  const textRef = useRef(null)
  const isInViewText = useInView(textRef, { once: true })

  return (
    <section className="h-fit w-full">
      <PageContainer className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-stretch md:gap-8">
        {/* Coluna das imagens à esquerda */}
        <motion.div
          ref={imagesRef}
          initial={{ opacity: 0, y: -100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="flex w-full flex-row gap-4 md:order-1 md:w-1/2"
        >
          {/* Grid de imagens: duas em cima, uma embaixo */}
          {!useIsMobile() && (
            <div className="flex w-full flex-col gap-4">
              {/* Imagem 1 */}
              <div className="group relative top-4 h-48 w-full overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg sm:top-12 sm:h-3/5 md:h-48 md:border-0 md:bg-gray-300 md:shadow-none">
                <Image
                  src="/images/doctors/doutores2.jpg"
                  alt="Sobre Nós miniatura 1"
                  fill
                  quality={100}
                  className="object-cover saturate-100 transition-all duration-300 group-hover:scale-105 group-hover:saturate-100 md:saturate-0"
                  sizes="(max-width: 768px) 50vw, 192px"
                />
              </div>
              {/* Imagem 2 */}
              <div className="group relative top-6 left-8 hidden overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg sm:top-20 sm:left-20 sm:h-2/5 sm:w-48 md:flex md:border-0 md:bg-gray-400 md:shadow-none">
                <Image
                  src="/images/doctors/doutores3.jpg"
                  alt="Sobre Nós miniatura 2"
                  fill
                  quality={100}
                  className="object-cover saturate-100 transition-all duration-300 group-hover:scale-105 group-hover:saturate-100 md:saturate-0"
                  sizes="(max-width: 768px) 50vw, 192px"
                />
              </div>
            </div>
          )}
          {/* Imagem 3 */}
          <div className="flex h-full w-full justify-center px-4 sm:px-0">
            <div className="group relative h-56 w-full overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg sm:h-full sm:w-4/5">
              <Image
                src="/images/hero-section.webp"
                alt="Sobre Nós principal"
                fill
                quality={100}
                className="object-cover saturate-100 transition-all duration-300 group-hover:scale-105 md:saturate-100"
                sizes="(max-width: 640px) 100vw, 160px"
              />
            </div>
          </div>
        </motion.div>

        {/* Coluna do conteúdo à direita (texto + botão) */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: -100 }}
          animate={isInViewText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="flex w-full flex-col justify-center space-y-6 px-4 md:order-2 md:w-1/2"
        >
          <div className="space-y-4">
            <h2 className="text-center text-gray-900 md:text-start">
              Sobre Nós
            </h2>
            <p className="text-justify text-gray-600 md:text-start">
              A SOS Bom Humor Doutores Palhaços é uma ONG voluntária brasileira
              que, por meio da arte da palhaçaria hospitalar, leva alegria,
              acolhimento e descontração a pacientes, acompanhantes e equipes em
              hospitais, postos de saúde e asilos; nossos voluntários —
              transformados em &quot;doutores-palhaços&quot; com jalecos
              coloridos, narizes vermelhos e interações lúdicas como música,
              mágicas e teatro — promovem verdadeiras &quot;visitas
              médicas&quot; em que o riso se torna ferramenta de humanização,
              conforto emocional e bem-estar em momentos de fragilidade
            </p>
          </div>
          <Button variant="default" size="default" className="w-full sm:w-fit">
            Saiba mais
          </Button>
        </motion.div>
      </PageContainer>
    </section>
  )
}

export default AboutSection
