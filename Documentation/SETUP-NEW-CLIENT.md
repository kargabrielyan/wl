# НАСТРОЙКА ПОД НОВОГО КЛИЕНТА

> **Цель:** Адаптация базового проекта под нового клиента за 30-60 минут.  
> **Частота использования:** 30-40 раз в год.

---

## ⏱️ ВРЕМЯ ВЫПОЛНЕНИЯ

**Общее время:** 30-60 минут  
**С автоматизацией:** 15-20 минут

---

## ✅ CHECKLIST НАСТРОЙКИ

### **Шаг 1: Клонирование проекта** (5 минут)

```bash
# 1. Клонировать базовый проект
git clone https://github.com/yourname/shop-classic.git new-client-shop

# 2. Перейти в новую папку
cd new-client-shop

# 3. Удалить связь с оригинальным репозиторием
rm -rf .git

# 4. Инициализировать новый Git репозиторий
git init
git add .
git commit -m "Initial commit from shop-classic template"

# 5. Создать новый репозиторий на GitHub
# (вручную через GitHub UI)

# 6. Подключить новый remote
git remote add origin https://github.com/yourname/new-client-shop.git
git push -u origin main
```

**Результат:** Независимая копия проекта с новым Git history

---

### **Шаг 2: Брендинг** (10 минут)

#### 2.1 Изменить цвета и название

```bash
# Открыть конфиг бренда
nano config/brand.json
```

```json
{
  "name": "NewClientShop",              // ← изменить
  "tagline": "Лучший магазин товаров",  // ← изменить
  
  "logo": {
    "main": "/logo.svg",
    "light": "/logo-light.svg",
    "dark": "/logo-dark.svg",
    "icon": "/logo-icon.svg",
    "favicon": "/favicon.ico"
  },
  
  "colors": {
    "primary": "#0066FF",               // ← изменить на цвет клиента
    "secondary": "#00CC88"              // ← изменить
  },
  
  "fonts": {
    "heading": "Montserrat",            // ← изменить если нужно
    "body": "Inter"                     // ← изменить если нужно
  }
}
```

#### 2.2 Загрузить логотипы клиента

```bash
# Заменить файлы в apps/web/public/
cp /path/to/client-logo.svg apps/web/public/logo.svg
cp /path/to/client-logo-light.svg apps/web/public/logo-light.svg
cp /path/to/client-logo-dark.svg apps/web/public/logo-dark.svg
cp /path/to/client-favicon.ico apps/web/public/favicon.ico
```

**Результат:** Магазин с брендингом клиента

---

### **Шаг 3: Контакты и информация** (5 минут)

```bash
# Открыть конфиг контактов
nano config/contact.json
```

```json
{
  "email": "info@newclient.am",           // ← изменить
  "phone": "+374 XX XXX XXX",             // ← изменить
  "address": {
    "ru": "г. Ереван, ул. Абовяна 10",    // ← изменить
    "am": "Երևան, Աբովյան 10",            // ← изменить
    "en": "Yerevan, Abovyan 10"           // ← изменить
  },
  "workingHours": {
    "ru": "Пн-Пт 10:00-19:00",           // ← изменить
    "am": "Երկ-Ուրբ 10:00-19:00",         // ← изменить
    "en": "Mon-Fri 10:00-19:00"          // ← изменить
  },
  "social": {
    "instagram": "https://instagram.com/newclient",  // ← изменить
    "facebook": "https://facebook.com/newclient",    // ← изменить
    "telegram": "https://t.me/newclient"             // ← изменить
  }
}
```

**Результат:** Правильные контакты клиента везде на сайте

---

### **Шаг 4: Окружение и секреты** (10 минут)

#### 4.1 Создать .env из шаблона

```bash
# Скопировать шаблон
cp Documentation/.env.example .env

# Редактировать
nano .env
```

#### 4.2 Настроить переменные

```bash
# App
NODE_ENV=production
APP_URL=https://newclient.am
API_URL=https://api.newclient.am

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/newclient_shop

# Redis
REDIS_URL=redis://localhost:6379

# Meilisearch
MEILI_HOST=http://localhost:7700
MEILI_MASTER_KEY=your-master-key-here

# S3 (Media Storage)
S3_ENDPOINT=https://your-bucket.r2.cloudflarestorage.com
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
S3_BUCKET=newclient-media
S3_PUBLIC_URL=https://cdn.newclient.am

# Payments - Idram
IDRAM_MERCHANT_ID=client-merchant-id        # ← получить от клиента
IDRAM_SECRET_KEY=client-secret-key          # ← получить от клиента
IDRAM_PUBLIC_KEY=client-public-key          # ← получить от клиента

# Payments - ArCa
ARCA_MERCHANT_ID=client-merchant-id         # ← получить от клиента
ARCA_API_KEY=client-api-key                 # ← получить от клиента

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@newclient.am              # ← изменить
SMTP_PASSWORD=client-email-password         # ← получить от клиента

# JWT
JWT_SECRET=generate-random-32-chars         # ← сгенерировать: openssl rand -hex 32
JWT_EXPIRES_IN=7d

# Monitoring
SENTRY_DSN=https://sentry.io/client-dsn     # ← опционально
```

