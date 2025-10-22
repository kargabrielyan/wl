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
  
  // Список невалидных путей (изображения которых нет в public/images)
  const invalidPaths = [
    'no-image',
    '/images/product-1.jpg',
    '/images/product-6.jpg',
    '/images/product-7.jpg',
    '/images/product-8.jpg',
    '/images/product-11.jpg',
    '/images/product-17.jpg',
    '/images/product-19.jpg',
    '/images/product-23.jpg',
    '/images/product-24.jpg',
    '/images/product-27.jpg',
    '/images/product-28.jpg',
    '/images/product-29.jpg',
    '/images/product-30.jpg',
    '/images/product-34.jpg',
    '/images/product-35.jpg',
    '/images/product-36.jpg',
    '/images/product-45.jpg',
    '/images/product-46.jpg',
    '/images/product-49.jpg',
    '/images/product-50.jpg',
    '/images/product-54.jpg',
    '/images/product-57.jpg',
    '/images/product-58.jpg',
    '/images/product-59.jpg',
    '/images/product-60.jpg',
    '/images/product-69.jpg',
    '/images/product-81.jpg',
    '/images/product-84.jpg',
    '/images/product-96.jpg',
    '/images/product-99.jpg',
    // Добавьте сюда другие невалидные пути по мере обнаружения
  ];
  
  return !invalidPaths.includes(imagePath);
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
