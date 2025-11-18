/**
 * Форматирует цену с запятой как разделителем тысяч
 * @param price - цена (число)
 * @returns отформатированная строка (например, "1,000")
 */
export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined || isNaN(price)) {
    return '0'
  }
  
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

