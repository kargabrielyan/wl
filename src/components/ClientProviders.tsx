'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/hooks/useCart'

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SessionProvider 
      refetchInterval={0} // Отключаем автоматическое обновление
      refetchOnWindowFocus={true} // Обновляем при фокусе на окне
    >
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  )
}
