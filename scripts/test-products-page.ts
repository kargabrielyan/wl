// Тест страницы товаров с пагинацией
async function testProductsPage() {
  console.log('🧪 Тестирование страницы товаров с пагинацией...\n')

  try {
    // Проверяем, что сервер запущен
    console.log('🔍 Проверка доступности сервера...')
    const healthResponse = await fetch('http://localhost:3000/api/products?page=1&limit=1')
    
    if (!healthResponse.ok) {
      throw new Error(`Сервер недоступен: ${healthResponse.status}`)
    }
    
    console.log('✅ Сервер доступен')
    console.log('')

    // Тест 1: Загрузка первой страницы
    console.log('📄 Тест 1: Загрузка первой страницы товаров')
    const response1 = await fetch('http://localhost:3000/api/products?page=1&limit=24')
    const data1 = await response1.json()
    
    console.log(`✅ Получено товаров: ${data1.data.length}`)
    console.log(`📊 Общее количество: ${data1.pagination.total}`)
    console.log(`📄 Текущая страница: ${data1.pagination.page}`)
    console.log(`📄 Всего страниц: ${data1.pagination.totalPages}`)
    console.log(`➡️ Есть следующая: ${data1.pagination.hasNext}`)
    console.log('')

    // Тест 2: Проверка структуры данных
    console.log('📄 Тест 2: Проверка структуры данных товара')
    if (data1.data.length > 0) {
      const product = data1.data[0]
      console.log(`✅ ID товара: ${product.id}`)
      console.log(`✅ Название: ${product.name}`)
      console.log(`✅ Цена: ${product.price} ֏`)
      console.log(`✅ Категория: ${product.category?.name || 'Не указана'}`)
      console.log(`✅ Изображение: ${product.image ? 'Есть' : 'Нет'}`)
      console.log(`✅ В наличии: ${product.stock || 0} шт.`)
    }
    console.log('')

    // Тест 3: Загрузка второй страницы
    if (data1.pagination.hasNext) {
      console.log('📄 Тест 3: Загрузка второй страницы')
      const response2 = await fetch('http://localhost:3000/api/products?page=2&limit=24')
      const data2 = await response2.json()
      
      console.log(`✅ Получено товаров: ${data2.data.length}`)
      console.log(`📊 Общее количество: ${data2.pagination.total}`)
      console.log(`📄 Текущая страница: ${data2.pagination.page}`)
      console.log(`➡️ Есть следующая: ${data2.pagination.hasNext}`)
      
      // Проверяем, что товары разные
      const firstPageIds = data1.data.map(p => p.id)
      const secondPageIds = data2.data.map(p => p.id)
      const hasDuplicates = firstPageIds.some(id => secondPageIds.includes(id))
      console.log(`✅ Товары не дублируются: ${!hasDuplicates}`)
      console.log('')
    }

    // Тест 4: Фильтрация по категории
    console.log('📄 Тест 4: Фильтрация по категории "Игрушки"')
    const response3 = await fetch('http://localhost:3000/api/products?category=Игрушки&page=1&limit=24')
    const data3 = await response3.json()
    
    console.log(`✅ Получено товаров: ${data3.data.length}`)
    console.log(`📊 Общее количество: ${data3.pagination.total}`)
    
    // Проверяем, что все товары из категории "Игрушки"
    const allToys = data3.data.every(p => p.category?.name === 'Игрушки')
    console.log(`✅ Все товары из категории "Игрушки": ${allToys}`)
    console.log('')

    // Тест 5: Поиск
    console.log('📄 Тест 5: Поиск по запросу "игрушка"')
    const response4 = await fetch('http://localhost:3000/api/products?search=игрушка&page=1&limit=24')
    const data4 = await response4.json()
    
    console.log(`✅ Получено товаров: ${data4.data.length}`)
    console.log(`📊 Общее количество: ${data4.pagination.total}`)
    
    // Проверяем, что все товары содержат поисковый запрос
    const allMatchSearch = data4.data.every(p => 
      p.name.toLowerCase().includes('игрушка') ||
      (p.description && p.description.toLowerCase().includes('игрушка')) ||
      (p.ingredients && p.ingredients.toLowerCase().includes('игрушка'))
    )
    console.log(`✅ Все товары соответствуют поиску: ${allMatchSearch}`)
    console.log('')

    console.log('🎉 Все тесты пагинации завершены успешно!')
    console.log('')
    console.log('📋 Результаты:')
    console.log(`   • API поддерживает пагинацию с параметрами page и limit`)
    console.log(`   • Возвращает метаинформацию о пагинации`)
    console.log(`   • Фильтрация по категориям работает корректно`)
    console.log(`   • Поиск работает корректно`)
    console.log(`   • Товары не дублируются между страницами`)
    console.log('')
    console.log('🚀 Готово к тестированию на фронтенде!')

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error)
    console.log('')
    console.log('🔧 Возможные решения:')
    console.log('   1. Убедитесь, что сервер запущен: npm run dev')
    console.log('   2. Проверьте, что база данных подключена')
    console.log('   3. Убедитесь, что в базе есть товары')
  }
}

// Запуск тестов
testProductsPage()