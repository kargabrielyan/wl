import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// Маппинг армянских названий категорий на транслитерацию (для поиска файлов)
// Основано на реальных именах файлов в папке public/images/
const categoryTranslitMap: Record<string, string[]> = {
  'Անկողնային Պարագաներ': ['ankoxnayin paraganner', 'ankoxnayin', 'paraganner'],
  'Օրորոցներ': ['ororocner kategoriya', 'ororocner', 'ororoc'],
  'Հավաքածուներ': ['havaqacuner kategoriya', 'havaqacuner', 'havaqacun'],
  'Կահույք': ['kahuyq kategoriya', 'kahuyq', 'kahu'],
  'Քողեր': ['qoxer kategoriya', 'qoxer', 'qox'],
  'Մանկական Սենյակի Դեկորներ': ['senyaki dekor', 'senyaki', 'dekor'],
  'Հյուսեր': ['hyuser', 'hyus'],
  'Երաժշտական Խաղալիքներ': ['erajshtakan xaxaliqner', 'erajshtakan', 'xaxaliqner'],
  'Ներքնակներ': ['nerqnakner', 'nerqnak'],
  'Խաղալիքներ': ['xaxaliqner', 'xaxaliq', 'toys'],
  'Հագուստ': ['hagust', 'clothing'],
  'Գրքեր': ['grqer', 'books'],
  'Սպորտ': ['sport', 'sports'],
  'Տրանսպորտ': ['transport', 'vehicles'],
}

// Маппинг названий категорий на изображения (прямой маппинг из папки categories)
const categoryImageMap: Record<string, string> = {
  // Русские названия (из seed-initial-data.ts)
  'Игрушки': '/images/categories/toys.jpg',
  'Одежда': '/images/categories/clothing.jpg',
  'Книги': '/images/categories/books.jpg',
  'Спорт': '/images/categories/sports.jpg',
  'Творчество': '/images/categories/creativity.jpg',
  'Мебель': '/images/categories/furniture.jpg',
  'Коляски': '/images/categories/cradles.jpg',
  'Конструкторы': '/images/categories/constructors.jpg',
  'Музыкальные игрушки': '/images/categories/musical-toys.jpg',
  'Транспорт': '/images/categories/vehicles.jpg',
}

// Функция для поиска файла по транслитерации
function findImageByTranslit(categoryName: string, imagesDir: string): string | null {
  const translitKeys = categoryTranslitMap[categoryName]
  if (!translitKeys) return null

  // Получаем список файлов в папке images
  const files = fs.readdirSync(imagesDir)
  
  // Сначала пробуем точное совпадение (с полным названием)
  for (const translitKey of translitKeys) {
    const translitLower = translitKey.toLowerCase()
    
    // Ищем файл, содержащий ключевое слово в названии
    const foundFile = files.find(file => {
      const fileNameLower = file.toLowerCase()
      // Убираем расширение для сравнения
      const fileNameWithoutExt = fileNameLower.replace(/\.(jpg|jpeg|png|webp)$/i, '')
      
      // Проверяем, содержит ли имя файла ключевое слово
      return fileNameWithoutExt.includes(translitLower) && 
             (file.endsWith('.jpg') || file.endsWith('.jpeg') || 
              file.endsWith('.png') || file.endsWith('.webp'))
    })
    
    if (foundFile) {
      return `/images/${foundFile}`
    }
  }
  
  return null
}

async function main() {
  console.log('🖼️  Начинаю назначение изображений категориям...\n')

  try {
    // Получаем все категории из базы данных
    const categories = await prisma.category.findMany()
    
    console.log(`📦 Найдено категорий: ${categories.length}\n`)

    // Путь к папке с изображениями
    const imagesDir = path.join(process.cwd(), 'public', 'images')
    
    let updated = 0
    let skipped = 0

    for (const category of categories) {
      let imagePath: string | null = null
      
      // Сначала пробуем найти по прямому маппингу
      if (categoryImageMap[category.name]) {
        imagePath = categoryImageMap[category.name]
      } else {
        // Если не найдено, ищем по транслитерации
        imagePath = findImageByTranslit(category.name, imagesDir)
      }
      
      if (imagePath) {
        // Проверяем, существует ли файл
        const filePath = path.join(process.cwd(), 'public', imagePath)
        const fileExists = fs.existsSync(filePath)
        
        if (fileExists) {
          await prisma.category.update({
            where: { id: category.id },
            data: { image: imagePath }
          })
          console.log(`✅ "${category.name}" -> ${imagePath}`)
          updated++
        } else {
          console.log(`⚠️  Файл не найден: ${imagePath} (для категории "${category.name}")`)
          skipped++
        }
      } else {
        console.log(`⚠️  Нет маппинга для категории: "${category.name}"`)
        skipped++
      }
    }

    console.log(`\n📊 Результат:`)
    console.log(`   ✅ Обновлено: ${updated}`)
    console.log(`   ⚠️  Пропущено: ${skipped}`)
    console.log(`\n🎉 Готово!`)

  } catch (error) {
    console.error('❌ Ошибка при назначении изображений:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
