import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Remove formatação HTML/markdown do texto
 * @param text - Texto com formatação HTML/markdown
 * @returns Texto limpo sem formatação
 */
export function stripHtmlAndMarkdown(text: string): string {
  if (!text) return ''

  return (
    text
      // Remove tags HTML
      .replace(/<[^>]*>/g, '')
      // Remove markdown headers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove markdown bold/italic
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      // Remove markdown links
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove markdown code blocks
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      // Remove markdown blockquotes
      .replace(/^>\s+/gm, '')
      // Remove markdown lists
      .replace(/^[\s]*[-*+]\s+/gm, '')
      .replace(/^[\s]*\d+\.\s+/gm, '')
      // Remove múltiplos espaços e quebras de linha
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim()
  )
}
