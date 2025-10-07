# Профессиональный интернет‑магазин — Техническое задание (v0.9)

## 0) Введение и идея

**Цель:** создать один полноценный, независимый интернет‑магазин «уровня продакшн», без конструкторов и мульти‑тенанта. Проект служит эталонной базой, которую можно копировать для новых клиентов и адаптировать до 300% по функционалу, не переписывая фундамент.

**Почему так:**

- 95% функций e‑commerce типовые. Мы реализуем их один раз профессионально и безопасно.
- База проектируется нейтрально к нише (одежда/еда/косметика), чтобы не ломать схему при переносе.
- Конфигурируемые точки там, где отличия повторяются (тема, языки, валюта, платежи, доставка), всё остальное — в коде.

**Результат:** магазин с каталогом → поиском → корзиной → checkout → оплатой → заказами → админкой, с нормами безопасности и производительности.

---

## 1) Область работ (Scope MVP)

Входит:

- **Каталог**: категории, бренды, атрибуты, вариативность (опции свободной формы), фото/галерея.
- **Поиск и фильтрация**: полнотекст (Meilisearch), фасеты, синонимы/опечатки.
- **Корзина**: гостевая и авторизованная, сохранение, «брошенные корзины» (e‑mail).
- **Checkout**: one‑page, минимальные поля, валидации, согласия.
- **Оплата**: Idram, ArCa (3‑DS), идемпотентность операций, вебхуки.
- **Доставка**: самовывоз, курьер по городу, фикс по стране; геозоны, free‑shipping.
- **ЛК**: профиль, адреса, история заказов, повтор заказа.
- **OMS**: статусы, комментарии менеджера, e‑mail/SMS уведомления, документы.
- **Контент/SEO**: блог/новости, OG, Schema.org, hreflang, sitemap, robots.
- **Админка**: CRUD товаров/категорий/атрибутов, массовые операции, импорт CSV/XLSX, заказы, купоны.

Отложено (после v1.0): рефералка, B2B‑прайсы, маркетплейс‑фиды, мульти‑склад, RMA‑кабинет, экспорт ярлыков курьеров.

---

## 2) Нефункциональные требования (SLA/SLO/качество)

- **SLA доступности**: 99.9%/мес (≈ 43 мин простоя допустимо).
- **SLO скорости**:
  - TTFB p95: ≤ 300 мс из кэша CDN, ≤ 600 мс без кэша.
  - LCP p75 ≤ 2.5 c, INP p75 ≤ 200 мс, CLS p75 ≤ 0.1.
  - API чтение p95 ≤ 500 мс; запись p95 ≤ 800 мс (checkout/оплата).
  - Поиск p95 ≤ 250 мс на 10k SKU.
- **Надежность**: 5xx ≤ 0.1%/неделя.
- **Доступность данных**: RPO ≤ 24 ч, RTO ≤ 1 ч.
- **Соответствие**: базовый OWASP ASVS L1/L2, защита персональных данных, минимизация PII в логах.

---

## 3) Архитектура и стек

**Стиль:** TypeScript «микро‑монолит» с четкими модулями.

**Фронтенд**: Next.js 15 (App Router, SSR/ISR, i18n, WCAG 2.2 AA).\
**Бэкенд**: NestJS (REST + вебхуки), RBAC, class‑validator, DTO.\
**БД**: PostgreSQL 16 (Prisma или Drizzle для миграций/ORM).\
**Кэш/очереди**: Redis 7 + BullMQ (email, индексация, webhooks, отчёты).\
**Поиск**: Meilisearch 1.x (асинхронная индексация).\
**Хранилище медиа**: S3‑совместимое (Cloudflare R2/Wasabi), через CDN.\
**I18n**: RU/AM/EN, локализованные URL/hreflang.

**Почему этот стек:** единый язык (TS), быстрый dev‑цикл, зрелые тулзы, достаточно для 1–10k SKU и до 10k заказов/мес без «микросервисного ада». Альтернатива: Laravel 11 + Blade/Livewire — возможна, но базовый выбор TS.

**Структура репозитория (монорепо)**

```
apps/
  web/        # витрина (Next.js)
  api/        # NestJS API/webhooks
packages/
  domain/     # бизнес‑модель, правила, use‑cases (чистая архитектура)
  ui/         # компоненты, дизайн‑система, токены
  adapters/   # платежи, доставка, поиск (интерфейсы + реализации)
config/
  brand.config.json   # тема: цвета/шрифты/радиусы
  app.config.json     # языки, валюта, налоги, форматы адресов
  payments.config.json# провайдеры; секреты только в .env
  shipping.config.json# геозоны, тарифы, free‑shipping
  features.json       # включалка модулей (coupons/blog/wishlist)
scripts/              # seed, index‑rebuild, deploy, backup‑check
```

---

## 4) Доменная модель (ядро)

**Сущности**

- `Product(id, slug, title, description, brandId, media[], attrs[], published)`
- `Variant(id, productId, sku, options[], price, compareAt, stock, barcode)`
- `Category(id, parentId, slug, title, meta)`
- `Attribute(id, key, type, localized)` / `AttributeValue(id, attributeId, value)`
- `Cart(id, userId?, items[], totals, coupon?)`
- `Order(id, number, userId?, items[], totals, status, payments[], shipments[], audit)`
- `User(id, email/phone, passwordHash?, roles[], addresses[])`
- `Coupon(id, code, rules, usageLimits, validFrom/To)`

**Принципы**

- Варианты — через **свободный набор опций** (размер/цвет/вкус/объем), без жёстких полей «только одежда».
- Везде audit‑поля, soft‑delete где оправдано.
- Цены/скидки/налоги считаются централизованно на бэке.

**DDL (набросок индексов)**

- FK и уникальные индексы обязательны.
- `products.slug` UNIQUE, `variants.sku` UNIQUE.
- Индексы на `orders(userId, createdAt)`; `variants(productId)`; GIN/Trigram для поиска по названию/артикулам.
- Partial index для soft‑delete: `WHERE deleted_at IS NULL`.

### 4.1 Локализация данных: стратегия хранения переводов

**Задача:** RU/AM/EN для товаров/категорий/атрибутов/брендов, SEO‑слуги и тексты — без дублирования базовой записи.

**Подход:** нормализованные таблицы переводов c уникальными ключами по `(entity_id, locale)` и локализованными слагами.

**Схема (пример):**

```sql
-- товары
CREATE TABLE product_translations (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  locale VARCHAR(5) NOT NULL,          -- 'ru', 'am', 'en'
  title TEXT NOT NULL,
  subtitle TEXT,
  description_html TEXT,               -- санитизированный HTML/PortableText JSON
  slug TEXT NOT NULL,
  meta JSONB DEFAULT '{}'::jsonb,      -- title/description/og
  CONSTRAINT uq_product_locale UNIQUE(product_id, locale),
  CONSTRAINT uq_product_slug_locale UNIQUE(slug, locale)
);
CREATE INDEX idx_product_trg_title_trgm ON product_translations USING GIN (title gin_trgm_ops);

-- категории
CREATE TABLE category_translations (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  locale VARCHAR(5) NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,                  -- локализованный слаг
  full_path TEXT NOT NULL,             -- precomputed: 'odezhda/platya'
  meta JSONB DEFAULT '{}'::jsonb,
  CONSTRAINT uq_cat_locale UNIQUE(category_id, locale),
  CONSTRAINT uq_cat_path_locale UNIQUE(full_path, locale)
);
```

Аналогично: `attribute_translations`, `attribute_value_translations`, `brand_translations`.

**URL/SEO:**

- Префиксы локали в пути: `/am/`, `/ru/`, `/en/`.
- `hreflang` и `canonical` на каждую локаль.
- При смене слага создаём запись в таблице редиректов `redirects(from_path, to_path, locale, 301)`.

**Fallback:**

- Если перевода нет, возвращаем дефолтную локаль + `translationMissing=true`.
- Политика fallback настраивается: например, `am -> ru -> en`.

**Админ‑процессы:**

- Вкладки языков в форме товара; статус «нужен перевод»; массовый импорт/экспорт CSV/XLSX с колонками `locale`.
- Проверки: пустые поля ключевых локалей блокируют публикацию.

**API:**

- Явный параметр `?lang=am` или `Accept-Language`.
- Всегда отдаём `localized` и `default` блоки в ответе, если нужен fallback.

**Поиск:**

- Отдельный индекс Meilisearch на каждую локаль (`products_ru`, `products_am`, `products_en`).
- Синонимы/морфология настраиваются по языку. Индексация подтягивает нужную запись перевода.

