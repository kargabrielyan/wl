# Структура документации проекта

> **Цель:** обеспечить полную, актуальную и понятную документацию для разработчиков, AI-ассистентов и новых членов команды.

---

## 📋 Оглавление

1. [Общая структура](#общая-структура)
2. [Корневая документация](#корневая-документация)
3. [Архитектура](#архитектура)
4. [Планирование](#планирование)
5. [Разработка](#разработка)
6. [Инфраструктура](#инфраструктура)
7. [API документация](#api-документация)
8. [Руководства](#руководства)
9. [Примеры кода](#примеры-кода)
10. [Templates и GitHub](#templates-и-github)
11. [Правила обновления](#правила-обновления)

---

## 🗂️ Общая структура

```
shop-classic/
├── README.md                          🔥 Главный файл проекта
├── RULES.md                           🔥🔥🔥 ГЛАВНЫЙ файл правил
├── CONTRIBUTING.md                    Как контрибьютить
├── CHANGELOG.md                       История изменений
├── DOCUMENTATION-STRUCTURE.md         Этот файл
├── .env.example                       Пример конфигурации
│
├── docs/
│   ├── architecture/                  📐 Архитектура
│   ├── planning/                      📋 Планирование
│   ├── development/                   💻 Разработка
│   ├── infrastructure/                🏗️ Инфраструктура
│   ├── api/                           🔌 API документация
│   ├── guides/                        📖 Руководства
│   ├── examples/                      💡 Примеры кода
│   └── onboarding/                    👋 Для новых людей
│
└── .github/                           ⚙️ GitHub специфичное
    ├── ISSUE_TEMPLATE/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/
```

---

## 📄 1. Корневая документация

### `README.md`
**Назначение:** Первое, что видит человек, открывший проект.

**Содержание:**
```markdown
# Название проекта

## Что это?
Краткое описание (2-3 предложения)

## Быстрый старт
```bash
npm install
npm run dev
```

## Основные технологии
- Next.js 15
- NestJS
- PostgreSQL 16
- etc.

## Документация
- [Архитектура](docs/architecture/overview.md)
- [Разработка](docs/development/getting-started.md)
- [API](docs/api/README.md)

## Структура проекта
```
apps/
  web/     # витрина
  api/     # backend
packages/
  ui/      # компоненты
  domain/  # бизнес-логика
```

## Лицензия
```

**Кто обновляет:** Team lead при изменении структуры проекта или основных технологий.

---

### `RULES.md` 🔥🔥🔥
**Назначение:** ГЛАВНЫЙ файл правил — точка входа для всех.

**Содержание:**
```markdown
# Правила проекта — ОБЯЗАТЕЛЬНО ЧИТАТЬ

## Главные принципы
1. Единый источник правды
2. Код самодокументируемый
3. Тестирование обязательно
4. Безопасность на первом месте

## Обязательные документы
[Список документов с ссылками]

## Workflow
[Git flow, процессы]

## Запрещено / Обязательно
[Конкретные правила]

## Какие документы обновлять
[Таблица когда что обновлять]
```

**Кто обновляет:** Team lead, architect при изменении процессов.

---

### `CONTRIBUTING.md`
**Назначение:** Правила контрибуции для команды.

**Содержание:**
```markdown
# Как контрибьютить

## Процесс
1. Fork проекта
2. Создай feature branch
3. Коммить с понятными сообщениями
4. Открой Pull Request

## Стандарты кода
[Ссылка на coding-standards.md]

## Code Review
[Ссылка на code-review-checklist.md]

## Тесты
Все фичи должны иметь тесты
```

**Кто обновляет:** Team lead при изменении процессов разработки.

---

### `CHANGELOG.md`
**Назначение:** История изменений для версионирования.

**Содержание:**
```markdown
# Changelog

## [Unreleased]
### Added
- Новые фичи

### Changed
- Изменения

### Fixed
- Исправления багов

## [1.0.0] - 2025-02-07
### Added
- Первый релиз
```

**Кто обновляет:** Каждый разработчик при merge PR.

---

## 📐 2. Архитектура (`docs/architecture/`)

### `overview.md`
**Назначение:** Высокоуровневый обзор архитектуры (для новичков).

**Содержание:**
```markdown
# Обзор архитектуры

## Общая схема
[Диаграмма компонентов]

## Основные модули
- Web (Next.js) - витрина
- API (NestJS) - бэкенд
- Domain - бизнес-логика
- UI - компоненты
- Adapters - интеграции

## Потоки данных
[Схема как данные текут через систему]

## Технологии
[Почему выбраны эти технологии]
```

**Кто обновляет:** Architect при добавлении новых модулей.

---

### `architecture.md`
**Назначение:** Детальная архитектура (из ТЗ).

**Содержание:**
- Полная схема БД
- Доменная модель
- API дизайн
- Event-driven архитектура
- Кэширование
- Очереди

**Кто обновляет:** Architect при архитектурных изменениях.

---

### `arch-rules.md`
**Назначение:** Правила архитектуры, которые НЕЛЬЗЯ нарушать.

**Содержание:**
```markdown
# Правила архитектуры

## Слои приложения
1. Presentation (UI)
2. Application (Use Cases)
3. Domain (Бизнес-логика)
4. Infrastructure (DB, API)

## Зависимости
- Внутренние слои НЕ зависят от внешних
- Dependency Injection обязателен
- Domain слой чистый (без внешних зависимостей)

## Запрещено
- ❌ Бизнес-логика в контроллерах
- ❌ Прямые SQL запросы (только ORM)
- ❌ Хранение состояния в памяти (stateless)

## Обязательно
- ✅ Валидация на границах системы
- ✅ Event-driven для асинхронных операций
- ✅ Идемпотентность для критичных операций
```

**Кто обновляет:** Architect при изменении архитектурных принципов.

---

### `design-system.md` 🔥
**Назначение:** Дизайн-система для разработчиков и AI.

**Содержание:**
```markdown
# Дизайн-система

## ВСЕГДА используй компоненты из packages/ui

### Цвета
- primary - главный цвет бренда
- secondary - вторичный
- success/warning/error - семантические

✅ ПРАВИЛЬНО:
```tsx
<div className="bg-primary text-white">
```

❌ НЕПРАВИЛЬНО:
```tsx
<div className="bg-blue-500">
<div style={{ backgroundColor: '#FF6B35' }}>
```

## Компоненты
[Список всех UI компонентов с примерами]

## Design Tokens
[Ссылка на packages/design-tokens/tokens.ts]

## Spacing, Typography, Shadows
[Правила использования]
```

**Кто обновляет:** UI lead при добавлении компонентов или изменении токенов.

---

### `data-model.md`
**Назначение:** Модель данных, ER-диаграммы.

**Содержание:**
```markdown
# Модель данных

## ER-диаграмма
[Диаграмма связей таблиц]

## Основные сущности

### Products
```sql
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  ...
);
```

### Orders
[Детали таблицы]

## Связи
[Описание связей между таблицами]

## Индексы
[Список критичных индексов]

## Миграции
[Как создавать миграции]
```

**Кто обновляет:** Backend lead при изменении схемы БД.

---

### `api-design.md`
**Назначение:** Соглашения API.

**Содержание:**
```markdown
# API Design Guidelines

## Версионирование
/api/v1/...

## Формат ошибок
RFC 7807 (application/problem+json)

## Идемпотентность
Заголовок Idempotency-Key

## Пагинация
limit/offset или cursor

## Примеры
[Примеры запросов/ответов]
```

**Кто обновляет:** Backend lead при изменении API соглашений.

---

### `adr/` (Architecture Decision Records)
**Назначение:** Фиксация важных архитектурных решений.

**Шаблон ADR:**
```markdown
# ADR-001: Почему выбрали Next.js вместо Nuxt.js

**Дата:** 2025-02-07  
**Статус:** Принято  
**Автор:** John Doe

## Контекст
Нужно выбрать фреймворк для фронтенда.

## Варианты
1. Next.js
2. Nuxt.js
3. Remix

## Решение
Выбрали Next.js

## Причины
- TypeScript out of the box
- App Router с Server Components
- Лучшая производительность
- Больше community support

## Последствия
- Команда должна изучить App Router
- Миграция на v15 потребует времени

## Альтернативы
Nuxt.js был близок, но меньше опыта в команде
```

**Кто обновляет:** Architect создаёт ADR для каждого важного решения.

---

## 📋 3. Планирование (`docs/planning/`)

### `requirements.md`
**Назначение:** Функциональные требования (из ТЗ).

**Содержание:**
- Scope MVP
- Что входит / не входит
- User stories
- Acceptance criteria

**Кто обновляет:** Product owner при изменении требований.

---

### `technical-requirements.md`
**Назначение:** Нефункциональные требования.

**Содержание:**
```markdown
# Технические требования

## SLA/SLO
- Доступность: 99.9%
- TTFB p95: ≤ 600ms
- LCP p75: ≤ 2.5s

## Производительность
- API чтение: ≤ 500ms
- Поиск: ≤ 250ms на 10k SKU

## Безопасность
- OWASP ASVS L1/L2
- PII минимизация в логах

## Масштабируемость
- До 10k SKU
- До 10k заказов/мес
```

**Кто обновляет:** Architect при изменении SLA.

---

### `plan.md`
**Назначение:** План разработки по этапам.

**Содержание:**
```markdown
# План разработки

## Этап 1: Подготовка (1-2 недели)
- [ ] Настройка инфраструктуры
- [ ] Схема БД
- [ ] CI/CD

## Этап 2: Backend Core (2-3 недели)
- [ ] API endpoints
- [ ] Аутентификация
- [ ] CRUD операции

[Детальные этапы]
```

**Кто обновляет:** Project manager при планировании спринтов.

---

### `roadmap.md`
**Назначение:** Долгосрочный план развития.

**Содержание:**
```markdown
# Roadmap

## Q1 2025
- ✅ MVP v1.0
- 🔄 Купоны и скидки
- 📋 Wishlist

## Q2 2025
- B2B функционал
- Marketplace фиды
- RMA кабинет

## Q3 2025
- Mobile app
- AI рекомендации
```

**Кто обновляет:** Product owner ежеквартально.

---

### `progress.md` 🔥
**Назначение:** Текущий прогресс (обновляется часто!).

**Содержание:**
```markdown
# Прогресс разработки

## Текущий статус
**Этап:** Backend Core  
**Прогресс:** 65%  
**Дата обновления:** 2025-02-07

## Выполнено
- [x] Настройка проекта
- [x] Схема БД
- [x] API Products
- [x] API Categories

## В работе
- [ ] API Orders (50%)
- [ ] Платёжные интеграции (20%)

## Следующие задачи
- [ ] Email уведомления
- [ ] Админ-панель

## Блокеры
- Ждём доступ к Idram API

## Заметки
Производительность поиска лучше ожидаемой (150ms vs 250ms SLO)
```

**Кто обновляет:** КАЖДЫЙ разработчик после завершения задачи.

---

## 💻 4. Разработка (`docs/development/`)

### `getting-started.md`
**Назначение:** Быстрый старт для новых разработчиков.

**Содержание:**
```markdown
# Быстрый старт

## Предварительные требования
- Node.js 18+
- PostgreSQL 16
- Redis 7
- Docker

## Установка
```bash
git clone ...
cp .env.example .env
npm install
npm run db:migrate
npm run dev
```

## Структура проекта
[Краткое описание]

## Первые шаги
1. Прочитай RULES.md
2. Настрой IDE
3. Запусти тесты
4. Создай первую feature branch
```

**Кто обновляет:** Tech lead при изменении setup процесса.

---

### `coding-standards.md` 🔥
**Назначение:** Стандарты кодирования (критично для AI!).

**Содержание:**
```markdown
# Стандарты кодирования

## TypeScript
- Всегда строгий режим
- Никаких `any` (используй `unknown`)
- Предпочитай `interface` для объектов, `type` для unions

## Именование
- PascalCase для компонентов, классов
- camelCase для функций, переменных
- UPPER_CASE для констант
- kebab-case для файлов

## Файлы
- Один компонент = один файл
- Максимум 300 строк на файл
- Экспорты в конце файла

## React
```tsx
// ✅ ПРАВИЛЬНО
export function ProductCard({ product }: Props) {
  return <Card>...</Card>;
}

// ❌ НЕПРАВИЛЬНО
export default ({ product }) => {
  return <div>...</div>;
}
```

## Backend
[Правила для NestJS]

## Стили
- ТОЛЬКО Tailwind классы
- ТОЛЬКО компоненты из @/ui
- НИКАКИХ inline styles
```

**Кто обновляет:** Tech lead при изменении code style.

---

### `component-guidelines.md`
**Назначение:** Правила создания компонентов.

**Содержание:**
```markdown
# Component Guidelines

## Структура компонента
```tsx
// 1. Imports
import { useState } from 'react';
import { Button } from '@/ui/Button';

// 2. Types
interface Props {
  title: string;
}

// 3. Component
export function MyComponent({ title }: Props) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => {};
  
  // 6. Render
  return <div>...</div>;
}
```

## Правила
- Props interface обязателен
- Деструктуризация props
- Используй memo для тяжёлых компонентов
- Callbacks через useCallback
```

**Кто обновляет:** Frontend lead при появлении лучших практик.

---

### `naming-conventions.md`
**Назначение:** Соглашения именования.

**Содержание:**
```markdown
# Naming Conventions

## Файлы
- `ProductCard.tsx` - компонент
- `productService.ts` - сервис
- `product.types.ts` - типы
- `product.test.ts` - тесты
- `product.utils.ts` - утилиты

## Функции
- `getProduct` - получить
- `createProduct` - создать
- `updateProduct` - обновить
- `deleteProduct` - удалить
- `isProductValid` - проверка (boolean)
- `hasProducts` - наличие (boolean)
- `handleClick` - обработчик события

## Константы
- `API_BASE_URL` - константа
- `DEFAULT_PAGE_SIZE` - константа

## Enum
```ts
enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped'
}
```
```

**Кто обновляет:** Tech lead при добавлении новых соглашений.

---

### `git-workflow.md`
**Назначение:** Git flow, ветвление, коммиты.

**Содержание:**
```markdown
# Git Workflow

## Branches
- `main` - production
- `develop` - development
- `feature/*` - новые фичи
- `fix/*` - багфиксы
- `hotfix/*` - срочные фиксы

## Процесс
```bash
git checkout develop
git pull
git checkout -b feature/TASK-123-add-wishlist
# ... work ...
git add .
git commit -m "feat: add wishlist functionality"
git push origin feature/TASK-123-add-wishlist
# Open PR
```

## Commit messages
```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting
refactor: code refactoring
test: add tests
chore: build process
```

## PR
- Минимум 1 approval
- Все тесты зелёные
- No merge conflicts
```

**Кто обновляет:** Tech lead при изменении git flow.

---

### `testing-strategy.md`
**Назначение:** Стратегия тестирования.

**Содержание:**
```markdown
# Стратегия тестирования

## Пирамида тестов
```
        E2E (10%)
      Integration (30%)
    Unit (60%)
```

## Unit тесты
- Все utils функции
- Бизнес-логика в domain
- Сервисы

## Integration тесты
- API endpoints
- БД операции

## E2E тесты
- Критичные флоу:
  * Регистрация
  * Поиск → корзина → checkout → оплата
  * Админка: создание товара

## Coverage
- Цель: ≥ 70% для packages/domain
- Минимум: ≥ 50% для apps/*

## Инструменты
- Vitest - unit/integration
- Playwright - E2E
```

**Кто обновляет:** QA lead при изменении стратегии.

---

### `code-review-checklist.md`
**Назначение:** Чек-лист для code review.

**Содержание:**
```markdown
# Code Review Checklist

## Функциональность
- [ ] Код решает задачу
- [ ] Нет очевидных багов
- [ ] Edge cases обработаны

## Качество кода
- [ ] Следует coding standards
- [ ] Нет дублирования
- [ ] Понятные имена
- [ ] Функции < 50 строк

## Тесты
- [ ] Есть тесты для новой функциональности
- [ ] Все тесты проходят
- [ ] Coverage не уменьшился

## Документация
- [ ] Обновлена документация (если нужно)
- [ ] Комментарии для сложной логики
- [ ] README обновлён (если изменилась структура)

## Безопасность
- [ ] Валидация входных данных
- [ ] Нет SQL injection
- [ ] Нет XSS уязвимостей
- [ ] Секреты не в коде

## Производительность
- [ ] Нет N+1 запросов
- [ ] Индексы для новых запросов
- [ ] Lazy loading где нужно
```

**Кто обновляет:** Tech lead при появлении новых критериев.

---

### `troubleshooting.md`
**Назначение:** Частые проблемы и решения.

**Содержание:**
```markdown
# Troubleshooting

## Проблема: "Cannot connect to database"
**Решение:**
```bash
# Проверь что PostgreSQL запущен
brew services list
# Проверь .env
DATABASE_URL=postgresql://...
```

## Проблема: "Module not found"
**Решение:**
```bash
rm -rf node_modules
npm install
```

## Проблема: "Tests failing on CI but pass locally"
**Решение:**
Проверь версию Node.js в CI и локально

[Накапливается со временем]
```

**Кто обновляет:** КАЖДЫЙ при встрече с новой проблемой.

---

## 🏗️ 5. Инфраструктура (`docs/infrastructure/`)

### `infrastructure-setup.md`
**Назначение:** Настройка инфраструктуры.

**Содержание:**
```markdown
# Infrastructure Setup

## VPS Setup
- Provider: DigitalOcean / Hetzner
- Specs: 8 vCPU / 16GB RAM
- OS: Ubuntu 22.04

## Docker Compose
```yaml
services:
  web:
    image: shop/web:latest
  api:
    image: shop/api:latest
  postgres:
    image: postgres:16
  redis:
    image: redis:7
  meilisearch:
    image: getmeili/meilisearch:v1.6
```

## Cloudflare CDN
[Настройка]

## SSL
[Let's Encrypt setup]
```

**Кто обновляет:** DevOps при изменении инфраструктуры.

---

### `deployment.md`
**Назначение:** Процесс деплоя.

**Содержание:**
```markdown
# Deployment

## Процесс
1. Merge в main
2. GitHub Actions запускается
3. Тесты проходят
4. Build Docker images
5. Push в registry
6. SSH на VPS
7. Pull новые images
8. Применить миграции
9. Blue-Green swap
10. Health check

## Rollback
```bash
./scripts/rollback.sh v1.2.3
```

## Manual Deploy
[На случай проблем с CI/CD]
```

**Кто обновляет:** DevOps при изменении процесса деплоя.

---

### `environments.md`
**Назначение:** dev/stage/prod конфигурации.

**Содержание:**
```markdown
# Environments

## Development (local)
- URL: http://localhost:3000
- Database: shop_dev
- Payments: test mode

## Staging
- URL: https://stage.shop.am
- Database: shop_stage
- Payments: test mode

## Production
- URL: https://shop.am
- Database: shop_prod
- Payments: live mode

## Environment Variables
[Таблица переменных для каждой среды]
```

**Кто обновляет:** DevOps при добавлении новых сред.

---

### `monitoring.md`
**Назначение:** Мониторинг и алерты.

**Содержание:**
```markdown
# Monitoring

## Метрики
- Grafana: https://grafana.shop.am
- Prometheus: [endpoints]
- Uptime: Uptime Kuma

## Алерты
- Telegram bot: @shop_alerts_bot
- Email: alerts@shop.am

## Критичные метрики
- 5xx errors > 0.1%
- Response time p95 > 800ms
- Queue lag > 1000 jobs
- Disk usage > 80%

## Логи
- Loki: https://loki.shop.am
- Format: JSON structured
- Retention: 30 days
```

**Кто обновляет:** DevOps при изменении мониторинга.

---

### `backup-restore.md`
**Назначение:** Бэкапы и восстановление.

**Содержание:**
```markdown
# Backup & Restore

## Стратегия
- Ежедневно: инкрементальные (7 days)
- Еженедельно: полные (4 weeks)
- Ежемесячно: архив (12 months)

## Автоматические бэкапы
```bash
# Cron job
0 3 * * * /scripts/backup.sh
```

## Ручной бэкап
```bash
./scripts/backup.sh manual
```

## Восстановление
```bash
./scripts/restore.sh backup-2025-02-07.tar.gz
```

## Проверка
Ежеквартально тест восстановления
```

**Кто обновляет:** DevOps при изменении стратегии бэкапов.

---

### `security.md`
**Назначение:** Security практики.

**Содержание:**
```markdown
# Security

## Секреты
- НИКОГДА не коммитить
- Использовать .env
- Разные секреты для dev/stage/prod

## Passwords
- Argon2id hashing
- Min 8 символов
- MFA для админов

## API
- Rate limiting: 100 req/min
- CORS: только разрешённые домены
- CSRF protection

## Headers
- CSP
- HSTS
- X-Content-Type-Options
- X-Frame-Options

## Dependencies
- npm audit ежемесячно
- Dependabot включён
```

**Кто обновляет:** Security lead ежемесячно.

---

## 🔌 6. API документация (`docs/api/`)

### `README.md`
**Назначение:** Обзор API.

**Содержание:**
```markdown
# API Documentation

## Base URL
```
Production: https://api.shop.am/v1
Staging: https://api-stage.shop.am/v1
```

## Authentication
Bearer token в заголовке:
```
Authorization: Bearer <token>
```

## Версионирование
/api/v1/...

## Rate Limits
- 100 req/min для guest
- 1000 req/min для authenticated

## Endpoints
- [Products](endpoints/products.md)
- [Orders](endpoints/orders.md)
- [Users](endpoints/users.md)
```

**Кто обновляет:** Backend lead при добавлении endpoints.

---

### `authentication.md`
**Назначение:** Детали аутентификации.

**Содержание:**
```markdown
# Authentication

## Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

Response:
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "expiresIn": 3600
}
```

## Refresh Token
[Процесс обновления токена]

## Logout
[Процесс logout]
```

**Кто обновляет:** Backend lead при изменении auth.

---

### `endpoints/products.md`
**Назначение:** Документация endpoints для Products.

**Содержание:**
```markdown
# Products API

## GET /products
List products with filters

**Query Parameters:**
- `category` - filter by category
- `search` - search query
- `page` - page number
- `limit` - items per page

**Response:**
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 24
  }
}
```

## GET /products/:slug
Get product details

[Детали]

## POST /products (Admin)
Create product

[Детали]
```

**Кто обновляет:** Backend developer при изменении endpoint.

---

### `webhooks.md`
**Назначение:** Документация вебхуков.

**Содержание:**
```markdown
# Webhooks

## Payment Webhooks

### Idram
```http
POST /api/v1/payments/webhook/idram
X-Idram-Signature: sha256=...

{
  "transactionId": "...",
  "status": "success",
  "amount": 10000
}
```

Signature verification:
```ts
const signature = crypto
  .createHmac('sha256', SECRET)
  .update(JSON.stringify(body))
  .digest('hex');
```

### ArCa
[Детали]
```

**Кто обновляет:** Backend developer при добавлении вебхуков.

---

### `openapi.yaml`
**Назначение:** OpenAPI спецификация (автогенерация документации).

**Содержание:**
```yaml
openapi: 3.1.0
info:
  title: Shop API
  version: 1.0.0
paths:
  /products:
    get:
      summary: List products
      parameters:
        - name: category
          in: query
          schema:
            type: string
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductList'
```

**Кто обновляет:** Автогенерация из NestJS decorators.

---

## 📖 7. Руководства (`docs/guides/`)

### `new-client-setup.md` 🔥
**Назначение:** КРИТИЧНО для твоего случая (30-40 магазинов/год).

**Содержание:**
```markdown
# Настройка под нового клиента

## Checklist (30-60 минут)

### 1. Клонирование (5 мин)
```bash
git clone shop-classic new-client-shop
cd new-client-shop
rm -rf .git
git init
```

### 2. Брендинг (10 мин)
- [ ] `config/brand.json` - изменить цвета
- [ ] `public/logo.svg` - загрузить логотип
- [ ] `public/favicon.ico` - favicon

### 3. Контакты (5 мин)
- [ ] `config/contact.json` - email, phone, адрес
- [ ] `config/contact.json` - социальные сети

### 4. Окружение (10 мин)
- [ ] Скопировать `.env.example` → `.env`
- [ ] Настроить `DATABASE_URL`
- [ ] Добавить платёжные ключи (Idram/ArCa)
- [ ] Настроить SMTP

### 5. Бизнес-правила (5 мин)
- [ ] `config/business.json` - налоги, free shipping
- [ ] `config/shipping.json` - методы доставки
- [ ] `config/payments.json` - включить провайдеры

### 6. Контент (опционально)
- [ ] Импорт товаров CSV
- [ ] Создание категорий
- [ ] Загрузка изображений

### 7. Деплой (15 мин)
- [ ] Создать VPS
- [ ] Настроить домен
- [ ] Запустить миграции
- [ ] Smoke test

## Автоматизация
```bash
./scripts/setup-new-client.sh --name "New Shop" --domain newshop.am
```
```

**Кто обновляет:** Tech lead при изменении процесса setup.

---

### `adding-payment-provider.md`
**Назначение:** Как добавить новый платёжный провайдер.

**Содержание:**
```markdown
# Добавление нового платёжного провайдера

## 1. Создать adapter
```ts
// packages/adapters/payments/stripe.adapter.ts
export class StripeAdapter implements PaymentAdapter {
  async createPayment(order: Order) {}
  async verifyWebhook(req: Request) {}
}
```

## 2. Добавить в config
```json
// config/payments.json
{
  "providers": [
    {
      "id": "stripe",
      "name": "Stripe",
      "enabled": true
    }
  ]
}
```

## 3. Настроить вебхук
[Детали]

## 4. Тесты
[Примеры тестов]
```

**Кто обновляет:** Backend lead при создании нового адаптера.

---

### `adding-shipping-method.md`
**Назначение:** Как добавить метод доставки.

**Содержание:**
```markdown
# Добавление метода доставки

## В конфиге
```json
// config/shipping.json
{
  "methods": [
    {
      "id": "express",
      "name": {
        "ru": "Экспресс доставка",
        "am": "Արագ առաքում"
      },
      "price": 2000,
      "estimatedDays": 1
    }
  ]
}
```

## Если нужна кастомная логика
[Создание adapter]
```

**Кто обновляет:** Backend lead при добавлении логики.

---

### `import-products.md`
**Назначение:** Импорт товаров из CSV/XLSX.

**Содержание:**
```markdown
# Импорт товаров

## Формат CSV
```csv
title,sku,price,stock,category
Футболка,TSH-001,5000,10,odezhda/futbolki
```

## Команда
```bash
npm run import:products -- --file products.csv
```

## Валидация
[Правила валидации]

## Обработка ошибок
[Что делать если ошибки]
```

**Кто обновляет:** Backend lead при изменении импорта.

---

### `performance-optimization.md`
**Назначение:** Гайд по оптимизации.

**Содержание:**
```markdown
# Оптимизация производительности

## Чек-лист

### Frontend
- [ ] Code splitting
- [ ] Lazy loading компонентов
- [ ] Image optimization (WebP/AVIF)
- [ ] Кэш API запросов (React Query)

### Backend
- [ ] Индексы БД
- [ ] N+1 запросов устранены
- [ ] Redis кэш для hot data
- [ ] Пагинация всегда

### Инфраструктура
- [ ] CDN для статики
- [ ] Gzip/Brotli compression
- [ ] HTTP/2
```

**Кто обновляет:** Performance lead при нахождении новых оптимизаций.

---

## 💡 8. Примеры кода (`docs/examples/`)

### `component-example.tsx`
**Назначение:** Пример правильного компонента.

**Содержание:**
```tsx
/**
 * Пример правильного компонента
 * Используй этот шаблон для новых компонентов
 */

import { memo, useCallback } from 'react';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';

// 1. Props interface
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

// 2. Component с memo для оптимизации
export const ProductCard = memo(function ProductCard({ 
  product, 
  onAddToCart 
}: ProductCardProps) {
  // 3. Handlers с useCallback
  const handleClick = useCallback(() => {
    onAddToCart(product.id);
  }, [product.id, onAddToCart]);

  // 4. Render
  return (
    <Card>
      <img src={product.image} alt={product.title} />
      <h3 className="font-heading text-xl">{product.title}</h3>
      <p className="text-primary font-bold">{product.price} ֏</p>
      <Button variant="primary" onClick={handleClick}>
        Купить
      </Button>
    </Card>
  );
});
```

**Кто обновляет:** Frontend lead при изменении best practices.

---

### `api-handler-example.ts`
**Назначение:** Пример правильного API handler.

**Содержание:**
```ts
/**
 * Пример правильного API handler (NestJS)
 */

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)  // Защита
  @ApiOperation({ summary: 'List products' })  // OpenAPI
  async findAll(
    @Query() query: FindProductsDto  // Валидация через DTO
  ): Promise<PaginatedResponse<Product>> {
    // 1. Валидация уже прошла (class-validator)
    
    // 2. Бизнес-логика в сервисе
    const result = await this.productsService.findAll(query);
    
    // 3. Возвращаем стандартный формат
    return {
      data: result.items,
      meta: {
        total: result.total,
        page: query.page,
        limit: query.limit
      }
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }
}
```

**Кто обновляет:** Backend lead при изменении patterns.

---

### `test-example.spec.ts`
**Назначение:** Пример правильных тестов.

**Содержание:**
```ts
/**
 * Пример правильных тестов
 */

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository
        }
      ]
    }).compile();

    service = module.get(ProductService);
    repository = module.get(getRepositoryToken(Product));
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      // Arrange
      const mockProducts = [
        { id: 1, title: 'Product 1' },
        { id: 2, title: 'Product 2' }
      ];
      jest.spyOn(repository, 'findAndCount').mockResolvedValue([
        mockProducts, 
        2
      ]);

      // Act
      const result = await service.findAll({ page: 1, limit: 10 });

      // Assert
      expect(result.items).toEqual(mockProducts);
      expect(result.total).toBe(2);
    });

    it('should handle errors', async () => {
      // Test error handling
    });
  });
});
```

**Кто обновляет:** QA lead при изменении testing patterns.

---

## 🎫 9. Templates и GitHub (`.github/`)

### `ISSUE_TEMPLATE/bug_report.md`
**Назначение:** Шаблон для создания bug report.

**Содержание:**
```markdown
---
name: Bug report
about: Create a report to help us improve
---

