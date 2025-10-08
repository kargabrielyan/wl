/**
 * Утилиты для работы с ингредиентами
 */

/**
 * Разделяет строку ингредиентов на массив
 * @param ingredients - строка с ингредиентами, разделенными запятыми
 * @returns массив ингредиентов или пустой массив
 */
export function parseIngredients(ingredients: string | null | undefined): string[] {
  if (!ingredients || typeof ingredients !== 'string') {
    return []
  }
  
  return ingredients
    .split(',')
    .map(ingredient => ingredient.trim())
    .filter(ingredient => ingredient.length > 0)
}

/**
 * Проверяет, есть ли ингредиенты
 * @param ingredients - строка с ингредиентами
 * @returns true если есть ингредиенты, false если нет
 */
export function hasIngredients(ingredients: string | null | undefined): boolean {
  return parseIngredients(ingredients).length > 0
}
