import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTestOrders() {
  try {
    console.log('🛒 Создаем тестовые заказы...')
    
    // Получаем пользователя
    const user = await prisma.user.findFirst()
    if (!user) {
      console.log('❌ Пользователь не найден')
      return
    }
    
    // Получаем несколько товаров
    const products = await prisma.product.findMany({ take: 10 })
    if (products.length === 0) {
      console.log('❌ Товары не найдены')
      return
    }
    
    // Получаем тип доставки
    const deliveryType = await prisma.deliveryType.findFirst()
    
    // Создаем 5 тестовых заказов
    const orders = []
    
    for (let i = 0; i < 5; i++) {
      const order = await prisma.order.create({
        data: {
          name: `Тестовый заказ ${i + 1}`,
          phone: `+37477777777${i}`,
          address: `Тестовый адрес ${i + 1}, Ереван`,
          notes: `Тестовые заметки для заказа ${i + 1}`,
          paymentMethod: 'idram',
          status: i === 0 ? 'PENDING' : i === 1 ? 'CONFIRMED' : 'DELIVERED',
          total: Math.floor(Math.random() * 50000) + 10000,
          userId: user.id,
          deliveryTime: deliveryType?.id || null,
        }
      })
      
      // Добавляем товары в заказ
      const orderItems = []
      for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
        const product = products[Math.floor(Math.random() * products.length)]
        const quantity = Math.floor(Math.random() * 3) + 1
        
        const orderItem = await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
            quantity: quantity,
            price: product.price,
          }
        })
        
        orderItems.push(orderItem)
      }
      
      orders.push(order)
      console.log(`✅ Создан заказ ${i + 1}: ${order.name} (${orderItems.length} товаров)`)
    }
    
    console.log(`🎉 Создано ${orders.length} тестовых заказов!`)
    
  } catch (error) {
    console.error('❌ Ошибка при создании заказов:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestOrders()
