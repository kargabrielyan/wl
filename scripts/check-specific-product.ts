import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkSpecificProduct() {
  try {
    console.log('🔍 Проверяем товар "Книга сказок"...')

    // Ищем товар "Книга сказок"
    const product = await prisma.product.findFirst({
      where: {
        name: {
          contains: 'Книга сказок'
        }
      },
      include: {
        category: true
      }
    })

    if (product) {
      console.log('📦 Найден товар:')
      console.log(`  Название: ${product.name}`)
      console.log(`  Обычная цена: ${product.price} ֏`)
      console.log(`  Цена со скидкой: ${product.salePrice || 'Нет скидки'} ֏`)
      console.log(`  Категория: ${product.category?.name || 'Без категории'}`)
      
      if (product.salePrice) {
        const discountPercent = Math.round(((product.price - product.salePrice) / product.price) * 100)
        console.log(`  Скидка: ${discountPercent}%`)
      }
    } else {
      console.log('❌ Товар "Книга сказок" не найден')
    }

    // Также проверим все товары с ценой 900 ֏
    console.log('\n🔍 Все товары с ценой 900 ֏:')
    const products900 = await prisma.product.findMany({
      where: {
        price: 900
      },
      include: {
        category: true
      }
    })

    products900.forEach(product => {
      console.log(`  - ${product.name} (${product.category?.name || 'Без категории'})`)
      console.log(`    Обычная цена: ${product.price} ֏`)
      console.log(`    Цена со скидкой: ${product.salePrice || 'Нет скидки'} ֏`)
    })
    
  } catch (error) {
    console.error('❌ Ошибка при проверке товара:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkSpecificProduct()
