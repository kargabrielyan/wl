@echo off
echo Starting PostgreSQL in Docker...

REM Запустить PostgreSQL контейнер
docker run --name postgres-local -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=detskiy_mir -p 5432:5432 -d postgres:16

REM Подождать немного
timeout /t 5 /nobreak > nul

REM Проверить статус
docker ps

echo.
echo PostgreSQL запущен!
echo База данных: detskiy_mir
echo Пользователь: postgres
echo Пароль: postgres
echo Порт: 5432
echo.
echo Для остановки: docker stop postgres-local
echo Для удаления: docker rm postgres-local
