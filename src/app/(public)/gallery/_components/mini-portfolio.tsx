import { Camera, Smile, Sparkles } from 'lucide-react'
import Image from 'next/image'

const GalleryPortfolioSection = () => {
  return (
    <section
      id="mini-portfolio"
      className="flex h-fit w-full flex-col items-center justify-center bg-gray-100 py-24"
    >
      <div className="flex h-fit w-6xl flex-row space-x-8">
        <div className="h-120 w-full">
          <Image
            className="h-full w-full rounded-lg object-cover"
            width={400}
            height={400}
            alt="Imagem da Fotografa"
            src="https://images.unsplash.com/photo-1549981832-2ba2ee913334?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="flex flex-col justify-between">
          {/* Head */}
          <div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900">Daniela</h3>
            <p className="mb-4 text-lg font-medium text-amber-600">Fotógrafa</p>
            {/* Biografia */}
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                Com mais de 8 anos de experiência em fotografia, Marina
                desenvolveu um olhar único para capturar a essência de cada
                momento. Especializada em retratos, paisagens urbanas e
                fotografia de eventos, ela combina técnica apurada com
                sensibilidade artística.
              </p>

              <p className="leading-relaxed">
                Formada em Artes Visuais pela USP, Marina acredita que cada
                fotografia conta uma história. Seu trabalho já foi reconhecido
                em diversas exposições e premiações nacionais, sempre buscando
                inovar e emocionar através de suas imagens.
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
