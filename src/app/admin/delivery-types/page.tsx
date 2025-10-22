'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Truck, 
  Clock, 
  DollarSign,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface DeliveryType {
  id: string
  name: string
  deliveryTime: string
  description: string
  price: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function DeliveryTypesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [deliveryTypes, setDeliveryTypes] = useState<DeliveryType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingType, setEditingType] = useState<DeliveryType | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    deliveryTime: '',
    description: '',
    price: 0,
    isActive: true
  })

  useEffect(() => {
    if (status === 'loading') return

    // Временно отключаем проверку авторизации для тестирования
    // if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'MANAGER')) {
    //   router.push('/login')
    //   return
    // }

    fetchDeliveryTypes()
  }, [session, status, router])

  const fetchDeliveryTypes = async () => {
    try {
      const response = await fetch('/api/delivery-types')
      if (response.ok) {
        const result = await response.json()
        setDeliveryTypes(result.data)
      }
    } catch (error) {
      console.error('Error fetching delivery types:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingType 
        ? `/api/delivery-types/${editingType.id}`
        : '/api/delivery-types'
      
      const method = editingType ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchDeliveryTypes()
        setIsModalOpen(false)
        setEditingType(null)
        setFormData({
          name: '',
          deliveryTime: '',
          description: '',
          price: 0,
          isActive: true
        })
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при сохранении')
      }
    } catch (error) {
      console.error('Error saving delivery type:', error)
      alert('Ошибка при сохранении')
    }
  }

  const handleEdit = (type: DeliveryType) => {
    setEditingType(type)
    setFormData({
      name: type.name,
      deliveryTime: type.deliveryTime,
      description: type.description,
      price: type.price,
      isActive: type.isActive
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот тип доставки?')) {
      return
    }

    try {
      const response = await fetch(`/api/delivery-types/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchDeliveryTypes()
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при удалении')
      }
    } catch (error) {
      console.error('Error deleting delivery type:', error)
      alert('Ошибка при удалении')
    }
  }

  const handleNew = () => {
    setEditingType(null)
    setFormData({
      name: '',
      deliveryTime: '',
      description: '',
      price: 0,
      isActive: true
    })
    setIsModalOpen(true)
  }

  // Временно отключаем проверку авторизации для тестирования
  // if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'MANAGER')) {
  //   return null
  // }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#f3d98c', borderTopColor: 'transparent' }}></div>
          <p className="text-gray-600">Загружается...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Отступ для fixed хедера */}
      <div className="h-24 lg:h-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Типы доставки
            </h1>
            <p className="text-gray-600">
              Управление способами доставки товаров
            </p>
          </div>
          
          {session?.user?.role === 'ADMIN' && (
            <button
              onClick={handleNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Добавить тип
            </button>
          )}
        </div>

        {/* Список типов доставки */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Все типы доставки ({deliveryTypes.length})
            </h2>
          </div>
          
          <div className="p-6">
            {deliveryTypes.length === 0 ? (
              <div className="text-center py-12">
                <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Нет типов доставки
                </h3>
                <p className="text-gray-500 mb-4">
                  Добавьте первый тип доставки для начала работы
                </p>
                {session?.user?.role === 'ADMIN' && (
                  <button
                    onClick={handleNew}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Добавить тип доставки
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deliveryTypes.map((type) => (
                  <div
                    key={type.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">{type.name}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        {type.isActive ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          type.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {type.isActive ? 'Активен' : 'Неактивен'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{type.deliveryTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {type.price.toFixed(2)} ֏
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {type.description}
                      </p>
                    </div>
                    
                    {session?.user?.role === 'ADMIN' && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => handleEdit(type)}
                          className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDelete(type.id)}
                          className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-md hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно для создания/редактирования */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingType ? 'Редактировать тип доставки' : 'Новый тип доставки'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Например: Курьерская доставка"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Время доставки *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Например: 1-2 дня"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Описание способа доставки"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Цена (֏) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                    Активен
                  </label>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingType ? 'Сохранить' : 'Создать'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
