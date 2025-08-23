import { authClient } from '@/lib/auth-client'

// Tipos para o usuário
interface User {
  id: string
  name: string
  email: string
  image?: string
}

// Hook customizado que normaliza a estrutura da sessão
export function useAuthSession() {
  const { data: sessionData, isPending, error } = authClient.useSession()

  // Normalizar estrutura: sessionData pode ser { user: {...}, session: {...} } ou { session: { user: {...}, session: {...} } }
  let user: User | null = null
  let session = null

  if (sessionData) {
    // Se sessionData tem um campo 'user' diretamente
    if ('user' in sessionData && sessionData.user) {
      user = sessionData.user as User
      session = sessionData
    }
    // Se sessionData tem um campo 'session' que contém 'user'
    else if (
      'session' in sessionData &&
      sessionData.session &&
      typeof sessionData.session === 'object' &&
      'user' in sessionData.session
    ) {
      // Casting mais específico para evitar o any
      const nestedSession = sessionData.session as { user: User }
      user = nestedSession.user
      session = sessionData.session
    }
  }

  return {
    data: session,
    isPending,
    error,
    user,
    isLoggedIn: !!user,
    // Adiciona um estado mais específico para evitar chamadas desnecessárias
    isLoading: isPending,
  }
}
