"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delayMs?: number
}

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const rect = el.getBoundingClientRect()
    const alreadyInView = rect.top < window.innerHeight * 0.9
    if (alreadyInView) {
      return
    }

    setArmed(true)
    setVisible(false)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        armed && "transition-[opacity,transform] duration-base ease-out",
        armed && !visible ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100",
        className
      )}
      style={armed ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  )
}
