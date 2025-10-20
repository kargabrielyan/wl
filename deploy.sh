#!/bin/bash

# Скрипт деплоя для Hetzner сервера
# Использование: ./deploy.sh YOUR_SERVER_IP

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Проверяем аргументы
if [ $# -eq 0 ]; then
    echo -e "${RED}Ошибка: Укажи IP адрес сервера${NC}"
    echo "Использование: ./deploy.sh YOUR_SERVER_IP"
    exit 1
fi

SERVER_IP=$1
SSH_KEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAAIFnPVQK/ntzK6Xzcvg5SqjGbOQRNVmkZr01d15BVK2L hetzner"

echo -e "${GREEN}🚀 Начинаем деплой на сервер $SERVER_IP${NC}"

# Функция для выполнения команд на сервере
run_remote() {
    ssh -o StrictHostKeyChecking=no root@$SERVER_IP "$1"
}

# Функция для копирования файлов на сервер
copy_to_server() {
    scp -o StrictHostKeyChecking=no $1 root@$SERVER_IP:$2
}

echo -e "${YELLOW}📋 Шаг 1: Подготовка сервера${NC}"

# Обновляем систему
run_remote "apt update && apt upgrade -y"

# Устанавливаем Docker
run_remote "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh && rm get-docker.sh"

# Устанавливаем Docker Compose
run_remote "curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose"

# Устанавливаем Nginx
run_remote "apt install nginx -y"

# Устанавливаем Certbot для SSL
run_remote "apt install certbot python3-certbot-nginx -y"

echo -e "${YELLOW}📋 Шаг 2: Создание SSL сертификата для IP${NC}"

# Создаем самоподписанный SSL сертификат для IP
run_remote "mkdir -p /etc/nginx/ssl"

# Генерируем самоподписанный сертификат
run_remote "openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/key.pem \
    -out /etc/nginx/ssl/cert.pem \
    -subj '/C=AM/ST=Yerevan/L=Yerevan/O=Witleybel/OU=IT/CN=$SERVER_IP'"

echo -e "${YELLOW}📋 Шаг 3: Создание директории проекта${NC}"

# Создаем директорию для проекта
run_remote "mkdir -p /var/www/witleybel && cd /var/www/witleybel"

echo -e "${YELLOW}📋 Шаг 4: Клонирование репозитория${NC}"

# Клонируем репозиторий
run_remote "cd /var/www/witleybel && git clone https://github.com/kargabrielyan/wl.git ."

echo -e "${YELLOW}📋 Шаг 5: Настройка переменных окружения${NC}"

# Создаем .env файл
run_remote "cat > /var/www/witleybel/.env << 'EOF'
NODE_ENV=production
DATABASE_URL=\"postgresql://postgres:witleybel_secure_2024@postgres:5432/witleybel_production\"
NEXTAUTH_URL=\"https://$SERVER_IP\"
NEXTAUTH_SECRET=\"witleybel_super_secret_key_2024_very_long_string\"
DB_PASSWORD=\"witleybel_secure_2024\"
NEXT_PUBLIC_API_URL=\"https://$SERVER_IP/api\"
EOF"

echo -e "${YELLOW}📋 Шаг 6: Копирование конфигурационных файлов${NC}"

# Копируем файлы конфигурации
copy_to_server "docker-compose.prod.yml" "/var/www/witleybel/docker-compose.yml"
copy_to_server "nginx.conf" "/var/www/witleybel/nginx.conf"

echo -e "${YELLOW}📋 Шаг 7: Запуск приложения${NC}"

# Запускаем приложение
run_remote "cd /var/www/witleybel && docker compose up -d"

echo -e "${YELLOW}📋 Шаг 8: Ожидание запуска сервисов${NC}"

# Ждем запуска сервисов
sleep 30

echo -e "${YELLOW}📋 Шаг 9: Проверка статуса${NC}"

# Проверяем статус контейнеров
run_remote "cd /var/www/witleybel && docker compose ps"

# Проверяем логи
run_remote "cd /var/www/witleybel && docker compose logs --tail=20"

echo -e "${GREEN}✅ Деплой завершен!${NC}"
echo -e "${GREEN}🌐 Твой сайт доступен по адресу: https://$SERVER_IP${NC}"
echo -e "${YELLOW}📝 Для проверки логов: ssh root@$SERVER_IP 'cd /var/www/witleybel && docker compose logs -f'${NC}"
echo -e "${YELLOW}📝 Для перезапуска: ssh root@$SERVER_IP 'cd /var/www/witleybel && docker compose restart'${NC}"







