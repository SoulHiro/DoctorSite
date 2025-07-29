'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { FilterSelectProps } from '@/types/filter-types'

export const FilterSelect = ({
  value,
  onChange,
  options,
  placeholder = 'Selecione...',
  multiple = false,
  className,
}: FilterSelectProps) => {
  return (
    <Select
      value={Array.isArray(value) ? undefined : value}
      onValueChange={(val) => onChange(multiple ? [val] : val)}
    >
      <SelectTrigger
        className={cn(
          'h-12 border-2 border-white/30 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white focus:border-white focus:ring-4 focus:ring-white/20',
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="border-0 bg-white/95 backdrop-blur-md">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="focus:bg-orange-50"
          >
            <div className="flex items-center">
              {option.icon && <option.icon className="mr-2 h-4 w-4" />}
              <div className="mr-2 h-2 w-2 rounded-full bg-slate-300"></div>
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
