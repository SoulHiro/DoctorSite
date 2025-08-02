import { NextRequest, NextResponse } from 'next/server'

import { corsHeaders } from './lib/cors'
import { shouldShowMobileConstruction } from './lib/device-detection'

const allowedOrigins = [
  'http://localhost:3001',
  'https://doutorespalhacos.com',
  'https://doctor-site-9pmaeiv8n-soulhiros-projects.vercel.app',
]

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''
  const userAgent = request.headers.get('user-agent') ?? ''
  const isMobile = shouldShowMobileConstruction(userAgent)
  const isOnMobilePage = request.nextUrl.pathname.startsWith(
    '/mobile-em-construcao'
  )

  // Se é MOBILE e NÃO está na página mobile -> redireciona para página mobile
  if (isMobile && !isOnMobilePage) {
    return NextResponse.redirect(new URL('/mobile-em-construcao', request.url))
  }

  // Se NÃO é mobile e está tentando acessar página mobile -> bloqueia
  if (!isMobile && isOnMobilePage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse('Origin not allowed', { status: 403 })
  }

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders(origin),
    })
  }

  const response = NextResponse.next()
  Object.entries(corsHeaders(origin)).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Redireciona para o dashboard se já logado e tentando acessar /auth
  const cookieName = 'better-auth.session_token'
  const hasCookie = request.cookies.has(cookieName)
  if (hasCookie && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Redireciona para o login se não estiver logado e tentando acessar /admin
  if (!hasCookie && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return response
}
