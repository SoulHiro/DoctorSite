'use client'

import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'

const animation = { duration: 50000, easing: (t: number) => t }

const partners = [
  {
    name: 'Sicredi Ibirubá',
  },
  {
    name: 'Supermercado Casa do chimarrão ',
  },
  {
    name: 'Hospital da comunidade Annes Dias',
  },
  {
    name: 'Indutar tecno Metal',
  },
  {
    name: 'Theo transportes',
  },
]

export const Partners = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: false,
    slides: { perView: 3, spacing: 32 },
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* Gradiente lateral esquerda */}
      <div className="from-background via-background/80 pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r to-transparent" />
      {/* Gradiente lateral direita */}
      <div className="from-background via-background/80 pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l to-transparent" />

      <div ref={sliderRef} className="keen-slider w-full max-w-6xl px-4">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="keen-slider__slide number-slide1 flex items-center justify-center"
          >
            <div className="flex min-w-[220px] flex-col items-center gap-2 bg-white px-8 py-6">
              <h1 className="text-md font-bold text-gray-700">
                {partner.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
