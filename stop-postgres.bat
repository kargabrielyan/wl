@echo off
echo Stopping PostgreSQL...

REM Остановить контейнер
docker stop postgres-local

REM Удалить контейнер
docker rm postgres-local

echo PostgreSQL остановлен и удален.

