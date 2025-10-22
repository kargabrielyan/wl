import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    console.log('🔍 Проверяем пользователей в базе данных...')
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        createdAt: true
      }
    })
    
    console.log(`📊 Найдено пользователей: ${users.length}`)
    
    users.forEach((user, index) => {
      console.log(`\n👤 Пользователь ${index + 1}:`)
      console.log(`   ID: ${user.id}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Name: ${user.name}`)
      console.log(`   Role: ${user.role}`)
      console.log(`   Password hash: ${user.password ? 'Есть' : 'Нет'}`)
      console.log(`   Created: ${user.createdAt}`)
    })
    
    // Проверим конкретного пользователя
    const testUser = await prisma.user.findUnique({
      where: { email: 'gabrielyankaro67@gmail.com' }
    })
    
    if (testUser) {
      console.log('\n✅ Пользователь gabrielyankaro67@gmail.com найден!')
      console.log(`   Password hash: ${testUser.password ? 'Есть' : 'Нет'}`)
    } else {
      console.log('\n❌ Пользователь gabrielyankaro67@gmail.com НЕ найден!')
    }
    
  } catch (error) {
    console.error('❌ Ошибка при проверке пользователей:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()
