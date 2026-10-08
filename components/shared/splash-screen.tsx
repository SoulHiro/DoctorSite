"use client"

import { useEffect, useState } from "react"

import { JugglingLoader } from "@/components/illustrations/juggling-loader"

/** Tempo mínimo na tela, contado desde o início da navegação. */
const MIN_VISIBLE_MS = 1200
/** Igual a --duration-slow, usado no fade de saída. */
const FADE_MS = 400

type Phase = "visible" | "leaving" | "done"

/**
 * Tela de abertura em carregamentos completos (primeira visita ou refresh).
 * Já vem renderizada no HTML do servidor, então cobre a página desde o
 * primeiro paint; navegações entre páginas não remontam o layout e não a
 * mostram de novo. O scroll fica travado via CSS em globals.css
 * (html:has([data-splash="visible"])).
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("visible")

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    // performance.now() conta a partir do início da navegação.
    const finish = () => {
      const remaining = Math.max(0, MIN_VISIBLE_MS - performance.now())
      timer = setTimeout(() => setPhase("leaving"), remaining)
    }

    if (document.readyState === "complete") finish()
    else window.addEventListener("load", finish, { once: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("load", finish)
    }
  }, [])

  useEffect(() => {
    if (phase !== "leaving") return
    const timer = setTimeout(() => setPhase("done"), FADE_MS)
    return () => clearTimeout(timer)
  }, [phase])

  if (phase === "done") return null

  return (
    <>
      {/* Sem JavaScript a tela nunca sairia; nesse caso ela nem aparece. */}
      <noscript>
        <style>{`[data-splash] { display: none !important; }`}</style>
      </noscript>
      <div
        data-splash={phase}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-slow ease-out data-[splash=leaving]:pointer-events-none data-[splash=leaving]:opacity-0"
      >
        <JugglingLoader />
      </div>
    </>
  )
}
