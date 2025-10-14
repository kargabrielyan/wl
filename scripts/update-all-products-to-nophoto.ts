import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🖼️ Обновляем все товары с изображением nophoto.jpg...')

  try {
    // Получаем общее количество товаров
    const totalProducts = await prisma.product.count()
    console.log(`📦 Найдено товаров: ${totalProducts}`)

    if (totalProducts === 0) {
      console.log('❌ Товары не найдены')
      return
    }

    // Обновляем все товары с изображением nophoto.jpg
    const result = await prisma.product.updateMany({
      data: {
        image: '/images/nophoto.jpg'
      }
    })

    console.log(`✅ Обновлено товаров: ${result.count}`)

    // Проверяем результат
    const updatedProducts = await prisma.product.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        image: true
      }
    })

    console.log('\n📋 Примеры обновленных товаров:')
    updatedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ${product.image}`)
    })

    // Проверяем, что все товары имеют правильное изображение
    const productsWithNophoto = await prisma.product.count({
      where: {
        image: '/images/nophoto.jpg'
      }
    })

    console.log(`\n📊 Статистика:`)
    console.log(`   - Всего товаров: ${totalProducts}`)
    console.log(`   - Товаров с nophoto.jpg: ${productsWithNophoto}`)
    console.log(`   - Процент обновления: ${Math.round((productsWithNophoto / totalProducts) * 100)}%`)

    if (productsWithNophoto === totalProducts) {
      console.log('🎉 Все товары успешно обновлены!')
    } else {
      console.log('⚠️ Не все товары обновлены. Проверьте ошибки.')
    }

  } catch (error) {
    console.error('❌ Ошибка при обновлении товаров:', error)
  }
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
