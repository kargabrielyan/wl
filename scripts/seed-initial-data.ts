import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Создаем начальные данные...')

  // Создаем категории
  const categories = [
    {
      name: 'Игрушки',
      description: 'Развивающие игрушки для детей всех возрастов',
      image: '/images/categories/toys.jpg',
      sortOrder: 1,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Одежда',
      description: 'Детская одежда и обувь',
      image: '/images/categories/clothing.jpg',
      sortOrder: 2,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Книги',
      description: 'Детские книги и учебники',
      image: '/images/categories/books.jpg',
      sortOrder: 3,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Спорт',
      description: 'Спортивные товары и инвентарь',
      image: '/images/categories/sports.jpg',
      sortOrder: 4,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Творчество',
      description: 'Наборы для творчества и рукоделия',
      image: '/images/categories/creativity.jpg',
      sortOrder: 5,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Мебель',
      description: 'Детская мебель и аксессуары',
      image: '/images/categories/furniture.jpg',
      sortOrder: 6,
      showInMainPage: false,
      isActive: true
    },
    {
      name: 'Коляски',
      description: 'Коляски и аксессуары',
      image: '/images/categories/cradles.jpg',
      sortOrder: 7,
      showInMainPage: false,
      isActive: true
    },
    {
      name: 'Конструкторы',
      description: 'Конструкторы и наборы для сборки',
      image: '/images/categories/constructors.jpg',
      sortOrder: 8,
      showInMainPage: false,
      isActive: true
    },
    {
      name: 'Музыкальные игрушки',
      description: 'Музыкальные инструменты и игрушки',
      image: '/images/categories/musical-toys.jpg',
      sortOrder: 9,
      showInMainPage: false,
      isActive: true
    },
    {
      name: 'Транспорт',
      description: 'Игрушечные машинки и транспорт',
      image: '/images/categories/vehicles.jpg',
      sortOrder: 10,
      showInMainPage: false,
      isActive: true
    }
  ]

  console.log('📂 Создаем категории...')
  for (const categoryData of categories) {
    await prisma.category.upsert({
      where: { name: categoryData.name },
      update: categoryData,
      create: categoryData
    })
    console.log(`✅ Категория "${categoryData.name}" создана`)
  }

  // Создаем настройки
  const settings = [
    {
      key: 'siteName',
      value: 'Детский мир'
    },
    {
      key: 'siteDescription',
      value: 'Лучшие товары для детей в Армении'
    },
    {
      key: 'contactPhone',
      value: '+374 99 123 456'
    },
    {
      key: 'contactEmail',
      value: 'info@detskiy-mir.am'
    },
    {
      key: 'contactAddress',
      value: 'Ереван, ул. Абовяна 1'
    },
    {
      key: 'instagramUrl',
      value: 'https://www.instagram.com/welcome_baby_armenia/'
    },
    {
      key: 'deliveryInfo',
      value: 'Бесплатная доставка по Еревану от 5000 ֏'
    },
    {
      key: 'returnPolicy',
      value: 'Возврат товара в течение 14 дней'
    }
  ]

  console.log('⚙️ Создаем настройки...')
  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    })
    console.log(`✅ Настройка "${setting.key}" создана`)
  }

  // Создаем типы доставки
  const deliveryTypes = [
    {
      name: 'Стандартная доставка',
      deliveryTime: '1-2 дня',
      description: 'Доставка по Еревану в течение 1-2 рабочих дней',
      price: 0,
      isActive: true
    },
    {
      name: 'Экспресс доставка',
      deliveryTime: 'В день заказа',
      description: 'Доставка в день заказа (при заказе до 14:00)',
      price: 2000,
      isActive: true
    },
    {
      name: 'Самовывоз',
      deliveryTime: 'В день заказа',
      description: 'Самовывоз из нашего магазина',
      price: 0,
      isActive: true
    }
  ]

  console.log('🚚 Создаем типы доставки...')
  for (const deliveryType of deliveryTypes) {
    await prisma.deliveryType.upsert({
      where: { name: deliveryType.name },
      update: deliveryType,
      create: deliveryType
    })
    console.log(`✅ Тип доставки "${deliveryType.name}" создан`)
  }

  console.log('🎉 Начальные данные успешно созданы!')
  
  // Показываем статистику
  const categoriesCount = await prisma.category.count()
  const settingsCount = await prisma.settings.count()
  const deliveryTypesCount = await prisma.deliveryType.count()
  
  console.log(`\n📊 Статистика:`)
  console.log(`   - Категорий: ${categoriesCount}`)
  console.log(`   - Настроек: ${settingsCount}`)
  console.log(`   - Типов доставки: ${deliveryTypesCount}`)
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при создании начальных данных:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
