import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixCategories() {
  try {
    console.log('🔧 Исправляем категории...')
    
    // Обновляем категории, убирая изображения
    await prisma.category.updateMany({
      where: {
        name: {
          in: ['Խաղալիքներ', 'Հագուստ']
        }
      },
      data: {
        image: null
      }
    })
    
    console.log('✅ Категории исправлены')
    
    // Проверяем результат
    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: ['Խաղալիքներ', 'Հագուստ']
        }
      }
    })
    
    console.log('Проверка результата:')
    categories.forEach(cat => {
      console.log(`${cat.name}: image = ${cat.image}`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixCategories()
