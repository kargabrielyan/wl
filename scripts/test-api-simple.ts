#!/usr/bin/env tsx

/**
 * Простой тест API
 */

const API_BASE_URL = 'http://localhost:3000/api'

async function testAPI() {
  console.log('🧪 Тестирование API...\n')

  try {
    // Тест 1: Проверка доступности API
    console.log('📡 Тест 1: Проверка доступности API')
    const response = await fetch(`${API_BASE_URL}/products`)
    
    console.log(`✅ Статус: ${response.status}`)
    console.log(`✅ OK: ${response.ok}`)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log(`❌ Ошибка: ${errorText}`)
      return
    }
    
    const data = await response.json()
    console.log(`✅ Данные получены:`, {
      hasItems: !!data.items,
      hasData: !!data.data,
      itemsLength: data.items?.length || 0,
      dataLength: data.data?.length || 0
    })
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании API:', error)
  }
}

// Запуск тестов
if (require.main === module) {
  testAPI()
}

export { testAPI }
