import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDiscountCategories() {
  try {
    console.log('🔍 Проверяем категории товаров со скидками...')

    // Получаем товары со скидками
    const productsWithDiscounts = await prisma.product.findMany({
      where: {
        salePrice: {
          not: null
        }
      },
      select: {
        name: true,
        price: true,
        salePrice: true,
        category: {
          select: {
            name: true
          }
        }
      }
    })

    console.log(`📦 Найдено ${productsWithDiscounts.length} товаров со скидками\n`)

    // Группируем по категориям
    const categoriesMap = new Map()
    
    productsWithDiscounts.forEach(product => {
      const categoryName = product.category?.name || 'Без категории'
      
      if (!categoriesMap.has(categoryName)) {
        categoriesMap.set(categoryName, [])
      }
      
      categoriesMap.get(categoryName).push(product)
    })

    console.log('📊 Товары со скидками по категориям:')
    categoriesMap.forEach((products, category) => {
      console.log(`\n🏷️ ${category}:`)
      products.forEach(product => {
        const discountPercent = Math.round(((product.price - product.salePrice!) / product.price) * 100)
        console.log(`  - ${product.name}: ${product.price} ֏ → ${product.salePrice} ֏ (скидка ${discountPercent}%)`)
      })
    })

    // Проверяем все категории в базе
    const allCategories = await prisma.category.findMany({
      select: {
        name: true,
        _count: {
          select: {
            products: true
          }
        }
      }
    })

    console.log('\n📂 Все категории в базе:')
    allCategories.forEach(category => {
      console.log(`  - ${category.name}: ${category._count.products} товаров`)
    })
    
  } catch (error) {
    console.error('❌ Ошибка при проверке категорий:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDiscountCategories()
