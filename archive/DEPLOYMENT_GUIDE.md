# 🚀 ПРОФЕССИОНАЛЬНЫЙ ГАЙД ПО ОБНОВЛЕНИЮ ПРОЕКТОВ

## ⚡ **КРАТКИЕ ПРАВИЛА (ОБЯЗАТЕЛЬНО СЛЕДОВАТЬ!)**

### **🔴 КРИТИЧЕСКИЕ ПРАВИЛА:**
1. **ВСЕГДА** создавайте резервную копию перед обновлением
2. **ВСЕГДА** удаляйте `.env.local` и `.next` перед обновлением
3. **ВСЕГДА** пересоздавайте PM2 процесс (не просто restart)
4. **ВСЕГДА** генерируйте Prisma клиент после обновления зависимостей
5. **ВСЕГДА** проверяйте API после обновления
6. **ВСЕГДА** проверяйте занятые порты перед добавлением нового сайта
7. **НИКОГДА** не используйте занятые порты (3000, 3001, 5000)

### **🟡 ОБЯЗАТЕЛЬНАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ:**
```bash
1. Резервная копия
2. Остановка PM2
3. Обновление кода
4. Удаление конфликтующих файлов
5. Установка зависимостей
6. Генерация Prisma клиента
7. Удаление кэша Next.js
8. Пересборка проекта
9. Пересоздание PM2 процесса
10. Проверка работоспособности
```

---

## 🎯 **ЦЕЛЬ**
Создать безошибочный процесс обновления Next.js проектов с PostgreSQL на сервере Hetzner

---

## ⚠️ **КРИТИЧЕСКИ ВАЖНО: БЕЗОПАСНОСТЬ ПРИ ОБНОВЛЕНИИ**

### **🚨 ПРЕДУПРЕЖДЕНИЕ: ПРАВИЛЬНЫЙ ПРОЕКТ**
**ПЕРЕД ЛЮБЫМ ОБНОВЛЕНИЕМ ОБЯЗАТЕЛЬНО:**
1. **Убедитесь, что обновляете ПРАВИЛЬНЫЙ проект** - тот, который указал пользователь
2. **НЕ ТРОГАЙТЕ другие проекты** - они могут быть важными для других клиентов
3. **НЕ ИЗМЕНЯЙТЕ порты и базы данных** других проектов
4. **Создавайте резервные копии** перед любыми изменениями
5. **Проверяйте текущее состояние** проекта перед обновлением

### **🔍 ПРОВЕРКА ПЕРЕД ОБНОВЛЕНИЕМ:**
```bash
# 1. Проверить, какой проект нужно обновить
pm2 list
ls -la /var/www/

# 2. Проверить текущую версию проекта
cd /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ
git log --oneline -3

# 3. Создать резервную копию
cp -r /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ.backup-$(date +%Y%m%d-%H%M%S)
```

---

## ⚡ **БЫСТРАЯ ИНСТРУКЦИЯ (10 ШАГОВ)**

```bash
# 1. Подключиться к серверу
ssh hetzner

# 2. Найти проект и создать резервную копию
pm2 list
cd /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ
cp -r /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ.backup-$(date +%Y%m%d-%H%M%S)

# 3. Остановить проект
pm2 stop ПРАВИЛЬНЫЙ_ПРОЕКТ

# 4. Обновить код
git pull origin main

# 5. Удалить конфликтующие файлы
rm -f .env.local .env.development .env.test

# 6. Установить зависимости
npm install

# 7. Сгенерировать Prisma клиент (КРИТИЧЕСКИ ВАЖНО!)
npx prisma generate

# 8. Удалить кэш и пересобрать
rm -rf .next
npm run build

# 9. Пересоздать PM2 процесс
pm2 delete ПРАВИЛЬНЫЙ_ПРОЕКТ
PORT=3000 pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start

# 10. Проверить работоспособность
curl -s http://localhost:3000/api/products | head -3
```

---

## 🔌 **УПРАВЛЕНИЕ ПОРТАМИ НА СЕРВЕРЕ**

### **🚨 КРИТИЧЕСКИ ВАЖНО: ПРАВИЛЬНОЕ НАЗНАЧЕНИЕ ПОРТОВ**

**ПЕРЕД ДОБАВЛЕНИЕМ НОВОГО САЙТА ОБЯЗАТЕЛЬНО:**
1. **Проверить занятые порты** на сервере
2. **Выбрать свободный порт** для нового сайта
3. **Зафиксировать порт** в документации
4. **Обновить nginx конфигурацию** с правильным портом

### **🔍 КОМАНДЫ ДЛЯ ПРОВЕРКИ ПОРТОВ:**
```bash
# Проверить все занятые порты
netstat -tlnp | grep LISTEN

# Проверить порты 3000-3010 (обычно для Next.js)
netstat -tlnp | grep -E ':(3000|3001|3002|3003|3004|3005|3006|3007|3008|3009|3010)'

# Проверить конкретный порт
netstat -tlnp | grep :3005
```

