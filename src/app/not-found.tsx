'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Страница не найдена
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              К сожалению, запрашиваемая страница не существует
            </p>
            <p className="text-gray-500">
              Возможно, она была перемещена или удалена
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              На главную
            </Link>

            <div className="flex gap-3">
              <button
                onClick={() => window.history.back()}
                className="flex-1 inline-flex items-center justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Назад
              </button>

              <Link
                href="/products"
                className="flex-1 inline-flex items-center justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <Search className="w-5 h-5 mr-2" />
                Каталог
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-sm text-gray-500">
            <p>Если проблема повторяется, обратитесь в службу поддержки</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
