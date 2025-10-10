'use client'

import { useEffect } from 'react'

export default function ServiceWorkerProvider() {
  useEffect(() => {
    // Простая проверка окружения
    if (typeof window === 'undefined') return
    
    // Отключаем Service Worker в режиме разработки
    if (process.env.NODE_ENV === 'development') {
      return
    }
    
    // Проверяем поддержку Service Worker
    if (!('serviceWorker' in navigator)) {
      return
    }

    // Простая регистрация без сложной логики
    try {
      navigator.serviceWorker.register('/sw.js')
        .then(() => {
          console.log('Service Worker registered')
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error)
        })
    } catch (error) {
      console.log('Service Worker error:', error)
    }
  }, [])

  return null
}