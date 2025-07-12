import Image from 'next/image'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const posts = [
  {
    id: 1,
    title: 'A Importância da Humanização Hospitalar Pediátrica',
    excerpt:
      'Como a arte da palhaçaria transforma o ambiente hospitalar e contribui para o bem-estar de pacientes, familiares e profissionais de saúde.',
    image: '/images/hero-section.webp',
    category: 'Saúde',
  },
  {
    id: 2,
    title: 'Risos que Curam: O Poder Terapêutico da Alegria',
    excerpt:
      'Descobra como o humor libera endorfinas, reduz estresse e fortalece o sistema imunológico de crianças hospitalizadas.',
    image: '/images/hero-section.webp',
    category: 'Terapia',
  },
  {
    id: 3,
    title: 'Capacitação de Voluntários: Técnicas de Palhaçaria Hospitalar',
    excerpt:
      'Conheça os métodos e treinamentos essenciais para se tornar um doutor palhaço humanitário eficaz.',
    image: '/images/hero-section.webp',
    category: 'Voluntariado',
  },
]

const BlogSection = () => {
  return (
    <section className="w-full py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center space-y-8 px-4">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Nosso Blog</h2>
          <p className="text-md max-w-2xl text-gray-500">
            Fique por dentro de novidades sobre humanização hospitalar, técnicas
            de palhaçaria terapêutica e histórias inspiradoras do nosso
            trabalho.
          </p>
        </div>

        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="mx-auto grid w-fit grid-cols-4">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="saude">Saúde</TabsTrigger>
            <TabsTrigger value="terapia">Terapia</TabsTrigger>
            <TabsTrigger value="voluntariado">Voluntariado</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="mt-8">
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
                >
                  <div className="relative h-48 w-full bg-gray-200">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-3 p-6">
                    <span className="text-xs font-semibold text-red-500 uppercase">
                      {post.category}
                    </span>
                    <h3 className="line-clamp-2 text-lg font-bold text-gray-900">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 flex-1 text-sm text-gray-600">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>

          {['saude', 'terapia', 'voluntariado'].map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
                {posts
                  .filter((post) => post.category.toLowerCase() === category)
                  .map((post) => (
                    <article
                      key={post.id}
                      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
                    >
                      <div className="relative h-48 w-full bg-gray-200">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col space-y-3 p-6">
                        <span className="text-xs font-semibold text-red-500 uppercase">
                          {post.category}
                        </span>
                        <h3 className="line-clamp-2 text-lg font-bold text-gray-900">
                          {post.title}
                        </h3>
                        <p className="line-clamp-3 flex-1 text-sm text-gray-600">
                          {post.excerpt}
                        </p>
                      </div>
                    </article>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export default BlogSection
