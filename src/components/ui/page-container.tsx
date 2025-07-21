import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
  sm: 'max-w-4xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
}

export function PageContainer({
  children,
  className,
  size = 'lg',
}: PageContainerProps) {
  return (
    <div className={cn('flex w-full justify-center', className)}>
      <div className={cn('flex w-full flex-col px-4', sizeClasses[size])}>
        {children}
      </div>
    </div>
  )
}
