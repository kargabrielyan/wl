#!/bin/bash

# Скрипт для деплоя проекта на сервер
# Использование: ./deploy.sh

set -e  # Остановить при ошибке

echo "🚀 Начинаем деплой проекта..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Проверка, что мы на сервере
if [ ! -f "/etc/os-release" ]; then
    error "Этот скрипт должен запускаться на сервере"
fi

# Проверка, что мы в правильной директории
if [ ! -f "package.json" ]; then
    error "package.json не найден. Запустите скрипт из корня проекта"
fi

# Проверка занятых портов
log "Проверяем занятые порты..."
OCCUPIED_PORTS=$(netstat -tlnp | grep -E ':(3000|3001|3002|3003|3004|3005|3006|3007|3008|3009|3010)' | awk '{print $4}' | cut -d: -f2 | sort -n)
if [ ! -z "$OCCUPIED_PORTS" ]; then
    warn "Занятые порты: $OCCUPIED_PORTS"
fi

# Выбор свободного порта
PORT=3004
while netstat -tlnp | grep -q ":$PORT "; do
    PORT=$((PORT + 1))
done

log "Используем порт: $PORT"

# Создание резервной копии (если проект уже существует)
if [ -d "/var/www/wl.neetrino.com" ]; then
    log "Создаем резервную копию существующего проекта..."
    cp -r /var/www/wl.neetrino.com /var/www/wl.neetrino.com.backup-$(date +%Y%m%d-%H%M%S)
fi

# Создание директории проекта
log "Создаем директорию проекта..."
mkdir -p /var/www/wl.neetrino.com
cd /var/www/wl.neetrino.com

# Остановка PM2 процесса (если существует)
if pm2 list | grep -q "wl-neetrino"; then
    log "Останавливаем существующий PM2 процесс..."
    pm2 stop wl-neetrino || true
    pm2 delete wl-neetrino || true
fi

# Копирование файлов проекта
log "Копируем файлы проекта..."
# Предполагаем, что архив уже загружен на сервер
if [ -f "project.tar.gz" ]; then
    tar -xzf project.tar.gz --strip-components=1
    rm project.tar.gz
else
    error "Файл project.tar.gz не найден. Загрузите архив на сервер"
fi

# Создание .env файла
log "Создаем .env файл..."
cat > .env << EOF
# Production Environment Variables
NODE_ENV=production

# Database
DATABASE_URL="postgresql://postgres:Neetrino2024!@localhost:5432/wl_neetrino_com?schema=public"

# NextAuth
NEXTAUTH_URL="https://wl.neetrino.com"
NEXTAUTH_SECRET="wl-neetrino-secret-key-2024-production-32-chars"

# App Configuration
NEXT_PUBLIC_API_URL="https://wl.neetrino.com/api"
NEXT_PUBLIC_SITE_URL="https://wl.neetrino.com"

# Port для PM2
PORT=$PORT
EOF

# Удаление конфликтующих файлов
log "Удаляем конфликтующие файлы..."
rm -f .env.local .env.development .env.test

# Установка зависимостей
log "Устанавливаем зависимости..."
npm install

# Генерация Prisma клиента
log "Генерируем Prisma клиент..."
npx prisma generate

# Применение миграций
log "Применяем миграции базы данных..."
npx prisma db push

# Заполнение тестовыми данными
log "Заполняем базу данных тестовыми данными..."
npm run db:seed || warn "Не удалось заполнить тестовыми данными"

# Удаление кэша Next.js
log "Удаляем кэш Next.js..."
rm -rf .next

# Сборка проекта
log "Собираем проект..."
npm run build

# Создание ecosystem.config.js для PM2
log "Создаем конфигурацию PM2..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'wl-neetrino',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/wl.neetrino.com',
    env: {
      NODE_ENV: 'production',
      PORT: $PORT,
      DATABASE_URL: 'postgresql://postgres:Neetrino2024!@localhost:5432/wl_neetrino_com?schema=public',
      NEXTAUTH_URL: 'https://wl.neetrino.com',
      NEXTAUTH_SECRET: 'wl-neetrino-secret-key-2024-production-32-chars',
      NEXT_PUBLIC_API_URL: 'https://wl.neetrino.com/api',
      NEXT_PUBLIC_SITE_URL: 'https://wl.neetrino.com'
    }
  }]
};
EOF

# Запуск проекта через PM2
log "Запускаем проект через PM2..."
pm2 start ecosystem.config.js

# Настройка автозапуска
log "Настраиваем автозапуск..."
pm2 save
pm2 startup || warn "Не удалось настроить автозапуск (требуются права root)"

# Проверка статуса
log "Проверяем статус проекта..."
sleep 5
pm2 status

# Проверка API
log "Проверяем API..."
if curl -s "http://localhost:$PORT/api/products" | head -1 | grep -q "data"; then
    log "✅ API работает корректно"
else
    warn "⚠️ API может работать некорректно"
fi

# Проверка главной страницы
log "Проверяем главную страницу..."
if curl -I "http://localhost:$PORT" | grep -q "200 OK"; then
    log "✅ Главная страница работает"
else
    warn "⚠️ Главная страница может работать некорректно"
fi

log "🎉 Деплой завершен!"
log "Проект доступен на порту: $PORT"
log "Для настройки Nginx используйте порт: $PORT"
log "Для проверки логов: pm2 logs wl-neetrino"
