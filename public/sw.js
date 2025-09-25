// Service Worker для кэширования и оптимизации производительности
const CACHE_NAME = 'pideh-armenia-v1.0.0'

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

  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Если есть в кэше, возвращаем
        if (response) {
          console.log('Service Worker: Serving from cache:', request.url)
          return response
        }
        
        // Иначе загружаем из сети
        return fetch(request)
          .then((response) => {
            // Кэшируем только успешные ответы
            if (response.status === 200) {
              const responseClone = response.clone()
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseClone)
                })
            }
            return response
          })
      })
      .catch(() => {
        // Если ничего не работает, возвращаем offline страницу
        return caches.match('/')
      })
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
