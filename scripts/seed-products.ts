import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Начинаем добавление тестовых товаров...')

  // Создаем категории
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Игрушки' },
      update: {},
      create: { name: 'Игрушки', description: 'Детские игрушки для всех возрастов' }
    }),
    prisma.category.upsert({
      where: { name: 'Одежда' },
      update: {},
      create: { name: 'Одежда', description: 'Детская одежда и обувь' }
    }),
    prisma.category.upsert({
      where: { name: 'Книги' },
      update: {},
      create: { name: 'Книги', description: 'Детские книги и развивающая литература' }
    }),
    prisma.category.upsert({
      where: { name: 'Спорт' },
      update: {},
      create: { name: 'Спорт', description: 'Спортивные товары для детей' }
    }),
    prisma.category.upsert({
      where: { name: 'Творчество' },
      update: {},
      create: { name: 'Творчество', description: 'Товары для творчества и рукоделия' }
    })
  ])

  console.log('✅ Категории созданы')

  // Создаем товары
  const products = [
    {
      name: "Конструктор LEGO Classic",
      description: "Большой набор для творчества и развития мелкой моторики. 1500 деталей различных цветов и форм.",
      price: 2500,
      image: "/api/placeholder/300/300",
      categoryId: categories[0].id,
      ingredients: "Пластик, безопасные материалы",
      isAvailable: true,
      status: "HIT" as const
    },
    {
      name: "Мягкая игрушка Мишка Тедди",
      description: "Мягкий и пушистый мишка, лучший друг для вашего малыша. Высота 30 см.",
      price: 1200,
      image: "/api/placeholder/300/300",
      categoryId: categories[0].id,
      ingredients: "Плюш, синтепон, безопасные материалы",
      isAvailable: true,
      status: "HIT" as const
    },
    {
      name: "Детская футболка с принтом",
      description: "Яркая футболка из 100% хлопка с веселым принтом. Размеры от 2 до 12 лет.",
      price: 800,
      image: "/api/placeholder/300/300",
      categoryId: categories[1].id,
      ingredients: "100% хлопок",
      isAvailable: true,
      status: "REGULAR" as const
    },
    {
      name: "Набор для рисования",
      description: "Полный набор для юного художника: краски, кисти, альбом, карандаши.",
      price: 1500,
      image: "/api/placeholder/300/300",
      categoryId: categories[4].id,
      ingredients: "Краски на водной основе, кисти из натурального ворса",
      isAvailable: true,
      status: "REGULAR" as const
    },
    {
      name: "Детский велосипед",
      description: "Легкий и безопасный велосипед для детей от 3 до 6 лет. С дополнительными колесами.",
      price: 7000,
      image: "/api/placeholder/300/300",
      categoryId: categories[3].id,
      ingredients: "Алюминиевая рама, резиновые колеса",
      isAvailable: true,
      status: "REGULAR" as const
    },
    {
      name: "Книга сказок",
      description: "Сборник любимых сказок с яркими иллюстрациями. Твердый переплет, 200 страниц.",
      price: 900,
      image: "/api/placeholder/300/300",
      categoryId: categories[2].id,
      ingredients: "Бумага, картон, безопасные краски",
      isAvailable: true,
      status: "REGULAR" as const
    }
  ]

  for (const productData of products) {
    await prisma.product.create({
      data: productData
    })
  }

  console.log('✅ Товары добавлены в базу данных')
  console.log('🎉 Сидинг завершен успешно!')
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при добавлении товаров:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
