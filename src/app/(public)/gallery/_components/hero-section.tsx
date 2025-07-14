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

  const formatSelectedMonth = (date) => {
    return date.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    })
  }
  const [open, setOpen] = useState(false)
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center space-y-4 py-64">
      <h1 className="text-center text-6xl font-bold tracking-widest">
        Galeria
      </h1>
      <div className="flex flex-row gap-4">
        <div className="relative w-full max-w-sm">
          <Select>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Selecione a cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cidade</SelectLabel>
                <SelectItem value="apple">Ibirubá</SelectItem>
                <SelectItem value="apple">Tapera</SelectItem>
                <SelectItem value="apple">Passo Fundo</SelectItem>
                <SelectItem value="apple">Quinze De Novembro</SelectItem>
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
                className="w-fit justify-between font-normal"
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
