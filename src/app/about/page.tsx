'use client'

import dynamic from 'next/dynamic'
import { Clock, Users, Heart, Award, ChefHat, Truck, Star, CheckCircle } from 'lucide-react'

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false
})

export default function AboutPage() {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#ffffff' }}>
      
      {/* Отступ для fixed хедера */}
      <div className="lg:hidden h-20"></div>
      <div className="hidden lg:block h-28"></div>

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden flex items-center justify-center py-20 pt-48" style={{ backgroundColor: '#f3d98c' }}>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#f3d98c' }}></div>
        <div className="absolute top-20 right-20 w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#f3d98c' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full opacity-25" style={{ backgroundColor: '#f3d98c' }}></div>
        <div className="absolute bottom-10 right-1/3 w-8 h-8 rounded-full opacity-20" style={{ backgroundColor: '#f3d98c' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-center" style={{ color: '#002c45' }}>
            Welcome Baby-ի մասին
          </h1>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl leading-relaxed text-center" style={{ color: '#002c45' }}>
              Նորածնային կահույք և անկողնային պարագաներ արտադրող ընկերություն
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <div className="mb-24">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Մեր պատմությունը</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Welcome Baby ընկերությունը ստեղծվել է 2015 թվականին՝ Անահիտ և Լուսինե Անդրյանների ջանքերի շնորհիվ։ Նորածնային կահույք և անկողնային պարագաներ արտադրող ընկերություն, որն ունի իր 2 խանութ սրահները՝ Երևանում և Գյումրիում։
              </p>
              <p>
                Շուրջ 10 տարիների ընթացքում ունենք 80.000 գոհ պատվիրատուներ, ավելի քան 50 գործընկերներ և 100.000ից ավել միավոր ապրանքի արտադրություն։
              </p>
              <p>
                Ունենք առաքում Երևանում, Հայաստանի բոլոր մարզերում նաև արտերկիր հայ փոստի միջոցով։
              </p>
              <p>
                Ամենակարևոր առավելություններից է անհատական պատվերների ընդունումը և պատվերների սեղմ ժամկետները։
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Մեր արժեքները</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#f3d98c' }}>
                <Heart className="h-10 w-10" style={{ color: '#002c45' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Սեր գործի հանդեպ</h3>
              <p className="text-gray-700 leading-relaxed">
                Յուրաքանչյուր ուտեստ պատրաստվում է հոգով և մանրամասների նկատմամբ ուշադրությամբ
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#f3d98c' }}>
                <Award className="h-10 w-10" style={{ color: '#002c45' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Որակ</h3>
              <p className="text-gray-700 leading-relaxed">
                Օգտագործում ենք միայն լավագույն բաղադրիչներ և ստուգված բաղադրատոմսեր
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#f3d98c' }}>
                <Clock className="h-10 w-10" style={{ color: '#002c45' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Արագություն</h3>
              <p className="text-gray-700 leading-relaxed">
                Պատրաստում ենք արագ, բայց ոչ որակի և համի հաշվին
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#f3d98c' }}>
                <Users className="h-10 w-10" style={{ color: '#002c45' }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Համայնք</h3>
              <p className="text-gray-700 leading-relaxed">
                Ստեղծում ենք վայր, որտեղ հավաքվում են համեղ ուտեստների սիրահարները
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Մեր թիմը</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform" style={{ backgroundColor: '#f3d98c' }}>
                <ChefHat className="h-16 w-16" style={{ color: '#002c45' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Գլխավոր խոհարար</h3>
              <p className="text-gray-700 leading-relaxed">
                15 տարվա փորձով Երևանու լավագույն ռեստորաններում: 
                Գիտի կատարյալ խմորի և լցոնման գաղտնիքները:
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform" style={{ backgroundColor: '#f3d98c' }}>
                <Users className="h-16 w-16" style={{ color: '#002c45' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Մենեջեր</h3>
              <p className="text-gray-700 leading-relaxed">
                Ապահովում է գերազանց սպասարկում և սպասարկման որակ: 
                Միշտ կօգնի ընտրության հարցում և կպատասխանի հարցերին:
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform" style={{ backgroundColor: '#f3d98c' }}>
                <Truck className="h-16 w-16" style={{ color: '#002c45' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Առաքում</h3>
              <p className="text-gray-700 leading-relaxed">
                Արագ և ճշգրիտ առաքում ամբողջ Երևանով: 
                Ձեր պատվերը կհասնի տաք և թարմ:
              </p>
            </div>
          </div>
        </div>


        {/* Stats Section */}
        <div className="rounded-3xl p-16 text-center mb-16" style={{ backgroundColor: '#f3d98c' }}>
          <h2 className="text-4xl font-bold mb-16" style={{ color: '#002c45' }}>Welcome Baby-ն թվերով</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold mb-3" style={{ color: '#002c45' }}>10+</div>
              <div className="text-lg font-semibold mb-2" style={{ color: '#002c45' }}>տարվա փորձ</div>
              <div className="text-sm text-gray-600">Պրոֆեսիոնալ ծառայություն</div>
            </div>
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold mb-3" style={{ color: '#002c45' }}>50+</div>
              <div className="text-lg font-semibold mb-2" style={{ color: '#002c45' }}>գործընկերներ</div>
              <div className="text-sm text-gray-600">Վստահելի գործընկերներ</div>
            </div>
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold mb-3" style={{ color: '#002c45' }}>80,000+</div>
              <div className="text-lg font-semibold mb-2" style={{ color: '#002c45' }}>գոհ հաճախորդ</div>
              <div className="text-sm text-gray-600">Գոհ հաճախորդներ</div>
            </div>
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold mb-3" style={{ color: '#002c45' }}>100,000+</div>
              <div className="text-lg font-semibold mb-2" style={{ color: '#002c45' }}>վաճառված ապրանքներ</div>
              <div className="text-sm text-gray-600">Վաճառված ապրանքներ</div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-3xl p-16 shadow-lg mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Մեր ծառայությունները</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#f3d98c' }}>
                <span className="text-2xl font-bold" style={{ color: '#002c45' }}>1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Արտադրություն</h3>
              <p className="text-gray-700">Նորածնային կահույք և անկողնային պարագաներ</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#f3d98c' }}>
                <span className="text-2xl font-bold" style={{ color: '#002c45' }}>2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Առաքում</h3>
              <p className="text-gray-700">Առաքում Երևանում, Հայաստանի բոլոր մարզերում</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#f3d98c' }}>
                <span className="text-2xl font-bold" style={{ color: '#002c45' }}>3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Անհատական պատվերներ</h3>
              <p className="text-gray-700">Ընդունում ենք անհատական պատվերներ</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#f3d98c' }}>
                <span className="text-2xl font-bold" style={{ color: '#002c45' }}>4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Արտերկիր առաքում</h3>
              <p className="text-gray-700">Առաքում արտերկիր հայ փոստի միջոցով</p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Hide Footer on Mobile and Tablet */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  )
}