import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧸 Очищаем базу данных и добавляем данные детского магазина...')

  // Очищаем существующие данные
  console.log('🗑️ Очищаем существующие товары...')
  await prisma.product.deleteMany({})
  
  console.log('🗑️ Очищаем существующие категории...')
  await prisma.category.deleteMany({})

  // Создаем категории для детского магазина
  const categories = [
    { name: 'Игрушки', description: 'Детские игрушки для всех возрастов' },
    { name: 'Одежда', description: 'Детская одежда и обувь' },
    { name: 'Книги', description: 'Детские книги и развивающая литература' },
    { name: 'Спорт', description: 'Спортивные товары для детей' },
    { name: 'Творчество', description: 'Товары для творчества и рукоделия' }
  ]

  const categoryMap = new Map()
  
  for (const categoryData of categories) {
    const category = await prisma.category.create({
      data: {
        name: categoryData.name,
        description: categoryData.description,
        isActive: true
      }
    })
    console.log(`✅ Создана категория: ${category.name}`)
    categoryMap.set(categoryData.name, category.id)
  }

  // Товары детского магазина
  const products = [
    // Игрушки
    {
      name: 'Конструктор LEGO Classic',
      description: 'Большой набор для творчества и развития мелкой моторики. 1500 деталей различных цветов и форм.',
      price: 2500,
      image: '/images/lego-constructor.jpg',
      category: 'Игрушки',
      ingredients: ['Пластик', 'Безопасные материалы'],
      isAvailable: true,
      status: 'HIT'
    },
    {
      name: 'Мягкая игрушка Мишка Тедди',
      description: 'Мягкий и пушистый мишка, лучший друг для вашего малыша. Высота 30 см.',
      price: 1200,
      image: '/images/teddy-bear.jpg',
      category: 'Игрушки',
      ingredients: ['Плюш', 'Синтепон', 'Безопасные материалы'],
      isAvailable: true,
      status: 'HIT'
    },
    {
      name: 'Кукла Барби',
      description: 'Красивая кукла Барби с аксессуарами. Развивает воображение и творческие способности.',
      price: 1800,
      image: '/images/barbie-doll.jpg',
      category: 'Игрушки',
      ingredients: ['Пластик', 'Ткань', 'Безопасные материалы'],
      isAvailable: true,
      status: 'NEW'
    },
    {
      name: 'Набор машинок',
      description: 'Набор из 5 машинок разных цветов. Отлично подходит для ролевых игр.',
      price: 900,
      image: '/images/toy-cars.jpg',
      category: 'Игрушки',
      ingredients: ['Пластик', 'Металл', 'Безопасные материалы'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Пазл "Животные"',
      description: 'Пазл из 100 деталей с изображением животных. Развивает логическое мышление.',
      price: 600,
      image: '/images/animal-puzzle.jpg',
      category: 'Игрушки',
      ingredients: ['Картон', 'Безопасные краски'],
      isAvailable: true,
      status: 'REGULAR'
    },

    // Одежда
    {
      name: 'Детская футболка с принтом',
      description: 'Яркая футболка из 100% хлопка с веселым принтом. Размеры от 2 до 12 лет.',
      price: 800,
      image: '/images/kids-tshirt.jpg',
      category: 'Одежда',
      ingredients: ['100% хлопок', 'Безопасные красители'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Джинсы для детей',
      description: 'Удобные джинсы из мягкого денима. Размеры от 3 до 14 лет.',
      price: 1500,
      image: '/images/kids-jeans.jpg',
      category: 'Одежда',
      ingredients: ['Хлопок', 'Эластан', 'Безопасные красители'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Платье для девочки',
      description: 'Красивое платье с рюшами. Идеально для праздников и особых случаев.',
      price: 1200,
      image: '/images/girls-dress.jpg',
      category: 'Одежда',
      ingredients: ['Полиэстер', 'Хлопок', 'Безопасные материалы'],
      isAvailable: true,
      status: 'NEW'
    },
    {
      name: 'Кроссовки детские',
      description: 'Удобные кроссовки с липучками. Размеры от 25 до 35.',
      price: 2000,
      image: '/images/kids-sneakers.jpg',
      category: 'Одежда',
      ingredients: ['Текстиль', 'Резина', 'Безопасные материалы'],
      isAvailable: true,
      status: 'HIT'
    },

    // Книги
    {
      name: 'Книга сказок',
      description: 'Сборник любимых сказок с яркими иллюстрациями. Твердый переплет, 200 страниц.',
      price: 900,
      image: '/images/fairy-tales-book.jpg',
      category: 'Книги',
      ingredients: ['Бумага', 'Картон', 'Безопасные краски'],
      isAvailable: true,
      status: 'CLASSIC'
    },
    {
      name: 'Азбука для малышей',
      description: 'Интерактивная азбука с картинками и звуками. Помогает изучать буквы.',
      price: 1100,
      image: '/images/alphabet-book.jpg',
      category: 'Книги',
      ingredients: ['Картон', 'Пластик', 'Безопасные материалы'],
      isAvailable: true,
      status: 'HIT'
    },
    {
      name: 'Раскраска "Животные"',
      description: 'Большая раскраска с изображениями животных. Развивает творческие способности.',
      price: 400,
      image: '/images/coloring-book.jpg',
      category: 'Книги',
      ingredients: ['Бумага', 'Безопасные краски'],
      isAvailable: true,
      status: 'REGULAR'
    },

    // Спорт
    {
      name: 'Детский велосипед',
      description: 'Легкий и безопасный велосипед для детей от 3 до 6 лет. С дополнительными колесами.',
      price: 7000,
      image: '/images/kids-bike.jpg',
      category: 'Спорт',
      ingredients: ['Алюминий', 'Резина', 'Пластик'],
      isAvailable: true,
      status: 'HIT'
    },
    {
      name: 'Мяч футбольный',
      description: 'Детский футбольный мяч размером 3. Отлично подходит для игр во дворе.',
      price: 800,
      image: '/images/soccer-ball.jpg',
      category: 'Спорт',
      ingredients: ['Резина', 'Текстиль', 'Безопасные материалы'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Скакалка',
      description: 'Яркая скакалка с удобными ручками. Развивает координацию и выносливость.',
      price: 300,
      image: '/images/jump-rope.jpg',
      category: 'Спорт',
      ingredients: ['Пластик', 'Текстиль', 'Безопасные материалы'],
      isAvailable: true,
      status: 'REGULAR'
    },

    // Творчество
    {
      name: 'Набор для рисования',
      description: 'Полный набор для юного художника: краски, кисти, альбом, карандаши.',
      price: 1500,
      image: '/images/art-set.jpg',
      category: 'Творчество',
      ingredients: ['Краски на водной основе', 'Кисти', 'Бумага', 'Безопасные материалы'],
      isAvailable: true,
      status: 'HIT'
    },
    {
      name: 'Пластилин Play-Doh',
      description: 'Набор цветного пластилина для лепки. 6 цветов в удобных баночках.',
      price: 600,
      image: '/images/play-doh.jpg',
      category: 'Творчество',
      ingredients: ['Пластилин', 'Безопасные материалы'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Набор для аппликации',
      description: 'Набор для создания аппликаций: цветная бумага, клей, ножницы.',
      price: 500,
      image: '/images/craft-set.jpg',
      category: 'Творчество',
      ingredients: ['Бумага', 'Клей', 'Пластик', 'Безопасные материалы'],
      isAvailable: true,
      status: 'REGULAR'
    }
  ]

  // Добавляем товары
  for (const productData of products) {
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
        ingredients: productData.ingredients,
        isAvailable: productData.isAvailable,
        status: productData.status
      }
    })
    console.log(`✅ Создан товар: ${product.name} (${productData.category})`)
  }

  // Показываем статистику
  const totalProducts = await prisma.product.count()
  const totalCategories = await prisma.category.count()
  
  console.log('🎉 Данные детского магазина успешно добавлены!')
  console.log(`📊 Статистика:`)
  console.log(`   - Всего товаров: ${totalProducts}`)
  console.log(`   - Всего категорий: ${totalCategories}`)
  console.log(`   - Добавлено товаров: ${products.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при добавлении данных:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
