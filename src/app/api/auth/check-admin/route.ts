import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session?.user?.id) {
      return NextResponse.json(
        { isAdmin: false, session: null },
        { status: 401 }
      )
    }

    // Verificar se o usuário é admin
    const user = await db
      .select({ role: usersTable.role })
      .from(usersTable)
      .where(eq(usersTable.id, session.user.id))
      .limit(1)

    const isAdmin = user[0]?.role === 'admin'

    return NextResponse.json({
      isAdmin,
      session,
      user: {
        id: session.user.id,
        email: session.user.email,
        role: user[0]?.role || 'user',
      },
    })
  } catch (error) {
    console.error('Erro ao verificar admin:', error)
    return NextResponse.json({ isAdmin: false, session: null }, { status: 500 })
  }
}
