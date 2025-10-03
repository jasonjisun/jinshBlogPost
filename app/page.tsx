import { prisma } from './utils/db'


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
  }))
}

export default async function Home() {
  const data = await getData()

  return (
    <div className="py-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Latest posts</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div key={item.id} className="border rounded p-4">
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p className="text-gray-700 line-clamp-3">{item.content}</p>

            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover rounded my-2"
              />
            )}

            <div className="flex items-center gap-2 mt-2">
              {item.author?.image && (
                <img
                  src={item.author.image}
                  alt={item.author.name ?? 'Author'}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm text-gray-600">
                {item.author?.name ?? 'Unknown Author'}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
