'use server'

import { and, asc, desc, eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { z } from 'zod'

import { db, mediaTable, usersTable } from '@/db'
import { auth } from '@/lib/auth'

// Schema para validação dos dados de upload
const createImageSchema = z.object({
  url: z.string().url({ message: 'URL inválida' }),
  filename: z.string().min(1, { message: 'Nome do arquivo é obrigatório' }),
})

// Schema para upload múltiplo
const createMultipleImagesSchema = z.object({
  images: z
    .array(createImageSchema)
    .min(1, { message: 'Pelo menos uma imagem é necessária' }),
  municipality: z.string().min(1, { message: 'Município é obrigatório' }),
  takenAt: z.string().min(1, { message: 'Data é obrigatória' }),
})

// Schema para filtros de busca
const galleryFiltersSchema = z.object({
  municipality: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  orderBy: z
    .enum(['date-desc', 'date-asc', 'municipality'])
    .default('date-desc'),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
})

// Função para formatar data sem horário (apenas dia/mês/ano)
const formatDateForDB = (dateString: string) => {
  const date = new Date(dateString)
  // Garantir que seja armazenado como início do dia (00:00:00) em UTC
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString()
}

/**
 * Obter períodos disponíveis (anos e meses) onde existem fotos
 */
export async function getAvailablePeriods() {
  try {
    const periods = await db
      .select({
        year: sql<number>`EXTRACT(YEAR FROM ${mediaTable.takenAt})`,
        month: sql<number>`EXTRACT(MONTH FROM ${mediaTable.takenAt})`,
        count: sql<number>`count(*)`,
      })
      .from(mediaTable)
      .where(and(eq(mediaTable.type, 'image'), eq(mediaTable.isPublic, true)))
      .groupBy(
        sql`EXTRACT(YEAR FROM ${mediaTable.takenAt})`,
        sql`EXTRACT(MONTH FROM ${mediaTable.takenAt})`
      )
      .orderBy(
        sql`EXTRACT(YEAR FROM ${mediaTable.takenAt}) desc`,
        sql`EXTRACT(MONTH FROM ${mediaTable.takenAt}) desc`
      )

    // Organizar dados por ano
    const yearMonthMap = new Map<number, Set<number>>()

    periods.forEach(({ year, month }) => {
      if (!yearMonthMap.has(year)) {
        yearMonthMap.set(year, new Set())
      }
      yearMonthMap.get(year)!.add(month)
    })

    // Converter para formato mais útil
    const availableYears = Array.from(yearMonthMap.keys()).sort((a, b) => b - a)
    const availableMonthsByYear = Object.fromEntries(
      Array.from(yearMonthMap.entries()).map(([year, months]) => [
        year,
        Array.from(months).sort((a, b) => b - a),
      ])
    )

    return {
      years: availableYears,
      monthsByYear: availableMonthsByYear,
    }
  } catch (error) {
    console.error('Erro ao buscar períodos disponíveis:', error)
    return {
      years: [],
      monthsByYear: {},
    }
  }
}

/**
 * Criar múltiplas imagens na galeria
 */
export async function createImages(formData: FormData) {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })
  const userId = session?.user?.id

  if (!userId) {
    return { error: 'Usuário não autenticado' }
  }

  try {
    // Extrair dados do FormData
    const imageCount = parseInt(formData.get('imageCount') as string) || 0
    const municipality = formData.get('municipality') as string
    const takenAt = formData.get('takenAt') as string

    console.log('Dados recebidos:', {
      imageCount,
      municipality,
      takenAt,
      userId,
    })

    // Validação obrigatória - não permitir prosseguir sem esses campos
    if (!municipality || municipality.trim() === '') {
      return { error: 'Município é obrigatório' }
    }

    if (!takenAt || takenAt.trim() === '') {
      return { error: 'Data é obrigatória' }
    }

    if (imageCount === 0) {
      return { error: 'Pelo menos uma imagem é necessária' }
    }

    // Extrair URLs e filenames das imagens
    const imagesData = []
    for (let i = 0; i < imageCount; i++) {
      const url = formData.get(`images[${i}].url`) as string
      const filename = formData.get(`images[${i}].filename`) as string

      console.log(`Imagem ${i}:`, { url, filename })

      if (url && filename) {
        imagesData.push({ url, filename })
      }
    }

    console.log('Imagens processadas:', imagesData)

    // Verificar se temos imagens válidas
    if (imagesData.length === 0) {
      return { error: 'Nenhuma imagem válida foi encontrada' }
    }

    // Validar dados usando schema
    const validatedData = createMultipleImagesSchema.safeParse({
      images: imagesData,
      municipality: municipality.trim(),
      takenAt,
    })

    if (!validatedData.success) {
      console.error('Erro de validação:', validatedData.error.errors)
      return {
        error: validatedData.error.errors.map((e) => e.message).join(', '),
      }
    }

    // Preparar dados para inserção
    const imagesToInsert = validatedData.data.images.map((image) => ({
      url: image.url,
      filename: image.filename,
      type: 'image' as const,
      municipality: validatedData.data.municipality,
      takenAt: formatDateForDB(validatedData.data.takenAt),
      isPublic: true,
      userId: userId,
    }))

    console.log('Dados para inserir no banco:', imagesToInsert)

    // Inserir no banco
    const insertedImages = await db
      .insert(mediaTable)
      .values(imagesToInsert)
      .returning()

    console.log('Imagens inseridas:', insertedImages.length)

    return {
      success: true,
      message: `${insertedImages.length} imagem(ns) enviada(s) com sucesso`,
      images: insertedImages.map((img) => ({
        id: img.id,
        url: img.url,
        filename: img.filename,
        municipality: img.municipality,
        takenAt: img.takenAt,
        createdAt: img.createdAt,
      })),
    }
  } catch (error) {
    console.error('Erro ao criar imagens:', error)
    return { error: 'Erro interno ao enviar imagens' }
  }
}

