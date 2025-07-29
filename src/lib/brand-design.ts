// Design System - SOS Bom Humor Doutores Palhaços
export const brandDesign = {
  // Cores principais da marca
  colors: {
    primary: {
      red: '#ef4444', // Vermelho do nariz do palhaço
      orange: '#f97316', // Laranja vibrante
      pink: '#ec4899', // Rosa alegre
      yellow: '#facc15', // Amarelo divertido
    },
    gradients: {
      hero: 'from-orange-500 via-red-500 to-pink-500',
      heroOverlay: 'from-yellow-400/20 via-transparent to-purple-400/20',
      pageBackground: 'from-orange-50 via-white to-pink-50',
      cardHover: 'from-red-50 to-pink-50',
    },
    neutral: {
      white: '#ffffff',
      gray50: '#f8fafc',
      gray100: '#f1f5f9',
      gray600: '#475569',
      gray900: '#0f172a',
    },
  },

  // Animações e microinterações
  animations: {
    durations: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      smooth: [0.25, 0.1, 0.25, 1.0] as const,
      bounce: [0.68, -0.55, 0.265, 1.55] as const,
    },
    delays: {
      stagger1: '100ms',
      stagger2: '200ms',
      stagger3: '300ms',
    },
  },

  // Elementos decorativos dos palhaços
  decorativeElements: [
    {
      size: 'h-20 w-20',
      color: 'bg-yellow-400/30',
      animation: 'animate-pulse',
      position: 'top-20 left-10',
      blur: 'blur-xl',
    },
    {
      size: 'h-32 w-32',
      color: 'bg-purple-400/30',
      animation: 'animate-pulse',
      position: 'right-10 bottom-20',
      blur: 'blur-xl',
      delay: 'animation-delay-1000',
    },
    {
      size: 'h-16 w-16',
      color: 'bg-pink-400/20',
      animation: 'animate-bounce',
      position: 'top-1/2 left-1/4',
      blur: 'blur-lg',
      delay: 'animation-delay-500',
    },
    {
      size: 'h-12 w-12',
      color: 'bg-orange-400/25',
      animation: 'animate-ping',
      position: 'bottom-10 left-1/3',
      blur: 'blur-md',
      delay: 'animation-delay-1500',
    },
  ],

  // Tipografia
  typography: {
    hero: 'text-5xl font-bold tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl',
    subtitle:
      'mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl',
    sectionTitle: 'text-4xl font-bold text-gray-900',
    cardTitle: 'text-lg font-bold text-gray-900',
  },

  // Botões da marca
  buttons: {
    primary:
      'w-fit rounded-full bg-red-500 font-semibold text-white shadow transition duration-300 hover:scale-105 hover:bg-red-600',
    secondary:
      'w-fit rounded-full bg-white font-semibold text-gray-900 shadow transition duration-300 hover:scale-105 hover:bg-gray-100',
  },

  // Containers e layouts
  layout: {
    container: 'container mx-auto max-w-6xl px-4',
    spacing: 'space-y-16',
    heroSection: 'relative overflow-hidden',
    pageWrapper: 'min-h-screen space-y-16',
  },
}

// Utilitários para microanimações
export const microAnimations = {
  cardHover: 'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
  buttonHover: 'transition-all duration-300 hover:scale-105',
  fadeInUp: 'animate-fade-in-up',
  staggerDelay: (index: number) =>
    `style={{ animationDelay: '${index * 100}ms' }}`,
}
