'use client'

import { useState, useEffect, useRef } from 'react'
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

interface HorizontalCategorySliderProps {
  title?: string
  subtitle?: string
  limit?: number
}

export default function HorizontalCategorySlider({ 
  title = "Կատեգորիաներ", 
  subtitle = "Ընտրեք ձեր սիրելի կատեգորիան",
  limit = 9
}: HorizontalCategorySliderProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  const sliderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Навигация
  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return
    
    const container = containerRef.current
    const isMobile = window.innerWidth < 768
    const cardWidth = isMobile ? 208 : 280 // ширина карточки + gap (w-48 + gap-4 = 208px, w-64 + gap-6 = 280px)
    const scrollPosition = index * cardWidth
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
    
    setCurrentIndex(index)
  }

  const scrollNext = () => {
    const isMobile = window.innerWidth < 768
    const visibleCards = isMobile ? 1.5 : 3.5 // на мобильном показываем 1.5 карточки
    const maxIndex = Math.max(0, categories.length - Math.ceil(visibleCards))
    const nextIndex = Math.min(currentIndex + 1, maxIndex)
    scrollToIndex(nextIndex)
  }

  const scrollPrev = () => {
    const prevIndex = Math.max(0, currentIndex - 1)
    scrollToIndex(prevIndex)
  }

  // Touch/Swipe поддержка
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return
    const x = e.touches[0].pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Отслеживание текущей позиции при скролле
  const handleScroll = () => {
    if (!containerRef.current) return
    
    const container = containerRef.current
    const isMobile = window.innerWidth < 768
    const cardWidth = isMobile ? 208 : 280
    const newIndex = Math.round(container.scrollLeft / cardWidth)
    setCurrentIndex(newIndex)
  }

  if (loading) {
    return (
      <section className="py-12" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{title}</h2>
            <p className="text-gray-600 text-sm md:text-base">{subtitle}</p>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-hidden px-4 md:px-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-48 md:w-64 bg-gray-100 rounded-2xl p-4 md:p-6 animate-pulse">
                <div className="w-full h-24 md:h-32 bg-gray-200 rounded-xl mb-3 md:mb-4"></div>
                <div className="h-4 md:h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4"></div>
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
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{title}</h2>
          <p className="text-gray-600 text-sm md:text-base">{subtitle}</p>
        </div>

        {/* Слайдер контейнер */}
        <div className="relative">
          {/* Кнопка навигации влево */}
          <button
            onClick={scrollPrev}
            disabled={currentIndex === 0}
            className="nav-button absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-gray-100 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
            style={{ transform: 'translateY(-50%)' }}
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Кнопка навигации вправо */}
          <button
            onClick={scrollNext}
            disabled={currentIndex >= Math.max(0, categories.length - 3)}
            className="nav-button absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-gray-100 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
            style={{ transform: 'translateY(-50%)' }}
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Слайдер */}
          <div
            ref={containerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-0"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
          >
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-48 md:w-64"
                style={{ scrollSnapAlign: 'start' }}
              >
                <Link
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group block bg-white rounded-2xl p-4 md:p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-gray-300"
                >
                  {/* Изображение категории */}
                  <div className="relative w-full h-24 md:h-32 mb-3 md:mb-4 rounded-xl overflow-hidden">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
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
                      className="w-full h-full flex items-center justify-center text-4xl md:text-5xl bg-gray-100"
                      style={{ display: category.image ? 'none' : 'flex' }}
                    >
                      🎯
                    </div>
                  </div>

                  {/* Название категории */}
                  <h3 className="text-gray-900 font-semibold text-base md:text-lg text-center group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                    {category.name}
                  </h3>

                  {/* Описание (если есть) */}
                  {category.description && (
                    <p className="text-gray-600 text-xs md:text-sm text-center mt-1 md:mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Индикаторы */}
          <div className="flex justify-center mt-4 md:mt-6 space-x-2">
            {Array.from({ length: Math.max(1, categories.length - 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gray-800 w-6 md:w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Кнопка "Показать все" */}
        <div className="text-center mt-6 md:mt-8">
          <Link
            href="/products"
            className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 border border-gray-900 hover:border-gray-800 text-sm md:text-base shadow-lg hover:shadow-xl"
          >
            Դիտել բոլոր կատեգորիաները
            <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Дополнительные стили для стрелок навигации */
        .nav-button {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-button:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          transform: translateY(-50%) scale(1.1);
        }
        
        .nav-button:active {
          transform: translateY(-50%) scale(0.95);
        }
        
        .nav-button:disabled {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </section>
  )
}
