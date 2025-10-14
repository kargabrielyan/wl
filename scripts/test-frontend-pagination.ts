// Тест фронтенда пагинации
async function testFrontendPagination() {
  console.log('🧪 Тестирование фронтенда пагинации...\n')

  try {
    // Проверяем, что страница товаров доступна
    console.log('🔍 Проверка доступности страницы товаров...')
    const response = await fetch('http://localhost:3000/products')
    
    if (!response.ok) {
      throw new Error(`Страница недоступна: ${response.status}`)
    }
    
    console.log('✅ Страница товаров доступна')
    console.log('')

    // Проверяем API пагинации
    console.log('📡 Проверка API пагинации...')
    const apiResponse = await fetch('http://localhost:3000/api/products?page=1&limit=24')
    const apiData = await apiResponse.json()
    
    console.log(`✅ API возвращает: ${apiData.data.length} товаров`)
    console.log(`📊 Всего товаров: ${apiData.pagination.total}`)
    console.log(`📄 Страниц: ${apiData.pagination.totalPages}`)
    console.log('')

    console.log('🎉 Фронтенд готов к тестированию!')
    console.log('')
    console.log('📋 Инструкции для тестирования:')
    console.log('   1. Откройте http://localhost:3000/products в браузере')
    console.log('   2. Откройте консоль разработчика (F12)')
    console.log('   3. Прокрутите страницу вниз')
    console.log('   4. Найдите желтый блок "Наблюдатель загрузки"')
    console.log('   5. При прокрутке к нему должны загружаться новые товары')
    console.log('')
    console.log('🔍 Что искать в консоли:')
    console.log('   - "🚀 Инициализация: загружаем первые товары"')
    console.log('   - "📡 fetchProducts вызван"')
    console.log('   - "🔄 Intersection Observer: загружаем следующую страницу"')
    console.log('   - "✅ Состояние обновлено"')
    console.log('')
    console.log('❌ Если не работает:')
    console.log('   - Проверьте, что желтый блок виден')
    console.log('   - Убедитесь, что hasMore: true')
    console.log('   - Проверьте, что loadingMore: false')
    console.log('   - Убедитесь, что в консоли нет ошибок')

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error)
  }
}

// Запуск тестов
testFrontendPagination()
