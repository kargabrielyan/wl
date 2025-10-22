import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkCategories() {
  try {
    console.log('🔍 Проверяем категории в базе данных...')
    
    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'asc' }
      ],
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        sortOrder: true,
        showInMainPage: true,
        isActive: true,
        createdAt: true
      }
    })

    console.log(`📊 Найдено категорий: ${categories.length}`)
    
    if (categories.length > 0) {
      console.log('\n📋 Список категорий:')
      categories.forEach((category, index) => {
        console.log(`${index + 1}. ${category.name} (ID: ${category.id})`)
        console.log(`   Описание: ${category.description || 'Нет описания'}`)
        console.log(`   Показывать на главной: ${category.showInMainPage ? 'Да' : 'Нет'}`)
        console.log(`   Порядок сортировки: ${category.sortOrder}`)
        console.log(`   Активна: ${category.isActive ? 'Да' : 'Нет'}`)
        console.log('')
      })
    } else {
      console.log('❌ Категории не найдены!')
      console.log('💡 Возможно нужно создать категории в базе данных')
    }

  } catch (error) {
    console.error('❌ Ошибка при проверке категорий:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkCategories()