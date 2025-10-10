import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/delivery-types - получить все типы доставки
export async function GET() {
  try {
    const deliveryTypes = await prisma.deliveryType.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: deliveryTypes
    })
  } catch (error) {
    console.error('Error fetching delivery types:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch delivery types' },
      { status: 500 }
    )
  }
}

// POST /api/delivery-types - создать новый тип доставки
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, deliveryTime, description, price } = body

    // Валидация
    if (!name || !deliveryTime || !description || price === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { success: false, error: 'Price must be a positive number' },
        { status: 400 }
      )
    }

    const deliveryType = await prisma.deliveryType.create({
      data: {
        name,
        deliveryTime,
        description,
        price: parseFloat(price.toFixed(2))
      }
    })

    return NextResponse.json({
      success: true,
      data: deliveryType
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating delivery type:', error)
    
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: 'Delivery type with this name already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create delivery type' },
      { status: 500 }
    )
  }
}
