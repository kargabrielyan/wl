'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Category {
  id: string
  name: string
  description?: string
  image?: string
  sortOrder: number
  showInMainPage: boolean
  createdAt: string
}

interface CategoriesBlockProps {
  title?: string
  subtitle?: string
  limit?: number
}

export default function CategoriesBlock({ 
  title = "Կատեգորիաներ", 
  subtitle = "Ընտրեք ձեր սիրելի կատեգորիան",
  limit = 9
}: CategoriesBlockProps) {
  const sanitizeImageUrl = (value?: string | null): string | null => {
    if (!value) return null
    let url = String(value).trim()
    if (!url) return null
    // Игнорировать blob:/data:
    if (/^(blob:|data:)/i.test(url)) return null
    // Заменить обратные слеши на прямые
    url = url.replace(/\\/g, '/')
    // Удалить протокол и домен
    url = url.replace(/^https?:\/\/[^/]+/, '')
    // Обеспечить ведущий слеш
    if (!url.startsWith('/')) url = `/${url}`
    return url
  }
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/categories?showInMainPage=true&limit=${limit}`)
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-12" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse">
                <div className="w-full h-24 bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-12" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        {/* Сетка категорий */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 hover:border-gray-300"
            >
              {/* Изображение категории (квадрат) */}
              <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                {sanitizeImageUrl(category.image) ? (
                  <Image
                    key={sanitizeImageUrl(category.image)!}
                    src={sanitizeImageUrl(category.image)!}
                    alt={category.name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                      if (nextElement) {
                        nextElement.style.display = 'flex'
                      }
                    }}
                  />
                ) : null}
                <div 
                  className="w-full h-full flex items-center justify-center text-4xl bg-gray-200"
                  style={{ display: category.image ? 'none' : 'flex' }}
                >
                  🎯
                </div>
              </div>

              {/* Название категории */}
              <h3 className="text-gray-900 font-semibold text-sm text-center group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                {category.name}
              </h3>

              {/* Описание (если есть) */}
              {category.description && (
                <p className="text-gray-600 text-xs text-center mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Кнопка "Показать все" */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300 hover:scale-105 border border-primary-500"
          >
            Դիտել բոլոր կատեգորիաները
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

