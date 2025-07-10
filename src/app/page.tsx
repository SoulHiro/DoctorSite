'use client'

import FooterPublic from './(public)/_components/shared/footer'
import HeaderPublic from './(public)/_components/shared/header'

export default function Home() {
  return (
    <div className="xl:w-8xl max-w-8xl mx-auto justify-center md:w-7xl lg:w-7xl">
      <HeaderPublic />
      <FooterPublic />
    </div>
  )
}
