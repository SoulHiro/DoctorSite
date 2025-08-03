import type { Metadata } from 'next'

import { SidebarProvider } from '@/components/ui/sidebar'

import { AdminSidebar } from './_components/Sidebar/app-sidebar'

export const metadata: Metadata = {
  title: 'Área Administrativa | SOS Bom Humor',
  description:
    'Área restrita para administração do conteúdo da SOS Bom Humor Doutores Palhaços.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex w-full">
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  )
}

export default ProtectedLayout
