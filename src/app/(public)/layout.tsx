import { ReactNode } from 'react'

import Footer from '@/components/shared/footer'
import HeaderPublic from '@/components/shared/header'

interface PublicLayoutProps {
  children: ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <HeaderPublic />
      {children}
      <Footer />
    </>
  )
}

export default PublicLayout
