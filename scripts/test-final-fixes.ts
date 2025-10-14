// Тест финальных исправлений
async function testFinalFixes() {
  console.log('🧪 Тестирование финальных исправлений...\n')

  try {
    // Тест 1: Проверяем API
    console.log('📡 Тест 1: Проверка API')
    const response = await fetch('http://localhost:3000/api/products?page=1&limit=24')
    const data = await response.json()
    
    console.log(`✅ API работает: ${data.data.length} товаров`)
    console.log(`📊 Всего товаров: ${data.pagination.total}`)
    console.log(`📄 Страниц: ${data.pagination.totalPages}`)
    console.log('')

    // Тест 2: Проверяем фронтенд
    console.log('🌐 Тест 2: Проверка фронтенда')
    const pageResponse = await fetch('http://localhost:3000/products')
    
    if (pageResponse.ok) {
      console.log('✅ Страница товаров доступна')
    } else {
      throw new Error(`Страница недоступна: ${pageResponse.status}`)
    }
    console.log('')

    console.log('🎉 Все тесты прошли успешно!')
    console.log('')
    console.log('🔍 Теперь откройте http://localhost:3000/products в браузере')
    console.log('📱 Прокрутите вниз до желтого блока "Наблюдатель загрузки"')
    console.log('👀 Проверьте консоль браузера (F12)')
    console.log('')
    console.log('📋 Ожидаемое поведение:')
    console.log('   1. ✅ НЕТ hydration mismatch предупреждений')
    console.log('   2. ✅ Загружается 24 товара')
    console.log('   3. ✅ При прокрутке загружаются новые товары')
    console.log('   4. ✅ НЕТ дублирования товаров')
    console.log('   5. ✅ НЕТ множественных вызовов fetchProducts')
    console.log('   6. ✅ Логи показывают правильное количество товаров')
    console.log('')
    console.log('🔧 Исправления:')
    console.log('   ✅ Добавлена проверка isClient для предотвращения hydration mismatch')
    console.log('   ✅ Исправлена логика инициализации с isInitialized')
    console.log('   ✅ Объединены setProducts и setFilteredProducts')
    console.log('   ✅ Улучшена защита от множественных вызовов')

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error)
  }
}

// Запуск тестов
testFinalFixes()
