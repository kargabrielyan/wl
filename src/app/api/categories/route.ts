import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const showInMainPage = searchParams.get('showInMainPage')
    const limit = searchParams.get('limit')

    const where: any = {
      isActive: true
    }

    if (showInMainPage === 'true') {
      where.showInMainPage = true
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'asc' }
      ],
      take: limit ? parseInt(limit) : undefined,
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        sortOrder: true,
        showInMainPage: true,
        createdAt: true
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}