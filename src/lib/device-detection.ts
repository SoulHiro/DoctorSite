/**
 * Detecta se o request vem de um dispositivo móvel
 * baseado no User-Agent header
 */
export function isMobileDevice(userAgent: string): boolean {
  // Lista de padrões de User-Agent para dispositivos móveis
  const mobilePatterns = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /Opera Mini/i,
    /IEMobile/i,
    /Mobile/i,
    /mobile/i,
    /CriOS/i,
    /FxiOS/i,
  ]

  return mobilePatterns.some((pattern) => pattern.test(userAgent))
}

/**
 * Detecta se o request vem especificamente de um tablet
 */
export function isTabletDevice(userAgent: string): boolean {
  const tabletPatterns = [
    /iPad/i,
    /Android(?!.*Mobile)/i, // Android sem "Mobile" geralmente é tablet
    /Tablet/i,
    /KFAPWI/i, // Kindle Fire
    /Kindle/i,
    /Silk/i,
    /KFTT/i,
    /KFOT/i,
    /KFJWA/i,
    /KFJWI/i,
    /KFSOWI/i,
    /KFTHWA/i,
    /KFTHWI/i,
    /KFASWI/i,
    /KFASOWI/i,
  ]

  return tabletPatterns.some((pattern) => pattern.test(userAgent))
}

/**
 * Verifica se deve mostrar a página mobile em construção
 * Considera apenas smartphones, não tablets
 */
export function shouldShowMobileConstruction(userAgent: string): boolean {
  // Se for mobile mas não for tablet, mostrar página de construção
  return isMobileDevice(userAgent) && !isTabletDevice(userAgent)
}

/**
 * Verifica se o usuário forçou o modo desktop
 * Esta função só pode ser usada no lado do cliente
 */
export function isDesktopModeForced(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('force-desktop-mode') === 'true'
}
