import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateCategoriesToArmenian() {
  try {
    console.log('🔄 Обновляем названия категорий на армянский язык...')

    // Сначала посмотрим, какие категории есть в базе
    const currentCategories = await prisma.category.findMany()
    console.log('📋 Текущие категории:')
    currentCategories.forEach(cat => {
      console.log(`- ${cat.name} (${cat.description || 'без описания'})`)
    })

    // Обновляем категории
    const categoryUpdates = [
      { 
        currentName: 'Игрушки', 
        newName: 'Խաղալիքներ',
        newDescription: 'Մանկական խաղալիքներ'
      },
      { 
        currentName: 'Одежда', 
        newName: 'Հագուստ',
        newDescription: 'Մանկական հագուստ'
      },
      { 
        currentName: 'Книги', 
        newName: 'Գրքեր',
        newDescription: 'Երեխաների գրքեր'
      },
      { 
        currentName: 'Спорт', 
        newName: 'Սպորտ',
        newDescription: 'Սպորտային արտադրանք'
      },
      { 
        currentName: 'Творчество', 
        newName: 'Ստեղծագործություն',
        newDescription: 'Ստեղծագործական արտադրանք'
      }
    ]

    for (const update of categoryUpdates) {
      const result = await prisma.category.updateMany({
        where: { name: update.currentName },
        data: {
          name: update.newName,
          description: update.newDescription
        }
      })
      
      if (result.count > 0) {
        console.log(`✅ Обновлено: ${update.currentName} → ${update.newName}`)
      } else {
        console.log(`⚠️ Не найдено: ${update.currentName}`)
      }
    }

    // Показываем обновленные категории
    const updatedCategories = await prisma.category.findMany()
    console.log('\n📋 Обновленные категории:')
    updatedCategories.forEach(cat => {
      console.log(`- ${cat.name} (${cat.description || 'без описания'})`)
    })

    console.log('\n✅ Названия категорий успешно обновлены на армянский язык!')

  } catch (error) {
    console.error('❌ Ошибка при обновлении категорий:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateCategoriesToArmenian()