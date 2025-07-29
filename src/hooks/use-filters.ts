import { useCallback, useEffect, useState } from 'react'

import { FilterValues, UseFiltersProps } from '@/types/filter-types'

export const useFilters = ({
  initialValues = {},
  onFilterChange,
  debounceMs = 300,
}: UseFiltersProps = {}) => {
  const [values, setValues] = useState<FilterValues>(initialValues)
  const [debouncedValues, setDebouncedValues] =
    useState<FilterValues>(initialValues)

  // Debounce dos valores de filtro
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedValues(values)
      onFilterChange?.(values)
    }, debounceMs)

    return () => clearTimeout(delay)
  }, [values, onFilterChange, debounceMs])

  // Verificar se há filtros ativos
  const hasActiveFilters = Object.values(values).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    if (value instanceof Date) return true
    return value !== '' && value !== null && value !== undefined
  })

  // Atualizar um filtro específico
  const updateFilter = useCallback(
    (key: string, value: string | string[] | Date | null) => {
      setValues((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  // Limpar um filtro específico
  const clearFilter = useCallback((key: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key]) ? [] : '',
    }))
  }, [])

  // Reset para valores iniciais
  const resetFilters = useCallback(() => {
    setValues(initialValues)
  }, [initialValues])

  return {
    values,
    debouncedValues,
    hasActiveFilters,
    updateFilter,
    clearFilter,
    resetFilters,
  }
}
