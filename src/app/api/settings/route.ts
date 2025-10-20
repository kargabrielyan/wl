import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - получить публичные настройки (без авторизации)
export async function GET() {
  try {
    const settings = await prisma.settings.findMany({
      where: {
        key: {
          in: ['logo', 'siteName', 'siteDescription', 'contactPhone', 'contactEmail', 'address']
        }
      }
    })
    
    // Преобразуем в объект для удобства
    const settingsObj = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(settingsObj)
  } catch (error) {
    console.error('Error fetching public settings:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
