import { useState, useEffect, useCallback, useRef, useMemo } from 'react'

export interface SearchResult {
  id: string
  name: string
  description: string
  price: number
  image: string
  ingredients?: string
  category: string
  type: 'product'
}

interface UseInstantSearchOptions {
  debounceMs?: number
  minQueryLength?: number
  maxResults?: number
}

interface UseInstantSearchReturn {
  query: string
  setQuery: (query: string) => void
  results: SearchResult[]
  loading: boolean
  error: string | null
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  handleKeyDown: (e: React.KeyboardEvent) => void
  clearSearch: () => void
}

export function useInstantSearch({
  debounceMs = 300,
  minQueryLength = 2,
  maxResults = 8
}: UseInstantSearchOptions = {}): UseInstantSearchReturn {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Функция поиска
  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < minQueryLength) {
      setResults([])
      setLoading(false)
      return
    }

    // Отменяем предыдущий запрос
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Создаем новый AbortController
    abortControllerRef.current = new AbortController()

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `/api/search/instant?q=${encodeURIComponent(searchQuery)}&limit=${maxResults}`,
        {
          signal: abortControllerRef.current.signal
        }
      )

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`)
      }

      const data = await response.json()
      setResults(data.results || [])
      setSelectedIndex(-1)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Запрос был отменен, игнорируем ошибку
        return
      }
      
      console.error('Search error:', err)
      setError('Ошибка поиска')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [minQueryLength, maxResults])

  // Debounced search
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    if (query.trim()) {
      debounceTimeoutRef.current = setTimeout(() => {
        performSearch(query.trim())
      }, debounceMs)
    } else {
      setResults([])
      setLoading(false)
      setError(null)
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [query, performSearch, debounceMs])

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          const selectedResult = results[selectedIndex]
          // Переходим на страницу товара
          window.location.href = `/products?search=${encodeURIComponent(selectedResult.name)}`
          setIsOpen(false)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }, [isOpen, results, selectedIndex])

  // Очистка поиска
  const clearSearch = useCallback(() => {
    setQuery('')
    setResults([])
    setError(null)
    setLoading(false)
    setIsOpen(false)
    setSelectedIndex(-1)
  }, [])

  // Мемоизируем состояние для оптимизации
  const shouldShowDropdown = useMemo(() => {
    return query.length >= minQueryLength && results.length > 0
  }, [query.length, minQueryLength, results.length])

  // Обновляем состояние открытия при изменении результатов
  useEffect(() => {
    if (shouldShowDropdown) {
      setIsOpen(true)
    } else if (query.length < minQueryLength) {
      setIsOpen(false)
    }
  }, [shouldShowDropdown, query.length, minQueryLength])

  return {
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
  }
}