**События для кэша/поиска:** `TranslationCreated/Updated`, `SlugChanged` → reindex + инвалидация HTML/JSON по соответствующим локалям.

---

## 5) API дизайн

**Версионирование:** `/api/v1/...`\
**Стандарты:**

- Формат ошибок — RFC 7807 (`application/problem+json`).
- Идемпотентность: заголовок `Idempotency-Key` на POST `/checkout` и платежи.
- Пагинация: `limit/offset` или cursor, whitelisted фильтры и сортировки.
- Кэш GET: `ETag/Last-Modified` + 304.
- OpenAPI 3.1 спецификация; генерация SDK клиента.

**Примеры эндпоинтов**

- GET `/products?query=&category=&filters=&sort=&page=`
- GET `/products/{slug}`
- GET `/categories/tree`
- POST `/cart/items` | PATCH `/cart/items/{id}` | DELETE `/cart/items/{id}`
- POST `/checkout` → возврат `orderId`, `paymentUrl`/`paymentClientSecret`
- POST `/payments/webhook/idram` | `/payments/webhook/arca` (подпись/проверка)
- GET `/orders/{number}` (авторизованная зона)

**DTO/валидации**: class‑validator на каждое поле, строгие схемы, canonicalization.

---

## 6) Checkout, оплата, идемпотентность

**Правила**

- Заказ создается в статусе `pending` с `reservationTTL=15min`.
- Все операции записи idempotent. Повтор запроса с тем же `Idempotency-Key` не создаёт дубль.
- Webhook провайдера верифицируется по подписи; повторная доставка события безопасна.

**Псевдокод idempotent обработки**

```ts
async function createOrder(req) {
  const key = req.headers['Idempotency-Key'];
  const existing = await idempotencyStore.get(key);
  if (existing) return existing.response;

  return await withTransaction(async (tx) => {
    const order = await tx.orders.create(pendingFromCart(req.user, req.body));
    await reserveStock(tx, order.items, { ttl: 15 * 60 });
    const payment = await payments.init(order, req.body.method);
    const resp = { orderId: order.number, payment }; 
    await idempotencyStore.put(key, resp);
    return resp;
  });
}
```

---

## 7) Поиск и навигация

- Индексация в фоне: события `ProductCreated/Updated/Deleted` кладут задачи в очередь.
- Синонимы и опечатки включены; фасеты: цена/бренд/ключевые атрибуты.
- 404/410 для удалённых товаров; 301 редиректы при смене слага.

---

## 8) Фронтенд: витрина

- SSR/ISR + CDN, критический CSS инлайн, code‑splitting, lazy для не‑above‑the‑fold.
- Доступность: WCAG 2.2 AA, фокусы, aria, клавиатура, skip‑links.
- I18n: ICU‑plural, локализация форматов дат/валют, локализованные URL/hreflang.
- Изображения: WebP/AVIF, `srcset/sizes`, лимит \~300 KB на карточку, трансформации на CDN, preconnect/preload критики.
- Унифицированные состояния UI: loading/skeleton/empty/error.

---

## 9) Админ‑панель (v1)

- Роли: администратор, менеджер заказов, контент‑менеджер, маркетолог.
- Массовые операции: импорт CSV/XLSX (валидация + отчёт ошибок), массовые правки цен/остатков.
- История изменений и аудит: кто/что/когда.
- Права на операции (create/edit/delete/publish) по ролям.
- Шаблоны e‑mail/SMS, предпросмотр, локализация.

---

## 10) Безопасность

**Аутентификация/авторизация**

- Хеш паролей: Argon2id (memory ≥ 64MB, iterations/parallelism по профилю машины).
- Сессии: HttpOnly, SameSite=Lax; refresh‑токены ≤ 30 дней, ротация/отзыв.
- MFA для админов.
- RBAC deny‑by‑default; проверка прав на сервере, не только в UI.

**Ввод/валидация**

- Обязательная валидация DTO на бэке; нормализация/escape; строгие типы.
- Запрет прямых SQL — только параметризованные запросы ORM.

**Защита от атак**

- CSRF защита на изменяющих запросах; антибот (hCaptcha/reCAPTCHA) на публичных формах.
- Rate‑limit per IP/user; circuit breaker и тайм‑ауты на интеграции.
- Заголовки: CSP (script‑src 'self' 'nonce‑{n}'), HSTS, X‑Content‑Type‑Options, Referrer‑Policy, Permissions‑Policy, X‑Frame‑Options.

