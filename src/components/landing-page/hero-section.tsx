import Image from 'next/image'

import { Button } from '../ui/button'

const HeroSection = () => {
  return (
    <div className="flex h-screen w-screen">
      <section className="relative -z-10 flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-section.webp"
          alt="Seção principal - Doutores Palhaços"
          fill
          quality={100}
          priority
          className="-z-100 object-cover"
          sizes="100vw"
        />
        {/* Overlay escuro para contraste */}
        <div className="absolute inset-0 -z-90 bg-black/60" />
        <div
          id="hero-section"
          className="relative z-0 flex h-full w-full flex-col items-center justify-center space-y-6"
        >
          <h1 className="text-center text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
            Um Sorriso que <span className="text-red-500">Cura</span>
          </h1>
          <p className="text-md md:text-md max-w-2xl text-center text-white drop-shadow-md">
            <b>Levando alegria a quem precisa com um gesto simples. </b>
            Nossos Doutores Palhaços transformam o ambiente hospitalar em um
            lugar de esperança e sorrisos.
          </p>
          <div className="flex flex-row gap-4">
            <Button
              size="default"
              className="w-fit rounded-full bg-red-500 font-semibold text-white shadow transition duration-300 hover:scale-105 hover:bg-red-600"
            >
              Doe agora e Transforme Vidas
            </Button>
            <Button
              size="default"
              className="w-fit rounded-full bg-white font-semibold text-black shadow transition duration-300 hover:scale-105 hover:bg-gray-200"
            >
              Conheça nosso Trabalho
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