## Описание бага
Краткое описание что не работает.

## Шаги для воспроизведения
1. Открыть '...'
2. Кликнуть на '...'
3. Увидеть ошибку

## Ожидаемое поведение
Что должно было произойти.

## Актуальное поведение
Что произошло на самом деле.

## Скриншоты
Если применимо.

## Окружение
- OS: [e.g. macOS 14]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.2.3]

## Дополнительная информация
```

**Кто обновляет:** Редко меняется.

---

### `PULL_REQUEST_TEMPLATE.md`
**Назначение:** Шаблон для PR.

**Содержание:**
```markdown
## Описание
Что сделано в этом PR?

## Тип изменения
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Код следует style guidelines
- [ ] Self-review сделан
- [ ] Комментарии добавлены
- [ ] Документация обновлена
- [ ] Нет новых warnings
- [ ] Тесты добавлены и проходят
- [ ] Зависимые изменения merged

## Связанные issues
Closes #123

## Скриншоты (если UI)
```

**Кто обновляет:** Редко меняется.

---

## 📋 10. Правила обновления документации

### **Когда обновлять**

| Событие | Какие документы обновлять | Кто |
|---------|---------------------------|-----|
| Изменил API | `docs/api/endpoints/*.md`, `openapi.yaml` | Backend dev |
| Добавил компонент | `docs/architecture/design-system.md` | Frontend dev |
| Изменил БД | `docs/architecture/data-model.md` | Backend dev |
| Новая фича | `docs/planning/progress.md`, `CHANGELOG.md` | Developer |
| Архитектурное решение | `docs/architecture/adr/*.md` | Architect |
| Изменил инфраструктуру | `docs/infrastructure/*.md` | DevOps |
| Нашёл частую проблему | `docs/development/troubleshooting.md` | Anyone |
| Завершил задачу | `docs/planning/progress.md` | Developer |
| Релиз | `CHANGELOG.md` | Release manager |

---

### **Как обновлять**

1. **Создай ветку** для изменения документации:
```bash
git checkout -b docs/update-api-docs
```

2. **Обнови нужные файлы**

3. **Коммит с префиксом `docs:`**:
```bash
git commit -m "docs: update API endpoints documentation"
```

4. **Создай PR** (даже для документации!)

5. **После merge** - проверь что документация актуальна

---

### **Автоматизация**

Некоторые документы генерируются автоматически:

- `openapi.yaml` - из NestJS decorators
- `CHANGELOG.md` - из conventional commits
- API docs - из OpenAPI спецификации

---

## ✅ Checklist создания документации

При старте нового проекта:

### Фаза 1: Минимум (Week 1)
- [ ] `README.md`
- [ ] `RULES.md` 🔥
- [ ] `.env.example`
- [ ] `docs/architecture/overview.md`
- [ ] `docs/development/getting-started.md`
- [ ] `docs/development/coding-standards.md` 🔥
- [ ] `docs/planning/plan.md`
- [ ] `docs/planning/progress.md`

### Фаза 2: Основное (Week 2-4)
- [ ] `docs/architecture/architecture.md`
- [ ] `docs/architecture/design-system.md` 🔥
- [ ] `docs/architecture/data-model.md`
- [ ] `docs/api/README.md`
- [ ] `docs/development/testing-strategy.md`
- [ ] `docs/guides/new-client-setup.md` 🔥
- [ ] `docs/infrastructure/deployment.md`

### Фаза 3: Расширенное (Month 2+)
- [ ] `docs/architecture/adr/` (по мере принятия решений)
- [ ] `docs/development/troubleshooting.md` (накапливается)
- [ ] `docs/examples/` (лучшие практики)
- [ ] `docs/guides/*` (по необходимости)
- [ ] `.github/ISSUE_TEMPLATE/`
- [ ] `.github/PULL_REQUEST_TEMPLATE.md`

---

## 🎯 Итого

**Минимальная документация для профессионального проекта:**
- 📄 8 корневых файлов
- 📐 7 файлов архитектуры
- 📋 4 файла планирования
- 💻 7 файлов разработки
- 🏗️ 6 файлов инфраструктуры
- 🔌 4 файла API
- 📖 5 руководств

**Итого:** ~41 файл документации

**Но:**
- 10 файлов критичны (🔥)
- 15 файлов создаются постепенно
- 16 файлов опционально

**Реально на старте нужно:** ~15-20 файлов

---

**Последнее обновление:** 2025-02-07  
**Версия:** 1.0  
**Автор:** AI Senior Architect
