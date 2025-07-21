'use client'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const GalleryHeroSection = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const currentYear = selectedMonth.getFullYear()
  const currentMonth = selectedMonth.getMonth()

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentYear, monthIndex, 1)
    setSelectedMonth(newDate)
    setOpen(false)
  }

  const handleYearChange = (direction: string) => {
    const newYear = direction === 'next' ? currentYear + 1 : currentYear - 1
    setSelectedMonth(new Date(newYear, currentMonth, 1))
  }

  const formatSelectedMonth = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    })
  }
  const [open, setOpen] = useState(false)
  return (
    <section className="flex w-full flex-col items-center justify-center space-y-6 py-20 pt-16">
      <div className="space-y-4 text-center">
        <h1 className="text-center text-5xl font-bold tracking-widest md:text-6xl">
          Galeria
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Explore momentos especiais capturados durante nossas visitas aos
          hospitais
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <div className="relative w-full max-w-sm">
          <Select>
            <SelectTrigger className="w-full md:w-fit">
              <SelectValue placeholder="Selecione a cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cidade</SelectLabel>
                <SelectItem value="ibiruba">Ibirubá</SelectItem>
                <SelectItem value="tapera">Tapera</SelectItem>
                <SelectItem value="passo-fundo">Passo Fundo</SelectItem>
                <SelectItem value="quinze-novembro">
                  Quinze De Novembro
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="relative w-full max-w-sm">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="month-picker"
                className="w-full justify-between font-normal md:w-fit"
              >
                {formatSelectedMonth(selectedMonth)}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
              side="bottom"
            >
              <div className="p-3">
                {/* Year Navigation */}
                <div className="mb-4 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleYearChange('prev')}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{currentYear}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleYearChange('next')}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>

                {/* Month Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {months.map((month, index) => (
                    <Button
                      key={month}
                      variant={index === currentMonth ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => handleMonthSelect(index)}
                      className="h-8 text-xs"
                    >
                      {month.substring(0, 3)}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  )
}

export default GalleryHeroSection
