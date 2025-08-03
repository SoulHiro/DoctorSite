import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ session: null }, { status: 401 })
    }

    return NextResponse.json({ session })
  } catch (error) {
    console.error('Erro ao obter sessão:', error)
    return NextResponse.json({ session: null }, { status: 500 })
  }
}
