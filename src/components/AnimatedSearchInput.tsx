'use client'

import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'

interface AnimatedSearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus: () => void
  clearSearch: () => void
  showClearButton: boolean
}

const PHRASES = [
  'խաղալիքներ',
  'հագուստ', 
  'գրքեր',
  'սպորտ',
  'ստեղծագործություն',
  'զարգացնող խաղեր'
]

export function AnimatedSearchInput({
  value,
  onChange,
  onKeyDown,
  onFocus,
  clearSearch,
  showClearButton,
  ...props
}: AnimatedSearchInputProps) {
  const [typed, setTyped] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [mode, setMode] = useState<'type' | 'erase'>('type')
  const [active, setActive] = useState(true)
  const tRef = useRef<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Константы для анимации
  const TYPE_DELAY = 70
  const ERASE_DELAY = 40
  const PAUSE_AFTER_TYPE = 1100
  const PAUSE_AFTER_ERASE = 300

  // Проверяем, печатает ли пользователь
  const isUserTyping = () => (inputRef.current?.value ?? '').length > 0

  // Основной эффект анимации
  useEffect(() => {
    if (!active || isUserTyping()) return
    
    const word = PHRASES[wordIdx]

    const tick = () => {
      if (mode === 'type') {
        if (charIdx <= word.length) {
          setTyped(word.slice(0, charIdx))
          setCharIdx(c => c + 1)
          tRef.current = window.setTimeout(tick, TYPE_DELAY)
        } else {
          tRef.current = window.setTimeout(() => setMode('erase'), PAUSE_AFTER_TYPE)
        }
      } else {
        if (charIdx > 0) {
          setTyped(word.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
          tRef.current = window.setTimeout(tick, ERASE_DELAY)
        } else {
          setWordIdx(i => (i + 1) % PHRASES.length)
          tRef.current = window.setTimeout(() => setMode('type'), PAUSE_AFTER_ERASE)
        }
      }
    }

    tRef.current = window.setTimeout(tick, TYPE_DELAY)
    
    return () => {
      if (tRef.current) clearTimeout(tRef.current)
    }
  }, [active, wordIdx, charIdx, mode])

  // Сброс индекса символа при смене слова
  useEffect(() => {
    setCharIdx(0)
  }, [wordIdx])

  // Обработчики фокуса
  const handleFocus = () => {
    setActive(false)
    onFocus()
  }

  const handleBlur = () => {
    if (!isUserTyping()) {
      setActive(true)
    }
  }

  // Обработчик изменения значения
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(false)
    onChange(e)
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
      <input
        ref={inputRef}
        type="search"
        placeholder={`Поиск ${typed || 'товаров...'}`}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 placeholder-gray-500 bg-gray-50 transition-all duration-300 hover:bg-white focus:bg-white"
        aria-controls="search-results"
        aria-expanded={props['aria-expanded']}
        aria-autocomplete="list"
        {...props}
      />
      
      {/* Clear button */}
      {showClearButton && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

