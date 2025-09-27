'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useAuth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const login = useCallback(async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      throw new Error('Неверный email или пароль')
    }

    // Принудительно обновляем сессию
    await update()
    
    // Принудительно обновляем страницу для гарантии обновления UI
    window.location.href = '/'
  }, [update])

  const logout = useCallback(async () => {
    // Очищаем кэш перед выходом
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
        console.log('✅ Service Worker cache cleared')
      } catch (error) {
        console.warn('⚠️ Could not clear Service Worker cache:', error)
      }
    }
    
    await signOut({ callbackUrl: '/' })
    // Принудительно обновляем сессию
    await update()
    // Принудительно обновляем страницу для гарантии обновления UI
    window.location.href = '/'
  }, [update])

  return {
    session,
    status,
    login,
    logout,
    isAuthenticated: !!session,
    isLoading: status === 'loading'
  }
}
