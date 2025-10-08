'use client'

import { SearchResult } from '@/hooks/useInstantSearch'
import { Search, X, Loader2 } from 'lucide-react'
import { memo, useMemo } from 'react'

interface SearchDropdownProps {
  results: SearchResult[]
  loading: boolean
  error: string | null
  isOpen: boolean
  selectedIndex: number
  onResultClick: (result: SearchResult) => void
  onClose: () => void
  className?: string
}

export const SearchDropdown = memo(function SearchDropdown({
  results,
  loading,
  error,
  isOpen,
  selectedIndex,
  onResultClick,
  onClose,
  className = ''
}: SearchDropdownProps) {
  // Мемоизируем состояние для оптимизации
  const hasResults = useMemo(() => results.length > 0, [results.length])
  const showEmptyState = useMemo(() => !loading && !error && !hasResults, [loading, error, hasResults])
  const showResults = useMemo(() => !loading && !error && hasResults, [loading, error, hasResults])

  if (!isOpen) return null

  return (
    <div className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center text-sm text-gray-600">
          <Search className="h-4 w-4 mr-2" />
          Результаты поиска
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="py-2">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            <span className="ml-2 text-gray-600">Поиск...</span>
          </div>
        )}

        {error && (
          <div className="px-4 py-3 text-center text-red-600 text-sm">
            {error}
          </div>
        )}

        {showEmptyState && (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>Товары не найдены</p>
            <p className="text-xs mt-1">Попробуйте изменить запрос</p>
          </div>
        )}

        {showResults && (
          <div className="space-y-1">
            {results.map((result, index) => (
              <SearchResultItem
                key={result.id}
                result={result}
                isSelected={index === selectedIndex}
                onClick={() => onResultClick(result)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {showResults && (
        <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-500 text-center">
          Используйте ↑↓ для навигации, Enter для выбора, Esc для закрытия
        </div>
      )}
    </div>
  )
})

interface SearchResultItemProps {
  result: SearchResult
  isSelected: boolean
  onClick: () => void
}

const SearchResultItem = memo(function SearchResultItem({
  result,
  isSelected,
  onClick
}: SearchResultItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-orange-50 border-r-2 border-orange-500' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Product Image */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
          {result.image ? (
            <img
              src={result.image}
              alt={result.name}
              className="w-full h-full object-cover"
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
            className="w-full h-full flex items-center justify-center text-gray-400"
            style={{ display: result.image ? 'none' : 'flex' }}
          >
            <Search className="h-6 w-6" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {result.name}
          </h4>
          <p className="text-xs text-gray-500 truncate mt-1">
            {result.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-semibold text-orange-600">
              {result.price} ֏
            </span>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
              {result.category}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
})
