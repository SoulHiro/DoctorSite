'use client'

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RotateCcw,
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { FilterDateProps } from '@/types/filter-types'

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

export const FilterDate = ({
  value,
  onChange,
  placeholder = 'Selecione o período',
  className,
}: FilterDateProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const currentYear = value?.getFullYear() || new Date().getFullYear()
  const currentMonth = value?.getMonth() || new Date().getMonth()

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentYear, monthIndex, 1)
    onChange(newDate)
    setIsOpen(false)
  }

  const handleYearChange = (direction: 'next' | 'prev') => {
    const newYear = direction === 'next' ? currentYear + 1 : currentYear - 1
    const newDate = new Date(newYear, currentMonth, 1)
    onChange(newDate)
  }

  const formatSelectedMonth = (date: Date | null) => {
    if (!date) return placeholder
    return date.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'h-12 w-full justify-between border-2 border-white/30 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white focus:border-white focus:ring-4 focus:ring-white/20',
            className
          )}
        >
          <span className={value ? 'text-slate-900' : 'text-slate-500'}>
            {formatSelectedMonth(value)}
          </span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden border-0 bg-white/95 p-0 backdrop-blur-md"
        align="center"
        side="bottom"
      >
        <div className="p-4">
          {/* Year Navigation */}
          <div className="mb-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleYearChange('prev')}
              className="h-8 w-8 p-0 hover:bg-orange-50"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <span className="text-sm font-bold text-slate-900">
              {currentYear}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleYearChange('next')}
              className="h-8 w-8 p-0 hover:bg-orange-50"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <Button
                key={month}
                variant={index === currentMonth && value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleMonthSelect(index)}
                className={`h-10 text-xs ${
                  index === currentMonth && value
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                    : 'hover:bg-orange-50'
                }`}
              >
                {month.substring(0, 3)}
              </Button>
            ))}
          </div>

          {/* Clear Date Button */}
          {value && (
            <div className="mt-4 border-t pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onChange(null)
                  setIsOpen(false)
                }}
                className="w-full text-xs text-slate-500 hover:bg-red-50 hover:text-red-600"
              >
                <RotateCcw className="mr-1 h-3 w-3" />
                Limpar período
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
