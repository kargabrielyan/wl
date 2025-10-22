'use client'

import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react'
import { Product } from '@/types'
import { WishlistButton } from './WishlistButton'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  variant?: 'default' | 'compact'
  addedToCart?: Set<string>
  isSelected?: boolean
}

const ProductCard = memo(({ product, onAddToCart, variant = 'default', addedToCart, isSelected = false }: ProductCardProps) => {
  const isCompact = variant === 'compact'
  const isAdded = addedToCart?.has(product.id) || false

  return (
    <div className={`relative bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden group hover:shadow-xl hover:bg-gray-50 transition-all duration-300 ${
      isSelected ? 'ring-2 ring-primary-500' : ''
    }`}>
      {/* Контейнер изображения */}
      <div className={`relative bg-gray-100 ${isCompact ? 'h-48' : 'h-64'}`}>
        {/* Изображение товара */}
        {product.image && product.image !== 'no-image' ? (
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-contain group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            onError={(e) => {
              console.error('Ошибка загрузки изображения:', product.image);
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'flex';
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-6xl">
            🥟
          </div>
        )}

        {/* Метки */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {/* Скидка */}
          {product.salePrice && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              SALE
            </span>
          )}
          
          {/* Статус товара */}
          {product.status === 'HIT' && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
              ХИТ
            </span>
          )}
          
          {product.status === 'NEW' && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              NEW
            </span>
          )}
        </div>

        {/* Quick actions (появляются при hover) */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-1">
          <WishlistButton 
            productId={product.id}
            size="md"
            variant="default"
          />
          <button 
            className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="Быстрый просмотр"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Статус наличия */}
        {!product.stock || product.stock <= 0 ? (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 px-4 py-2 rounded text-sm font-medium text-white border border-gray-600">
              Չկա պահեստում
            </div>
          </div>
        ) : null}
      </div>
      
      {/* Контент карточки */}
      <div className="p-4">
        {/* Название товара */}
        <Link href={`/products/${product.id}`}>
          <h3 className={`font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors ${
            isCompact ? 'text-sm mb-2' : 'text-base mb-2'
          }`}>
            {product.name}
          </h3>
        </Link>
        
        {/* Краткое описание (только для полного варианта) */}
        {!isCompact && product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-1">
            {product.description}
          </p>
        )}
        
        {/* Рейтинг и отзывы */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-xs text-gray-500">(4.8)</span>
        </div>
        
        {/* Цена */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-lg font-bold text-red-400">{product.salePrice} ֏</span>
                <span className="text-sm text-gray-500 line-through">{product.price} ֏</span>
                <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded font-bold">
                  -{Math.round((1 - product.salePrice / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">{product.price} ֏</span>
            )}
          </div>
        </div>
        
        {/* CTA кнопка */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onAddToCart(product)
          }}
          disabled={!product.stock || product.stock <= 0}
          className={`w-full h-10 rounded-md font-medium text-sm flex items-center justify-center transition-all duration-200 ${
            isAdded
              ? 'bg-green-500 text-white hover:bg-green-600'
              : product.stock && product.stock > 0
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isAdded ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Զամբյուղում
            </>
          ) : product.stock && product.stock > 0 ? (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Զամբյուղում
            </>
          ) : (
            'Չկա պահեստում'
          )}
        </button>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
