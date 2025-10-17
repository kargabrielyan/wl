import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Խաղալիքներ',
    description: 'Զվարճալի խաղալիքներ բոլոր տարիքների երեխաների համար',
    image: '/images/categories/toys.jpg',
    sortOrder: 1,
    showInMainPage: true,
    isActive: true
  },
  {
    name: 'Հագուստ',
    description: 'Մանկական հագուստ բոլոր սեզոնների համար',
    image: '/images/categories/clothing.jpg',
    sortOrder: 2,
    showInMainPage: true,
    isActive: true
  },
  {
    name: 'Գրքեր',
    description: 'Զարգացնող գրքեր և պատմություններ',
    image: '/images/categories/books.jpg',
    sortOrder: 3,
    showInMainPage: true,
    isActive: true
  },
  {
    name: 'Սպորտ',
    description: 'Սպորտային ապրանքներ և խաղալիքներ',
    image: '/images/categories/sports.jpg',
    sortOrder: 4,
    showInMainPage: true,
    isActive: true
  },
  {
    name: 'Ստեղծագործություն',
    description: 'Նկարչության և արհեստի նյութեր',
    image: '/images/categories/creativity.jpg',
    sortOrder: 5,
    showInMainPage: true,
    isActive: true
  },
  {
    name: 'Խոհանոցային խաղալիքներ',
    description: 'Խոհանոցային խաղալիքներ և սարքեր',
    image: '/images/categories/kitchen.jpg',
    sortOrder: 6,
    showInMainPage: true,
    isActive: true
  },
  {
    name: 'Մեքենաներ',
    description: 'Մեքենաներ, տրակտորներ և տրանսպորտ',
    image: '/images/categories/vehicles.jpg',
    sortOrder: 7,
    showInMainPage: true,
    isActive: true
  },
  {
    name: 'Կոնստրուկտորներ',
    description: 'Լեգո և այլ կոնստրուկտորներ',
    image: '/images/categories/constructors.jpg',
    sortOrder: 8,
    showInMainPage: true,
    isActive: true
  },
  {
    name: 'Երաժշտական գործիքներ',
    description: 'Մանկական երաժշտական գործիքներ',
    image: '/images/categories/music.jpg',
    sortOrder: 9,
    showInMainPage: true,
    isActive: true
  }
]

async function main() {
  console.log('🌱 Seeding categories...')

  try {
    // Удаляем все связанные данные в правильном порядке
    await prisma.wishlist.deleteMany({})
    console.log('✅ Existing wishlist deleted')
    
    await prisma.orderItem.deleteMany({})
    console.log('✅ Existing order items deleted')
    
    await prisma.order.deleteMany({})
    console.log('✅ Existing orders deleted')
    
    await prisma.product.deleteMany({})
    console.log('✅ Existing products deleted')
    
    await prisma.category.deleteMany({})
    console.log('✅ Existing categories deleted')

    // Создаем новые категории
    for (const categoryData of categories) {
      const category = await prisma.category.create({
        data: categoryData
      })
      console.log(`✅ Created category: ${category.name}`)
    }

    console.log('🎉 Categories seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding categories:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
