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
    <NavigationMenu viewport={false}>
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
              <div className="row-span-3 flex flex-col justify-end">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      Venha nos conhecer
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>
              {/* Segunda parte: até 3 itens */}
              <ul className="flex flex-col gap-2">
                <ListItem href="/historia" title="📜 Nossa História">
                  Conheça a trajetória dos Doutores Palhaços.
                </ListItem>
                <ListItem href="/equipe" title="🌟 Missão, Visão e Valores">
                  Os princípios que guiam nosso trabalho.
                </ListItem>
              </ul>
              {/* Terceira parte: até 3 itens */}
              <ul className="flex flex-col gap-2">
                <ListItem href="/parceiros" title="👩‍⚕️ Nossa Equipe">
                  Conheça a equipe de voluntários que fazem a diferença.
                </ListItem>
                <ListItem href="/" title="🏥 Onde Atuamos">
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
              <div className="bg-muted/40 flex flex-row justify-between gap-2 rounded-lg px-4 py-2 shadow-sm">
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
                    10
                  </span>
                </div>
              </div>

              {/* Segunda parte: destaques */}
              <ul className="flex flex-row gap-2">
                <ListItem href="/historia" title="🏅 Reconhecimentos">
                  Prêmios e homenagens recebidos ao longo da nossa jornada.
                </ListItem>
                <ListItem href="/historia" title="🔬 Impacto Científico">
                  Pesquisas e evidências sobre os benefícios do riso na saúde.
                </ListItem>
                <ListItem href="/equipe" title="📺 Na Mídia">
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
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Doe Agora</div>
                    <div className="text-muted-foreground">
                      Página com botão de doação e explicação clara de como o
                      dinheiro é usado.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Seja um Parceiro</div>
                    <div className="text-muted-foreground">
                      Espaço para entender como pode-se apoiar financeiramente
                      ou com serviços.
                    </div>
                  </Link>
                </NavigationMenuLink>
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
                    href="#"
                    title="📝 Blog"
                    className="border-muted border-b pb-3"
                  >
                    Histórias inspiradoras e novidades do nosso dia a dia.
                  </ListItem>
                  <ListItem href="#" title="📅 Agenda & Próximas Visitas">
                    Fique por dentro dos próximos encontros e eventos.
                  </ListItem>
                </ul>
                {/* Coluna 2 */}
                <ul className="flex flex-col gap-4">
                  <ListItem
                    href="#"
                    title="📸 Galeria de Fotos"
                    className="border-muted border-b pb-3"
                  >
                    Momentos marcantes registrados em imagens cheias de alegria.
                  </ListItem>
                  <ListItem href="#" title="🎬 Vídeos & Bastidores">
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

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
