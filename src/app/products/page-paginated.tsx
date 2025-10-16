'use client'

import { useState, useEffect, useCallback } from 'react'
import { Product } from '@/types'
import Pagination from '@/components/Pagination'

interface PaginatedResponse {
  items: Product[]
  page: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function ProductsPagePaginated() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async (page: number = 1) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/products?page=${page}&limit=24`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: PaginatedResponse = await response.json()
      
      // Проверяем структуру ответа
      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Invalid response format')
      }
      
      setProducts(data.items)
      setCurrentPage(data.page)
      setTotalPages(data.totalPages)
      setTotalItems(data.totalItems)
      
    } catch (error) {
      console.error('Error fetching products:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch products')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handlePageChange = useCallback(async (page: number) => {
    await fetchProducts(page)
    // Прокручиваем вверх страницы при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [fetchProducts])

  useEffect(() => {
    fetchProducts(1)
  }, [fetchProducts])

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Загрузка товаров...</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Ошибка загрузки</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => fetchProducts(1)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Արտադրանքի կատալոգ</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Ցուցադրված {products.length} {totalItems} արտադրանքից
            </p>
            <p className="text-gray-500 text-sm">
              Էջ {currentPage} {totalPages}-ից
            </p>
          </div>
        </div>
        
        {/* Товары */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/nophoto.jpg'
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    {product.salePrice ? (
                      <>
                        <span className="text-lg font-bold text-red-600">{product.salePrice} ֏</span>
                        <span className="text-sm text-gray-500 line-through">{product.price} ֏</span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-orange-600">{product.price} ֏</span>
                    )}
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
                    Купить
                  </button>
                </div>
                {product.stock && (
                  <p className="text-xs text-gray-500 mt-2">
                    В наличии: {product.stock} шт.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Пагинация */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mb-8"
        />

        {/* Информация о загрузке */}
        {loading && (
          <div className="text-center py-4">
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
              <span>Загрузка...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
