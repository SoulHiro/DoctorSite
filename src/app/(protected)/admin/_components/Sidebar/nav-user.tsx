'use client'

import { ChevronsUpDown, LogOut, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { data: session } = authClient.useSession()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn(
                'group relative rounded-xl transition-all duration-300',
                'border border-red-100/50',
                'hover:scale-[1.02] hover:shadow-md'
              )}
            >
              <div className="flex w-full items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 rounded-xl border-2 border-red-200/50 shadow-sm">
                    <AvatarImage
                      src={session?.user?.image ?? '/icons/user-profile.webp'}
                      alt={session?.user?.name}
                      className="rounded-xl"
                    />
                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-red-100 to-orange-100 font-semibold text-red-700">
                      {session?.user?.name?.substring(0, 2)?.toUpperCase() ??
                        'AD'}
                    </AvatarFallback>
                  </Avatar>
                  {/* Indicador online */}
                  <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-green-600 shadow-sm"></div>
                </div>

                <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-gray-900 transition-colors group-hover:text-red-700">
                    {session?.user?.name ?? 'Administrador'}
                  </span>
                  <span className="truncate text-xs text-gray-600 transition-colors group-hover:text-red-600">
                    {session?.user?.email ?? 'admin@sosbomhumor.org'}
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto size-4 text-gray-500 transition-colors group-hover:text-red-600" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn(
              'w-[--radix-dropdown-menu-trigger-width] min-w-60 rounded-xl',
              'bg-gradient-to-br from-white via-red-50/30 to-orange-50/30',
              'border border-red-100/50 shadow-xl'
            )}
            side={isMobile ? 'bottom' : 'top'}
            align="center"
            sideOffset={10}
          >
            <DropdownMenuGroup className="p-2">
              <DropdownMenuItem
                className={cn(
                  'rounded-lg transition-all duration-200',
                  'hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50',
                  'focus:bg-gradient-to-r focus:from-red-50 focus:to-orange-50',
                  'group cursor-pointer'
                )}
              >
                <User className="h-4 w-4 text-gray-600 transition-colors group-hover:text-red-600" />
                <span className="text-gray-700 transition-colors group-hover:text-red-700">
                  Perfil
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  'rounded-lg transition-all duration-200',
                  'hover:bg-gradient-to-r hover:from-red-100 hover:to-orange-100',
                  'focus:bg-gradient-to-r focus:from-red-100 focus:to-orange-100',
                  'group cursor-pointer text-red-600'
                )}
              >
                <LogOut className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="font-medium">Sair</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
