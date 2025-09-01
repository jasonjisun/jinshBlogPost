  import { prisma } from './utils/db'

  async function getData() {
    const data = await prisma.blogPost.findMany({
      select: {
        title: true,
        content: true,
        imageUrl: true,
        authorImage: true,
        authorName: true,
        id: true,
        createdAt: true,
      },
    })

    return data
  }

  export default async function Home() {
    const data = await getData()
    return (
      <div className="py-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Latest posts</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <p>{item.imageUrl}</p>
              <p>{item.authorImage}</p>
              <p>{item.authorName}</p>
              <p>{item.createdAt.toString()}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    )
  }
