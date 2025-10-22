import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateSettings() {
  try {
    console.log('🔄 Обновление настроек сайта...')
    
    // Обновляем настройки
    await prisma.settings.upsert({
      where: { key: 'logo' },
      update: { value: '/images/logo.png' },
      create: { key: 'logo', value: '/images/logo.png' }
    })
    
    await prisma.settings.upsert({
      where: { key: 'siteName' },
      update: { value: 'WelcomeBaby - Մանկական Աշխարհ' },
      create: { key: 'siteName', value: 'WelcomeBaby - Մանկական Աշխարհ' }
    })
    
    await prisma.settings.upsert({
      where: { key: 'siteDescription' },
      update: { value: 'WelcomeBaby - Խաղալիքներ, հագուստ, գրքեր երեխաների համար. Ուրախություն և Զվարճություն' },
      create: { key: 'siteDescription', value: 'WelcomeBaby - Խաղալիքներ, հագուստ, գրքեր երեխաների համար. Ուրախություն և Զվարճություն' }
    })
    
    console.log('✅ Настройки успешно обновлены!')
  } catch (error) {
    console.error('❌ Ошибка:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateSettings()
