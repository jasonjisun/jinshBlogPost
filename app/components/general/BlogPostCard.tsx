import Image from 'next/image'
import Link from 'next/link'

interface IappProps {
  data: {
    id: string
    title: string
    content: string
    imageUrl: string
    createdAt: Date
    updatedAt: Date
    author: {
      id: string
      name: string | null
      image: string | null
    }
  }
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function BlogPostCard({ data }: IappProps) {
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/post/${data.id}`} className="block h-full w-full">
        <div className="relative h-56 w-full bg-gray-100">
          <Image
            src={data.imageUrl}
            alt="Image for blog"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 600px) 100vw, 600px"
            priority
          />
        </div>
        <div className="p-5">
          <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {data.title}
          </h3>
          <p className="mb-4 text-base text-gray-700 line-clamp-3">
            {data.content}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {data.author.image && (
                <Image
                  src={data.author.image}
                  alt={data.author.name || "Author"}
                  width={36}
                  height={36}
                  className="rounded-full border border-gray-300"
                />
              )}
              <span className="text-sm font-medium text-gray-800">
                {data.author.name || "Unknown Author"}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {formatDate(data.createdAt)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
