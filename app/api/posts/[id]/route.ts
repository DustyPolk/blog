import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const runtime = 'nodejs'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const post = await prisma.post.findUnique({
    where: { id },
  })
  
  if (!post) {
    return new NextResponse('Post not found', { status: 404 })
  }
  
  return NextResponse.json(post)
}