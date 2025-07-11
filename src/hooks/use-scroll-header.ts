'use client'

import { useEffect, useState } from 'react'

export const useScrollHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Obtém a altura da hero section (100vh = altura da tela)
      const heroHeight = window.innerHeight
      const scrollPosition = window.scrollY

      // Se o scroll passou da hero section, ativa o estado
      setIsScrolled(scrollPosition > heroHeight * 0.8) // 80% da altura da tela
    }

    window.addEventListener('scroll', handleScroll)

    // Verifica a posição inicial
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { isScrolled }
}
