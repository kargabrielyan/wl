'use client'

import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star, Zap } from 'lucide-react'
import { Product } from '@/types'

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
    <Link 
      href={`/products/${product.id}`}
      className={`relative block bg-white rounded-3xl shadow-2xl overflow-visible cursor-pointer group border-0 ${
        isCompact ? 'rounded-2xl shadow-xl' : ''
      } ${
        isSelected ? 'ring-4 ring-orange-400 ring-opacity-60 scale-105' : ''
      }`}
      style={{
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* 3D Product Container - No top border */}
      <div className={`relative overflow-visible ${
        isCompact ? 'h-48' : 'h-80'
      }`}>
        {/* Background Gradient - Removed */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-100 to-red-50 opacity-40 group-hover:opacity-60 transition-opacity duration-500" /> */}
        
        {/* 3D Floating Product - No top border */}
        {product.image && product.image !== 'no-image' ? (
          <div className="relative w-full h-full">
            {/* 3D Product Image with floating effect - Mobile App Style */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-full max-w-[200px] h-[calc(100%+4rem)]">
              {/* Enhanced 3D Shadow Layer - Removed for cleaner look */}
              {/* <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-300/30 to-gray-400/20 rounded-3xl transform translate-y-6 translate-x-4 group-hover:translate-y-8 group-hover:translate-x-5 transition-all duration-700"
                style={{
                  filter: 'blur(8px)',
                }}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-200/25 to-gray-300/15 rounded-3xl transform translate-y-4 translate-x-2 group-hover:translate-y-6 group-hover:translate-x-3 transition-all duration-700"
                style={{
                  filter: 'blur(4px)',
                }}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-100/20 to-gray-200/10 rounded-3xl transform translate-y-2 translate-x-1 group-hover:translate-y-4 group-hover:translate-x-2 transition-all duration-700"
                style={{
                  filter: 'blur(2px)',
                }}
              /> */}
              
              {/* Main 3D Product Image - Enhanced mobile app style with Next.js Image */}
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                className="relative w-full h-full object-contain"
                style={{
                  filter: 'none',
                  transform: 'perspective(1000px) rotateX(8deg) rotateY(-3deg)',
                  imageRendering: 'crisp-edges',
                  imageRendering: '-webkit-optimize-contrast',
                }}
                loading="lazy"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                quality={85}
                onError={(e) => {
                  console.error('Ошибка загрузки изображения:', product.image);
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
                }}
              />
              
              {/* 3D Highlight Effect - Removed white overlay */}
              {/* <div 
                className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 30%, transparent 70%)',
                }}
              /> */}
            </div>
          </div>
        ) : (
            <div 
              className={`absolute -top-12 left-1/2 transform -translate-x-1/2 w-full max-w-[200px] h-[calc(100%+4rem)] flex items-center justify-center ${
                isCompact ? 'text-6xl' : 'text-8xl'
              }`}
            style={{
              filter: 'none',
              transform: 'perspective(1000px) rotateX(8deg) rotateY(-3deg)',
            }}
          >
            🥟
          </div>
        )}
        
        {/* 3D Floating Elements - Adjusted for 3D product */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 z-20">
          {/* Sale Badge */}
          {product.salePrice && (
            <div 
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-2xl animate-pulse"
              style={{
                boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              🔥 СКИДКА
            </div>
          )}
          
          {/* 3D Category Badge */}
          {!isCompact && (
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-2xl"
              style={{
                boxShadow: '0 10px 25px rgba(255, 107, 53, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {product.category?.name || 'Без категории'}
            </div>
          )}
          
          {/* 3D Special Badge */}
          {product.status === 'HIT' && (
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-1"
              style={{
                boxShadow: '0 10px 25px rgba(255, 193, 7, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Star className="w-3 h-3" />
              ХИТ ПРОДАЖ
            </div>
          )}
          
          {product.status === 'NEW' && (
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-1"
              style={{
                boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Zap className="w-3 h-3" />
              НОВИНКА
            </div>
          )}
          
          {product.status === 'CLASSIC' && (
            <div 
              className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-3 py-1 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-1"
              style={{
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Star className="w-3 h-3" />
              КЛАССИКА
            </div>
          )}
        </div>

        {/* 3D Floating Price Badge - Moved to bottom right */}
        <div 
          className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-2xl text-sm font-bold shadow-2xl z-20"
          style={{
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px)',
          }}
        >
          {product.salePrice ? (
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-red-600">{product.salePrice} ֏</span>
                <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded-full font-bold">
                  СКИДКА
                </span>
              </div>
              <span className="text-xs text-gray-400 line-through">{product.price} ֏</span>
            </div>
          ) : (
            <span className="text-orange-600">{product.price} ֏</span>
          )}
        </div>

        {/* Bottom Gradient Overlay - Removed black overlay */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
      </div>
      
      {/* 3D Content Section - Adjusted for 3D product */}
      <div className={`relative ${isCompact ? 'p-4 -mt-3' : 'p-6 -mt-5'}`}>
        {/* Product Name */}
        <h3 className={`font-bold text-gray-900 line-clamp-2 ${
          isCompact ? 'text-sm mb-3' : 'text-xl mb-4'
        }`}>
          {product.name}
        </h3>
        
        {/* Description for non-compact */}
        {!isCompact && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 opacity-80">
            {product.description}
          </p>
        )}
        
        {/* Action Section */}
        <div className={`relative ${isCompact ? 'space-y-3' : 'space-y-4'}`}>
          {isCompact ? (
            // Компактный вариант
            <div className="flex flex-col space-y-3">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onAddToCart(product)
                }}
                className={`w-full h-10 rounded-2xl font-bold text-sm shadow-2xl flex items-center justify-center overflow-hidden relative ${
                  isAdded
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                }`}
                style={{
                  boxShadow: isAdded 
                    ? '0 8px 25px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    : '0 8px 25px rgba(255, 107, 53, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                title="В корзину"
              >
                {/* 3D Button Background Animation - Removed white overlay */}
                {/* <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" /> */}
                
                {isAdded ? (
                  <span className="flex items-center relative z-10">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    В корзине
                  </span>
                ) : (
                  <span className="flex items-center relative z-10">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Добавить
                  </span>
                )}
              </button>
            </div>
          ) : (
            // Обычный вариант
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onAddToCart(product)
                }}
                className={`px-6 h-10 rounded-2xl font-bold text-sm shadow-2xl flex items-center justify-center overflow-hidden relative min-w-[140px] ${
                  isAdded
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                }`}
                style={{
                  boxShadow: isAdded 
                    ? '0 15px 35px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    : '0 15px 35px rgba(255, 107, 53, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                title="В корзину"
              >
                {/* 3D Button Background Animation - Removed white overlay */}
                {/* <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" /> */}
                
                {isAdded ? (
                  <span className="flex items-center relative z-10">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    В корзине
                  </span>
                ) : (
                  <span className="flex items-center relative z-10">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Добавить
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3D Floating Decorative Elements */}
      <div 
        className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-30"
        style={{
          boxShadow: '0 10px 25px rgba(255, 193, 7, 0.3)',
          filter: 'blur(1px)',
        }}
      />
      <div 
        className="absolute top-1/2 -left-4 w-3 h-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20"
        style={{
          boxShadow: '0 5px 15px rgba(236, 72, 153, 0.2)',
          filter: 'blur(0.5px)',
        }}
      />
    </Link>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
