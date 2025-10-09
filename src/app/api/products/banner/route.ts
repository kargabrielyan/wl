import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products/banner - получить товар для баннера
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isAvailable: true,
        status: 'BANNER'
      },
      orderBy: { createdAt: 'desc' },
      take: 1,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
            isActive: true
          }
        },
        image: true,
        isAvailable: true,
        status: true,
        createdAt: true
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching banner product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch banner product' },
      { status: 500 }
    )
  }
}