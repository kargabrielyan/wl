'use client'

import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false
})

export default function RefundPolicyPage() {
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
            Վերադարձման Քաղաքականություն
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Content Section */}
        <div className="mb-24">
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            {/* Introduction */}
            <p className="text-xl text-gray-800">
              Մենք ցանկանում ենք, որ դուք լիովին գոհ լինեք ձեր գնումից։ Եթե ինչ-որ պատճառով ձեր պատվերը չի համապատասխանում ձեր սպասելիքներին, մենք պատրաստ ենք օգնել ձեզ փոխանակման կամ վերադարձի հարցում։
            </p>

            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Փոխանակում</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Գնված ապրանքները ենթակա չեն փոխանակման։</li>
                <li>Փոխանակումը հնարավոր է միայն այն դեպքում, եթե ապրանքը չօգտագործված է, ունի վաճառքային տեսք և նախնական փաթեթավորում։</li>
                <li>Փոխանակման համար անհրաժեշտ է ներկայացնել գնումի ՀԴՄ կտրոնը կամ էլեկտրոնային հաշիվը։</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Վերադարձ</h2>
              <p className="mb-4">
                Ապրանքը պետք է լինի չօգտագործված, առանց վնասվածքների և ամբողջական փաթեթավորմամբ։
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Վերադարձի համար անհրաժեշտ է ներկայացնել գնումի ՀԴՄ կտրոնը կամ էլեկտրոնային հաշիվը։</li>
                <li>Եթե մենք սխալ ապրանք ենք առաքել, հաճախորդը կարող է վերադարձնել ապրանքը կամ փոխանակել այն ճիշտ ապրանքի հետ՝ առանց լրացուցիչ վճարի։</li>
                <li>Անվտանգության նկատառումներից ելնելով, վերադարձվող ապրանքի վրա չպետք է լինեն մակագրություններ կամ նշումներ:</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Գումարի Վերադարձ</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Եթե վերադարձվող ապրանքը համապատասխանի վերոնշյալ պայմաններին, ապա գումարը կվերադարձվի այն նույն եղանակով, որով կատարվել է վճարումը։</li>
                <li>Քարտային վճարումների դեպքում գումարը վերադարձվում է մինչև 7 աշխատանքային օրվա ընթացքում, կախված բանկի ընթացակարգերից։</li>
                <li>Առաքման վճարները չեն վերադարձվում, բացառությամբ այն դեպքերի, երբ մենք սխալ ապրանք ենք առաքել։</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Պատվերի Չեղարկում</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Պատվերը կարող է չեղարկվել մինչև առաքումը։</li>
                <li>Եթե պատվերն արդեն առաքվել է, այն հնարավոր չէ չեղարկել։</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Անհատականացված Պատվերներ</h2>
              <p>
                Անհատականացված պատվերները, ներառյալ փորագրված, հատուկ պատրաստված կամ պատվերով արտադրված ապրանքները, վերադարձի կամ փոխանակման ենթակա չեն։
              </p>
            </section>

            {/* Special Note */}
            <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <p className="font-semibold text-gray-900 mb-2">Հատուկ նշում:</p>
              <p className="text-gray-700">
                Եթե ապրանքը վնասված է կամ առաքման ընթացքում առաջացած խնդիր կա, խնդրում ենք անհապաղ կապ հաստատել մեզ հետ, որպեսզի գտնենք լավագույն լուծումը։
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
