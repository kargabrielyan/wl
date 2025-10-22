import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addTestData() {
  try {
    console.log('🌱 Добавляем тестовые данные...')

    // Создаем категории
    const category1 = await prisma.category.upsert({
      where: { name: 'Խաղալիքներ' },
      update: {},
      create: {
        name: 'Խաղալիքներ',
        description: 'Մանկական խաղալիքներ',
        isActive: true,
        showInMainPage: true,
        sortOrder: 1
      }
    })

    const category2 = await prisma.category.upsert({
      where: { name: 'Հագուստ' },
      update: {},
      create: {
        name: 'Հագուստ',
        description: 'Մանկական հագուստ',
        isActive: true,
        showInMainPage: true,
        sortOrder: 2
      }
    })

    console.log('✅ Категории созданы')

    // Создаем продукты
    const product1 = await prisma.product.create({
      data: {
        name: 'Խաղալիք մեքենա',
        description: 'Կարմիր խաղալիք մեքենա երեխաների համար',
        price: 5000,
        image: '/images/products/car.jpg',
        status: 'NEW',
        categoryId: category1.id,
        ingredients: 'Պլաստիկ, մետաղ',
        isAvailable: true
      }
    })

    const product2 = await prisma.product.create({
      data: {
        name: 'Երեխաների շապիկ',
        description: 'Կապույտ շապիկ երեխաների համար',
        price: 3000,
        image: '/images/products/shirt.jpg',
        status: 'CLASSIC',
        categoryId: category2.id,
        ingredients: '100% բամբակ',
        isAvailable: true
      }
    })

    console.log('✅ Продукты созданы')

    // Создаем типы доставки
    const deliveryType1 = await prisma.deliveryType.upsert({
      where: { name: 'Արագ առաքում' },
      update: {},
      create: {
        name: 'Արագ առաքում',
        description: '30 րոպեում',
        deliveryTime: '30 րոպե',
        price: 0,
        isActive: true
      }
    })

    const deliveryType2 = await prisma.deliveryType.upsert({
      where: { name: 'Ստանդարտ առաքում' },
      update: {},
      create: {
        name: 'Ստանդարտ առաքում',
        description: '1-2 ժամում',
        deliveryTime: '1-2 ժամ',
        price: 500,
        isActive: true
      }
    })

    console.log('✅ Типы доставки созданы')

    // Создаем тестового пользователя
    const testUser = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        name: 'Փորձարկող օգտատեր',
        phone: '+374 99-123-456',
        address: 'Երևան, Արաբկիր',
        password: 'test123',
        role: 'USER'
      }
    })

    console.log('✅ Пользователь создан')

    // Создаем тестовый заказ
    const testOrder = await prisma.order.create({
      data: {
        user: {
          connect: { id: testUser.id }
        },
        total: 8000,
        status: 'PENDING',
        name: testUser.name,
        phone: testUser.phone,
        address: testUser.address,
        paymentMethod: 'CASH',
        items: {
          create: [
            {
              productId: product1.id,
              quantity: 1,
              price: product1.price
            },
            {
              productId: product2.id,
              quantity: 1,
              price: product2.price
            }
          ]
        }
      }
    })

    console.log('✅ Заказ создан')

    console.log('🎉 Тестовые данные успешно добавлены!')
    console.log(`📦 Продуктов: 2`)
    console.log(`📂 Категорий: 2`)
    console.log(`🚚 Типов доставки: 2`)
    console.log(`👤 Пользователей: 1`)
    console.log(`🛒 Заказов: 1`)

  } catch (error) {
    console.error('❌ Ошибка при добавлении данных:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addTestData()
