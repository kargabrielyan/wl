'use client'

import { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Product, Category } from '@/types'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import TwinklingStars from '@/components/TwinklingStars'

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
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('name-asc')
  const { addItem } = useCart()
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const selectedProductRef = useRef<HTMLDivElement>(null)

  // Константы пагинации
  const ITEMS_PER_PAGE = 24

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    }
  }

  // Оптимизированная функция сортировки
  const sortProducts = useCallback((products: Product[], sortBy: string): Product[] => {
    const sorted = [...products]
    
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name, 'ru'))
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      default:
        return sorted
    }
  }, [])

  // Оптимизированная функция фильтрации
  const filterProducts = useCallback(() => {
    let filtered = products
    
    // Фильтр по категории
    if (selectedCategory !== 'Բոլորը') {
      filtered = filtered.filter(product => {
        const category = categories.find(cat => cat.id === product.categoryId)
        return category?.name === selectedCategory
      })
    }
    
    // Фильтр по поиску
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.ingredients && product.ingredients.toLowerCase().includes(query))
      )
    }
    
    // Применяем сортировку
    filtered = sortProducts(filtered, sortBy)
    
    setFilteredProducts(filtered)
    setCurrentPage(1) // Сбрасываем на первую страницу
  }, [products, selectedCategory, debouncedSearchQuery, categories, sortBy, sortProducts])

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchProducts(),
        fetchCategories()
      ])
    }
    loadData()
  }, [])

  // Обработка URL параметров
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

  useEffect(() => {
    filterProducts()
  }, [filterProducts])

  const handleAddToCart = useCallback((product: Product) => {
    addItem(product, 1)
    setAddedToCart(prev => new Set(prev).add(product.id))
    
    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }, [addItem])

  // Пагинация
  const paginationData = useMemo(() => {
    const totalItems = filteredProducts.length
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
    
    return {
      totalItems,
      totalPages,
      paginatedProducts,
      startIndex,
      endIndex
    }
  }, [filteredProducts, currentPage, ITEMS_PER_PAGE])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value)
    setCurrentPage(1)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#002c45' }}>
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
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden relative" style={{ backgroundColor: '#002c45' }}>
      {/* Twinkling Stars */}
      <TwinklingStars count={60} imageStarRatio={0.3} />
      
      {/* Отступ для fixed хедера */}
      <div className="lg:hidden h-16"></div>
      <div className="hidden lg:block h-24"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Արտադրանքի կատալոգ</h1>
          {paginationData.totalPages > 1 && (
            <p className="text-gray-600">
              Էջ {currentPage} {paginationData.totalPages}-ից
            </p>
          )}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 lg:w-80 relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                searching ? 'text-primary-500 animate-pulse' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Փնտրել անվանումով, նկարագրությամբ կամ բաղադրիչներով..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg text-gray-900 placeholder-gray-600 bg-white transition-all duration-300 shadow-sm hover:shadow-md focus:bg-white"
              />
              {searching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
                </div>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex flex-wrap gap-4">
              {/* Кнопка "Все" */}
              <button
                onClick={() => setSelectedCategory('Բոլորը')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                  selectedCategory === 'Բոլորը'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                Բոլորը
              </button>
              
              {/* Динамические категории */}
              {Array.isArray(categories) && categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category.name
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort and Results Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Տեսակավորում:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
              >
                <option value="name-asc" className="text-gray-900">Անվանումով (Ա-Զ)</option>
                <option value="name-desc" className="text-gray-900">Անվանումով (Զ-Ա)</option>
                <option value="price-asc" className="text-gray-900">Գնով (աճման կարգով)</option>
                <option value="price-desc" className="text-gray-900">Գնով (նվազման կարգով)</option>
                <option value="newest" className="text-gray-900">Նորերը նախ</option>
                <option value="oldest" className="text-gray-900">Հիները նախ</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Ցուցադրված {paginationData.totalItems} արտադրանք
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 md:gap-6">
          {paginationData.paginatedProducts.map((product) => (
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

        {/* Simple Pagination */}
        {paginationData.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
              Նախորդ
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, paginationData.totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === page
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === paginationData.totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
              Հաջորդ
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            {debouncedSearchQuery ? (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  "{debouncedSearchQuery}" հարցման համար ոչինչ չի գտնվել
                </h3>
                <p className="text-gray-600 mb-6">
                  Փնտրումը կատարվել է ամբողջ մենյուում: Փորձեք փոխել որոնման հարցումը կամ ընտրել կատեգորիա
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
                    className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Ցուցադրել բոլոր արտադրանքը
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-500 text-lg">"{selectedCategory}" կատեգորիայում արտադրանք չի գտնվել</p>
                <p className="text-gray-400">Փորձեք ընտրել այլ կատեգորիա</p>
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

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#002c45' }}>
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
