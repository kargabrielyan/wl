# SSH Key - Инструкция по подключению к серверу (Windows)

## ⚠️ ВАЖНО! Безопасность
- **НИКОГДА не добавляйте приватные ключи в Git!**
- **Публичные ключи можно безопасно передавать**
- **Приватные ключи (.pem, без .pub) - только локально!**

## 📋 Обзор

Эта инструкция объясняет, как подключиться к серверу используя ваш SSH ключ из папки `C:\Users\LOQ\.ssh\` на Windows.

## 🔑 Ваши SSH ключи

### Где найти ключи на Windows:

**1. Ключ из папки C:\Users\LOQ\.ssh\ (Ed25519):**
```cmd
type C:\Users\LOQ\.ssh\id_ed25519.pub
```

**2. Ключ из папки C:\Users\LOQ\.ssh\ (RSA):**
```cmd
type C:\Users\LOQ\.ssh\id_rsa.pub
```

### Типы ключей:
- **Ed25519** - современный, короткий, быстрый (рекомендуется)
- **RSA** - классический, длинный, совместимый

## 🖥️ Информация о сервере

- **IP адрес:** 37.27.81.65
- **Пользователь:** root
- **Порт:** 22
- **ОС:** Ubuntu 24.04.3 LTS

## ⚙️ SSH Конфигурация

Файл `C:\Users\LOQ\.ssh\config` настроен следующим образом:

```ssh
Host *
    AddKeysToAgent yes
    IdentityFile C:\Users\LOQ\.ssh\id_ed25519

Host server
    HostName 37.27.81.65
    User root
    Port 22
    IdentityFile C:\Users\LOQ\.ssh\id_ed25519
    IdentitiesOnly yes
    PasswordAuthentication no
    PubkeyAuthentication yes
    StrictHostKeyChecking no
```

## 🚀 Способы подключения

### 1. Простое подключение (рекомендуется)
```cmd
ssh server
```

### 2. Прямое подключение с указанием ключа
```cmd
ssh -i C:\Users\LOQ\.ssh\id_ed25519 root@37.27.81.65
```

### 3. Подключение с ключом RSA
```cmd
ssh -i C:\Users\LOQ\.ssh\id_rsa root@37.27.81.65
```

## 🔧 Настройка SSH Agent

### Добавить ключ в SSH agent
```cmd
ssh-add C:\Users\LOQ\.ssh\id_ed25519
```

### Проверить добавленные ключи
```cmd
ssh-add -l
```

### Удалить все ключи из agent
```cmd
ssh-add -D
```

## 📁 Структура файлов

```
C:\Users\LOQ\.ssh\
├── id_ed25519          # Приватный ключ (Ed25519)
├── id_ed25519.pub      # Публичный ключ (Ed25519)
├── id_rsa              # Приватный ключ (RSA)
├── id_rsa.pub          # Публичный ключ (RSA)
├── config              # SSH конфигурация
└── known_hosts         # Известные хосты
```

## 🛠️ Устранение проблем

### Ошибка "Permission denied"
1. Проверьте, что ключ добавлен на сервер:
   ```cmd
   ssh server "cat ~/.ssh/authorized_keys"
   ```

2. Проверьте права доступа к ключу (в PowerShell):
   ```powershell
   Get-Acl C:\Users\LOQ\.ssh\id_ed25519
   ```

3. Исправьте права доступа (в PowerShell от имени администратора):
   ```powershell
   icacls C:\Users\LOQ\.ssh\id_ed25519 /inheritance:r /grant:r "%USERNAME%:F"
   ```

### Ошибка "Host key verification failed"
```cmd
ssh-keygen -R 37.27.81.65
```

### Ошибка "Could not resolve hostname"
```cmd
ping 37.27.81.65
```

## 📝 Добавление ключа на новый сервер

### Через SSH (если есть доступ с паролем)
```cmd
ssh-copy-id -i C:\Users\LOQ\.ssh\id_ed25519.pub root@37.27.81.65
```

### Вручную
1. Скопируйте публичный ключ:
   ```cmd
   type C:\Users\LOQ\.ssh\id_ed25519.pub
   ```

2. Подключитесь к серверу и добавьте ключ:
   ```cmd
   ssh root@37.27.81.65
   mkdir -p ~/.ssh
   echo "СОПИРУЙТЕ_СЮДА_ВАШ_ПУБЛИЧНЫЙ_КЛЮЧ" >> ~/.ssh/authorized_keys
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```

## 🔒 Безопасность

- ✅ Используйте Ed25519 ключи (современные и безопасные)
- ✅ Никогда не передавайте приватные ключи
- ✅ Регулярно обновляйте ключи
- ✅ Используйте парольные фразы для ключей
- ✅ Ограничивайте доступ по IP адресам в SSH config

## 📞 Поддержка

При возникновении проблем:
1. Проверьте подключение к интернету
2. Убедитесь, что сервер запущен
3. Проверьте правильность IP адреса (37.27.81.65)
4. Убедитесь, что ключ добавлен на сервер
5. Проверьте права доступа к файлам ключей

## 🖥️ Windows-специфичные команды

### Проверка SSH клиента
```cmd
ssh -V
```

### Генерация нового ключа (если нужно)
```cmd
ssh-keygen -t ed25519 -C "your_email@example.com" -f C:\Users\LOQ\.ssh\id_ed25519
```

### Проверка подключения
```cmd
ssh -T server
```

---
*Создано: 2025-01-22*  
*Версия: 2.0 (Windows)*
