import { PrismaClient } from '@prisma/client'

// Устанавливаем переменную окружения для SQLite
process.env.DATABASE_URL = 'file:./prisma/dev.db'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🧸 Добавляем товары детского магазина...')
    
    // Создаем категории
    const categories = [
      { name: 'Игрушки', description: 'Детские игрушки для всех возрастов' },
      { name: 'Одежда', description: 'Детская одежда и обувь' },
      { name: 'Книги', description: 'Детские книги и развивающая литература' },
      { name: 'Спорт', description: 'Спортивные товары для детей' },
      { name: 'Творчество', description: 'Товары для творчества и рукоделия' }
    ]

    const categoryMap = new Map()
    
    for (const categoryData of categories) {
      let category = await prisma.category.findUnique({
        where: { name: categoryData.name }
      })
      
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: categoryData.name,
            description: categoryData.description,
            isActive: true
          }
        })
        console.log(`✅ Создана категория: ${category.name}`)
      } else {
        console.log(`ℹ️ Категория уже существует: ${category.name}`)
      }
      
      categoryMap.set(categoryData.name, category.id)
    }

    // Товары детского магазина
    const products = [
      {
        name: 'Конструктор LEGO Classic',
        description: 'Большой набор для творчества и развития мелкой моторики. 1500 деталей различных цветов и форм.',
        price: 2500,
        image: '/images/lego-constructor.jpg',
        category: 'Игрушки',
        ingredients: 'Пластик, Безопасные материалы',
        isAvailable: true,
        status: 'HIT'
      },
      {
        name: 'Мягкая игрушка Мишка Тедди',
        description: 'Мягкий и пушистый мишка, лучший друг для вашего малыша. Высота 30 см.',
        price: 1200,
        image: '/images/teddy-bear.jpg',
        category: 'Игрушки',
        ingredients: 'Плюш, Синтепон, Безопасные материалы',
        isAvailable: true,
        status: 'HIT'
      },
      {
        name: 'Детская футболка с принтом',
        description: 'Яркая футболка из 100% хлопка с веселым принтом. Размеры от 2 до 12 лет.',
        price: 800,
        image: '/images/kids-tshirt.jpg',
        category: 'Одежда',
        ingredients: '100% хлопок, Безопасные красители',
        isAvailable: true,
        status: 'REGULAR'
      },
      {
        name: 'Книга сказок',
        description: 'Сборник любимых сказок с яркими иллюстрациями. Твердый переплет, 200 страниц.',
        price: 900,
        image: '/images/fairy-tales-book.jpg',
        category: 'Книги',
        ingredients: 'Бумага, Картон, Безопасные краски',
        isAvailable: true,
        status: 'CLASSIC'
      },
      {
        name: 'Детский велосипед',
        description: 'Легкий и безопасный велосипед для детей от 3 до 6 лет. С дополнительными колесами.',
        price: 7000,
        image: '/images/kids-bike.jpg',
        category: 'Спорт',
        ingredients: 'Алюминий, Резина, Пластик',
        isAvailable: true,
        status: 'HIT'
      },
      {
        name: 'Набор для рисования',
        description: 'Полный набор для юного художника: краски, кисти, альбом, карандаши.',
        price: 1500,
        image: '/images/art-set.jpg',
        category: 'Творчество',
        ingredients: 'Краски на водной основе, Кисти, Бумага, Безопасные материалы',
        isAvailable: true,
        status: 'HIT'
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
    
    console.log('\n🎉 Товары детского магазина успешно добавлены!')
    console.log(`📊 Статистика:`)
    console.log(`   - Всего товаров: ${totalProducts}`)
    console.log(`   - Всего категорий: ${totalCategories}`)
    console.log(`   - Добавлено товаров: ${products.length}`)
    
  } catch (error) {
    console.error('❌ Ошибка при добавлении товаров:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