### **📋 ТАБЛИЦА ЗАНЯТЫХ ПОРТОВ:**
| Порт | Проект | Статус | Комментарий |
|------|--------|--------|-------------|
| 3000 | pideh-armenia.neetrino.com | ✅ Занят | НЕ ТРОГАТЬ! |
| 3001 | wl.neetrino.com | ✅ Занят | НЕ ТРОГАТЬ! |
| 3002 | - | ❌ Свободен | Можно использовать |
| 3003 | - | ❌ Свободен | Можно использовать |
| 3004 | - | ❌ Свободен | Можно использовать |
| 5000 | bitrix24-google-contact-sync.neetrino.com | ✅ Занят | НЕ ТРОГАТЬ! |

### **⚠️ ПРАВИЛА НАЗНАЧЕНИЯ ПОРТОВ:**
1. **НЕ ИСПОЛЬЗУЙТЕ** порты 3000, 3001, 5000 (заняты)
2. **ИСПОЛЬЗУЙТЕ** порты 3002-3009 для новых Next.js проектов
3. **ИСПОЛЬЗУЙТЕ** порты 5001-5009 для новых Python проектов
4. **ВСЕГДА** проверяйте порт перед назначением
5. **ВСЕГДА** обновляйте таблицу портов после добавления сайта

### **🚀 ДОБАВЛЕНИЕ НОВОГО САЙТА НА СЕРВЕР:**

#### **ШАГ 1: ПРОВЕРКА СВОБОДНЫХ ПОРТОВ**
```bash
# 1. Подключиться к серверу
ssh hetzner

# 2. Проверить занятые порты
netstat -tlnp | grep LISTEN

# 3. Найти свободный порт (например, 3002)
netstat -tlnp | grep :3002
# Если ничего не выводится - порт свободен!
```

#### **ШАГ 2: СОЗДАНИЕ ПРОЕКТА**
```bash
# 1. Создать директорию
mkdir -p /var/www/НОВЫЙ_САЙТ.neetrino.com
cd /var/www/НОВЫЙ_САЙТ.neetrino.com

# 2. Загрузить код проекта
# (копирование файлов проекта)

# 3. Создать .env файл с правильным портом
cat > .env << 'EOF'
DATABASE_URL="postgresql://user:password@localhost:5432/database"
NEXTAUTH_URL="https://НОВЫЙ_САЙТ.neetrino.com"
NEXTAUTH_SECRET="secret-key"
NODE_ENV="production"
PORT=3002
EOF
```

#### **ШАГ 3: НАСТРОЙКА PM2**
```bash
# 1. Создать ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'НОВЫЙ_САЙТ',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/НОВЫЙ_САЙТ.neetrino.com',
    env: {
      NODE_ENV: 'production',
      PORT: 3002
    }
  }]
}
EOF

# 2. Запустить проект
pm2 start ecosystem.config.js
```

#### **ШАГ 4: НАСТРОЙКА NGINX**
```bash
# 1. Создать конфигурацию nginx
cat > /etc/nginx/sites-available/НОВЫЙ_САЙТ.neetrino.com << 'EOF'
server {
    server_name НОВЫЙ_САЙТ.neetrino.com www.НОВЫЙ_САЙТ.neetrino.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/НОВЫЙ_САЙТ.neetrino.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/НОВЫЙ_САЙТ.neetrino.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
EOF

# 2. Активировать сайт
ln -s /etc/nginx/sites-available/НОВЫЙ_САЙТ.neetrino.com /etc/nginx/sites-enabled/

# 3. Проверить и перезагрузить nginx
nginx -t
systemctl reload nginx
```

### **🚨 ТИПИЧНЫЕ ОШИБКИ С ПОРТАМИ:**

#### **❌ Ошибка 1: "address already in use"**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Причина:** Порт уже занят другим проектом
**Решение:**
```bash
# Проверить, кто использует порт
netstat -tlnp | grep :3000

# Выбрать свободный порт
netstat -tlnp | grep :3002

# Изменить порт в .env и ecosystem.config.js
PORT=3002
```

#### **❌ Ошибка 2: "502 Bad Gateway"**
**Причина:** nginx настроен на неправильный порт
**Решение:**
```bash
# Проверить конфигурацию nginx
grep "proxy_pass" /etc/nginx/sites-available/САЙТ.neetrino.com

# Исправить порт в nginx конфигурации
sed -i 's/localhost:3000/localhost:3002/g' /etc/nginx/sites-available/САЙТ.neetrino.com

# Перезагрузить nginx
systemctl reload nginx
```

#### **❌ Ошибка 3: Конфликт портов при обновлении**
**Причина:** Обновляемый проект пытается занять занятый порт
**Решение:**
```bash
# Остановить все проекты
pm2 stop all

# Запустить проекты по очереди с правильными портами
PORT=3000 pm2 start npm --name pideh-armenia -- start
PORT=3001 pm2 start npm --name wl-neetrino -- start
PORT=3002 pm2 start npm --name новый-сайт -- start
```

