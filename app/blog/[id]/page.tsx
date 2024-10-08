import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'

const MarkdownRenderer = dynamic(() => import('@/components/MarkdownRenderer'), {
  loading: () => <p>Loading...</p>,
})

export async function generateStaticParams() {
  const posts = await prisma.post.findMany()
  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="relative w-full h-[300px] mb-8">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
      <p className="text-sm md:text-base text-muted-foreground mb-4">{post.date} | By {post.author}</p>
      <div className="prose dark:prose-invert mb-8 text-sm md:text-base">
        <Suspense fallback={<div>Loading content...</div>}>
          <MarkdownRenderer content={post.content} />
        </Suspense>
      </div>
      <Button asChild className="w-full md:w-auto">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}