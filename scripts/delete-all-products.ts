/**
 * Скрипт для удаления всех товаров из базы данных
 * ⚠️ ВНИМАНИЕ: Это удалит ВСЕ товары без возможности восстановления!
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteAllProducts() {
  try {
    console.log('🔄 Начинаю удаление всех товаров...')

    // Сначала проверяем сколько товаров есть
    const count = await prisma.product.count()
    console.log(`📦 Найдено товаров в базе: ${count}`)

    if (count === 0) {
      console.log('✅ База данных уже пуста!')
      return
    }

    // Удаляем все товары
    // Сначала удаляем связанные записи (если есть foreign key constraints)
    console.log('🗑️  Удаляю связанные записи...')
    
    // Удаляем элементы wishlist (связаны с Product)
    const wishlistCount = await prisma.wishlist.deleteMany({})
    console.log(`   ✓ Wishlist items удалены: ${wishlistCount.count}`)
    
    // Удаляем элементы заказов (связаны с Product)
    const orderItemsCount = await prisma.orderItem.deleteMany({})
    console.log(`   ✓ Order items удалены: ${orderItemsCount.count}`)

    // Удаляем все товары
    console.log('🗑️  Удаляю все товары...')
    const result = await prisma.product.deleteMany({})

    console.log(`✅ Удалено товаров: ${result.count}`)
    console.log('✨ Готово! Все товары удалены из базы данных')
  } catch (error) {
    console.error('❌ Ошибка при удалении товаров:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Предупреждение
console.log('⚠️  ВНИМАНИЕ: Этот скрипт удалит ВСЕ товары из базы данных!')
console.log('⚠️  Это действие необратимо!')
console.log('')

deleteAllProducts()
  .then(() => {
    console.log('✅ Скрипт выполнен успешно')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Ошибка выполнения скрипта:', error)
    process.exit(1)
  })

