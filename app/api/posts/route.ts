import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const runtime = 'nodejs' // Change this to nodejs

export async function POST(request: Request) {
  const body = await request.json()
  const post = await prisma.post.create({
    data: {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      imageUrl: body.imageUrl,
      date: new Date().toISOString().split('T')[0],
    },
  })
  return NextResponse.json(post)
}

export async function GET() {
  const posts = await prisma.post.findMany()
  return NextResponse.json(posts)
}