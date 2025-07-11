import Image from 'next/image'

import { Button } from '../ui/button'
const HeroSection = () => {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-section.webp"
        alt="Seção principal - Doutores Palhaços"
        fill
        quality={100}
        priority
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        sizes="100vw"
      />
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 -z-10 bg-black/60" />
      <div
        id="hero-section"
        className="relative z-10 flex h-full w-full flex-col items-center justify-center space-y-6 px-4"
      >
        <h1 className="text-center text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
          Um Sorriso que <span className="text-red-500">Cura</span>
        </h1>
        <p className="max-w-2xl text-center text-lg text-white drop-shadow-md md:text-xl">
          <b>Levando alegria a quem precisa com um gesto simples. </b>
          Nossos Doutores Palhaços transformam o ambiente hospitalar em um lugar
          de esperança e sorrisos.
        </p>
        <div className="flex flex-row gap-4">
          <Button className="rounded-full bg-red-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-red-600">
            Doe agora e Transforme Vidas
          </Button>
          <Button className="text-foreground rounded-full bg-white px-6 py-3 text-lg font-semibold shadow-lg transition hover:bg-white/80">
            Conheça nosso Trabalho
          </Button>
        </div>
      </div>
      {/* Box branco translúcido na base */}
      <div className="absolute right-0 -bottom-10 left-0 z-50">
        <div className="mx-auto h-20 w-6xl max-w-5xl rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-md" />
      </div>
    </section>
  )
}

export default HeroSection
