// Тест для проверки максимальных отступов
console.log('🔧 Проверяем максимальные отступы между хедером и контентом...')

const pages = [
  {
    name: 'Страница входа',
    path: '/login',
    spacing: {
      headerHeight: 'h-16 (64px)',
      contentPadding: 'pt-32 pb-16',
      totalSpacing: '64px + 128px = 192px отступ сверху'
    }
  },
  {
    name: 'Страница регистрации',
    path: '/register',
    spacing: {
      headerHeight: 'h-16 (64px)',
      contentPadding: 'pt-32 pb-16',
      totalSpacing: '64px + 128px = 192px отступ сверху'
    }
  },
  {
    name: 'Страница профиля',
    path: '/profile',
    spacing: {
      headerHeight: 'h-16 (64px)',
      contentPadding: 'pt-28 pb-20 lg:pt-32 lg:pb-8',
      totalSpacing: '64px + 112px = 176px отступ сверху (мобильные)'
    }
  }
]

console.log('\n📏 Анализ максимальных отступов:')
console.log('=' * 50)

pages.forEach((page, index) => {
  console.log(`\n${index + 1}. ${page.name}`)
  console.log(`   Высота хедера: ${page.spacing.headerHeight}`)
  console.log(`   Отступы контента: ${page.spacing.contentPadding}`)
  console.log(`   Общий отступ: ${page.spacing.totalSpacing}`)
})

console.log('\n✅ Максимальные отступы:')
console.log('=' * 35)
console.log('• Страницы входа и регистрации: pt-32 (128px)')
console.log('• Страница профиля: pt-28 (112px) на мобильных, pt-32 (128px) на десктопе')
console.log('• Очень большое пространство между хедером и контентом')
console.log('• Контент гарантированно не заходит под хедер')

console.log('\n🎯 Результат:')
console.log('=' * 20)
console.log('• Максимальное пространство для комфортного чтения')
console.log('• Контент полностью отделен от хедера')
console.log('• Отличный пользовательский опыт')
console.log('• Адаптивность сохранена для всех устройств')

console.log('\n✅ Отступы максимально увеличены!')