---

## 🔧 **ОСОБЫЕ СЛУЧАИ: PRISMA КЛИЕНТ**

### **🟡 КОГДА НУЖНО ГЕНЕРИРОВАТЬ PRISMA КЛИЕНТ:**
- ✅ **ВСЕГДА** после `npm install` (обновления зависимостей)
- ✅ **ВСЕГДА** после изменения `prisma/schema.prisma`
- ✅ **ВСЕГДА** после добавления новых моделей/полей
- ✅ **ВСЕГДА** после обновления Prisma версии
- ✅ **ВСЕГДА** при ошибке "@prisma/client did not initialize yet"

### **🔴 КОМАНДА ДЛЯ ГЕНЕРАЦИИ:**
```bash
npx prisma generate
```

### **⚠️ ВАЖНО:**
- Команда должна выполняться **ПОСЛЕ** `npm install`
- Команда должна выполняться **ДО** `npm run build`
- Если пропустить этот шаг - сборка упадет с ошибкой

---

## 🚨 **ТИПИЧНЫЕ ОШИБКИ И РЕШЕНИЯ**

### **❌ Ошибка 1: "Could not find a production build"**
**Причина:** Не удалили папку `.next` перед сборкой
**Решение:**
```bash
rm -rf .next
npm run build
```

### **❌ Ошибка 2: "@prisma/client did not initialize yet"**
**Причина:** Не сгенерировали Prisma клиент
**Решение:**
```bash
npx prisma generate
npm run build
```

### **❌ Ошибка 3: "Authentication failed against database"**
**Причина:** PM2 использует старые переменные окружения
**Решение:**
```bash
pm2 delete ПРАВИЛЬНЫЙ_ПРОЕКТ
PORT=3000 pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start
```

### **❌ Ошибка 4: API возвращает 500 ошибки**
**Причина:** Конфликт файлов `.env.local` с `.env`
**Решение:**
```bash
rm -f .env.local
pm2 restart ПРАВИЛЬНЫЙ_ПРОЕКТ
```

### **❌ Ошибка 5: "listen EADDRINUSE: address already in use"**
**Причина:** Неправильный порт в PM2
**Решение:**
```bash
pm2 delete ПРАВИЛЬНЫЙ_ПРОЕКТ
PORT=3000 pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start
```

---

## 🚀 **ПРАВИЛЬНАЯ ИНСТРУКЦИЯ ОБНОВЛЕНИЯ ПРОЕКТА**

### **ШАГ 1: ПОДГОТОВКА (ОБЯЗАТЕЛЬНО)**
```bash
# 1. Подключиться к серверу
ssh hetzner

# 2. Найти ПРАВИЛЬНЫЙ проект
pm2 list
ls -la /var/www/

# 3. Перейти в директорию проекта
cd /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ

# 4. Создать резервную копию
cp -r /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ.backup-$(date +%Y%m%d-%H%M%S)
```

### **ШАГ 2: ПРОВЕРКА ТЕКУЩЕГО СОСТОЯНИЯ**
```bash
# Проверить файлы окружения
ls -la .env*
cat .env
cat .env.local  # Если есть - это проблема!

# Проверить Git статус
git status
git log --oneline -3

# Проверить PM2 процессы
pm2 list
```

### **ШАГ 3: ОЧИСТКА КОНФЛИКТУЮЩИХ ФАЙЛОВ**
```bash
# Удалить конфликтующие файлы
rm -f .env.local
rm -f .env.development
rm -f .env.test

# Оставить только нужные файлы
ls -la .env*
# Должен остаться только .env
```

### **ШАГ 4: ОБНОВЛЕНИЕ КОДА**
```bash
# Остановить проект
pm2 stop ПРАВИЛЬНЫЙ_ПРОЕКТ

# Обновить код
git pull origin main

# Удалить конфликтующие файлы (КРИТИЧЕСКИ ВАЖНО!)
rm -f .env.local .env.development .env.test

# Установить зависимости
npm install

# Сгенерировать Prisma клиент (КРИТИЧЕСКИ ВАЖНО!)
npx prisma generate
```

### **ШАГ 5: ОБНОВЛЕНИЕ БАЗЫ ДАННЫХ**
```bash
# Применить миграции
npx prisma db push

# Заполнить тестовыми данными (если нужно)
npm run db:seed
```

### **ШАГ 6: ПЕРЕСБОРКА И ЗАПУСК**
```bash
# Удалить кэш Next.js (ВАЖНО!)
rm -rf .next

# Пересобрать проект
npm run build

# Полностью пересоздать процесс PM2 (ВАЖНО!)
pm2 delete ПРАВИЛЬНЫЙ_ПРОЕКТ
PORT=3000 pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start

# Проверить статус
pm2 status
```

