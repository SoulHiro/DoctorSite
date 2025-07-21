import { Camera, Smile, Sparkles } from 'lucide-react'
import Image from 'next/image'

const GalleryPortfolioSection = () => {
  return (
    <section
      id="mini-portfolio"
      className="flex w-full flex-col items-center justify-center bg-gray-100 py-24"
    >
      <div className="flex w-full max-w-6xl flex-col space-y-8 px-4 lg:flex-row lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-1/2">
          <div className="aspect-square w-full">
            <Image
              className="h-full w-full rounded-lg object-cover"
              width={400}
              height={400}
              alt="Imagem da Fotografa"
              src="https://images.unsplash.com/photo-1549981832-2ba2ee913334?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
        <div className="flex w-full flex-col justify-between lg:w-1/2">
          {/* Head */}
          <div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900">Daniela</h3>
            <p className="mb-4 text-lg font-medium text-amber-600">Fotógrafa</p>
            {/* Biografia */}
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                Eu costumo dizer que minha câmera fotográfica e meu celular são
                lupas que me possibilitam investigar e descobrir sutilezas da
                minha realidade, perco a noção da hora, porque estou
                profundamente mergulhada no ato de criar pelo que a realidade me
                oferece naquele instante, quando me perguntam se a fotografia é
                uma busca do meu autoconhecimento, eu respondo sim, porque ela é
                uma ferramenta que me possibilita expressar o ser EU... Com
                muito amor e dedicação, levo está vida como um sonho do qual
                não quero acordar.
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-3 gap-6 py-6">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Smile className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Feedback Positivos</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Camera className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Fotografias</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Sparkles className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Desde 2024</div>
              <div className="text-sm text-gray-600">
                Paixão pela fotografia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryPortfolioSection
