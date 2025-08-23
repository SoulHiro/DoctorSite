'use client'

import { Calendar, ImageIcon, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  getAvailablePeriods,
  getImagesByFilters,
  getMunicipalities,
} from '@/actions/gallery'
import { HeroSection } from '@/components/shared/hero-section'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import GalleryFeaturedImages from './_components/featured-images'
import GalleryImpactSection from './_components/mini-portfolio'
import GalleryMunicipalities from './_components/municipalities-section'

interface FilteredData {
  selectedMunicipality: string
  selectedYear: number | null
  selectedMonth: number | null
}

interface GalleryImage {
  id: string
  url: string
  filename: string
  municipality: string
  takenAt: string
  author: string
  authorId: string
  createdAt: string
}

const GalleryPage = () => {
  const [municipalities, setMunicipalities] = useState<string[]>([])
  const [availablePeriods, setAvailablePeriods] = useState<{
    years: number[]
    monthsByYear: Record<number, number[]>
  }>({ years: [], monthsByYear: {} })
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilteredData>({
    selectedMunicipality: 'todos',
    selectedYear: null,
    selectedMonth: null,
  })

  // Buscar municípios e períodos na montagem do componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [municipalitiesData, periodsData] = await Promise.all([
          getMunicipalities(),
          getAvailablePeriods(),
        ])
        setMunicipalities(municipalitiesData)
        setAvailablePeriods(periodsData)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Verificar se há filtros ativos
  const hasActiveFilters =
    filters.selectedMunicipality !== 'todos' ||
    filters.selectedYear !== null ||
    filters.selectedMonth !== null

  // Buscar imagens filtradas quando os filtros mudam
  useEffect(() => {
    const fetchFilteredImages = async () => {
      if (!hasActiveFilters) {
        setFilteredImages([])
        return
      }

      try {
        // Construir filtros para a API
        const apiFilters: {
          municipality?: string
          startDate?: string
          endDate?: string
        } = {}

        if (filters.selectedMunicipality !== 'todos') {
          apiFilters.municipality = filters.selectedMunicipality
        }

        if (filters.selectedYear) {
          const startDate = `${filters.selectedYear}-01-01`
          let endDate = `${filters.selectedYear}-12-31`

          if (filters.selectedMonth) {
            // Calcular o último dia do mês
            const lastDay = new Date(
              filters.selectedYear,
              filters.selectedMonth,
              0
            ).getDate()
            endDate = `${filters.selectedYear}-${filters.selectedMonth.toString().padStart(2, '0')}-${lastDay}`
          }

          apiFilters.startDate = startDate
          apiFilters.endDate = endDate
        }

        // Aplicando filtros
        const images = await getImagesByFilters(apiFilters)
        // Imagens carregadas
        setFilteredImages(images)
      } catch (error) {
        console.error('Erro ao buscar imagens filtradas:', error)
        setFilteredImages([])
      }
    }

    fetchFilteredImages()
  }, [filters, hasActiveFilters])

  // Atualizar filtros
  const updateFilter = (
    key: keyof FilteredData,
    value: string | number | null
  ) => {
    const newFilters = { ...filters, [key]: value }

    // Se mudou o ano, resetar o mês
    if (key === 'selectedYear') {
      newFilters.selectedMonth = null
    }

    setFilters(newFilters)
  }

  // Obter meses disponíveis para o ano selecionado
  const availableMonths = filters.selectedYear
    ? availablePeriods.monthsByYear[filters.selectedYear] || []
    : []

  // Nomes dos meses
  const monthNames = [
    '',
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

  // Gerar URL para a página do município
  const getMunicipalityUrl = (municipality: string) => {
    return `/gallery/${encodeURIComponent(municipality)}`
  }

  if (isLoading) {
    return (
      <>
        <HeroSection
          title="Galeria de Momentos"
          subtitle="Explore nossa galeria e veja de perto o impacto que um sorriso pode causar. Cada foto conta uma história de alegria, esperança e transformação."
          icon={ImageIcon}
          backgroundImage="/images/doctors/doutores2.jpg"
        />
        <div className="flex items-center justify-center py-24">
          <div className="text-lg">Carregando galeria...</div>
        </div>
      </>
    )
  }

  // Componente de filtros
  const FiltersSection = (
    <div className="mx-auto flex w-full max-w-xl justify-center px-4 sm:px-6">
      {/* Filtros em linha */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Filtro de Município */}
        <div className="flex w-full flex-col items-start space-y-1">
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/90">
            <MapPin className="h-4 w-4" />
            Cidade
          </label>
          <Select
            value={filters.selectedMunicipality}
            onValueChange={(value) =>
              updateFilter('selectedMunicipality', value)
            }
          >
            <SelectTrigger className="h-10 w-full rounded-full bg-white shadow-md sm:w-auto">
              <SelectValue placeholder="Todas as cidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas as cidades</SelectItem>
              {municipalities.map((municipality) => (
                <SelectItem key={municipality} value={municipality}>
                  {municipality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Ano */}
        <div className="flex w-full flex-col items-start space-y-1">
          <label className="flex items-center gap-2 text-sm font-medium text-white/90">
            <Calendar className="h-4 w-4" />
            Ano
          </label>
          <Select
            value={filters.selectedYear?.toString() || 'todos'}
            onValueChange={(value) =>
              updateFilter(
                'selectedYear',
                value === 'todos' ? null : parseInt(value)
              )
            }
          >
            <SelectTrigger className="h-10 w-full rounded-full bg-white shadow-md sm:w-auto">
              <SelectValue placeholder="Todos os anos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os anos</SelectItem>
              {availablePeriods.years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Mês */}
        <div className="flex w-full flex-col items-start space-y-1">
          <label className="flex items-center gap-2 text-sm font-medium text-white/90">
            <Calendar className="h-4 w-4" />
            Mês
          </label>
          <Select
            value={filters.selectedMonth?.toString() || 'todos'}
            onValueChange={(value) =>
              updateFilter(
                'selectedMonth',
                value === 'todos' ? null : parseInt(value)
              )
            }
            disabled={!filters.selectedYear}
          >
            <SelectTrigger className="h-10 w-full rounded-full bg-white shadow-md sm:w-auto">
              <SelectValue
                placeholder={
                  filters.selectedYear
                    ? 'Selecione o mês'
                    : 'Selecione um ano primeiro'
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os meses</SelectItem>
              {availableMonths.map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {monthNames[month]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section moderno */}
      <HeroSection
        title="Galeria de Momentos"
        subtitle="Explore nossa galeria e veja de perto o impacto que um sorriso pode causar. Cada foto conta uma história de alegria, esperança e transformação."
        icon={ImageIcon}
        backgroundImage="/images/doctors/doutores2.jpg"
      >
        {FiltersSection}
      </HeroSection>

      {/* Conteúdo Principal */}
      <div className="space-y-16 py-16">
        {/* Mensagem de filtros ativos */}
        {hasActiveFilters && (
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Filtros Aplicados
            </h2>
            <p className="text-gray-600">
              {filters.selectedMunicipality !== 'todos' &&
                `Município: ${filters.selectedMunicipality}`}
              {filters.selectedMunicipality !== 'todos' &&
                (filters.selectedYear || filters.selectedMonth) &&
                ' • '}
              {filters.selectedYear && `Ano: ${filters.selectedYear}`}
              {filters.selectedYear && filters.selectedMonth && ' • '}
              {filters.selectedMonth &&
                `Mês: ${monthNames[filters.selectedMonth]}`}
            </p>
          </div>
        )}

        {/* Componentes da galeria */}
        <GalleryFeaturedImages filteredImages={filteredImages} />

        {/* Botão "Ver mais" quando há filtros ativos */}
        {hasActiveFilters && filters.selectedMunicipality !== 'todos' && (
          <div className="mx-auto max-w-4xl px-4 text-center">
            <Button
              onClick={() => {
                window.location.href = getMunicipalityUrl(
                  filters.selectedMunicipality
                )
              }}
              variant="default"
              size="default"
            >
              Ver galeria completa de {filters.selectedMunicipality}
            </Button>
          </div>
        )}

        {/* Outras seções apenas quando não há filtros ativos */}
        {!hasActiveFilters && (
          <>
            <GalleryImpactSection />
            <GalleryMunicipalities />
          </>
        )}
      </div>
    </div>
  )
}

export default GalleryPage