### **ШАГ 7: ПРОВЕРКА РАБОТОСПОСОБНОСТИ**
```bash
# Проверить API
curl -s http://localhost:3004/api/products | head -5

# Проверить главную страницу
curl -I http://localhost:3004

# Проверить логи
pm2 logs ПРАВИЛЬНЫЙ_ПРОЕКТ --lines 5
```

---

## 🔍 **ПРИМЕРЫ ПРОБЛЕМ И ИХ РЕШЕНИЯ**

### **ПРОБЛЕМА 1: Конфликт файлов .env**
**Что происходит:**
```bash
# На сервере есть 2 файла:
.env          # Продакшн настройки (правильные)
.env.local    # Локальные настройки (старые, неправильные)

# Next.js читает файлы в таком порядке:
# 1. .env.local (приоритет!)
# 2. .env
# 3. .env.production
```

**Симптомы:**
- API возвращает ошибки 500
- Неправильная база данных
- Неправильный порт

**Решение:**
```bash
# Удалить конфликтующий файл
rm -f .env.local

# Перезапустить проект
pm2 restart ПРАВИЛЬНЫЙ_ПРОЕКТ
```

### **ПРОБЛЕМА 2: PM2 кэширование переменных окружения**
**Что происходит:**
```bash
# PM2 запустился с одними переменными окружения
# При изменении .env файла PM2 НЕ перечитал новые переменные
# PM2 продолжает использовать старые кэшированные настройки
```

**Симптомы:**
- Логи показывают старые переменные окружения
- API не работает
- Неправильная база данных

**Решение:**
```bash
# Полностью пересоздать процесс PM2
pm2 delete ПРАВИЛЬНЫЙ_ПРОЕКТ
pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start

# Или принудительно обновить переменные
pm2 restart ПРАВИЛЬНЫЙ_ПРОЕКТ --update-env
```

### **ПРОБЛЕМА 3: Next.js кэширование переменных окружения**
**Что происходит:**
```bash
# Next.js собрал проект с одними переменными окружения
# Переменные "зашились" в собранные файлы в папке .next
# При изменении .env файла кэш не обновился
```

**Симптомы:**
- API не работает после изменения .env
- Неправильные настройки в приложении
- Ошибки подключения к базе данных

**Решение:**
```bash
# Удалить кэш и пересобрать
rm -rf .next
npm run build
pm2 restart ПРАВИЛЬНЫЙ_ПРОЕКТ
```

### **ПРОБЛЕМА 4: Конфликт портов**
**Что происходит:**
```bash
# Приложение пытается запуститься на порту 3000
# Но в .env указан порт 3004
# PM2 не читает переменные окружения из .env
```

**Симптомы:**
- Ошибка: `Error: listen EADDRINUSE: address already in use :::3000`
- Приложение не запускается

**Решение:**
```bash
# Явно указать порт при запуске
PORT=3004 pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start
```

### **ПРОБЛЕМА 5: Неправильный пользователь базы данных**
**Что происходит:**
```bash
# В .env указан пользователь wl_user
# Но в логах показывается пользователь user
# PM2 использует старые переменные окружения
```

**Симптомы:**
- Ошибка: `Authentication failed against database server, the provided database credentials for user are not valid`
- API не работает

**Решение:**
```bash
# Создать правильного пользователя БД
sudo -u postgres psql -c "CREATE USER wl_user WITH PASSWORD 'Neetrino2024!';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE wl_neetrino_com TO wl_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON SCHEMA public TO wl_user;"

# Пересоздать процесс PM2
pm2 delete ПРАВИЛЬНЫЙ_ПРОЕКТ
pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start
```

---

## 🚨 **ЧТО ДЕЛАТЬ, ЕСЛИ СЛУЧАЙНО ВОЗНИКЛА ПРОБЛЕМА**

### **ШАГ 1: НЕ ПАНИКУЙТЕ!**
- У вас есть резервная копия
- Проблемы решаемы
- Следуйте инструкции ниже

### **ШАГ 2: ОПРЕДЕЛИТЕ ТИП ПРОБЛЕМЫ**
```bash
# Проверить логи PM2
pm2 logs ПРАВИЛЬНЫЙ_ПРОЕКТ --lines 20

# Проверить статус PM2
pm2 status

# Проверить переменные окружения
cat .env
```

### **ШАГ 3: ПРИМЕНИТЕ ПРАВИЛЬНОЕ РЕШЕНИЕ**

**Если проблема с .env файлами:**
```bash
rm -f .env.local
pm2 restart ПРАВИЛЬНЫЙ_ПРОЕКТ
```

**Если проблема с кэшированием PM2:**
```bash
pm2 delete ПРАВИЛЬНЫЙ_ПРОЕКТ
pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start
```

**Если проблема с кэшированием Next.js:**
```bash
rm -rf .next
npm run build
pm2 restart ПРАВИЛЬНЫЙ_ПРОЕКТ
```

