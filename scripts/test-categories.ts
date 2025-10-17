import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testCategories() {
  try {
    console.log('🔍 Проверяем категории в базе данных...')
    
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' }
    })
    
    console.log(`📊 Найдено категорий: ${categories.length}`)
    console.log('\n📋 Список категорий:')
    
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name}`)
      console.log(`   Описание: ${cat.description}`)
      console.log(`   Изображение: ${cat.image}`)
      console.log(`   Показывать на главной: ${cat.showInMainPage ? 'Да' : 'Нет'}`)
      console.log(`   Активна: ${cat.isActive ? 'Да' : 'Нет'}`)
      console.log('')
    })
    
  } catch (error) {
    console.error('❌ Ошибка при проверке категорий:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testCategories()
