'use client'

import FooterPublic from './(public)/_components/shared/footer'
import HeaderPublic from './(public)/_components/shared/header'

export default function Home() {
  return (
    <div className="max-w-8xl xl:w-8xl mx-auto justify-center p-4 md:w-7xl lg:w-7xl">
      <HeaderPublic />
      <FooterPublic />
    </div>
  )
}
