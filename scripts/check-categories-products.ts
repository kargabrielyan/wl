import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkCategoriesAndProducts() {
  try {
    console.log('🔍 Проверяем категории и товары...')

    // Получаем все категории
    const categories = await prisma.category.findMany({
      include: {
        products: {
          select: {
            name: true,
            price: true,
            salePrice: true
          }
        }
      }
    })

    console.log('📂 Категории и товары:')
    categories.forEach(category => {
      console.log(`\n🏷️ ${category.name}:`)
      if (category.products.length === 0) {
        console.log('  (нет товаров)')
      } else {
        category.products.forEach(product => {
          const discount = product.salePrice ? ` (скидка: ${product.salePrice} ֏)` : ''
          console.log(`  - ${product.name}: ${product.price} ֏${discount}`)
        })
      }
    })

    // Проверяем товары со скидками
    console.log('\n🛍️ Товары со скидками:')
    const productsWithDiscounts = await prisma.product.findMany({
      where: {
        salePrice: {
          not: null
        }
      },
      include: {
        category: true
      }
    })

    productsWithDiscounts.forEach(product => {
      const discountPercent = Math.round(((product.price - product.salePrice!) / product.price) * 100)
      console.log(`- ${product.name} (${product.category?.name || 'Без категории'}): ${product.price} ֏ → ${product.salePrice} ֏ (скидка ${discountPercent}%)`)
    })
    
  } catch (error) {
    console.error('❌ Ошибка при проверке категорий:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkCategoriesAndProducts()
