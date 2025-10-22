import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createUser() {
  try {
    const email = 'gabrielyankaro67@gmail.com'
    const password = 'admin123'
    
    // Проверяем, существует ли уже пользователь
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('Пользователь уже существует:', existingUser.email)
      return existingUser
    }

    // Создаем пользователя
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        name: 'Gabriel Yankaro',
        email: email,
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    console.log('✅ Пользователь создан:')
    console.log('Email:', user.email)
    console.log('Пароль:', password)
    console.log('Роль:', user.role)
    console.log('ID:', user.id)

    return user
  } catch (error) {
    console.error('❌ Ошибка при создании пользователя:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createUser()
