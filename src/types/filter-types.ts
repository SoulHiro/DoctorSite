// Tipos genéricos para sistema de filtros reutilizável

export type FilterType =
  | 'text'
  | 'select'
  | 'date'
  | 'dateRange'
  | 'multiSelect'

export interface FilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface FilterConfig {
  key: string
  label: string
  type: FilterType
  placeholder?: string
  options?: FilterOption[]
  multiple?: boolean
  clearable?: boolean
}

export interface FilterValues {
  [key: string]: string | string[] | Date | null | undefined
}

export interface FilterState {
  values: FilterValues
  hasActiveFilters: boolean
}

export interface UseFiltersProps {
  initialValues?: FilterValues
  onFilterChange?: (filters: FilterValues) => void
  debounceMs?: number
}

export interface FilterSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export interface FilterSelectProps {
  value: string | string[]
  onChange: (value: string | string[]) => void
  options: FilterOption[]
  placeholder?: string
  multiple?: boolean
  className?: string
}

export interface FilterDateProps {
  value: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  className?: string
}
