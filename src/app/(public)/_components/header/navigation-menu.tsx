import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

interface HeaderNavigationMenuProps {
  mobile?: boolean
  onItemClick?: () => void
}

export function HeaderNavigationMenu({
  mobile = false,
  onItemClick,
}: HeaderNavigationMenuProps = {}) {
  const [openSections, setOpenSections] = React.useState<string[]>([])

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  const handleLinkClick = () => {
    if (onItemClick) {
      onItemClick()
    }
  }

  if (mobile) {
    return (
      <div className="flex flex-col space-y-2">
        {/* Home */}
        <Link
          href="/"
          onClick={handleLinkClick}
          className="hover:bg-accent hover:text-accent-foreground flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        >
          🏠 Home
        </Link>

        {/* Quem Somos */}
        <Collapsible
          open={openSections.includes('quem-somos')}
          onOpenChange={() => toggleSection('quem-somos')}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium"
            >
              👥 Quem Somos
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  openSections.includes('quem-somos') && 'rotate-90'
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 ml-4 space-y-2">
            <Link
              href="/historia"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              📜 Nossa História
            </Link>
            <Link
              href="/missao"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              🌟 Missão, Visão e Valores
            </Link>
            <Link
              href="/equipe"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              👩‍⚕️ Nossa Equipe
            </Link>
            <Link
              href="/atuacao"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              🏥 Onde Atuamos
            </Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Impacto */}
        <Collapsible
          open={openSections.includes('impacto')}
          onOpenChange={() => toggleSection('impacto')}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium"
            >
              📊 Impacto
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  openSections.includes('impacto') && 'rotate-90'
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 ml-4 space-y-2">
            <Link
              href="/reconhecimentos"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              🏅 Reconhecimentos
            </Link>
            <Link
              href="/impacto-cientifico"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              🔬 Impacto Científico
            </Link>
            <Link
              href="/midia"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              📺 Na Mídia
            </Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Faça Parte */}
        <Collapsible
          open={openSections.includes('faca-parte')}
          onOpenChange={() => toggleSection('faca-parte')}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium"
            >
              🤝 Faça Parte
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  openSections.includes('faca-parte') && 'rotate-90'
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 ml-4 space-y-2">
            <Link
              href="/doacao"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              💸 Doe Agora
            </Link>
            <Link
              href="/parceiros"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              🤝 Seja Parceiro
            </Link>
            <Link
              href="/contribuidores"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              🌟 Contribuidores
            </Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Diário da Alegria */}
        <Collapsible
          open={openSections.includes('diario')}
          onOpenChange={() => toggleSection('diario')}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium"
            >
              📖 Diário da Alegria
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  openSections.includes('diario') && 'rotate-90'
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 ml-4 space-y-2">
            <Link
              href="/blog"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground block rounded-lg px-3 py-2 text-sm transition-colors"
            >
              📝 Blog
            </Link>
            <Link
              href="/galeria"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground block rounded-lg px-3 py-2 text-sm transition-colors"
            >
              📸 Galeria de Fotos
            </Link>
            <Link
              href="/agenda"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              📅 Agenda & Próximas Visitas
            </Link>
            <Link
              href="/videos"
              onClick={handleLinkClick}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground pointer-events-none block rounded-lg px-3 py-2 text-sm opacity-50 transition-colors"
            >
              🎬 Vídeos & Bastidores
            </Link>
          </CollapsibleContent>
        </Collapsible>

        {/* Contato */}
        <Link
          href="/contato"
          onClick={handleLinkClick}
          className="hover:bg-accent hover:text-accent-foreground flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        >
          📞 Contato
        </Link>
      </div>
    )
  }

  // Desktop version (original)
  return (
    <NavigationMenu viewport={true}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Quem Somos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 md:w-[600px] lg:w-[700px] lg:grid-cols-[.75fr_1fr_1fr]">
              {/* Primeira parte: foto/descrição */}
              <div className="relative row-span-3 flex flex-col justify-end overflow-hidden rounded-md">
                {/* Imagem de fundo estática, sem interação */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/hero-section.webp"
                    width={200}
                    height={200}
                    alt="Equipe Doutores Palhaços"
                    className="h-full w-full object-cover opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
                </div>
                <div
                  className="pointer-events-none relative z-10 flex h-full w-full flex-col justify-end p-6 select-none"
                  aria-hidden="true"
                >
                  <div className="text-lg font-medium text-white drop-shadow">
                    Venha nos conhecer
                  </div>
                </div>
              </div>
              {/* Segunda parte: até 3 itens */}
              <ul className="flex flex-col gap-2">
                <ListItem
                  href="/historia"
                  title="📜 Nossa História"
                  disabled={true}
                >
                  Conheça a trajetória dos Doutores Palhaços.
                </ListItem>
                <ListItem
                  href="/missao"
                  title="🌟 Missão, Visão e Valores"
                  disabled={true}
                >
                  Os princípios que guiam nosso trabalho.
                </ListItem>
              </ul>
              {/* Terceira parte: até 3 itens */}
              <ul className="flex flex-col gap-2">
                <ListItem
                  href="/equipe"
                  title="👩‍⚕️ Nossa Equipe"
                  disabled={true}
                >
                  Conheça a equipe de voluntários que fazem a diferença.
                </ListItem>
                <ListItem
                  href="/atuacao"
                  title="🏥 Onde Atuamos"
                  disabled={true}
                >
                  Fale conosco para dúvidas, sugestões ou parcerias.
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Impacto</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 md:w-[600px] lg:w-[650px] lg:grid-rows-[1fr_auto]">
              {/* Primeira parte: indicadores de impacto */}
              <div className="bg-muted/40 flex flex-row justify-between gap-2 rounded-sm px-4 py-2 shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                    Hospitais Visitados
                  </span>
                  <span className="mt-1 text-lg font-bold text-green-700 drop-shadow">
                    19
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                    Pacientes Atendidos
                  </span>
                  <span className="mt-1 text-lg font-bold text-green-700 drop-shadow">
                    +8.000
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                    Anos de Atuação
                  </span>
                  <span className="mt-1 text-lg font-bold text-green-700 drop-shadow">
                    3
                  </span>
                </div>
              </div>

              {/* Segunda parte: destaques */}
              <ul className="flex flex-row gap-2">
                <ListItem
                  href="/reconhecimentos"
                  title="🏅 Reconhecimentos"
                  disabled={true}
                >
                  Prêmios e homenagens recebidos ao longo da nossa jornada.
                </ListItem>
                <ListItem
                  href="/impacto-cientifico"
                  title="🔬 Impacto Científico"
                  disabled={true}
                >
                  Pesquisas e evidências sobre os benefícios do riso na saúde.
                </ListItem>
                <ListItem href="/midia" title="📺 Na Mídia" disabled={true}>
                  Reportagens, entrevistas e participações na mídia.
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Faça Parte</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 md:w-[600px] lg:w-[700px] lg:grid-rows-[1fr_auto]">
              {/* Segunda parte: destaques */}
              <ul className="flex flex-row gap-2">
                <ListItem href="/doacao" title="💸 Doe Agora" disabled={true}>
                  Contribua para transformar sorrisos em realidade e vidas em
                  esperança.
                </ListItem>
                <ListItem
                  href="/parceiros"
                  title="🤝 Seja Parceiro"
                  disabled={true}
                >
                  Junte-se a nós como parceiro e fortaleça essa corrente de boas
                  ações.
                </ListItem>
                <ListItem
                  href="/contribuidores"
                  title="🌟 Contribuidores"
                  disabled={true}
                >
                  Conheça quem ajuda a tornar nossa causa possível todos os
                  dias.
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Diário da Alegria</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[500px] max-w-full py-4">
              <div className="grid grid-cols-[1fr_1fr] gap-4">
                {/* Coluna 1 */}
                <ul className="flex flex-col gap-4">
                  <ListItem
                    href="/blog"
                    title="📝 Blog"
                    className="border-muted border-b pb-3"
                  >
                    Histórias inspiradoras e novidades do nosso dia a dia.
                  </ListItem>
                  <ListItem
                    href="/agenda"
                    title="📅 Agenda & Próximas Visitas"
                    disabled={true}
                  >
                    Fique por dentro dos próximos encontros e eventos.
                  </ListItem>
                </ul>
                {/* Coluna 2 */}
                <ul className="flex flex-col gap-4">
                  <ListItem
                    href="/galeria"
                    title="📸 Galeria de Fotos"
                    className="border-muted border-b pb-3"
                  >
                    Momentos marcantes registrados em imagens cheias de alegria.
                  </ListItem>
                  <ListItem
                    href="/videos"
                    title="🎬 Vídeos & Bastidores"
                    disabled={true}
                  >
                    Bastidores, vídeos divertidos e registros especiais das
                    visitas.
                  </ListItem>
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/contato">Contato</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

import { ListItem } from './ListItem'
