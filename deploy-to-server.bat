@echo off
echo Подключение к серверу и выполнение деплоя...

REM Подключение к серверу и выполнение команд
ssh root@46.224.27.19 "cd /root && chmod +x deploy.sh && ./deploy.sh"

echo Деплой завершен!
pause