/**
 * Buscar todas as imagens da galeria (apenas públicas)
 */
export async function getImages() {
  try {
    const images = await db.query.mediaTable.findMany({
      where: and(eq(mediaTable.type, 'image'), eq(mediaTable.isPublic, true)),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [desc(mediaTable.takenAt), desc(mediaTable.createdAt)],
    })

    return images.map((image) => ({
      id: image.id,
      url: image.url,
      filename: image.filename,
      municipality: image.municipality,
      takenAt: image.takenAt,
      author: image.user.name,
      authorId: image.userId,
      createdAt: image.createdAt,
    }))
  } catch (error) {
    console.error('Erro ao buscar imagens:', error)
    return []
  }
}

/**
 * Buscar imagens com filtros
 */
export async function getImagesByFilters(filters: {
  municipality?: string
  startDate?: string
  endDate?: string
  orderBy?: 'date-desc' | 'date-asc' | 'municipality'
  limit?: number
  offset?: number
}) {
  try {
    // Validar filtros
    const validatedFilters = galleryFiltersSchema.safeParse(filters)
    if (!validatedFilters.success) {
      console.error('Filtros inválidos:', validatedFilters.error)
      return []
    }

    const { municipality, startDate, endDate, orderBy, limit, offset } =
      validatedFilters.data

    // Construir condições WHERE
    const whereConditions = [
      eq(mediaTable.type, 'image'),
      eq(mediaTable.isPublic, true),
    ]

    if (municipality) {
      whereConditions.push(eq(mediaTable.municipality, municipality))
    }

    if (startDate) {
      whereConditions.push(
        sql`${mediaTable.takenAt} >= ${formatDateForDB(startDate)}`
      )
    }

    if (endDate) {
      whereConditions.push(
        sql`${mediaTable.takenAt} <= ${formatDateForDB(endDate)}`
      )
    }

    // Definir ordenação
    let orderByClause
    switch (orderBy) {
      case 'date-asc':
        orderByClause = [asc(mediaTable.takenAt), asc(mediaTable.createdAt)]
        break
      case 'municipality':
        orderByClause = [asc(mediaTable.municipality), desc(mediaTable.takenAt)]
        break
      case 'date-desc':
      default:
        orderByClause = [desc(mediaTable.takenAt), desc(mediaTable.createdAt)]
        break
    }

    const images = await db.query.mediaTable.findMany({
      where: and(...whereConditions),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: orderByClause,
      limit,
      offset,
    })

    return images.map((image) => ({
      id: image.id,
      url: image.url,
      filename: image.filename,
      municipality: image.municipality,
      takenAt: image.takenAt,
      author: image.user.name,
      authorId: image.userId,
      createdAt: image.createdAt,
    }))
  } catch (error) {
    console.error('Erro ao buscar imagens com filtros:', error)
    return []
  }
}

