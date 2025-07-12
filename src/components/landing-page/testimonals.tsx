'use client'

import Autoplay from 'embla-carousel-autoplay'
import { memo, useEffect, useState } from 'react'
import { FaQuoteLeft } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface Testimonial {
  id: number
  text: string
  name: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: 'Quando minha filha estava internada na pediatria, os Doutores Palhaços transformaram nossa experiência. Ver ela sorrindo em um momento tão difícil foi um presente.',
    name: 'Carolina Silva',
    role: 'Mãe de paciente',
  },
  {
    id: 2,
    text: 'Como enfermeira pediátrica, afirmo que o trabalho dos Doutores Palhaços é transformador. As crianças ficam mais receptivas e o ambiente, mais humanizado.',
    name: 'Enfermeira Maria',
    role: 'Hospital Universitário',
  },
  {
    id: 3,
    text: 'O projeto de humanização com os Doutores Palhaços mudou a dinâmica da nossa ala pediátrica. O riso realmente é o melhor remédio.',
    name: 'Dr. Roberto Lima',
    role: 'Diretor Médico',
  },
  {
    id: 4,
    text: 'Ser voluntária nos Doutores Palhaços me ensinou que a medicina vai além dos procedimentos. A humanização é essencial para a recuperação.',
    name: 'Ana Santos',
    role: 'Voluntária',
  },
  {
    id: 5,
    text: 'Vocês são anjos disfarçados de palhaços. Obrigada por levarem alegria nos momentos mais difíceis e mostrarem que o cuidado vai além da medicina.',
    name: 'Família Oliveira',
    role: 'Acompanhantes',
  },
  {
    id: 6,
    text: 'A palhaçaria terapêutica é um recurso essencial para a saúde mental e emocional dos pacientes. Obrigada pela dedicação e alegria que trazem.',
    name: 'Clínica de Saúde Mental',
    role: 'Equipe Médica',
  },
]

const TestimonialCard = memo(
  ({
    testimonial: { name, role, text },
    isActive,
  }: {
    testimonial: Testimonial
    isActive: boolean
  }) => (
    <article
      className={cn(
        'relative flex h-full flex-col justify-between rounded-lg border bg-white p-6 shadow-sm transition-all duration-300',
        isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
      )}
    >
      <div className="flex flex-col items-center text-center">
        <FaQuoteLeft className="mb-4 text-3xl text-red-400" />
        <p className="mb-6 text-base text-gray-600">&ldquo;{text}&rdquo;</p>
      </div>
      <div className="flex items-center justify-center gap-4 border-t pt-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 font-bold text-white">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </article>
  )
)
TestimonialCard.displayName = 'TestimonialCard'

export default function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index)
  }

  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="container mx-auto max-w-6xl space-y-12 px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Vozes que Nos Inspiram
          </h2>
          <p className="text-md mx-auto mt-4 max-w-2xl text-gray-600">
            Conheça os depoimentos de quem vivenciou de perto o poder da
            palhaçaria terapêutica.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: 'center', loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="relative"
        >
          <CarouselContent className="-ml-8">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-8 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={index === current}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-[-50px] -translate-y-1/2" />
          <CarouselNext className="absolute top-1/2 right-[-50px] -translate-y-1/2" />
        </Carousel>

        <div className="flex justify-center space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-300',
                current === index ? 'w-4 bg-red-500' : 'bg-gray-300'
              )}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>
        <div className="text-center">
          <Button
            size="lg"
            className="rounded-full bg-red-500 px-8 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-red-600"
          >
            Envie seu Depoimento
          </Button>
        </div>
      </div>
    </section>
  )
}
