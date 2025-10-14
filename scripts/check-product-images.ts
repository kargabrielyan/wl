import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🖼️ Проверяем изображения товаров...')

  try {
    const products = await prisma.product.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        image: true
      }
    })

    console.log('📋 Примеры товаров с изображениями:')
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ${product.image}`)
    })

    // Проверяем статистику изображений
    const totalProducts = await prisma.product.count()
    const nophotoCount = await prisma.product.count({
      where: {
        image: '/images/nophoto.jpg'
      }
    })

    console.log(`\n📊 Статистика изображений:`)
    console.log(`   - Всего товаров: ${totalProducts}`)
    console.log(`   - С nophoto.jpg: ${nophotoCount}`)
    console.log(`   - Процент: ${Math.round((nophotoCount / totalProducts) * 100)}%`)

  } catch (error) {
    console.error('❌ Ошибка:', error)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
