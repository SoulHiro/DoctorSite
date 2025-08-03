import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from '@/db'
import * as schema from '@/db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: false,
    schema,
  }),
  // Google OAuth temporariamente desabilitado por segurança
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //     redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
  //   },
  // },
  user: {
    modelName: 'usersTable',
  },
  session: {
    modelName: 'sessionsTable',
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // atualiza a cada 24h
  },
  account: {
    modelName: 'accountsTable',
  },
  verification: {
    modelName: 'verificationsTable',
  },
  emailAndPassword: {
    enabled: true,
  },
  rateLimit: {
    window: 60,
    max: 5,
  },
  // Configurações para produção
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: ['https://doutorespalhacos.com', 'http://localhost:3000'],
  // Configuração de cookies para produção
  cookie: {
    name: 'better-auth.session_token',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    domain:
      process.env.NODE_ENV === 'production'
        ? '.doutorespalhacos.com'
        : undefined,
  },
})
