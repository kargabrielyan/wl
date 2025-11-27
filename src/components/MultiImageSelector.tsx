'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Upload, 
  X, 
  Image as ImageIcon,
  Check,
  Loader2,
  GripVertical,
  Plus
} from 'lucide-react'
import Image from 'next/image'

interface MultiImageSelectorProps {
  value: string[]  // Массив путей к изображениям
  onChange: (images: string[]) => void
  maxImages?: number  // Максимальное количество изображений
  className?: string
}

interface ImageFile {
  name: string
  path: string
  category?: string
}

export default function MultiImageSelector({ 
  value = [], 
  onChange, 
  maxImages = 10,
  className = '' 
}: MultiImageSelectorProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload' | null>(null)
  const [images, setImages] = useState<ImageFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [loadingGallery, setLoadingGallery] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Загружаем список существующих изображений только при переходе на вкладку "Галерея"
  const loadImages = async () => {
    if (images.length > 0) return // Уже загружены
    
    setLoadingGallery(true)
    try {
      const response = await fetch('/api/images')
      if (response.ok) {
        const imageList = await response.json()
        setImages(imageList)
      }
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setLoadingGallery(false)
    }
  }

  // Загружаем изображения при переходе на вкладку "Галерея"
  useEffect(() => {
    if (activeTab === 'gallery') {
      loadImages()
    }
  }, [activeTab])

  // Обработка загрузки файлов
  const handleFileUpload = async (files: FileList) => {
    if (!files.length) return

    setUploading(true)
    
    try {
      const newImages: string[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Проверяем тип файла
        if (!file.type.startsWith('image/')) {
          alert(`Файл ${file.name} не является изображением`)
          continue
        }

        // Проверяем размер файла (максимум 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`Файл ${file.name} слишком большой (максимум 5MB)`)
          continue
        }

        // Проверяем лимит изображений
        if (value.length + newImages.length >= maxImages) {
          alert(`Максимум ${maxImages} изображений`)
          break
        }

        const formData = new FormData()
        formData.append('image', file)

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const result = await response.json()
          
          // Добавляем новое изображение в локальный список
          setImages(prev => [...prev, {
            name: file.name,
            path: result.path
          }])
          
          newImages.push(result.path)
        } else {
          const error = await response.json()
          alert(`Ошибка загрузки ${file.name}: ${error.message}`)
        }
      }

      // Добавляем загруженные изображения к существующим
      if (newImages.length > 0) {
        onChange([...value, ...newImages])
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Ошибка загрузки изображений')
    } finally {
      setUploading(false)
    }
  }

  // Обработка drag & drop для загрузки
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = e.dataTransfer.files
    handleFileUpload(files)
  }

  // Обработка клика по файлу
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      handleFileUpload(files)
    }
  }

  // Добавление/удаление изображения из галереи
  const toggleImage = (imagePath: string) => {
    if (value.includes(imagePath)) {
      // Удаляем изображение
      onChange(value.filter(img => img !== imagePath))
    } else {
      // Добавляем изображение (если не превышен лимит)
      if (value.length < maxImages) {
        onChange([...value, imagePath])
      } else {
        alert(`Максимум ${maxImages} изображений`)
      }
    }
  }

  // Удаление изображения из выбранных
  const removeImage = (index: number) => {
    const newValue = [...value]
    newValue.splice(index, 1)
    onChange(newValue)
  }

  // Перемещение изображения (drag & drop для сортировки)
  const moveImage = (fromIndex: number, toIndex: number) => {
    const newValue = [...value]
    const [moved] = newValue.splice(fromIndex, 1)
    newValue.splice(toIndex, 0, moved)
    onChange(newValue)
  }

  // Обработка начала перетаскивания для сортировки
  const handleSortDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString())
  }

  const handleSortDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleSortDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault()
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'))
    if (fromIndex !== toIndex) {
      moveImage(fromIndex, toIndex)
    }
    setDragOverIndex(null)
  }

  return (
    <div className={`${className}`}>
      {/* Выбранные изображения */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Дополнительные изображения ({value.length}/{maxImages})
          </label>
        </div>
        
        {value.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {value.map((imagePath, index) => (
              <div
                key={imagePath}
                draggable
                onDragStart={(e) => handleSortDragStart(e, index)}
                onDragOver={(e) => handleSortDragOver(e, index)}
                onDrop={(e) => handleSortDrop(e, index)}
                className={`relative group cursor-move ${
                  dragOverIndex === index ? 'ring-2 ring-blue-400' : ''
                }`}
              >
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={imagePath}
                    alt={`Изображение ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                  {/* Номер изображения */}
                  <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                    {index + 1}
                  </div>
                  {/* Иконка перетаскивания */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="h-4 w-4 text-white drop-shadow" />
                  </div>
                </div>
                {/* Кнопка удаления */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            {/* Кнопка добавить ещё */}
            {value.length < maxImages && (
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'gallery' ? null : 'gallery')}
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors"
              >
                <Plus className="h-6 w-6 mb-1" />
                <span className="text-xs">Добавить</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors"
            >
              <Plus className="h-6 w-6 mb-1" />
              <span className="text-xs">Добавить</span>
            </button>
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-2">
          Перетаскивайте для изменения порядка. Первое изображение будет главным на карточке.
        </p>
      </div>

      {/* Кнопки выбора режима */}
      <div className="flex gap-3 mb-4">
        <Button
          type="button"
          variant={activeTab === 'gallery' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab(activeTab === 'gallery' ? null : 'gallery')}
          className={`${
            activeTab === 'gallery' 
              ? 'bg-[#f3d98c] hover:bg-[#f3d98c] text-gray-900 border-[#f3d98c]' 
              : 'border-[#f3d98c]/30 text-[#f3d98c] hover:bg-[#f3d98c]/10 hover:border-[#f3d98c]/50'
          }`}
        >
          Выбрать из галереи
        </Button>
        <Button
          type="button"
          variant={activeTab === 'upload' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab(activeTab === 'upload' ? null : 'upload')}
          className={`${
            activeTab === 'upload' 
              ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500' 
              : 'border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400'
          }`}
        >
          Загрузить новые
        </Button>
      </div>

      {/* Содержимое вкладок */}
      {activeTab === 'gallery' && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Выберите изображения из галереи
          </h4>
          
          {loadingGallery ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#f3d98c]" />
              <span className="ml-2 text-gray-600">Загрузка галереи...</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                {images.map((image) => (
                  <button
                    key={image.path}
                    type="button"
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      value.includes(image.path)
                        ? 'border-[#f3d98c] ring-2 ring-[#f3d98c]/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleImage(image.path)}
                  >
                    <Image
                      src={image.path}
                      alt={image.name}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                      className="object-cover"
                    />
                    {value.includes(image.path) && (
                      <div className="absolute inset-0 bg-[#f3d98c] bg-opacity-30 flex items-center justify-center">
                        <Check className="h-6 w-6 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {images.length === 0 && !loadingGallery && (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Изображения не найдены</p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragOver
                ? 'border-[#f3d98c] bg-[#f3d98c]/10'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-10 w-10 mx-auto mb-3 text-gray-400" />
            <p className="text-sm font-medium text-gray-900 mb-1">
              Перетащите изображения сюда
            </p>
            <p className="text-xs text-gray-500 mb-3">
              или нажмите кнопку для выбора файлов
            </p>
            <Button
              type="button"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? 'Загрузка...' : 'Выбрать файлы'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            JPG, PNG, GIF, WebP. Максимум 5MB на файл.
          </p>
        </div>
      )}
    </div>
  )
}

