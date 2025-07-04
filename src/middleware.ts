import { NextRequest, NextResponse } from 'next/server'

import { corsHeaders } from './lib/cors'

const allowedOrigins = ['http://localhost:3000', 'https://doutorespalhacos.com']

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''

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
