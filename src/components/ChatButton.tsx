'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, Instagram, Facebook, X } from 'lucide-react'

interface ChatButtonProps {
  instagramUrl?: string
  facebookUrl?: string
}

export default function ChatButton({ 
  instagramUrl = "https://instagram.com/your_instagram",
  facebookUrl = "https://www.facebook.com/welcomebaby.yerevan"
}: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLifted, setIsLifted] = useState(false)
  const pathname = usePathname()

  // Проверяем находимся ли мы на странице каталога
  const isProductsPage = pathname === '/products' || pathname.startsWith('/products')

  useEffect(() => {
    // Показываем кнопку через 2 секунды после загрузки
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Отслеживание скролла только для мобильной версии И только на странице каталога
    const handleScroll = () => {
      // Поднимаем кнопку только на странице /products
      if (!isProductsPage) {
        setIsLifted(false)
        return
      }

      if (window.innerWidth > 768) {
        setIsLifted(false)
        return // Только для мобильных
      }
      
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      // Вычисляем, доскроллил ли пользователь до пагинации (последние 250px страницы)
      const scrollBottom = documentHeight - (scrollTop + windowHeight)
      const isNearBottom = scrollBottom < 250
      
      setIsLifted(isNearBottom)
    }

    // Обработка изменения размера окна
    const handleResize = () => {
      handleScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    handleScroll() // Проверяем при загрузке

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [isProductsPage])

  const handleInstagramClick = () => {
    window.open(instagramUrl, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  const handleFacebookClick = () => {
    const facebookUrlWithUtm = `${facebookUrl}?utm_source=neetrino.com`
    window.open(facebookUrlWithUtm, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Плавающая кнопка чата - зафиксирована в правом нижнем углу экрана */}
      <div 
        className="chat-button-container fixed bottom-6 right-6 z-[9999]"
        data-lifted={isLifted ? 'true' : 'false'}
      >
        {/* Кнопка чата */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
          aria-label="Открыть Instagram"
        >
          {/* Анимированный фон */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Иконка чата */}
          <div className="relative z-10">
            <MessageCircle className="w-7 h-7 animate-in zoom-in duration-200" />
          </div>

        </button>

        {/* Всплывающее меню - Instagram и Facebook */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 flex flex-col space-y-2">
            {/* Кнопка Instagram */}
            <button
              onClick={handleInstagramClick}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl group"
              title="Instagram"
            >
              <Instagram className="w-6 h-6 transition-transform duration-200" />
            </button>
            
            {/* Кнопка Facebook */}
            <button
              onClick={handleFacebookClick}
              className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl group"
              title="Facebook"
            >
              <Facebook className="w-6 h-6 transition-transform duration-200" />
            </button>
          </div>
        )}
      </div>

      {/* Overlay для закрытия меню при клике вне его */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <style jsx>{`
        /* Дополнительные стили для фиксации кнопки в правом нижнем углу экрана */
        .chat-button-container {
          position: fixed !important;
          bottom: 24px !important;
          right: 24px !important;
          z-index: 9999 !important;
        }
        
        /* Убеждаемся что кнопка не скрывается за другими элементами */
        .chat-button-container * {
          z-index: 1;
        }
        
        /* Адаптивность для мобильных устройств */
        @media (max-width: 768px) {
          .chat-button-container {
            bottom: 90px !important;
            right: 20px !important;
            transition: bottom 0.5s ease-in-out !important;
          }
          
          /* Поднятая позиция при скролле до пагинации */
          .chat-button-container[data-lifted="true"] {
            bottom: 160px !important;
          }
        }
        
        /* Очень маленькие экраны */
        @media (max-width: 480px) {
          .chat-button-container {
            bottom: 85px !important;
            right: 16px !important;
            transition: bottom 0.5s ease-in-out !important;
          }
          
          .chat-button-container[data-lifted="true"] {
            bottom: 150px !important;
          }
        }
        
        /* Убеждаемся что кнопка всегда видна */
        .chat-button-container button {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
        }
      `}</style>
    </>
  )
}
  