**Загрузка файлов**

- Проверка MIME/расширений, ограничение размера, антивирус‑скан, приватные префиксы в S3; подписи URL с TTL.

**Секреты/конфиги**

- Никаких ключей в Git. Секрет‑менеджмент (ENV, Vault/KMS). Разделение dev/stage/prod.

**Логи/PII**

- Структурные JSON‑логи с correlation‑id. Маскирование PII, запрет логировать PAN.

---

## 11) Производительность и кэш

- CDN перед Nginx, HTML‑кэш категорий/товаров/брендов (ISR + `stale‑while‑revalidate`).
- Redis‑кэш для часто читаемых API (прайс‑блоки, хиты) с TTL и точечной инвалидацией по событиям (изменение цены/остатка/публикации).
- Оптимизация SQL: индексы, избегать N+1; `SELECT … FOR UPDATE` в критических местах.
- Бюджеты: домашняя страница критический CSS/JS ≤ 150 KB; шрифты — `display: swap`.

### 11.1 Стратегия кэш‑инвалидации (конкретика)

**Типы кэшей:**

1. **Edge/CDN** HTML и media (Cloudflare).
2. **Next.js** Route/Data Cache (ISR, `revalidateTag`).
3. **Redis** объектный кэш API/аггрегатов.
4. **Браузерный** кэш с `ETag/Last-Modified`.

**Теги и версии:**

- В БД у сущностей `version`/`updated_at`. Ключ Redis: `product:{id}:v{version}`. Инвалидация = атомарный инкремент версии и публикация события.
- В Next.js используем **cache tags**: `product:{id}`, `category:{id}`, `collection:{id}`, `price:{sku}`, `stock:{sku}`, `menu`, `home`, `sitemap`.
- HTML‑ответы помечаются **Surrogate‑Key/Cache‑Tag** заголовком (если доступно) с теми же тегами.

**Механика событий:** Каждое изменение генерирует доменное событие → очередь → обработчики:

| Событие                        | Действия инвалидации                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| ProductCreated/Updated/Deleted | `revalidateTag('product:{id}')`, purge CDN по тегу `product:{id}`, инкремент версии Redis, reindex Meili                       |
| TranslationCreated/Updated     | `revalidateTag('product:{id}')`/`category:{id}` для нужной локали; purge CDN по локализованным URL, reindex локального индекса |
| PriceChanged                   | `revalidateTag('price:{sku}')`, обновить карточку в Redis, мягкий purge продуктовой страницы                                   |
| StockChanged                   | `revalidateTag('stock:{sku}')`, обновить блок наличия, без полного purge каталога                                              |
| CategoryChanged/TreeChanged    | `revalidateTag('category:{id}')`, purge категорий/хлебных крошек, пересчитать `full_path`, reindex дочерних                    |
| Publish/Unpublish              | purge соответствующих страниц/списков, reindex                                                                                 |

**CDN purge:**

- Если есть Cache‑Tags — чистим по тегам батчами.
- Нет тегов — чистим по списку URL (продукт, его категории, бренд, пагинации 1–3).
- Все purge идемпотентны и батчатся (debounce 2–5 сек) для массовых правок.

**Next.js ISR:**

- Страницы категорий/товаров строятся с `revalidate` и **тегами**. На событии вызываем серверный `revalidateTag(tag)`. Пользователь видит stale, а фон перегенерирует свежую версию.

**Redis:**

- Ключи включают версию. На событии инкрементим версию и публикуем `invalidate:{entity}:{id}` в Pub/Sub, чтобы все инстансы выкинули старое.

**Batch‑импорт:**

- Включаем `bulk-mode`: отключаем точечный purge, собираем ID и делаем **coarse purge по тегам** (например, категория/бренд) + пакетную reindex. Ограничиваем QPS к CDN API.

**TTL и политика:**

- HTML категорий/товаров: `max-age=0, s-maxage=600, stale-while-revalidate=86400`.
- Данные цены/остатков: Redis TTL 30–60 сек и событие‑инвалидация при изменении. Корзина/checkout не кэшируются.

**Защита от штормов:**

