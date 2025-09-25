# 📋 Полная инструкция по развертыванию проекта wl.neetrino.com на сервере

## 🎯 **Цель**
Развернуть Next.js проект с базой данных PostgreSQL на сервере Hetzner с доменом wl.neetrino.com

---

## ⚠️ **ОСНОВНЫЕ ОШИБКИ И ИХ РЕШЕНИЯ**

### **Ошибка 1: Конфликт портов**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Решение:** Всегда указывать порт явно: `PORT=3004 pm2 start npm -- start`

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
