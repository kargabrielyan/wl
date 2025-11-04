'use client'

import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false
})

export default function PrivacyPolicyPage() {
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
            Գաղտնիության Քաղաքականություն
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Content Section */}
        <div className="mb-24">
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            {/* Introduction */}
            <div className="space-y-4">
              <p>
                Այցելելով welcomebaby.am կայք (այսուհետ՝ «Կայք») և կատարելով գնումներ, Դուք ավտոմատ կերպով տալիս եք Ձեր համաձայնությունը Ձեր անձնական տվյալների հավաքագրման, մշակման և օգտագործման համար։
              </p>
              <p>
                «Անձնական տվյալներ» ասելով, մենք նկատի ունենք Ձեզ վերաբերող ցանկացած տեղեկություն, որը թույլ է տալիս կամ կարող է թույլ տալ ուղղակի կամ անուղղակի կերպով նույնականացնել Ձեր ինքնությունը, օրինակ՝ անուն, ազգանուն, հասցե, էլ. հասցե, հեռախոսահամար և այլ տվյալներ (այսուհետ՝ «Տվյալներ»):
              </p>
              <p>
                Սույն Գաղտնիության քաղաքականության համատեքստում «մենք», «մեզ», «մեր» դերանունները վերաբերում են Կայքին (մեր մասին առավել մանրամասն տեղեկության համար կարող եք այցելել «Մեր մասին» բաժին), իսկ «Դուք», «Ձեզ», «Ձեր» դերանունները վերաբերում են ցանկացած անձի, որն այցելել է Կայք կամ օգտվում է մեր ծառայություններից։
              </p>
            </div>

            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Հավաքագրվող Տվյալները</h2>
              <p className="mb-4">Մենք կարող ենք հավաքագրել հետևյալ տեղեկությունները.</p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Կոնտակտային տվյալներ</strong> – անուն, ազգանուն, հասցե, հեռախոսահամար, էլ. հասցե</li>
                <li><strong>Գնումների մասին տվյալներ</strong> – գնվող ապրանքներ, վճարման մեթոդներ</li>
                <li><strong>Տեխնիկական տվյալներ</strong> – սարքի տեսակը, բրաուզեր, օպերացիոն համակարգ</li>
                <li><strong>Քուքիներ և թրեքինգ տեխնոլոգիաներ</strong> – կայքի օգտագործման վերլուծության համար</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Տվյալների Օգտագործում</h2>
              <p className="mb-4">
                Հավաքագրված տվյալները երբեք չեն վաճառվում կամ տրամադրվում երրորդ կողմերի մարքեթինգային նպատակներով։ Դրանք օգտագործվում են միայն՝
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Պատվերների մշակման և առաքման նպատակով,</li>
                <li>Օգտատերերին աջակցություն տրամադրելու համար,</li>
                <li>Կայքի ֆունկցիոնալությունը բարելավելու համար,</li>
                <li>Օրենքի պահանջներին համապատասխանելու համար։</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Տվյալների Պահպանման Ժամկետներ</h2>
              <p className="mb-4">Ձեր անձնական տվյալները պահվում են հետևյալ կերպ՝</p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Օգտատերերի հաշվի տվյալները</strong> – հաշվի ակտիվ լինելու ողջ ընթացքում,</li>
                <li><strong>Գնումների պատմությունը</strong> – 5 տարի (հարկային ու հաշվապահական պահանջներին համապատասխանելու համար),</li>
                <li><strong>Մարկետինգային նպատակների համար պահվող տվյալները</strong> – 2 տարի կամ մինչև օգտատերը հրաժարվի։</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Տվյալների Ապահովություն</h2>
              <p className="mb-4">
                Մենք կիրառում ենք համապատասխան տեխնիկական և կազմակերպչական միջոցառումներ Ձեր տվյալների պաշտպանությունն ապահովելու համար, այդ թվում՝
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>SSL կոդավորում</strong> – վճարային և անձնական տվյալների պաշտպանված փոխանցման համար</li>
                <li><strong>Մուտքի վերահսկում</strong> – սահմանափակ հասանելիություն անձնական տվյալներին</li>
                <li><strong>Կանոնավոր ստուգումներ</strong> – անվտանգության հնարավոր խոցելիությունների հայտնաբերման համար</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Տվյալների Կիսում Երրորդ Կողմերի Հետ</h2>
              <p className="mb-4">
                Մենք չենք վաճառում կամ տրամադրում Ձեր տվյալները երրորդ կողմերին, բացառությամբ՝
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Առաքման ծառայություններ</strong> – որպեսզի պատվերը տեղ հասնի ճիշտ հասցեով</li>
                <li><strong>Վճարային համակարգեր</strong> – վճարումների անվտանգ մշակման համար</li>
                <li><strong>Իրավապահ մարմիններ</strong> – օրենքով սահմանված պահանջների դեպքում</li>
              </ul>
              <p className="mt-4">
                Բոլոր երրորդ կողմերը պարտավորվում են պաշտպանել Ձեր տվյալները և չեն կարող դրանք օգտագործել այլ նպատակների համար։
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Օգտատերերի Իրավունքներ</h2>
              <p className="mb-4">Դուք իրավունք ունեք՝</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Ստանալ Ձեր անձնական տվյալների պատճենը,</li>
                <li>Խմբագրել կամ հեռացնել Ձեր տվյալները (մեր կայքի կարգավորումների կամ մեր հաճախորդների սպասարկման միջոցով),</li>
                <li>Հրաժարվել շուկայավարման նամակներից՝ օգտագործելով յուրաքանչյուր նամակի մեջ առկա 'unsubscribe' հղումը,</li>
                <li>Պահանջել, որ Ձեր տվյալները չմշակվեն որոշակի նպատակներով, բացառությամբ օրենսդրությամբ պահանջվող դեպքերի։</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Քուքիների (Cookies) Օգտագործում</h2>
              <p className="mb-4">
                Մեր կայքը օգտագործում է քուքիներ՝ օգտատերերի փորձն օպտիմալացնելու համար։ Մենք օգտագործում ենք՝
              </p>
              <ul className="space-y-2 list-disc list-inside mb-4">
                <li><strong>Ֆունկցիոնալ քուքիներ</strong> – կայքի ճիշտ աշխատելու համար,</li>
                <li><strong>Վերլուծական քուքիներ</strong> – օգտատերերի վարքագիծը հասկանալու և կայքի բարելավման նպատակով,</li>
                <li><strong>Մարքեթինգային քուքիներ</strong> (միայն ձեր համաձայնությամբ) – ավելի համապատասխան գովազդներ տրամադրելու համար։</li>
              </ul>
              <p>
                Դուք կարող եք ցանկացած պահի փոխել ձեր նախընտրությունները՝ կարգավորելով քուքիները ձեր բրաուզերի միջոցով կամ այցելելով մեր [Քուքիների Կառավարման Կենտրոն] (եթե ունեք հատուկ էջ քուքիները կառավարելու համար)։
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Քաղաքականության Փոփոխություններ</h2>
              <p>
                Մենք իրավասու ենք, օրենքով թույլատրելի, փոփոխություններ կատարել այս էջում և վերոհիշյալ կետերում, որի փոփոխությունների մասին կտեղեկացնենք Կայքում:
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
