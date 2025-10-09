import Link from 'next/link'
import { buttonVariants } from '../components/ui/button'
import { prisma } from '../utils/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { BlogPostCard } from '../components/general/BlogPostCard'

async function getData(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true, // 👈 include related author
    },
  })
  return data
}

export default async function DashboardRoute() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const data = await getData(user.id)

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>

        <Link className={buttonVariants()} href="/dashboard/create">
          Create Post
        </Link>
      </div>

      <div className="flex justify-center w-full">
        <div className="w-full max-w-xl space-y-6">
          {data.map((item) => (
            <BlogPostCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
