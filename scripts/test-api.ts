import { PrismaClient } from '@prisma/client'

// Устанавливаем переменную окружения для SQLite
process.env.DATABASE_URL = 'file:./prisma/dev.db'

const prisma = new PrismaClient()

async function testCategoriesAPI() {
  try {
    console.log('🔍 Тестируем API категорий...')
    
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
        products: {
          some: {
            isAvailable: true
          }
        }
      },
      include: {
        _count: {
          select: { 
            products: {
              where: {
                isAvailable: true
              }
            }
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    console.log('✅ Категории получены:', categories.length)
    console.log('📊 Данные:', JSON.stringify(categories, null, 2))
    
  } catch (error) {
    console.error('❌ Ошибка при получении категорий:', error)
  } finally {
    await prisma.$disconnect()
  }
}

async function testProductsAPI() {
  try {
    console.log('🔍 Тестируем API товаров...')
    
    const products = await prisma.product.findMany({
      where: {
        isAvailable: true
      },
      orderBy: { createdAt: 'desc' },
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

    console.log('✅ Товары получены:', products.length)
    console.log('📊 Первый товар:', JSON.stringify(products[0], null, 2))
    
  } catch (error) {
    console.error('❌ Ошибка при получении товаров:', error)
  } finally {
    await prisma.$disconnect()
  }
}

async function main() {
  await testCategoriesAPI()
  console.log('\n' + '='.repeat(50) + '\n')
  await testProductsAPI()
}

main()
