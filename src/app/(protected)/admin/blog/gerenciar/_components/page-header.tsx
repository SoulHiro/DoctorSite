'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'

export function PageHeader() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-3xl font-bold">Gerenciar Posts</h1>
        <p className="text-muted-foreground">
          Gerencie todos os posts do seu blog
        </p>
      </div>

      <Link href="/admin/blog/criar">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Post
        </Button>
      </Link>
    </div>
  )
}
