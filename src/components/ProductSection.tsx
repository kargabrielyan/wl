'use client'

import { memo } from 'react'
import Link from 'next/link'
import { Product } from '@/types'
import ProductCard from './ProductCard'

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: Product[]
  onAddToCart: (product: Product) => void
  addedToCart?: Set<string>
  showViewAll?: boolean
  viewAllLink?: string
  variant?: 'default' | 'compact'
}

const ProductSection = memo(function ProductSection({
  title,
  subtitle,
  products,
  onAddToCart,
  addedToCart,
  showViewAll = true,
  viewAllLink = '/products',
  variant = 'default'
}: ProductSectionProps) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return null
  }

  return (
    <section className="py-12 lg:py-16" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product) => (
            <div 
              key={product.id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                variant={variant}
                addedToCart={addedToCart}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        {showViewAll && (
          <div className="text-center mt-12">
            <Link 
              href={viewAllLink}
              className="group inline-flex items-center bg-primary-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Դիտել բոլորը</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
})

export default ProductSection
