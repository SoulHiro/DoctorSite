'use client'

import { BookOpen, Camera, Home, LayoutDashboard } from 'lucide-react'
import Image from 'next/image'
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

// Data do sidebar redesenhada para os Doutores Palhaços
const data = {
  navMain: [
    {
      title: 'Início',
      url: '/',
      icon: Home,
      description: 'Voltar ao site principal',
    },
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: LayoutDashboard,
      description: 'Visão geral da administração',
    },
    {
      title: 'Blog',
      url: '/admin/blog',
      icon: BookOpen,
      description: 'Gerenciar posts e artigos',
      items: [
        {
          title: 'Gerenciar Posts',
          url: '/admin/blog/gerenciar',
          icon: '📝',
        },
        {
          title: 'Criar Post',
          url: '/admin/blog/criar',
          icon: '✍️',
        },
      ],
    },
    {
      title: 'Galeria',
      url: '/admin/galeria',
      icon: Camera,
      description: 'Gerenciar fotos e vídeos',
      items: [
        {
          title: 'Gerenciar Galeria',
          url: '/admin/galeria',
          icon: '🖼️',
        },
        {
          title: 'Adicionar Mídia',
          url: '/admin/galeria/upload',
          icon: '📤',
        },
      ],
    },
  ],
}

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarGroupLabel className="flex flex-row items-center justify-start gap-4 py-8 text-center">
          <Image
            src="/images/icon-site.png"
            alt="SOS Bom Humor"
            width={50}
            height={50}
          />
          <div className="space-y-1">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-pink-600 bg-clip-text text-lg font-bold text-transparent">
              SOS Bom Humor
            </h1>
            <p className="text-xs font-medium tracking-wide text-gray-600">
              Doutores Palhaços
            </p>
          </div>
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
