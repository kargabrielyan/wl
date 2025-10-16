'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Product, Category } from '@/types'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

interface ProductsClientProps {
  products: Product[]
  categories: Category[]
}

export default function ProductsClientSimple({ products: initialProducts, categories: initialCategories }: ProductsClientProps) {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isClient, setIsClient] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('Բոլորը')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set())
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  
  const { addItem } = useCart()
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const selectedProductRef = useRef<HTMLDivElement>(null)

  // Обработка URL параметров для поиска
  useEffect(() => {
    const searchParam = searchParams.get('search')
    const selectedParam = searchParams.get('selected')
    
    if (searchParam) {
      setSearchQuery(searchParam)
      setDebouncedSearchQuery(searchParam)
      setSelectedCategory('Բոլորը')
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

  // Функция загрузки товаров с фильтрацией
  const fetchProducts = useCallback(async () => {
    console.log('📡 fetchProducts вызван:', { selectedCategory, debouncedSearchQuery })
    
    try {
      setLoading(true)

      const params = new URLSearchParams({
        limit: '1000' // Загружаем много товаров сразу
      })

      if (selectedCategory !== 'Բոլորը') {
        params.append('category', selectedCategory)
      }

      if (debouncedSearchQuery) {
        params.append('search', debouncedSearchQuery)
      }

      console.log('🌐 Запрос к API:', `/api/products?${params}`)
      
      const response = await fetch(`/api/products?${params}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      console.log('📦 Ответ API получен:', { 
        dataLength: result.items?.length || result.data?.length, 
        total: result.totalItems || result.pagination?.total
      })

      // Поддерживаем оба формата ответа (старый и новый)
      const productsData = result.items || result.data
      
      if (productsData && Array.isArray(productsData)) {
        setProducts(productsData)
        setFilteredProducts(productsData)
        console.log('✅ Товары загружены:', productsData.length)
      } else {
        console.warn('⚠️ Некорректные данные от API:', result)
        setProducts([])
        setFilteredProducts([])
      }
    } catch (error) {
      console.error('❌ Error fetching products:', error)
      setProducts([])
      setFilteredProducts([])
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, debouncedSearchQuery])

  // Устанавливаем isClient после монтирования
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Загрузка товаров при изменении фильтров
  useEffect(() => {
    if (isClient && (selectedCategory !== 'Բոլորը' || debouncedSearchQuery !== '')) {
      console.log('🔄 Фильтры изменились, загружаем товары')
      fetchProducts()
    }
  }, [selectedCategory, debouncedSearchQuery, isClient, fetchProducts])

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Показываем загрузку до инициализации клиента
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загружаем товары...</p>
          </div>
        </div>
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

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory('Բոլորը')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                selectedCategory === 'Բոլորը'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
              }`}
              >
                Բոլորը
              </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 md:gap-6">
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

        {/* Информация о количестве товаров */}
        {filteredProducts.length > 0 && (
          <div className="text-center py-4 text-gray-600">
            Ցուցադրված {filteredProducts.length} արտադրանք
          </div>
        )}

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Товары не найдены
            </h3>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить поисковый запрос или выбрать другую категорию
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('Բոլորը')
                }}
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
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="hidden lg:block">
        <Footer />
      </div>
      
      {/* Add bottom padding for mobile nav */}
      <div className="lg:hidden h-16"></div>
    </div>
  )
}
