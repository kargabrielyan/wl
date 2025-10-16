import Footer from '@/components/Footer'
import { Clock, Users, Heart, Award, ChefHat, Truck, Star, CheckCircle } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Отступ для fixed хедера */}
      <div className="lg:hidden h-16"></div>
      <div className="hidden lg:block h-24"></div>
      
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-24 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Pideh Armenia-ի մասին
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto leading-relaxed">
            Մենք ստեղծում ենք եզակի հայկական բիդե,
            համադրելով ավանդական բաղադրատոմսերը ժամանակակից համերով:
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <div className="mb-24">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Մեր պատմությունը</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Pideh Armenia-ն ծնվել է ավանդական հայկական խոհանոցի հանդեպ սիրուց և 
                հայկական շուկայի համար ինչ-որ եզակի ստեղծելու ցանկությունից: Մենք ստեղծեցինք նոր 
                արտադրանք - հայկական բիդե, լցնելով դրանք այն լցոնումներով, որոնք սիրում են 
                ժամանակակից գուրմանները:
              </p>
              <p>
                Մեր յուրաքանչյուր "նավակը" պատրաստվում է ձեռքով՝ օգտագործելով միայն 
                թարմ բաղադրիչներ: Մենք չենք օգտագործում սառեցված կիսաֆաբրիկատներ 
                կամ պահպանիչներ - միայն բնական արտադրանք և ավանդական 
                պատրաստման մեթոդներ:
              </p>
              <p>
                Կարճ ժամանակում մենք դարձանք սիրելի վայր նրանց համար, ովքեր գնահատում են 
                որակը, համը և բնօրինակությունը: Մեր առաքելությունը - բերել 
                Երևան նոր համեր, միաժամանակ պահպանելով ավանդությունների հանդեպ հարգանքը:
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Մեր արժեքները</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Սեր գործի հանդեպ</h3>
              <p className="text-gray-700 leading-relaxed">
                Յուրաքանչյուր ուտեստ պատրաստվում է հոգով և մանրամասների նկատմամբ ուշադրությամբ
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Որակ</h3>
              <p className="text-gray-700 leading-relaxed">
                Օգտագործում ենք միայն լավագույն բաղադրիչներ և ստուգված բաղադրատոմսեր
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Արագություն</h3>
              <p className="text-gray-700 leading-relaxed">
                Պատրաստում ենք արագ, բայց ոչ որակի և համի հաշվին
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-orange-500" />
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
              <div className="w-32 h-32 bg-orange-200 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ChefHat className="h-16 w-16 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Գլխավոր խոհարար</h3>
              <p className="text-gray-700 leading-relaxed">
                15 տարվա փորձով Երևանու լավագույն ռեստորաններում: 
                Գիտի կատարյալ խմորի և լցոնման գաղտնիքները:
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-32 h-32 bg-orange-200 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="h-16 w-16 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Մենեջեր</h3>
              <p className="text-gray-700 leading-relaxed">
                Ապահովում է գերազանց սպասարկում և սպասարկման որակ: 
                Միշտ կօգնի ընտրության հարցում և կպատասխանի հարցերին:
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="w-32 h-32 bg-orange-200 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Truck className="h-16 w-16 text-orange-500" />
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
        <div className="bg-orange-500 rounded-3xl p-16 text-white text-center mb-16">
          <h2 className="text-4xl font-bold mb-12">Pideh Armenia-ն թվերով</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="group">
              <div className="text-6xl font-bold mb-4 group-hover:scale-110 transition-transform">500+</div>
              <div className="text-xl text-orange-100">Պատվեր օրական</div>
            </div>
            <div className="group">
              <div className="text-6xl font-bold mb-4 group-hover:scale-110 transition-transform">15</div>
              <div className="text-xl text-orange-100">Եզակի համեր</div>
            </div>
            <div className="group">
              <div className="text-6xl font-bold mb-4 group-hover:scale-110 transition-transform">2</div>
              <div className="text-xl text-orange-100">Մասնաճյուղ Երևանում</div>
            </div>
            <div className="group">
              <div className="text-6xl font-bold mb-4 group-hover:scale-110 transition-transform">15-20</div>
              <div className="text-xl text-orange-100">Րոպե պատրաստում</div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-3xl p-16 shadow-lg mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Ինչպես ենք պատրաստում</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-500">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Բաղադրիչների ընտրություն</h3>
              <p className="text-gray-700">Յուրաքանչյուր առավոտ ընտրում ենք միայն թարմ արտադրանք</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-500">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Խմորի պատրաստում</h3>
              <p className="text-gray-700">Խմոր ենք հունցում ավանդական բաղադրատոմսով</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-500">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Ձևավորում</h3>
              <p className="text-gray-700">Ձեռքով ձևավորում ենք նավակներ և ավելացնում լցոնում</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-500">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Թխում</h3>
              <p className="text-gray-700">Թխում ենք մինչև ոսկեգույն կեղև</p>
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