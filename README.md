# Название проекта

## 🚀 Как запустить локально

### 1. Клонировать репозиторий
```bash
git clone https://github.com/ваш-логин/project-name.git
cd project-name
```

### 2. Установить зависимости
**Для фронтенда (HTML/CSS/JS):**  
Ничего не нужно, просто откройте `index.html` в браузере.

**Для бэкенда (если есть):**  
- Node.js (для API на Express):
  ```bash
  npm install express mysql2 cors
  ```

- Python (если Flask/Django):
  ```bash
  pip install flask mysql-connector-python
  ```

### 3. Запуск
**Фронтенд:**  
Откройте `index.html` в браузере.

**Бэкенд (Node.js):**  
```bash
node server.js
```
(Порт по умолчанию: `3000`)

**Бэкенд (Python):**  
```bash
python3 app.py
```

### 4. Настройка БД
Подключитесь к БД, указав данные в файле:
- `server.js` (для Node.js)
- `app.py` (для Python)

Пример конфига:
```javascript
// Node.js
const db = mysql.createConnection({
  host: 'ваш-ip-бд',
  user: 'логин',
  password: 'пароль',
  database: 'название-бд'
});
```

## 🔧 Зависимости
- **Фронтенд**: Чистый HTML/CSS/JS (без сборщиков).
- **Бэкенд** (если есть):
  - Node.js: `express`, `mysql2`, `cors`
  - Python: `flask`, `mysql-connector-python`

## 🌐 Доступ к сайту
- Production: `http://server-ip` (развернут через Nginx)
- Локально: `http://localhost:3000` (бэкенд) + `index.html` (фронтенд)
