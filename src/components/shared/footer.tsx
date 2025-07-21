import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const footerLinks = [
  {
    title: 'Quem Somos',
    links: [
      {
        label: 'Nossa História',
        href: '/historia',
        active: false,
        isBlank: false,
      },
      {
        label: 'Missão, Visão e Valores',
        href: '/missao',
        active: false,
        isBlank: false,
      },
      { label: 'Nossa Equipe', href: '/equipe', active: false, isBlank: false },
      {
        label: 'Onde Atuamos',
        href: '/atuacao',
        active: false,
        isBlank: false,
      },
    ],
  },
  {
    title: 'Conteúdo',
    links: [
      { label: 'Blog', href: '/blog', active: false, isBlank: false },
      { label: 'Galeria', href: '/gallery', active: true, isBlank: false },
      {
        label: 'Depoimentos',
        href: '/depoimentos',
        active: false,
        isBlank: false,
      },
      { label: 'Eventos', href: '/eventos', active: false, isBlank: false },
    ],
  },
  {
    title: 'Apoie o Projeto',
    links: [
      { label: 'Doe Agora', href: '/doar', active: false, isBlank: false },
      {
        label: 'Seja um Parceiro',
        href: '/parceiros',
        active: false,
        isBlank: false,
      },
      {
        label: 'Seja Voluntário',
        href: '/voluntario',
        active: false,
        isBlank: false,
      },
    ],
  },
  {
    title: 'Social',
    links: [
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/sosbomhumordoutorespalhacos/',
        isBlank: true,
        active: true,
      },
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/@SOSBomHumorDoutoresPalhacos',
        isBlank: true,
        active: true,
      },
      {
        label: 'Contato',
        href: '/contato',
        active: true,
        isBlank: false,
      },
    ],
  },
]

const Footer = () => {
  return (
    <footer className="border-ty-8 w-full py-8 text-gray-700">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Bloco de destaque para doação */}
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-gray-300 bg-white p-8 shadow-sm md:flex-row">
          <div className="flex flex-1 flex-col gap-2 md:pr-8">
            <h2 className="mb-1 text-xl font-bold text-gray-900">
              Faça a Diferença!
            </h2>
            <p className="text-base text-gray-600">
              Ajude a levar alegria e humanização para milhares de pessoas em
              hospitais.
            </p>
          </div>
          <Link href="/doar">
            <Button
              size="default"
              className="w-fit rounded-full bg-red-500 font-semibold text-white shadow transition duration-300 hover:scale-105 hover:bg-red-600"
            >
              Doe agora e Transforme Vidas
            </Button>
          </Link>
        </div>

        {/* Bloco de links e informações institucionais */}
        <div className="rounded-3xl border border-gray-300 bg-white p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Colunas de links */}
            <div className="grid w-full grid-cols-2 gap-8 md:w-2/3 md:grid-cols-4">
              {footerLinks.map((col) => (
                <div key={col.title}>
                  <h3 className="mb-3 font-semibold text-gray-900">
                    {col.title}
                  </h3>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        {link.active ? (
                          <Link
                            href={link.href}
                            target={link.isBlank ? '_blank' : '_self'}
                            className={cn(
                              'text-sm text-gray-600 transition-colors hover:text-red-600 hover:underline',
                              link.active && 'text-gray-700'
                            )}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <span
                            className={cn(
                              'cursor-not-allowed text-sm text-gray-500 opacity-70 select-none'
                            )}
                            aria-disabled="true"
                            tabIndex={-1}
                          >
                            {link.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Newsletter */}
            <div className="flex w-full flex-col gap-3 md:w-1/3 md:pl-8">
              <h3 className="mb-1 font-semibold text-gray-900">Newsletter</h3>
              <p className="text-sm text-gray-600">
                Receba as últimas notícias e atualizações do projeto.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
                />
                <Button
                  size="default"
                  className="w-full rounded-full bg-red-500 font-semibold text-white shadow transition duration-300 hover:scale-105 hover:bg-red-600"
                >
                  Inscrever
                </Button>
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-300" />
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 md:flex-row">
            <div>
              © {new Date().getFullYear()} SOS Bom Humor Doutores Palhaços.
              Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/politica-de-privacidade"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-pink-500"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos-de-uso"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-600"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
