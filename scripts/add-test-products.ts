import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧸 Добавляем тестовые товары для детского магазина...')

  // Сначала создаем категории для детского магазина, если их нет
  const categories = ['Игрушки', 'Одежда', 'Книги', 'Спорт', 'Творчество']
  const categoryMap = new Map()
  
  for (const categoryName of categories) {
    let category = await prisma.category.findUnique({
      where: { name: categoryName }
    })
    
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          description: `Категория ${categoryName} для детей`,
          isActive: true
        }
      })
      console.log(`✅ Создана категория: ${category.name}`)
    } else {
      console.log(`ℹ️ Категория уже существует: ${category.name}`)
    }
    
    categoryMap.set(categoryName, category.id)
  }

  // Тестовые товары для детского магазина
  const testProducts = [
    {
      name: 'Конструктор LEGO Classic',
      description: 'Яркий конструктор для развития творческих способностей и мелкой моторики. 500 деталей различных цветов и форм.',
      price: 2500,
      image: '/images/lego-constructor.jpg',
      category: 'Игрушки',
      ingredients: ['Пластик', 'Безопасные материалы'],
      isAvailable: true,
      status: 'HIT'
    },
    {
      name: 'Мягкая игрушка Мишка Тедди',
      description: 'Очаровательный плюшевый мишка из мягкого материала. Идеальный друг для сна и игр. Высота 30 см.',
      price: 1200,
      image: '/images/teddy-bear.jpg',
      category: 'Игрушки',
      ingredients: ['Плюш', 'Наполнитель', 'Безопасные материалы'],
      isAvailable: true,
      status: 'NEW'
    },
    {
      name: 'Детская футболка с принтом',
      description: 'Мягкая хлопковая футболка с ярким принтом. Размеры от 2 до 12 лет. Гипоаллергенная ткань.',
      price: 800,
      image: '/images/kids-tshirt.jpg',
      category: 'Одежда',
      ingredients: ['100% хлопок', 'Безопасные красители'],
      isAvailable: true,
      status: 'REGULAR'
    }
  ]

  // Добавляем товары
  for (const productData of testProducts) {
    const categoryId = categoryMap.get(productData.category)
    if (!categoryId) {
      console.log(`⚠️ Категория не найдена для товара: ${productData.name}`)
      continue
    }

    const product = await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        categoryId: categoryId,
        isAvailable: productData.isAvailable,
        status: productData.status
      }
    })
    console.log(`✅ Создан товар: ${product.name} (${productData.category})`)
  }

  // Показываем статистику
  const totalProducts = await prisma.product.count()
  const totalCategories = await prisma.category.count()
  
  console.log('🎉 Тестовые товары успешно добавлены!')
  console.log(`📊 Статистика:`)
  console.log(`   - Всего товаров: ${totalProducts}`)
  console.log(`   - Всего категорий: ${totalCategories}`)
  console.log(`   - Добавлено товаров: ${testProducts.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при добавлении товаров:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
