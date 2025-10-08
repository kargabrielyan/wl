import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/search/instant - instant search с ограниченным количеством результатов
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '8')

    // Валидация
    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] })
    }

    // Базовый поиск товаров
    const products = await prisma.product.findMany({
      where: {
        isAvailable: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        ingredients: true,
        category: {
          select: {
            name: true
          }
        }
      },
      take: limit * 2 // Берем больше для фильтрации
    })

    // Фильтрация на уровне приложения
    const filteredProducts = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(query.toLowerCase())
      const descMatch = product.description?.toLowerCase().includes(query.toLowerCase())
      const ingredientsMatch = product.ingredients?.toLowerCase().includes(query.toLowerCase()) || false
      
      return nameMatch || descMatch || ingredientsMatch
    }).sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase())
      const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase())
      const aIngredientsMatch = a.ingredients?.toLowerCase().includes(query.toLowerCase()) || false
      const bIngredientsMatch = b.ingredients?.toLowerCase().includes(query.toLowerCase()) || false
      
      // Приоритет: название > ингредиенты > описание
      if (aNameMatch && !bNameMatch) return -1
      if (!aNameMatch && bNameMatch) return 1
      if (aIngredientsMatch && !bIngredientsMatch) return -1
      if (!aIngredientsMatch && bIngredientsMatch) return 1
      return 0
    }).slice(0, limit) // Ограничиваем результат

    // Форматируем результаты для instant search
    const results = filteredProducts.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      ingredients: product.ingredients,
      category: product.category?.name || 'Без категории',
      type: 'product' as const
    }))

    // Кэшируем результаты на 5 минут
    const response = NextResponse.json({ results })
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    
    return response
  } catch (error) {
    console.error('Error in instant search:', error)
    console.error('Query:', query)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Search failed', results: [], details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
