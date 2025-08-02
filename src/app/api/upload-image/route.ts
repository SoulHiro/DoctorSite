import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Magic numbers para validar tipos de arquivo
const FILE_SIGNATURES = {
  'image/jpeg': [0xff, 0xd8, 0xff],
  'image/png': [0x89, 0x50, 0x4e, 0x47],
  'image/webp': [0x52, 0x49, 0x46, 0x46], // RIFF header
  'image/avif': [0x00, 0x00, 0x00], // Começa com ftyp (simplified)
  'image/heic': [0x00, 0x00, 0x00], // Começa com ftyp (simplified)
}

function validateFileSignature(buffer: Buffer, mimeType: string): boolean {
  const signature = FILE_SIGNATURES[mimeType as keyof typeof FILE_SIGNATURES]
  if (!signature) return false

  // Para JPEG, PNG - verificação direta
  if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
    return signature.every((byte, index) => buffer[index] === byte)
  }

  // Para WebP - verificar RIFF e WEBP
  if (mimeType === 'image/webp') {
    return (
      buffer.subarray(0, 4).every((byte, index) => byte === signature[index]) &&
      buffer.subarray(8, 12).toString() === 'WEBP'
    )
  }

  // Para AVIF/HEIC - verificar se contém 'ftyp'
  if (mimeType === 'image/avif' || mimeType === 'image/heic') {
    const header = buffer.subarray(0, 20).toString()
    return header.includes('ftyp')
  }

  return false
}

export async function POST(request: NextRequest) {
  try {
    // Iniciando upload de imagem

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'blog-posts'

    // Arquivo recebido para upload

    if (!file) {
      console.error('Nenhum arquivo foi enviado')
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      )
    }

    // Verificar tamanho do arquivo (máximo 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      console.error('Arquivo muito grande:', file.size)
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo permitido: 10MB' },
        { status: 400 }
      )
    }

    // Verificar formato do arquivo
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/heic',
    ]
    if (!allowedTypes.includes(file.type)) {
      console.error('Tipo de arquivo não permitido:', file.type)
      return NextResponse.json(
        {
          error: `Formato não suportado: ${file.type}. Formatos permitidos: JPG, PNG, WebP, AVIF, HEIC`,
        },
        { status: 400 }
      )
    }

    // Verificar nome do arquivo para evitar uploads maliciosos
    const filename = file.name
    const dangerousPatterns = [
      '.php',
      '.js',
      '.html',
      '.exe',
      '.bat',
      '.sh',
      '<script',
    ]
    if (
      dangerousPatterns.some((pattern) =>
        filename.toLowerCase().includes(pattern)
      )
    ) {
      console.error('Nome de arquivo suspeito:', filename)
      return NextResponse.json(
        { error: 'Nome de arquivo não permitido' },
        { status: 400 }
      )
    }

    // Convertendo arquivo para buffer

    // Converter File para Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Validar assinatura do arquivo (magic number)
    if (!validateFileSignature(buffer, file.type)) {
      console.error('Assinatura de arquivo inválida:', file.type)
      return NextResponse.json(
        { error: 'Arquivo corrompido ou tipo inválido' },
        { status: 400 }
      )
    }

    // Buffer criado, iniciando upload para Cloudinary

    // Fazer upload para o Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: 'image',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif', 'heic'],
            transformation: [
              { width: 1920, height: 1080, crop: 'limit' },
              { quality: 'auto:good' },
              { fetch_format: 'auto' },
            ],
            timeout: 60000, // 60 segundos timeout
          },
          (error, result) => {
            if (error) {
              console.error('Erro do Cloudinary:', error)
              reject(error)
            } else {
              // Upload para Cloudinary bem-sucedido
              resolve(result)
            }
          }
        )
        .end(buffer)
    })

    // Upload concluído com sucesso
    return NextResponse.json(result)
  } catch (error) {
    console.error('Erro no upload:', error)

    // Retornar erro mais específico
    const errorMessage =
      error instanceof Error ? error.message : 'Erro interno do servidor'

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
