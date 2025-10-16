'use client'

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Clock, ShoppingCart, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [comboProducts, setComboProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [saleProducts, setSaleProducts] = useState<Product[]>([])
  const [newToys, setNewToys] = useState<Product[]>([])
  const [bannerProduct, setBannerProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set())
  const [addedToCartHits, setAddedToCartHits] = useState<Set<string>>(new Set())
  const { addItem } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      // Загружаем данные из API (которые теперь работают с базой данных)
      const [productsResponse, featuredResponse, bannerResponse, newResponse, saleResponse, newToysResponse] = await Promise.all([
        fetch('/api/products', { 
          cache: 'force-cache',
          next: { revalidate: 300 } // кэш на 5 минут
        }),
        fetch('/api/products?featured=true', { 
          cache: 'force-cache',
          next: { revalidate: 300 }
        }),
        fetch('/api/products?status=BANNER', { 
          cache: 'force-cache',
          next: { revalidate: 300 }
        }),
        fetch('/api/products?new=true', { 
          cache: 'force-cache',
          next: { revalidate: 300 }
        }),
        fetch('/api/products?sale=true', { 
          cache: 'force-cache',
          next: { revalidate: 300 }
        }),
        fetch('/api/products?newToys=true', { 
          cache: 'force-cache',
          next: { revalidate: 300 }
        })
      ])
      
      if (!productsResponse.ok) {
        throw new Error(`Products API error: ${productsResponse.status}`)
      }
      if (!featuredResponse.ok) {
        throw new Error(`Featured API error: ${featuredResponse.status}`)
      }
      if (!bannerResponse.ok) {
        throw new Error(`Banner API error: ${bannerResponse.status}`)
      }
      if (!newResponse.ok) {
        throw new Error(`New products API error: ${newResponse.status}`)
      }
      if (!saleResponse.ok) {
        throw new Error(`Sale products API error: ${saleResponse.status}`)
      }
      if (!newToysResponse.ok) {
        throw new Error(`New toys API error: ${newToysResponse.status}`)
      }
      
      const productsData = await productsResponse.json()
      const featuredData = await featuredResponse.json()
      const bannerData = await bannerResponse.json()
      const newData = await newResponse.json()
      const saleData = await saleResponse.json()
      const newToysData = await newToysResponse.json()
      
      setProducts(productsData || [])
      
      // Фильтруем товары для первой категории для секции хитов
      const firstCategory = (productsData || []).filter((product: Product) => product.category?.name === 'Հյուսեր')
      setComboProducts(firstCategory.slice(0, 4))
      
      setFeaturedProducts(featuredData || [])
      setNewProducts(newData || [])
      setSaleProducts(saleData || [])
      setNewToys(newToysData || [])
      setBannerProduct(bannerData?.[0] || null)
      
    } catch (error) {
      console.error('Error fetching data from database:', error)
      setProducts([])
      setComboProducts([])
      setFeaturedProducts([])
      setNewProducts([])
      setSaleProducts([])
      setNewToys([])
      setBannerProduct(null)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
    setAddedToCart(prev => new Set(prev).add(product.id))
    
    // Убираем подсветку через 2 секунды
    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  const handleAddToCartHits = (product: Product) => {
    addItem(product, 1)
    setAddedToCartHits(prev => new Set(prev).add(product.id))
    
    // Убираем подсветку через 2 секунды
    setTimeout(() => {
      setAddedToCartHits(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HIT':
        return { text: 'ՎԱՃԱՌՈՒՄ', color: 'bg-red-500' }
      case 'NEW':
        return { text: 'ՆՈՐ', color: 'bg-green-500' }
      case 'CLASSIC':
        return { text: 'ԴԱՍԻԿ', color: 'bg-primary-500' }
      case 'BANNER':
        return { text: 'ԲԱՆՆԵՐ', color: 'bg-purple-500' }
      default:
        return { text: 'ՀԱՅՏՆԻ', color: 'bg-orange-500' }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Отступ для fixed хедера */}
      <div className="lg:hidden h-16"></div>
      <div className="hidden lg:block h-24"></div>

      {/* Hero Section - Compact for Mobile */}
      <section className="relative bg-gradient-to-br from-primary-500 to-white text-white overflow-hidden">
        
        {/* Mobile Compact Version - App Style */}
        <div className="md:hidden relative max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Left content - compact */}
            <div className="flex-1 pr-4">
              <h1 className="text-3xl font-bold leading-tight mb-3">
                <span className="block text-white">Մանկական</span>
                <span className="block text-yellow-200">Աշխարհ</span>
              </h1>
              <p className="text-base text-primary-100 mb-4 font-medium">
                Խաղալիքներ, հագուստ, գրքեր
              </p>
              <div className="flex gap-6 text-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">1000+</div>
                  <div className="text-primary-100 font-medium">Արտադրանք</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">24/7</div>
                  <div className="text-primary-100 font-medium">Առաքում</div>
                </div>
              </div>
            </div>
            
            {/* Right content - product showcase */}
            <div className="relative flex-shrink-0">
              {bannerProduct ? (
                <div className="relative bg-white/25 backdrop-blur-xl rounded-2xl p-3 text-center border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  {/* Product Image Container */}
                  <div className="relative w-28 h-28 mx-auto mb-2 rounded-xl flex items-center justify-center overflow-hidden">
                    <img 
                      src={bannerProduct.image} 
                      alt={bannerProduct.name}
                      className="relative w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                    <div 
                      className="w-full h-full flex items-center justify-center text-4xl"
                      style={{ display: 'none' }}
                    >
                      🥟
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-sm font-bold mb-1 text-white line-clamp-1">{bannerProduct.name}</h3>
                  <p className="text-xs text-orange-100/90 mb-2 line-clamp-1">{bannerProduct.description}</p>
                  
                  {/* Add Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(bannerProduct);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-1.5 px-2 rounded-lg text-xs font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      Ավելացնել
                    </span>
                  </button>
                </div>
              ) : (
                <div className="relative bg-white/15 backdrop-blur-lg rounded-2xl p-3 text-center border border-white/20">
                  <div className="relative w-24 h-24 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🧸</span>
                  </div>
                  <h3 className="text-sm font-bold mb-1 text-white">Մանկական խաղալիքներ</h3>
                  <p className="text-xs text-primary-100">Զվարճալի և անվտանգ</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tablet Version - Medium Size */}
        <div className="hidden md:block lg:hidden relative max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            {/* Left content - tablet optimized */}
            <div className="flex-1 pr-8">
              <h1 className="text-4xl font-bold leading-tight mb-4">
                <span className="block text-white">Մանկական</span>
                <span className="block text-yellow-200">Աշխարհ</span>
              </h1>
              <p className="text-lg text-primary-100 mb-6 font-medium">
                Խաղալիքներ, հագուստ, գրքեր երեխաների համար
              </p>
              <div className="flex gap-8 text-base">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-primary-100 font-medium">Արտադրանք</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-primary-100 font-medium">Առաքում</div>
                </div>
              </div>
            </div>
            
            {/* Right content - product showcase for tablet */}
            <div className="relative flex-shrink-0">
              {bannerProduct ? (
                <div className="relative bg-white/25 backdrop-blur-xl rounded-3xl p-4 text-center border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  {/* Product Image Container */}
                  <div className="relative w-36 h-36 mx-auto mb-3 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img 
                      src={bannerProduct.image} 
                      alt={bannerProduct.name}
                      className="relative w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                    <div 
                      className="w-full h-full flex items-center justify-center text-5xl"
                      style={{ display: 'none' }}
                    >
                      🥟
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-base font-bold mb-2 text-white line-clamp-1">{bannerProduct.name}</h3>
                  <p className="text-sm text-orange-100/90 mb-3 line-clamp-1">{bannerProduct.description}</p>
                  
                  {/* Add Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(bannerProduct);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-3 rounded-xl text-sm font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Ավելացնել
                    </span>
                  </button>
                </div>
              ) : (
                <div className="relative bg-white/15 backdrop-blur-lg rounded-3xl p-4 text-center border border-white/20">
                  <div className="relative w-32 h-32 mx-auto mb-3 bg-white/20 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl">🧸</span>
                  </div>
                  <h3 className="text-base font-bold mb-2 text-white">Մանկական խաղալիքներ</h3>
                  <p className="text-sm text-primary-100">Զվարճալի և անվտանգ</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Full Version */}
        <div className="hidden lg:block relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Անվտանգ խաղալիքներ ամեն օր
              </div>
              
              {/* Main heading */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="block text-white">Մանկական</span>
                <span className="block text-yellow-200">Աշխարհ</span>
                <span className="block text-2xl md:text-3xl font-normal text-primary-100 mt-3">
                  ուրախություն և զվարճություն
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-primary-100 leading-relaxed max-w-lg">
                Լավագույն խաղալիքներ, հագուստ և գրքեր ձեր երեխաների համար: 
                <span className="font-semibold text-white"> 1000+ արտադրանք</span> զարգացման և ուրախության համար!
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-sm text-primary-100">Արտադրանք</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">0-14</div>
                  <div className="text-sm text-primary-100">Տարի</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-primary-100">Առաքում</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/products"
                  className="group bg-white text-primary-500 px-6 py-3 rounded-xl font-bold text-base hover:bg-primary-50 hover:scale-105 transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center">
                  Դիտել արտադրանքը
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
                <Link 
                  href="/contact"
                  className="group border-2 border-white text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-white hover:text-primary-500 hover:scale-105 transition-all duration-300 text-center backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center">
                    <Phone className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Կապ մեզ հետ
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Right content - Product showcase */}
            <div className="relative">
              
              {/* Enhanced 3D Product Image - Outside the card */}
              {bannerProduct ? (
                <div className="relative w-80 h-80 mx-auto mb-4">
                  {/* 3D Product Image with floating effect */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-[calc(100%+4rem)] h-[calc(100%+4rem)] group z-50">
                    {/* Enhanced Main 3D Product Image */}
                    <img 
                      src={bannerProduct.image} 
                      alt={bannerProduct.name}
                      className="relative w-full h-full object-contain z-50"
                      style={{
                        filter: 'none',
                        transform: 'perspective(1000px) rotateX(8deg) rotateY(-3deg)',
                        imageRendering: 'crisp-edges',
                        imageRendering: '-webkit-optimize-contrast',
                      }}
                      loading="lazy"
                      onError={(e) => {
                        console.error('Ошибка загрузки изображения:', bannerProduct.image);
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />

                  </div>
                </div>
              ) : (
                <div className="relative w-72 h-72 mx-auto mb-6">
                  <div 
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-[calc(100%+3rem)] h-[calc(100%+3rem)] flex items-center justify-center text-8xl"
                    style={{
                      filter: 'none',
                      transform: 'perspective(1000px) rotateX(5deg) rotateY(-2deg)',
                    }}
                  >
                    🥟
                  </div>
                </div>
              )}

              {/* Main product card - Same as ProductCard */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 shadow-2xl overflow-visible hover:shadow-3xl hover:scale-110 transition-all duration-700 cursor-pointer group border-0 transform hover:-translate-y-3">
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-300 rounded-full animate-pulse"></div>
                
                
                {bannerProduct ? (
                  <>
                    <h3 className="text-2xl font-bold mb-2">{bannerProduct.name}</h3>
                    <p className="text-orange-100 mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">{bannerProduct.description}</p>
                    
                    {/* Quick action */}
                    <button
                      onClick={() => handleAddToCart(bannerProduct)}
                      className="bg-yellow-400 text-orange-800 px-6 py-3 rounded-xl font-bold hover:scale-105 active:bg-green-500 active:text-white transition-all duration-300 shadow-lg"
                    >
                      <ShoppingCart className="inline w-5 h-5 mr-2" />
                      Արագ պատվեր
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-2">Մանկական խաղալիքներ</h3>
                    <p className="text-primary-100 mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">Զվարճալի և անվտանգ</p>
                    
                    <Link 
                      href="/products"
                      className="bg-white text-primary-500 px-6 py-3 rounded-xl font-bold hover:scale-105 active:bg-primary-50 active:text-primary-600 transition-all duration-300 shadow-lg inline-block"
                    >
                      <ShoppingCart className="inline w-5 h-5 mr-2" />
                      Դիտել արտադրանքը
                    </Link>
                  </>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </section>



      {/* Sale Products Section */}
      <ProductSection
        title="Զեղչված արտադրանք"
        subtitle="Շահավետ առաջարկություններ սիրելի արտադրանքի համար"
        products={saleProducts}
        onAddToCart={handleAddToCart}
        addedToCart={addedToCart}
        variant="compact"
      />

      {/* Features Section - Hidden on mobile and tablet */}
      <section className="hidden lg:block py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ինչու՞ են ընտրում մեզ:
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Մենք ստեղծել ենք անվտանգության, որակի և ուրախության իդեալական համադրություն ձեր երեխաների համար
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Safety */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Անվտանգություն</h3>
              <p className="text-gray-600 text-center mb-4">Բոլոր արտադրանքը հավաստագրված է</p>
              <div className="text-center">
                <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                  🛡️ Անվտանգ
                </span>
              </div>
            </div>

            {/* Delivery */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Առաքում</h3>
              <p className="text-gray-600 text-center mb-4">Ամբողջ քաղաքով</p>
            <div className="text-center">
                <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
                  🚚 30 րոպե
                </span>
              </div>
            </div>

            {/* Development */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Զարգացում</h3>
              <p className="text-gray-600 text-center mb-4">Զարգացման խաղալիքներ</p>
            <div className="text-center">
                <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                  🧠 Զարգացնող
                </span>
              </div>
            </div>

            {/* Support */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Աջակցություն</h3>
              <p className="text-gray-600 text-center mb-4">+374 XX XXX XXX</p>
            <div className="text-center">
                <span className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
                  💬 24/7
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* New Toys Section */}
      <ProductSection
        title="Նոր խաղալիքներ"
        subtitle="Նոր խաղալիքներ զվարճալի խաղերի համար"
        products={newToys}
        onAddToCart={handleAddToCart}
        addedToCart={addedToCart}
        variant="compact"
      />

      {/* Testimonials Section - Hidden on mobile and tablet */}
      <section className="hidden lg:block py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ինչ են ասում ծնողները
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              1000-ից ավելի գոհ ընտանիքներ արդեն ընտրել են մեր արտադրանքը երեխաների համար
            </p>
          </div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Հիանալի խաղալիքներ իմ որդու համար: Որակը բարձր մակարդակի վրա է, երեխան հիացած է: Արագ առաքում և անվտանգ նյութեր: Խորհուրդ եմ տալիս բոլոր ծնողներին:"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-500 font-bold text-lg">Ա</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Աննա Պետրովա</h4>
                  <p className="text-sm text-gray-500">3 տարեկան որդու մայր</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Այստեղ գնում ենք արդեն մեկ տարի: Հիանալի զարգացնող խաղալիքներ, որակյալ մանկական հագուստ: Դուստրը պարզապես հիացած է նոր գրքերից:"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-pink-500 font-bold text-lg">Մ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Մարիա Սմիրնովա</h4>
                  <p className="text-sm text-gray-500">5 տարեկան դստեր մայր</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Պատվիրել ենք սպորտային արտադրանք որդու համար - ֆուտբոլի գնդակ և ձև: Որակը հիանալի է, արագ առաքել են: Որդին շատ գոհ է:"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-500 font-bold text-lg">Ա</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ալեքսեյ Կոզլով</h4>
                  <p className="text-sm text-gray-500">7 տարեկան որդու հայր</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">1000+</div>
              <div className="text-gray-600">Գոհ ընտանիքներ</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">1000+</div>
              <div className="text-gray-600">Արտադրանք երեխաների համար</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">30</div>
              <div className="text-gray-600">Րոպե առաքում</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">4.9</div>
              <div className="text-gray-600">Ծնողների վարկանիշ</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Hidden on mobile and tablet */}
      <section className="hidden lg:block py-20 bg-gradient-to-r from-primary-500 to-white text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Պատրա՞ստ եք ուրախացնել երեխաներին:
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Պատվիրեք հիմա և ստացեք 15% զեղչ առաջին պատվերի համար:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-white text-primary-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Պատվիրել հիմա
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-500 hover:scale-105 transition-all duration-300"
            >
              Իմանալ ավելին
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Hidden on mobile and tablet */}
      <div className="hidden lg:block">
        <Footer />
      </div>
      
      {/* Add bottom padding for mobile and tablet nav */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
}