import Footer from '@/components/Footer'
import { Phone, Mail, MapPin, Clock, MessageCircle, Star, Calendar, CreditCard } from 'lucide-react'
import TwinklingStars from '@/components/TwinklingStars'

export default function ContactPage() {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#002c45' }}>
      <TwinklingStars count={50} imageStarRatio={0.25} />
      
      {/* Отступ для fixed хедера */}
      <div className="lg:hidden h-16"></div>
      <div className="hidden lg:block h-24"></div>
      
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-20 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Կապ մեզ հետ
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
            Հարցեր ունե՞ք: Ցանկանու՞մ եք պատվիրել: Մենք միշտ ուրախ ենք օգնել:
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Հեռախոս</h3>
            <p className="text-gray-600 mb-2">+374 95-044-888</p>
            <p className="text-sm text-gray-500">Երկ-Կիր: 10:00 - 22:00</p>
            <a 
              href="tel:+37495044888"
              className="inline-block mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Զանգել
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Էլ. փոստ</h3>
            <p className="text-gray-600 mb-2">info@pideh-armenia.am</p>
            <p className="text-sm text-gray-500">Պատասխանում ենք 2 ժամում</p>
            <a 
              href="mailto:info@pideh-armenia.am"
              className="inline-block mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Գրել
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Աշխատանքային ժամեր</h3>
            <p className="text-gray-600 mb-2">Երկ-Կիր: 10:00 - 22:00</p>
            <p className="text-sm text-gray-500">Առաքում: 11:00 - 21:00</p>
          </div>
        </div>

        {/* Quick Order Section */}
        <div className="bg-orange-500 rounded-2xl p-8 text-white text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Արագ պատվեր</h2>
          <p className="text-lg text-orange-100 mb-6">
            Պարզապես զանգեք մեզ արագ պատվերի համար
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+37495044888"
              className="bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Զանգել +374 95-044-888</span>
            </a>
            <a 
              href="https://www.facebook.com/PIDEH.Armenia/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
            <a 
              href="https://www.instagram.com/pideh.armenia/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Մեր մասնաճյուղերը</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-10 w-10 text-orange-500" />
              </div>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-lg font-semibold">ул. Зоравар Андраник 151/2</p>
              </div>
              <a 
                href="https://maps.google.com/?q=ул.+Зоравар+Андраник+151/2,+Ереван,+Армения"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Քարտեզում
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-10 w-10 text-orange-500" />
              </div>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-orange-500" />
                <p className="text-gray-600 text-lg font-semibold">ул. Езник Кохбаци 83</p>
              </div>
              <a 
                href="https://maps.google.com/?q=ул.+Езник+Кохбаци+83,+Ереван,+Армения"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Քարտեզում
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Հաճախակի տրվող հարցեր</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Որքա՞ն ժամանակ է պատրաստվում պատվերը:</h3>
              <p className="text-gray-600">Սովորաբար 15-20 րոպե: Գագաթնակետային ժամերին կարող է մի փոքր ավելի երկար լինել:</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Առաքում կա՞:</h3>
              <p className="text-gray-600">Այո, մենք առաքում ենք ամբողջ Երևանով: Առաքման արժեքը պարզեք պատվիրելիս:</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Կարելի՞ է պատվիրել վաղը:</h3>
              <p className="text-gray-600">Իհարկե: Մենք ընդունում ենք նախապես պատվերներ ցանկացած օրվա համար:</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ինչ վճարումների եղանակներ կան:</h3>
              <p className="text-gray-600">Կանխիկ, քարտ, Idram, ArCa, Ameriabank - ընտրեք հարմար եղանակը:</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Զեղչեր կա՞ն:</h3>
              <p className="text-gray-600">Այո: 5000 ֏-ից պատվերի դեպքում - 10% զեղչ, 10000 ֏-ից - 15% զեղչ:</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ինչպե՞ս կապվել մեզ հետ:</h3>
              <p className="text-gray-600">Զանգեք, գրեք WhatsApp-ով կամ գալեք մեզ մոտ անձամբ:</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Մեր հաճախորդների ակնարկները</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">😋</span>
              </div>
              <p className="text-gray-600 mb-4">"Անհավատալի համեղ: Այս արդեն երրորդ անգամն եմ պատվիրում անընդմեջ: Արագ առաքում և գերազանց որակ:"</p>
              <p className="font-semibold text-gray-900">- Աննա Մ.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔥</span>
              </div>
              <p className="text-gray-600 mb-4">"Լավագույն խաչապուրիները Երևանում: Խայծ խաչապուրին պարզապես ռումբ է: Խորհուրդ եմ տալիս բոլորին:"</p>
              <p className="font-semibold text-gray-900">- Դավիթ Կ.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <p className="text-gray-600 mb-4">"Գերազանց սպասարկում և համեղ ուտեստ: Պատվիրում ենք ամբողջ ընտանիքով ամեն շաբաթվա վերջ:"</p>
              <p className="font-semibold text-gray-900">- Պետրոսյանների ընտանիք</p>
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