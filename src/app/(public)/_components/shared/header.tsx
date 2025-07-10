import Link from 'next/link'

import { HeaderNavigationMenu } from '../header/navigation-menu'

const HeaderPublic = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="mx-auto w-full">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-gray-300 bg-gray-100 p-8 shadow-sm md:flex-row">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-gray-900">
              SOS Bom Humor <br /> Doutores Palhacos
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <HeaderNavigationMenu />
          </div>
          <Link href="/doar">
            <button className="w-fit rounded-3xl bg-green-600 px-6 py-2 text-base font-semibold text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default HeaderPublic
