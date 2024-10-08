import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import posts from '@/data/posts.json'

export const revalidate = 3600 // revalidate every hour

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Welcome to Our Modern Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post, index) => (
          <Card key={post.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{objectFit: "cover"}}
                  className="transition-all duration-300 hover:scale-105"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-card-foreground">{post.title}</h2>
              <p className="text-xs md:text-sm text-muted-foreground mb-2">{post.date} | By {post.author}</p>
              <p className="text-sm md:text-base text-card-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/blog/${post.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}