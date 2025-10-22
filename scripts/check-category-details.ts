import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkCategoryDetails() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: ['Խաղալիքներ', 'Հագուստ']
        }
      }
    })
    
    console.log('Детали категорий:')
    categories.forEach(cat => {
      console.log(`\n${cat.name}:`)
      console.log(`  ID: ${cat.id}`)
      console.log(`  Image: ${cat.image}`)
      console.log(`  Description: ${cat.description}`)
      console.log(`  SortOrder: ${cat.sortOrder}`)
      console.log(`  ShowInMainPage: ${cat.showInMainPage}`)
      console.log(`  IsActive: ${cat.isActive}`)
      console.log(`  CreatedAt: ${cat.createdAt}`)
      console.log(`  UpdatedAt: ${cat.updatedAt}`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkCategoryDetails()
