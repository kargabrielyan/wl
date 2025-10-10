import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTestPage() {
  try {
    console.log('🔍 Создаем тестовую страницу для проверки скидок...')

    // Получаем товары со скидками
    const productsWithDiscounts = await prisma.product.findMany({
      where: {
        salePrice: {
          not: null
        }
      },
      include: {
        category: true
      }
    })

    console.log(`📦 Найдено ${productsWithDiscounts.length} товаров со скидками`)

    // Создаем HTML страницу для тестирования
    const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тест скидок</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-center">Тест отображения скидок</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${productsWithDiscounts.map(product => {
              const discountPercent = Math.round(((product.price - product.salePrice!) / product.price) * 100)
              return `
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-2">${product.name}</h3>
                    <p class="text-gray-600 mb-4">${product.category?.name || 'Без категории'}</p>
                    
                    <div class="mb-4">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl font-bold text-red-600">${product.salePrice} ֏</span>
                            <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                СКИДКА ${discountPercent}%
                            </span>
                        </div>
                        <span class="text-sm text-gray-400 line-through">${product.price} ֏</span>
                    </div>
                    
                    <button class="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                        Добавить в корзину
                    </button>
                </div>
              `
            }).join('')}
        </div>
        
        <div class="mt-8 text-center">
            <p class="text-gray-600">Всего товаров со скидками: ${productsWithDiscounts.length}</p>
        </div>
    </div>
</body>
</html>
    `

    // Сохраняем HTML файл
    const fs = require('fs')
    const path = require('path')
    
    const filePath = path.join(__dirname, '../public/test-discounts.html')
    fs.writeFileSync(filePath, html)
    
    console.log(`✅ Тестовая страница создана: http://localhost:3000/test-discounts.html`)
    console.log(`📊 Показано ${productsWithDiscounts.length} товаров со скидками`)
    
  } catch (error) {
    console.error('❌ Ошибка при создании тестовой страницы:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestPage()
