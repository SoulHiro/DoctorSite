import Link from 'next/link'
import * as React from 'react'

import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export function ListItem({
  title,
  children,
  href,
  disabled = false,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & {
  href: string
  disabled?: boolean
}) {
  return (
    <li {...props}>
      {disabled ? (
        <div
          className={cn(
            'block cursor-not-allowed space-y-1 rounded-md p-3 leading-none no-underline opacity-50 outline-none select-none',
            'text-muted-foreground'
          )}
          aria-disabled="true"
        >
          <div className="text-sm leading-none font-medium text-gray-400">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
            {children}
          </p>
        </div>
      ) : (
        <NavigationMenuLink asChild>
          <Link href={href}>
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      )}
    </li>
  )
}