/**
 * Buscar imagens por município específico
 */
export async function getImagesByMunicipality(municipality: string) {
  return getImagesByFilters({ municipality })
}

/**
 * Buscar imagens por período
 */
export async function getImagesByDateRange(startDate: string, endDate: string) {
  return getImagesByFilters({ startDate, endDate })
}

/**
 * Deletar uma imagem
 */
export async function deleteImage(imageId: string) {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })
  const userId = session?.user?.id

  if (!userId) {
    return { error: 'Usuário não autenticado' }
  }

  try {
    // Verificar se a imagem existe e se o usuário tem permissão
    const existingImage = await db.query.mediaTable.findFirst({
      where: eq(mediaTable.id, imageId),
    })

    if (!existingImage) {
      return { error: 'Imagem não encontrada' }
    }

    // Verificar permissão (apenas admin ou o próprio usuário que fez upload)
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
      columns: { role: true },
    })

    if (existingImage.userId !== userId && user?.role !== 'admin') {
      return { error: 'Você não tem permissão para deletar esta imagem' }
    }

    // Deletar a imagem
    const [deletedImage] = await db
      .delete(mediaTable)
      .where(eq(mediaTable.id, imageId))
      .returning()

    if (!deletedImage) {
      return { error: 'Erro ao deletar a imagem' }
    }

    return {
      success: true,
      message: 'Imagem deletada com sucesso',
      deletedImage: {
        id: deletedImage.id,
        filename: deletedImage.filename,
        municipality: deletedImage.municipality,
      },
    }
  } catch (error) {
    console.error('Erro ao deletar imagem:', error)
    return { error: 'Erro interno ao deletar imagem' }
  }
}

/**
 * Obter estatísticas da galeria
 */
export async function getGalleryStats() {
  try {
    // Total de imagens
    const totalImages = await db
      .select({ count: sql<number>`count(*)` })
      .from(mediaTable)
      .where(and(eq(mediaTable.type, 'image'), eq(mediaTable.isPublic, true)))

    // Total de municípios únicos
    const uniqueMunicipalities = await db
      .selectDistinct({ municipality: mediaTable.municipality })
      .from(mediaTable)
      .where(and(eq(mediaTable.type, 'image'), eq(mediaTable.isPublic, true)))

    // Imagens por município
    const imagesByMunicipality = await db
      .select({
        municipality: mediaTable.municipality,
        count: sql<number>`count(*)`,
      })
      .from(mediaTable)
      .where(and(eq(mediaTable.type, 'image'), eq(mediaTable.isPublic, true)))
      .groupBy(mediaTable.municipality)
      .orderBy(sql`count(*) desc`)

    return {
      totalImages: totalImages[0]?.count || 0,
      totalMunicipalities: uniqueMunicipalities.length,
      imagesByMunicipality,
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return {
      totalImages: 0,
      totalMunicipalities: 0,
      imagesByMunicipality: [],
    }
  }
}

/**
 * Obter lista de municípios únicos
 */
export async function getMunicipalities() {
  try {
    const municipalities = await db
      .selectDistinct({ municipality: mediaTable.municipality })
      .from(mediaTable)
      .where(and(eq(mediaTable.type, 'image'), eq(mediaTable.isPublic, true)))
      .orderBy(asc(mediaTable.municipality))

    return municipalities.map((item) => item.municipality)
  } catch (error) {
    console.error('Erro ao buscar municípios:', error)
    return []
  }
}

// Manter compatibilidade com functions existentes (deprecated)
/** @deprecated Use getImagesByMunicipality instead */
export async function getGallery(city: string) {
  return getImagesByMunicipality(city)
}

/** @deprecated Use createImages instead */
export async function postGallery(formData: FormData) {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })
  const userId = session?.user?.id

  if (!userId) {
    return { error: 'Usuário não autenticado' }
  }

  const post = await db.insert(mediaTable).values({
    url: formData.get('url') as string,
    filename: formData.get('filename') as string,
    type: formData.get('type') as 'image' | 'video',
    municipality: formData.get('municipality') as string,
    takenAt: formatDateForDB(formData.get('takenAt') as string),
    isPublic: true,
    userId: userId,
  })

  if (!post) {
    return { error: 'Erro ao enviar imagem' }
  }

  return { success: 'Imagem enviada com sucesso' }
}
