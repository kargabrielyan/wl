import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function finalCheck() {
  try {
    console.log('🔍 Финальная проверка базы данных...')
    
    // Проверяем категории
    const categories = await prisma.category.count()
    console.log(`📁 Категории: ${categories}`)
    
    // Проверяем продукты
    const products = await prisma.product.count()
    console.log(`📦 Продукты: ${products}`)
    
    // Проверяем продукты по категориям
    const productsByCategory = await prisma.product.groupBy({
      by: ['categoryId'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    })
    
    console.log('\n📊 Продукты по категориям:')
    for (const group of productsByCategory) {
      const category = await prisma.category.findUnique({
        where: { id: group.categoryId }
      })
      console.log(`  ${category?.name || 'Неизвестная категория'}: ${group._count.id} продуктов`)
    }
    
    // Проверяем продукты по статусам
    const productsByStatus = await prisma.product.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })
    
    console.log('\n📋 Продукты по статусам:')
    productsByStatus.forEach(group => {
      console.log(`  ${group.status}: ${group._count.id} продуктов`)
    })
    
    // Проверяем продукты со скидками
    const productsWithSale = await prisma.product.count({
      where: {
        salePrice: {
          not: null
        }
      }
    })
    
    console.log(`\n💰 Продукты со скидками: ${productsWithSale}`)
    
    // Показываем примеры продуктов
    const sampleProducts = await prisma.product.findMany({
      take: 5,
      include: {
        category: true
      }
    })
    
    console.log('\n🔍 Примеры продуктов:')
    sampleProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`)
      console.log(`   Категория: ${product.category?.name}`)
      console.log(`   Цена: ${product.price} ֏${product.salePrice ? ` (со скидкой: ${product.salePrice} ֏)` : ''}`)
      console.log(`   Статус: ${product.status}`)
      console.log(`   В наличии: ${product.stock} шт.`)
      console.log('')
    })
    
    console.log('✅ База данных готова к работе!')
    
  } catch (error) {
    console.error('❌ Ошибка при проверке:', error)
  } finally {
    await prisma.$disconnect()
  }
}

finalCheck()
