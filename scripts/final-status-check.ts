import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function finalStatusCheck() {
  try {
    console.log('🔍 Финальная проверка статусов товаров...')
    
    // Общая статистика
    const totalProducts = await prisma.product.count()
    console.log(`📊 Общее количество товаров: ${totalProducts}`)
    
    // Статистика по статусам
    const productsByStatus = await prisma.product.groupBy({
      by: ['status'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    })
    
    console.log('\n📋 Распределение по статусам:')
    productsByStatus.forEach(group => {
      const percentage = ((group._count.id / totalProducts) * 100).toFixed(1)
      console.log(`  ${group.status}: ${group._count.id} товаров (${percentage}%)`)
    })
    
    // Проверяем, что нет товаров со статусом BANNER
    const bannerCount = await prisma.product.count({
      where: {
        status: 'BANNER'
      }
    })
    
    if (bannerCount === 0) {
      console.log('\n✅ Статус BANNER полностью удален!')
    } else {
      console.log(`\n⚠️ Осталось товаров со статусом BANNER: ${bannerCount}`)
    }
    
    // Показываем примеры товаров по статусам
    console.log('\n🔍 Примеры товаров по статусам:')
    
    for (const status of ['NEW', 'HIT', 'CLASSIC']) {
      const sampleProduct = await prisma.product.findFirst({
        where: {
          status: status as any
        },
        include: {
          category: true
        }
      })
      
      if (sampleProduct) {
        console.log(`\n${status}:`)
        console.log(`  Название: ${sampleProduct.name}`)
        console.log(`  Категория: ${sampleProduct.category?.name}`)
        console.log(`  Цена: ${sampleProduct.price} ֏`)
        console.log(`  В наличии: ${sampleProduct.stock} шт.`)
      }
    }
    
    console.log('\n🎉 Проверка завершена!')
    
  } catch (error) {
    console.error('❌ Ошибка при проверке:', error)
  } finally {
    await prisma.$disconnect()
  }
}

finalStatusCheck()
