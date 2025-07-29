'use client'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { FilterSearchProps } from '@/types/filter-types'

export const FilterSearch = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  className,
}: FilterSearchProps) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        className={cn(
          'h-16 w-full rounded-full border-2 border-white/30 bg-white/90 py-6 pr-6 pl-16 text-lg text-slate-900 backdrop-blur-sm transition-all duration-300 focus:border-white focus:bg-white focus:ring-4 focus:ring-white/20',
          className
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Ícone de busca */}
      <div className="pointer-events-none absolute top-1/2 left-5 flex -translate-y-1/2 items-center">
        <Search className="h-6 w-6 text-orange-500" />
      </div>
    </div>
  )
}
