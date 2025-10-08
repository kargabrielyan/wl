import { PrismaClient } from '@prisma/client'

// Устанавливаем переменную окружения для SQLite
process.env.DATABASE_URL = 'file:./prisma/dev.db'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🔍 Проверяем товары в базе данных...')
    
    // Подсчитываем товары
    const productCount = await prisma.product.count()
    console.log(`📦 Всего товаров: ${productCount}`)
    
    // Подсчитываем категории
    const categoryCount = await prisma.category.count()
    console.log(`📂 Всего категорий: ${categoryCount}`)
    
    // Показываем товары по категориям
    const productsByCategory = await prisma.product.groupBy({
      by: ['categoryId'],
      _count: {
        id: true
      }
    })
    
    console.log('\n📊 Товары по категориям:')
    for (const group of productsByCategory) {
      console.log(`  - ${group.category?.name || 'Без категории'}: ${group._count.id} товаров`)
    }
    
    // Показываем первые 5 товаров
    const sampleProducts = await prisma.product.findMany({
      take: 5,
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    })
    
    console.log('\n🛍️ Примеры товаров:')
    sampleProducts.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.name} - ${product.price} ֏ (${product.category?.name || 'Без категории'})`)
    })
    
  } catch (error) {
    console.error('❌ Ошибка при проверке товаров:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()