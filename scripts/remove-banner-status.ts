import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🔄 Начинаю удаление статуса BANNER со всех товаров...\n')

    // Находим все товары со статусом BANNER
    const bannerProducts = await prisma.product.findMany({
      where: {
        status: 'BANNER'
      }
    })

    console.log(`📦 Найдено товаров со статусом BANNER: ${bannerProducts.length}\n`)

    if (bannerProducts.length === 0) {
      console.log('✅ Нет товаров со статусом BANNER. Ничего не требуется изменить.')
      return
    }

    // Обновляем все товары, меняя статус BANNER на REGULAR
    const result = await prisma.product.updateMany({
      where: {
        status: 'BANNER'
      },
      data: {
        status: 'REGULAR'
      }
    })

    console.log(`✅ Обновлено товаров: ${result.count}`)
    console.log(`   Статус BANNER изменен на REGULAR\n`)

    // Показываем список обновленных товаров
    console.log('📋 Обновленные товары:')
    for (const product of bannerProducts) {
      console.log(`   - "${product.name}" (ID: ${product.id})`)
    }

    console.log('\n🎉 Готово! Статус BANNER удален со всех товаров.')

  } catch (error) {
    console.error('❌ Ошибка при удалении статуса BANNER:', error)
    throw error
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
