import { ReactNode } from 'react'

interface PublicLayoutProps {
  children: ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return <div>{children}</div>
}

export default PublicLayout
