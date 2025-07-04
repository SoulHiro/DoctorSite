'use client'

import { BookOpen, Camera, DollarSign, Home, Settings } from 'lucide-react'
import type * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import { NavMain } from './nav-main'
import { NavUser } from './nav-user'

// This is sample data.
const data = {
  user: {
    name: 'Admin',
    email: 'admin@sosbomhumor.org',
    avatar: '/placeholder.svg?height=32&width=32',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Blog',
      url: '#',
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: 'Gerenciar Post',
          url: '/blog/gerenciar',
        },
        {
          title: 'Criar Post',
          url: '/blog/criar',
        },
      ],
    },
    {
      title: 'Galeria',
      url: '#',
      icon: Camera,
      isActive: true,
      items: [
        {
          title: 'Gerenciar Galeria',
          url: '/galeria/gerenciar',
        },
        {
          title: 'Adicionar Mídia',
          url: '/galeria/adicionar',
        },
      ],
    },
    {
      title: 'Financeiro',
      url: '#',
      icon: DollarSign,
      isActive: true,
      items: [
        {
          title: 'Doações',
          url: '/financeiro/doacoes',
        },
      ],
    },
    {
      title: 'Configurações',
      url: '/configuracoes',
      icon: Settings,
    },
  ],
}

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-lg font-bold text-red-500">SOS Bom Humor</h1>
          <p className="text-sidebar-foreground/70 text-sm">
            Doutores Palhaços
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
