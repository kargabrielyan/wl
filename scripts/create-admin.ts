import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    // Проверяем, существует ли уже админ
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })

    if (existingAdmin) {
      console.log('Админский пользователь уже существует:', existingAdmin.email)
      return existingAdmin
    }

    // Создаем админского пользователя
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.user.create({
      data: {
        name: 'Администратор',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    console.log('Админский пользователь создан:')
    console.log('Email:', admin.email)
    console.log('Пароль: admin123')
    console.log('Роль:', admin.role)

    return admin
  } catch (error) {
    console.error('Ошибка при создании админского пользователя:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()


