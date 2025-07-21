'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useScrollHeader } from '@/hooks/use-scroll-header'

import { HeaderNavigationMenu } from '../../app/(public)/_components/header/navigation-menu'

const HeaderPublic = () => {
  const { isScrolled } = useScrollHeader()

  return (
    <>
      {/* Header original que ocupa espaço fixo */}
      <header className="relative z-50 w-full bg-white shadow-md">
        <div className="text-text-gray-900 flex w-full items-center justify-between overflow-visible bg-white px-8 py-4">
          {/* Logo */}
          <div className="flex flex-row gap-2">
            <Image
              src="/images/icon-site.png"
              alt="SOS Bom Humor"
              width={100}
              height={100}
              className="h-10 w-11"
            />
            <div className="flex min-w-[160px] flex-col items-center">
              <h2 className="text-lg leading-tight font-bold text-red-500">
                SOS Bom Humor
              </h2>
              <p className="text-foreground text-sm">Doutores Palhaços</p>
            </div>
          </div>

          {/* Menu centralizado - escondido em mobile */}
          <nav className="hidden justify-center md:flex md:gap-8">
            <HeaderNavigationMenu />
            <div>
              <Link href="/auth">
                <Button
                  size="default"
                  className="w-fit rounded-full bg-red-500 font-semibold text-white shadow transition duration-300 hover:scale-105 hover:bg-red-600"
                >
                  Entrar
                </Button>
              </Link>
            </div>
          </nav>

          {/* Menu mobile - hamburger (placeholder) */}
          <nav className="flex md:hidden">
            <Button variant="outline" size="sm">
              Menu
            </Button>
          </nav>
        </div>
      </header>

      {/* Header fixed animado - aparece no scroll */}
      <motion.header
        className="fixed top-4 z-50 flex w-full items-start justify-center px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        style={{
          pointerEvents: isScrolled ? 'auto' : 'none',
        }}
      >
        <motion.div
          className="text-text-gray-900 flex max-w-full items-center justify-between overflow-visible rounded-3xl bg-white px-8 py-2 shadow-lg backdrop-blur-md"
          initial={{ width: '800px' }}
          animate={{ width: isScrolled ? '800px' : '800px' }}
          transition={{ duration: 0.3 }}
        >
          {/* Menu centralizado apenas - escondido em mobile */}
          <nav className="hidden w-full justify-center md:flex">
            <HeaderNavigationMenu />
          </nav>

          {/* Menu mobile simplificado */}
          <nav className="flex w-full justify-center md:hidden">
            <div className="text-sm font-medium">Menu</div>
          </nav>
        </motion.div>
      </motion.header>
    </>
  )
}

export default HeaderPublic
