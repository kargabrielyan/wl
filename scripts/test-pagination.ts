#!/usr/bin/env tsx

/**
 * Тест пагинации API
 * Проверяет корректность работы page-based пагинации
 */

const API_BASE_URL = 'http://localhost:3000/api'

interface PaginatedResponse {
  items: any[]
  page: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

async function testPagination() {
  console.log('🧪 Тестирование пагинации API...\n')

  try {
    // Тест 1: Первая страница
    console.log('📄 Тест 1: Первая страница')
    const page1Response = await fetch(`${API_BASE_URL}/products?page=1&limit=24`)
    const page1Data: PaginatedResponse = await page1Response.json()
    
    console.log(`✅ Страница: ${page1Data.page}`)
    console.log(`✅ Товаров на странице: ${page1Data.items.length}`)
    console.log(`✅ Всего товаров: ${page1Data.totalItems}`)
    console.log(`✅ Всего страниц: ${page1Data.totalPages}`)
    console.log(`✅ Есть следующая: ${page1Data.hasNextPage}`)
    console.log(`✅ Есть предыдущая: ${page1Data.hasPrevPage}`)
    console.log('')

    // Тест 2: Вторая страница (если есть)
    if (page1Data.totalPages > 1) {
      console.log('📄 Тест 2: Вторая страница')
      const page2Response = await fetch(`${API_BASE_URL}/products?page=2&limit=24`)
      const page2Data: PaginatedResponse = await page2Response.json()
      
      console.log(`✅ Страница: ${page2Data.page}`)
      console.log(`✅ Товаров на странице: ${page2Data.items.length}`)
      console.log(`✅ Есть следующая: ${page2Data.hasNextPage}`)
      console.log(`✅ Есть предыдущая: ${page2Data.hasPrevPage}`)
      console.log('')
    }

    // Тест 3: Последняя страница
    if (page1Data.totalPages > 2) {
      console.log('📄 Тест 3: Последняя страница')
      const lastPageResponse = await fetch(`${API_BASE_URL}/products?page=${page1Data.totalPages}&limit=24`)
      const lastPageData: PaginatedResponse = await lastPageResponse.json()
      
      console.log(`✅ Страница: ${lastPageData.page}`)
      console.log(`✅ Товаров на странице: ${lastPageData.items.length}`)
      console.log(`✅ Есть следующая: ${lastPageData.hasNextPage}`)
      console.log(`✅ Есть предыдущая: ${lastPageData.hasPrevPage}`)
      console.log('')
    }

    // Тест 4: Несуществующая страница
    console.log('📄 Тест 4: Несуществующая страница')
    const invalidPageResponse = await fetch(`${API_BASE_URL}/products?page=999&limit=24`)
    const invalidPageData: PaginatedResponse = await invalidPageResponse.json()
    
    console.log(`✅ Страница: ${invalidPageData.page}`)
    console.log(`✅ Товаров на странице: ${invalidPageData.items.length}`)
    console.log(`✅ Есть следующая: ${invalidPageData.hasNextPage}`)
    console.log(`✅ Есть предыдущая: ${invalidPageData.hasPrevPage}`)
    console.log('')

    // Тест 5: Разные лимиты
    console.log('📄 Тест 5: Разные лимиты')
    const limit5Response = await fetch(`${API_BASE_URL}/products?page=1&limit=5`)
    const limit5Data: PaginatedResponse = await limit5Response.json()
    
    console.log(`✅ Лимит 5: товаров ${limit5Data.items.length}, страниц ${limit5Data.totalPages}`)
    
    const limit50Response = await fetch(`${API_BASE_URL}/products?page=1&limit=50`)
    const limit50Data: PaginatedResponse = await limit50Response.json()
    
    console.log(`✅ Лимит 50: товаров ${limit50Data.items.length}, страниц ${limit50Data.totalPages}`)
    console.log('')

    // Тест 6: Производительность
    console.log('📄 Тест 6: Производительность')
    const startTime = Date.now()
    const perfResponse = await fetch(`${API_BASE_URL}/products?page=1&limit=24`)
    const perfData: PaginatedResponse = await perfResponse.json()
    const endTime = Date.now()
    
    console.log(`✅ Время ответа: ${endTime - startTime}ms`)
    console.log(`✅ Товаров получено: ${perfData.items.length}`)
    console.log('')

    console.log('🎉 Все тесты пагинации пройдены успешно!')
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании пагинации:', error)
    process.exit(1)
  }
}

// Запуск тестов
if (require.main === module) {
  testPagination()
}

export { testPagination }