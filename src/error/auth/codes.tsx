type Lang = 'pt' | 'en'

type Code =
  | 'USER_NOT_FOUND'
  | 'FAILED_TO_CREATE_USER'
  | 'FAILED_TO_CREATE_SESSION'
  | 'FAILED_TO_UPDATE_USER'
  | 'FAILED_TO_GET_SESSION'
  | 'INVALID_PASSWORD'
  | 'INVALID_EMAIL'
  | 'INVALID_EMAIL_OR_PASSWORD'
  | 'SOCIAL_ACCOUNT_ALREADY_LINKED'
  | 'PROVIDER_NOT_FOUND'
  | 'INVALID_TOKEN'
  | 'ID_TOKEN_NOT_SUPPORTED'
  | 'FAILED_TO_GET_USER_INFO'
  | 'USER_EMAIL_NOT_FOUND'
  | 'EMAIL_NOT_VERIFIED'
  | 'PASSWORD_TOO_SHORT'
  | 'PASSWORD_TOO_LONG'
  | 'USER_ALREADY_EXISTS'
  | 'EMAIL_CAN_NOT_BE_UPDATED'
  | 'CREDENTIAL_ACCOUNT_NOT_FOUND'
  | 'SESSION_EXPIRED'
  | 'FAILED_TO_UNLINK_LAST_ACCOUNT'
  | 'ACCOUNT_NOT_FOUND'
  | 'USER_ALREADY_HAS_PASSWORD'

const defaultMessages: Record<Code, Record<Lang, string>> = {
  USER_NOT_FOUND: {
    pt: 'Usuário não encontrado',
    en: 'User not found',
  },
  FAILED_TO_CREATE_USER: {
    pt: 'Falha ao criar usuário',
    en: 'Failed to create user',
  },
  FAILED_TO_CREATE_SESSION: {
    pt: 'Falha ao criar sessão',
    en: 'Failed to create session',
  },
  FAILED_TO_UPDATE_USER: {
    pt: 'Falha ao atualizar usuário',
    en: 'Failed to update user',
  },
  FAILED_TO_GET_SESSION: {
    pt: 'Falha ao obter sessão',
    en: 'Failed to get session',
  },
  INVALID_PASSWORD: {
    pt: 'Senha inválida',
    en: 'Invalid password',
  },
  INVALID_EMAIL: {
    pt: 'E-mail inválido',
    en: 'Invalid email',
  },
  INVALID_EMAIL_OR_PASSWORD: {
    pt: 'E-mail ou senha inválidos',
    en: 'Invalid email or password',
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    pt: 'Conta social já vinculada',
    en: 'Social account already linked',
  },
  PROVIDER_NOT_FOUND: {
    pt: 'Provedor não encontrado',
    en: 'Provider not found',
  },
  INVALID_TOKEN: {
    pt: 'Token inválido',
    en: 'Invalid token',
  },
  ID_TOKEN_NOT_SUPPORTED: {
    pt: 'id_token não suportado',
    en: 'id_token not supported',
  },
  FAILED_TO_GET_USER_INFO: {
    pt: 'Falha ao obter informações do usuário',
    en: 'Failed to get user info',
  },
  USER_EMAIL_NOT_FOUND: {
    pt: 'E-mail do usuário não encontrado',
    en: 'User email not found',
  },
  EMAIL_NOT_VERIFIED: {
    pt: 'E-mail não verificado',
    en: 'Email not verified',
  },
  PASSWORD_TOO_SHORT: {
    pt: 'Senha muito curta',
    en: 'Password too short',
  },
  PASSWORD_TOO_LONG: {
    pt: 'Senha muito longa',
    en: 'Password too long',
  },
  USER_ALREADY_EXISTS: {
    pt: 'Usuário já existe',
    en: 'User already exists',
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    pt: 'E-mail não pode ser atualizado',
    en: 'Email can not be updated',
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    pt: 'Conta de credencial não encontrada',
    en: 'Credential account not found',
  },
  SESSION_EXPIRED: {
    pt: 'Sessão expirada. Reautentique para continuar.',
    en: 'Session expired. Re-authenticate to perform this action.',
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    pt: 'Você não pode desvincular sua última conta',
    en: "You can't unlink your last account",
  },
  ACCOUNT_NOT_FOUND: {
    pt: 'Conta não encontrada',
    en: 'Account not found',
  },
  USER_ALREADY_HAS_PASSWORD: {
    pt: 'Usuário já possui uma senha. Informe-a para deletar a conta.',
    en: 'User already has a password. Provide that to delete the account.',
  },
}

export function getAuthErrorMessage(code: string, lang: Lang = 'pt'): string {
  const isKnownCode = code in defaultMessages
  if (isKnownCode) {
    return defaultMessages[code as Code][lang]
  }
  return 'Erro desconhecido'
}

// Retirado de: https://github.com/better-auth/better-auth/blob/main/packages/better-auth/src/error/codes.ts
