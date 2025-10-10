import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addDiscountsToProducts() {
  try {
    console.log('🔄 Добавляем скидки к товарам...')

    // Получаем все товары
    const products = await prisma.product.findMany()
    console.log(`📦 Найдено ${products.length} товаров`)

    // Добавляем скидки к некоторым товарам
    const discountUpdates = [
      // Товары со скидкой 20%
      { name: 'Конструктор LEGO Classic', discountPercent: 20 },
      { name: 'Мягкая игрушка Мишка Тедди', discountPercent: 15 },
      { name: 'Детская футболка с принтом', discountPercent: 25 },
      { name: 'Набор для рисования', discountPercent: 30 },
    ]

    let updatedCount = 0

    for (const update of discountUpdates) {
      const product = products.find(p => p.name.includes(update.name) || update.name.includes(p.name))
      
      if (product) {
        // Рассчитываем цену со скидкой
        const discountAmount = (product.price * update.discountPercent) / 100
        const salePrice = Math.round(product.price - discountAmount)
        
        await prisma.product.update({
          where: { id: product.id },
          data: { 
            salePrice: salePrice
          }
        })
        
        console.log(`✅ Добавлена скидка к товару: ${product.name}`)
        console.log(`   Обычная цена: ${product.price} ֏`)
        console.log(`   Цена со скидкой: ${salePrice} ֏ (скидка ${update.discountPercent}%)`)
        console.log('')
        updatedCount++
      } else {
        console.log(`⚠️ Товар не найден: ${update.name}`)
      }
    }

    console.log(`🎉 Обновлено ${updatedCount} товаров со скидками`)
    
    // Показываем итоговую статистику
    const productsWithDiscounts = await prisma.product.findMany({
      where: {
        salePrice: {
          not: null
        }
      },
      select: {
        name: true,
        price: true,
        salePrice: true
      }
    })

    console.log('\n📊 Товары со скидками:')
    productsWithDiscounts.forEach(product => {
      const discountPercent = Math.round(((product.price - product.salePrice!) / product.price) * 100)
      console.log(`- ${product.name}: ${product.price} ֏ → ${product.salePrice} ֏ (скидка ${discountPercent}%)`)
    })
    
  } catch (error) {
    console.error('❌ Ошибка при добавлении скидок:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addDiscountsToProducts()
