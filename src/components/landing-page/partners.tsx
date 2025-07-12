import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'

const animation = { duration: 50000, easing: (t: number) => t }

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
        <div className="keen-slider__slide number-slide1 flex items-center justify-center">
          <div className="flex min-w-[220px] flex-col items-center gap-2 rounded-xl bg-white px-8 py-6">
            <h1 className="text-lg font-bold text-gray-700">Hospital Cabral</h1>
            <span className="text-xs text-gray-400">Parceiro desde 2018</span>
          </div>
        </div>
        <div className="keen-slider__slide number-slide2 flex items-center justify-center">
          <div className="flex min-w-[220px] flex-col items-center gap-2 rounded-xl bg-white px-8 py-6">
            <h1 className="text-lg font-bold text-gray-700">
              Hospital General
            </h1>
            <span className="text-xs text-gray-400">Parceiro desde 2019</span>
          </div>
        </div>
        <div className="keen-slider__slide number-slide3 flex items-center justify-center">
          <div className="flex min-w-[220px] flex-col items-center gap-2 rounded-xl bg-white px-8 py-6">
            <h1 className="text-lg font-bold text-gray-700">
              Hospital Torpedo
            </h1>
            <span className="text-xs text-gray-400">Parceiro desde 2020</span>
          </div>
        </div>
        <div className="keen-slider__slide number-slide4 flex items-center justify-center">
          <div className="flex min-w-[220px] flex-col items-center gap-2 rounded-xl bg-white px-8 py-6">
            <h1 className="text-lg font-bold text-gray-700">Hospital Lince</h1>
            <span className="text-xs text-gray-400">Parceiro desde 2021</span>
          </div>
        </div>
        <div className="keen-slider__slide number-slide5 flex items-center justify-center">
          <div className="flex min-w-[220px] flex-col items-center gap-2 rounded-xl bg-white px-8 py-6">
            <h1 className="text-lg font-bold text-gray-700">
              Hospital Água Branca
            </h1>
            <span className="text-xs text-gray-400">Parceiro desde 2022</span>
          </div>
        </div>
      </div>
    </div>
  )
}
