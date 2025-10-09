import { prisma } from './utils/db'
import { BlogPostCard } from './components/general/BlogPostCard'

async function getData() {
  const data = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { id: true, name: true, image: true },
      },
    },
  })

  // Convert Date to string for serialization
  return data.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt?.toISOString?.() ?? "",
  }))
}

export default async function Home() {
  const data = await getData()

  return (
    <div className="py-8 flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-center">Latest posts</h1>
        <div className="space-y-6">
          {data.map((item) => (
            <BlogPostCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
