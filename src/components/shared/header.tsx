'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Loader, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuthSession } from '@/hooks/use-auth-session'
import { useScrollHeader } from '@/hooks/use-scroll-header'

import { HeaderNavigationMenu } from '../../app/(public)/_components/header/navigation-menu'

const HeaderPublic = () => {
  const { isScrolled } = useScrollHeader()
  const { isLoggedIn, isLoading } = useAuthSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Header original que ocupa espaço fixo */}
      <header className="relative z-50 w-full bg-white shadow-md">
        <div className="text-text-gray-900 flex w-full items-center justify-between overflow-visible bg-white px-4 py-3 sm:px-6 md:px-8 md:py-4">
          {/* Logo */}
          <div className="flex flex-row gap-2">
            <Image
              src="/icons/Logo(Original).svg"
              alt="SOS Bom Humor"
              width={64}
              height={64}
              className="h-12 w-12"
            />
            <div className="ml-2 flex min-w-[140px] flex-col items-start justify-center sm:min-w-[160px]">
              <h3 className="leading-tight font-medium text-red-700">
                SOS Bom Humor
              </h3>
              <p className="text-foreground text-xs sm:text-sm">
                Doutores Palhaços
              </p>
            </div>
          </div>

          {/* Menu centralizado - escondido em mobile */}
          <nav className="hidden justify-center md:flex md:gap-8">
            <HeaderNavigationMenu />
            <div>
              <Link href={isLoggedIn ? '/admin/dashboard' : '/auth'}>
                <Button size="default" variant="default">
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : isLoggedIn ? (
                    'Dashboard'
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </Link>
            </div>
          </nav>

          {/* Menu mobile - hamburger */}
          <nav className="flex md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-full flex-col p-0 sm:w-[400px]"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <Image
                      src="/icons/Logo(Original).svg"
                      alt="SOS Bom Humor"
                      width={64}
                      height={64}
                      className="h-12 w-12"
                    />
                    <div>
                      <div className="text-base font-bold text-red-700">
                        SOS Bom Humor
                      </div>
                      <div className="text-foreground text-xs font-normal">
                        Doutores Palhaços
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <motion.div
                  className="mt-8 flex-1 overflow-y-auto px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {/* Navegação mobile */}
                  <div className="flex flex-col gap-2">
                    <HeaderNavigationMenu
                      mobile
                      onItemClick={handleMobileMenuClose}
                    />
                  </div>
                </motion.div>

                {/* Botão de login/dashboard mobile */}
                <div className="mt-auto border-t px-4 pt-6">
                  <Link
                    href={isLoggedIn ? '/admin/dashboard' : '/auth'}
                    onClick={handleMobileMenuClose}
                  >
                    <Button size="default" variant="default" className="w-full">
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : isLoggedIn ? (
                        'Dashboard'
                      ) : (
                        'Entrar'
                      )}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
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
          className="text-text-gray-900 flex w-[92%] max-w-[820px] items-center justify-between overflow-visible rounded-3xl bg-white px-4 py-2 shadow-lg backdrop-blur-md sm:px-6 md:px-8"
          initial={{ width: '92%' }}
          animate={{ width: isScrolled ? '92%' : '92%' }}
          transition={{ duration: 0.3 }}
        >
          {/* Menu centralizado apenas - escondido em mobile */}
          <nav className="hidden w-full justify-center md:flex">
            <HeaderNavigationMenu />
          </nav>

          {/* Menu mobile simplificado no header fixo */}
          <nav className="flex w-full justify-center md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-sm font-medium"
                >
                  <Menu className="h-4 w-4" />
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-full flex-col p-0 sm:w-[400px]"
              >
                <SheetHeader>
                  <SheetTitle className="flex flex-col items-center justify-center gap-2 text-center">
                    <Image
                      src="/icons/Logo(Original).svg"
                      alt="SOS Bom Humor"
                      width={64}
                      height={64}
                      className="h-24 w-24"
                    />
                    <div>
                      <div className="text-3xl font-light text-red-700">
                        SOS Bom Humor
                      </div>
                      <div className="text-foreground text-lg font-light">
                        Doutores Palhaços
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <motion.div
                  className="mt-8 flex-1 overflow-y-auto px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex flex-col gap-2">
                    <HeaderNavigationMenu
                      mobile
                      onItemClick={handleMobileMenuClose}
                    />
                  </div>
                </motion.div>

                <div className="mt-auto border-t p-4">
                  <Link
                    href={isLoggedIn ? '/admin/dashboard' : '/auth'}
                    onClick={handleMobileMenuClose}
                  >
                    <Button
                      size="default"
                      variant="default"
                      className="w-full rounded-sm"
                    >
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : isLoggedIn ? (
                        'Dashboard'
                      ) : (
                        'Entrar'
                      )}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </motion.div>
      </motion.header>
    </>
  )
}

export default HeaderPublic
