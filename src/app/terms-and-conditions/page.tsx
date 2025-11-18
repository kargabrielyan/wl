'use client'

import Footer from '@/components/Footer'

export default function TermsAndConditionsPage() {
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
            Օգտագործման Պայմաններ
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Content Section */}
        <div className="mb-24">
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Ընդհանուր Դրույթներ</h2>
              <div className="space-y-4">
                <p>
                  <strong>1.1.</strong> Այս Օգտագործման Պայմանները կարգավորում են welcomebaby.am կայքի (այսուհետ՝ «Կայք») օգտագործումը։
                </p>
                <p>
                  <strong>1.2.</strong> Կայքը մուտք գործելով կամ օգտվելով Կայքի ծառայություններից՝ դուք ընդունում եք սույն պայմանները։
                </p>
                <p>
                  <strong>1.3.</strong> Եթե համաձայն չեք այս պայմաններից որևէ մեկի հետ, խնդրում ենք չօգտագործել Կայքը։
                </p>
                <p>
                  <strong>1.4.</strong> Կայքը իրավունք ունի փոփոխել սույն պայմանները առանց նախնական ծանուցման։ Փոփոխությունները ուժի մեջ են մտնում Կայքում հրապարակվելու պահից։
                </p>
                <p>
                  <strong>1.5.</strong> Օգտատիրոջ կողմից Կայքի շարունակական օգտագործումը համարվում է նոր պայմանների ընդունում։
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Հիմնակա Հասկացություններ</h2>
              <p className="mb-4">Այս պայմաններում օգտագործված հիմնական հասկացությունները հետևյալ են.</p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Կայք</strong> – welcomebaby.am ինտերնետային հարթակը, որը տրամադրում է ծառայություններ, բովանդակություն և այլ հնարավորություններ։</li>
                <li><strong>Օգտատեր</strong> – ֆիզիկական կամ իրավաբանական անձ, որը մուտք է գործում Կայք կամ օգտվում է նրա ծառայություններից։</li>
                <li><strong>Ծառայություններ</strong> – Կայքի միջոցով առաջարկվող բոլոր ապրանքները, ծառայությունները, տեղեկատվությունը և գործիքները։</li>
                <li><strong>Բովանդակություն</strong> – ցանկացած տեքստ, պատկեր, տեսանյութ, ձայնագրություն կամ այլ նյութ, որը հասանելի է Կայքում։</li>
                <li><strong>Մտավոր Սեփականություն</strong> – Կայքի անվանումը, լոգոն, տեքստերը, ծրագրային ապահովումը և այլ տարրեր, որոնք պաշտպանված են հեղինակային իրավունքով կամ ապրանքանիշային իրավունքով։</li>
                <li><strong>Գործարք</strong> – Կայքում կատարվող ցանկացած գնում, ծառայության գրանցում կամ այլ պայմանագրային համաձայնություն։</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Օգտատերերի Պարտականությունները</h2>
              <div className="space-y-4">
                <p>
                  <strong>3.1.</strong> Օգտատերը պարտավորվում է՝
                </p>
                <ul className="ml-6 space-y-2 list-disc list-inside">
                  <li>Կայքն օգտագործել միայն օրինական նպատակներով։</li>
                  <li>Չփորձել խափանել Կայքի տեխնիկական աշխատանքը։</li>
                  <li>Չփոխանցել վիրուսներ, վնասակար ծրագրեր կամ ցանկացած վնասակար կոդ։</li>
                  <li>Չփորձել ձեռք բերել անօրինական մուտք Կայքի սերվերներին կամ տվյալներին։</li>
                  <li>Չհրապարակել կամ տարածել անօրինական, վիրավորական, զրպարտիչ կամ ատելություն պարունակող բովանդակություն։</li>
                </ul>
                <p>
                  <strong>3.2.</strong> Կայքը իրավունք ունի արգելափակել ցանկացած օգտատիրոջ, եթե նրա գործողությունները խախտում են սույն պայմանները։
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Պատասխանատվության Սահմանափակում</h2>
              <div className="space-y-4">
                <p>
                  <strong>4.1.</strong> Կայքը տրամադրվում է «ինչպես կա» սկզբունքով, առանց որևէ երաշխիքի։
                </p>
                <p>
                  <strong>4.2.</strong> Կայքը պատասխանատվություն չի կրում հետևյալ դեպքերում՝
                </p>
                <ul className="ml-6 space-y-2 list-disc list-inside">
                  <li>Կայքի հնարավոր սխալներ կամ տեխնիկական խափանումներ։</li>
                  <li>Օգտատիրոջ կողմից մուտքագրված սխալ կամ կեղծ տեղեկատվություն։</li>
                  <li>Երրորդ անձանց կողմից Կայքի օգտագործման արդյունքում առաջացած վնասների համար։</li>
                  <li>Կայքի միջոցով տրամադրվող բովանդակության ճշգրտության, հուսալիության կամ արդիականության համար։</li>
                </ul>
                <p>
                  <strong>4.3.</strong> Կայքը պատասխանատվություն չի կրում անկանխատեսելի վնասների, օրինակ՝ եկամուտի կորստի կամ տվյալների ոչնչացման համար։
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Մտավոր Սեփականություն</h2>
              <div className="space-y-4">
                <p>
                  <strong>5.1.</strong> Կայքի բոլոր նյութերը, ներառյալ տեքստերը, պատկերները, լոգոները, ծրագրային ապահովումը, պատկանում են Կայքին կամ դրա իրավատերերին։
                </p>
                <p>
                  <strong>5.2.</strong> Արգելվում է Կայքի բովանդակության պատճենահանումը, տարածումը, վաճառքը կամ օգտագործումը առանց Կայքի գրավոր թույլտվության։
                </p>
                <p>
                  <strong>5.3.</strong> Օգտատերը իրավունք չունի օգտագործել Կայքի ապրանքանիշը կամ դոմենային անունը առանց գրավոր թույլտվության։
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Վճարումներ Եվ Վերադարձներ</h2>
              <div className="space-y-4">
                <p>
                  <strong>6.1.</strong> Եթե Կայքը տրամադրում է վճարովի ծառայություններ, ապա վճարումները կատարվում են նշված պայմաններով։
                </p>
                <p>
                  <strong>6.2.</strong> Կայքը կարող է փոխել գները կամ վճարման պայմանները առանց նախնական ծանուցման։
                </p>
                <p>
                  <strong>6.3.</strong> Եթե կիրառելի է, վերադարձի կամ փոխհատուցման պայմանները նշվում են Կայքում առանձին էջում։
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Վեճերի Կարգավորում</h2>
              <div className="space-y-4">
                <p>
                  <strong>7.1.</strong> Այս պայմանները կարգավորվում են Հայաստանի Հանրապետության օրենսդրությամբ։
                </p>
                <p>
                  <strong>7.2.</strong> Բոլոր վեճերը նախ փորձում են լուծվել բանակցությունների միջոցով։
                </p>
                <p>
                  <strong>7.3.</strong> Եթե կողմերը չեն կարողանում համաձայնության գալ, վեճերը լուծվում են ՀՀ իրավասու դատարաններում։
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Ֆորս-Մաժոր</h2>
              <div className="space-y-4">
                <p>
                  <strong>8.1.</strong> Կայքը չի կրում պատասխանատվություն իր պարտավորությունները չկատարելու կամ ուշացնելու համար, եթե դա պայմանավորված է ֆորս-մաժորային հանգամանքներով, այդ թվում՝
                </p>
                <ul className="ml-6 space-y-2 list-disc list-inside">
                  <li>Բնական աղետներ (երկրաշարժ, ջրհեղեղ, հրդեհ և այլն)։</li>
                  <li>Պետական մարմինների արգելող որոշումներ։</li>
                  <li>Ռազմական գործողություններ, ահաբեկչություն կամ զանգվածային անկարգություններ։</li>
                  <li>Տեխնիկական խափանումներ, որոնք պայմանավորված չեն Կայքի գործողություններով։</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Գաղտնիություն Եվ Տվյալների Պաշտպանություն</h2>
              <div className="space-y-4">
                <p>
                  <strong>9.1.</strong> Կայքը պարտավորվում է պահպանել օգտատերերի տվյալների գաղտնիությունը՝ համաձայն Գաղտնիության քաղաքականության։
                </p>
                <p>
                  <strong>9.2.</strong> Կայքը կարող է հավաքել և մշակել օգտատերերի անձնական տվյալները օրինական նպատակներով։
                </p>
                <p>
                  <strong>9.3.</strong> Կայքը իրավունք ունի տրամադրել օգտատիրոջ տվյալները պետական մարմիններին՝ օրենքով նախատեսված դեպքերում։
                </p>
              </div>
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