**Если проблема с портами:**
```bash
pm2 delete ПРАВИЛЬНЫЙ_ПРОЕКТ
PORT=3004 pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start
```

### **ШАГ 4: ПРОВЕРЬТЕ РЕЗУЛЬТАТ**
```bash
# Проверить API
curl -s http://localhost:3004/api/products | head -5

# Проверить главную страницу
curl -I http://localhost:3004

# Проверить логи
pm2 logs ПРАВИЛЬНЫЙ_ПРОЕКТ --lines 5
```

### **ШАГ 5: ЕСЛИ НИЧЕГО НЕ ПОМОГАЕТ**
```bash
# Восстановить из резервной копии
pm2 stop ПРАВИЛЬНЫЙ_ПРОЕКТ
rm -rf /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ
cp -r /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ.backup-* /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ
cd /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ
pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start
```

---

## ⚠️ **ОСНОВНЫЕ ОШИБКИ И ИХ РЕШЕНИЯ**

### **Ошибка 1: Конфликт портов**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Причина:** Порт уже занят другим проектом
**Решение:** 
```bash
# Проверить занятые порты
netstat -tlnp | grep LISTEN

# Выбрать свободный порт
netstat -tlnp | grep :3002

# Запустить с правильным портом
PORT=3002 pm2 start npm --name ПРОЕКТ -- start
```

### **Ошибка 2: Переменные окружения не загружаются**
```
DATABASE_URL: undefined
```
**Решение:** Использовать ecosystem.config.js для PM2 с явным указанием переменных

### **Ошибка 3: Проблемы с SSL сертификатом**
```
502 Bad Gateway
```
**Решение:** Правильная конфигурация nginx для статических файлов

### **Ошибка 4: Проблемы с подключением к базе данных**
```
Authentication failed against database server
```
**Решение:** Экранирование специальных символов в строке подключения

### **Ошибка 5: Конфликт файлов .env**
```
.env.local переопределяет .env
```
**Проблема:** Файл `.env.local` имеет приоритет над `.env` и может содержать старые настройки
**Решение:** 
```bash
# Удалить конфликтующий файл
rm .env.local

# Перезапустить проект
pm2 restart ПРАВИЛЬНЫЙ_ПРОЕКТ
```

### **Ошибка 6: PM2 не обновляет переменные окружения**
```
PM2 кэширует старые переменные окружения
```
**Проблема:** PM2 не перечитывает `.env` файл после изменений
**Решение:**
```bash
# Полностью пересоздать процесс PM2
pm2 delete ПРАВИЛЬНЫЙ_ПРОЕКТ
pm2 start ecosystem.config.js

# Или принудительно обновить переменные
pm2 restart ПРАВИЛЬНЫЙ_ПРОЕКТ --update-env
```

### **Ошибка 7: Next.js кэширует переменные окружения**
```
Next.js не видит изменения в .env файле
```
**Проблема:** Next.js кэширует переменные окружения во время сборки
**Решение:**
```bash
# Удалить кэш и пересобрать
rm -rf .next
npm run build
pm2 restart ПРАВИЛЬНЫЙ_ПРОЕКТ
```

---

## 📋 **РЕАЛЬНЫЕ ПРОБЛЕМЫ ПРИ ОБНОВЛЕНИИ (ИЗ ОПЫТА)**

### **Проблема 1: Неправильная идентификация проекта**
**Что произошло:** Сначала был найден проект `pideh-armenia`, но нужно было обновить `wl-neetrino`
**Решение:** Всегда проверять точное название проекта, указанное пользователем

### **Проблема 2: Конфликт файлов .env**
**Что произошло:** Файл `.env.local` переопределял настройки из `.env`
```bash
# .env.local содержал:
DATABASE_URL="postgresql://user:@localhost:5432/online_shop_dev"

# .env содержал:
DATABASE_URL="postgresql://wl_user:Neetrino2024!@localhost:5432/wl_neetrino_com?schema=public"
```
**Решение:** Удалить `.env.local` файл

### **Проблема 3: PM2 не обновлял переменные окружения**
**Что произошло:** PM2 кэшировал старые переменные окружения
**Решение:** Полностью пересоздать процесс PM2

### **Проблема 4: Next.js кэшировал переменные окружения**
**Что произошло:** Next.js не видел изменения в `.env` файле после сборки
**Решение:** Удалить папку `.next` и пересобрать проект

### **Проблема 5: Неправильный пользователь базы данных**
**Что произошло:** В логах показывался пользователь `user` вместо `wl_user`
**Решение:** Создать правильного пользователя БД и дать ему права

### **Проблема 6: Конфликт портов**
**Что произошло:** Приложение пыталось запуститься на порту 3000 вместо 3004
**Решение:** Явно указать порт при запуске PM2

---

## 🔄 **ПРАВИЛЬНАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ ОБНОВЛЕНИЯ**

