import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export function HeaderNavigationMenu() {
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
                    12
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
            <ul className="grid w-[300px] gap-4">
              <li>
                <div className="space-y-4">
                  <div className="cursor-not-allowed rounded-md p-3 opacity-50">
                    <div className="font-medium text-gray-400">Doe Agora</div>
                    <div className="text-sm text-gray-400">
                      Página com botão de doação e explicação clara de como o
                      dinheiro é usado. (Em breve)
                    </div>
                  </div>
                  <div className="cursor-not-allowed rounded-md p-3 opacity-50">
                    <div className="font-medium text-gray-400">
                      Seja um Parceiro
                    </div>
                    <div className="text-sm text-gray-400">
                      Espaço para entender como pode-se apoiar financeiramente
                      ou com serviços. (Em breve)
                    </div>
                  </div>
                </div>
              </li>
            </ul>
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
                    href="/gallery"
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
