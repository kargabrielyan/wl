import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setStockTo10() {
  try {
    console.log('🔄 Установка количества товаров в наличии на 10 штук...')

    // Получаем все товары
    const products = await prisma.product.findMany()
    console.log(`📦 Найдено ${products.length} товаров`)

    // Обновляем stock для всех товаров на 10
    const result = await prisma.product.updateMany({
      data: {
        stock: 10
      }
    })

    console.log(`✅ Обновлено ${result.count} товаров`)

    // Показываем статистику
    const stats = await prisma.product.groupBy({
      by: ['stock'],
      _count: {
        stock: true
      },
      orderBy: {
        stock: 'asc'
      }
    })

    console.log('\n📊 Статистика по количеству в наличии:')
    stats.forEach(stat => {
      console.log(`  ${stat.stock} штук: ${stat._count.stock} товаров`)
    })

    // Показываем несколько примеров обновленных товаров
    const sampleProducts = await prisma.product.findMany({
      take: 5,
      select: {
        name: true,
        stock: true,
        price: true
      }
    })

    console.log('\n📋 Примеры обновленных товаров:')
    sampleProducts.forEach(product => {
      console.log(`  ${product.name}: ${product.stock} штук, ${product.price} ֏`)
    })

  } catch (error) {
    console.error('❌ Ошибка при обновлении количества товаров:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setStockTo10()
