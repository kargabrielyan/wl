import { PrismaClient } from '@prisma/client'

// Устанавливаем переменную окружения для SQLite
process.env.DATABASE_URL = 'file:./prisma/dev.db'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🖼️ Получаем список изображений товаров...')
    
    const products = await prisma.product.findMany({
      select: {
        name: true,
        image: true
      }
    })

    console.log('📋 Нужные изображения:')
    products.forEach(product => {
      console.log(`  - ${product.name}: ${product.image}`)
    })
    
  } catch (error) {
    console.error('❌ Ошибка:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
