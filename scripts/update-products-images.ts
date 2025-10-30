/**
 * Скрипт для обновления изображений товаров
 * Устанавливает /images/nophoto.jpg для всех товаров без изображения
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateProductsImages() {
  try {
    console.log('🔄 Начинаю обновление изображений товаров...')

    // Получаем все товары
    const allProducts = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        image: true
      }
    })

    // Фильтруем товары без изображения или с неправильными значениями
    const productsWithoutImage = allProducts.filter(product => {
      const image = product.image?.trim() || ''
      return !image || 
             image === 'no-image' || 
             !image.startsWith('/images/')
    })

    console.log(`📦 Найдено товаров без изображения: ${productsWithoutImage.length}`)

    if (productsWithoutImage.length === 0) {
      console.log('✅ Все товары уже имеют изображения!')
      return
    }

    // Обновляем каждый товар отдельно
    let updatedCount = 0
    for (const product of productsWithoutImage) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          image: '/images/nophoto.jpg'
        }
      })
      updatedCount++
      if (updatedCount % 10 === 0) {
        console.log(`   Обновлено ${updatedCount}/${productsWithoutImage.length} товаров...`)
      }
    }

    console.log(`✅ Обновлено товаров: ${updatedCount}`)
    console.log('✨ Готово! Все товары теперь имеют изображение nophoto.jpg')
  } catch (error) {
    console.error('❌ Ошибка при обновлении изображений:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Запускаем скрипт
updateProductsImages()
  .then(() => {
    console.log('🎉 Скрипт выполнен успешно!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Критическая ошибка:', error)
    process.exit(1)
  })

