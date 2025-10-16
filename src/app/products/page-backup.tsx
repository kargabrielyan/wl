'use client'

import { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Filter, ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Product, Category } from '@/types'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('Բոլորը')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set())
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const { addItem } = useCart()
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const selectedProductRef = useRef<HTMLDivElement>(null)


  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      // API теперь возвращает массив напрямую
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([]) // Устанавливаем пустой массив в случае ошибки
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      // API возвращает массив напрямую, добавляем защиту
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([]) // Устанавливаем пустой массив в случае ошибки
    }
  }

  const filterProducts = useCallback(() => {
    let filtered = products
    // Если есть поисковый запрос, ищем по всем товарам
    if (debouncedSearchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) ||
        (product.ingredients && product.ingredients.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
      )
    } else {
      // Если нет поискового запроса, показываем товары выбранной категории
      if (selectedCategory !== 'Բոլորը') {
        filtered = filtered.filter(product => product.category?.name === selectedCategory)
      }
      // Если выбрано "Բոլորը", показываем все товары без фильтрации
    }
    setFilteredProducts(filtered)
  }, [products, selectedCategory, debouncedSearchQuery])

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchProducts(),
        fetchCategories()
      ])
    }
    loadData()
  }, [])

  // Обработка URL параметров для поиска
  useEffect(() => {
    const searchParam = searchParams.get('search')
    const selectedParam = searchParams.get('selected')
    
    if (searchParam) {
      setSearchQuery(searchParam)
      setDebouncedSearchQuery(searchParam)
      setSelectedCategory('Բոլորը') // Сбрасываем категорию при поиске
    }
    
    if (selectedParam) {
      setSelectedProductId(selectedParam)
    }
  }, [searchParams])

  // Прокрутка к выбранному товару
  useEffect(() => {
    if (selectedProductId && selectedProductRef.current) {
      setTimeout(() => {
        selectedProductRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }, 100)
    }
  }, [selectedProductId, filteredProducts])

  // Debounce search query
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    if (searchQuery !== debouncedSearchQuery) {
      setSearching(true)
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
      setSearching(false)
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery, debouncedSearchQuery])

  useEffect(() => {
    filterProducts()
  }, [filterProducts])


  const handleAddToCart = useCallback((product: Product) => {
    addItem(product, 1)
    setAddedToCart(prev => new Set(prev).add(product.id))
    
    // Убираем подсветку через 2 секунды
    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }, [addItem])


  // Компонент скелетона для карточки товара
  const ProductSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-56 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div className="h-12 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded mx-auto mb-4 w-64 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded mx-auto w-96 animate-pulse"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="flex flex-wrap gap-3">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-12 w-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <Footer />
        </div>
        <div className="lg:hidden h-16"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Отступ для fixed хедера */}
      <div className="lg:hidden h-16"></div>
      <div className="hidden lg:block h-24"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 lg:w-80 relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                searching ? 'text-orange-500 animate-pulse' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Поиск по названию, описанию или ингредиентам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg text-gray-900 placeholder-gray-500 bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md focus:bg-white"
              />
              {searching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                </div>
              )}
            </div>
          </div>

          {/* Category Filter - Mobile 2 rows, Desktop single row */}
          <div>
            {/* Mobile - 2 rows */}
            <div className="lg:hidden">
              <div className="space-y-3">
                {/* First row - Все, Игрушки, Одежда - 3 большие кнопки */}
                <div className="grid grid-cols-3 gap-3">
                  {['Բոլորը', 'Խաղալիքներ', 'Հագուստ'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-4 rounded-2xl font-bold transition-all duration-300 text-base ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
                      }`}
                      style={selectedCategory === category ? {
                        boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      } : {}}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                {/* Second row - остальные категории */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {Array.isArray(categories) && categories
                    .filter(cat => !['Խաղալիքներ', 'Հագուստ'].includes(cat.name))
                    .map((category) => (
                    <button
                      key={`mobile-${category.id}`}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-5 py-3 rounded-2xl font-semibold transition-all duration-300 text-sm ${
                        selectedCategory === category.name
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
                      }`}
                      style={selectedCategory === category.name ? {
                        boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      } : {}}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Desktop - single row */}
            <div className="hidden lg:flex flex-wrap gap-4">
              {/* Кнопка "Все" */}
              <button
                onClick={() => setSelectedCategory('Բոլորը')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                  selectedCategory === 'Բոլորը'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                }`}
                style={selectedCategory === 'Բոլորը' ? {
                  boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                } : {}}
              >
                Բոլորը
              </button>
              
              {/* Динамические категории */}
              {Array.isArray(categories) && categories.map((category) => (
                <button
                  key={`desktop-${category.id}`}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                  }`}
                  style={selectedCategory === category.name ? {
                    boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                  } : {}}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 md:gap-15">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              ref={selectedProductId === product.id ? selectedProductRef : null}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                variant="compact"
                addedToCart={addedToCart}
                isSelected={selectedProductId === product.id}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            {debouncedSearchQuery ? (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  По запросу "{debouncedSearchQuery}" ничего не найдено
                </h3>
                <p className="text-gray-600 mb-6">
                  Поиск выполнен по всему меню. Попробуйте изменить поисковый запрос или выбрать категорию
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setSearchQuery('')}
                    className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Очистить поиск
                  </button>
                  <button
                    onClick={() => setSelectedCategory('Բոլորը')}
                    className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Показать все товары
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-500 text-lg">Товары в категории "{selectedCategory}" не найдены</p>
                <p className="text-gray-400">Попробуйте выбрать другую категорию</p>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Footer - Hidden on mobile and tablet */}
      <div className="hidden lg:block">
        <Footer />
      </div>
      
      {/* Add bottom padding for mobile and tablet nav */}
      <div className="lg:hidden h-16"></div>
    </div>
  )
}

function ProductsPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded mx-auto mb-4 w-64 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded mx-auto w-96 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    <div className="h-12 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <Footer />
        </div>
        <div className="lg:hidden h-16"></div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  )
}

export default function ProductsPage() {
  return <ProductsPageWrapper />
}
