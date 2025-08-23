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
import { PageContainer } from '@/components/ui/page-container'
import { useIsMobile } from '@/hooks/use-mobile'
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
        <FaQuoteLeft
          className={cn(
            'mb-4 text-3xl',
            isActive ? 'text-red-400' : 'text-red-600'
          )}
        />
        <p
          className={cn(
            'mb-6 text-justify text-base',
            isActive ? 'text-gray-800' : 'text-gray-900'
          )}
        >
          &ldquo;{text}&rdquo;
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 border-t pt-4">
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full font-bold text-white',
            isActive
              ? 'bg-gradient-to-br from-red-400 to-red-600'
              : 'bg-gradient-to-br from-red-600 to-red-800'
          )}
        >
          {name.charAt(0)}
        </div>
        <div>
          <p
            className={cn(
              'font-semibold',
              isActive ? 'text-gray-900' : 'text-black'
            )}
          >
            {name}
          </p>
          <p
            className={cn(
              'text-sm',
              isActive ? 'text-gray-700' : 'text-gray-900'
            )}
          >
            {role}
          </p>
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
  const isMobile = useIsMobile()

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

  return (
    <section className="w-full bg-gray-50">
      <PageContainer className="space-y-6 px-4 py-8 sm:space-y-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-gray-900">Vozes que Nos Inspiram</h2>
          <p className="mx-auto max-w-2xl text-gray-700">
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
          <CarouselContent className="-ml-4 sm:-ml-8">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 sm:pl-8 md:basis-1/2 lg:basis-1/3"
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
          {!isMobile && (
            <>
              <CarouselPrevious className="absolute top-1/2 left-[-10px] -translate-y-1/2 sm:left-[-50px]" />
              <CarouselNext className="absolute top-1/2 right-[-10px] -translate-y-1/2 sm:right-[-50px]" />
            </>
          )}
        </Carousel>

        {/* Indicadores de posição */}
        <div
          className={cn(
            'mt-6 flex items-center justify-center gap-2',
            isMobile ? 'space-x-0' : 'space-x-3'
          )}
          aria-hidden="true"
        >
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'rounded-full transition-all duration-300',
                isMobile ? 'h-2 w-2' : 'h-3',
                current === index
                  ? isMobile
                    ? 'w-4 bg-red-500'
                    : 'w-8 bg-red-500'
                  : isMobile
                    ? 'w-2 bg-gray-300'
                    : 'w-3 bg-gray-300'
              )}
            />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="mailto:doutorespalhacos.of@gmail.com?subject=💬%20Depoimento%20-%20Doutores%20Palhaços"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="default" variant="default">
              Envie seu Depoimento
            </Button>
          </Link>
        </div>
      </PageContainer>
    </section>
  )
}