### **1. Подготовка (ОБЯЗАТЕЛЬНО)**
```bash
# 1. Подключиться к серверу
ssh hetzner

# 2. Найти правильный проект
pm2 list
ls -la /var/www/

# 3. Перейти в директорию ПРАВИЛЬНОГО проекта
cd /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ

# 4. Создать резервную копию
cp -r /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ /var/www/ПРАВИЛЬНЫЙ_ПРОЕКТ.backup-$(date +%Y%m%d-%H%M%S)
```

### **2. Проверка текущего состояния**
```bash
# Проверить статус Git
git status
git log --oneline -3

# Проверить переменные окружения
cat .env
ls -la .env*

# Проверить процессы PM2
pm2 list
```

### **3. Обновление кода**
```bash
# Остановить проект
pm2 stop ПРАВИЛЬНЫЙ_ПРОЕКТ

# Обновить код
git pull origin main

# Удалить конфликтующие файлы
rm -f .env.local

# Установить зависимости
npm install
```

### **4. Настройка базы данных**
```bash
# Применить миграции
npx prisma db push

# Заполнить тестовыми данными (если нужно)
npm run db:seed
```

### **5. Пересборка и запуск**
```bash
# Удалить кэш Next.js
rm -rf .next

# Пересобрать проект
npm run build

# Запустить с правильным портом
PORT=3004 pm2 start npm --name ПРАВИЛЬНЫЙ_ПРОЕКТ -- start

# Проверить статус
pm2 status
```

### **6. Проверка работоспособности**
```bash
# Проверить API
curl -s http://localhost:3004/api/products | head -5

# Проверить главную страницу
curl -I http://localhost:3004

# Проверить логи
pm2 logs ПРАВИЛЬНЫЙ_ПРОЕКТ --lines 5
```

---

## ✅ **ЧЕК-ЛИСТ ДЛЯ БЕЗОПАСНОГО ОБНОВЛЕНИЯ**

### **Перед началом:**
- [ ] Убедиться, что обновляете ПРАВИЛЬНЫЙ проект
- [ ] Проверить, что НЕ трогаете другие проекты
- [ ] Создать резервную копию текущей версии
- [ ] Проверить текущее состояние проекта
- [ ] Проверить занятые порты на сервере
- [ ] Убедиться, что используете правильный порт

### **Во время обновления:**
- [ ] Остановить проект через PM2
- [ ] Обновить код через Git
- [ ] Удалить конфликтующие файлы (.env.local)
- [ ] Установить зависимости
- [ ] Применить миграции БД
- [ ] Удалить кэш Next.js (.next)
- [ ] Пересобрать проект
- [ ] Запустить с правильным портом

### **После обновления:**
- [ ] Проверить статус PM2
- [ ] Проверить API (возвращает данные)
- [ ] Проверить главную страницу (HTTP 200)
- [ ] Проверить логи (нет ошибок)
- [ ] Убедиться, что сайт работает

### **В случае проблем:**
- [ ] Проверить логи PM2
- [ ] Проверить переменные окружения
- [ ] Проверить подключение к БД
- [ ] Восстановить из резервной копии при необходимости

---

## 🚀 **ПОШАГОВАЯ ИНСТРУКЦИЯ**

### **1. Подготовка сервера**

```bash
# Подключение к серверу
ssh hetzner

# Проверка состояния сервера
uname -a && df -h && free -h

# Проверка установленных сервисов
systemctl status postgresql nginx

# Проверка занятых портов
netstat -tlnp | grep LISTEN
```

### **2. Создание директории проекта**

```bash
# Создание директории
mkdir -p /var/www/wl.neetrino.com
chown -R www-data:www-data /var/www/wl.neetrino.com
```

### **3. Загрузка проекта на сервер**

**На локальной машине:**
```bash
# Создание архива (исключая ненужные файлы)
cd /Users/user/AI-Projects
tar --exclude='wl/node_modules' --exclude='wl/.git' --exclude='wl/.next' --exclude='wl/*.log' -czf wl-project.tar.gz wl/

# Загрузка на сервер
scp wl-project.tar.gz hetzner:/var/www/wl.neetrino.com/
```

**На сервере:**
```bash
# Распаковка архива
cd /var/www/wl.neetrino.com
tar -xzf wl-project.tar.gz --strip-components=1
rm wl-project.tar.gz
```

### **4. Создание базы данных**

```bash
# Создание базы данных
sudo -u postgres createdb wl_neetrino_com

# Установка пароля для пользователя postgres
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'Neetrino2024!';"
```

### **5. Настройка переменных окружения**

```bash
# Создание .env файла
cat > .env << 'EOF'
# Database
DATABASE_URL="postgresql://postgres:Neetrino2024%21@localhost:5432/wl_neetrino_com?schema=public"

# NextAuth
NEXTAUTH_URL="https://wl.neetrino.com"
NEXTAUTH_SECRET="wl-neetrino-secret-key-2024"

# App
NODE_ENV="production"
PORT=3004
EOF
```

**⚠️ ВАЖНО:** Символ `!` в пароле должен быть экранирован как `%21`

