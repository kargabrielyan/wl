'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, use } from 'react'
import { ArrowLeft, ShoppingCart, Plus, Minus, Star, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react'
import { Product } from '@/types'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useCart } from '@/hooks/useCart'

export default function DefaultProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      
      // Загружаем основной товар
      const productResponse = await fetch(`/api/products/${id}`)
      if (!productResponse.ok) {
        throw new Error('Product not found')
      }
      const productData = await productResponse.json()
      setProduct(productData)

      // Загружаем похожие товары
      const similarResponse = await fetch(`/api/products?category=${productData.category?.id}&limit=4`)
      if (similarResponse.ok) {
        const similarData = await similarResponse.json()
        setSimilarProducts(similarData.filter((p: Product) => p.id !== id))
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      notFound()
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#002c45' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#f3d98c', borderTopColor: 'transparent' }}></div>
          <p className="text-gray-600">Загружаем товар...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#002c45' }}>
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 h-16">
          <Link 
            href="/products"
            className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Назад
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full transition-colors ${
                isInWishlist ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Отступ для fixed хедера */}
      <div className="lg:hidden h-20"></div>
      <div className="hidden lg:block h-28"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="hidden lg:flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-orange-500">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/products" className="text-gray-500 hover:text-orange-500">Товары</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Back Button - Desktop */}
        <Link 
          href="/products"
          className="hidden lg:inline-flex items-center text-gray-600 hover:text-orange-500 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Назад к каталогу
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group relative">
              <div className="relative h-80 lg:h-96">
                {product.image && product.image !== 'no-image' ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-6xl">
                    🧸
                  </div>
                )}
                
                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.status === 'HIT' && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ՀԻԹ
                    </span>
                  )}
                  {product.status === 'NEW' && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ՆՈՐ
                    </span>
                  )}
                  {product.status === 'SALE' && (
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ԶԵՂՉ
                    </span>
                  )}
                </div>

                {/* Wishlist Button - Desktop */}
                <button
                  onClick={handleToggleWishlist}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                    isInWishlist ? 'text-red-500 bg-white shadow-lg' : 'text-gray-400 bg-white/80 hover:text-red-500 hover:bg-white'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Additional Images Placeholder */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {product.image && product.image !== 'no-image' ? (
                    <Image
                      src={product.image}
                      alt={`${product.name} ${i}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      🧸
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">{product.category?.name}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.8 (127 отзывов)</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {product.description && (
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-red-600">{product.salePrice} ֏</span>
                  <span className="text-xl text-gray-400 line-through">{product.price} ֏</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    -{Math.round((1 - product.salePrice / product.price) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-orange-500">{product.price} ֏</span>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-gray-900">Количество:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-orange-100 transition-colors text-gray-700 hover:text-orange-600"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 min-w-[3rem] text-center font-semibold bg-gray-50 text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-orange-100 transition-colors text-gray-700 hover:text-orange-600"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                  addedToCart
                    ? 'bg-green-500 text-white scale-105 shadow-lg'
                    : 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>
                  {addedToCart ? '✓ Добавлено в корзину!' : 'Добавить в корзину'}
                </span>
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Быстрая доставка</div>
                    <div className="text-sm text-gray-600">1-2 дня</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Гарантия качества</div>
                    <div className="text-sm text-gray-600">30 дней</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="font-semibold text-gray-900">Возврат</div>
                    <div className="text-sm text-gray-600">14 дней</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Похожие товары
              </h2>
              <Link 
                href="/products" 
                className="text-orange-500 hover:text-orange-600 font-semibold flex items-center space-x-2"
              >
                <span>Все товары</span>
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard
                  key={similarProduct.id}
                  product={similarProduct}
                  variant="compact"
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Hide Footer on Mobile and Tablet */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  )
}
