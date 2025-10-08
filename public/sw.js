// Service Worker для кэширования и оптимизации производительности
const CACHE_NAME = 'pideh-armenia-v1.0.2'

// Файлы для кэширования (только статические ресурсы)
const STATIC_FILES = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/logo.png'
]

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files')
        return cache.addAll(STATIC_FILES)
          .catch((error) => {
            console.warn('Service Worker: Some files failed to cache:', error)
            return Promise.resolve()
          })
      })
      .then(() => {
        console.log('Service Worker: Installation complete')
        return self.skipWaiting()
      })
  )
})

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activation complete')
        return self.clients.claim()
      })
  )
})

// Перехват запросов - простой подход без дублирования
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Обрабатываем только GET запросы
  if (request.method !== 'GET') {
    return
  }

  // НЕ кэшируем API запросы аутентификации и динамические данные
  if (request.url.includes('/api/auth/') || 
      request.url.includes('/api/user/') ||
      request.url.includes('/api/admin/') ||
      request.url.includes('/api/orders') ||
      request.url.includes('/api/products') && request.url.includes('?') ||
      request.url.includes('_next/static/chunks/') ||
      request.url.includes('_next/static/css/') ||
      request.url.includes('_next/static/chunks/app/') ||
      request.url.includes('_next/static/chunks/pages/')) {
    // Для API запросов и динамических чанков - всегда идем в сеть, не кэшируем
    event.respondWith(fetch(request))
    return
  }

  event.respondWith(
    (async () => {
      try {
        // Сначала проверяем кэш
        const cachedResponse = await caches.match(request)
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache:', request.url)
          return cachedResponse
        }
        
        // Загружаем из сети с обработкой ошибок
        const networkResponse = await fetch(request)
        
        // Кэшируем только успешные ответы и только статические ресурсы
        if (networkResponse.status === 200 && 
            !request.url.includes('/api/') &&
            !request.url.includes('_next/static/chunks/') &&
            !request.url.includes('_next/static/css/')) {
          const responseClone = networkResponse.clone()
          const cache = await caches.open(CACHE_NAME)
          await cache.put(request, responseClone)
        }
        
        return networkResponse
      } catch (error) {
        console.warn('Service Worker: Fetch failed for', request.url, error)
        
        // Для статических файлов Next.js - не пытаемся кэшировать
        if (request.url.includes('_next/static/')) {
          // Возвращаем ошибку сети, чтобы браузер мог обработать её
          throw error
        }
        
        // Для других файлов - пробуем вернуть из кэша
        const fallbackResponse = await caches.match('/')
        return fallbackResponse || new Response('Offline', { 
          status: 503, 
          statusText: 'Service Unavailable' 
        })
      }
    })()
  )
})


// Обработка push уведомлений (для будущего использования)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received')
  
  const options = {
    body: event.data ? event.data.text() : 'Новое уведомление от Pideh Armenia',
    icon: '/images/logo.png',
    badge: '/images/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Посмотреть',
        icon: '/images/logo.png'
      },
      {
        action: 'close',
        title: 'Закрыть',
        icon: '/images/logo.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Pideh Armenia', options)
  )
})

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

console.log('Service Worker: Loaded successfully')
