'use client'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { deletePost } from '@/actions/posts/delete'
import { Button } from '@/components/ui/button'
import { blogPostsTable } from '@/db'

const Buttons = ({ post }: { post: typeof blogPostsTable.$inferSelect }) => {
  const router = useRouter()
  const handleDeletePost = async () => {
    const result = await deletePost(post.id)

    if (result.success) {
      toast.success('Post deletado com sucesso')
      router.refresh()
    }

    if (result.error) {
      toast.error(result.error)
    }
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Eye />
          Visualizar
        </Button>
        <Button variant="outline" size="sm">
          <Edit />
          Editar
        </Button>
      </div>
      <Button
        onClick={() => handleDeletePost()}
        variant="outline"
        size="sm"
        className="text-destructive hover:text-destructive"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  )
}

export default Buttons
