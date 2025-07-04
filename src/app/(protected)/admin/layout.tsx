import { SidebarProvider } from '@/components/ui/sidebar'

import { AdminSidebar } from './_components/Sidebar/app-sidebar'

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  )
}

export default ProtectedLayout
