import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Создаем армянские категории...')

  // Армянские категории
  const categories = [
    {
      name: 'Օրորոցներ',
      description: 'Բարձրորակ օրորոցներ և մանկական մահճակալներ',
      image: '/images/categories/cradles.jpg',
      sortOrder: 1,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Կահույք',
      description: 'Մանկական կահույք և սենյակի հարդարանք',
      image: '/images/categories/furniture.jpg',
      sortOrder: 2,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Հավաքածուներ',
      description: 'Խաղալիքների հավաքածուներ և կոմպլեկտներ',
      image: '/images/categories/sets.jpg',
      sortOrder: 3,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Քողեր',
      description: 'Գեղեցիկ քողեր և վարագույրներ մանկական սենյակի համար',
      image: '/images/categories/curtains.jpg',
      sortOrder: 4,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Հյուսեր',
      description: 'Ձեռագործ հյուսեր և տեքստիլ ապրանքներ',
      image: '/images/categories/weaving.jpg',
      sortOrder: 5,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Երաժշտական Խաղալիքներ',
      description: 'Երաժշտական գործիքներ և խաղալիքներ',
      image: '/images/categories/musical-toys.jpg',
      sortOrder: 6,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Անկողնային Պարագաներ',
      description: 'Անկողնային պարագաներ և աքսեսուարներ',
      image: '/images/categories/bedding.jpg',
      sortOrder: 7,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Մանկական Սենյակի Դեկորներ',
      description: 'Դեկորատիվ իրեր մանկական սենյակի համար',
      image: '/images/categories/decorations.jpg',
      sortOrder: 8,
      showInMainPage: true,
      isActive: true
    },
    {
      name: 'Ներքնակներ',
      description: 'Բարձրորակ ներքնակներ և անկողնային պարագաներ',
      image: '/images/categories/mattresses.jpg',
      sortOrder: 9,
      showInMainPage: true,
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
      value: 'Դպրոցական աշխարհ'
    },
    {
      key: 'siteDescription',
      value: 'Լավագույն ապրանքներ երեխաների համար Հայաստանում'
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
      value: 'Երևան, Աբովյան փող. 1'
    },
    {
      key: 'instagramUrl',
      value: 'https://www.instagram.com/welcome_baby_armenia/'
    },
    {
      key: 'deliveryInfo',
      value: 'Անվճար առաքում Երևանում 5000 ֏-ից'
    },
    {
      key: 'returnPolicy',
      value: 'Ապրանքի վերադարձ 14 օրվա ընթացքում'
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
      name: 'Ստանդարտ առաքում',
      deliveryTime: '1-2 օր',
      description: 'Առաքում Երևանում 1-2 աշխատանքային օրվա ընթացքում',
      price: 0,
      isActive: true
    },
    {
      name: 'Էքսպրես առաքում',
      deliveryTime: 'Նույն օրը',
      description: 'Առաքում նույն օրը (պատվերի ժամը մինչև 14:00)',
      price: 2000,
      isActive: true
    },
    {
      name: 'Ինքնաառաքում',
      deliveryTime: 'Նույն օրը',
      description: 'Ինքնաառաքում մեր խանութից',
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

  console.log('🎉 Армянские категории успешно созданы!')
  
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
    console.error('❌ Ошибка при создании армянских категорий:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
