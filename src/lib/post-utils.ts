// Utilitários para manipulação de posts

import { z } from 'zod'

// Gera um slug único baseado no título
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim()
}

// Gera um excerpt a partir do conteúdo
export const generateExcerpt = (
  content: string,
  maxLength: number = 150
): string => {
  const cleanContent = content.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()

  if (cleanContent.length <= maxLength) {
    return cleanContent
  }

  // Corta no último espaço para não quebrar palavras
  const truncated = cleanContent.substring(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...'
  }

  return truncated + '...'
}

// Valida se uma data de agendamento é válida
export const isValidScheduleDate = (scheduledDate: Date): boolean => {
  const now = new Date()
  return scheduledDate > now
}

// Formata uma data para exibição
export const formatDate = (
  date: Date | string,
  includeTime: boolean = false
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (includeTime) {
    return dateObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Calcula o tempo estimado de leitura
export const calculateReadingTime = (
  content: string,
  wordsPerMinute: number = 200
): number => {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return Math.max(1, minutes)
}

// Sanitiza o conteúdo do post removendo tags HTML perigosas
export const sanitizeContent = (content: string): string => {
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
}

// Valida os dados de um post
export const validatePostData = (postData: {
  title: string
  content: string
  tags: string[]
  scheduledAt?: Date
}) => {
  const errors: string[] = []

  if (!postData.title || postData.title.trim().length === 0) {
    errors.push('Título é obrigatório')
  }

  if (!postData.content || postData.content.trim().length === 0) {
    errors.push('Conteúdo é obrigatório')
  }

  if (!postData.tags || postData.tags.length === 0) {
    errors.push('Pelo menos uma tag é obrigatória')
  }

  if (postData.scheduledAt && !isValidScheduleDate(postData.scheduledAt)) {
    errors.push('Data de agendamento deve ser no futuro')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Determina o status do post baseado nos dados
export const determinePostStatus = (
  isScheduled: boolean,
  scheduledAt?: Date
): 'rascunho' | 'publicado' | 'agendado' => {
  if (isScheduled && scheduledAt && isValidScheduleDate(scheduledAt)) {
    return 'agendado'
  }
  return 'publicado'
}

// Cria uma data no fuso horário local
export const createLocalDateTime = (
  year: number,
  month: number,
  day: number,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
  milliseconds: number = 0
): Date => {
  return new Date(year, month, day, hours, minutes, seconds, milliseconds)
}

// Combina uma data com um horário no fuso horário local
export const combineDateTimeLocal = (date: Date, timeString: string): Date => {
  const [hours, minutes] = timeString.split(':').map(Number)

  return createLocalDateTime(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    0,
    0
  )
}

// Converte uma data local para ISO string preservando o fuso horário
export const toLocalISOString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`
}

// Tipos para melhor tipagem
export type PostStatus = 'rascunho' | 'publicado' | 'agendado'
export type PostTag = 'noticia' | 'evento' | 'artigo' | 'outro'

export interface PostData {
  title: string
  content: string
  tags: PostTag[]
  scheduledAt?: Date
  image?: File
}

export interface PostValidationResult {
  isValid: boolean
  errors: string[]
}

// Schema Zod para validação de posts
export const postSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  tags: z.array(z.string()).min(1, 'Pelo menos uma tag é obrigatória'),
  scheduledAt: z.date().optional(),
})
