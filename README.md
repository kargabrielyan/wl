# Shop Classic — Профессиональный интернет-магазин

> Полноценный, независимый интернет-магазин уровня продакшн на TypeScript.  
> База для создания 30-40 магазинов в год с быстрой адаптацией под клиента.

---

## 🎯 ЧТО ЭТО?

Профессиональный e-commerce проект с полным функционалом:

- **Каталог:** категории, бренды, атрибуты, варианты, фото
- **Поиск:** Meilisearch с фильтрами, синонимами, опечатками
- **Корзина:** гостевая и авторизованная, брошенные корзины
- **Checkout:** одностраничный с валидацией
- **Оплата:** Idram, ArCa (3-DS), идемпотентность, вебхуки
- **Доставка:** самовывоз, курьер, по стране, геозоны
- **ЛК:** профиль, адреса, история заказов
- **Заказы:** статусы, комментарии, уведомления email/SMS
- **Админка:** CRUD, массовые операции, импорт CSV/XLSX
- **SEO:** мета-теги, sitemap, robots, Schema.org, hreflang (RU/AM/EN)

---

## 🚀 БЫСТРЫЙ СТАРТ (ЛОКАЛЬНЫЙ ЗАПУСК)

### Требования:

- Node.js 18.20.0+
- PostgreSQL 16+ (локально установленный)
- npm или yarn

### Установка и запуск:

```bash
# 1. Клонировать проект
git clone https://github.com/yourname/shop-classic.git
cd shop-classic

# 2. Установить зависимости
npm install

# 3. Создать .env из шаблона
cp env.example .env

# 4. Настроить .env (DATABASE_URL для локального PostgreSQL)
nano .env

# 5. Запустить PostgreSQL (выберите один вариант):

# Вариант A: Docker (рекомендуется)
# Windows: запустить start-postgres.bat
# Linux/macOS: docker run --name postgres-local -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=detskiy_mir -p 5432:5432 -d postgres:16

# Вариант B: Локальная установка PostgreSQL
# Windows: запустить PostgreSQL service
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql
# Затем: createdb detskiy_mir

# 6. Применить миграции БД
npm run db:migrate

# 7. Сгенерировать Prisma client
npm run db:generate

# 8. Заполнить тестовыми данными
npm run db:seed

# 9. Запустить в dev режиме
npm run dev

# 10. Открыть в браузере
# Витрина: http://localhost:3000
# Админка: http://localhost:3000/admin
# Prisma Studio: npm run db:studio
```

---

## 🏗️ ТЕХНОЛОГИИ

**Frontend:**
- Next.js 15 (App Router, SSR/ISR)
- React 19
- TypeScript 5
- Tailwind CSS 3
- React Hook Form + Zod

**Backend:**
- Next.js API Routes
- TypeScript 5
- Prisma ORM
- NextAuth.js

**Database:**
- PostgreSQL 16 (локальная установка)

**Development:**
- ESLint + Prettier
- Prisma Studio
- TypeScript strict mode

---

## 📁 СТРУКТУРА ПРОЕКТА

```
shop-classic/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── admin/         # Админ-панель
│   │   ├── products/     # Страницы товаров
│   │   └── ...
│   ├── components/       # React компоненты
│   ├── lib/              # Утилиты и конфигурация
│   └── types/            # TypeScript типы
│
├── prisma/               # БД схема и миграции
│   ├── schema.prisma
│   └── migrations/
│
├── public/               # Статические файлы
│   ├── images/
│   └── logo.png
│
├── scripts/              # Скрипты для администрирования
│   └── seed.ts
│
├── Documentation/        # Документация (ЧИТАЙ!)
│   ├── RULES.md          # 🔥 ГЛАВНЫЙ файл
│   ├── ENVIRONMENT.md
│   ├── ARCHITECTURE.md
│   └── ...
│
├── env.example           # Пример переменных окружения
├── package.json          # Зависимости и скрипты
└── README.md             # Этот файл
```

---

