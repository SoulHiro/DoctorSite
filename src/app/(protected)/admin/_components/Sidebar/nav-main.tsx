'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    description?: string
    items?: {
      title: string
      url: string
      icon?: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  // Verifica se o item está ativo
  const isItemActive = (url: string, hasSubItems?: boolean) => {
    if (hasSubItems) {
      return pathname.startsWith(url.replace('#', ''))
    }
    return pathname === url || (url !== '/' && pathname.startsWith(url))
  }

  // Verifica se o subitem está ativo
  const isSubItemActive = (url: string) => pathname === url

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const isActive = isItemActive(item.url, !!item.items)
          const shouldExpand = isActive && !!item.items

          return item.items ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={shouldExpand}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.description || item.title}
                    className={cn(
                      'group relative rounded-lg px-2 py-1 transition-all duration-200',
                      isActive
                        ? 'border border-orange-100 bg-orange-50 font-semibold text-red-600 shadow'
                        : 'text-gray-700 hover:bg-orange-50/60'
                    )}
                  >
                    {item.icon && (
                      <span className="mr-2 flex items-center">
                        <item.icon
                          className={cn(
                            'transition-colors duration-200',
                            isActive
                              ? 'text-red-500 drop-shadow-[0_1px_0_rgba(255,180,0,0.15)]'
                              : 'text-gray-400'
                          )}
                          size={20}
                        />
                      </span>
                    )}
                    <span className="flex-1">{item.title}</span>
                    {/* Indicador cartoon minimalista */}
                    {isActive && (
                      <span className="cartoon-bounce ml-2 inline-block h-2 w-2 rounded-full border-2 border-white bg-orange-300 shadow" />
                    )}
                    <ChevronRight
                      className={cn(
                        'ml-auto transition-transform duration-200',
                        'group-data-[state=open]/collapsible:rotate-90',
                        isActive ? 'text-orange-400' : 'text-gray-300'
                      )}
                      size={16}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="mt-1 ml-3 space-y-0.5">
                    {item.items?.map((subItem) => {
                      const isSubActive = isSubItemActive(subItem.url)
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              'group relative rounded-md px-2 py-1 transition-all duration-200',
                              isSubActive
                                ? 'border border-orange-200 bg-orange-100 font-medium text-red-600 shadow'
                                : 'text-gray-600 hover:bg-orange-50/70'
                            )}
                          >
                            <a
                              href={subItem.url}
                              className="flex items-center gap-2"
                            >
                              {/* Emoji cartoonizado */}
                              {subItem.icon && (
                                <span className="text-base drop-shadow-[0_1px_0_rgba(255,180,0,0.10)]">
                                  {subItem.icon}
                                </span>
                              )}
                              <span className="flex-1">{subItem.title}</span>
                              {/* Indicador cartoon minimalista */}
                              {isSubActive && (
                                <span className="cartoon-bounce ml-1 inline-block h-1.5 w-1.5 rounded-full border border-white bg-orange-300 shadow" />
                              )}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.description || item.title}
                className={cn(
                  'group relative rounded-lg px-2 py-1 transition-all duration-200',
                  isActive
                    ? 'border border-orange-100 bg-orange-50 font-semibold text-red-600 shadow'
                    : 'text-gray-700 hover:bg-orange-50/60'
                )}
              >
                <a href={item.url} className="flex items-center gap-2">
                  {item.icon && (
                    <span className="flex items-center">
                      <item.icon
                        className={cn(
                          'transition-colors duration-200',
                          isActive
                            ? 'text-red-500 drop-shadow-[0_1px_0_rgba(255,180,0,0.15)]'
                            : 'text-gray-400'
                        )}
                        size={20}
                      />
                    </span>
                  )}
                  <span className="flex-1">{item.title}</span>
                  {/* Indicador cartoon minimalista */}
                  {isActive && (
                    <span className="cartoon-bounce ml-2 inline-block h-2 w-2 rounded-full border-2 border-white bg-orange-300 shadow" />
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
