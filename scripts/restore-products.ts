import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function restoreProducts() {
  try {
    console.log('🔄 Восстанавливаем продукты...')
    
    // Сначала получаем все категории
    const categories = await prisma.category.findMany()
    console.log(`📁 Найдено категорий: ${categories.length}`)
    
    if (categories.length === 0) {
      console.log('❌ Нет категорий! Сначала нужно создать категории.')
      return
    }
    
    // Создаем продукты для каждой категории
    const products = [
      // Օրորոցներ (Колыбели)
      {
        name: 'Դասական Օրորոց',
        description: 'Բարձրորակ փայտե օրորոց երեխաների համար',
        price: 45000,
        salePrice: 38000,
        image: '/images/nophoto.jpg',
        categoryName: 'Օրորոցներ',
        status: 'NEW',
        stock: 10,
        ingredients: 'Փայտ, անվտանգ ներկեր'
      },
      {
        name: 'Ժամանակակից Օրորոց',
        description: 'Ժամանակակից դիզայնի օրորոց',
        price: 55000,
        image: '/images/nophoto.jpg',
        categoryName: 'Օրորոցներ',
        status: 'CLASSIC',
        stock: 8,
        ingredients: 'Փայտ, մետաղ'
      },
      
      // Կահույք (Мебель)
      {
        name: 'Մանկական Մահճակ',
        description: 'Բարձրորակ մանկական մահճակ',
        price: 35000,
        salePrice: 30000,
        image: '/images/nophoto.jpg',
        categoryName: 'Կահույք',
        status: 'HIT',
        stock: 15,
        ingredients: 'Փայտ, անվտանգ ներկեր'
      },
      {
        name: 'Գրասեղան',
        description: 'Մանկական գրասեղան ուսման համար',
        price: 25000,
        image: '/images/nophoto.jpg',
        categoryName: 'Կահույք',
        status: 'CLASSIC',
        stock: 12,
        ingredients: 'Փայտ, մետաղ'
      },
      
      // Հավաքածուներ (Наборы)
      {
        name: 'Խաղալիքների Հավաքածու',
        description: 'Զարգացնող խաղալիքների հավաքածու',
        price: 15000,
        image: '/images/nophoto.jpg',
        categoryName: 'Հավաքածուներ',
        status: 'NEW',
        stock: 20,
        ingredients: 'Պլաստիկ, անվտանգ նյութեր'
      },
      
      // Քողեր (Шторы)
      {
        name: 'Մանկական Քողեր',
        description: 'Գեղեցիկ մանկական քողեր',
        price: 8000,
        image: '/images/nophoto.jpg',
        categoryName: 'Քողեր',
        status: 'CLASSIC',
        stock: 25,
        ingredients: 'Բամբակ, անվտանգ ներկեր'
      },
      
      // Հյուսեր (Плетение)
      {
        name: 'Զարգացնող Հյուսեր',
        description: 'Զարգացնող հյուսերի խաղալիք',
        price: 12000,
        image: '/images/nophoto.jpg',
        categoryName: 'Հյուսեր',
        status: 'NEW',
        stock: 18,
        ingredients: 'Բամբակ, փայտ'
      },
      
      // Երաժշտական Խաղալիքներ
      {
        name: 'Երաժշտական Խաղալիք',
        description: 'Երաժշտական խաղալիք երեխաների համար',
        price: 18000,
        salePrice: 15000,
        image: '/images/nophoto.jpg',
        categoryName: 'Երաժշտական Խաղալիքներ',
        status: 'HIT',
        stock: 14,
        ingredients: 'Պլաստիկ, էլեկտրոնիկա'
      },
      
      // Անկողնային Պարագաներ
      {
        name: 'Անկողնային Պարագաներ',
        description: 'Բարձրորակ անկողնային պարագաներ',
        price: 22000,
        image: '/images/nophoto.jpg',
        categoryName: 'Անկողնային Պարագաներ',
        status: 'CLASSIC',
        stock: 16,
        ingredients: 'Բամբակ, անվտանգ նյութեր'
      },
      
      // Մանկական Սենյակի Դեկորներ
      {
        name: 'Դեկորատիվ Էլեմենտներ',
        description: 'Գեղեցիկ դեկորատիվ էլեմենտներ',
        price: 5000,
        image: '/images/nophoto.jpg',
        categoryName: 'Մանկական Սենյակի Դեկորներ',
        status: 'NEW',
        stock: 30,
        ingredients: 'Պլաստիկ, փայտ'
      },
      
      // Ներքնակներ (Матрасы)
      {
        name: 'Մանկական Ներքնակ',
        description: 'Անվտանգ մանկական ներքնակ',
        price: 30000,
        salePrice: 25000,
        image: '/images/nophoto.jpg',
        categoryName: 'Ներքնակներ',
        status: 'HIT',
        stock: 10,
        ingredients: 'Բամբակ, անվտանգ նյութեր'
      }
    ]
    
    let createdCount = 0
    
    for (const productData of products) {
      const category = categories.find(cat => cat.name === productData.categoryName)
      
      if (!category) {
        console.log(`⚠️ Категория "${productData.categoryName}" не найдена, пропускаем продукт`)
        continue
      }
      
      await prisma.product.create({
        data: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          salePrice: productData.salePrice,
          image: productData.image,
          categoryId: category.id,
          status: productData.status as any,
          stock: productData.stock,
          ingredients: productData.ingredients
        }
      })
      
      createdCount++
      console.log(`✅ Создан продукт: ${productData.name}`)
    }
    
    console.log(`\n🎉 Создано ${createdCount} продуктов!`)
    
    // Показываем итоговую статистику
    const totalProducts = await prisma.product.count()
    console.log(`📊 Общее количество продуктов в базе: ${totalProducts}`)
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении продуктов:', error)
  } finally {
    await prisma.$disconnect()
  }
}

restoreProducts()
