'use client'

import Footer from '@/components/Footer'

export default function DeliveryTermsPage() {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#ffffff' }}>
      
      {/* Отступ для fixed хедера */}
      <div className="lg:hidden h-20"></div>
      <div className="hidden lg:block h-28"></div>

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden flex items-center justify-center py-8" style={{ backgroundColor: '#f3d98c' }}>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#f3d98c' }}></div>
        <div className="absolute top-20 right-20 w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#f3d98c' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full opacity-25" style={{ backgroundColor: '#f3d98c' }}></div>
        <div className="absolute bottom-10 right-1/3 w-8 h-8 rounded-full opacity-20" style={{ backgroundColor: '#f3d98c' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-center" style={{ color: '#002c45' }}>
            Առաքման Պայմաններ
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Content Section */}
        <div className="mb-24">
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p className="text-xl text-gray-800">
              Մենք պարտավորվում ենք մատակարարել ձեր պատվերը արագ, ապահով և հարմարավետ կերպով։ Ստորև ներկայացված են առաքման հիմնական պայմանները։
            </p>

            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Առաքման Ժամկետներ</h2>
              <ul className="space-y-4 list-disc list-inside">
                <li>
                  <strong>Առաքման ժամկետները կախված են ապրանքի առկայությունից։</strong>
                  <ul className="mt-2 ml-6 space-y-2 list-disc list-inside">
                    <li>Եթե ապրանքը առկա է, ապա հնարավոր է առաքել 1-ից 2 ժամվա ընթացքում։</li>
                    <li>Եթե ապրանքը առկա չէ, ապա առաքումը իրականացվում է 3-ից 5 աշխատանքային օրվա ընթացքում ։</li>
                  </ul>
                </li>
                <li>
                  <strong>Հնարավոր ուշացումների դեպքում մեր թիմը կապ կհաստատի ձեզ հետ։</strong>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Առաքման Տարբերակներ</h2>
              <p className="mb-4">Մենք առաջարկում ենք հետևյալ առաքման տարբերակները՝</p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Ստանդարտ առաքում</strong> – իրականացվում է մեր գործընկեր առաքման ծառայությունների միջոցով։</li>
                <li><strong>Շտապ առաքում</strong> – հնարավոր է լրացուցիչ վճարով։</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Առաքման Վճարներ</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Առաքումը անվճար է, Երևանում երբ գնումը գերազանցում է 20,000 դրամը (միայն անկողնային պարագաների դեպքում):</li>
                <li>20.000 դրամից ցածր գնումներ կատարելու դեպքում առաքումը Երևանի տարածքում 1000 դրամ է, իսկ մարզեր առաքումը X դրամ։</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Հնարավոր Ուշացումներ</h2>
              <p className="mb-4">
                Չնայած մեր ջանքերին, որոշ դեպքերում առաքումը կարող է ուշանալ՝
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Եղանակային պայմանների,</li>
                <li>Տրանսպորտային խնդիրների,</li>
                <li>Տոնական և աշխատանքային ծանրաբեռնվածության պատճառով։</li>
              </ul>
              <p className="mt-4">
                Մենք ձեզ կտեղեկացնենք հնարավոր ուշացումների մասին՝ պահպանելով թափանցիկ հաղորդակցություն։
              </p>
            </section>
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
