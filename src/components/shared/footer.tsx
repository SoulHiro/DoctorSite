import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const footerLinks = [
  {
    title: 'Projeto',
    links: [
      { label: 'Sobre', href: '/sobre', active: false },
      { label: 'Equipe', href: '/equipe', active: false },
      { label: 'Contato', href: '/contato', active: false },
    ],
  },
  {
    title: 'Conteúdo',
    links: [
      { label: 'Blog', href: '/blog', active: false },
      { label: 'Galeria', href: '/galeria', active: false },
      { label: 'Depoimentos', href: '/depoimentos', active: false },
    ],
  },
  {
    title: 'Apoie',
    links: [
      { label: 'Doe Agora', href: '/doar', active: true },
      { label: 'Empresas Parceiras', href: '/parceiros', active: false },
      { label: 'Eventos', href: '/eventos', active: false },
    ],
  },
  {
    title: 'Social',
    links: [
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/sosbomhumordoutorespalhacos/',
        active: true,
      },
      {
        label: 'Youtube',
        href: 'https://www.youtube.com/@SOSBomHumorDoutoresPalhacos',
        active: true,
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
            <div className="grid w-full grid-cols-2 gap-8 md:w-full md:grid-cols-6">
              {footerLinks.map((col) => (
                <div key={col.title}>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {col.title}
                  </h3>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        {link.active ? (
                          <Link
                            href={link.href}
                            className={cn(
                              'text-sm text-gray-600 transition-colors hover:text-green-700 hover:underline',
                              link.active && 'text-green-700'
                            )}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <span
                            className={cn(
                              'cursor-not-allowed text-sm text-gray-600 opacity-80 select-none'
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
              <div className="col-span-2 flex flex-col gap-2">
                <h3 className="mb-2 font-semibold text-gray-900">Newsletter</h3>
                <p className="text-sm text-gray-600">
                  Receba as últimas notícias e atualizações do projeto.
                </p>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="rounded-md border border-gray-300 p-2"
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
