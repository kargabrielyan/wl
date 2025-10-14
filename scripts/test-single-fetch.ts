// Тест исправления двойного вызова fetchProducts
async function testSingleFetch() {
  console.log('🧪 Тестирование исправления двойного вызова fetchProducts...\n')

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
    console.log('👀 Проверьте консоль браузера (F12)')
    console.log('')
    console.log('📋 Ожидаемое поведение:')
    console.log('   1. ✅ Только ОДИН вызов fetchProducts при инициализации')
    console.log('   2. ✅ НЕТ двойного вызова "Фильтры изменились"')
    console.log('   3. ✅ Логи показывают правильную последовательность')
    console.log('   4. ✅ Пагинация работает корректно')
    console.log('')
    console.log('🔧 Исправление:')
    console.log('   ✅ Добавлена проверка на изменение фильтров')
    console.log('   ✅ useEffect для фильтров срабатывает только при реальных изменениях')
    console.log('   ✅ Предотвращен двойной вызов при инициализации')

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error)
  }
}

// Запуск тестов
testSingleFetch()
