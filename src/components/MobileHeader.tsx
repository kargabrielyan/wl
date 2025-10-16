'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useInstantSearch } from '@/hooks/useInstantSearch'
import { SearchDropdown } from '@/components/SearchDropdown'

export default function MobileHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  // Instant search hook
  const {
    query,
    setQuery,
    results,
    loading,
    error,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
    clearSearch
  } = useInstantSearch({
    debounceMs: 200,
    minQueryLength: 2,
    maxResults: 4 // Меньше результатов для мобильного
  })

  const searchRef = useRef<HTMLDivElement>(null)

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  // Обработка клика по результату поиска
  const handleResultClick = (result: any) => {
    window.location.href = `/products/${result.id}`
    setIsOpen(false)
    setIsSearchOpen(false)
    clearSearch()
  }

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg fixed top-0 left-0 right-0 z-[100] border-b border-gray-200" style={{ position: 'fixed' }}>
      <div className="px-4 py-1.5">
        <div className="relative flex justify-between items-center">
          {/* Mobile Logo - Absolutely Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="hover:opacity-80 transition-all duration-300 hover:scale-105">
              <Image 
                src="/images/logo.png" 
                alt="Pideh Armenia Logo" 
                width={60} 
                height={18}
                className="h-4 w-auto"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-3 text-gray-900 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all duration-300 active:scale-95 ml-auto"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Search Bar with Instant Search */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-200 z-[100]">
            <div className="p-4">
               <div className="flex gap-3 relative" ref={searchRef}>
                 <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Поиск по меню..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                      if (query.length >= 2 && results.length > 0) {
                        setIsOpen(true)
                      }
                    }}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base text-gray-900 placeholder-gray-500 bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md focus:bg-white"
                    autoFocus
                    aria-controls="search-results-mobile"
                    aria-expanded={isOpen}
                    aria-autocomplete="list"
                  />
                  
                  {/* Clear button */}
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => {
                    if (query.trim()) {
                      // Перенаправляем на страницу продуктов с поисковым запросом
                      window.location.href = `/products?search=${encodeURIComponent(query)}`
                      setIsSearchOpen(false)
                      clearSearch()
                    }
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-primary-500 to-red-500 rounded-2xl flex items-center justify-center hover:from-primary-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <Search className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Mobile Search Dropdown */}
               <div className="mt-2">
                 <SearchDropdown
                   results={results}
                   loading={loading}
                   error={error}
                   isOpen={isOpen}
                   selectedIndex={selectedIndex}
                   onResultClick={handleResultClick}
                   onClose={() => setIsOpen(false)}
                   className="relative shadow-none border-0 rounded-xl w-full max-w-none"
                 />
               </div>
            </div>
          </div>
        )}

      </div>
    </header>
  )
}
