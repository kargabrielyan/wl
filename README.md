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

## 🚀 БЫСТРЫЙ СТАРТ

### Требования:

- Node.js 18.20.0+
- PostgreSQL 16+
- Redis 7+
- Docker 24+ (для production)

### Установка и запуск:

```bash
# 1. Клонировать проект
git clone https://github.com/yourname/shop-classic.git
cd shop-classic

# 2. Установить зависимости
npm install

# 3. Создать .env из шаблона
cp Documentation/env.example.txt .env

# 4. Настроить .env (DATABASE_URL, REDIS_URL, и т.д.)
nano .env

# 5. Применить миграции БД
npx prisma migrate deploy

# 6. Сгенерировать Prisma client
npx prisma generate

# 7. Заполнить тестовыми данными
npm run db:seed

# 8. Запустить в dev режиме
npm run dev

# 9. Открыть в браузере
# Витрина: http://localhost:3000
# API: http://localhost:3001/api
# Админка: http://localhost:3000/admin
```

---

## 🏗️ ТЕХНОЛОГИИ

**Frontend:**
- Next.js 15 (App Router, SSR/ISR)
- React 18
- TypeScript 5
- Tailwind CSS 3
- React Hook Form + Zod

**Backend:**
- NestJS 10
- TypeScript 5
- Prisma ORM
- class-validator
- BullMQ (очереди)

**Database & Cache:**
- PostgreSQL 16
- Redis 7

**Search:**
- Meilisearch 1.6

**Infrastructure:**
- Docker & Docker Compose
- Nginx
- GitHub Actions (CI/CD)

**Payments:**
- Idram
- ArCa

---

## 📁 СТРУКТУРА ПРОЕКТА

```
shop-classic/
├── apps/
│   ├── web/          # Next.js витрина
│   └── api/          # NestJS backend
│
├── packages/
│   ├── domain/       # Бизнес-логика
│   ├── ui/           # UI компоненты
│   ├── design-tokens/# Дизайн-система
│   └── adapters/     # Интеграции
│
├── config/           # Конфиги клиента
│   ├── brand.json
│   ├── contact.json
│   └── shipping.json
│
├── prisma/           # БД схема
│   ├── schema.prisma
│   └── migrations/
│
├── Documentation/    # Документация (ЧИТАЙ!)
│   ├── RULES.md      # 🔥 ГЛАВНЫЙ файл
│   ├── ENVIRONMENT.md
│   ├── ARCHITECTURE.md
│   └── ...
│
└── scripts/          # Скрипты
    ├── setup-new-client.sh
    └── deploy.sh
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
npm run dev          # Запустить все приложения (web + api)
npm run dev:web      # Только витрина
npm run dev:api      # Только API
npm run build        # Собрать production build
npm test             # Запустить тесты
npm run lint         # Проверить код
npm run format       # Форматировать код
```

### Database:

```bash
npx prisma migrate dev              # Создать миграцию (dev)
npx prisma migrate deploy           # Применить миграции (prod)
npx prisma generate                 # Сгенерировать Prisma client
npx prisma studio                   # Открыть GUI для БД
npm run db:seed                     # Заполнить тестовыми данными
```

### Docker:

```bash
docker compose up -d                # Запустить все сервисы
docker compose down                 # Остановить все
docker compose logs -f              # Логи всех сервисов
docker compose ps                   # Статус контейнеров
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
