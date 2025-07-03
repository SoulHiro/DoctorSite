'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

export default function Home() {
  return (
    <div>
      <h1>Hello World!</h1>
      <Button onClick={() => authClient.signOut()}>Logout</Button>
    </div>
  )
}
