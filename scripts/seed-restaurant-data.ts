import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🍽️ Добавляем данные ресторана...')

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

  // Товары ресторана
  const products = [
    // Пиде
    {
      name: 'Пиде с мясом',
      description: 'Традиционное турецкое пиде с сочным мясом, луком и специями',
      price: 2500,
      image: '/images/2-myasa-pide-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Мясо', 'Лук', 'Специи', 'Зелень'],
      isAvailable: true,
      status: 'HIT'
    },
    {
      name: 'Пиде с сыром',
      description: 'Классическое пиде с сыром и зеленью',
      price: 2000,
      image: '/images/classic-chees-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Сыр', 'Зелень', 'Масло'],
      isAvailable: true,
      status: 'CLASSIC'
    },
    {
      name: 'Пиде с беконом',
      description: 'Пиде с хрустящим беконом и сыром',
      price: 2800,
      image: '/images/pide-s-bekonom-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Бекон', 'Сыр', 'Зелень'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Пиде с говядиной',
      description: 'Пиде с нежной говядиной и овощами',
      price: 3000,
      image: '/images/pide-s-govyadinoj-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Говядина', 'Овощи', 'Специи'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Пиде с фали',
      description: 'Пиде с традиционной фали и зеленью',
      price: 2200,
      image: '/images/pide-s-phali-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Фали', 'Зелень', 'Специи'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Пиде с бастурмой',
      description: 'Пиде с армянской бастурмой',
      price: 3200,
      image: '/images/pide-s-basturmoj-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Бастурма', 'Сыр', 'Зелень'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Пиде с куриными лёгкими',
      description: 'Пиде с куриными лёгкими и специями',
      price: 2400,
      image: '/images/kurinye-legkie-pide-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Куриные лёгкие', 'Лук', 'Специи'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Овощное пиде',
      description: 'Вегетарианское пиде с овощами',
      price: 1800,
      image: '/images/ovoshchnoe-pide-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Овощи', 'Сыр', 'Зелень'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Грибное пиде',
      description: 'Пиде с грибами и сыром',
      price: 2100,
      image: '/images/gribnoe-pide-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Грибы', 'Сыр', 'Зелень'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Пиде с пепперони',
      description: 'Пиде с острой пепперони',
      price: 2600,
      image: '/images/pepperoni-pide-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Пепперони', 'Сыр', 'Специи'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Пиде с хот-догом',
      description: 'Пиде с хот-догом и соусом',
      price: 2300,
      image: '/images/pide-hot-dog-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Сосиска', 'Соус', 'Зелень'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Пиде с грушей',
      description: 'Сладкое пиде с грушей',
      price: 1900,
      image: '/images/pide-blue-pear-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Груша', 'Сахар', 'Корица'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Сладкое пиде',
      description: 'Десертное пиде с начинкой',
      price: 1700,
      image: '/images/sladkiy-pide-Photoroom.png',
      category: 'Пиде',
      ingredients: ['Тесто', 'Сахар', 'Масло', 'Ваниль'],
      isAvailable: true,
      status: 'REGULAR'
    },

    // Комбо
    {
      name: 'Комбо "Я один"',
      description: 'Пиде + напиток + картофель фри',
      price: 3500,
      image: '/images/kombo-ya-odin-Photoroom.png',
      category: 'Комбо',
      ingredients: ['Пиде на выбор', 'Напиток', 'Картофель фри'],
      isAvailable: true,
      status: 'HIT'
    },
    {
      name: 'Комбо "Я голодный"',
      description: 'Большое пиде + напиток + картофель фри + соус',
      price: 4200,
      image: '/images/kombo-my-golodny-Photoroom.png',
      category: 'Комбо',
      ingredients: ['Большое пиде', 'Напиток', 'Картофель фри', 'Соус'],
      isAvailable: true,
      status: 'HIT'
    },
    {
      name: 'Комбо "Я очень голодный"',
      description: '2 пиде + напиток + картофель фри + соус',
      price: 5500,
      image: '/images/kombo-my-ochen-golodny-Photoroom.png',
      category: 'Комбо',
      ingredients: ['2 пиде', 'Напиток', 'Картофель фри', 'Соус'],
      isAvailable: true,
      status: 'HIT'
    },
    {
      name: 'Комбо "Мы вдвоём"',
      description: '2 пиде + 2 напитка + картофель фри',
      price: 6500,
      image: '/images/kombo-my-vdvoyom-Photoroom.png',
      category: 'Комбо',
      ingredients: ['2 пиде', '2 напитка', 'Картофель фри'],
      isAvailable: true,
      status: 'HIT'
    },

    // Снэк
    {
      name: 'Картофель фри',
      description: 'Хрустящий картофель фри с солью',
      price: 800,
      image: '/images/kartofel-fri-Photoroom.png',
      category: 'Снэк',
      ingredients: ['Картофель', 'Масло', 'Соль'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Куриный попкорн',
      description: 'Хрустящий куриный попкорн',
      price: 1200,
      image: '/images/kurinyy-popkorn-Photoroom.png',
      category: 'Снэк',
      ingredients: ['Курица', 'Панировка', 'Специи'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Спинат',
      description: 'Свежий спинан с чесноком',
      price: 600,
      image: '/images/shpinat-Photoroom.png',
      category: 'Снэк',
      ingredients: ['Спинан', 'Чеснок', 'Масло'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Тан',
      description: 'Традиционный кисломолочный напиток',
      price: 500,
      image: '/images/tan-Photoroom.png',
      category: 'Снэк',
      ingredients: ['Молоко', 'Закваска', 'Соль'],
      isAvailable: true,
      status: 'REGULAR'
    },

    // Соусы
    {
      name: 'Кетчуп',
      description: 'Классический томатный кетчуп',
      price: 200,
      image: '/images/Ketchup-Pideh-Photoroom.png',
      category: 'Соусы',
      ingredients: ['Томаты', 'Сахар', 'Уксус', 'Специи'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Майонез',
      description: 'Классический майонез',
      price: 200,
      image: '/images/Mayonnaise-Pideh-Photoroom.png',
      category: 'Соусы',
      ingredients: ['Яйца', 'Масло', 'Уксус', 'Горчица'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Горчичный соус',
      description: 'Острый горчичный соус',
      price: 200,
      image: '/images/Mustard-sauce-Pideh-Photoroom.png',
      category: 'Соусы',
      ingredients: ['Горчица', 'Масло', 'Специи'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Чесночный соус',
      description: 'Ароматный чесночный соус',
      price: 200,
      image: '/images/Garlic-sauce-Pideh-Photoroom.png',
      category: 'Соусы',
      ingredients: ['Чеснок', 'Майонез', 'Зелень'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'BBQ соус',
      description: 'Дымчатый BBQ соус',
      price: 200,
      image: '/images/BBQ-sauce-Pideh-Photoroom.png',
      category: 'Соусы',
      ingredients: ['Томаты', 'Сахар', 'Дым', 'Специи'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Коктейльный соус',
      description: 'Классический коктейльный соус',
      price: 200,
      image: '/images/Cocktail-sauce-Pideh-Photoroom.png',
      category: 'Соусы',
      ingredients: ['Кетчуп', 'Майонез', 'Хрен', 'Специи'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Кавказский сыр',
      description: 'Традиционный кавказский сыр',
      price: 300,
      image: '/images/caucasus-cheese-Photoroom.png',
      category: 'Соусы',
      ingredients: ['Молоко', 'Закваска', 'Соль'],
      isAvailable: true,
      status: 'REGULAR'
    },

    // Напитки
    {
      name: 'Кола, Спрайт, Фанта',
      description: 'Газированные напитки 0.5л',
      price: 600,
      image: '/images/cola-sprite-fanta-Photoroom.png',
      category: 'Напитки',
      ingredients: ['Вода', 'Сахар', 'Газы', 'Ароматизаторы'],
      isAvailable: true,
      status: 'REGULAR'
    },
    {
      name: 'Сок',
      description: 'Натуральный сок 0.3л',
      price: 500,
      image: '/images/juice-Photoroom.png',
      category: 'Напитки',
      ingredients: ['Фрукты', 'Вода', 'Сахар'],
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
  
  console.log('🎉 Данные ресторана успешно добавлены!')
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
