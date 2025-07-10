import Image from 'next/image'

const HeaderPublic = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </div>
    </header>
  )
}

export default HeaderPublic
