import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import posts from '@/data/posts.json'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const MarkdownRenderer = dynamic(() => import('@/components/MarkdownRenderer'), {
  loading: () => <p>Loading...</p>,
})

export const revalidate = 3600 // revalidate every hour

export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = posts.find(p => p.id === parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="relative h-64 w-full mb-8">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{objectFit: "cover"}}
          className="rounded-lg"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
      <p className="text-muted-foreground mb-4">{post.date} | By {post.author}</p>
      <div className="prose dark:prose-invert mb-8">
        <Suspense fallback={<div>Loading content...</div>}>
          <MarkdownRenderer content={post.content} />
        </Suspense>
      </div>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}