### **6. Установка зависимостей и сборка**

```bash
# Установка зависимостей
npm install

# Применение миграций
npx prisma migrate deploy

# Заполнение тестовыми данными
npm run db:seed

# Сборка проекта
npm run build
```

### **7. Настройка PM2**

```bash
# Создание ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'wl-neetrino',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/wl.neetrino.com',
    env: {
      NODE_ENV: 'production',
      PORT: 3004,
      DATABASE_URL: 'postgresql://postgres:Neetrino2024%21@localhost:5432/wl_neetrino_com?schema=public',
      NEXTAUTH_URL: 'https://wl.neetrino.com',
      NEXTAUTH_SECRET: 'wl-neetrino-secret-key-2024'
    }
  }]
};
EOF

# Запуск проекта
pm2 start ecosystem.config.js

# Настройка автозапуска
pm2 save
pm2 startup
```

### **8. Настройка Nginx**

```bash
# Создание конфигурации nginx
cat > /etc/nginx/sites-available/wl.neetrino.com << 'EOF'
server {
    server_name wl.neetrino.com www.wl.neetrino.com;

    # Статические файлы Next.js
    location /_next/static/ {
        proxy_pass http://localhost:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Кэширование статических файлов
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API роуты
    location /api/ {
        proxy_pass http://localhost:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Основное приложение
    location / {
        proxy_pass http://localhost:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Логи
    access_log /var/log/nginx/wl.neetrino.com.access.log;
    error_log /var/log/nginx/wl.neetrino.com.error.log;

    # Безопасность
    location ~ /\. {
        deny all;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/wl.neetrino.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/wl.neetrino.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = wl.neetrino.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name wl.neetrino.com www.wl.neetrino.com;
    listen 80;
    return 404; # managed by Certbot
}
EOF

# Проверка и перезагрузка nginx
nginx -t
systemctl reload nginx
```

### **9. Настройка SSL (если нужно)**

```bash
# Установка SSL сертификата
certbot --nginx -d wl.neetrino.com -d www.wl.neetrino.com
```

---

## 🔧 **ПРОВЕРКА РАБОТЫ**

### **1. Проверка статуса сервисов**

```bash
# Статус PM2
pm2 status

# Статус nginx
systemctl status nginx

# Статус PostgreSQL
systemctl status postgresql
```

### **2. Проверка API**

```bash
# Проверка API продуктов
curl -s https://wl.neetrino.com/api/products | head -5

# Проверка главной страницы
curl -I https://wl.neetrino.com
```

### **3. Проверка базы данных**

```bash
# Подключение к базе данных
PGPASSWORD='Neetrino2024!' psql -h localhost -p 5432 -U postgres -d wl_neetrino_com -c 'SELECT COUNT(*) FROM products;'
```

---

## 🚨 **ТИПИЧНЫЕ ПРОБЛЕМЫ И РЕШЕНИЯ**

### **Проблема: Проект не запускается**
```bash
# Проверка логов
pm2 logs wl-neetrino --lines 20

# Перезапуск с правильным портом
pm2 delete wl-neetrino
PORT=3004 pm2 start npm --name 'wl-neetrino' -- start
```

### **Проблема: API возвращает ошибки 500**
```bash
# Проверка подключения к базе данных
cd /var/www/wl.neetrino.com
npx prisma db push

# Перезапуск с правильными переменными окружения
pm2 delete wl-neetrino
pm2 start ecosystem.config.js
```

### **Проблема: Статические файлы не загружаются**
```bash
# Проверка конфигурации nginx
nginx -t

# Перезагрузка nginx
systemctl reload nginx
```

### **Проблема: База данных пустая**
```bash
# Заполнение тестовыми данными
npm run db:seed
```

---

## 📊 **ФИНАЛЬНАЯ ПРОВЕРКА**

### **1. Все сервисы работают**
- ✅ PM2: `pm2 status` - все процессы online
- ✅ Nginx: `systemctl status nginx` - active
- ✅ PostgreSQL: `systemctl status postgresql` - active

### **2. Сайт доступен**
- ✅ Главная страница: `curl -I https://wl.neetrino.com` - HTTP 200
- ✅ API работает: `curl https://wl.neetrino.com/api/products` - возвращает данные
- ✅ SSL работает: зеленый замок в браузере

### **3. База данных содержит данные**
- ✅ Продукты: 34 записи
- ✅ Категории: 5 записей
- ✅ Пользователи: тестовые данные

---

## 🎯 **ИТОГОВАЯ КОНФИГУРАЦИЯ**

### **Файлы конфигурации:**

1. **ecosystem.config.js** - конфигурация PM2
2. **.env** - переменные окружения
3. **/etc/nginx/sites-available/wl.neetrino.com** - конфигурация nginx

### **Порты:**
- **3004** - Next.js приложение
- **5432** - PostgreSQL
- **80/443** - Nginx (HTTP/HTTPS)

