import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedDeliveryTypes() {
  console.log('🌱 Seeding delivery types...')

  const deliveryTypes = [
    {
      name: 'Курьерская доставка',
      deliveryTime: '1-2 дня',
      description: 'Быстрая доставка курьером по Еревану и окрестностям. Доставка осуществляется в удобное для вас время.',
      price: 500.00,
      isActive: true
    },
    {
      name: 'Самовывоз',
      deliveryTime: 'В день заказа',
      description: 'Заберите заказ самостоятельно из нашего магазина. Экономичный вариант без дополнительной платы.',
      price: 0.00,
      isActive: true
    },
    {
      name: 'Почтовая доставка',
      deliveryTime: '3-5 дней',
      description: 'Доставка почтой по всей Армении. Подходит для отдаленных регионов страны.',
      price: 800.00,
      isActive: true
    }
  ]

  try {
    // Очищаем существующие типы доставки
    await prisma.deliveryType.deleteMany()
    console.log('✅ Cleared existing delivery types')

    // Создаем новые типы доставки
    for (const deliveryType of deliveryTypes) {
      await prisma.deliveryType.create({
        data: deliveryType
      })
      console.log(`✅ Created delivery type: ${deliveryType.name}`)
    }

    console.log('🎉 Successfully seeded delivery types!')
  } catch (error) {
    console.error('❌ Error seeding delivery types:', error)
  }
}

async function main() {
  await seedDeliveryTypes()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
