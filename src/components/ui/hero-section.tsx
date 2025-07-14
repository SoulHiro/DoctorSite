import { SearchIcon } from 'lucide-react'
import Image from 'next/image'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface HeroSectionProps {
  title: string
  description: string
  buttonLink1?: string
  buttonLink2?: string
  image: string
  isSearchBar?: boolean
  size: 'full' | 'medium'
}

const HeroSection = ({
  title,
  description,
  buttonLink1,
  buttonLink2,
  image,
  isSearchBar,
  size,
}: HeroSectionProps) => {
  return (
    <section
      className={`flex w-screen flex-col items-center justify-center overflow-hidden ${size === 'full' ? 'h-screen' : 'h-2/3'}`}
    >
      {size === 'full' ? (
        <Image
          src={image}
          alt="Seção principal - Doutores Palhaços"
          fill
          quality={100}
          priority
          className="absolute inset-0 -z-10 w-full object-cover"
          sizes="100vw"
        />
      ) : (
        <Image
          src={image}
          alt="Seção principal - Doutores Palhaços"
          fill
          quality={100}
          priority
          className="absolute inset-0 -z-10 w-full object-cover"
          sizes="100vw"
        />
      )}
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 -z-10 bg-black/60" />
      <div
        id="hero-section"
        className={`relative z-10 flex w-full flex-col items-center justify-center space-y-6 px-4 ${size === 'full' ? 'h-full' : 'h-2/3'}`}
      >
        <h1 className="text-center text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
          {title}
        </h1>
        <p className="text-md md:text-md max-w-2xl text-center text-white drop-shadow-md">
          {description}
        </p>
        <div className="flex flex-row gap-4">
          {buttonLink1 && (
            <Button
              size="default"
              className="w-fit rounded-full bg-red-500 font-semibold text-white shadow transition duration-300 hover:scale-105 hover:bg-red-600"
            >
              {buttonLink1}
            </Button>
          )}
          {buttonLink2 && (
            <Button
              size="default"
              className="w-fit rounded-full bg-white font-semibold text-black shadow transition duration-300 hover:scale-105 hover:bg-gray-200"
            >
              {buttonLink2}
            </Button>
          )}
        </div>
      </div>

      {/* Box branco translúcido na base */}
      {isSearchBar && (
        <div className="absolute right-0 -bottom-10 left-0 z-50">
          <div className="mx-auto h-20 w-6xl max-w-5xl rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-md">
            <div className="flex flex-row items-center justify-center">
              <SearchIcon className="h-4 w-4" />
              <Input placeholder="Pesquisar" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroSection
