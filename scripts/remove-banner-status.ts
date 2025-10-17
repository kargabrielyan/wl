import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function removeBannerStatus() {
  try {
    console.log('🔄 Удаляем статус BANNER со всех товаров...')
    
    // Сначала посмотрим, сколько товаров имеют статус BANNER
    const bannerProductsCount = await prisma.product.count({
      where: {
        status: 'BANNER'
      }
    })
    
    console.log(`📊 Найдено товаров со статусом BANNER: ${bannerProductsCount}`)
    
    if (bannerProductsCount === 0) {
      console.log('✅ Нет товаров со статусом BANNER')
      return
    }
    
    // Обновляем все товары со статусом BANNER на CLASSIC
    const updateResult = await prisma.product.updateMany({
      where: {
        status: 'BANNER'
      },
      data: {
        status: 'CLASSIC'
      }
    })
    
    console.log(`✅ Обновлено товаров: ${updateResult.count}`)
    
    // Проверяем результат
    const remainingBannerProducts = await prisma.product.count({
      where: {
        status: 'BANNER'
      }
    })
    
    console.log(`📊 Осталось товаров со статусом BANNER: ${remainingBannerProducts}`)
    
    // Показываем новую статистику по статусам
    const productsByStatus = await prisma.product.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })
    
    console.log('\n📋 Обновленная статистика по статусам:')
    productsByStatus.forEach(group => {
      console.log(`  ${group.status}: ${group._count.id} товаров`)
    })
    
    console.log('\n🎉 Статус BANNER успешно удален со всех товаров!')
    
  } catch (error) {
    console.error('❌ Ошибка при удалении статуса BANNER:', error)
  } finally {
    await prisma.$disconnect()
  }
}

removeBannerStatus()
