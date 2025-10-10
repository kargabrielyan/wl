import fetch from 'node-fetch'

async function testProductsAPI() {
  try {
    console.log('🔍 Тестируем API товаров...')
    
    const response = await fetch('http://localhost:3000/api/products')
    const products = await response.json()
    
    console.log(`📦 Получено ${products.length} товаров`)
    
    // Показываем товары со скидками
    const productsWithDiscounts = products.filter(p => p.salePrice)
    
    console.log('\n🛍️ Товары со скидками:')
    productsWithDiscounts.forEach(product => {
      const discountPercent = Math.round(((product.price - product.salePrice) / product.price) * 100)
      console.log(`- ${product.name}`)
      console.log(`  Обычная цена: ${product.price} ֏`)
      console.log(`  Цена со скидкой: ${product.salePrice} ֏ (скидка ${discountPercent}%)`)
      console.log('')
    })
    
    if (productsWithDiscounts.length === 0) {
      console.log('❌ Нет товаров со скидками в API ответе!')
    }
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании API:', error)
  }
}

testProductsAPI()
