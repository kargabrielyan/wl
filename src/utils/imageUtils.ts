/**
 * Утилиты для работы с изображениями
 */

/**
 * Проверяет, является ли путь к изображению валидным
 * @param imagePath - путь к изображению
 * @returns true если изображение валидно, false если нет
 */
export function isValidImagePath(imagePath: string | null | undefined): boolean {
  if (!imagePath) return false;
  
  // Проверяем, что путь начинается с /images/
  if (!imagePath.startsWith('/images/')) {
    return false;
  }
  
  // Проверяем формат файла
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];
  const hasValidExtension = validExtensions.some(ext => imagePath.toLowerCase().endsWith(ext));
  
  return hasValidExtension;
}

/**
 * Возвращает fallback изображение для товаров без картинки
 * @returns путь к fallback изображению
 */
export function getFallbackImage(): string {
  return '/images/nophoto.jpg';
}

/**
 * Проверяет, является ли изображение placeholder'ом
 * @param imagePath - путь к изображению
 * @returns true если это placeholder
 */
export function isPlaceholderImage(imagePath: string | null | undefined): boolean {
  if (!imagePath) return true;
  
  const placeholderPaths = [
    'no-image',
    '/images/nophoto.jpg',
    '/images/placeholder-product.png',
    '/images/placeholder-product.svg',
  ];
  
  return placeholderPaths.includes(imagePath);
}
