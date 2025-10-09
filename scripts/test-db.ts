import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('Testing database connection...')
    
    // Устанавливаем DATABASE_URL
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/detskiy_mir'
    }
    
    console.log('DATABASE_URL:', process.env.DATABASE_URL)
    
    // Тестируем подключение
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Тестируем запрос
    const userCount = await prisma.user.count()
    console.log('✅ User count:', userCount)
    
    // Тестируем админа
    const admin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })
    console.log('✅ Admin user:', admin?.email)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()


