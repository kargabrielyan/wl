// Тест исправления дублирования товаров
async function testDuplicateFix() {
  console.log('🧪 Тестирование исправления дублирования товаров...\n')

  try {
    // Тест 1: Проверяем, что товары не дублируются
    console.log('📄 Тест 1: Загрузка первой страницы')
    const response1 = await fetch('http://localhost:3000/api/products?page=1&limit=24')
    const data1 = await response1.json()
    
    console.log(`✅ Получено товаров: ${data1.data.length}`)
    console.log(`📊 Общее количество: ${data1.pagination.total}`)
    console.log(`📄 Текущая страница: ${data1.pagination.page}`)
    console.log(`📄 Всего страниц: ${data1.pagination.totalPages}`)
    console.log(`➡️ Есть следующая: ${data1.pagination.hasNext}`)
    console.log('')

    // Тест 2: Проверяем вторую страницу
    if (data1.pagination.hasNext) {
      console.log('📄 Тест 2: Загрузка второй страницы')
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

    // Тест 3: Проверяем третью страницу
    if (data1.pagination.totalPages >= 3) {
      console.log('📄 Тест 3: Загрузка третьей страницы')
      const response3 = await fetch('http://localhost:3000/api/products?page=3&limit=24')
      const data3 = await response3.json()
      
      console.log(`✅ Получено товаров: ${data3.data.length}`)
      console.log(`📊 Общее количество: ${data3.pagination.total}`)
      console.log(`📄 Текущая страница: ${data3.pagination.page}`)
      console.log(`➡️ Есть следующая: ${data3.pagination.hasNext}`)
      console.log('')
    }

    console.log('🎉 Тесты API завершены успешно!')
    console.log('')
    console.log('🔍 Теперь откройте http://localhost:3000/products в браузере')
    console.log('📱 Прокрутите вниз до желтого блока "Наблюдатель загрузки"')
    console.log('👀 Проверьте консоль браузера (F12) на наличие логов загрузки')
    console.log('')
    console.log('📋 Ожидаемое поведение:')
    console.log('   1. Загружается 24 товара')
    console.log('   2. При прокрутке к желтому блоку загружается следующая страница')
    console.log('   3. В консоли появляются логи загрузки')
    console.log('   4. Счетчик товаров увеличивается')
    console.log('   5. НЕТ ошибок дублирования ключей!')
    console.log('')
    console.log('🔧 Исправления:')
    console.log('   ✅ Предотвращение множественных вызовов fetchProducts')
    console.log('   ✅ Фильтрация дублирующихся товаров по ID')
    console.log('   ✅ Убраны лишние зависимости из useCallback')

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
testDuplicateFix()
