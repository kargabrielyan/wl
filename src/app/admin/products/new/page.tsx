'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'
import ImageSelector from '@/components/ImageSelector'
import { Category } from '@/types'

const statuses = [
  { value: 'HIT', label: 'Хит продаж' },
  { value: 'NEW', label: 'Новинка' },
  { value: 'CLASSIC', label: 'Классика' },
  { value: 'BANNER', label: 'Баннер' }
]

export default function NewProductPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    categoryId: '',
    image: '',
    ingredients: '',
    isAvailable: true,
    status: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Загружаем категории
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    if (session?.user?.role === 'ADMIN') {
      fetchCategories()
    }
  }, [session])

  // Проверяем права доступа
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    router.push('/login')
    return null
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Подготавливаем данные
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
        ingredients: formData.ingredients ? formData.ingredients.split(',').map(i => i.trim()) : []
      }

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create product')
      }

      // Перенаправляем на страницу товаров
      router.push('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
      setError(error instanceof Error ? error.message : 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Отступ для fixed хедера */}
      <div className="lg:hidden h-16"></div>
      <div className="hidden lg:block h-24"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin/products">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Назад
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Добавить товар</h1>
              <p className="text-gray-600 mt-2">Создание нового товара в каталоге</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Информация о товаре</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-red-500" />
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Название */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название товара *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Введите название товара"
                    required
                  />
                </div>

                {/* Описание */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Введите описание товара"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white"
                    rows={3}
                    required
                  />
                </div>

                {/* Цена */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена (֏) *
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                {/* Скидочная цена */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Скидочная цена (֏)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.salePrice}
                    onChange={(e) => handleInputChange('salePrice', e.target.value)}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Оставьте пустым, если скидки нет
                  </p>
                </div>

                {/* Категория */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => handleInputChange('categoryId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white"
                    required
                  >
                    <option value="">Выберите категорию</option>
                    {categories.filter(cat => cat.isActive).map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Статус */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Статус товара
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="">Не выбрано (обычный товар)</option>
                    {statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Изображение */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Изображение товара
                  </label>
                  <ImageSelector
                    value={formData.image}
                    onChange={(imagePath) => handleInputChange('image', imagePath)}
                  />
                </div>

                {/* Ингредиенты */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ингредиенты
                  </label>
                  <Input
                    value={formData.ingredients}
                    onChange={(e) => handleInputChange('ingredients', e.target.value)}
                    placeholder="Ингредиент 1, Ингредиент 2, Ингредиент 3"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Разделите ингредиенты запятыми
                  </p>
                </div>

                {/* Доступность */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.isAvailable}
                      onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Товар доступен для заказа
                    </span>
                  </label>
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-300">
                <Link href="/admin/products">
                  <Button type="button" variant="outline">
                    Отмена
                  </Button>
                </Link>
                <Button type="submit" disabled={loading} className="flex items-center gap-2">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {loading ? 'Создание...' : 'Создать товар'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
