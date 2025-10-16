import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    console.log('🌱 Начинаем заполнение базы данных...')

    // Очищаем существующие данные
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.wishlist.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    await prisma.deliveryType.deleteMany()
    await prisma.settings.deleteMany()
    await prisma.user.deleteMany()

    console.log('🧹 Очистили существующие данные')

    // Создаем категории
    const categories = await prisma.category.createMany({
      data: [
        { name: 'Խաղալիքներ', slug: 'toys', description: 'Մանկական խաղալիքներ' },
        { name: 'Հագուստ', slug: 'clothing', description: 'Մանկական հագուստ' },
        { name: 'Գրքեր', slug: 'books', description: 'Երեխաների գրքեր' },
        { name: 'Սպորտ', slug: 'sports', description: 'Սպորտային արտադրանք' },
        { name: 'Ստեղծագործություն', slug: 'creativity', description: 'Ստեղծագործական արտադրանք' }
      ]
    })

    console.log('📂 Создали категории')

    // Получаем созданные категории
    const createdCategories = await prisma.category.findMany()

    // Создаем типы доставки
    const deliveryTypes = await prisma.deliveryType.createMany({
      data: [
        { name: 'Արագ առաքում', description: '30 րոպեում', price: 0, isActive: true },
        { name: 'Ստանդարտ առաքում', description: '1-2 ժամում', price: 500, isActive: true },
        { name: 'Ինքնահանձնում', description: 'Մեր մասնաճյուղից', price: 0, isActive: true }
      ]
    })

    console.log('🚚 Создали типы доставки')

    // Создаем продукты
    const products = [
      {
        name: 'Լեգո տեխնիկական խաղալիք',
        description: 'Զարգացնող խաղալիք 8+ տարեկան երեխաների համար',
        price: 15000,
        salePrice: 12000,
        ingredients: 'Պլաստիկ, մետաղական մասեր',
        image: '/images/products/lego.jpg',
        stock: 25,
        status: 'HIT',
        categoryId: createdCategories.find(c => c.name === 'Խաղալիքներ')?.id
      },
      {
        name: 'Մանկական ձմեռային բաճկոն',
        description: 'Տաք և հարմար բաճկոն ցուրտ եղանակի համար',
        price: 8000,
        ingredients: '100% բուրդ, սինթետիկ լցոնում',
        image: '/images/products/jacket.jpg',
        stock: 15,
        status: 'NEW',
        categoryId: createdCategories.find(c => c.name === 'Հագուստ')?.id
      },
      {
        name: 'Երեխաների հեքիաթների գիրք',
        description: 'Կոլեկցիա հայկական հեքիաթներից',
        price: 3000,
        ingredients: 'Թուղթ, թանաք',
        image: '/images/products/book.jpg',
        stock: 50,
        status: 'CLASSIC',
        categoryId: createdCategories.find(c => c.name === 'Գրքեր')?.id
      },
      {
        name: 'Ֆուտբոլի գնդակ',
        description: 'Պրոֆեսիոնալ ֆուտբոլի գնդակ',
        price: 5000,
        ingredients: 'Կաշի, սինթետիկ նյութ',
        image: '/images/products/ball.jpg',
        stock: 30,
        status: 'BANNER',
        categoryId: createdCategories.find(c => c.name === 'Սպորտ')?.id
      },
      {
        name: 'Նկարչական հավաքածու',
        description: 'Լրիվ հավաքածու ստեղծագործական աշխատանքների համար',
        price: 4000,
        ingredients: 'Մատիտներ, գունավոր թուղթ, կավ',
        image: '/images/products/art.jpg',
        stock: 20,
        status: 'NEW',
        categoryId: createdCategories.find(c => c.name === 'Ստեղծագործություն')?.id
      }
    ]

    for (const product of products) {
      await prisma.product.create({
        data: product
      })
    }

    console.log('📦 Создали продукты')

    // Создаем настройки
    await prisma.settings.create({
      data: {
        key: 'site_name',
        value: 'Pideh Armenia',
        description: 'Название сайта'
      }
    })

    await prisma.settings.create({
      data: {
        key: 'contact_phone',
        value: '+374 95-044-888',
        description: 'Контактный телефон'
      }
    })

    await prisma.settings.create({
      data: {
        key: 'contact_email',
        value: 'info@pideh.am',
        description: 'Контактный email'
      }
    })

    console.log('⚙️ Создали настройки')

    // Создаем тестового пользователя
    const testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Փորձարկող օգտատեր',
        phone: '+374 99-123-456',
        address: 'Երևան, Արաբկիր'
      }
    })

    console.log('👤 Создали тестового пользователя')

    // Создаем тестовый заказ
    const productsForOrder = await prisma.product.findMany({ take: 2 })
    
    if (productsForOrder.length >= 2) {
      const order = await prisma.order.create({
        data: {
          userId: testUser.id,
          status: 'PENDING',
          total: productsForOrder[0].salePrice || productsForOrder[0].price + productsForOrder[1].salePrice || productsForOrder[1].price,
          deliveryTypeId: (await prisma.deliveryType.findFirst())?.id,
          items: {
            create: [
              {
                productId: productsForOrder[0].id,
                quantity: 1,
                price: productsForOrder[0].salePrice || productsForOrder[0].price
              },
              {
                productId: productsForOrder[1].id,
                quantity: 2,
                price: productsForOrder[1].salePrice || productsForOrder[1].price
              }
            ]
          }
        }
      })

      console.log('📋 Создали тестовый заказ')
    }

    // Создаем тестовое избранное
    if (productsForOrder.length >= 1) {
      await prisma.wishlist.create({
        data: {
          userId: testUser.id,
          productId: productsForOrder[0].id
        }
      })

      console.log('❤️ Создали тестовое избранное')
    }

    console.log('✅ База данных успешно заполнена!')
    
    // Показываем статистику
    const stats = {
      categories: await prisma.category.count(),
      products: await prisma.product.count(),
      users: await prisma.user.count(),
      orders: await prisma.order.count(),
      wishlist: await prisma.wishlist.count(),
      deliveryTypes: await prisma.deliveryType.count(),
      settings: await prisma.settings.count()
    }

    console.log('\n📊 Статистика:')
    console.log(`Категории: ${stats.categories}`)
    console.log(`Продукты: ${stats.products}`)
    console.log(`Пользователи: ${stats.users}`)
    console.log(`Заказы: ${stats.orders}`)
    console.log(`Избранное: ${stats.wishlist}`)
    console.log(`Типы доставки: ${stats.deliveryTypes}`)
    console.log(`Настройки: ${stats.settings}`)

  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDatabase()

