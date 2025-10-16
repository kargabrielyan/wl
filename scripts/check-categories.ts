import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkCategories() {
  try {
    console.log('🔍 Проверяем категории в базе данных...')
    
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })

    console.log('\n📋 Категории в базе данных:')
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name}`)
      console.log(`   Описание: ${cat.description || 'нет описания'}`)
      console.log(`   Активна: ${cat.isActive ? 'да' : 'нет'}`)
      console.log('')
    })

    console.log(`Всего категорий: ${categories.length}`)

  } catch (error) {
    console.error('❌ Ошибка при проверке категорий:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkCategories()

