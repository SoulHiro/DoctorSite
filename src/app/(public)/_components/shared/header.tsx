'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useScrollHeader } from '@/hooks/use-scroll-header'

import { HeaderNavigationMenu } from '../header/navigation-menu'

const HeaderPublic = () => {
  const { isScrolled } = useScrollHeader()

  return (
    <header className="fixed top-2 z-100 flex w-full items-start justify-center text-white">
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-3xl px-8 py-6 shadow-md backdrop-blur-[2px] transition-all duration-300 ${
          isScrolled ? 'bg-white text-gray-900' : 'bg-white/30 text-white'
        }`}
      >
        {/* Logo - oculto quando scrolled */}
        <div
          className={`flex flex-row gap-2 transition-all duration-300 ${
            isScrolled ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'
          }`}
        >
          <Image
            src="/images/icon-site.png"
            alt="SOS Bom Humor"
            width={100}
            height={100}
            className="h-10 w-11"
          />
          <div className="flex min-w-[160px] flex-col items-center">
            <h2
              className={`text-lg leading-tight font-bold ${
                isScrolled ? 'text-red-500' : 'text-red-500'
              }`}
            >
              SOS Bom Humor
            </h2>
            <p className="text-sm">Doutores Palhacos</p>
          </div>
        </div>

        {/* Menu centralizado */}
        <nav className="flex flex-1 justify-center">
          <HeaderNavigationMenu />
        </nav>

        {/* Botão à direita - oculto quando scrolled */}
        <div
          className={`transition-all duration-300 ${
            isScrolled ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'
          }`}
        >
          <Link href="/doar">
            <button className="w-fit rounded-3xl bg-green-600 px-6 py-2 text-base font-semibold text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none">
              Entrar
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default HeaderPublic
