// Dados institucionais e o sitemap do site. Fonte única: TopBar, header,
// menu do celular e footer leem daqui.

export const site = {
  name: "SOS Bom Humor Doutores Palhaços",
  tagline: "Um Sorriso que Cura",
  location: "Ibirubá, RS",
  /** Centro de Ibirubá, para o mini mapa do footer. */
  geo: { lat: -28.6299, lon: -53.0904 },
  email: "doutorespalhacos.of@gmail.com",
  social: {
    instagram: {
      label: "@sosbomhumordoutorespalhacos",
      href: "https://www.instagram.com/sosbomhumordoutorespalhacos/",
    },
    youtube: {
      label: "@SOSBomHumorDoutoresPalhacos",
      href: "https://www.youtube.com/@SOSBomHumorDoutoresPalhacos",
    },
  },
} as const

export const donateHref = "/doar"

// ---------------------------------------------------------------------------
// Sitemap e navegação
// ---------------------------------------------------------------------------

export type NavLink = {
  href: string
  label: string
  description?: string
  /** Página já existe? Em produção, itens indisponíveis ficam escondidos. */
  available: boolean
}

export type NavFeatured = {
  eyebrow: string
  title: string
  description: string
  href: string
  /** Foto do card; sem foto, o card usa o fundo de destaque. */
  image?: { src: string; alt: string }
}

export type NavEntry =
  | ({ type: "link" } & NavLink)
  | {
      type: "group"
      label: string
      /** Frase curta no topo do popover. */
      description: string
      items: NavLink[]
      featured?: NavFeatured
    }

// Em desenvolvimento e nos previews da Vercel, todas as páginas do sitemap
// aparecem (as que não existem caem na 404); em produção, só as prontas.
const showUnavailable = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"

export function isVisible(link: NavLink) {
  return link.available || showUnavailable
}

export const mainNav: NavEntry[] = [
  {
    type: "group",
    label: "Quem Somos",
    description: "A ONG, a equipe e o jeito de visitar.",
    items: [
      { href: "/quem-somos", label: "Nossa história", description: "Como tudo começou e o que nos move.", available: false },
      { href: "/quem-somos/equipe", label: "A equipe", description: "Os personagens e as pessoas por trás deles.", available: false },
      { href: "/quem-somos#como-funciona", label: "Como funciona a visita", description: "O preparo antes de entrar em cada quarto.", available: false },
      { href: "/transparencia", label: "Transparência", description: "Relatórios, prestação de contas e documentos.", available: false },
    ],
    featured: {
      eyebrow: "A equipe",
      title: "Quem veste o jaleco",
      description: "Conheça os doutores palhaços.",
      href: "/quem-somos/equipe",
      image: { src: "/hero-doctors.png", alt: "Três doutores palhaços sorrindo numa brinquedoteca hospitalar" },
    },
  },
  {
    type: "group",
    label: "Nosso Trabalho",
    description: "Onde estivemos, o que mudou e o que vem por aí.",
    items: [
      { href: "/nosso-trabalho", label: "Impacto", description: "Números, depoimentos e resultados.", available: false },
      { href: "/nosso-trabalho/instituicoes", label: "Instituições atendidas", description: "Hospitais, postos e lares de idosos por município.", available: false },
      { href: "/galeria", label: "Galeria", description: "Fotos das visitas em cada cidade.", available: false },
      { href: "/agenda", label: "Agenda", description: "Próximas visitas e eventos.", available: false },
      { href: "/projetos/rir-e-o-melhor-remedio", label: "Rir é o Melhor Remédio", description: "O projeto nas escolas, pela Lei Rouanet.", available: false },
    ],
    // MOCK: vira a próxima visita real quando a agenda existir.
    featured: {
      eyebrow: "Próxima visita",
      title: "Tapera · 25 de outubro",
      description: "Hospital · visita da equipe completa.",
      href: "/agenda",
      image: { src: "/hero-doctors.png", alt: "Doutores palhaços durante uma visita" },
    },
  },
  {
    type: "group",
    label: "Apoie",
    description: "Doe, patrocine ou vista o jaleco com a gente.",
    items: [
      { href: "/doar", label: "Doe agora", description: "Pix, doação única ou mensal.", available: false },
      { href: "/apoie/empresas", label: "Para empresas", description: "Patrocínio e parcerias.", available: false },
      { href: "/lei-rouanet", label: "Lei Rouanet", description: "Apoie pelo incentivo fiscal.", available: false },
      { href: "/faca-parte", label: "Seja voluntário", description: "Não precisa ser palhaço profissional.", available: false },
      { href: "/parceiros", label: "Quem já apoia", description: "Empresas parceiras.", available: false },
      { href: "/parceiros/medicos", label: "Médicos apoiadores", description: "Profissionais de saúde que assinam embaixo.", available: false },
    ],
    featured: {
      eyebrow: "Doe agora",
      title: "Cada real vira um encontro",
      description: "Doe pelo Pix, de forma anônima ou com seu nome.",
      href: donateHref,
    },
  },
  { type: "link", href: "/diario", label: "Diário", available: false },
  { type: "link", href: "/contato", label: "Contato", available: false },
]

/** O menu sem os itens escondidos (e sem grupos que ficariam vazios). */
export function getVisibleNav(): NavEntry[] {
  return mainNav.flatMap((entry): NavEntry[] => {
    if (entry.type === "link") return isVisible(entry) ? [entry] : []
    const items = entry.items.filter(isVisible)
    return items.length > 0 ? [{ ...entry, items }] : []
  })
}

// Links do footer, além do menu principal.
export const footerNav = {
  institutional: [
    { href: "/perguntas-frequentes", label: "Perguntas frequentes", available: false },
    { href: "/transparencia", label: "Transparência", available: false },
  ],
  legal: [
    { href: "/politica-de-privacidade", label: "Política de Privacidade", available: false },
    { href: "/termos-de-uso", label: "Termos de Uso", available: false },
  ],
} satisfies Record<string, NavLink[]>
