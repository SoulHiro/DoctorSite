import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { db } from '@/db'

const BlogGerenciar = async () => {
  const posts = await db.query.blogPostsTable.findMany()

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