**Результат:** Правильные секреты и настройки

---

### **Шаг 5: Бизнес-правила** (5 минут)

#### 5.1 Настроить доставку

```bash
nano config/shipping.json
```

```json
{
  "defaultMethod": "courier_yerevan",
  "methods": [
    {
      "id": "pickup",
      "name": {
        "ru": "Самовывоз",
        "am": "Ինքնուրույն",
        "en": "Pickup"
      },
      "enabled": true,
      "price": 0,
      "estimatedDays": 0,
      "locations": [
        {
          "name": { 
            "ru": "Главный офис",
            "am": "Գլխավոր գրասենյակ" 
          },
          "address": "Yerevan, Abovyan 10",  // ← адрес клиента
          "coords": { "lat": 40.1776, "lng": 44.5126 }
        }
      ]
    },
    {
      "id": "courier_yerevan",
      "name": {
        "ru": "Курьер по Еревану",
        "am": "Առաքիչ Երևանում",
        "en": "Courier in Yerevan"
      },
      "enabled": true,
      "price": 1000,                       // ← тариф клиента
      "freeAbove": 50000,                  // ← порог бесплатной доставки
      "estimatedDays": 1
    }
  ]
}
```

#### 5.2 Настроить бизнес-правила

```bash
nano config/business.json
```

```json
{
  "tax": {
    "enabled": true,
    "rate": 20,                           // ← ставка НДС
    "included": true                      // НДС включён в цену
  },
  "minOrderAmount": 1000,                 // ← минимальная сумма заказа
  "freeShippingThreshold": 50000,         // ← бесплатная доставка от
  "reservationMinutes": 15,               // резерв товара в корзине
  "currency": {
    "code": "AMD",
    "symbol": "֏",
    "symbolPosition": "after"
  }
}
```

---

### **Шаг 6: Контент** (опционально, время зависит от объёма)

#### 6.1 Импорт товаров из CSV

```bash
# Подготовить CSV файл
# products.csv:
# title,sku,price,stock,category
# Футболка красная,TSH-RED-001,5000,10,odezhda/futbolki
# Джинсы синие,JEANS-BLUE-001,15000,5,odezhda/dzhynsy

# Импортировать
npm run import:products -- --file products.csv --locale ru
```

#### 6.2 Создать категории

```bash
# Через админку или SQL
psql $DATABASE_URL -c "
INSERT INTO categories (parent_id, position, published) VALUES
(NULL, 1, true),  -- Одежда
(1, 1, true),     -- Футболки
(1, 2, true);     -- Джинсы

INSERT INTO category_translations (category_id, locale, title, slug) VALUES
(1, 'ru', 'Одежда', 'odezhda'),
(2, 'ru', 'Футболки', 'futbolki'),
(3, 'ru', 'Джинсы', 'dzhynsy');
"
```

#### 6.3 Загрузить изображения

```bash
# Загрузить в S3/R2 bucket
aws s3 sync ./client-images/ s3://newclient-media/products/

# Или через админку после запуска
```

---

### **Шаг 7: Локальная проверка** (10 минут)

```bash
# 1. Установить зависимости
npm install

# 2. Применить миграции БД
npx prisma migrate deploy

# 3. Сгенерировать Prisma client
npx prisma generate

# 4. Заполнить seed данными (опционально)
npm run db:seed

# 5. Собрать проект
npm run build

# 6. Запустить локально
npm run dev

# 7. Проверить в браузере
# Открыть: http://localhost:3000
# Проверить: главная, каталог, товар, корзина

# 8. Проверить API
curl http://localhost:3001/api/v1/products
```

**Результат:** Проект работает локально с данными клиента

---

### **Шаг 8: Деплой на production** (20 минут)

**См. подробную инструкцию в DEPLOYMENT.md**

