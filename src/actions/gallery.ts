import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

import { db, mediaTable } from '@/db'
import { auth } from '@/lib/auth'

// Função para buscar todas as imagens da galeria
export async function getGallery(city: string) {
  const gallery = await db.query.mediaTable.findMany({
    where: eq(mediaTable.type, 'image'),
  })

  return gallery.filter((item) => item.municipality === city)
}

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
    takenAt: formData.get('takenAt') as string,
    isPublic: true,
    userId: userId,
  })

  if (!post) {
    return { error: 'Erro ao enviar imagem' }
  }

  return { success: 'Imagem enviada com sucesso' }
}
