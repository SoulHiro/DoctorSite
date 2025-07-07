import { eq } from 'drizzle-orm'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { blogPostsTable, db } from '@/db'

const BlogGerenciar = async () => {
  const posts = await db.query.blogPostsTable.findMany({
    where: eq(blogPostsTable.status, 'publicado'),
  })

  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>{post.excerpt}</CardDescription>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default BlogGerenciar
