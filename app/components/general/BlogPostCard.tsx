import Image from 'next/image'
import Link from 'next/link'

interface IappProps {
  data: {
    id: string
    title: string
    content: string
    imageUrl: string
    authorId: string
    authorName: string | null
    authorImage: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export function BlogPostCard({ data }: IappProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/post/${data.id}`} className="block h-full w-full">
        <div className="relative h-48 w-full">
          <Image
            src={data.imageUrl}
            alt="Image for blog"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className='p-4'>
          <h3 className='mb-2 text-lg font-semibold text-gray-900'>
            {data.title}
          </h3>
          <p className='mb-4 text-sml text-gray-600 line-clamp-2'>{data.content}</p>
          <div className='flex items-center justify-between'>
              
          </div>
        </div>
      </Link>
    </div>
  )
}
