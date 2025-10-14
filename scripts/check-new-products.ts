import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Проверяем новые товары...')
  
  const products = await prisma.product.findMany({
    take: 10,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })
  
  console.log('📦 Последние 10 товаров:')
  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} - ${product.price} ֏ (${product.category?.name || 'Без категории'}) [${product.status}]`)
  })
  
  const totalCount = await prisma.product.count()
  console.log(`\n📊 Всего товаров в БД: ${totalCount}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
