/**
 * Скрипт для замены всех product-*.jpg изображений на placeholder
 * Заменяет все изображения типа /images/product-*.jpg на /images/nophoto.jpg
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixProductImages() {
  try {
    console.log('🔄 Начинаю обновление изображений товаров...')

    // Получаем все товары с изображениями product-*.jpg
    const allProducts = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        image: true
      }
    })

    // Фильтруем товары с product-*.jpg
    const productsWithProductImage = allProducts.filter(product => {
      const image = product.image?.trim() || ''
      return image.includes('product-') && image.endsWith('.jpg')
    })

    console.log(`📦 Найдено товаров с product-*.jpg: ${productsWithProductImage.length}`)

    if (productsWithProductImage.length === 0) {
      console.log('✅ Нет товаров с product-*.jpg изображениями!')
      return
    }

    // Обновляем каждый товар отдельно
    let updatedCount = 0
    for (const product of productsWithProductImage) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          image: '/images/nophoto.jpg'
        }
      })
      updatedCount++
      if (updatedCount % 10 === 0) {
        console.log(`   Обновлено ${updatedCount}/${productsWithProductImage.length} товаров...`)
      }
    }

    console.log(`✅ Обновлено товаров: ${updatedCount}`)
    console.log('✨ Готово! Все product-*.jpg изображения заменены на nophoto.jpg')
  } catch (error) {
    console.error('❌ Ошибка при обновлении изображений:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

fixProductImages()
  .then(() => {
    console.log('✅ Скрипт выполнен успешно')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Ошибка выполнения скрипта:', error)
    process.exit(1)
  })

