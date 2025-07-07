import { NextRequest, NextResponse } from 'next/server'

import { publishScheduledPosts } from '@/lib/scheduler'

export async function POST(request: NextRequest) {
  try {
    // Verificação de segurança - apenas requests com chave especial
    const authHeader = request.headers.get('authorization')
    const expectedAuth = process.env.CRON_SECRET_KEY || 'your-cron-secret-key'

    if (authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const result = await publishScheduledPosts()

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Erro no cron job:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message:
        'Cron Job API - Use POST para executar a publicação de posts agendados',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  )
}
