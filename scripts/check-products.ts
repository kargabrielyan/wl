import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkProducts() {
  try {
    console.log('🔍 Проверяем продукты в базе данных...')
    
    // Подсчитываем общее количество продуктов
    const totalProducts = await prisma.product.count()
    console.log(`📊 Общее количество продуктов: ${totalProducts}`)
    
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
    
    // Проверяем продукты с категориями
    const productsWithCategories = await prisma.product.count({
      where: {
        categoryId: {
          not: null
        }
      }
    })
    
    const productsWithoutCategories = await prisma.product.count({
      where: {
        categoryId: null
      }
    })
    
    console.log(`\n📂 Продукты с категориями: ${productsWithCategories}`)
    console.log(`📂 Продукты без категорий: ${productsWithoutCategories}`)
    
    // Показываем несколько примеров продуктов
    const sampleProducts = await prisma.product.findMany({
      take: 5,
      include: {
        category: true
      }
    })
    
    console.log('\n🔍 Примеры продуктов:')
    sampleProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`)
      console.log(`   Статус: ${product.status}`)
      console.log(`   Категория: ${product.category?.name || 'Нет категории'}`)
      console.log(`   Цена: ${product.price} ֏`)
      console.log('')
    })
    
    // Проверяем связи с категориями
    const categories = await prisma.category.findMany()
    console.log(`\n📁 Доступные категории: ${categories.length}`)
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (ID: ${cat.id})`)
    })
    
  } catch (error) {
    console.error('❌ Ошибка при проверке продуктов:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkProducts()