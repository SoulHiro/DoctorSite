'use client'

import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
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
    text: 'Conhecer o trabalho dos Doutores Palhaços foi uma experiência marcante. A forma como eles integram empatia, leveza e profissionalismo em cada visita demonstra o poder real que a alegria tem como ferramenta de cuidado humano. É uma honra poder colaborar com uma causa tão genuína e transformadora.',
    name: 'Victor M.',
    role: 'Desenvolvedor do Site',
  },
  {
    id: 2,
    text: 'A esperança não é a última que morre — é a primeira que nasce quando tudo parece perdido e sem solução. Quem tem esperança sabe que a tempestade, um dia, há de passar, e que o choro dá lugar ao sorriso e à alegria. Porque quem tem esperança, confia. Quem confia, tem fé. Quem tem fé, tem Deus. E quem tem Deus... tem tudo.',
    name: 'Dra. Esperança',
    role: 'Palhaça',
  },
  {
    id: 3,
    text: 'Eu vejo a atuação dos Doutores Palhaços como uma ferramenta de transformação e humanização, utilizando a arte do palhaço para levar alegria, leveza e um olhar mais positivo para as pessoas em situações de vulnerabilidade, estando estas hospitalizadas.',
    name: 'Dr. Alegria',
    role: 'Palhaço',
  },
  {
    id: 4,
    text: 'O Sorriso é contagiante e com grandes benefícios para a saúde. Então levá-lo ao um ambiente hospital é altamente benéfico e com grandes resultados para a saúde dos pacientes.',
    name: 'Dra. Sorriso',
    role: 'Palhaça',
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
        <p className="mb-6 text-justify text-base text-gray-600">
          &ldquo;{text}&rdquo;
        </p>
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
          <Link
            href="mailto:doutorespalhacos.of@gmail.com?subject=💬%20Depoimento%20-%20Doutores%20Palhaços"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="rounded-full bg-red-500 px-8 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-red-600"
            >
              Envie seu Depoimento
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
