import { SidebarProvider } from '@/components/ui/sidebar'

import { AdminSidebar } from './_components/Sidebar/app-sidebar'

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
