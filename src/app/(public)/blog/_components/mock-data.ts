export interface Post {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  featured?: boolean
}

export const featuredPosts: Post[] = [
  {
    id: 1,
    title: 'O Sorriso da Maria: Uma Visita Inesquecível',
    excerpt:
      'Como uma simples visita transformou o dia de uma criança no hospital. A história de Maria, de 8 anos, que descobriu que a alegria pode ser encontrada mesmo nos momentos mais difíceis.',
    author: 'Dr. Palhaço Sorriso',
    date: '20 Jan 2024',
    readTime: '5 min',
    category: 'Histórias',
    image: '/images/hero-section.webp',
    featured: true,
  },
  {
    id: 2,
    title: 'Impacto dos Doutores Palhaços em 2024',
    excerpt:
      'Números que mostram como estamos levando alegria aos hospitais de Ibirubá e região. Mais de 500 visitas realizadas e milhares de sorrisos espalhados pelos corredores.',
    author: 'Equipe SOS Bom Humor',
    date: '18 Jan 2024',
    readTime: '8 min',
    category: 'Impacto Social',
    image: '/images/hero-section.webp',
    featured: true,
  },
]

export const latestPosts: Post[] = [
  {
    id: 3,
    title: 'Bastidores: Como Preparamos Nossas Visitas',
    excerpt:
      'Descubra o processo por trás de cada visita aos hospitais. Desde o planejamento até a execução, tudo que fazemos para garantir momentos especiais.',
    author: 'Dr. Palhaço Alegria',
    date: '15 Jan 2024',
    readTime: '6 min',
    category: 'Bastidores',
    image: '/images/hero-section.webp',
  },
  {
    id: 4,
    title: 'Depoimento: A Família Silva',
    excerpt:
      'Como os Doutores Palhaços transformaram a experiência hospitalar da família Silva. Uma história de esperança e superação.',
    author: 'Maria Silva',
    date: '12 Jan 2024',
    readTime: '4 min',
    category: 'Depoimentos',
    image: '/images/hero-section.webp',
  },
  {
    id: 5,
    title: 'Evento: Festa de Natal no Hospital',
    excerpt:
      'Como celebramos o Natal levando alegria e presentes para as crianças internadas. Um dia especial que ficará na memória de todos.',
    author: 'Dr. Palhaço Presente',
    date: '10 Jan 2024',
    readTime: '7 min',
    category: 'Eventos',
    image: '/images/hero-section.webp',
  },
  {
    id: 6,
    title: 'Voluntários: O Coração da Nossa Missão',
    excerpt:
      'Conheça os voluntários que dedicam seu tempo para levar alegria aos hospitais. Histórias inspiradoras de pessoas que fazem a diferença.',
    author: 'Coordenação SOS Bom Humor',
    date: '8 Jan 2024',
    readTime: '9 min',
    category: 'Voluntários',
    image: '/images/hero-section.webp',
  },
  {
    id: 7,
    title: 'Reflexões: O Poder do Riso na Cura',
    excerpt:
      'Como o riso e a alegria podem auxiliar no processo de cura. Reflexões baseadas em nossa experiência com pacientes.',
    author: 'Dr. Palhaço Esperança',
    date: '5 Jan 2024',
    readTime: '6 min',
    category: 'Reflexões',
    image: '/images/hero-section.webp',
  },
  {
    id: 8,
    title: 'Parcerias: Juntos Somos Mais Fortes',
    excerpt:
      'Como as parcerias com hospitais e outras organizações ampliam nosso impacto. Conheça nossos parceiros e como trabalhamos juntos.',
    author: 'Equipe de Parcerias',
    date: '3 Jan 2024',
    readTime: '5 min',
    category: 'Parcerias',
    image: '/images/hero-section.webp',
  },
]
