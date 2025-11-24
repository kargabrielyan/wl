/**
 * Утилита для получения дефолтных изображений категорий из public/images
 * Используется, если в базе данных нет изображения для категории
 */

export const getCategoryDefaultImage = (categoryName: string): string | null => {
  // Полный маппинг всех категорий на изображения из public/images
  // Приоритет: webp > png > JPG
  const imageMap: Record<string, string> = {
    // Основные категории (с заглавными буквами)
    'Օրորոցներ': '/images/ororocner kategoriya.webp',
    'Քողեր': '/images/qoxer kategoriya.webp',
    'Կահույք': '/images/kahuyq kategoriya.webp',
    'Հյուսեր': '/images/hyuser.webp',
    'Ներքնակներ': '/images/nerqnakner.webp',
    'Անկողնային Պարագաներ': '/images/ankoxnayin paraganner.webp',
    'Երաժշտական Խաղալիքներ': '/images/erajshtakan xaxaliqner.webp',
    'Մանկական Սենյակի Դեկորներ': '/images/senyaki dekor.webp',
    'Հավաքածուներ': '/images/havaqacuner kategoriya.webp',
    'Քույրիկների նկար': '/images/quyrikneri-nkar.webp',
    
    // Дополнительные категории из JPG файлов
    'Լոգանքի Պարագաներ': '/images/Լոգանքի պարագաներ.JPG',
    'Մանկասայլակի Հավաքածու': '/images/Մանկասայլակի հավաքածուներ.JPG',
    'Սպիտակեղեններ': '/images/Հավաքածուներ.JPG',
    'Դուրս Գրման Հավաքածու': '/images/Դուրս գրման հավաքածուներ.JPG',
    'Կերակրման Բարձեր': '/images/Կերակրման բարձեր.JPG',
    'Պահարաններ': '/images/Պահարաններ.JPG',
    'Գործած Ադիալներ': '/images/Գործած ադիալներ.JPG',
    'Գործած Զամբյուղներ': '/images/Գործած զամբյուղներ.JPG',
    'Օրթոպեդ Ներքնակներ': '/images/Օրթոպեդ ներքնակներ.JPG',
    
    // Альтернативные названия (с маленькими буквами)
    'Անկողնային պարագաներ': '/images/ankoxnayin paraganner.webp',
    'Երաժշտական խաղալիքներ': '/images/erajshtakan xaxaliqner.webp',
    'Մանկական սենյակի դեկորներ': '/images/senyaki dekor.webp',
    'Լոգանքի պարագաներ': '/images/Լոգանքի պարագաներ.JPG',
    'Մանկասայլակի հավաքածու': '/images/Մանկասայլակի հավաքածուներ.JPG',
    'Դուրս գրման հավաքածու': '/images/Դուրս գրման հավաքածուներ.JPG',
    'Կերակրման բարձեր': '/images/Կերակրման բարձեր.JPG',
    'Գործած ադիալներ': '/images/Գործած ադիալներ.JPG',
    'Գործած զամբյուղներ': '/images/Գործած զամբյուղներ.JPG',
    'Օրթոպեդ ներքնակներ': '/images/Օրթոպեդ ներքնակներ.JPG',
  }
  
  // Возвращаем изображение по точному совпадению
  if (imageMap[categoryName]) {
    return imageMap[categoryName]
  }
  
  // Если точного совпадения нет, возвращаем null
  // Компоненты будут использовать fallback (эмодзи или placeholder)
  return null
}

/**
 * Получить изображение категории с приоритетом:
 * 1. Изображение из БД (category.image)
 * 2. Дефолтное изображение из public/images
 * 3. null (будет показан placeholder)
 */
export const getCategoryImage = (category: { name: string; image?: string | null }): string | null => {
  // Сначала проверяем изображение из БД
  if (category.image) {
    // Санитизируем URL из БД
    let url = String(category.image).trim()
    if (url && !/^(blob:|data:)/i.test(url)) {
      url = url.replace(/\\/g, '/')
      url = url.replace(/^https?:\/\/[^/]+/, '')
      if (!url.startsWith('/')) url = `/${url}`
      return url
    }
  }
  
  // Если в БД нет изображения, используем дефолтное
  return getCategoryDefaultImage(category.name)
}

