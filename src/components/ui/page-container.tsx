import { type ElementType, type ReactNode } from 'react'

import { brandDesign } from '@/lib/brand-design'
import { cn } from '@/lib/utils'

type PageContainerProps<T extends ElementType = 'div'> = {
  children: ReactNode
  className?: string
  as?: T
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function PageContainer<T extends ElementType = 'div'>(
  props: PageContainerProps<T>
) {
  const { children, className, as, ...rest } = props
  const Component = (as ?? 'div') as ElementType
  return (
    <Component
      className={cn(brandDesign.layout.container, className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default PageContainer
