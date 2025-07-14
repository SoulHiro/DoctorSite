import { faker } from '@faker-js/faker'
import Image from 'next/image'

// Cidades brasileiras em ordem alfabética
const cidadesBrasileiras = [
  'Alto Alegre',
  'Boa Vista do Incra',
  'Campos Borges',
  'Carazinho',
  'Colorado',
  'Cruz Alta',
  'Espumoso',
  'Fortaleza dos Valos',
  'Lagoa dos Três Cantos',
  'Mormaço',
  'Não‑Me‑Toque',
  'Saldanha Marinho',
  'Santa Bárbara do Sul',
  'Selbach',
  'Victor Graeff',
]

// Função para gerar múltiplas imagens
export function generateGalleryImages(count = 15) {
  return cidadesBrasileiras.slice(0, count).map((cidade, index) => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(2),
    cidade,
    imageURL: `https://picsum.photos/800/600?random=${Math.random() * 10000 + index}`,
  }))
}

// Componente atualizado usando o faker
const GalleryMunicipalities = () => {
  // Gera 15 imagens fake com maior variedade
  const featuredImagesFake = generateGalleryImages(15)

  return (
    <section className="flex w-full flex-col items-center justify-center py-16">
      <h2 className="mb-8 text-4xl font-bold">Municípios</h2>
      <div className="grid w-full max-w-6xl grid-cols-3 gap-6">
        {featuredImagesFake.map((image) => (
          <div key={image.id} className="basis-1/3">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                width={400}
                height={400}
                src={image.imageURL}
                alt={image.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay com mais informações */}
              <div
                className={`absolute inset-0 flex flex-col justify-end rounded-lg bg-gradient-to-t from-black/60 via-black/40 to-transparent p-4 opacity-100`}
              >
                <h3 className="text-xl font-semibold text-white">
                  {image.cidade}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GalleryMunicipalities
