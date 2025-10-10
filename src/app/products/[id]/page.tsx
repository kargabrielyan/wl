import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Product } from '@/types'
import { prisma } from '@/lib/prisma'

// Server Component - данные загружаются на сервере
export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  try {
    // Загружаем только основной продукт
    const product = await prisma.product.findUnique({
      where: {
        id,
        isAvailable: true
      },
      select: {
        id: true,
        name: true,
        image: true
      }
    })

  if (!product) {
      notFound()
    }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Back Button */}
      <Link 
        href="/products"
        className="absolute top-4 left-4 inline-flex items-center text-gray-600 hover:text-orange-500 z-10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Назад
      </Link>

      {/* Product Image Only */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-visible relative">
          <div className="relative h-[80vh] overflow-visible">
            {/* Product Image */}
            {product.image && product.image !== 'no-image' ? (
              <div className="relative w-full h-full">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%+1rem)] h-[calc(100%+1rem)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    priority
                    className="relative w-full h-full object-contain"
                    style={{
                      filter: 'none',
                      transform: 'perspective(1000px) rotateX(5deg) rotateY(-2deg)',
                      imageRendering: 'crisp-edges',
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div 
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-[calc(100%+3rem)] h-[calc(100%+3rem)] flex items-center justify-center opacity-70 text-8xl"
                style={{
                  filter: 'none',
                  transform: 'perspective(1000px) rotateX(5deg) rotateY(-2deg)',
                }}
              >
                🥟
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    )
  } catch (error) {
    console.error('Error loading product page:', error)
    notFound()
  }
}

