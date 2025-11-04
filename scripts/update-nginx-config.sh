#!/bin/bash

# Скрипт для обновления конфигурации Nginx после git pull
# Запускать на сервере после git pull

echo "🔧 Обновляем конфигурацию Nginx..."

# Обновить конфигурацию
cat > /etc/nginx/sites-available/welcomebaby.neetrino.com << 'EOF'
server {
    listen 443 ssl http2;
    server_name welcomebaby.neetrino.com www.welcomebaby.neetrino.com;

    ssl_certificate /etc/letsencrypt/live/welcomebaby.neetrino.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/welcomebaby.neetrino.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    access_log /var/log/nginx/welcomebaby.neetrino.com.access.log;
    error_log /var/log/nginx/welcomebaby.neetrino.com.error.log;

    # КРИТИЧНО: Статические файлы Next.js
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp|woff|woff2|ttf|eot|css|js)$ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Активировать и перезагрузить
ln -sf /etc/nginx/sites-available/welcomebaby.neetrino.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

echo "✅ Nginx обновлен!"

