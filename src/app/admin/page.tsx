'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  Settings,
  Tag,
  BarChart3,
  Grid3X3,
  FileText,
  Cog,
  Truck
} from 'lucide-react'

interface Stats {
  totalProducts: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  pendingOrders: number
  completedOrders: number
  totalDeliveryTypes: number
  totalCategories: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalDeliveryTypes: 0,
    totalCategories: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    // Временно отключаем проверку авторизации для тестирования
    // if (!session || session.user?.role !== 'ADMIN') {
    //   router.push('/login')
    //   return
    // }

    // Загружаем статистику
    fetchStats()
  }, [session, status, router])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Временно отключаем проверку авторизации для тестирования
  // if (!session || session.user?.role !== 'ADMIN') {
  //   return null
  // }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загружается...</p>
        </div>
      </div>
    )
  }

  const adminSections = [
    {
      title: 'Продукты',
      description: 'Управление товарами и каталогом',
      href: '/admin/products',
      icon: Package,
      color: 'bg-blue-500',
      stats: `${stats.totalProducts} товаров`
    },
    {
      title: 'Категории',
      description: 'Управление категориями товаров',
      href: '/admin/categories',
      icon: Tag,
      color: 'bg-green-500',
      stats: `${stats.totalCategories} категорий`
    },
    {
      title: 'Заказы',
      description: 'Просмотр и обработка заказов',
      href: '/admin/orders',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      stats: `${stats.totalOrders} заказов`
    },
    {
      title: 'Типы доставки',
      description: 'Управление способами доставки',
      href: '/admin/delivery-types',
      icon: Truck,
      color: 'bg-indigo-500',
      stats: `${stats.totalDeliveryTypes} типов`
    },
    {
      title: 'Настройки',
      description: 'Конфигурация системы',
      href: '/admin/settings',
      icon: Settings,
      color: 'bg-purple-500',
      stats: 'Конфигурация'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Отступ для fixed хедера */}
      <div className="h-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Админ-панель
          </h1>
          <p className="text-gray-600">
            Управление интернет-магазином Pideh Armenia
          </p>
        </div>

        {/* Основные разделы */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {adminSections.map((section) => {
            const IconComponent = section.icon
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-200 hover:border-gray-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${section.color} text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {section.stats}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {section.title}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {section.description}
                </p>
              </Link>
            )
          })}
        </div>

        {/* Быстрая статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Всего товаров</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Заказы сегодня</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Пользователи</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Выручка</p>
                <p className="text-2xl font-bold text-gray-900">₽{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Последние действия */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Последние действия</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Новый заказ #1234</p>
                  <p className="text-xs text-gray-500">2 минуты назад</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Добавлен новый товар</p>
                  <p className="text-xs text-gray-500">15 минут назад</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Tag className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Обновлена категория</p>
                  <p className="text-xs text-gray-500">1 час назад</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}