- Debounce/троттлинг purge, джиттер, распределённые локи на reindex. Метрики: hit‑rate, время `revalidate`, частота purge, ошибки CDN API.

**Админ‑UX:**

- Кнопки: «Обновить страницу товара», «Очистить категорию», «Полный purge витрины» с защитой и журналом.

---

## 12) Инфраструктура и деплой

- **VPS + Docker Compose**: web, api, redis, meilisearch, nginx отдельными сервисами; Postgres управляемый или отдельный VPS.
- **CDN/WAF**: Cloudflare; кэш, DDoS, TLS 1.2+.
- **CI/CD**: GitHub Actions → линт/типы/тесты → сборка контейнеров → деплой по SSH, blue‑green (web\_v1/web\_v2). Миграции применяются на релизе.
- **Обсервабилити**: Loki/Prometheus/Grafana, Uptime‑мониторинг, алерты в Telegram (ошибки 5xx, latency p95, лаг очередей).
- **Бэкапы/DR**: ежедневные инкременты, еженедельные полные; offsite‑копия; ежеквартальный тест восстановления.

Начальные размеры: web+api 8 vCPU/16 GB, Meili 4 vCPU/8 GB, Redis 2 vCPU/4 GB, Postgres 2–4 vCPU/8–16 GB.

---

## 13) Тестирование и качество

- **Unit** ядра и сервисов, **API‑контракты**; покрытие ядра ≥ 70%.
- **E2E** (Playwright): поиск → корзина → checkout → оплата → смена статуса заказа.
- **Нагрузочное** (k6): 100–150 RPS чтение, 5–20 RPS запись (пики 10 мин) без нарушения SLO.
- **Lighthouse** в CI: mobile ≥ 85, desktop ≥ 95; контроль CWV.
- **Security**: SAST (ESLint/type‑check), зависимостей (Trivy/Snyk), секретов (gitleaks).

**Definition of Done (каждой задачи)**

- Тесты есть (unit/integration/e2e по необходимости).
- Документация обновлена (README/ADR/API).
- Логи/метрики/алерты покрывают новый функционал.
- Нет регрессий перформанса (Lighthouse/Profiler).
- Безопасность: хедеры, права, валидации проверены.

---

## 14) SEO и аналитика

- Canonical, OG/Twitter, Schema.org: Product, BreadcrumbList, Organization.
- XML‑sitemap index, правильный robots для stage/prod.
- GA4 + server‑side events (view\_item, add\_to\_cart, begin\_checkout, purchase); дедупликация; соблюдение consent.

---

## 15) Документация и ввод в эксплуатацию

- README: dev/stage/prod, шаблоны `.env`, команды.
- ER‑диаграмма, события, вебхуки, схемы статусов заказа.
- Чек‑лист запуска нового клиента (≤ 30 шагов) и план отката.

**Предрелизный чек‑лист**

1. Миграции/сиды проходят на stage.
2. Lighthouse mobile/desktop в бюджете; CWV в зелёной зоне.
3. k6 нагрузка пройдена.
4. Платёжные вебхуки — ок, идемпотентность проверена.
5. Бэкап свежий, восстановление протестировано.
6. Домены/SSL/CDN готовы, кэш‑инвалидации работают.
7. Почта/SMS доставляются; SPF/DKIM/DMARC ок.
8. Политики/robots/sitemap корректны.
9. Алерты включены.
10. Есть план отката.

**Пострелиз (48 часов)**: мониторинг error‑rate/latency/конверсии checkout; проверка индексации поиска и фидов; сбор RUM CWV; пост‑морем.

---

## 16) Почему это решение «рабочее в жизни»

- **Без лишней магии**: один проект, чётко спроектированное ядро, понятные конфиги и адаптеры.
- **Без «медленного шаблона»**: это не CMS и не runtime‑конструктор; скорость задают кэш/индексы/CDN и дисциплина бандла.
- **Гибкость**: нейтральная доменная модель и адаптеры позволяют увести функционал далеко от базы без сноса фундамента.
- **Поддерживаемость**: стандарты тестов/безопасности/деплоя уменьшают шанс словить «долг» в каждой копии.

> Финальный ориентир: первый магазин делаем по этому ТЗ. Все последующие независимые проекты стартуют копированием репозитория и заменой темы/конфигов, а ядро и нормы остаются едиными, чтобы не забыть ничего важного — особенно в безопасности.

