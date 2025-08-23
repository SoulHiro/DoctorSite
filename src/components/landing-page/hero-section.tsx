import Image from 'next/image'

import { Button } from '../ui/button'

const HeroSection = () => {
  return (
    <div className="flex min-h-screen w-full">
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-section1.webp"
          alt="Seção principal - Doutores Palhaços"
          fill
          quality={100}
          priority
          className="-z-10 object-cover"
          sizes="100vw"
        />
        {/* Overlay escuro para contraste */}
        <div className="absolute inset-0 -z-[5] bg-black/70" />
        <div
          id="hero-section"
          className="relative z-10 flex h-full w-full flex-col items-center justify-center space-y-6"
        >
          <h1 className="px-4 text-center text-4xl font-bold text-white drop-shadow-lg sm:font-light md:text-5xl 2xl:text-7xl">
            Um Sorriso que <span className="text-red-500">Cura</span>
          </h1>
          <p className="text-md md:text-md max-w-4xl p-4 text-center text-white drop-shadow-md sm:p-0 2xl:text-xl">
            <b>Levando alegria a quem precisa com um gesto simples. </b>
            Nossos Doutores Palhaços transformam o ambiente hospitalar em um
            lugar de esperança e sorrisos.
          </p>
          <div className="flex flex-col gap-3 px-4 sm:flex-row sm:gap-4">
            <Button
              size="default"
              variant="default"
              className="w-full sm:w-auto"
            >
              Doe agora e Transforme Vidas
            </Button>
            <Button
              size="default"
              variant="default"
              className="w-full bg-white text-black shadow transition duration-300 hover:scale-105 hover:bg-gray-200 sm:w-auto"
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
