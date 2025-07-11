import Image from 'next/image'

const AboutSection = () => {
  return (
    <section className="h-fit w-full py-32">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-center space-x-8 md:flex-row md:items-stretch">
        {/* Coluna das imagens à esquerda */}
        <div className="flex w-full flex-row gap-4">
          {/* Grid de imagens: duas em cima, uma embaixo */}
          <div className="flex w-full flex-col gap-4">
            {/* Imagem 1 */}
            <div className="group relative top-12 h-3/5 w-full overflow-hidden rounded-xl bg-gray-300">
              <Image
                src="/images/hero-section.webp"
                alt="Sobre Nós miniatura 1"
                fill
                quality={100}
                className="object-cover saturate-0 transition-all duration-300 group-hover:scale-105 group-hover:saturate-100"
                sizes="(max-width: 768px) 50vw, 192px"
              />
            </div>
            {/* Imagem 2 */}
            <div className="group relative top-20 left-24 h-2/5 w-48 overflow-hidden rounded-xl bg-gray-400">
              <Image
                src="/images/hero-section.webp"
                alt="Sobre Nós miniatura 2"
                fill
                quality={100}
                className="object-cover saturate-0 transition-all duration-300 group-hover:scale-105 group-hover:saturate-100"
                sizes="(max-width: 768px) 50vw, 192px"
              />
            </div>
          </div>
          {/* Imagem centralizada abaixo */}
          <div className="flex h-full w-full justify-center">
            <div className="group relative h-full w-4/5 overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg">
              <Image
                src="/images/hero-section.webp"
                alt="Sobre Nós principal"
                fill
                quality={100}
                className="object-cover transition-all duration-300 group-hover:scale-105"
                sizes="160px"
              />
            </div>
          </div>
        </div>
        {/* Coluna do texto à direita */}
        <div className="flex w-full flex-col justify-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Sobre Nós</h2>
          <p className="text-lg text-gray-600">
            A SOS Bom Humor Doutores Palhaços é uma ONG voluntária brasileira
            que, por meio da arte da palhaçaria hospitalar, leva alegria,
            acolhimento e descontração a pacientes, acompanhantes e equipes em
            hospitais, postos de saúde e asilos; nossos voluntários —
            transformados em “doutores-palhaços” com jalecos coloridos, narizes
            vermelhos e interações lúdicas como música, mágicas e teatro —
            promovem verdadeiras “visitas médicas” em que o riso se torna
            ferramenta de humanização, conforto emocional e bem-estar em
            momentos de fragilidade
          </p>
          <button className="rounded-full bg-red-500 px-8 py-2 font-semibold text-white shadow transition hover:bg-blue-700">
            Saiba mais
          </button>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