## 📚 ДОКУМЕНТАЦИЯ

### Обязательно прочитать (особенно для AI):

1. **[RULES.md](RULES.md)** 🔥🔥🔥 — ГЛАВНЫЙ файл с правилами
2. **[ENVIRONMENT.md](ENVIRONMENT.md)** 🔥 — Что установлено, что запрещено
3. **[ARCHITECTURE.md](ARCHITECTURE.md)** — Структура проекта
4. **[CODING-RULES.md](CODING-RULES.md)** — Стандарты кодирования

### Для разработки:

5. **[PLAN.md](PLAN.md)** — План разработки
6. **[PROGRESS.md](PROGRESS.md)** — Текущий прогресс

### Для деплоя и адаптации:

7. **[DEPLOYMENT.md](DEPLOYMENT.md)** — Деплой на production
8. **[SETUP-NEW-CLIENT.md](SETUP-NEW-CLIENT.md)** — Настройка под клиента

---

## 🛠️ КОМАНДЫ

### Development:

```bash
npm run dev          # Запустить приложение в dev режиме
npm run build        # Собрать production build
npm run start        # Запустить production build
npm run lint         # Проверить код
```

### Database:

```bash
npm run db:migrate   # Создать и применить миграцию (dev)
npm run db:generate  # Сгенерировать Prisma client
npm run db:studio    # Открыть GUI для БД
npm run db:seed      # Заполнить тестовыми данными
npm run db:reset     # Сбросить БД и заполнить заново
npm run db:push      # Применить изменения схемы без миграции
```

### Утилиты:

```bash
npm run parse        # Парсинг данных с buy.am
npm run import       # Импорт данных из файла
npm run auto-import  # Автоматический импорт
```

---

## 🎨 КАСТОМИЗАЦИЯ

### Для нового клиента меняешь:

1. **Брендинг:**
   - `config/brand.json` — цвета, шрифты
   - `apps/web/public/logo.svg` — логотип

2. **Контакты:**
   - `config/contact.json` — email, телефон, адрес

3. **Окружение:**
   - `.env` — секреты, API ключи

4. **Бизнес-правила:**
   - `config/business.json` — налоги, доставка
   - `config/shipping.json` — методы доставки

**Детали:** см. [SETUP-NEW-CLIENT.md](SETUP-NEW-CLIENT.md)

---

## 🧪 ТЕСТИРОВАНИЕ

```bash
# Unit тесты
npm run test:unit

# Integration тесты
npm run test:integration

# E2E тесты (Playwright)
npm run test:e2e

# Все тесты
npm test

# Coverage
npm run test:coverage
```

**Цель:** Coverage ≥ 70% для `packages/domain/`

---

## 🚀 ДЕПЛОЙ

### Production:

```bash
# Автоматический (через GitHub Actions)
git push origin main

# Ручной (см. DEPLOYMENT.md)
ssh deployer@server
cd /var/www/shop
./scripts/deploy.sh
```

**Детали:** см. [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📊 SLA/SLO

**Цели производительности:**
- TTFB p95: ≤ 600ms
- LCP p75: ≤ 2.5s
- API read p95: ≤ 500ms
- Search p95: ≤ 250ms (10k SKU)

**Доступность:**
- SLA: 99.9% uptime (≈ 43 мин простоя/месяц)
- Error rate: < 0.1%/неделя

---

## 👥 КОМАНДА

**Senior Developer** — архитектура, code review  
**AI Assistant** — разработка (80% кода)  
**Junior Developer** — тестирование, документация (опционально)

---

## 📞 КОНТАКТЫ

**Issues:** https://github.com/yourname/shop-classic/issues  
**Documentation:** [Documentation/](Documentation/)  
**Email:** dev@yourcompany.com

---

## 📄 ЛИЦЕНЗИЯ

Proprietary — для внутреннего использования агентства

---

**Версия:** 1.0.0  
**Последнее обновление:** 2025-02-07  
**Статус:** 🚧 В разработке (Этап 1: Планирование завершено)
