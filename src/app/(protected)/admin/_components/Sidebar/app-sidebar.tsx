'use client'

import { BookOpen, Camera, DollarSign, Home, Settings } from 'lucide-react'
import type * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import { NavMain } from './nav-main'
import { NavUser } from './nav-user'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
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
          url: '/admin/blog/gerenciar',
        },
        {
          title: 'Criar Post',
          url: '/admin/blog/criar',
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
          url: '/admin/galeria/gerenciar',
        },
        {
          title: 'Adicionar Mídia',
          url: '/admin/galeria/adicionar',
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
          url: '/admin/financeiro/doacoes',
        },
      ],
    },
    {
      title: 'Configurações',
      url: '/admin/configuracoes',
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
        <SidebarGroupLabel className="flex flex-col items-center justify-center p-4 py-8 text-center">
          <h1 className="text-lg font-bold text-red-500">SOS Bom Humor</h1>
          <p className="text-sidebar-foreground/70 text-sm">
            Doutores Palhaços
          </p>
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
