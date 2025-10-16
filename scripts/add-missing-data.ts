import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addMissingData() {
  try {
    console.log('🔧 Добавляем недостающие данные...')

    // Создаем настройки
    const settingsCount = await prisma.settings.count()
    if (settingsCount === 0) {
      await prisma.settings.createMany({
        data: [
          {
            key: 'site_name',
            value: 'Pideh Armenia'
          },
          {
            key: 'contact_phone',
            value: '+374 95-044-888'
          },
          {
            key: 'contact_email',
            value: 'info@pideh.am'
          },
          {
            key: 'delivery_free_minimum',
            value: '5000'
          },
          {
            key: 'working_hours',
            value: '10:00-22:00'
          }
        ]
      })
      console.log('⚙️ Создали настройки')
    }

    // Создаем тестовый заказ
    const ordersCount = await prisma.order.count()
    if (ordersCount === 0) {
      const user = await prisma.user.findFirst()
      const products = await prisma.product.findMany({ take: 2 })
      const deliveryType = await prisma.deliveryType.findFirst()

      if (user && products.length >= 2 && deliveryType) {
        const order = await prisma.order.create({
          data: {
            user: {
              connect: { id: user.id }
            },
            status: 'PENDING',
            total: (products[0].salePrice || products[0].price) + (products[1].salePrice || products[1].price),
            address: 'Երևան, Արաբկիր',
            phone: '+374 99-123-456',
            paymentMethod: 'CASH',
            name: 'Փորձարկող օգտատեր',
            items: {
              create: [
                {
                  productId: products[0].id,
                  quantity: 1,
                  price: products[0].salePrice || products[0].price
                },
                {
                  productId: products[1].id,
                  quantity: 1,
                  price: products[1].salePrice || products[1].price
                }
              ]
            }
          }
        })
        console.log('📋 Создали тестовый заказ')
      }
    }

    // Создаем тестовое избранное
    const wishlistCount = await prisma.wishlist.count()
    if (wishlistCount === 0) {
      const user = await prisma.user.findFirst()
      const products = await prisma.product.findMany({ take: 3 })

      if (user && products.length >= 3) {
        for (const product of products) {
          await prisma.wishlist.create({
            data: {
              userId: user.id,
              productId: product.id
            }
          })
        }
        console.log('❤️ Создали тестовое избранное')
      }
    }

    // Показываем финальную статистику
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

    console.log('\n📊 Финальная статистика:')
    console.log(`Категории: ${stats.categories}`)
    console.log(`Продукты: ${stats.products}`)
    console.log(`Пользователи: ${stats.users}`)
    console.log(`Заказы: ${stats.orders}`)
    console.log(`Позиции заказов: ${stats.orderItems}`)
    console.log(`Избранное: ${stats.wishlist}`)
    console.log(`Типы доставки: ${stats.deliveryTypes}`)
    console.log(`Настройки: ${stats.settings}`)

    console.log('\n✅ Все данные добавлены! Теперь в Prisma Studio должны быть данные.')

  } catch (error) {
    console.error('❌ Ошибка при добавлении данных:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addMissingData()