Краткий checklist:
- [ ] Создать VPS (если ещё нет)
- [ ] Настроить домен клиента (DNS)
- [ ] Настроить SSL (Let's Encrypt)
- [ ] Загрузить код на сервер
- [ ] Настроить .env на сервере
- [ ] Запустить миграции
- [ ] Собрать проект
- [ ] Запустить через PM2/Docker
- [ ] Настроить Nginx
- [ ] Smoke test (главная, API, checkout)

**Результат:** Магазин работает на production

---

## 🤖 АВТОМАТИЗАЦИЯ (опционально)

### Скрипт для быстрой настройки:

```bash
#!/bin/bash
# scripts/setup-new-client.sh

CLIENT_NAME=$1
CLIENT_DOMAIN=$2

# Клонирование
git clone shop-classic "$CLIENT_NAME"
cd "$CLIENT_NAME"
rm -rf .git
git init

# Обновление конфигов
sed -i '' "s/MyShop/$CLIENT_NAME/g" config/brand.json
sed -i '' "s/myshop.am/$CLIENT_DOMAIN/g" config/brand.json

echo "✅ Проект склонирован и настроен для $CLIENT_NAME"
echo "📝 Следующие шаги:"
echo "1. Обнови config/brand.json (цвета)"
echo "2. Загрузи логотипы в apps/web/public/"
echo "3. Обнови config/contact.json"
echo "4. Создай .env из .env.example"
echo "5. Запусти: npm install && npm run dev"
```

**Использование:**
```bash
./scripts/setup-new-client.sh "NewShop" "newshop.am"
```

---

## 📋 POST-SETUP CHECKLIST

После завершения настройки проверь:

### Функциональность:
- [ ] Главная страница открывается
- [ ] Каталог показывает товары
- [ ] Карточка товара открывается
- [ ] Можно добавить в корзину
- [ ] Корзина работает
- [ ] Checkout форма валидируется
- [ ] Можно создать заказ
- [ ] Email с подтверждением приходит

### Брендинг:
- [ ] Правильный логотип в header
- [ ] Правильные цвета кнопок
- [ ] Правильный favicon в браузере
- [ ] Правильное название в title

### Контакты:
- [ ] Правильный email в footer
- [ ] Правильный телефон в header
- [ ] Правильный адрес на странице контактов
- [ ] Правильные ссылки на соцсети

### Технические:
- [ ] .env файл создан и заполнен
- [ ] БД создана и миграции применены
- [ ] Seed данные загружены (если нужно)
- [ ] Нет TypeScript ошибок
- [ ] Нет console errors в браузере

---

## 🎯 ТИПИЧНЫЕ КАСТОМИЗАЦИИ ПО КЛИЕНТАМ

### Часто (80% клиентов):
- ✅ Цвета бренда (primary, secondary)
- ✅ Логотипы
- ✅ Контакты (email, phone, адрес)
- ✅ Социальные сети
- ✅ Методы доставки и тарифы

### Иногда (20% клиентов):
- ⚠️ Другие шрифты
- ⚠️ Дополнительные платёжные провайдеры
- ⚠️ Кастомные поля в форме checkout
- ⚠️ Дополнительные страницы (О нас, Гарантии)

### Редко (5% клиентов):
- 🔧 Кастомный layout карточек товаров
- 🔧 Специфичная логика расчёта доставки
- 🔧 Интеграция с CRM
- 🔧 Кастомные атрибуты товаров

---

## 💡 СОВЕТЫ ПРИ РАБОТЕ С КЛИЕНТАМИ

### Что запросить у клиента ДО старта:

**Обязательно:**
- [ ] Брендбук (логотипы, цвета, шрифты)
- [ ] Контактная информация (email, телефон, адрес, соцсети)
- [ ] Доступ к платёжным системам (Idram/ArCa merchant ID + ключи)
- [ ] Email для отправки уведомлений (SMTP доступ)
- [ ] Домен (если уже есть) или помочь зарегистрировать

**Желательно:**
- [ ] Товары в CSV/Excel (title, price, category, images)
- [ ] Категории (структура)
- [ ] Тексты для страниц (О нас, Доставка, Оплата)
- [ ] Доступ к хостингу (если уже есть VPS)

### Что НЕ запрашивать (сделаешь сам):
- Дизайн страниц (используй базовый)
- Техническая документация
- Инструкции по администрированию

---

## 🚀 СЛЕДУЮЩИЕ ШАГИ ПОСЛЕ SETUP

1. **Заполнить контентом:**
   - Импортировать товары клиента
   - Создать категории
   - Загрузить изображения
   
2. **Провести обучение:**
   - Показать админку
   - Показать как добавлять товары
   - Показать как обрабатывать заказы

3. **Запустить на production:**
   - Деплой (см. DEPLOYMENT.md)
   - Настройка домена
   - Smoke test

4. **Передать клиенту:**
   - Доступы в админку
   - Краткую инструкцию
   - Контакты для поддержки

---

## 📊 ОЦЕНКА ВРЕМЕНИ

| Задача | Минимум | Среднее | Максимум |
|--------|---------|---------|----------|
| Клонирование | 5 мин | 5 мин | 5 мин |
| Брендинг | 5 мин | 10 мин | 20 мин |
| Контакты | 3 мин | 5 мин | 10 мин |
| .env настройка | 5 мин | 10 мин | 15 мин |
| Бизнес-правила | 3 мин | 5 мин | 10 мин |
| Импорт контента | 10 мин | 30 мин | 2 часа |
| Деплой | 15 мин | 20 мин | 40 мин |
| **ИТОГО** | **30 мин** | **1 час** | **3 часа** |

**Средний case:** 1 час чистой работы

---

## ✅ ИТОГОВЫЙ РЕЗУЛЬТАТ

После выполнения всех шагов:
- ✅ Независимый проект с Git history клиента
- ✅ Брендинг клиента (цвета, логотипы)
- ✅ Контакты клиента везде на сайте
- ✅ Правильные настройки (.env)
- ✅ Платежи клиента подключены
- ✅ Готов к деплою

**Клиент получает полнофункциональный магазин за 1-3 часа!** 🎉

---

**Создан:** 2025-02-07  
**Версия:** 1.0  
**Использований:** 0  
**Среднее время:** TBD (будет обновляться)
