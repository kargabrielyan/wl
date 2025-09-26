/**
 * Утилита для управления кэшем приложения
 * Очищает все данные пользователя из браузера
 */

export class CacheManager {
  /**
   * Полная очистка кэша приложения
   * Очищает localStorage, sessionStorage и другие данные
   */
  static clearAllCache(): void {
    try {
      // Очищаем NextAuth кэш
      this.clearNextAuthCache()
      
      // Очищаем localStorage
      localStorage.clear()
      
      // Очищаем sessionStorage
      sessionStorage.clear()
      
      // Очищаем IndexedDB (если используется)
      if ('indexedDB' in window) {
        this.clearIndexedDB()
      }
      
      // Очищаем кэш Service Worker (если есть)
      if ('serviceWorker' in navigator && 'caches' in window) {
        this.clearServiceWorkerCache()
      }
      
      console.log('✅ Cache cleared successfully')
    } catch (error) {
      console.error('❌ Error clearing cache:', error)
    }
  }

  /**
   * Очистка только пользовательских данных
   * Сохраняет системные настройки
   */
  static clearUserData(): void {
    try {
      // Список ключей, которые нужно сохранить
      const systemKeys = ['theme', 'language', 'settings']
      
      // Сохраняем системные настройки
      const systemData: Record<string, string> = {}
      systemKeys.forEach(key => {
        const value = localStorage.getItem(key)
        if (value) {
          systemData[key] = value
        }
      })
      
      // Очищаем все
      localStorage.clear()
      sessionStorage.clear()
      
      // Восстанавливаем системные настройки
      Object.entries(systemData).forEach(([key, value]) => {
        localStorage.setItem(key, value)
      })
      
      console.log('✅ User data cleared, system settings preserved')
    } catch (error) {
      console.error('❌ Error clearing user data:', error)
    }
  }

  /**
   * Очистка NextAuth кэша
   */
  private static clearNextAuthCache(): void {
    try {
      // Очищаем NextAuth сообщения
      localStorage.removeItem('nextauth.message')
      sessionStorage.removeItem('nextauth.message')
      
      // Очищаем NextAuth токены
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith('nextauth.') || key.startsWith('__nextauth')) {
          localStorage.removeItem(key)
        }
      })
      
      // Очищаем NextAuth токены из sessionStorage
      const sessionKeys = Object.keys(sessionStorage)
      sessionKeys.forEach(key => {
        if (key.startsWith('nextauth.') || key.startsWith('__nextauth')) {
          sessionStorage.removeItem(key)
        }
      })
      
      console.log('✅ NextAuth cache cleared')
    } catch (error) {
      console.error('❌ Error clearing NextAuth cache:', error)
    }
  }

  /**
   * Очистка IndexedDB
   */
  private static clearIndexedDB(): void {
    return new Promise<void>((resolve, reject) => {
      const deleteReq = indexedDB.deleteDatabase('app-cache')
      
      deleteReq.onsuccess = () => {
        console.log('✅ IndexedDB cleared')
        resolve()
      }
      
      deleteReq.onerror = () => {
        console.log('⚠️ IndexedDB not found or already cleared')
        resolve() // Не критичная ошибка
      }
    })
  }

  /**
   * Очистка кэша Service Worker
   */
  private static async clearServiceWorkerCache(): Promise<void> {
    try {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      )
      console.log('✅ Service Worker cache cleared')
    } catch (error) {
      console.log('⚠️ Service Worker cache not found')
    }
  }

  /**
   * Принудительная перезагрузка страницы
   * Используется после очистки кэша
   */
  static forceReload(): void {
    try {
      // Очищаем кэш браузера
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.unregister()
          })
        })
      }
      
      // Принудительная перезагрузка
      window.location.href = window.location.origin
    } catch (error) {
      console.error('❌ Error during force reload:', error)
      // Fallback - обычная перезагрузка
      window.location.reload()
    }
  }
}
