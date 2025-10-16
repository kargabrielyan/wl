import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('🔍 Проверяем подключение к базе данных...')
    
    // Простая проверка подключения
    await prisma.$connect()
    console.log('✅ Подключение к базе данных успешно')
    
    // Проверяем количество записей в каждой таблице
    const stats = {
      categories: await prisma.category.count(),
      products: await prisma.product.count(),
      users: await prisma.user.count(),
      orders: await prisma.order.count(),
      orderItems: await prisma.orderItem.count(),
      wishlist: await prisma.wishlist.count(),
      deliveryTypes: await prisma.deliveryType.count(),
      settings: await prisma.settings.count()
    }

    console.log('\n📊 Текущая статистика базы данных:')
    console.log(`Категории: ${stats.categories}`)
    console.log(`Продукты: ${stats.products}`)
    console.log(`Пользователи: ${stats.users}`)
    console.log(`Заказы: ${stats.orders}`)
    console.log(`Позиции заказов: ${stats.orderItems}`)
    console.log(`Избранное: ${stats.wishlist}`)
    console.log(`Типы доставки: ${stats.deliveryTypes}`)
    console.log(`Настройки: ${stats.settings}`)

    if (stats.categories === 0) {
      console.log('\n⚠️ База данных пуста. Нужно заполнить данными.')
    } else {
      console.log('\n✅ База данных содержит данные.')
    }

  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()

