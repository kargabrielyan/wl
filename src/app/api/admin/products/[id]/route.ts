import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

// GET /api/admin/products/[id] - получить товар по ID для админки
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Проверяем аутентификацию
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Проверяем права администратора
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            isActive: true
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/products/[id] - обновить товар (только для админов)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Проверяем аутентификацию
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Проверяем права администратора
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Получаем данные из запроса
    const body = await request.json()
    const { name, description, price, salePrice, categoryId, image, ingredients, isAvailable, status } = body
    
    console.log('Update product data:', { id, name, description, price, salePrice, categoryId, image, ingredients, isAvailable, status })

    // Проверяем существование товара
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Валидация цены
    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      )
    }

    // Валидация скидочной цены
    if (salePrice !== undefined && salePrice !== null) {
      if (typeof salePrice !== 'number' || salePrice <= 0) {
        return NextResponse.json(
          { error: 'Sale price must be a positive number' },
          { status: 400 }
        )
      }
      const currentPrice = price !== undefined ? price : existingProduct.price
      if (salePrice >= currentPrice) {
        return NextResponse.json(
          { error: 'Sale price must be less than regular price' },
          { status: 400 }
        )
      }
    }

    // Валидация категории
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      })
      
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 400 }
        )
      }
    }

    // Валидация статуса (пустая строка означает REGULAR)
    if (status !== undefined) {
      const validStatuses = ['', 'REGULAR', 'HIT', 'NEW', 'CLASSIC', 'BANNER']
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status. Must be one of: ' + validStatuses.filter(s => s).join(', ') },
          { status: 400 }
        )
      }
    }

    // Обновляем товар
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price !== undefined && { price }),
        ...(salePrice !== undefined && { salePrice: salePrice === null || salePrice === '' ? null : salePrice }),
        ...(categoryId && { categoryId }),
        ...(image !== undefined && { image: image || 'no-image' }), // Специальное значение для отсутствия изображения
        ...(ingredients && { ingredients }),
        ...(isAvailable !== undefined && { isAvailable }),
        ...(status !== undefined && { status: status || 'REGULAR' }) // Если статус пустой, то REGULAR
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            isActive: true
          }
        }
      }
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to update product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}