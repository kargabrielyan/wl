import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createManyProducts() {
  try {
    console.log('🔄 Создаем много продуктов...')
    
    // Получаем все категории
    const categories = await prisma.category.findMany()
    console.log(`📁 Найдено категорий: ${categories.length}`)
    
    if (categories.length === 0) {
      console.log('❌ Нет категорий!')
      return
    }
    
    // Шаблоны продуктов для каждой категории
    const productTemplates = {
      'Օրորոցներ': [
        'Դասական Օրորոց', 'Ժամանակակից Օրորոց', 'Կլասիկ Օրորոց', 'Մոդեռն Օրորոց',
        'Փայտե Օրորոց', 'Մետաղական Օրորոց', 'Կոմբինացված Օրորոց', 'Լյուքս Օրորոց'
      ],
      'Կահույք': [
        'Մանկական Մահճակ', 'Գրասեղան', 'Աթոռ', 'Դարակ', 'Գրադարակ',
        'Խաղալիքների Պահարան', 'Կոմոդ', 'Բազմոց', 'Սեղան'
      ],
      'Հավաքածուներ': [
        'Խաղալիքների Հավաքածու', 'Զարգացնող Հավաքածու', 'Կրթական Հավաքածու',
        'Խաղերի Հավաքածու', 'Ստեղծագործական Հավաքածու', 'Երաժշտական Հավաքածու'
      ],
      'Քողեր': [
        'Մանկական Քողեր', 'Գունավոր Քողեր', 'Դիզայներական Քողեր',
        'Անթափանց Քողեր', 'Թեթև Քողեր', 'Գիշերային Քողեր'
      ],
      'Հյուսեր': [
        'Զարգացնող Հյուսեր', 'Գունավոր Հյուսեր', 'Խաղալիքների Հյուսեր',
        'Կրթական Հյուսեր', 'Ստեղծագործական Հյուսեր', 'Բազմագույն Հյուսեր'
      ],
      'Երաժշտական Խաղալիքներ': [
        'Երաժշտական Խաղալիք', 'Դաշնամուր', 'Երգեհոն', 'Կիթառ',
        'Թմբուկ', 'Ֆլեյտա', 'Երաժշտական Հավաքածու', 'Երաժշտական Գործիքներ'
      ],
      'Անկողնային Պարագաներ': [
        'Անկողնային Պարագաներ', 'Բարձեր', 'Ներքնակներ', 'Պարսետներ',
        'Ծածկոցներ', 'Բարձի Երեսներ', 'Անկողնային Հավաքածու'
      ],
      'Մանկական Սենյակի Դեկորներ': [
        'Դեկորատիվ Էլեմենտներ', 'Պաստառներ', 'Նկարներ', 'Լուսամփոփներ',
        'Կախովի Էլեմենտներ', 'Ստատուետներ', 'Դեկորատիվ Քառակուսիներ'
      ],
      'Ներքնակներ': [
        'Մանկական Ներքնակ', 'Բարձրորակ Ներքնակ', 'Անվտանգ Ներքնակ',
        'Օրթոպեդիկ Ներքնակ', 'Կոշտ Ներքնակ', 'Փափուկ Ներքնակ'
      ]
    }
    
    const statuses = ['NEW', 'HIT', 'CLASSIC', 'BANNER']
    let createdCount = 0
    const targetCount = 580
    
    console.log(`🎯 Цель: создать ${targetCount} продуктов`)
    
    for (const category of categories) {
      const templates = productTemplates[category.name as keyof typeof productTemplates] || []
      
      // Создаем по 60-70 продуктов для каждой категории
      const productsPerCategory = Math.ceil(targetCount / categories.length)
      
      for (let i = 0; i < productsPerCategory; i++) {
        if (createdCount >= targetCount) break
        
        const templateIndex = i % templates.length
        const template = templates[templateIndex] || `${category.name} ${i + 1}`
        
        const productName = templates.length > 0 
          ? `${template} ${Math.floor(i / templates.length) + 1}`
          : `${category.name} ${i + 1}`
        
        const basePrice = 5000 + Math.random() * 45000 // 5000-50000
        const hasSale = Math.random() > 0.7 // 30% шанс скидки
        const salePrice = hasSale ? basePrice * 0.8 : null
        
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const stock = Math.floor(Math.random() * 20) + 5 // 5-25 штук
        
        await prisma.product.create({
          data: {
            name: productName,
            description: `${productName} - բարձրորակ արտադրանք երեխաների համար`,
            price: Math.round(basePrice),
            salePrice: salePrice ? Math.round(salePrice) : null,
            image: '/images/nophoto.jpg',
            categoryId: category.id,
            status: status as any,
            stock: stock,
            ingredients: 'Անվտանգ նյութեր, բարձր որակ'
          }
        })
        
        createdCount++
        
        if (createdCount % 50 === 0) {
          console.log(`📊 Создано ${createdCount} продуктов...`)
        }
      }
      
      console.log(`✅ Категория "${category.name}": создано продуктов`)
    }
    
    console.log(`\n🎉 Создано ${createdCount} продуктов!`)
    
    // Показываем итоговую статистику
    const totalProducts = await prisma.product.count()
    const productsByStatus = await prisma.product.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })
    
    console.log(`\n📊 Общее количество продуктов в базе: ${totalProducts}`)
    console.log('\n📋 Продукты по статусам:')
    productsByStatus.forEach(group => {
      console.log(`  ${group.status}: ${group._count.id} продуктов`)
    })
    
  } catch (error) {
    console.error('❌ Ошибка при создании продуктов:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createManyProducts()
