import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔌 Тестируем подключение к базе данных...')
    
    // Простой запрос для проверки подключения
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Подключение к базе данных работает!')
    console.log('Результат теста:', result)
    
    // Проверим таблицу пользователей
    const userCount = await prisma.user.count()
    console.log(`📊 Количество пользователей в таблице: ${userCount}`)
    
    // Проверим конкретного пользователя
    const user = await prisma.user.findUnique({
      where: { email: 'gabrielyankaro67@gmail.com' }
    })
    
    if (user) {
      console.log('✅ Пользователь найден в базе данных')
      console.log('   ID:', user.id)
      console.log('   Email:', user.email)
      console.log('   Role:', user.role)
      console.log('   Has password:', !!user.password)
    } else {
      console.log('❌ Пользователь не найден в базе данных')
    }
    
  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
