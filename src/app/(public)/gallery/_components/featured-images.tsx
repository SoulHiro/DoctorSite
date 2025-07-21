'use client'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useRef } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const featuredImagesFake = [
  {
    id: 1,
    title: 'Imagem 1',
    cidade: 'São Paulo',
    data: '2024-05-10',
    imageURL:
      'https://images.unsplash.com/photo-1554990349-170b9e4bdf3b?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Imagem 2',
    cidade: 'Rio de Janeiro',
    data: '2024-06-15',
    imageURL:
      'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Imagem 3',
    cidade: 'Belo Horizonte',
    data: '2024-07-01',
    imageURL:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Imagem 4',
    cidade: 'Curitiba',
    data: '2024-07-10',
    imageURL:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  },
]

const GalleryFeaturedImages = () => {
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )
  return (
    <section
      id="featured-images"
      className="flex w-full flex-col items-center justify-center px-4 py-16"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold">Em Destaque</h2>
        <p className="text-muted-foreground text-lg">Imagens em destaque</p>
      </div>

      <Carousel
        className="w-full max-w-6xl"
        plugins={[autoplayPlugin.current]}
        opts={{
          loop: true,
          align: 'start',
        }}
      >
        <CarouselContent>
          {featuredImagesFake.map((image) => (
            <CarouselItem key={image.id} className="basis-1/3">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  width={400}
                  height={400}
                  src={image.imageURL}
                  alt={image.title}
                  className="h-full w-full object-cover"
                />
                {/* Overlay só aparece ao passar o mouse */}
                <div className="absolute inset-0 flex flex-col justify-end rounded-lg bg-black/60 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="text-xl font-semibold text-white">
                    {image.cidade}
                  </h3>
                  <p className="text-sm text-white opacity-90">
                    {new Date(image.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default GalleryFeaturedImages
