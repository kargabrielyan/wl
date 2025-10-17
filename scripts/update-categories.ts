import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateCategories() {
  try {
    console.log('🗑️ Удаляем все существующие категории...')
    
    // Удаляем все категории
    await prisma.category.deleteMany({})
    console.log('✅ Все категории удалены')
    
    console.log('➕ Добавляем новые категории...')
    
    // Новые категории на армянском языке
    const newCategories = [
      {
        name: 'Օրորոցներ',
        description: 'Բոլոր տեսակի օրորոցներ երեխաների համար',
        image: '/images/categories/cradles.jpg',
        sortOrder: 1,
        showInMainPage: true,
        isActive: true
      },
      {
        name: 'Կահույք',
        description: 'Մանկական սենյակի կահույք',
        image: '/images/categories/furniture.jpg',
        sortOrder: 2,
        showInMainPage: true,
        isActive: true
      },
      {
        name: 'Հավաքածուներ',
        description: 'Խաղալիքների հավաքածուներ',
        image: '/images/categories/sets.jpg',
        sortOrder: 3,
        showInMainPage: true,
        isActive: true
      },
      {
        name: 'Քողեր',
        description: 'Մանկական քողեր և վարագույրներ',
        image: '/images/categories/curtains.jpg',
        sortOrder: 4,
        showInMainPage: true,
        isActive: true
      },
      {
        name: 'Հյուսեր',
        description: 'Զարգացնող հյուսեր և խաղալիքներ',
        image: '/images/categories/weaving.jpg',
        sortOrder: 5,
        showInMainPage: true,
        isActive: true
      },
      {
        name: 'Երաժշտական Խաղալիքներ',
        description: 'Երաժշտական խաղալիքներ և գործիքներ',
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
        description: 'Մանկական ներքնակներ և բարձեր',
        image: '/images/categories/mattresses.jpg',
        sortOrder: 9,
        showInMainPage: true,
        isActive: true
      }
    ]
    
    // Создаем новые категории
    for (const category of newCategories) {
      await prisma.category.create({
        data: category
      })
      console.log(`✅ Добавлена категория: ${category.name}`)
    }
    
    console.log('🎉 Все категории успешно обновлены!')
    
    // Показываем итоговый список
    const allCategories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' }
    })
    
    console.log('\n📋 Итоговый список категорий:')
    allCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (${cat.showInMainPage ? 'на главной' : 'скрыта'})`)
    })
    
  } catch (error) {
    console.error('❌ Ошибка при обновлении категорий:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateCategories()
