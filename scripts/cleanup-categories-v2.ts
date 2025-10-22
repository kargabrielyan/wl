import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Категории которые нужно оставить
const KEEP_CATEGORIES = [
  'Օրորոցներ',
  'Կահույք', 
  'Հավաքածուներ',
  'Քողեր',
  'Հյուսեր',
  'Երաժշտական Խաղալիքներ',
  'Անկողնային Պարագաներ',
  'Մանկական Սենյակի Դեկորներ',
  'Ներքնակներ',
  'Խաղալիքներ',
  'Հագուստ'
]

async function cleanupCategories() {
  try {
    console.log('🧹 Начинаем очистку категорий...')
    
    // Получаем все категории
    const allCategories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        isActive: true
      }
    })

    console.log(`📊 Всего категорий в БД: ${allCategories.length}`)
    
    // Находим категории для удаления
    const categoriesToDelete = allCategories.filter(cat => 
      !KEEP_CATEGORIES.includes(cat.name)
    )
    
    console.log(`🗑️ Категории для удаления: ${categoriesToDelete.length}`)
    categoriesToDelete.forEach(cat => {
      console.log(`   - ${cat.name} (ID: ${cat.id})`)
    })

    // Находим категории которые нужно оставить
    const categoriesToKeep = allCategories.filter(cat => 
      KEEP_CATEGORIES.includes(cat.name)
    )
    
    console.log(`✅ Категории которые остаются: ${categoriesToKeep.length}`)
    categoriesToKeep.forEach(cat => {
      console.log(`   - ${cat.name} (ID: ${cat.id})`)
    })

    // Проверяем какие категории из списка KEEP_CATEGORIES отсутствуют в БД
    const missingCategories = KEEP_CATEGORIES.filter(name => 
      !allCategories.some(cat => cat.name === name)
    )
    
    if (missingCategories.length > 0) {
      console.log(`➕ Категории которые нужно создать: ${missingCategories.length}`)
      missingCategories.forEach(name => {
        console.log(`   - ${name}`)
      })
    }

    // Создаем недостающие категории сначала
    if (missingCategories.length > 0) {
      console.log('\n➕ Создаем недостающие категории...')
      
      for (let i = 0; i < missingCategories.length; i++) {
        const categoryName = missingCategories[i]
        const sortOrder = i + 1
        
        await prisma.category.create({
          data: {
            name: categoryName,
            description: `Արտադրանք ${categoryName.toLowerCase()}`,
            sortOrder: sortOrder,
            isActive: true,
            showInMainPage: true
          }
        })
        
        console.log(`   ✅ Создана категория: ${categoryName}`)
      }
    }

    // Обновляем продукты, которые ссылаются на удаляемые категории
    console.log('\n🔄 Обновляем продукты...')
    
    for (const categoryToDelete of categoriesToDelete) {
      // Находим продукты с этой категорией
      const productsWithCategory = await prisma.product.findMany({
        where: {
          categoryId: categoryToDelete.id
        },
        select: {
          id: true,
          name: true
        }
      })

      if (productsWithCategory.length > 0) {
        console.log(`   📦 Найдено ${productsWithCategory.length} продуктов в категории "${categoryToDelete.name}"`)
        
        // Назначаем им категорию "Խաղալիքներ" как дефолтную
        const defaultCategory = await prisma.category.findFirst({
          where: {
            name: 'Խաղալիքներ'
          }
        })

        if (defaultCategory) {
          await prisma.product.updateMany({
            where: {
              categoryId: categoryToDelete.id
            },
            data: {
              categoryId: defaultCategory.id
            }
          })
          
          console.log(`   ✅ Обновлено ${productsWithCategory.length} продуктов -> категория "Խաղալիքներ"`)
        }
      }
    }

    // Теперь удаляем ненужные категории
    if (categoriesToDelete.length > 0) {
      console.log('\n🗑️ Удаляем ненужные категории...')
      
      const deleteResult = await prisma.category.deleteMany({
        where: {
          id: {
            in: categoriesToDelete.map(cat => cat.id)
          }
        }
      })
      
      console.log(`✅ Удалено категорий: ${deleteResult.count}`)
    }

    // Обновляем порядок сортировки для всех категорий
    console.log('\n🔄 Обновляем порядок сортировки...')
    
    for (let i = 0; i < KEEP_CATEGORIES.length; i++) {
      const categoryName = KEEP_CATEGORIES[i]
      const sortOrder = i + 1
      
      await prisma.category.updateMany({
        where: {
          name: categoryName
        },
        data: {
          sortOrder: sortOrder,
          isActive: true,
          showInMainPage: true
        }
      })
      
      console.log(`   ✅ Обновлена категория: ${categoryName} (порядок: ${sortOrder})`)
    }

    // Проверяем результат
    console.log('\n📋 Итоговый список категорий:')
    const finalCategories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        name: true,
        sortOrder: true,
        isActive: true,
        showInMainPage: true,
        _count: {
          select: {
            products: true
          }
        }
      }
    })

    finalCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (порядок: ${cat.sortOrder}, продуктов: ${cat._count.products})`)
    })

    console.log(`\n✅ Очистка завершена! Осталось категорий: ${finalCategories.length}`)

  } catch (error) {
    console.error('❌ Ошибка при очистке категорий:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanupCategories()