### **Домены:**
- **wl.neetrino.com** - основной домен
- **www.wl.neetrino.com** - с www

---

## 🚀 **РЕЗУЛЬТАТ**

После выполнения всех шагов у вас будет:
- ✅ Рабочий сайт на https://wl.neetrino.com
- ✅ API с 34 продуктами
- ✅ База данных PostgreSQL
- ✅ SSL сертификат
- ✅ Автозапуск при перезагрузке сервера
- ✅ Мониторинг через PM2

**Сайт полностью готов к использованию!** 🎉

---

## 🚨 **ВАЖНЫЕ ЗАМЕЧАНИЯ ДЛЯ БУДУЩИХ ОБНОВЛЕНИЙ**

### **1. БЕЗОПАСНОСТЬ ПРЕВЫШЕ ВСЕГО**
- **НИКОГДА не обновляйте проект, не убедившись, что это ПРАВИЛЬНЫЙ проект**
- **ВСЕГДА создавайте резервные копии перед любыми изменениями**
- **НЕ ТРОГАЙТЕ другие проекты, порты и базы данных**

### **2. ТИПИЧНЫЕ ОШИБКИ, КОТОРЫЕ МОЖНО ИЗБЕЖАТЬ**
- **Конфликт .env файлов** - всегда проверяйте наличие .env.local
- **Кэширование переменных** - всегда удаляйте .next и пересобирайте
- **PM2 кэширование** - всегда пересоздавайте процесс PM2
- **Неправильный порт** - всегда явно указывайте порт при запуске

### **3. ПОСЛЕДОВАТЕЛЬНОСТЬ ДЕЙСТВИЙ**
1. **Подготовка** → Проверка проекта → Резервная копия
2. **Обновление** → Git pull → Удаление конфликтов → npm install
3. **База данных** → Миграции → Тестовые данные
4. **Сборка** → Удаление кэша → npm run build
5. **Запуск** → PM2 с правильным портом
6. **Проверка** → API → Страницы → Логи

### **4. ЕСЛИ ЧТО-ТО ПОШЛО НЕ ТАК**
- **НЕ ПАНИКУЙТЕ** - у вас есть резервная копия
- **Проверьте логи** - они покажут точную причину проблемы
- **Восстановите из резервной копии** - это быстрее, чем исправлять ошибки
- **Следуйте чек-листу** - не пропускайте шаги

### **5. ПРОФИЛАКТИКА ПРОБЛЕМ**
- **Регулярно проверяйте** состояние проектов на сервере
- **Ведите документацию** изменений
- **Тестируйте обновления** на тестовом сервере
- **Используйте версионный контроль** для всех конфигураций

**Помните: лучше потратить 5 минут на проверку, чем 5 часов на исправление ошибок!** ⚠️

---

## ✅ **ФИНАЛЬНЫЙ ЧЕК-ЛИСТ**

### **Перед обновлением:**
- [ ] Убедиться, что обновляете ПРАВИЛЬНЫЙ проект
- [ ] Создать резервную копию
- [ ] Проверить текущее состояние проекта
- [ ] Проверить занятые порты на сервере
- [ ] Убедиться, что используете правильный порт

### **Во время обновления:**
- [ ] Остановить PM2 процесс
- [ ] Обновить код через Git
- [ ] Удалить конфликтующие файлы (.env.local)
- [ ] Установить зависимости (npm install)
- [ ] Сгенерировать Prisma клиент (npx prisma generate)
- [ ] Удалить кэш Next.js (rm -rf .next)
- [ ] Пересобрать проект (npm run build)
- [ ] Пересоздать PM2 процесс с правильным портом

### **После обновления:**
- [ ] Проверить статус PM2 (pm2 status)
- [ ] Проверить API (curl API endpoint)
- [ ] Проверить главную страницу (HTTP 200)
- [ ] Проверить логи (pm2 logs)
- [ ] Убедиться, что сайт работает в браузере

### **В случае проблем:**
- [ ] Проверить логи PM2
- [ ] Проверить переменные окружения
- [ ] Проверить подключение к БД
- [ ] Восстановить из резервной копии при необходимости

---

## 🎯 **ИТОГОВЫЕ РЕКОМЕНДАЦИИ**

1. **ВСЕГДА следуйте последовательности** - не пропускайте шаги
2. **ВСЕГДА проверяйте каждый шаг** - не переходите к следующему без проверки
3. **ВСЕГДА создавайте резервные копии** - это сэкономит время при проблемах
4. **ВСЕГДА генерируйте Prisma клиент** - это критически важно
5. **ВСЕГДА пересоздавайте PM2 процесс** - не используйте просто restart
6. **ВСЕГДА проверяйте занятые порты** - избегайте конфликтов портов
7. **НИКОГДА не используйте занятые порты** - это сломает другие проекты

**Следуя этой инструкции, вы сможете обновлять проекты без проблем с первого раза!** 🚀
