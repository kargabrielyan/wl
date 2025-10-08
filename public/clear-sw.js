// Скрипт для очистки Service Worker в браузере
// Выполните в консоли браузера: navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()))

console.log('Очистка Service Worker...')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('Найдено Service Worker:', registrations.length)
    
    registrations.forEach(registration => {
      registration.unregister().then(success => {
        console.log('Service Worker отключен:', success)
      })
    })
  })
  
  // Очищаем кэш
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      caches.delete(cacheName).then(success => {
        console.log('Кэш очищен:', cacheName, success)
      })
    })
  })
} else {
  console.log('Service Worker не поддерживается')
}
